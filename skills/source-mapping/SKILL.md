---
name: source-mapping
description: >-
  Build and maintain the source-to-section matrix for a research project, turning the researcher's
  `sectionSources` assignments in the project config into an enforceable, visible mapping. Use this
  skill after papers are ingested and before (and during) section drafting: it shows which permitted
  sources each manuscript section may draw on, verifies every assigned source actually exists in the
  project `sources`, traces each substantive claim back to a supporting source, and — critically —
  surfaces evidence GAPS when a section needs support that no assigned source provides, instead of
  fabricating or borrowing out-of-scope sources. Grounded in general standards for crediting prior
  work and for building a review from a literature matrix.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs:
    - knowledge/principles/research-writing-principles.md
    - knowledge/quality-framework/manuscript-checklist.md
---

# source-mapping

## Purpose

`source-mapping` makes the researcher's **permitted-source restrictions enforceable and visible**. It
converts the `sectionSources` object in the project configuration into a human-readable **source-to-
section matrix**, and it maintains a **claims-traceability table** that links each substantive claim
to the specific source(s) that support it, within the sources assigned to that section.

A widely-used standard requires that any idea, method, or fact that is not your own be credited to its
source — a citation plus genuine rewriting, not word-swapping — and that
a literature synthesis be organized from a structured matrix rather than invented from memory. This
skill operationalizes both: it keeps provenance attached to every
claim and keeps each section honest about what its assigned evidence can and cannot support.

## When to use

- Right after `paper-ingestion`, once the project `sources` inventory exists.
- Before drafting any section, to see which sources that section is permitted to cite.
- During drafting/revision, to trace a claim to its support or to flag that no assigned source
  supports it (an evidence gap).
- Before `final-reviewer`, to confirm no section drew on out-of-scope sources.

## Inputs

- A `research-project.yaml`/`.json` conforming to `config/research-project.schema.json`, specifically:
  - `sources[]` — the permitted source set (each with a stable `id`).
  - `sectionSources{}` — section name → array of permitted source `id`s.
- Optionally, the per-paper summaries produced by `paper-ingestion` (for claim-level checking).
- Optionally, a list of substantive claims per section that the researcher wants traced.

## Outputs

- `source-section-matrix.md` — a matrix of manuscript section × permitted source `id`s, plus a
  claims-traceability table (claim → section → supporting source id(s) → status).
- A **gaps report** section listing, per manuscript section:
  - claims with no supporting assigned source (evidence gaps to resolve by the researcher);
  - any referenced source `id` that does not exist in `sources` (dangling references);
  - any `sectionSources` id whose source has `metadataComplete: false` or
    `verificationStatus` other than `verified` (provenance caveats to carry forward).

## Instructions

1. Load and validate the project config. Collect the set of all valid source `id`s from `sources[]`.
2. For each entry in `sectionSources{}`, verify every listed `id` exists in `sources[]`. Record any
   missing id as a **dangling reference** in the gaps report — never silently drop or invent it.
3. Build the source-to-section matrix: one row per manuscript section, one column per source `id`
   (or a compact "section → assigned ids" table for large projects). Mark each assignment.
4. For each source assigned to a section, carry forward its provenance flags: `verificationStatus`
   and `metadataComplete`. Annotate unverified or incomplete-metadata sources so downstream writing
   skills know the citation is provisional.
5. For each substantive claim the researcher wants traced (or that appears in a drafted section),
   record it in the claims-traceability table with: the section, the supporting source `id`(s) **drawn
   only from that section's assigned set**, and a status:
   - `supported` — at least one assigned source supports the claim;
   - `gap` — no assigned source supports the claim (an evidence gap);
   - `out-of-scope-needed` — a source that could support it exists in `sources` but is **not** assigned
     to this section (flag for the researcher to re-assign — do not borrow it automatically).
6. Compile the **gaps report**: list all `gap`, `out-of-scope-needed`, dangling-reference, and
   provenance-caveat items. Present them as decisions for the researcher, with no fabricated support.
7. Distinguish, in every entry, verified facts (traceable to a verified source), interpretations,
   assumptions, and proposed/future work. Do not upgrade an interpretation to a fact.
8. Write `source-section-matrix.md` using `templates/source-section-matrix.md` as the starting shape.
9. Do not change `sectionSources`. If the mapping needs to change, propose the change and let the
   researcher update the config; this skill only reads and reports.

## Quality gates

- Every assigned source `id` resolves to a real entry in `sources[]` (no dangling references).
- No section's claims cite a source outside that section's assigned set.
- Every traced claim has an explicit status (`supported`, `gap`, or `out-of-scope-needed`).
- Unverified / incomplete-metadata sources are flagged wherever they are used.
- The gaps report is present even when empty (stating "no gaps found") so absence is deliberate.

## Anti-fabrication rules

- Never invent a source, author, title, DOI, URL, or quotation to fill a gap.
- Never expand the permitted source set or borrow a source into a section it was not assigned to;
  surface the GAP and let the researcher decide (see `research-writing-principles.md`, §8).
- Never claim a section is fully supported when any traced claim has status `gap`.
- If a source's metadata is incomplete, flag it — do not guess the missing fields.
- Keep the researcher in control of `sectionSources`; this skill reports, it does not reassign.

## References

- `knowledge/principles/research-writing-principles.md` — §7 (credit/provenance for citations),
  §3 (literature matrix & synthesis).
- `knowledge/principles/research-writing-principles.md` — §1 (verified vs interpretation vs
  assumption vs proposed), §3 (synthesis), §8 (enforce permitted source set, surface gaps).
- `knowledge/quality-framework/manuscript-checklist.md` — evidence-traceability checklist items.
- `templates/source-section-matrix.md` — matrix + claims-traceability template.
