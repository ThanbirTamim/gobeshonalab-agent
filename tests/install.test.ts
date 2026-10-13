import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, writeFileSync, mkdirSync, existsSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { installSkills, safeJoin, UnsafePathError } from "../src/lib/install.js";

function tmp(): string {
  return mkdtempSync(join(tmpdir(), "rps-test-"));
}

test("safeJoin rejects path traversal", () => {
  assert.throws(() => safeJoin("/base", "../etc/passwd"), UnsafePathError);
  assert.throws(() => safeJoin("/base", "a/../../b"), UnsafePathError);
  assert.throws(() => safeJoin("/base", "/absolute/evil"), UnsafePathError);
});

test("safeJoin allows normal nested paths", () => {
  const p = safeJoin("/base", "skills/foo/SKILL.md");
  assert.ok(p.endsWith("/base/skills/foo/SKILL.md") || p.endsWith("\\base\\skills\\foo\\SKILL.md"));
});

test("dry-run writes nothing", () => {
  const dir = tmp();
  try {
    const res = installSkills(["writing-guidelines"], { target: dir, dryRun: true });
    assert.equal(res.dryRun, true);
    assert.ok(res.written > 0, "dry-run should report files it would write");
    assert.ok(!existsSync(join(dir, "writing-guidelines")), "dry-run must not create files");
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("install copies the skill, and overwrite protection blocks a second write", () => {
  const dir = tmp();
  try {
    const first = installSkills(["writing-guidelines"], { target: dir });
    assert.ok(first.written > 0);
    const skillFile = join(dir, "writing-guidelines", "SKILL.md");
    assert.ok(existsSync(skillFile));

    // Tamper with the installed file, then install again WITHOUT --force.
    writeFileSync(skillFile, "TAMPERED");
    const second = installSkills(["writing-guidelines"], { target: dir });
    assert.equal(readFileSync(skillFile, "utf8"), "TAMPERED", "existing file must be protected");
    assert.ok(second.skipped > 0, "second install should skip existing files");

    // With force, it overwrites.
    const third = installSkills(["writing-guidelines"], { target: dir, force: true });
    assert.notEqual(readFileSync(skillFile, "utf8"), "TAMPERED", "force should overwrite");
    assert.ok(third.written > 0);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("install all installs every skill", () => {
  const dir = tmp();
  try {
    const res = installSkills("all", { target: dir });
    assert.ok(res.plan.length >= 16);
    assert.ok(existsSync(join(dir, "methodology-designer", "SKILL.md")));
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});

test("unknown skill name throws a clear error", () => {
  const dir = tmp();
  try {
    assert.throws(() => installSkills(["does-not-exist"], { target: dir }), /unknown skill/);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
});
