import { test } from "node:test";
import assert from "node:assert/strict";
import { validateManifests } from "../src/lib/manifests.js";

test("distribution manifests are valid and reference real skills", () => {
  const issues = validateManifests();
  const errors = issues.filter((i) => i.level === "error");
  assert.deepEqual(errors, [], `manifest errors: ${JSON.stringify(errors, null, 2)}`);
});
