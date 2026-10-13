---
name: introduction-writer
description: >-
  Draft or revise a manuscript Introduction as a wide-to-narrow funnel that ends in explicit Research
  Questions and Contributions. Use this skill when a researcher is starting the Introduction, when the
  current Introduction reads like a literature review or lacks stated RQs/contributions, or during
  revision when the Introduction must be re-checked for consistency with the final Results and
  Discussion. It enforces the funnel ordering, keeps contributions genuinely new and focused, matches
  length/style to the target venue, and uses only the sources the researcher assigned to the
  Introduction.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs:
    - knowledge/principles/research-writing-principles.md
    - knowledge/quality-framework/manuscript-checklist.md
---

# introduction-writer

## Purpose

Produce an Introduction that leads the reader from a broad knowledge landscape down to the paper's
specific problem, and that closes with clearly stated Research Questions/Objectives and
Contributions. The skill structures reasoning as a funnel so every paragraph has a known destination,
and it keeps the Introduction distinct from the Literature Review (brief context here, deep
comparison there). This follows the standard funnel structure and the rule that every Introduction
must end with Research Questions and Contributions.

## When to use

- Starting a fresh Introduction from a validated project configuration.
- An existing Introduction has no explicit RQs or Contributions, or buries them.
- The Introduction has swelled into a full literature review and needs to be re-separated.
- During revision, to re-check that the Introduction's promises still match the final Results and
  Discussion (research drifts during a project, so revise the Introduction for one consistent story).

## Inputs

- A `research-project.yaml`/`.json` conforming to `config/research-project.schema.json`, read for:
  `research.concept`, `research.problemStatement`, `research.researchQuestions`,
  `research.objectives`, `research.contributions`, `research.researchGap`, `project.targetVenue`,
  `project.venueType`, `project.discipline`, and `project.outputFormat`.
- `sectionSources` — specifically the array of source ids assigned to the Introduction section.
- Optionally, draft Results/Discussion artifacts (for the revision consistency pass).

## Outputs

- An Introduction draft in the project's `outputFormat` (Markdown or LaTeX) following the funnel
  skeleton in `templates/introduction-template.md`.
- An explicit Research Questions block (echoing the config RQ ids) and a Contributions block of 3-4
  bullets, each tagged with its contribution type (novelty / empirical-evidence / practical-value).
- A short provenance note listing which assigned sources were cited and flagging any funnel stage for
  which no permitted source or evidence was available (a gap, never a fabrication).

## Instructions

1. Validate inputs. Confirm at least one `researchQuestions` entry and at least one `contributions`
   entry exist in the config. If they are missing, stop and ask the researcher to supply them via
   `research-design` — do not invent research questions or contributions.
2. Load the sources permitted for the Introduction from `sectionSources`. Treat this as the only set
   you may cite here; if a needed claim has no assigned source, mark it as an evidence gap rather than
   citing an out-of-scope paper or fabricating one.
3. Draft the funnel in order, one focused block per stage, using
   `templates/introduction-template.md`: (1) Broad Context → (2) Specific Problem → (3) Why It Matters
   → (4) Existing Approaches → (5) What Is Missing (the gap) → (6) What This Paper Does → (7) Research
   Questions → (8) Contributions. This fixed order is the standard introduction funnel ordering.
4. Pace the funnel. Keep the wide top brief enough to reach the point and the narrow bottom supported
   enough to justify why it matters. Keep deep paper-by-paper comparison out of the Introduction —
   that belongs to `literature-review`.
5. Write the Research Questions block using the exact RQ ids from the config so downstream skills can
   trace them. Connect the gap to the questions in one clear sentence before stating them.
6. Write the Contributions block as 3-4 focused bullets. Each must be a genuine contribution — not a
   description of work done — and labelled as novelty, empirical-evidence, or practical-value.
   If the config lists more than four, help the researcher prioritise rather than padding the list.
7. Match length and style to the venue. Use `project.targetVenue`/`venueType`/`discipline` to decide
   depth; Introduction length varies by field, so match published examples in the target venue.
   In humanities/social science, contributions may be expressed in prose rather than bullets.
8. Revision consistency pass. When Results/Discussion drafts exist, re-read the Introduction and flag
   any promise, claimed outcome, or contribution that the final results do not support, so the
   researcher can reconcile the story. Report mismatches; do not silently
   rewrite results or soften claims without the researcher's decision.
9. Emit the provenance note: sources cited (by id), funnel stages with evidence gaps, and any
   contribution the researcher should reconsider.

## Quality gates

- All eight funnel stages are present and in order; the Introduction ends with RQs and Contributions
  (manuscript-checklist section C).
- The Introduction gives brief context only; detailed comparison is deferred to the Literature Review.
- Every Research Question maps to a config RQ id; the gap-to-question link is stated explicitly.
- Contributions are 3-4 items, each a real contribution tagged novelty/empirical-evidence/
  practical-value, matched to the venue's bullet-vs-prose convention.
- Only Introduction-assigned sources are cited; evidence gaps are surfaced, not filled by invention.

## Anti-fabrication rules

- Never invent or alter the research questions, objectives, contributions, or research gap — these
  are owned by the researcher via the project config.
- Never cite a source that is not assigned to the Introduction in `sectionSources`, and never invent
  papers, authors, findings, or page numbers.
- Where a funnel stage lacks permitted evidence, state the gap explicitly instead of fabricating
  support or overclaiming.
- Distinguish verified facts (cited to an assigned source), interpretations, assumptions, and
  proposed/future work; do not let a contribution claim more than the evidence establishes.

## References

- `knowledge/principles/research-writing-principles.md` — section 3 (Introduction & literature
  review): funnel order, RQ/contribution rules, venue flexibility, and revision consistency.
- `knowledge/quality-framework/manuscript-checklist.md` — section C quality gates.
- `templates/introduction-template.md` — the funnel skeleton to fill in.
