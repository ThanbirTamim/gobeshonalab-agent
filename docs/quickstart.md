# Quick Start

Your first successful workflow with GobeshonaLabAgent, using a small example that needs no private
material.

## 1. Get the toolkit and build it

```bash
git clone https://github.com/gobeshonalab/gobeshonalab-agent
cd gobeshonalab-agent
npm install && npm run build
```

Check the environment:

```bash
node dist/cli/index.js doctor
```

## 2. See the skills

```bash
node dist/cli/index.js list
```

You should see 16 skills, including the `research-paper-workflow` orchestrator.

## 3. Scaffold a project

```bash
node dist/cli/index.js new my-paper
```

This creates `my-paper/research-project.json` (a valid starter config) and `my-paper/README.md` with
next steps. It never overwrites existing files without `--force`.

## 4. Edit and validate your config

Open `my-paper/research-project.json` and fill in your title, discipline, `researchType`, research
question(s), objectives, contributions, and the sources you are authorized to use. Then:

```bash
node dist/cli/index.js validate my-paper/research-project.json
```

Fix any **errors** (warnings are advisory). See [`project-config.md`](./project-config.md) for the
field-by-field guide.

## 5. Install the skills into your project

```bash
node dist/cli/index.js install all --target my-paper/.claude/skills
```

(or install just the ones you need, e.g. `install methodology-designer`).

## 6. Run the workflow in your AI agent

Open `my-paper/` in a compatible AI agent (e.g. Claude Code with the skills installed or the plugin
added). Ask it to **use the `research-paper-workflow` skill** and point it at `research-project.json`.
You can also invoke any single skill, for example:

> "Use the `introduction-writer` skill to draft the introduction from my research-project.json."

## Try the worked example

A fuller, synthetic example (five sources, experiments, figures) lives at
[`../examples/fixtures/five-papers/`](../examples/fixtures/five-papers/). Validate it:

```bash
node dist/cli/index.js validate examples/fixtures/five-papers/research-project.json
```

See [`end-to-end-example.md`](./end-to-end-example.md) for the stage-by-stage walkthrough.

## What is automated vs. your judgment

The toolkit automates structure and integrity checks (config validity, source-to-section mapping,
duplicate detection, figure provenance, citation resolution). It does **not** automate scientific
judgment: whether a source truly supports a claim, whether an equation is correct, whether a
conclusion overclaims, and whether results are meaningful remain **your** decisions, with
domain-expert review where appropriate. See [`user-guide.md`](./user-guide.md).
