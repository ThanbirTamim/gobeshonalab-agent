---
name: manuscript-assembler
description: >-
  Assemble a single, consistent scientific manuscript from the approved project artifacts, in either
  Markdown or LaTeX. Use this skill after the section-level skills have produced content (research
  design, introduction, literature review, methodology, implementation/experiments, results, figures,
  discussion/conclusion, references) and the researcher is ready to compose the full paper. It wires
  the sections into a venue-appropriate structure, enforces cross-section consistency (abstract vs.
  findings, methodology vs. implementation, results vs. saved evidence, conclusion vs. research
  questions), applies clarity/terminology/voice checks, and documents free export paths (e.g. pandoc
  to DOCX/PDF). It never invents content, never upgrades an unexecuted experiment to "completed", and
  never claims the manuscript is publication-ready.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs:
    - knowledge/principles/research-writing-principles.md
    - knowledge/quality-framework/manuscript-checklist.md
---

# manuscript-assembler

## Purpose

Compose the approved, individually-produced artifacts into one coherent manuscript. This skill is an
**integrator, not an author**: it places existing, researcher-approved content into a consistent
structure, harmonizes terminology and voice, and verifies that the sections tell one honest story.
It does not generate new findings, claims, citations, or results.

The assembled manuscript must honor the honesty principle: a paper is a document of honesty, and
every claim must match the evidence (see `knowledge/principles/research-writing-principles.md`,
section 1).

## When to use

- The section skills have produced content and the researcher wants the full paper assembled.
- The researcher needs to switch output format (Markdown ↔ LaTeX) or prepare a DOCX/PDF export.
- A late change (e.g., a revised hypothesis or new result) requires re-stitching sections and
  re-running consistency checks.

## Inputs

- A validated `research-project.yaml`/`.json` (see `config/research-project.schema.json`) — provides
  `project.outputFormat`, `project.targetVenue`/`venueType`, `project.citationStyle`,
  `research.researchQuestions`, `research.contributions`, and `limitations`.
- The approved section artifacts (introduction, literature review, methodology, implementation/setup,
  results, figures + captions, discussion, limitations, conclusion + future work).
- The verified bibliography and in-text citation keys from `reference-auditor`.
- Experiment status from `experiment-runner` (which experiments actually ran vs. are unavailable).

## Outputs

- A single assembled manuscript file: `manuscript.md` or `manuscript.tex` (per `outputFormat`).
- A `assembly-report.md` listing: section order used, the venue structure applied, every
  consistency check and its pass/flag result, terminology glossary used, and all unresolved gaps.
- Optional export notes/commands for free tooling (pandoc) — see Instructions step 8.

## Instructions

1. **Validate inputs.** Confirm the project config validates and that each required section artifact
   exists. If a section is missing, record it as a **gap** in `assembly-report.md`; do not write
   filler prose to cover it.
2. **Choose the structure.** Start from `templates/manuscript-skeleton.md`. Adapt section ordering
   and naming to the declared `discipline`/`targetVenue` (e.g., "Related Work" vs. "Literature
   Review"; IMRaD vs. humanities narrative). Record which structure was chosen and why.
3. **Place content, do not rewrite it.** Insert each approved artifact into its section verbatim
   except for mechanical harmonization (heading levels, cross-reference labels, figure/table
   numbering). Flag—do not silently fix—any substantive wording that would change meaning.
4. **Title, abstract, keywords.** Assemble these per general title/abstract/keyword standards
   (`knowledge/principles/research-writing-principles.md`, section 3):
   Title fits Problem/Method/(Scope) in ~8–15 words and is written/finalized last; Abstract follows
   Problem → Objective → Method → Key Result → Significance within ~150–250 words and contains no
   citations/figures/equations; keywords are 4–6 balancing domain/method/task. Enforce the
   **consistency triangle** (every title keyword appears in the abstract; every keyword appears in
   title or abstract).
5. **Run the consistency checks** (record each in `assembly-report.md`):
   - Abstract's stated key result ↔ the actual Results section numbers.
   - Methodology description ↔ what `implementation-engineer`/`experiment-runner` actually did.
   - Every reported result ↔ a saved evidence file (never a hand-typed number).
   - Conclusion ↔ answers each `researchQuestions[]` without exceeding the evidence
     (the Conclusion carries no new result or citation — see `research-writing-principles.md`, section 7).
   - Each stated contribution ↔ supported somewhere in the body.
   - Limitations present and non-empty.
6. **Experiment honesty.** For any experiment marked unavailable/not-run, ensure the manuscript
   describes it as planned/not-executed with the reason — never as completed (project rule, §5 of
   `research-writing-principles.md`).
7. **Clarity, terminology, voice.** Apply general clarity rules
   (`knowledge/principles/research-writing-principles.md`, section 9): one idea per paragraph,
   consistent voice (active for decisions, passive for mechanical steps), a single fixed term per
   concept (build/attach a glossary), past tense for completed work.
   Report violations; apply only mechanical, meaning-preserving fixes automatically.
8. **Export (optional, free tooling).** If DOCX/PDF is requested, emit the commands rather than
   asserting a finished artifact, e.g. `pandoc manuscript.md -o manuscript.docx` or
   `pandoc manuscript.md -o manuscript.pdf` (PDF needs a local LaTeX engine). Note that pandoc and
   LaTeX are free/open-source and no paid service is required.
9. **Hand off to review.** Do not declare the manuscript finished. Point the researcher to
   `final-reviewer` and attach the `assembly-report.md` gap list.

## Quality gates

- Every required section is present or explicitly listed as a gap.
- The consistency triangle (title/abstract/keywords) holds.
- All five consistency checks in step 5 are recorded with pass/flag status and evidence pointers.
- No reported result lacks a saved-evidence pointer; no unexecuted experiment is described as done.
- Terminology glossary attached; voice/tense checks recorded.

## Anti-fabrication rules

- Never author new findings, claims, numbers, citations, or sources during assembly.
- Never invent or alter the hypothesis, research questions, contributions, or permitted sources.
- Where a section's evidence is missing, surface the gap; do not paper over it with generated prose.
- Distinguish verified facts, interpretations, assumptions, and proposed/future work when harmonizing.
- Never claim the manuscript is accepted, publication-ready, or guaranteed to pass peer review;
  report readiness signals and remaining risks only.

## References

- `templates/manuscript-skeleton.md` — full section skeleton with per-section consistency notes.
- `knowledge/principles/research-writing-principles.md` — title/abstract/keywords and
  limitations/conclusion/references standards (section 3), honesty principle (section 1), clarity
  (section 9), and publication caveats (section 10).
- `knowledge/quality-framework/manuscript-checklist.md` — items B, F, G, J used as assembly gates.
