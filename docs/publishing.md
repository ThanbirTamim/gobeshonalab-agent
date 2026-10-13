# Publishing

How to publish GobeshonaLabAgent to GitHub and npm yourself. **Nothing here has been published or
pushed** — these are the exact steps and prerequisites for you to run.

## Naming decisions (confirm before publishing)

| Item | Value | Status |
|------|-------|--------|
| Product name | `GobeshonaLabAgent` | chosen |
| GitHub repo slug | `gobeshonalab-agent` (under org/user `gobeshonalab`) | **you must create** |
| npm package | `@gobeshonalab/agent` | **not reserved/verified** — see below |
| CLI command | `gobeshona` | chosen (declared in `package.json` `bin`) |
| Tagline | `From Research Ideas to Evidence-Backed Papers.` | chosen |

The npm scope `@gobeshonalab` and package `@gobeshonalab/agent` are the project's **intended**
identity. They are not reserved or published, and availability was not verified from this build
environment. Before publishing, confirm availability and ownership:

```bash
npm view @gobeshonalab/agent          # 404 => name is free (or you lack access)
npm org ls gobeshonalab 2>/dev/null   # confirms you own/belong to the scope
```

If the scope is unavailable or you do not own it, change `name` in `package.json` (and references in
docs) to a scope you control, or an unscoped name you can claim, before publishing.

## Pre-flight checklist (private-content safe-release)

Run from the repo root:

```bash
# 1. Build, lint, test, validate
npm run lint && npm run build && npm test
node dist/cli/index.js validate && node dist/cli/index.js doctor

# 2. Confirm NO private/unpublished-source identifiers are tracked.
#    Keep your own list of sensitive terms OUTSIDE the repo (e.g. in .private/release-denylist.txt,
#    one term per line) so the terms themselves are never published, then:
git ls-files | xargs grep -nIif .private/release-denylist.txt ; echo "exit: $?"
#   -> expect NO matches (grep exit code 1 = clean). Also scan for page-citation patterns:
git ls-files | xargs grep -nIE "p\.[0-9]+ ?/ ?PDF p[0-9]+" ; echo "exit: $?"

# 3. Confirm private dirs are ignored and untracked
git check-ignore .private .work || echo "WARNING: private dirs not ignored"
git ls-files | grep -E "^\.private/|^\.work/|\.pdf$" || echo "clean: no private files tracked"

# 4. Inspect the npm package contents BEFORE publishing
npm pack --dry-run
```

Inspect the `npm pack --dry-run` file list: it must contain only `dist/`, `skills/`, `knowledge/`,
`config/`, `docs/`, `.claude-plugin/`, `LICENSE`, `LICENSE-CONTENT`, `NOTICE`, `README.md`,
`package.json` — and **must not** contain `.private/`, `.work/`, `*.pdf`, `tests/`, `src/`, or
`node_modules/`. (The `files` allowlist in `package.json` enforces this.)

## GitHub publication

```bash
# Create the repo on github.com (org or personal), then:
git remote add origin https://github.com/gobeshonalab/gobeshonalab-agent.git
git branch -M main
git push -u origin main

# Tag a release
git tag -a v0.1.0 -m "GobeshonaLabAgent 0.1.0"
git push origin v0.1.0
```

CI (`.github/workflows/ci.yml`) runs lint/typecheck, tests, and skill validation on push and PRs.
Create a GitHub Release from the `v0.1.0` tag and paste the `CHANGELOG.md` entry.

## npm publication

Prerequisites you must provide: an npm account, membership/ownership of the chosen scope, and
`npm login` on your machine. Then:

```bash
npm login
npm run build                 # ensure dist/ is current (also runs on prepare)
npm pack --dry-run            # final content review
npm publish --access public   # scoped packages need --access public
```

### Updating future versions

```bash
# bump version (updates package.json and creates a git tag)
npm version patch   # or: minor | major
git push && git push --tags
npm publish --access public
```

Update `CHANGELOG.md` for every release.

## What requires your credentials / approval

- Creating the GitHub repository and pushing (your GitHub account).
- Reserving the npm scope `@gobeshonalab` and publishing (your npm account + `npm login`).
- Deciding the final package name if `@gobeshonalab/agent` is unavailable.

Do not expect any of these to have happened automatically — they have not.
