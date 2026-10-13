---
name: research-design
description: >-
  Help a researcher formalize the backbone of their study before any writing or experiments begin:
  the problem statement, research question(s), an optional hypothesis, objectives, claimed
  contributions, the research gap, and the overall research design (including sampling). Use this
  skill at project start, whenever the research framing is still vague, when a researchType is being
  chosen, when deciding whether a hypothesis is even appropriate, or when a reviewer flags that the
  question and method do not fit. It evaluates each research question against the Feasible / Novel /
  Significant / Specific test, requires the gap to be grounded in cited sources, keeps the researcher
  in control of every decision, and never invents or alters the question, hypothesis, or contributions.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs:
    - knowledge/principles/research-writing-principles.md
    - knowledge/quality-framework/manuscript-checklist.md
---

# research-design

## Purpose

Turn a researcher's curiosity into a defensible research design. This skill produces the formal
framing that every downstream skill depends on: a sharp problem statement, well-formed research
question(s), an optional hypothesis, concrete objectives, honest contributions, a grounded research
gap, and a research design that genuinely fits the question. It implements Stage 3 (and much of
Stage 0) of the `research-paper-workflow`, but can be run on its own.

The researcher owns every one of these decisions. This skill critiques, structures, and flags
problems — it does **not** decide the research for them.

## When to use

- At the start of a project, to populate or sharpen the `research` block of the project config.
- When the question is still a "vague curiosity" and needs to become specific and testable.
- When choosing `researchType` and deciding whether a hypothesis is appropriate at all.
- When a reviewer notes that the method does not fit the question, or the gap is unsupported.

## Inputs

- A `research-project.yaml`/`.json` (or draft) conforming to `config/research-project.schema.json`,
  especially: `project.researchType`, `project.timeBudget`, and the `research` block
  (`concept`, `problemStatement`, `researchQuestions`, `hypothesis`, `objectives`, `contributions`,
  `researchGap`).
- The permitted `sources` list (used only to check that any claimed gap is evidence-backed).

## Outputs

- A completed/annotated `research` block ready to write back into the project config.
- An **FNSS assessment** for each research question (Feasible / Novel / Significant / Specific) with
  an explicit imbalance flag where a quality is missing or weak.
- A hypothesis decision: present and testable (confirmatory quantitative) **or** explicitly null with
  a one-line reason (qualitative / exploratory / conceptual / review).
- A chosen research design with sampling approach, justified against the question — see
  `references/design-selection.md`.
- A gap statement tagged with its evidence (`supportingSources`) or marked **UNSUPPORTED-GAP** if no
  cited source backs it.
- A scope sanity-check against `project.timeBudget`.

## Instructions

1. **Read the framing.** Load the `research` block. If `writing-guidelines` is available, pull the
   relevant principles; otherwise read `knowledge/principles/research-writing-principles.md` (§2 on
   research questions, gaps, and design).
2. **Sharpen each research question.** If a question reads as a broad curiosity, help the researcher
   narrow it to something specific and testable. Record the before/after but never replace the
   researcher's intent with your own — propose, then let them confirm.
3. **Run the FNSS test on every question.** For each RQ, assess:
   - *Feasible* — resources (time, data, equipment, permission) are actually in hand;
   - *Novel* — not already well established;
   - *Significant* — answering it changes something or fills a knowledge gap;
   - *Specific* — narrow and precise enough to be answerable.
   Flag any imbalance explicitly (e.g., "Significant but not Feasible", "Specific but not Significant"),
   a common framing mistake. Set the `feasible/novel/significant/specific`
   booleans in each RQ object.
4. **Decide on a hypothesis — correctly.** Require a hypothesis **only** when the design is
   confirmatory quantitative; the nature of the question decides, not habit.
   For qualitative, exploratory, conceptual, or review work, set `hypothesis: null` and state why in
   one line. Never force a hypothesis onto exploratory work.
5. **Select the research design to fit the question.** Use `references/design-selection.md` to map
   `researchType` → design, sampling strategy, and hypothesis applicability. Choose the design that
   answers the question — never reverse-engineer a question to fit a preferred method.
6. **Ground the research gap.** The gap must be a gap in *knowledge*, backed by cited sources from the
   permitted `sources` list (not "nobody built this product", not a feeling of novelty). If no source
   in `sources` supports it, mark the gap **UNSUPPORTED-GAP** and surface it as a gap to resolve —
   do not fabricate support. (Gap-type detail lives in the `literature-review` skill.)
7. **Check objectives and contributions.** Objectives should be concrete actions that answer the RQs.
   Each contribution must be genuinely new — Novelty, Empirical Evidence, or Practical Value — not a
   description of work; keep to roughly 3-4 focused points.
8. **Sanity-check scope.** Compare the ambition of the questions to `project.timeBudget`; if the
   question cannot plausibly be answered in the available time/resources, flag it for narrowing rather
   than silently shrinking it.
9. **Note ethics early.** If the design involves human subjects or sensitive data, record that
   informed consent / anonymization / IRB approval will be required (defer detail to `experiment-runner`).
10. **Write back** the annotated `research` block and a short `research-design.md` summary into the
    project working directory, listing every flag and open decision for the researcher to resolve.

## Quality gates

- Every RQ carries an FNSS assessment with any imbalance explicitly flagged.
- The hypothesis decision matches the `researchType` (present only for confirmatory quantitative work).
- The research design is justified against the question (not the reverse).
- The research gap is either source-backed or marked UNSUPPORTED-GAP.
- Each contribution is tagged `novelty` / `empirical-evidence` / `practical-value`.
- Scope is checked against the time/resource budget.

## Anti-fabrication rules

- Never invent, replace, or silently alter the researcher's question, hypothesis, objectives, or
  contributions — propose changes and require explicit confirmation.
- Never fabricate a research gap or cite sources that are not in the permitted `sources` list.
- Do not add a hypothesis just because a template expects one; absence is correct for many designs.
- Distinguish **verified facts** (what sources establish), **interpretations** (your reading of the
  gap), **assumptions** (scope/resource premises), and **proposed/future work** (the planned study).
- Where evidence for a gap or claim is unavailable, surface the gap — never paper over it.

## References

- `references/design-selection.md` — researchType → design/sampling/hypothesis decision guide + FNSS checklist.
- `knowledge/principles/research-writing-principles.md` — §2 (research questions, gaps, and design),
  §4 (quantitative vs qualitative methodology), §8 (research integrity and ethics), §3 (contributions).
- `config/research-project.schema.json` — the `research`, `project`, and `sources` contracts.
- `knowledge/quality-framework/manuscript-checklist.md` — Section A (research framing).
