# Architecture & Implementation Plan

## 1. Goals

`GobeshonaLabAgent` is a free, open-source toolkit of **Agent Skills** that guides a researcher
through developing a complete scientific manuscript — from research question to a review report —
while enforcing general research-writing, evidence, and integrity standards (see `knowledge/`).

The toolkit is **model/agent-agnostic at the content layer** (portable Markdown skills) with
**optional Node.js/TypeScript tooling** for validation, installation, and distribution.

## 2. Core principles

1. **The researcher stays in control.** The toolkit never invents or changes the hypothesis,
   research question, results, or permitted source set.
2. **Honesty over fluency.** Success is traceable, verifiable content — not polished prose.
3. **Everything is free.** No paid API, reference manager, hosted backend, or proprietary cloud is
   required by the core. (Users still supply their own separately-licensed AI inference — see
   `docs/free-and-licensing.md`.)
4. **Local-first.** Local files and open-source utilities are the default; integrations are opt-in.
5. **Original guidance.** The knowledge base states general, widely-accepted research-writing
   principles in the project's own words; it contains no third-party or unpublished source text.

## 3. Layers

```
┌─────────────────────────────────────────────────────────────┐
│ Content layer (portable, agent-agnostic)                     │
│   skills/*/SKILL.md  + references/ templates/ scripts/       │
│   knowledge/  (general research-writing principles + quality framework)  │
├─────────────────────────────────────────────────────────────┤
│ Config layer                                                 │
│   config/research-project.schema.json  (project contract)    │
│   examples/fixtures/*  (synthetic projects with known answers)│
├─────────────────────────────────────────────────────────────┤
│ Tooling layer (optional, Node.js/TypeScript)                 │
│   src/cli      gobeshona list|new|install|validate|doctor  │
│   src/lib      skill parsing, validation, safe install       │
├─────────────────────────────────────────────────────────────┤
│ Distribution layer                                           │
│   .claude-plugin/plugin.json      (Claude Code plugin)       │
│   .claude-plugin/marketplace.json (Claude Code marketplace)  │
│   package.json bin                (optional npm CLI)          │
│   docs/adapters.md                (other agents)             │
└─────────────────────────────────────────────────────────────┘
```

## 4. Skills (16)

A single orchestrator (`research-paper-workflow`) coordinates fifteen focused skills. Every skill is
independently invokable. Each `SKILL.md` has: YAML frontmatter (`name`, `description`, and project
`metadata`), responsibilities, inputs/outputs, step-by-step instructions, references into
`knowledge/`, quality gates, and anti-fabrication rules.

| # | Skill | Responsibility |
|---|-------|----------------|
| 1 | `writing-guidelines` | Gateway/index into the research-writing knowledge base. |
| 2 | `paper-ingestion` | Turn supplied papers into a traceable inventory + summaries. |
| 3 | `source-mapping` | Build the source-to-section matrix; enforce permitted sources. |
| 4 | `research-design` | Formalize question, hypothesis, objectives, contributions, design. |
| 5 | `introduction-writer` | Funnel introduction ending in RQs + contributions. |
| 6 | `literature-review` | Synthesis review from the literature matrix; gap statement. |
| 7 | `methodology-designer` | Discipline-adaptive methodology (quant/qual/math/computational). |
| 8 | `implementation-engineer` | Spec → code + tests; inspect-before-change; reproducibility. |
| 9 | `experiment-runner` | Run experiments safely or mark results unavailable; capture evidence. |
| 10 | `results-analyst` | Metrics from real data; baselines; uncertainty; no overclaim. |
| 11 | `figure-planner` | Conceptual figure specs/prompts + reproducible quantitative plots. |
| 12 | `discussion-conclusion` | Discussion, limitations, conclusion, future work. |
| 13 | `reference-auditor` | Citation/bibliography integrity; verify or flag. |
| 14 | `manuscript-assembler` | Assemble consistent Markdown/LaTeX manuscript; export notes. |
| 15 | `final-reviewer` | Apply the review rubric; integrity + readiness report. |
| 16 | `research-paper-workflow` | Orchestrate the above; allow partial/one-off invocation. |

## 5. Project configuration contract

`config/research-project.schema.json` (JSON Schema draft 2020-12) defines the researcher-driven
project file (`research-project.yaml`/`.json`). It carries title, discipline, concept, problem,
hypothesis, research questions, objectives, contributions, target venue, citation style, source
papers with stable IDs, per-section source assignments, datasets + permissions, implementation
requirements, experimental design, figure requirements, and known limitations. See
`docs/project-config.md`.

## 6. Tooling (CLI)

TypeScript, compiled with `tsc`, zero required runtime dependencies (Node stdlib + a tiny vendored
YAML/front-matter parser) so the CLI is installable and auditable without a heavy dependency tree.
Commands: `list`, `new` (scaffold a project), `install <skill>|all`, `validate`, `doctor`. Safety:
explicit `--target`, `--dry-run`, overwrite protection (`--force` required), path-traversal
rejection, clear errors and exit codes. The installed executable is `gobeshona`.

## 7. Testing

Node's built-in `node:test` runner (no external test framework needed):
- skill metadata validity (frontmatter present, unique names, description quality);
- installation (dry-run, overwrite protection, target dir);
- path-traversal rejection;
- manifest validity (plugin.json / marketplace.json parse + reference real skills);
- documentation link integrity (internal links resolve);
- academic-quality checks (project-config validation, source-restriction enforcement, the twelve
  end-to-end fixture scenarios).

## 8. Distribution

1. **Individual skill:** copy one `skills/<name>/` folder, or `gobeshona install <name>`.
2. **Full toolkit:** `gobeshona install all`, or copy `skills/`.
3. **Claude Code plugin + marketplace:** `.claude-plugin/` manifests; `/plugin marketplace add` then
   `/plugin install gobeshonalab-agent@gobeshonalab-agent`.
4. **GitHub:** public repo (this).
5. **npm CLI:** `npx @gobeshonalab/agent ...` (optional).
6. **Other agents:** documented adapters in `docs/adapters.md`.

## 9. Build order (executed)

knowledge base → config contract → skills → CLI/lib → tests → distribution manifests → CI → docs →
fixtures → run checks → fix → README + end-to-end example.
