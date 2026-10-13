#!/usr/bin/env node
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { loadAllSkills, validateSkills, repoRoot } from "../lib/skills.js";
import { installSkills, UnsafePathError } from "../lib/install.js";
import { validateManifests } from "../lib/manifests.js";
import { validateConfigFile } from "../lib/config.js";
import { scaffoldProject } from "../lib/scaffold.js";

const VERSION = "0.1.0";
const PROG = "gobeshona";

function parseArgs(argv: string[]): { positionals: string[]; flags: Record<string, string | boolean> } {
  const positionals: string[] = [];
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("--")) {
        flags[key] = next;
        i++;
      } else {
        flags[key] = true;
      }
    } else {
      positionals.push(a);
    }
  }
  return { positionals, flags };
}

function usage(): void {
  console.log(`GobeshonaLabAgent (${PROG}) v${VERSION}
From Research Ideas to Evidence-Backed Papers.

Usage:
  ${PROG} --help                           Show this help
  ${PROG} list                             List available skills
  ${PROG} new [dir] [opts]                 Scaffold a starter research project
  ${PROG} install <skill> [opts]           Install one skill
  ${PROG} install all [opts]               Install all skills
  ${PROG} validate [config] [--config <p>] Validate skills, manifests, and (optionally) a project config
  ${PROG} doctor                           Environment + installation health check

Options:
  --target <dir>   Target skills directory for install (default: ./.claude/skills)
                   For 'new', the project directory (default: ./research-project)
  --dry-run        Show what would happen; write nothing
  --force          Overwrite existing files (default: protected)

Examples:
  ${PROG} list
  ${PROG} new my-paper
  ${PROG} install methodology-designer --target ./.claude/skills --dry-run
  ${PROG} install all --target ./.claude/skills
  ${PROG} validate research-project.json

Notes:
  * The skills are instructions for an AI agent; you provide the AI inference
    (a paid API or a local model). The toolkit itself requires no paid service.
  * 'validate' never proves scientific correctness; it checks structure and integrity rules.
`);
}

function cmdList(): number {
  const skills = loadAllSkills();
  if (skills.length === 0) {
    console.log("No skills found.");
    return 1;
  }
  console.log(`Available skills (${skills.length}):\n`);
  for (const s of skills) {
    const oneLine = s.description.replace(/\s+/g, " ").trim();
    const short = oneLine.length > 100 ? oneLine.slice(0, 97) + "..." : oneLine;
    console.log(`  ${s.name.padEnd(24)} ${short}`);
  }
  return 0;
}

function cmdNew(positionals: string[], flags: Record<string, string | boolean>): number {
  const dir = positionals[0] ?? (typeof flags.target === "string" ? flags.target : "research-project");
  const dryRun = !!flags["dry-run"];
  const force = !!flags.force;
  try {
    const res = scaffoldProject({ target: dir, dryRun, force });
    console.log(`${dryRun ? "[dry-run] " : ""}Scaffolding project in ${res.target}`);
    for (const f of res.files) {
      const mark = f.action === "create" ? "+" : f.action === "overwrite" ? "~" : "=";
      console.log(`    ${mark} ${f.relPath}${f.action === "skip-exists" ? "  (exists; use --force to overwrite)" : ""}`);
    }
    console.log(`\n${dryRun ? "Would write" : "Wrote"} ${res.written} file(s); skipped ${res.skipped}.`);
    if (!dryRun && res.written > 0) {
      console.log(`\nNext steps:`);
      console.log(`  1. Edit ${resolve(res.target, "research-project.json")}`);
      console.log(`  2. ${PROG} validate ${resolve(res.target, "research-project.json")}`);
      console.log(`  3. ${PROG} install all --target ${resolve(res.target, ".claude/skills")}`);
      console.log(`  4. In your AI agent, invoke the 'research-paper-workflow' skill.`);
    }
    return 0;
  } catch (e) {
    console.error(`error: ${(e as Error).message}`);
    return 1;
  }
}

function cmdInstall(positionals: string[], flags: Record<string, string | boolean>): number {
  const which = positionals[0];
  if (!which) {
    console.error("error: specify a skill name or 'all'. Try `" + PROG + " list`.");
    return 2;
  }
  const target = typeof flags.target === "string" ? flags.target : resolve(".claude/skills");
  const dryRun = !!flags["dry-run"];
  const force = !!flags.force;
  try {
    const result = installSkills(which === "all" ? "all" : [which], { target, dryRun, force });
    for (const entry of result.plan) {
      console.log(`${dryRun ? "[dry-run] " : ""}${entry.skill} -> ${entry.to}`);
      for (const f of entry.files) {
        const mark = f.action === "create" ? "+" : f.action === "overwrite" ? "~" : "=";
        console.log(`    ${mark} ${f.relPath}${f.action === "skip-exists" ? "  (exists; use --force to overwrite)" : ""}`);
      }
    }
    console.log(`\n${dryRun ? "Would write" : "Wrote"} ${result.written} file(s); skipped ${result.skipped}.`);
    return 0;
  } catch (e) {
    if (e instanceof UnsafePathError) {
      console.error(`refused unsafe path: ${e.message}`);
      return 3;
    }
    console.error(`error: ${(e as Error).message}`);
    return 1;
  }
}

