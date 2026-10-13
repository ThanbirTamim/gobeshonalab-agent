---
name: literature-review
description: >-
  Produce a synthesis literature review grouped by theme or method, plus an evidenced research-gap
  statement, built from a literature matrix. Use this when a researcher has an ingested paper
  inventory and needs the Related Work / Literature Review section, or needs to turn reading into a
  defensible gap. Triggers include "write the literature review", "synthesize these papers",
  "what's the research gap", or when the workflow reaches the review stage. Never produces a
  paper-by-paper list, never claims exhaustive coverage without a documented search, and only uses
  sources the researcher permitted for the review section.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs:
    - knowledge/principles/research-writing-principles.md
    - knowledge/quality-framework/manuscript-checklist.md
---

# literature-review

## Purpose

Turn a set of read papers into a **synthesis** literature review — grouped by theme or method and
compared — and into a **research-gap statement** that is backed by evidence from those papers. The
intermediate workhorse is a **literature matrix** (one row per paper: Paper, Method, Dataset/Context,
Finding, Limitation) that organizes thinking before any prose is written.

This follows the core standard that a good review is synthesis, not a list, and that a research gap
is a gap in *knowledge*, not merely "nobody built this product"
(see `knowledge/principles/research-writing-principles.md`: synthesis vs. list, the literature
matrix, and research gap as a knowledge gap rather than a product gap).

## When to use

- After `paper-ingestion` and `source-mapping`, when the review/related-work section is due.
- When the researcher asks to synthesize papers or to articulate and classify the research gap.
- During the `research-paper-workflow` literature-review stage.

Do **not** use this to invent sources — it consumes only the papers already in the project config.

## Inputs

- `research-project.yaml`/`.json` (see `config/research-project.schema.json`), specifically:
  - `sources[]` — the permitted source set (with `id`, metadata, `verificationStatus`).
  - `sectionSources` — the source ids permitted for the review/related-work section.
  - `research.researchGap` — any researcher-declared gap `statement`, `type`, and `supportingSources`.
  - `research.literatureSearch` — the documented search strategy, including
    `claimsComprehensiveCoverage`.
- Per-paper summaries produced by `paper-ingestion` (faithful to each source, with provenance).

## Outputs

- A completed **literature matrix** (using `templates/literature-matrix.md`).
- A **synthesis** literature review in flowing prose, organized by theme/method, comparing strengths
  and weaknesses — never a per-paper list.
- A **research-gap statement** classified by one of the nine gap types, with the specific sources that
  evidence it and a sentence on why the gap matters.
- A **coverage note** stating the search scope and whether comprehensive coverage is claimed.
- A **gap/limitations log** listing claims that lacked supporting sources (surfaced, not fabricated).

## Instructions

1. **Load permitted sources.** Read `sources[]` and `sectionSources` for the review section. Use
   **only** those sources. If a needed source is absent, record it in the gap log — do not add it.
2. **Build the matrix.** For each permitted source, fill one row of `templates/literature-matrix.md`
   (Paper, Method, Dataset/Context, Finding, Limitation) using the `paper-ingestion` summary. If a
   field is unknown or the source metadata is incomplete, mark it `UNKNOWN` — never guess.
3. **Distinguish provenance.** When a row records a finding, attribute it to the paper that produced
   it. If a later paper *claims something about* an earlier paper, record that as the later paper's
   claim, not the earlier paper's finding
   (`knowledge/principles/research-writing-principles.md`, on source provenance and crediting).
4. **Group, don't list.** Cluster the rows into 2–4 themes or methodological families (e.g.,
   "rule-based vs. learning-based", or "structural vs. socio-psychological causes"). Each cluster
   becomes a synthesis paragraph.
5. **Write synthesis prose.** For each cluster, write a paragraph that compares the grouped works'
   strengths and weaknesses and states where they agree or disagree. Preserve genuine conflicts
   between findings — do not force artificial agreement. Do **not** paste the matrix into the review.
6. **Derive the gap.** From the limitations/missing areas across clusters, state the research gap.
   Classify it with exactly one `type` from the schema enum (missing-knowledge, inconsistent-findings,
   methodological-limitation, unexplored-domain, missing-comparison, scalability, robustness,
   reproducibility, practical-deployment). List the `supportingSources` ids and one sentence on why it
   matters. Reject any "nobody built this tool" phrasing as a standalone gap.
7. **Reconcile with the config.** If `research.researchGap` is already declared, align to it; if your
   synthesis contradicts it, surface the discrepancy for the researcher to resolve — do not silently
   overwrite the researcher's declared gap.
8. **Write the coverage note.** Summarize the `literatureSearch` scope. If
   `claimsComprehensiveCoverage` is `true` but databases/query terms/date range are missing, flag it
   and downgrade the claim to "selected literature" until the search is documented.
9. **Run the quality gates** below and emit the gap/limitations log.

## Quality gates

- The review is synthesis grouped by theme/method, not a paper-by-paper list.
- Every claim in the prose traces to a matrix row and a permitted source id.
- No source outside `sectionSources` for the review is cited.
- The research gap fits exactly one defined type, lists supporting sources, and explains why it
  matters; "nobody built this" is never the sole justification.
- Conflicting findings are preserved, not harmonized away.
- A paper's own finding is distinguished from later papers' claims about it.
- No claim of comprehensive/exhaustive coverage unless `literatureSearch` documents the strategy.

## Anti-fabrication rules

- Never invent papers, authors, methods, datasets, findings, or page/line locations.
- Never add a source that is not already in the project config's permitted set.
- Mark unknown matrix fields `UNKNOWN`; incomplete metadata is flagged, never filled by guessing.
- Where the synthesis needs evidence that no permitted source provides, record the gap in the log
  instead of fabricating support.
- Distinguish verified findings (from the sources) from your interpretations, your assumptions, and
  proposed future work; label interpretations clearly.
- Never silently change the researcher's declared research gap, questions, or source set.

## References

- `knowledge/principles/research-writing-principles.md` — synthesis vs. list; building a literature
  matrix; knowledge-gap types; snowballing and reading-time guidance.
- `knowledge/principles/research-writing-principles.md` — introduction & literature review standards,
  including the "no exhaustive coverage without a documented search strategy" rule.
- `knowledge/quality-framework/manuscript-checklist.md` — Section C (introduction & literature review).
- `templates/literature-matrix.md` — the matrix table and theme-grouped synthesis scaffold.
