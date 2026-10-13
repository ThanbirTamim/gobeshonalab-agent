# GobeshonaLabAgent

[![CI](https://github.com/ThanbirTamim/gobeshonalab-agent/actions/workflows/ci.yml/badge.svg)](https://github.com/ThanbirTamim/gobeshonalab-agent/actions/workflows/ci.yml)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](./LICENSE)

> **From Research Ideas to Evidence-Backed Papers.**
>
> Open-source AI research agent toolkit for evidence-based academic writing and reproducible research.

GobeshonaLabAgent is a toolkit of portable **Agent Skills** plus an optional CLI that guides a
researcher through developing a complete, **evidence-traceable** scientific manuscript — from
research question to a publication-readiness review — with strict academic-integrity and
reproducibility gates.

The research-writing standards it enforces are the project's own statement of **general,
widely-accepted research-methods and research-integrity principles** (see
[`knowledge/`](./knowledge/)). The toolkit contains no third-party book content.

> **Honesty first.** This toolkit optimizes for *traceable, verifiable* research — not fluent prose.
> It never invents papers, data, results, or citations; it never claims a manuscript is accepted or
> guaranteed to pass peer review. Where evidence is missing, it surfaces the gap, and consequential
> scientific judgments stay with you.

## What it does

Give it a researcher-owned [project configuration](./docs/project-config.md) — your concept,
questions, (optional) hypothesis, objectives, contributions, source papers, per-section source
assignments, datasets, implementation/experiment plans, and figure requirements — and it coordinates
focused skills to help you develop: the research framing; a traceable paper inventory; a
source-to-section map; an introduction and synthesis literature review; a discipline-adaptive
methodology (mathematical where appropriate, qualitative rigor otherwise); optional implementation,
tests, and safely-executed experiments; results analysis and figures (conceptual prompts +
reproducible quantitative plots); discussion, limitations, conclusion; a verified bibliography; an
assembled manuscript; and integrity + readiness reports.

It supports conceptual, theoretical, qualitative, quantitative, mixed-methods, review, and
computational research. **Experiments are optional.**

## Quick start

You can use GobeshonaLabAgent directly via npm without cloning the repository:

```bash
npx @thanbir-tamim/gobeshonalab-agent list
npx @thanbir-tamim/gobeshonalab-agent new my-paper
npx @thanbir-tamim/gobeshonalab-agent install all --target .claude/skills
npx @thanbir-tamim/gobeshonalab-agent validate my-paper/research-project.json
```

The installed executable is **`gobeshona`** (e.g. `gobeshona list`).

Alternatively, you can clone the repository for local development:

```bash
git clone https://github.com/ThanbirTamim/gobeshonalab-agent
cd gobeshonalab-agent
npm install && npm run build
```

Then, in a compatible AI agent (e.g. Claude Code), invoke the `research-paper-workflow` skill and
point it at your `research-project.json`. Full walkthrough: [`docs/quickstart.md`](./docs/quickstart.md).

## The 16 skills

| Skill | Role |
|-------|------|
| [`writing-guidelines`](./skills/writing-guidelines) | Gateway to the research-writing knowledge base. |
| [`paper-ingestion`](./skills/paper-ingestion) | Traceable paper inventory + faithful summaries; flags gaps/duplicates. |
| [`source-mapping`](./skills/source-mapping) | Source-to-section matrix; enforces permitted sources. |
| [`research-design`](./skills/research-design) | Formalizes question, hypothesis, objectives, contributions, design. |
| [`introduction-writer`](./skills/introduction-writer) | Funnel introduction ending in RQs + contributions. |
| [`literature-review`](./skills/literature-review) | Synthesis review + evidenced research gap. |
| [`methodology-designer`](./skills/methodology-designer) | Discipline-adaptive methodology; math + reproducibility checks. |
| [`implementation-engineer`](./skills/implementation-engineer) | Spec → code + tests; inspect-before-change; safety. |
| [`experiment-runner`](./skills/experiment-runner) | Runs experiments safely or marks results unavailable. |
| [`results-analyst`](./skills/results-analyst) | Metrics from real evidence; baselines; uncertainty; no overclaim. |
| [`figure-planner`](./skills/figure-planner) | Conceptual figure specs/prompts + reproducible quantitative plots. |
| [`discussion-conclusion`](./skills/discussion-conclusion) | Discussion, limitations, conclusion, future work. |
| [`reference-auditor`](./skills/reference-auditor) | Citation/bibliography integrity; verify or flag. |
| [`manuscript-assembler`](./skills/manuscript-assembler) | Assembles a consistent Markdown/LaTeX manuscript. |
| [`final-reviewer`](./skills/final-reviewer) | Applies the review rubric; integrity + readiness reports. |
| [`research-paper-workflow`](./skills/research-paper-workflow) | Orchestrates all of the above (skills also run standalone). |

## Interfaces

GobeshonaLabAgent has four ways to use it — see [`docs/interfaces.md`](./docs/interfaces.md):

1. **Claude Code plugin** (easiest) — add this repo as a marketplace and install the plugin.
2. **Standalone skills** — install one or all skills into any agent's skills directory with the CLI.
3. **CLI / npm** — `gobeshona list | new | install | validate | doctor`.
4. **Other AI agents** — portable Markdown skills; documented adapter patterns.

## Is it really free?

Yes. Code is Apache-2.0; the project's written content is CC BY 4.0; nothing in the core requires a
paid API, reference manager, or hosted backend. You separately provide **AI inference** (a paid API
*or* a local open-weights model) to run the skills. See
[`docs/free-and-licensing.md`](./docs/free-and-licensing.md).

## Develop & test

```bash
npm install
npm run build       # compile src/ -> dist/
npm test            # typecheck + node:test suite
npm run validate    # skill + manifest validation
node dist/cli/index.js doctor
```

CI runs lint/typecheck, tests, and skill validation on every push
([`.github/workflows/ci.yml`](./.github/workflows/ci.yml)).

## Repository layout

```
skills/        16 Agent Skills (SKILL.md + references/ templates/)
knowledge/     principles/ (general research-writing principles) + quality-framework/
config/        research-project.schema.json (the researcher's contract)
src/           TypeScript CLI (src/cli) + libraries (src/lib)
tests/         node:test suites
examples/      fixtures/ (evaluation scenarios with known answers)
docs/          installation, quickstart, user-guide, interfaces, project-config, licensing, publishing, troubleshooting
.claude-plugin/ plugin.json + marketplace.json
.github/workflows/ ci.yml
```

## Documentation

- [Installation](./docs/installation.md) · [Quick start](./docs/quickstart.md) ·
  [User guide](./docs/user-guide.md) · [Interfaces](./docs/interfaces.md)
- [Project configuration](./docs/project-config.md) · [Free & licensing](./docs/free-and-licensing.md)
- [Publishing](./docs/publishing.md) · [Troubleshooting](./docs/troubleshooting.md) ·
  [Architecture](./docs/architecture.md)
- [Implementation status](./IMPLEMENTATION_STATUS.md) · [Roadmap](./ROADMAP.md) · [Changelog](./CHANGELOG.md)

## Licensing

- Code: **Apache-2.0** ([`LICENSE`](./LICENSE)).
- Written content (skills, knowledge, docs): **CC BY 4.0** ([`LICENSE-CONTENT`](./LICENSE-CONTENT)).

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) and [`CODE_OF_CONDUCT.md`](./CODE_OF_CONDUCT.md). Security:
[`SECURITY.md`](./SECURITY.md).

## Status

Early (`0.1.0`). Skills, knowledge base, CLI (`list`/`new`/`install`/`validate`/`doctor`),
validation, tests, and manifests are implemented and the test suite passes locally. Automated checks
cover structure, safety, and config integrity; scientific judgement (claim support, math
correctness, overclaiming) is explicitly left to human and domain-expert review. See
[`IMPLEMENTATION_STATUS.md`](./IMPLEMENTATION_STATUS.md) and [`ROADMAP.md`](./ROADMAP.md).