function cmdValidate(positionals: string[], flags: Record<string, string | boolean>): number {
  let errors = 0;
  let warnings = 0;

  console.log("Validating skills...");
  const skillIssues = validateSkills();
  for (const i of skillIssues) {
    console.log(`  [${i.level}] ${i.skill}: ${i.message}`);
    i.level === "error" ? errors++ : warnings++;
  }
  if (skillIssues.length === 0) console.log("  all skills OK");

  console.log("Validating distribution manifests...");
  const manifestIssues = validateManifests();
  for (const i of manifestIssues) {
    console.log(`  [${i.level}] ${i.file}: ${i.message}`);
    i.level === "error" ? errors++ : warnings++;
  }
  if (manifestIssues.length === 0) console.log("  manifests OK");

  // Project config can be given positionally (`validate path`) or via --config.
  const configPath = (typeof flags.config === "string" ? flags.config : undefined) ?? positionals[0];
  if (configPath) {
    console.log(`Validating project config: ${configPath}`);
    const res = validateConfigFile(configPath);
    for (const i of res.issues) {
      console.log(`  [${i.level}] ${i.path}: ${i.message}`);
      i.level === "error" ? errors++ : warnings++;
    }
    if (res.issues.length === 0) console.log("  project config OK");
  }

  console.log(`\n${errors} error(s), ${warnings} warning(s).`);
  if (errors === 0) console.log("Note: validation checks structure and integrity rules, not scientific correctness.");
  return errors > 0 ? 1 : 0;
}

function cmdDoctor(): number {
  const root = repoRoot();
  console.log(`${PROG} doctor (GobeshonaLabAgent v${VERSION})\n`);
  console.log(`repo root: ${root}`);
  console.log(`node: ${process.version}`);

  const checks: Array<[string, boolean, string]> = [];
  const skills = loadAllSkills();
  checks.push(["skills discovered", skills.length >= 16, `${skills.length} found (expected >= 16)`]);
  checks.push(["knowledge base present", existsSync(resolve(root, "knowledge/principles/research-writing-principles.md")), "knowledge/principles/"]);
  checks.push(["quality framework present", existsSync(resolve(root, "knowledge/quality-framework/review-rubric.md")), "knowledge/quality-framework/"]);
  checks.push(["project config schema present", existsSync(resolve(root, "config/research-project.schema.json")), "config/"]);
  checks.push(["plugin manifest present", existsSync(resolve(root, ".claude-plugin/plugin.json")), ".claude-plugin/plugin.json"]);
  checks.push(["marketplace manifest present", existsSync(resolve(root, ".claude-plugin/marketplace.json")), ".claude-plugin/marketplace.json"]);

  const skillIssues = validateSkills().filter((i) => i.level === "error");
  checks.push(["skills valid (no errors)", skillIssues.length === 0, `${skillIssues.length} error(s)`]);
  const manifestIssues = validateManifests().filter((i) => i.level === "error");
  checks.push(["manifests valid (no errors)", manifestIssues.length === 0, `${manifestIssues.length} error(s)`]);

  let failed = 0;
  for (const [name, ok, detail] of checks) {
    console.log(`  ${ok ? "OK  " : "FAIL"}  ${name}  (${detail})`);
    if (!ok) failed++;
  }
  console.log(`\n${failed === 0 ? "All checks passed." : `${failed} check(s) failed.`}`);
  return failed === 0 ? 0 : 1;
}

function main(): void {
  const argv = process.argv.slice(2);
  const { positionals, flags } = parseArgs(argv);
  const cmd = positionals.shift();
  let code = 0;
  switch (cmd) {
    case "list": code = cmdList(); break;
    case "new":
    case "init": code = cmdNew(positionals, flags); break;
    case "install": code = cmdInstall(positionals, flags); break;
    case "validate": code = cmdValidate(positionals, flags); break;
    case "doctor": code = cmdDoctor(); break;
    case undefined:
    case "help":
    case "--help":
    case "-h": usage(); break;
    case "version":
    case "--version":
    case "-v": console.log(VERSION); break;
    default:
      console.error(`unknown command: ${cmd}\n`);
      usage();
      code = 2;
  }
  process.exit(code);
}

main();
