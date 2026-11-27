#!/usr/bin/env bun
/**
 * Blocks secrets, machine-specific paths, private URLs, personal emails, risky files
 * and malformed video IDs from entering the repository.
 *
 *   bun scripts/check-sensitive.ts --staged          files staged for commit (pre-commit hook)
 *   bun scripts/check-sensitive.ts --message <file>  a commit message (commit-msg hook)
 *   bun scripts/check-sensitive.ts --all             every tracked file and every commit message (CI)
 *
 * A line containing "sensitive-check: allow" is skipped (use sparingly, and say why).
 * Exit code 1 means something was found.
 */
import { readFileSync } from "node:fs";
import { spawnSync } from "node:child_process";

type Rule = { name: string; pattern: RegExp };

// Patterns are assembled from pieces so this file does not match itself.
const j = (...parts: string[]) => parts.join("");

const SECRET_RULES: Rule[] = [
  { name: "private key", pattern: new RegExp(j("-----BEGIN ", "[A-Z ]*", "PRIVATE KEY-----")) },
  { name: "GitHub token", pattern: new RegExp(j("\\b(gh[pousr]_[A-Za-z0-9]{30,}|github_", "pat_[A-Za-z0-9_]{20,})")) },
  { name: "AWS access key", pattern: new RegExp(j("\\bAK", "IA[0-9A-Z]{16}\\b")) },
  { name: "Google API key", pattern: new RegExp(j("\\bAI", "za[0-9A-Za-z_-]{35}\\b")) },
  { name: "Slack token", pattern: new RegExp(j("\\bxox", "[abprs]-[A-Za-z0-9-]{10,}")) },
  { name: "Stripe live key", pattern: new RegExp(j("\\b(sk|rk)_", "live_[A-Za-z0-9]{16,}")) },
  { name: "AI API key", pattern: new RegExp(j("\\bsk-", "(ant-|proj-)?[A-Za-z0-9_-]{24,}")) },
  { name: "secret assignment", pattern: /\b(password|passwd|secret|api[_-]?key|access[_-]?token)\b\s*[:=]\s*["'][^"'\s]{8,}["']/i },
];

const PRIVACY_RULES: Rule[] = [
  { name: "local file path", pattern: new RegExp(j("(/", "home/[^/\\s]+/|/", "Users/[^/\\s]+/|/", "root/|[A-Za-z]:\\\\", "Users\\\\|file:/", "/)")) },
  { name: "local or private address", pattern: new RegExp(j("\\b(local", "host|127\\.0\\.0\\.1|0\\.0\\.0\\.0|192\\.168\\.\\d+\\.\\d+|10\\.\\d+\\.\\d+\\.\\d+)\\b")) },
  { name: "private Claude link", pattern: new RegExp(j("claude\\.ai/(code|chat|artifact|project)", "[/?]")) },
  { name: "email address", pattern: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g },
];

// Emails that are fine to publish: no-reply addresses used in commit trailers.
const ALLOWED_EMAIL = /^(noreply@anthropic\.com|[A-Za-z0-9._+-]*noreply@users\.noreply\.github\.com|[0-9]+\+[A-Za-z0-9-]+@users\.noreply\.github\.com)$/i;

const FORBIDDEN_FILES = [
  /(^|\/)\.env(\..*)?$/, /\.(pem|key|p12|pfx|keystore|jks)$/i, /(^|\/)id_(rsa|dsa|ecdsa|ed25519)(\.pub)?$/,
  /(^|\/)credentials(\.json)?$/i, /(^|\/)\.claude\/settings\.local\.json$/, /(^|\/)\.npmrc$/, /(^|\/)\.netrc$/,
];
const MAX_BYTES = 500_000;
const SKIP_CONTENT = [/^bun\.lock$/, /^scripts\/check-sensitive\.ts$/];
const BINARY = /\.(png|jpe?g|gif|webp|avif|ico|woff2?|ttf|otf|pdf|zip)$/i;

const problems: string[] = [];
const report = (where: string, what: string, sample: string) =>
  problems.push(`${where}: ${what}${sample ? `  →  ${sample.trim().slice(0, 100)}` : ""}`);

