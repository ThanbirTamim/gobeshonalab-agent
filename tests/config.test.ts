import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { repoRoot } from "../src/lib/skills.js";
import { validateConfigObject, type ConfigValidationResult } from "../src/lib/config.js";

function loadFixture(name: string): ConfigValidationResult {
  const path = join(repoRoot(), "examples", "fixtures", name, "research-project.json");
  const cfg = JSON.parse(readFileSync(path, "utf8"));
  return validateConfigObject(cfg);
}

function hasError(res: ConfigValidationResult, re: RegExp): boolean {
  return res.issues.some((i) => i.level === "error" && re.test(i.message));
}
function hasWarning(res: ConfigValidationResult, re: RegExp): boolean {
  return res.issues.some((i) => i.level === "warning" && re.test(i.message));
}

// Scenario 1 — five papers, different sections: valid.
test("scenario 1: five-papers config is valid", () => {
  const res = loadFixture("five-papers");
  const errors = res.issues.filter((i) => i.level === "error");
  assert.deepEqual(errors, [], `unexpected errors: ${JSON.stringify(errors)}`);
  assert.equal(res.ok, true);
});

// Scenario 2 — incomplete metadata flagged (and scenario 4 unverifiable present).
test("scenario 2+4: incomplete metadata is flagged", () => {
  const res = loadFixture("incomplete-metadata");
  assert.ok(hasWarning(res, /incomplete metadata but is marked verified/), "should warn on incomplete+verified");
});

// Scenario 8 — unsupported figure (no dataSource) + unknown section source.
test("scenario 8: quantitative figure without dataSource warns; unknown section source errors", () => {
  const res = loadFixture("unsupported-figure");
  assert.ok(hasWarning(res, /no dataSource/), "quantitative figure w/o dataSource should warn");
  assert.ok(hasError(res, /unknown source id 'ghost2099'/), "unknown section source should error");
});

// Scenario 9 — duplicate paper.
test("scenario 9: duplicate source id is an error", () => {
  const res = loadFixture("duplicate-paper");
  assert.ok(res.duplicateSources.includes("doe2020"));
  assert.ok(hasError(res, /duplicate source id 'doe2020'/));
  assert.equal(res.ok, false);
});

// Scenario 12 — qualitative study is valid with no false hypothesis/experiment warnings.
test("scenario 12: qualitative study valid, no false hypothesis warning", () => {
  const res = loadFixture("qualitative-study");
  const errors = res.issues.filter((i) => i.level === "error");
  assert.deepEqual(errors, [], `unexpected errors: ${JSON.stringify(errors)}`);
  assert.ok(!hasWarning(res, /no hypothesis is set/), "qualitative study must not be warned for lacking a hypothesis");
});

// Bonus — hypothesis forced onto a qualitative study warns.
test("bonus: hypothesis on a qualitative study warns", () => {
  const res = loadFixture("hypothesis-on-qualitative");
  assert.ok(hasWarning(res, /hypothesis is set but researchType is 'qualitative'/));
});

// Guard — a confirmatory quantitative study with contributions missing type is an error.
test("guard: invalid contribution type is an error", () => {
  const res = validateConfigObject({
    project: { title: "x y z", discipline: "cs", researchType: "quantitative" },
    research: {
      concept: "something here", problemStatement: "problem here",
      hypothesis: "H",
      researchQuestions: [{ id: "RQ1", text: "q?" }],
      objectives: ["o"],
      contributions: [{ text: "c", type: "not-a-type" }],
    },
    sources: [],
    sectionSources: {},
  });
  assert.ok(hasError(res, /type must be novelty/));
});

// Guard — comprehensive-coverage claim without a documented search strategy errors.
test("guard: comprehensive coverage claim requires documented search", () => {
  const res = validateConfigObject({
    project: { title: "a b c", discipline: "cs", researchType: "review" },
    research: {
      concept: "review concept", problemStatement: "review problem",
      researchQuestions: [{ id: "RQ1", text: "q?" }],
      objectives: ["o"], contributions: [{ text: "c", type: "novelty" }],
      literatureSearch: { claimsComprehensiveCoverage: true },
    },
    sources: [], sectionSources: {},
  });
  assert.ok(hasError(res, /no documented search strategy/));
});
