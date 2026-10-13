---
name: research-paper-workflow
description: >-
  Orchestrate the end-to-end development of a scientific manuscript using the GobeshonaLabAgent
  toolkit. Use this when a researcher wants guided, start-to-finish support: it sequences the focused
  skills (research design, paper ingestion, source mapping, writing, methodology, implementation,
  experiments, results, figures, discussion, references, assembly, review) around a researcher-owned
  project configuration, while letting any individual skill be invoked on its own. Adapts the sequence
  to the research type (conceptual, theoretical, qualitative, quantitative, mixed-methods, review,
  computational) and never fabricates research framing, sources, or results.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  orchestrates:
    - writing-guidelines
    - research-design
    - paper-ingestion
    - source-mapping
    - introduction-writer
    - literature-review
    - methodology-designer
    - implementation-engineer
    - experiment-runner
    - results-analyst
    - figure-planner
    - discussion-conclusion
    - reference-auditor
    - manuscript-assembler
    - final-reviewer
---

# research-paper-workflow

## Purpose

Coordinate the toolkit's focused skills into a coherent, researcher-driven workflow that produces a
complete manuscript plus integrity and readiness reports. The researcher remains in control at every
gate; the orchestrator proposes, the researcher decides.

## When to use

- A researcher wants guided support across the whole paper, not just one section.
- You need to resume a project and know which stage comes next.

Individual skills can always be invoked directly without this orchestrator.

## Inputs

- A `research-project.yaml`/`.json` conforming to `config/research-project.schema.json`.
  If absent, start at Stage 0 to create one (do not invent its contents — elicit them).

## Outputs

- A project working directory with per-stage artifacts and a running `project-status.md` that records
  completed stages, open decisions, and unresolved verification requirements.

## Workflow stages

> Skip stages that do not apply to the declared `researchType`. For example, a `qualitative` or
> `review` study typically skips `implementation-engineer` and `experiment-runner`; a `conceptual`
> study may skip quantitative figures. Record every skip and why.

0. **Configure** — Validate (or help the researcher create) the project config. Confirm the research
   question(s), and a hypothesis only if the design is confirmatory quantitative. Never invent these.
   → `research-design`, `writing-guidelines`.
1. **Ingest papers** — Build the paper inventory and faithful per-paper summaries; flag incomplete
   metadata and duplicates. → `paper-ingestion`.
2. **Map sources** — Build the source-to-section matrix; make the permitted-source restrictions
   enforceable and visible. → `source-mapping`.
3. **Design research** — Formalize problem, questions, objectives, contributions, gap, and design.
   → `research-design`.
4. **Introduction** — Funnel introduction ending in RQs + contributions. → `introduction-writer`.
5. **Literature review** — Synthesis from the literature matrix; evidence the gap. → `literature-review`.
6. **Methodology** — Discipline-adaptive methodology (math where appropriate; qualitative rigor
   otherwise). → `methodology-designer`.
7. **Implementation** *(optional)* — Spec → code + tests; inspect before changing existing code.
   → `implementation-engineer`.
8. **Experiments** *(optional)* — Run safely or mark results unavailable; capture evidence.
   → `experiment-runner`.
9. **Results** — Metrics from real evidence; comparable baselines; uncertainty. → `results-analyst`.
10. **Figures** — Conceptual specs/prompts + reproducible quantitative plots. → `figure-planner`.
11. **Discussion & conclusion** — Discussion, limitations, conclusion, future work. → `discussion-conclusion`.
12. **References** — Verify citations and bibliography; flag unverifiable. → `reference-auditor`.
13. **Assemble** — Produce the consistent manuscript (Markdown/LaTeX). → `manuscript-assembler`.
14. **Review** — Apply the review rubric; produce integrity + readiness reports. → `final-reviewer`.

After Stage 14, loop back to any stage the review flags. Treat blocking integrity findings as
must-fix before proceeding.

## Quality gates

- Stage 0 must pass config validation before downstream stages run.
- Each stage records its artifacts and any gaps in `project-status.md`.
- A stage that cannot complete (missing data, no execution environment) is marked **pending** with the
  reason — never faked as complete.

## Anti-fabrication rules

- Never invent or silently change the hypothesis, research questions, objectives, contributions, or
  the permitted source set.
- Never fabricate sources, data, results, figures, or citations.
- If the researcher changes the hypothesis mid-project, trigger a consistency re-check across all
  completed stages (see `final-reviewer`) rather than quietly rewriting earlier artifacts.
- Distinguish verified facts, interpretations, assumptions, and proposed/future work in every artifact.

## References

- `config/research-project.schema.json` — the project contract.
- `knowledge/quality-framework/` — checklist and review rubric.
- `docs/project-config.md`, `docs/end-to-end-example.md`.
