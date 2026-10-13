---
name: figure-planner
description: >-
  Plan a manuscript's figures, handling CONCEPTUAL and QUANTITATIVE figures as two separate tracks.
  Use this when a researcher needs to decide which figures a paper requires, write a precise
  specification for each, produce a reusable image-generation prompt for conceptual diagrams, or
  generate reproducible plotting code (e.g., matplotlib) for data charts. Every figure gets a spec
  that ties it to the claim it supports and records its data provenance. Conceptual prompts are
  for diagrams only and are NEVER used to fabricate charts or measurements; quantitative plots are
  generated only from verified data files, never from invented numbers.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs:
    - knowledge/principles/research-writing-principles.md
    - knowledge/quality-framework/manuscript-checklist.md
    - knowledge/quality-framework/review-rubric.md
---

# figure-planner

## Purpose

Turn a project's figure requirements into disciplined, traceable figure plans. This skill keeps a
hard line between two kinds of figures:

- **Conceptual figures** (architecture diagrams, pipelines, taxonomies, theoretical frameworks):
  described by a specification plus a reusable prompt for a compatible image-generation tool. These
  illustrate ideas and relationships only.
- **Quantitative figures** (line/bar/scatter charts, heatmaps, error-bar plots): produced by
  reproducible plotting code that reads a **verified data file**, so the figure can be regenerated and
  audited.

The guiding principle is the **stranger test**: a figure plus its caption must be
understandable on its own.

## When to use

- The researcher asks which figures the paper needs, or how to design a specific figure.
- A claim in the Results or Methodology needs visual support.
- A reviewer flags an unclear, mislabeled, or unsupported figure.
- Figures must be regenerated after a data or style change.

Invoke directly for a single figure, or as Stage 10 of `research-paper-workflow`.

## Inputs

- The `figures` array from the project config (`config/research-project.schema.json`): each entry has
  `id`, `kind` (`conceptual` | `quantitative`), `purpose`, optional `supportsClaim`, and `dataSource`.
- For quantitative figures: a path to a **verified** data/result file (CSV/JSON) produced by
  `experiment-runner` or supplied by the researcher.
- The claim or research question each figure is meant to support.

## Outputs

- One completed figure specification per figure, using `templates/figure-spec-template.md`.
- For conceptual figures: a reusable image-generation prompt embedded in the spec.
- For quantitative figures: a runnable plotting script derived from `templates/plot-script-template.py`
  that reads the real data file (no literal numbers hard-coded into the script).
- A short figure inventory noting any figure whose data provenance is missing (surfaced as a GAP).

## Instructions

1. **Load and classify.** For each entry in the config `figures` array, read `kind`. Route
   `conceptual` entries to step 3 and `quantitative` entries to step 4. If `kind` is missing, ask the
   researcher to classify it — do not guess.
2. **Anchor to a claim.** Record the exact claim or research question the figure supports
   (`supportsClaim`). If a figure supports no stated claim, flag it: a figure must carry a distinct,
   important message. Do not invent a claim to justify the figure.
3. **Conceptual figure.** Fill `templates/figure-spec-template.md`:
   - List required components and their relationships (boxes, arrows, groupings, ordering).
   - Write a reusable image-generation prompt describing layout, labels, and style — plain, flat,
     grayscale-friendly, no decorative 3D. State explicitly in the prompt that it depicts a concept
     and **must not render fabricated data, numbers, axes, or measurements**.
   - Set `data provenance` to `conceptual (no measured data)`.
4. **Quantitative figure.** Fill the same template, then:
   - Confirm a verified `dataSource` exists. If it does not, stop and surface the GAP — never
     synthesize numbers to draw a chart (figures must honestly reflect verified data; quantitative
     plots are generated from verified data only).
   - Choose the chart type from the data's message: line for a trend over time/continuous variable,
     bar for distinct categories, scatter for two continuous variables.
   - Copy `templates/plot-script-template.py` to `plot_<figure-id>.py`, set the data file path, and
     configure axis labels **with units**, a colorblind-safe palette plus a second distinguishing
     signal (line pattern/marker shape), and error bars/CIs where the field expects them.
5. **Caption and legend.** Write a self-contained caption stating the axes, number of series, and the
   message — never just "Results" or "Comparison".
6. **Validate (stranger test + checklist).** Apply the figure checklist: correct chart type, labeled
   axes with units, readable fonts at final size, chartjunk removed, consistent decimals,
   self-contained caption, grayscale/colorblind safe, and the text explains the message rather than
   only saying "shown in Figure X." Record pass/fail per item in the spec's validation section.
7. **De-duplicate and place.** Do not duplicate identical data in both a figure and a table; ensure
   each figure adds something distinct, is placed near its first text mention, and never buries an
   essential claim-proving result in supplementary material.

## Quality gates

- Every figure has a completed spec with `id`, `purpose`, supported claim, components/relationships,
  **data provenance**, prompt-or-plotting instructions, caption + legend, and validation results.
- Quantitative figures reference a verified data file; the plotting script contains no hard-coded
  measurements.
- Conceptual prompts state they are concept diagrams and must not render data.
- Each figure passes the stranger test and the figure checklist, or its failing items are listed.
- No two figures carry the same message without a documented reason.

## Anti-fabrication rules

- **Never** use an image-generation tool to produce a scientific chart, measurement, axis value, or
  data point. Image models are for conceptual diagrams only.
- **Never** invent, estimate, or "fill in" data to make a quantitative figure; if the verified data is
  missing, surface the GAP and mark the figure as pending data.
- **Never** alter real data points to make a figure look more favorable; report unexpected or
  negative patterns honestly.
- Distinguish in the spec what is a **verified data figure**, a **conceptual illustration**, an
  **assumption** (e.g., an expected-shape sketch clearly labeled as illustrative), or **proposed
  future work** (a figure that cannot yet be produced).
- Do not change the claim a figure supports to match an available figure; the researcher owns the
  claim set.

## References

- `knowledge/principles/research-writing-principles.md` — section 6 (figures: stranger test, chart
  choice, axis/units, chartjunk, captions, accessibility, placement, field-specific requirements, and
  the rule that quantitative plots come only from verified data).
- `knowledge/quality-framework/manuscript-checklist.md` — section F (results, discussion, figures).
- `knowledge/quality-framework/review-rubric.md` — dimension 7 (figure integrity).
- `templates/figure-spec-template.md`, `templates/plot-script-template.py`.
