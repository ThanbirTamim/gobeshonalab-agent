---
name: methodology-designer
description: >-
  Produce a discipline-adaptive Methodology section that documents how a study was verified rather
  than merely what was built. Use this skill after the research design and sources are settled and
  before implementation, results, or discussion. It adapts to the declared researchType: for
  quantitative/computational work it demands data source/size/split, assumptions, preprocessing,
  sample-size justification, data-leakage avoidance, and full reproducibility info (hardware,
  versions, seeds, runs, mean±sd); for mathematical disciplines it adds a formal problem definition,
  notation/symbol table, objective functions/constraints, pseudocode, complexity analysis, and a
  dimensional-consistency check; for qualitative work it substitutes triangulation, member checking,
  thick description, positionality, and internal/external/construct validity. Trigger it whenever a
  researcher needs a rigorous, reproducible, honestly-scoped methodology.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs:
    - knowledge/principles/research-writing-principles.md
    - knowledge/quality-framework/manuscript-checklist.md
---

# methodology-designer

## Purpose

Turn a settled research design into a Methodology section that another researcher could follow to
reproduce the study. The guiding principle is that methodology describes **"how I verified it," not
"what I built"** — a dataset, split, baseline, metric, and number of runs are methodology; a
screenshot of an app is not. The section's rigor is what earns reader trust, so it must be
transparent and reproducible regardless of discipline.

## When to use

- After `research-design` has fixed the research question(s), objective(s), and (if confirmatory
  quantitative) hypothesis, and after `source-mapping` has assigned permitted sources.
- Before `implementation-engineer`, `experiment-runner`, `results-analyst`, or `discussion-conclusion`.
- Whenever a reviewer flags missing reproducibility, undocumented assumptions, or data leakage.

## Inputs

- A validated `research-project.yaml`/`.json` (see `config/research-project.schema.json`), especially
  `project.researchType`, `project.discipline`, `research.*`, `datasets[]`, `implementation`, and
  `experiments`.
- Any existing methodology notes, pilot-study results, or protocol drafts supplied by the researcher.

## Outputs

- A `methodology.md` draft tailored to the `researchType`, containing only the applicable blocks.
- A completed notation/symbol table (for mathematical work) from `templates/notation-table.md`.
- A dimensional-consistency report for every equation (for mathematical work).
- An explicit list of **gaps** (undecided parameters, unavailable sample-size justification, missing
  seeds) surfaced for the researcher — never silently filled in.

## Instructions

1. **Read the design, do not invent it.** Load the project config. Restate the Gap → Research
   Question → Objective → (Hypothesis) chain exactly as the researcher authored it; never create or
   alter a hypothesis, and recall that a hypothesis belongs only to confirmatory quantitative work.
2. **Confirm the research design fits the question.** Name the design (experimental, observational,
   correlational, case study, design-science, etc.) and verify it answers the RQ. If the config
   implies a method chosen before the question, flag it — never reverse-engineer an RQ to fit a
   method.
3. **Branch by `researchType`:**
   - **quantitative / computational / mixed (quant arm):** document data source, size, number of
     features/classes, collection method, inclusion/exclusion criteria, and the train/validation/test
     split. State every assumption and every hyperparameter value with how it was chosen. Describe all
     preprocessing (missing values, scaling/normalization, encoding, outliers). Check for **data
     leakage**: split first, fit scaling only on train, and split at the entity level (e.g., patient)
     when samples repeat. Justify sample size via power analysis, and for ML balance dataset size
     against model complexity.
   - **mathematical disciplines (any type where the discipline warrants formalism):** additionally
     follow `references/math-methodology-guide.md` — give a formal problem definition, fill the
     notation table, state assumptions, write objective functions/constraints and pseudocode, give a
     complexity analysis, and run the **dimensional-consistency check** on every equation. Mark each
     equation as reproduced, adapted, or new, and cite the source for reproduced/adapted ones. Do not
     add equations merely to look sophisticated (see research-writing-principles §4).
   - **qualitative / mixed (qual arm):** substitute equations with qualitative rigor — state sampling
     (purposive), interview/observation protocol (location, language, duration, recording,
     transcription), coding/thematic-analysis approach, and apply triangulation, member checking,
     thick description, and researcher positionality. Determine sample size by data saturation, not a
     fixed number.
   - **review / theoretical / conceptual:** document the search strategy, inclusion/exclusion
     criteria, synthesis method, and scope; do not claim exhaustive coverage without that strategy.
4. **Write the reproducibility block** (quantitative/computational): hardware, OS, library/framework
   **versions**, environment, hyperparameters, data split, random seed, number of runs, and report
   results as mean ± standard deviation over multiple runs — never a single run.
5. **Address validity and ethics.** For quantitative work, discuss internal, external, and construct
   validity. Mention informed consent, anonymization, IRB/ethics approval for human data, and dataset
   license/terms compliance. Defer deep ethics to `experiment-runner`/`final-reviewer` but do not
   omit it.
6. **Keep it falsification-ready.** Design the methodology so a negative/null result is still
   acceptable; apply the sanity check "if the result were opposite, would I still trust this method?"
   Mention pilot testing and its lessons where relevant.
7. **Surface gaps, do not fill them.** Any undecided parameter, missing seed, unavailable sample-size
   justification, or unassigned source becomes an explicit open item for the researcher.

## Quality gates

- Methodology describes verification (data/split/baseline/metric/runs), not just construction.
- All assumptions, preprocessing steps, and hyperparameters are documented with their rationale.
- Data-leakage avoidance is stated (split-before-scaling; entity-level split where applicable).
- Sample size is justified by the method-appropriate logic (power analysis / saturation / size-vs-complexity).
- Reproducibility block is complete (hardware, versions, seed, runs, mean±sd) for computational work.
- Every equation is dimensionally consistent and labelled reproduced/adapted/new with a source where applicable.
- Qualitative work shows explicit rigor (triangulation, member checking, thick description, positionality).
- The methodology would still be trusted if the result were negative.

## Anti-fabrication rules

- Never invent or alter the research question, objective, or hypothesis; a hypothesis is added only
  when the researcher's design is confirmatory quantitative.
- Never fabricate dataset details, sample sizes, seeds, hyperparameters, versions, or results.
- Never add equations, notation, or statistical ceremony that the study does not actually use.
- Where a required detail is unknown, record it as a gap for the researcher — do not guess.
- Distinguish verified facts (what was done) from assumptions, interpretations, and proposed/future steps.
- Do not fabricate citations or sources; cite only references the researcher has actually supplied.

## References

- `knowledge/principles/research-writing-principles.md` — §4 Methodology (quantitative, qualitative,
  mixed, computational) and the reproducibility and validity standards.
- `knowledge/quality-framework/manuscript-checklist.md` — Section D (Methodology) gates.
- `references/math-methodology-guide.md` — when to use math, dimensional-consistency, equation provenance.
- `templates/notation-table.md` — notation/symbol table template.
