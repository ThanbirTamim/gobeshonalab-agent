# Publishing

How to publish GobeshonaLabAgent to npm and cut a tagged release. **Current state:** the GitHub
repository already exists and `main` is pushed at
<https://github.com/ThanbirTamim/gobeshonalab-agent> with CI passing. **Not yet done:** no git tag
(`v0.1.0`), no GitHub Release, and nothing published to npm. The steps below cover those remaining
actions and their prerequisites — run them yourself.

## Naming decisions (confirm before publishing)

| Item | Value | Status |
|------|-------|--------|
| Product name | `GobeshonaLabAgent` | chosen |
| GitHub repo | `ThanbirTamim/gobeshonalab-agent` | created & pushed, CI passing |
| npm package | `@gobeshonalab/agent` | **not published** (name is free; see scope note) |
| CLI command | `gobeshona` | chosen (declared in `package.json` `bin`) |
| Tagline | `From Research Ideas to Evidence-Backed Papers.` | chosen |

The npm package `@gobeshonalab/agent` is unpublished: `npm view @gobeshonalab/agent` returns 404 and
no packages exist under the `@gobeshonalab` scope. **Scope-ownership note:** the GitHub owner is
`ThanbirTamim`, but the package uses the `@gobeshonalab` npm scope. A scoped package can only be
published if that scope is your npm **username** or an npm **org** you belong to. Before publishing,
either create/join the `gobeshonalab` npm org, or change `name` in `package.json` to a scope you own
(e.g. `@thanbirtamim/gobeshonalab-agent` or an unscoped name). Confirm with:

```bash
npm view @gobeshonalab/agent          # 404 => name is free
npm whoami                            # your npm username
npm org ls gobeshonalab 2>/dev/null   # confirms you own/belong to the scope
```

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

## GitHub release (repo already pushed)

`main` is already on GitHub with CI green, so only the tag and Release remain:

```bash
git tag -a v0.1.0 -m "GobeshonaLabAgent 0.1.0"
git push origin v0.1.0
```

Then create a GitHub Release from the `v0.1.0` tag and paste the `CHANGELOG.md` entry. CI
(`.github/workflows/ci.yml`) runs lint/typecheck, build, tests, and skill validation on push and PRs.

> If you ever need to re-point the remote: `git remote set-url origin https://github.com/ThanbirTamim/gobeshonalab-agent.git`

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

- Creating the `v0.1.0` tag + GitHub Release (your GitHub account).
- Publishing to npm: an npm account, ownership of the chosen scope, and `npm login` (your npm account).
- Deciding the final package name/scope if you do not own `@gobeshonalab`.

The repository and `main` branch are already pushed; tagging, the Release, and npm publish have **not**
happened and will not happen automatically.
