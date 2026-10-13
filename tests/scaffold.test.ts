import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { scaffoldProject, starterConfig } from "../src/lib/scaffold.js";
import { validateConfigObject } from "../src/lib/config.js";

function tmp(): string {
  return mkdtempSync(join(tmpdir(), "gla-scaffold-"));
}

test("starter config validates with no errors", () => {
  const res = validateConfigObject(starterConfig() as Record<string, unknown>);
  const errors = res.issues.filter((i) => i.level === "error");
  assert.deepEqual(errors, [], `starter config should have no errors: ${JSON.stringify(errors)}`);
});

test("scaffold creates project files", () => {
  const dir = tmp();
  try {
    const res = scaffoldProject({ target: join(dir, "proj") });
    assert.ok(res.written >= 2);
    assert.ok(existsSync(join(dir, "proj", "research-project.json")));
    assert.ok(existsSync(join(dir, "proj", "README.md")));
    const cfg = JSON.parse(readFileSync(join(dir, "proj", "research-project.json"), "utf8"));
    assert.equal(cfg.schemaVersion, "1.0.0");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("scaffold dry-run writes nothing", () => {
  const dir = tmp();
  try {
    const res = scaffoldProject({ target: join(dir, "proj"), dryRun: true });
    assert.equal(res.dryRun, true);
    assert.ok(!existsSync(join(dir, "proj", "research-project.json")));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("scaffold overwrite protection, then force", () => {
  const dir = tmp();
  try {
    scaffoldProject({ target: dir, force: true });
    const cfgPath = join(dir, "research-project.json");
    writeFileSync(cfgPath, "TAMPERED");
    const second = scaffoldProject({ target: dir });
    assert.equal(readFileSync(cfgPath, "utf8"), "TAMPERED", "must not overwrite without force");
    assert.ok(second.skipped > 0);
    const third = scaffoldProject({ target: dir, force: true });
    assert.notEqual(readFileSync(cfgPath, "utf8"), "TAMPERED");
    assert.ok(third.written > 0);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

// First-time user flow: scaffold -> validate the generated config.
test("first-time flow: scaffolded project passes validation", () => {
  const dir = tmp();
  try {
    scaffoldProject({ target: dir });
    const cfg = JSON.parse(readFileSync(join(dir, "research-project.json"), "utf8"));
    const res = validateConfigObject(cfg);
    const errors = res.issues.filter((i) => i.level === "error");
    assert.deepEqual(errors, [], `scaffolded config should validate: ${JSON.stringify(errors)}`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
