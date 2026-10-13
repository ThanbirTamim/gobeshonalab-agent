# Using the skills with other AI agents

The skills are **portable Markdown** with YAML frontmatter (`name`, `description`) plus supporting
files. Any agent runtime that can load instructions from files can use them; only the *loading
mechanism* differs. This document describes documented adapters. It does **not** claim compatibility
that has not been tested — where something is untested, it says so.

## What a skill is

```
skills/<name>/
  SKILL.md          # YAML frontmatter + Markdown instructions
  references/ ...   # optional supporting docs
  templates/ ...    # optional templates/scripts
```

The frontmatter contract this project relies on:

```yaml
---
name: methodology-designer
description: >-
  What it does and when to use it.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs: [knowledge/...]
---
```

## Adapter 1 — Claude Code (tested loading mechanism)

Use the plugin/marketplace flow or the CLI installer (see `installation.md`). Skills are discovered
from the project's `.claude/skills/` directory or via the installed plugin.

## Adapter 2 — Generic "system prompt / context" agents

For an agent that accepts a block of instructions:

1. Pick the skill(s) relevant to the task.
2. Concatenate the `SKILL.md` body (below the frontmatter) into the agent's instructions/context.
3. Make the `knowledge/` files and the skill's `references/`/`templates/` available as readable files
   (or paste the specific referenced sections).
4. Provide the researcher's `research-project.json` as context.

The `description` field is the trigger text: use it to decide when to load the skill.

## Adapter 3 — Agents with a filesystem tool

If the agent can read files, install the skills with the CLI into any directory and point the agent
at that directory. The agent reads `SKILL.md` on demand and follows the referenced `knowledge/`
files. This mirrors how the skills are authored (progressive disclosure: load detail only when
needed).

## Honest compatibility note

- The **content** is runtime-agnostic by construction.
- The **plugin/marketplace** install path is specific to Claude Code's current implementation.
- We have **not** certified behavior inside every third-party agent; treat Adapters 2 and 3 as
  documented patterns to adapt, and validate in your own environment before relying on them.
