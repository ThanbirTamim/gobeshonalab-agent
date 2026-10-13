import { test } from "node:test";
import assert from "node:assert/strict";
import { parseFrontmatter, splitFrontmatter } from "../src/lib/frontmatter.js";

test("splitFrontmatter extracts the block and body", () => {
  const content = "---\nname: foo\n---\nBody here\nmore";
  const { raw, body } = splitFrontmatter(content);
  assert.ok(raw && raw.includes("name: foo"));
  assert.equal(body, "Body here\nmore");
});

test("returns null raw when no frontmatter", () => {
  const { raw, body } = splitFrontmatter("# just a title\n");
  assert.equal(raw, null);
  assert.equal(body, "# just a title\n");
});

test("parses scalar and folded description", () => {
  const content = [
    "---",
    "name: my-skill",
    "description: >-",
    "  First line",
    "  second line",
    "metadata:",
    "  version: 1.0.0",
    "  knowledgeRefs:",
    "    - a/b.md",
    "    - c/d.md",
    "---",
    "Body",
  ].join("\n");
  const { data } = parseFrontmatter(content);
  assert.equal(data.name, "my-skill");
  assert.equal(data.description, "First line second line");
  const meta = data.metadata as Record<string, unknown>;
  assert.equal(meta.version, "1.0.0");
  assert.deepEqual(meta.knowledgeRefs, ["a/b.md", "c/d.md"]);
});
