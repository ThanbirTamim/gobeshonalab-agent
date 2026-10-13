# Project Configuration Guide

The researcher drives the toolkit through one file: `research-project.json` (JSON is the officially
supported format for the validator; a YAML equivalent is fine for agents to read but should be
converted to JSON before `gobeshona validate`). Its contract is
[`config/research-project.schema.json`](../config/research-project.schema.json) (JSON Schema
2020-12).

**You own this file.** Skills read it as the source of truth and must never silently invent or change
your research framing, results, or permitted sources.

## Top-level sections

| Key | Required | Purpose |
|-----|----------|---------|
| `project` | yes | Title, discipline, `researchType`, venue, citation style, output format, time budget. |
| `research` | yes | Concept, problem statement, hypothesis (optional), research questions, objectives, contributions, research gap, literature-search strategy. |
| `sources` | yes | The **permitted source set** — every paper you authorize, with a stable `id`. |
| `sectionSources` | yes | Which source ids each manuscript section may draw on. |
| `datasets` | no | Dataset paths, licenses, permissions, human-subjects/IRB flags. |
| `implementation` | no | Whether code is required, existing code paths, language, deps, hardware. |
| `experiments` | no | Baselines (classic + recent), metrics, split, seeds, runs, constraints. |
| `figures` | no | Figure inventory: conceptual vs. quantitative + data provenance. |
| `limitations` / `openDecisions` | no | Known limits and explicitly unresolved choices. |

## Key rules the validator enforces

- **`researchType`** is one of: conceptual, theoretical, qualitative, quantitative, mixed-methods,
  review, computational. It controls which gates apply.
- **Hypothesis discipline:** a `hypothesis` is expected only for confirmatory
  quantitative/mixed-methods work. Setting one on a qualitative study raises a warning; omitting one
  on quantitative work raises a warning (exploratory quantitative work may legitimately omit it).
- **Research questions** need ids matching `^RQ\d+$`. Any `feasible/novel/significant/specific` flag
  set to `false` triggers a warning (reconsider before locking the question).
- **Contributions** must each have a `type` of `novelty`, `empirical-evidence`, or `practical-value`.
- **Sources** must have unique ids; a duplicate id is an **error** (same paper supplied twice).
- **`sectionSources`** may only reference ids that exist in `sources`; unknown ids are **errors**.
- **Comprehensive coverage** (`literatureSearch.claimsComprehensiveCoverage: true`) requires a
  documented strategy (`databases` + `queryTerms`), else an error.
- **Quantitative figures** without a `dataSource` raise a warning (they must plot verified data).
- **Experiments** marked required should declare a classic-simple **and** a recent-sota baseline.

## Minimal example (qualitative study, no hypothesis)

See [`../examples/fixtures/qualitative-study/research-project.json`](../examples/fixtures/qualitative-study/research-project.json).

## Full example (computational study, 5 papers, experiments, figures)

See [`../examples/fixtures/five-papers/research-project.json`](../examples/fixtures/five-papers/research-project.json).

## Validate your config

```bash
node dist/cli/index.js validate --config path/to/research-project.json
```
