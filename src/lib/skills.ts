import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parseFrontmatter } from "./frontmatter.js";

/** Repository root resolved by walking up to the directory that contains the toolkit markers. */
export function repoRoot(): string {
  const here = dirname(fileURLToPath(import.meta.url));
  let dir = here;
  for (let i = 0; i < 8; i++) {
    const hasSkills = existsSync(join(dir, "skills"));
    const hasKnowledge = existsSync(join(dir, "knowledge"));
    const hasPkg = existsSync(join(dir, "package.json"));
    if (hasSkills && (hasKnowledge || hasPkg)) return dir;
    const parent = resolve(dir, "..");
    if (parent === dir) break;
    dir = parent;
  }
  // Fallback: assume dist/lib -> repo root is two levels up.
  return resolve(here, "..", "..");
}

export interface SkillInfo {
  name: string;
  dir: string;
  skillFile: string;
  description: string;
  metadata: Record<string, unknown>;
  resourceFiles: string[];
}

export interface SkillValidationIssue {
  skill: string;
  level: "error" | "warning";
  message: string;
}

const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;

export function skillsDir(root = repoRoot()): string {
  return join(root, "skills");
}

export function listSkillDirs(root = repoRoot()): string[] {
  const dir = skillsDir(root);
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .map((n) => join(dir, n))
    .filter((p) => statSync(p).isDirectory())
    .sort();
}

function walkFiles(dir: string, base = dir): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    const st = statSync(p);
    if (st.isDirectory()) out.push(...walkFiles(p, base));
    else out.push(p.slice(base.length + 1));
  }
  return out;
}

export function loadSkill(dir: string): SkillInfo | null {
  const skillFile = join(dir, "SKILL.md");
  if (!existsSync(skillFile)) return null;
  const content = readFileSync(skillFile, "utf8");
  const { data } = parseFrontmatter(content);
  const name = typeof data.name === "string" ? data.name : "";
  const description = typeof data.description === "string" ? data.description : "";
  const metadata = (data.metadata && typeof data.metadata === "object" && !Array.isArray(data.metadata))
    ? (data.metadata as Record<string, unknown>)
    : {};
  const resourceFiles = walkFiles(dir).filter((f) => f !== "SKILL.md");
  return { name, dir, skillFile, description, metadata, resourceFiles };
}

export function loadAllSkills(root = repoRoot()): SkillInfo[] {
  const out: SkillInfo[] = [];
  for (const dir of listSkillDirs(root)) {
    const s = loadSkill(dir);
    if (s) out.push(s);
  }
  return out;
}

/** Validate skill metadata and structure. Returns a list of issues (empty = all good). */
export function validateSkills(root = repoRoot()): SkillValidationIssue[] {
  const issues: SkillValidationIssue[] = [];
  const dirs = listSkillDirs(root);
  const seen = new Map<string, string>();

  for (const dir of dirs) {
    const folder = dir.split("/").pop() || dir;
    const skillFile = join(dir, "SKILL.md");
    if (!existsSync(skillFile)) {
      issues.push({ skill: folder, level: "error", message: "missing SKILL.md" });
      continue;
    }
    const skill = loadSkill(dir)!;

    if (!skill.name) {
      issues.push({ skill: folder, level: "error", message: "frontmatter missing 'name'" });
    } else {
      if (!NAME_RE.test(skill.name)) {
        issues.push({ skill: folder, level: "error", message: `name '${skill.name}' is not lowercase-hyphen` });
      }
      if (skill.name !== folder) {
        issues.push({ skill: folder, level: "error", message: `name '${skill.name}' does not match folder '${folder}'` });
      }
      const prev = seen.get(skill.name);
      if (prev) {
        issues.push({ skill: folder, level: "error", message: `duplicate skill name '${skill.name}' (also ${prev})` });
      }
      seen.set(skill.name, folder);
    }

    if (!skill.description) {
      issues.push({ skill: folder, level: "error", message: "frontmatter missing 'description'" });
    } else {
      if (skill.description.length < 40) {
        issues.push({ skill: folder, level: "warning", message: "description is very short (<40 chars); should say what it does AND when to use it" });
      }
      if (skill.description.length > 1024) {
        issues.push({ skill: folder, level: "warning", message: "description is very long (>1024 chars)" });
      }
    }

    // Expected body sections (quality convention for this toolkit).
    const body = readFileSync(skillFile, "utf8");
    if (!body.includes("## Purpose")) {
      issues.push({ skill: folder, level: "warning", message: "missing recommended section '## Purpose'" });
    }
    // An orchestrator may use '## Workflow stages' in place of '## Instructions'.
    if (!body.includes("## Instructions") && !body.includes("## Workflow stages")) {
      issues.push({ skill: folder, level: "warning", message: "missing recommended section '## Instructions' (or '## Workflow stages')" });
    }
    if (!body.includes("## Anti-fabrication rules")) {
      issues.push({ skill: folder, level: "warning", message: "missing recommended section '## Anti-fabrication rules'" });
    }
  }
  return issues;
}
