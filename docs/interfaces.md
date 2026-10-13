# Interfaces

GobeshonaLabAgent can be used four ways. They differ only in **how the skills are loaded and run** —
the skill content is the same portable Markdown in every case.

## A. Claude Code plugin (easiest)

Install the whole toolkit as a Claude Code plugin from this GitHub repository:

```
/plugin marketplace add ThanbirTamim/gobeshonalab-agent
/plugin install gobeshonalab-agent@gobeshonalab-agent
```

- The manifests are in `.claude-plugin/` (`marketplace.json`, `plugin.json`), both named
  `gobeshonalab-agent`, listing all 16 skills.
- After installing, inspect the skills by asking Claude Code to list available skills, then invoke
  the full workflow: *"Use the `research-paper-workflow` skill with my `research-project.json`."*
- The exact `/plugin` syntax is defined by Claude Code; the schema of our manifests matches the
  current marketplace format. Remote installation from GitHub has not been verified from this build
  environment — verify in your own Claude Code before relying on it.

## B. Standalone skills (any agent with a skills directory)

Install one or all skills into a project's agent-skills directory with the CLI. Copyable commands:

```bash
# List skills
node dist/cli/index.js list

# Install ONE skill
node dist/cli/index.js install methodology-designer --target ./.claude/skills

# Install ALL skills
node dist/cli/index.js install all --target ./.claude/skills

# Validate a research project
node dist/cli/index.js validate research-project.json

# Check installation & dependencies
node dist/cli/index.js doctor
```

- **Preview without writing:** add `--dry-run`.
- **Overwrite protection:** existing files are never overwritten unless you pass `--force`.
- **Update:** re-run with `--force`.
- **Remove:** skills are plain folders — delete the folder (e.g. `rm -rf ./.claude/skills/<name>`).
  A dedicated `uninstall` command is on the roadmap.

Once published to npm, the same commands are available as `gobeshona ...` or `npx @gobeshonalab/agent ...`.

## C. CLI / npm

The installed executable is **`gobeshona`**. Proposed npm usage (package not yet published):

```bash
npx @gobeshonalab/agent --help
npx @gobeshonalab/agent list
npx @gobeshonalab/agent new my-paper
npx @gobeshonalab/agent install all --target .claude/skills
npx @gobeshonalab/agent validate research-project.json
```

All commands provide argument validation, actionable error messages, safe path handling, overwrite
protection, and meaningful exit codes (`0` success; `1` error/validation failure; `2` usage error;
`3` refused unsafe path).

## D. Other AI coding agents

The skills are portable Markdown with YAML frontmatter (`name`, `description`) plus supporting files.
Any agent that can load instructions from files can use them.

- **Tested loading mechanism:** Claude Code (plugin or `./.claude/skills/`).
- **Documented adapter patterns (not certified for every agent):** install the skills into a
  directory and point a filesystem-capable agent at it, or paste a `SKILL.md` body into a
  system-prompt/context agent. See [`adapters.md`](./adapters.md) for details.

We deliberately **do not** claim compatibility with every AI agent. Where a runtime is untested, the
docs say so; validate in your own environment before relying on it.

## E. Graphical UI (not implemented)

The initial release is a polished CLI plus the agent workflow — intentionally **no** web app. A
future, optional UI (to configure projects, map papers to sections, inspect citations, monitor
experiments, and review manuscripts) is described in [`../ROADMAP.md`](../ROADMAP.md). It is a
proposal, not an implemented feature.
