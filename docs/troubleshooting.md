# Troubleshooting

Common installation and execution problems and how to resolve them.

## `gobeshona: command not found`

The CLI is only on your `PATH` after a global/npm install. Until then, run it from the repo:

```bash
node dist/cli/index.js <command>
```

Make sure you ran `npm install && npm run build` first (the `dist/` folder must exist).

## `Cannot find module '.../dist/cli/index.js'`

You have not built the project. Run:

```bash
npm run build
```

## `npm install` fails with an EPERM / cache permission error

Your npm cache directory may be owned by another user. Use a local cache:

```bash
npm install --cache ./.npm-cache
```

(or fix ownership of your global npm cache per npm's instructions).

## `validate` reports errors

- **`missing required section 'research'`** etc. — your config is missing a required block. Compare
  with the scaffolded `research-project.json` (`gobeshona new`) or the schema at
  `config/research-project.schema.json`.
- **`duplicate source id '...'`** — the same paper id appears twice in `sources`. Remove the
  duplicate.
- **`references unknown source id '...'`** — a `sectionSources`/gap/baseline entry points to an id
  not present in `sources`. Add the source or fix the id.
- **`a hypothesis is set but researchType is 'qualitative'`** (warning) — qualitative/exploratory
  work should use an open-ended research question, not a confirmatory hypothesis.

Warnings do not fail validation; errors do (exit code `1`).

## The validator only accepts JSON

Project-config validation currently parses **JSON**. If you keep your config as YAML, convert it to
JSON before validating. Native YAML parsing is on the roadmap.

## `install` says `(exists; use --force to overwrite)`

Overwrite protection is working as intended. To update an installed skill, re-run with `--force`:

```bash
node dist/cli/index.js install <skill> --target ./.claude/skills --force
```

## `refused unsafe path: ...`

The installer rejected a `--target` containing `..`, an absolute escape, or a path that would write
outside the target directory. Choose a normal target directory such as `./.claude/skills`.

## The AI agent does not pick up a skill

- Confirm the skill folder exists under the directory your agent scans (e.g. `./.claude/skills/<name>/SKILL.md`).
- For Claude Code plugins, confirm the plugin installed and the marketplace was added
  (see [`interfaces.md`](./interfaces.md)).
- Try invoking the skill explicitly by name.

## Figures or experiments "did nothing"

The toolkit never fabricates results. If an experiment cannot run in your environment, the
`experiment-runner` skill marks results **unavailable** and emits reproduction instructions instead
of inventing numbers. Quantitative figures require real data via a `dataSource`.

## Still stuck?

Run the health check and read its output:

```bash
node dist/cli/index.js doctor
```

Then open an issue (see [`../SECURITY.md`](../SECURITY.md) for private/security concerns).
