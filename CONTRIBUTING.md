# Contributing to GobeshonaLabAgent

Thank you for helping build a free, open-source AI research agent toolkit. This project values
**academic integrity above fluency**: contributions must strengthen traceability, honesty, and
reproducibility — never make it easier to fabricate.

## Ground rules

1. **Never add fabrication.** No skill, template, or tool may invent papers, authors, DOIs, URLs,
   quotations, datasets, or results. Features that would help a user overclaim or fabricate will be
   rejected.
2. **Original, general guidance only.** The `knowledge/` base is the project's own statement of
   general, widely-accepted research-writing and research-integrity principles. Do **not** paste in
   or paraphrase proprietary, unpublished, or copyrighted third-party text (books, articles, course
   notes, etc.). Do not attribute general principles to a fabricated source.
3. **No private material in the repo.** Keep any personal or unpublished source material outside the
   repository; `.gitignore` excludes `.private/`, `.work/`, and `*.pdf`.
4. **The researcher stays in control.** Skills must not silently invent or change a hypothesis,
   research question, result, or the permitted source set.

## Development setup

```bash
npm install
npm run build        # compile src/ -> dist/
npm test             # typecheck tests + run the node:test suite
npm run validate     # gobeshona validate (skills + manifests)
node dist/cli/index.js doctor
```

- Node.js >= 18. No required runtime dependencies; dev-only TypeScript + @types/node.

## Adding or changing a skill

- Each skill is a folder under `skills/<name>/` with a `SKILL.md` whose YAML frontmatter has
  `name` (matching the folder, lowercase-hyphen) and a `description` that states **what** it does and
  **when** to use it. Add a `metadata` block with `version`, `partOf: gobeshonalab-agent`, and
  `knowledgeRefs`.
- Follow the body structure: Purpose, When to use, Inputs, Outputs, Instructions (or Workflow
  stages), Quality gates, Anti-fabrication rules, References.
- Reference `knowledge/` rather than restating principles at length.
- Run `npm run validate` — skills must have **zero errors**.
- If you add a skill, update `.claude-plugin/marketplace.json`, the `EXPECTED` list in
  `tests/skills.test.ts`, and `docs/`.

## Tests

- Add tests under `tests/` using `node:test`. New quality rules should come with a fixture under
  `examples/fixtures/` and an assertion.
- All checks must pass in CI (lint/typecheck, unit tests, skill validation).

## Pull requests

- Keep PRs focused. Describe what changed and which checks you ran.
- By contributing, you agree your code is licensed Apache-2.0 and your written content CC BY 4.0
  (see `LICENSE` and `LICENSE-CONTENT`), and that it is your own original work.
- Be kind; see [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md).
