# Installation

GobeshonaLabAgent works at two layers: the **portable skills** (just Markdown files) and the
**optional CLI** (`gobeshona`, Node.js) that scaffolds, installs, and validates them.

## Option A — Claude Code plugin + marketplace (recommended for Claude Code)

Add this repository as a plugin marketplace, then install the plugin:

```
/plugin marketplace add gobeshonalab/gobeshonalab-agent
/plugin install gobeshonalab-agent@gobeshonalab-agent
```

> The marketplace/plugin manifests live in `.claude-plugin/` (marketplace name `gobeshonalab-agent`,
> plugin name `gobeshonalab-agent`). The exact `/plugin` commands follow Claude Code's current
> plugin-marketplace workflow; if the command names change upstream, consult Claude Code's
> documentation. We do not control that interface, and remote installation has not been verified from
> this environment.

After installing, invoke a skill by mentioning it, e.g. *"Use the methodology-designer skill to draft
the methodology for my project config."*

## Option B — Install skills with the CLI (any agent project)

```bash
git clone https://github.com/gobeshonalab/gobeshonalab-agent
cd gobeshonalab-agent
npm install && npm run build

# List what is available
node dist/cli/index.js list

# Install one skill into a project's skills directory (dry-run first)
node dist/cli/index.js install methodology-designer --target ./.claude/skills --dry-run
node dist/cli/index.js install methodology-designer --target ./.claude/skills

# Install the whole toolkit
node dist/cli/index.js install all --target ./.claude/skills
```

Once installed globally or via npm, the same commands are available as `gobeshona list`,
`gobeshona install ...`, etc.

Safety: the installer refuses path traversal, never writes outside `--target`, and will not overwrite
existing files unless you pass `--force`. Use `--dry-run` to preview.

## Option C — Copy a single skill by hand

A skill is a self-contained folder. Copy it anywhere your agent discovers skills:

```bash
cp -r skills/figure-planner /path/to/your/.claude/skills/
```

## Option D — npm (optional, once published)

```bash
npx @gobeshonalab/agent list
npx @gobeshonalab/agent install all --target ./.claude/skills
```

> The npm package `@gobeshonalab/agent` is the project's intended identity; it is not yet published.
> See [`publishing.md`](./publishing.md).

## Updating and removing skills

- **Update:** re-run `install ... --force` to overwrite installed copies with the current version.
- **Remove:** installed skills are plain folders; delete the folder under your skills directory
  (e.g. `rm -rf ./.claude/skills/figure-planner`). A dedicated `uninstall` command is on the roadmap.

## Verifying your installation

```bash
node dist/cli/index.js doctor
node dist/cli/index.js validate
```

## Other agents

See [`interfaces.md`](./interfaces.md) and [`adapters.md`](./adapters.md) for using the skills with
agent runtimes other than Claude Code.