function scanText(where: string, text: string, isMessage = false) {
  text.split("\n").forEach((line, i) => {
    if (line.includes("sensitive-check: allow")) return;
    const at = `${where}:${i + 1}`;
    for (const r of SECRET_RULES) if (r.pattern.test(line)) report(at, r.name, line);
    for (const r of PRIVACY_RULES) {
      if (r.name === "email address") {
        for (const m of line.match(r.pattern) ?? []) if (!ALLOWED_EMAIL.test(m)) report(at, r.name, m);
      } else if (r.pattern.test(line)) report(at, r.name, line);
    }
    // Plain http links are not allowed in project files (XML namespaces such as w3.org and sitemaps.org are identifiers, not links).
    if (!isMessage && /http:\/\/(?!www\.(w3|sitemaps)\.org\/)/.test(line)) report(at, "insecure http:// link", line);
  });
}

function checkVideoIds(path: string, text: string) {
  // Technique tuples: [romaji, kanji, english, category, videoId]; the kanji field rules out other string lists.
  const tuple = /\[\s*"[^"]*",\s*"[^"\x00-\x7f]+",\s*"[^"]*",\s*"(?:te|koshi|ashi|ma|yoko|osae|shime|kan)",\s*"([^"]*)"\s*\]/g;
  let count = 0;
  for (const m of text.matchAll(tuple)) {
    count++;
    if (!/^[A-Za-z0-9_-]{11}$/.test(m[1]!)) report(path, "malformed YouTube video ID", m[0]);
  }
  if (count === 0) report(path, "no techniques found (data format changed?)", "");
  for (const m of text.matchAll(/_VIDEO = "([^"]*)"/g))
    if (!/^[A-Za-z0-9_-]{11}$/.test(m[1]!)) report(path, "malformed YouTube video ID", m[0]);
}

function checkFile(path: string, content: Buffer) {
  if (FORBIDDEN_FILES.some((r) => r.test(path))) report(path, "file type that may hold credentials", "");
  if (content.length > MAX_BYTES) report(path, `file larger than ${MAX_BYTES / 1000} KB`, "");
  if (BINARY.test(path) || SKIP_CONTENT.some((r) => r.test(path))) return;
  const text = content.toString("utf8");
  scanText(path, text);
  if (path === "src/data.ts") checkVideoIds(path, text);
}

const git = (...args: string[]) => {
  const r = spawnSync("git", args, { encoding: "buffer", maxBuffer: 64 * 1024 * 1024 });
  if (r.status !== 0) throw new Error(`git ${args.join(" ")} failed: ${r.stderr.toString()}`);
  return r.stdout;
};
const lines = (b: Buffer) => b.toString("utf8").split("\0").filter(Boolean);

const [mode, arg] = process.argv.slice(2);
if (mode === "--staged") {
  for (const path of lines(git("diff", "--cached", "--name-only", "--diff-filter=ACMR", "-z")))
    checkFile(path, git("show", `:${path}`));
} else if (mode === "--message" && arg) {
  const msg = readFileSync(arg, "utf8").split("\n").filter((l) => !l.startsWith("#")).join("\n");
  scanText("commit message", msg, true);
} else if (mode === "--all") {
  for (const path of lines(git("ls-files", "-z"))) checkFile(path, readFileSync(path));
  for (const entry of git("log", "--format=%H%x1f%B%x00").toString("utf8").split("\0").filter((e) => e.trim())) {
    const [hash, body] = entry.trim().split("\x1f");
    scanText(`commit ${hash!.slice(0, 7)} message`, body ?? "", true);
  }
} else {
  console.error("usage: check-sensitive.ts --staged | --message <file> | --all");
  process.exit(2);
}

if (problems.length) {
  console.error(`\n✗ check-sensitive found ${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error(`\nRemove them before committing. If a line is genuinely safe, add "sensitive-check: allow" with a reason.\n`);
  process.exit(1);
}
console.log("✓ check-sensitive: no secrets, private paths, private links or personal emails found.");
