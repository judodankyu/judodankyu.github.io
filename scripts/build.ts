#!/usr/bin/env bun
/**
 * Production build: writes the grades into index.html and the grading pathway into progression/index.html
 * (so search engines, link previews and readers without JavaScript get the full content),
 * bundles both into dist/, and copies public/.
 */
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { chartHtml, mainHtml, pathwayHtml, tabsHtml } from "../src/render";

const fill = (page: string, empty: string, content: string) => {
  if (!page.includes(empty)) throw new Error(`index.html no longer contains ${empty}`);
  return page.replace(empty, empty.replace("></", `>${content}</`));
};

let page = await Bun.file("index.html").text();
page = fill(page, '<ol class="cols" id="cols"></ol>', chartHtml());
page = fill(page, '<nav class="tabs" id="tabs" aria-label="Grades"></nav>', tabsHtml());
page = fill(page, '<main id="main"></main>', mainHtml());

let pathway = await Bun.file("progression/index.html").text();
pathway = fill(pathway, '<main id="pathway" class="pathway"></main>', pathwayHtml());

// Temporary copies one folder down, so the output keeps the names index.html and progression/index.html.
mkdirSync(".build/progression", { recursive: true });
writeFileSync(".build/index.html", page.replaceAll('"./src/', '"../src/'));
writeFileSync(".build/progression/index.html", pathway.replaceAll('"../src/', '"../../src/'));
rmSync("dist", { recursive: true, force: true });
try {
  const entries = ["./.build/index.html", "./.build/progression/index.html"];
  const proc = Bun.spawnSync(["bun", "build", ...entries, "--outdir", "dist", "--minify"], { stdout: "inherit", stderr: "inherit" });
  if (proc.exitCode !== 0) process.exit(proc.exitCode ?? 1);
} finally {
  rmSync(".build", { recursive: true, force: true });
}
cpSync("public", "dist", { recursive: true });
console.log("✓ dist/ built with prerendered grades and pathway");
