import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { repoRoot, loadAllSkills } from "./skills.js";

export interface ManifestIssue {
  level: "error" | "warning";
  file: string;
  message: string;
}

/** Validate .claude-plugin/plugin.json and .claude-plugin/marketplace.json against the real skills. */
export function validateManifests(root = repoRoot()): ManifestIssue[] {
  const issues: ManifestIssue[] = [];
  const skillNames = new Set(loadAllSkills(root).map((s) => s.name));

  const pluginPath = join(root, ".claude-plugin", "plugin.json");
  if (!existsSync(pluginPath)) {
    issues.push({ level: "error", file: pluginPath, message: "plugin.json missing" });
  } else {
    try {
      const plugin = JSON.parse(readFileSync(pluginPath, "utf8"));
      if (!plugin.name) issues.push({ level: "error", file: pluginPath, message: "plugin.name missing" });
      if (!plugin.version) issues.push({ level: "warning", file: pluginPath, message: "plugin.version missing" });
      if (!plugin.description) issues.push({ level: "warning", file: pluginPath, message: "plugin.description missing" });
    } catch (e) {
      issues.push({ level: "error", file: pluginPath, message: `invalid JSON: ${(e as Error).message}` });
    }
  }

  const mktPath = join(root, ".claude-plugin", "marketplace.json");
  if (!existsSync(mktPath)) {
    issues.push({ level: "error", file: mktPath, message: "marketplace.json missing" });
  } else {
    try {
      const mkt = JSON.parse(readFileSync(mktPath, "utf8"));
      if (!mkt.name) issues.push({ level: "error", file: mktPath, message: "marketplace.name missing" });
      if (!Array.isArray(mkt.plugins) || mkt.plugins.length === 0) {
        issues.push({ level: "error", file: mktPath, message: "marketplace.plugins must be a non-empty array" });
      } else {
        for (const [i, p] of mkt.plugins.entries()) {
          if (!p.name) issues.push({ level: "error", file: mktPath, message: `plugins[${i}].name missing` });
          if (!p.source) issues.push({ level: "warning", file: mktPath, message: `plugins[${i}].source missing` });
          const skills: string[] = Array.isArray(p.skills) ? p.skills : [];
          for (const sref of skills) {
            // sref like "./skills/<name>"
            const name = sref.split("/").filter(Boolean).pop() ?? "";
            if (!skillNames.has(name)) {
              issues.push({ level: "error", file: mktPath, message: `plugins[${i}] references unknown skill '${sref}'` });
            }
            const dir = join(root, sref.replace(/^\.\//, ""));
            if (!existsSync(join(dir, "SKILL.md"))) {
              issues.push({ level: "error", file: mktPath, message: `plugins[${i}] skill path has no SKILL.md: '${sref}'` });
            }
          }
        }
      }
    } catch (e) {
      issues.push({ level: "error", file: mktPath, message: `invalid JSON: ${(e as Error).message}` });
    }
  }

  return issues;
}
