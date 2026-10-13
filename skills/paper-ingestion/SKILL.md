---
name: paper-ingestion
description: >-
  Turn the researcher's supplied source papers into a traceable paper inventory and faithful
  per-paper summaries. Use this skill at the start of a project (or whenever new sources are added)
  to register every paper listed in the project config `sources[]`, read any locally supplied copies,
  and produce honest summaries that preserve bibliographic provenance. It flags incomplete metadata,
  detects duplicate papers, distinguishes each paper's own findings from claims it makes about other
  work, and records where substantive claims appear — never fabricating sources, findings, or details.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs:
    - knowledge/principles/research-writing-principles.md
---

# paper-ingestion

## Purpose

Convert the permitted source set declared by the researcher into (1) a single traceable **paper
inventory** and (2) one **faithful summary per paper**. These artifacts are the shared evidence base
that `source-mapping`, `literature-review`, `introduction-writer`, `reference-auditor`, and
`final-reviewer` all build on, so accuracy and provenance here protect the whole manuscript.

This skill never expands the permitted source set and never invents bibliographic details. It makes
missing information **visible** rather than filling it in.

## When to use

- At project start, once the researcher has listed `sources[]` in `research-project.yaml`/`.json`.
- Whenever the researcher adds, replaces, or corrects a source.
- Before `source-mapping` or `literature-review`, which depend on these summaries.

## Inputs

- The project config conforming to `config/research-project.schema.json`, specifically `sources[]`
  (each with `id`, `title`, optional `authors`, `year`, `venue`, `doi`, `url`, `localPath`,
  `metadataComplete`, `verificationStatus`, `notes`).
- Any locally stored copies at `localPath` the researcher is authorized to read.

## Outputs

- `paper-inventory.md` — one row per source: `id`, short citation, metadata-complete flag,
  verification status, duplicate flag, and whether a readable local copy was available.
- `summaries/<id>.md` — one faithful summary per paper, using
  `references/paper-summary-template.md`.
- A **gaps list** at the top of the inventory: incomplete metadata, unreadable/missing local copies,
  unverifiable sources, and suspected duplicates — each with the action needed to resolve it.

## Instructions

1. **Load the source set.** Read `sources[]` from the project config. Treat this list as the complete
   permitted set — do not add papers the researcher did not list.
2. **Read what is available.** For each source with a `localPath` you are authorized to open, read the
   copy. If `localPath` is missing or unreadable, record that in the gaps list and continue with
   metadata only (do not invent content).
3. **Capture provenance.** For each paper, record the full citation from the config/metadata exactly
   as supplied. Do not "improve" author names, titles, years, venues, or DOIs. If a field is absent,
   leave it empty and flag it.
4. **Flag incomplete metadata.** If any of title/authors/year/venue/DOI is missing or the config sets
   `metadataComplete: false`, mark the inventory row as **metadata-incomplete** and list exactly which
   fields are missing.
5. **Set verification status.** Carry over `verificationStatus` from the config. Only `source-mapping`
   / `reference-auditor` promote a status to `verified`; this skill keeps `unverified` or
   `unverifiable` and never claims verification it did not perform.
6. **Detect duplicates.** Compare sources by DOI first, then by normalized title + author/year. If two
   `id`s point to the same work, flag both as **suspected-duplicate** and recommend the researcher
   merge them (do not silently drop either; the researcher owns the source set).
7. **Summarize faithfully.** Fill `references/paper-summary-template.md` per paper. Paraphrase in your
   own words and structure — never near-verbatim word-swapping, following the paraphrase/provenance
   standard. Build the summary from understanding, not by editing the original line by line.
8. **Separate findings from citations-about-others.** Record the paper's **own original findings**
   distinctly from claims the paper makes **about other work**, grounded in the provenance principle.
   Attributing a cited claim as the paper's own finding is a provenance error.
9. **Record claim locations.** When a substantive claim is tied to a specific place in the source
   (section, page, figure/table), note it in the `quotable-with-location` field so later skills can
   cite precisely. If no location is available, say "location not available" — do not guess.
10. **Capture limitations.** Note the limitations the paper states about itself; these feed the
    literature matrix (the "Limitation" column reused by the literature review).
11. **Write the inventory.** Produce `paper-inventory.md` with the gaps list first, then the table.
    The columns align with the literature-matrix columns the review will reuse.

## Quality gates

- Every `sources[]` entry appears exactly once in the inventory (duplicates flagged, not removed).
- Every summary separates original findings from claims-about-others.
- Every missing metadata field, unreadable copy, and unverifiable/duplicate source is in the gaps list.
- No summary contains near-verbatim text from a source; paraphrase is genuine.

## Anti-fabrication rules

- Never invent papers, authors, titles, years, venues, DOIs, URLs, quotations, or findings.
- Never add a source outside the researcher's `sources[]` list.
- Never promote `verificationStatus` to `verified` here, and never claim a copy was read when it was
  not available.
- Never present a paper's citation of someone else's result as that paper's own finding.
- When information is missing, surface the gap; do not fill it with plausible-sounding detail.
- Clearly label verified facts vs. your interpretation vs. assumptions in each summary.

## References

- `references/paper-summary-template.md` — the per-paper summary template.
- `knowledge/principles/research-writing-principles.md` — paraphrase/provenance standards, the
  literature matrix, the honesty principle, and provenance rules (sections 1 and 8).
- `config/research-project.schema.json` — the `sources[]` contract this skill consumes.
