import { mkdirSync, readdirSync, statSync, copyFileSync, existsSync } from "node:fs";
import { join, resolve, relative, isAbsolute, sep } from "node:path";
import { listSkillDirs, loadSkill, repoRoot } from "./skills.js";

export interface InstallOptions {
  /** Target skills directory (where <skill>/ folders will be written). */
  target: string;
  /** If true, do not write anything; just report what would happen. */
  dryRun?: boolean;
  /** If true, overwrite existing files. Default false (overwrite protection). */
  force?: boolean;
  /** Source repo root (defaults to this package's root). */
  root?: string;
}

export interface InstallPlanEntry {
  skill: string;
  from: string;
  to: string;
  files: Array<{ relPath: string; action: "create" | "overwrite" | "skip-exists" }>;
}

export interface InstallResult {
  plan: InstallPlanEntry[];
  written: number;
  skipped: number;
  dryRun: boolean;
}

export class UnsafePathError extends Error {}

/**
 * Resolve `child` under `baseDir` and guarantee it does not escape via `..`,
 * absolute paths, or symlink-style traversal. Throws UnsafePathError otherwise.
 */
export function safeJoin(baseDir: string, child: string): string {
  if (isAbsolute(child)) {
    throw new UnsafePathError(`absolute path not allowed: ${child}`);
  }
  if (child.split(/[\\/]/).some((seg) => seg === "..")) {
    throw new UnsafePathError(`path traversal not allowed: ${child}`);
  }
  const base = resolve(baseDir);
  const full = resolve(base, child);
  const rel = relative(base, full);
  if (rel.startsWith("..") || isAbsolute(rel)) {
    throw new UnsafePathError(`path escapes target directory: ${child}`);
  }
  return full;
}

function listFilesRecursive(dir: string, base = dir): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) out.push(...listFilesRecursive(p, base));
    else out.push(relative(base, p));
  }
  return out;
}

/** Build (and optionally execute) a plan to install one or more skills into `target`. */
export function installSkills(skillNames: string[] | "all", opts: InstallOptions): InstallResult {
  const root = opts.root ?? repoRoot();
  const target = resolve(opts.target);
  const allDirs = listSkillDirs(root);
  const byName = new Map<string, string>();
  for (const d of allDirs) {
    const s = loadSkill(d);
    if (s && s.name) byName.set(s.name, d);
  }

  let selected: string[];
  if (skillNames === "all") {
    selected = [...byName.keys()].sort();
  } else {
    selected = skillNames;
    for (const n of selected) {
      if (!byName.has(n)) {
        throw new Error(`unknown skill: ${n}. Known: ${[...byName.keys()].sort().join(", ")}`);
      }
    }
  }

  const plan: InstallPlanEntry[] = [];
  let written = 0;
  let skipped = 0;

  for (const name of selected) {
    const from = byName.get(name)!;
    // target/<name> — validated against traversal
    const to = safeJoin(target, name);
    const files = listFilesRecursive(from);
    const entry: InstallPlanEntry = { skill: name, from, to, files: [] };

    for (const rel of files) {
      const destPath = safeJoin(to, rel);
      const exists = existsSync(destPath);
      let action: "create" | "overwrite" | "skip-exists";
      if (!exists) action = "create";
      else if (opts.force) action = "overwrite";
      else action = "skip-exists";
      entry.files.push({ relPath: rel, action });

      if (!opts.dryRun) {
        if (action === "skip-exists") {
          skipped++;
          continue;
        }
        mkdirSync(resolve(destPath, ".."), { recursive: true });
        copyFileSync(join(from, rel), destPath);
        written++;
      } else {
        if (action === "skip-exists") skipped++;
        else written++;
      }
    }
    plan.push(entry);
  }

  return { plan, written, skipped, dryRun: !!opts.dryRun };
}
