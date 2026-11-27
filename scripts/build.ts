#!/usr/bin/env bun
/**
 * Production build: writes the grades into index.html (so search engines, link previews and
 * readers without JavaScript get the full content), bundles it into dist/, and copies public/.
 */
import { cpSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { chartHtml, mainHtml, tabsHtml } from "../src/render";

const fill = (page: string, empty: string, content: string) => {
  if (!page.includes(empty)) throw new Error(`index.html no longer contains ${empty}`);
  return page.replace(empty, empty.replace("></", `>${content}</`));
};

let page = await Bun.file("index.html").text();
page = fill(page, '<ol class="cols" id="cols"></ol>', chartHtml());
page = fill(page, '<nav class="tabs" id="tabs" aria-label="Grades"></nav>', tabsHtml());
page = fill(page, '<main id="main"></main>', mainHtml());

// A temporary copy one folder down, so the output keeps the name index.html.
const tmp = ".build/index.html";
mkdirSync(".build", { recursive: true });
writeFileSync(tmp, page.replaceAll('"./src/', '"../src/'));
rmSync("dist", { recursive: true, force: true });
try {
  const proc = Bun.spawnSync(["bun", "build", `./${tmp}`, "--outdir", "dist", "--minify"], { stdout: "inherit", stderr: "inherit" });
  if (proc.exitCode !== 0) process.exit(proc.exitCode ?? 1);
} finally {
  rmSync(".build", { recursive: true, force: true });
}
cpSync("public", "dist", { recursive: true });
console.log("✓ dist/ built with prerendered grades");
