---
name: final-reviewer
description: >-
  Run the final, integrity-first review of a drafted manuscript against the toolkit's review rubric
  and manuscript checklist. Use this at the end of the workflow (after assembly) or any time a
  researcher asks "is this ready?", "review my paper", or wants an integrity/readiness check. It
  scores every rubric dimension with concrete evidence pointers, treats any zero on an integrity
  dimension as BLOCKING, and produces two reports: an integrity report and a publication-readiness
  report. The readiness report reports signals only — it never claims the paper is accepted,
  publication-ready, or guaranteed to pass peer review. Also use this when the researcher changed
  the hypothesis or research questions mid-project, to trigger a cross-section consistency re-check.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs:
    - knowledge/quality-framework/review-rubric.md
    - knowledge/quality-framework/manuscript-checklist.md
    - knowledge/principles/research-writing-principles.md
---

# final-reviewer

## Purpose

`final-reviewer` is the toolkit's quality gate. It evaluates the assembled manuscript (and its
supporting artifacts) against `knowledge/quality-framework/review-rubric.md` and
`knowledge/quality-framework/manuscript-checklist.md`, then reports findings honestly. Its job is to
protect research integrity and set realistic expectations — not to declare success. It is grounded
in the honesty principle: a paper is a document of honesty, not advertising; credibility is a
researcher's greatest asset, built one honest decision at a time; and venue and peer-review realities
mean no one can promise acceptance.

## When to use

- After `manuscript-assembler` produces a complete draft.
- When the researcher asks for a review, an integrity check, or "is it ready to submit?".
- When the hypothesis, research questions, objectives, or contributions changed after drafting —
  run the cross-section consistency re-check (see Instructions step 6).

## Inputs

- The assembled manuscript (Markdown/LaTeX) and its section files.
- The `research-project.yaml`/`.json` (per `config/research-project.schema.json`).
- Supporting artifacts where they exist: paper inventory, source-to-section map, literature matrix,
  methodology/notation, result files, figure specs/scripts, bibliography, and prior skill outputs.
- A record of any mid-project changes to research framing (if the researcher reports one).

## Outputs

- A **review report** written from `templates/review-report-template.md`, containing:
  - a per-dimension score (0-3 or N/A) with **evidence pointers** (file + section/line), specific
    findings, and required fixes;
  - a top-level **blocking integrity issues** list;
  - a clearly separated **automated vs. human/domain-expert** section stating which checks the
    toolkit performed mechanically and which still require human judgement.
- An **integrity report** (the integrity-dimension subset) and a **publication-readiness report**
  (signals and remaining risks only — never an acceptance claim).

## Instructions

1. **Confirm scope and study type.** Read the project config `project.researchType` and record which
   rubric dimensions are N/A for this study (e.g., mathematical review is N/A for a purely
   qualitative study; experiment-related dimensions are N/A when no experiment was required). Record
   the reason for every N/A — never silently skip a dimension.
2. **Gather evidence.** Locate each supporting artifact. If an artifact a dimension depends on is
   missing, that dimension cannot score above 1, and you must say which artifact is missing rather
   than assuming the content is fine.
3. **Score the ten rubric dimensions** from `knowledge/quality-framework/review-rubric.md`, in order,
   using its 4-point scale. For each dimension record: score, evidence pointers, findings, required
   fixes. Prioritize the five integrity dimensions (Citation integrity, Extraction accuracy, Result
   provenance, Figure integrity, Overclaiming check).
4. **Apply the blocking rule.** Any score of 0 on an integrity dimension is BLOCKING. List every
   blocking issue at the top of the report with its exact location and the fix required. Do not let
   strong scores elsewhere mask a blocking issue.
5. **Cross-check against the manuscript checklist** (`knowledge/quality-framework/manuscript-checklist.md`).
   Map any failed checklist item to the dimension it belongs to and cite it in the findings. Note
   which checklist items are `[auto]` (toolkit-checkable) vs `[human]`.
6. **Hypothesis/RQ-change consistency re-check.** If research framing changed mid-project, verify
   that Abstract, Introduction (RQs + contributions), Methodology, Results, Discussion, and
   Conclusion all reflect the *current* framing. Flag every section still describing the old
   hypothesis/RQ as a Section-consistency finding. Never rewrite the researcher's framing yourself —
   report the mismatches and the sections needing the researcher's decision.
7. **Separate automated from human review.** Fill the report's "Automated vs. human/domain-expert"
   section: state plainly which signals the toolkit verified mechanically (e.g., citation
   both-direction resolution, results-reference-to-evidence presence, required-section presence) and
   which require a human or domain expert (e.g., whether a summary faithfully represents a source,
   whether an equation is correct, whether a causal claim is justified).
8. **Write the readiness report carefully.** Summarize readiness signals and the remaining risks and
   required fixes. Use neutral language such as "no blocking integrity issues were detected by this
   review" or "the following must be resolved before submission." Never state or imply the paper is
   accepted, publication-ready, or will pass peer review.
9. **Hand back to the workflow.** List, in priority order, which skills/stages the researcher should
   revisit to resolve findings (e.g., `reference-auditor` for citation issues, `results-analyst` for
   provenance gaps).

## Quality gates

- Every dimension has a score and at least one evidence pointer or an explicit "evidence missing"
  note; no dimension is left blank.
- Every N/A records why it does not apply.
- Blocking integrity issues, if any, appear at the very top of the report.
- The readiness report contains no acceptance/guarantee language.
- The automated-vs-human separation is present and specific.

## Anti-fabrication rules

- Never invent scores, evidence, or findings; cite only standards and quality gates that appear in
  `knowledge/principles/research-writing-principles.md` and the quality-framework files.
- Never fabricate or "fix" the researcher's hypothesis, research questions, results, figures, or
  citations; report problems and route them to the owning skill/researcher.
- Where evidence is unavailable, surface the gap and cap the dimension's score accordingly — do not
  assume the missing content is correct.
- Distinguish verified facts, interpretations, assumptions, and proposed/future work in all findings.
- Never claim the manuscript is accepted, publication-ready, or guaranteed to pass review.

## References

- `knowledge/quality-framework/review-rubric.md` — the ten scored dimensions and scoring scale.
- `knowledge/quality-framework/manuscript-checklist.md` — `[auto]`/`[human]` checklist items.
- `knowledge/principles/research-writing-principles.md` — the general research-writing and integrity
  standards behind the quality gates (see especially the honesty principle, research integrity and
  ethics, and publication sections).
- `templates/review-report-template.md` — the report structure this skill fills in.
