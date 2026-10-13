import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { repoRoot, loadAllSkills } from "../src/lib/skills.js";

/**
 * Documentation & knowledge-base link integrity:
 * every relative Markdown link / knowledgeRef pointing inside the repo must resolve to a real file.
 */

function extractLinks(md: string): string[] {
  const links: string[] = [];
  const re = /\]\(([^)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(md)) !== null) {
    const target = m[1].split("#")[0].trim();
    if (target && !/^(https?:|mailto:)/.test(target)) links.push(target);
  }
  return links;
}

test("skill knowledgeRefs resolve to real files", () => {
  const root = repoRoot();
  for (const s of loadAllSkills()) {
    const refs = (s.metadata.knowledgeRefs as unknown[]) ?? [];
    for (const r of refs) {
      if (typeof r !== "string") continue;
      const p = resolve(root, r);
      assert.ok(existsSync(p), `${s.name}: knowledgeRef not found: ${r}`);
    }
  }
});

test("relative links in README and docs resolve", () => {
  const root = repoRoot();
  const files = [
    join(root, "README.md"),
    join(root, "docs", "architecture.md"),
    join(root, "docs", "project-config.md"),
    join(root, "docs", "installation.md"),
    join(root, "docs", "quickstart.md"),
    join(root, "docs", "user-guide.md"),
    join(root, "docs", "interfaces.md"),
    join(root, "docs", "adapters.md"),
    join(root, "docs", "free-and-licensing.md"),
    join(root, "docs", "publishing.md"),
    join(root, "docs", "troubleshooting.md"),
    join(root, "docs", "end-to-end-example.md"),
  ].filter((f) => existsSync(f));

  for (const file of files) {
    const md = readFileSync(file, "utf8");
    for (const link of extractLinks(md)) {
      const resolved = resolve(dirname(file), link);
      assert.ok(existsSync(resolved), `${file}: broken link -> ${link}`);
    }
  }
});

test("knowledge base cross-links resolve", () => {
  const root = repoRoot();
  const kbFiles = [
    "knowledge/README.md",
    "knowledge/principles/research-writing-principles.md",
    "knowledge/quality-framework/manuscript-checklist.md",
    "knowledge/quality-framework/review-rubric.md",
  ].map((f) => join(root, f)).filter((f) => existsSync(f));

  for (const file of kbFiles) {
    const md = readFileSync(file, "utf8");
    for (const link of extractLinks(md)) {
      if (link.startsWith("http")) continue;
      const resolved = resolve(dirname(file), link);
      assert.ok(existsSync(resolved), `${file}: broken link -> ${link}`);
    }
  }
});
