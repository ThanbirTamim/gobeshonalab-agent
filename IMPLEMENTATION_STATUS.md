# Implementation Status

Project: **GobeshonaLabAgent** — Open-source AI research agent toolkit for evidence-based academic
writing and reproducible research. Tagline: *From Research Ideas to Evidence-Backed Papers.*

Last updated: rebranding + release-readiness pass.

## Identity

| Item | Value |
|------|-------|
| Product name | GobeshonaLabAgent |
| GitHub repo slug | `gobeshonalab-agent` (org/user `gobeshonalab`) — not yet created/pushed |
| npm package | `@gobeshonalab/agent` — **intended**, not reserved/published/verified |
| CLI command | `gobeshona` (`package.json` `bin`) |
| Plugin + marketplace name | `gobeshonalab-agent` |

## Completed

- [x] **Privacy remediation.** Removed all identifiers of the private/unpublished source (title,
      author, chapter titles, page numbers, and source-specific metadata) from every public file.
      Moved private derived material to `.private/` (git-ignored). Rewrote the knowledge base as the
      project's own, general, original research-writing principles. Reworked
      `LICENSE-CONTENT`/`NOTICE` so they no longer claim any right to redistribute
      third-party/unpublished material.
- [x] **Rebrand** across code, CLI help, package metadata, plugin + marketplace manifests, config
      schema `$id`, docs, examples, tests, and governance files.
- [x] Renamed the gateway skill to `writing-guidelines` (points to the general principles base).
- [x] **16 skills** present and valid (0 validation errors).
- [x] **CLI** (`gobeshona`): `list`, `new`/`init` (scaffolder), `install <skill>|all`, `validate`
      (positional or `--config`), `doctor`; dry-run, overwrite protection, path-traversal rejection,
      exit codes `0/1/2/3`.
- [x] **Project scaffolder** (`src/lib/scaffold.ts`) producing a schema-valid starter config + README.
- [x] **Tests** (`node:test`): frontmatter, skills metadata, safe install, scaffolding + first-time
      flow, manifests, documentation-link integrity, config/quality fixtures — **30 tests passing**.
- [x] **Docs**: README, installation, quickstart, user-guide, interfaces, project-config,
      free-and-licensing, publishing, troubleshooting, architecture, end-to-end example.
- [x] **CI** (`.github/workflows/ci.yml`): lint, build, test, validate, doctor on Node 18/20/22.
- [x] `npm pack --dry-run` reviewed; `files` allowlist excludes private/dev material.

## Verification results (this environment)

| Check | Result |
|-------|--------|
| `npm run lint` (tsc --noEmit) | pass |
| `npm run build` | pass |
| `npm test` | **30/30 pass** |
| `gobeshona validate` (skills + manifests) | 0 errors |
| `gobeshona doctor` | all checks pass |
| `gobeshona new` → `validate` (first-time flow) | pass |
| `install` dry-run / overwrite-protection / path-traversal | pass (unit-tested) |
| `npm pack --dry-run` | reviewed; only intended files included |
| Private-source identifier scan of tracked files | clean (0 matches) |

## Not implemented / roadmap

- [ ] Native YAML parsing in the config validator (currently JSON-first).
- [ ] Automatic citation cross-reference checker (draft + `.bib`/CSL-JSON).
- [ ] Offline DOI/metadata verification against a local index.
- [ ] Dedicated `uninstall`/`update` commands (today: `install --force` to update; delete folder to remove).
- [ ] pandoc-based DOCX/PDF export recipes + `doctor` probe.
- [ ] Certified adapters for non-Claude-Code agents (documented patterns only today).
- [ ] Optional graphical UI (described in ROADMAP; **not** implemented).

## Git history note

The repository had a single local commit (no remote, nothing pushed) whose tree included private
derived materials. Because nothing was ever published, the safe cleanup is to **re-initialize
local history** so the sensitive content never appears in any commit. This is done locally only; no
remote history is rewritten. If you later discover the old commit was pushed somewhere, treat the
content as exposed and rotate accordingly (it was not pushed from here).

## Next concrete action

1. Review `docs/publishing.md` and confirm the npm scope `@gobeshonalab` availability/ownership.
2. Create the GitHub repo `gobeshonalab/gobeshonalab-agent`, push `main`, tag `v0.1.0`.
3. `npm login` and `npm publish --access public` when ready.
