import { test } from "node:test";
import assert from "node:assert/strict";
import { loadAllSkills, validateSkills } from "../src/lib/skills.js";

const EXPECTED = [
  "writing-guidelines", "paper-ingestion", "source-mapping", "research-design",
  "introduction-writer", "literature-review", "methodology-designer",
  "implementation-engineer", "experiment-runner", "results-analyst",
  "figure-planner", "discussion-conclusion", "reference-auditor",
  "manuscript-assembler", "final-reviewer", "research-paper-workflow",
];

test("all 16 skills are discovered", () => {
  const skills = loadAllSkills();
  const names = skills.map((s) => s.name).sort();
  for (const e of EXPECTED) {
    assert.ok(names.includes(e), `missing skill: ${e}`);
  }
  assert.equal(skills.length, EXPECTED.length);
});

test("every skill has a non-trivial description and matching name", () => {
  for (const s of loadAllSkills()) {
    assert.ok(s.name.length > 0, `${s.dir} missing name`);
    assert.ok(s.description.length >= 40, `${s.name} description too short`);
    assert.ok(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(s.name), `${s.name} not lowercase-hyphen`);
  }
});

test("skill validation reports no errors", () => {
  const issues = validateSkills();
  const errors = issues.filter((i) => i.level === "error");
  assert.deepEqual(errors, [], `skill validation errors: ${JSON.stringify(errors, null, 2)}`);
});

test("every skill description mentions when to use it (heuristic)", () => {
  for (const s of loadAllSkills()) {
    const d = s.description.toLowerCase();
    assert.ok(
      d.includes("use") || d.includes("when") || d.includes("whenever") || d.includes("after"),
      `${s.name} description should indicate when to use the skill`
    );
  }
});
