# User Guide — The Complete Researcher Workflow

This guide walks the full GobeshonaLabAgent workflow and marks clearly which steps are **automated by
the toolkit** and which require **researcher judgment or domain-expert approval**.

The researcher is always in control. The toolkit proposes, checks, and surfaces gaps; it never
invents papers, data, results, or citations, and it never silently changes your research framing.

## The ten-step workflow

### 1. Create a research project
`gobeshona new my-paper` scaffolds `research-project.json` + a README. *(Automated.)*

### 2. State your research framing
Fill in the research concept, problem statement, research question(s), objectives, and claimed
contributions. Add a `hypothesis` **only** for confirmatory quantitative/computational work; leave it
out for qualitative/exploratory studies. *(Your judgment; the `research-design` skill helps and the
validator checks the hypothesis/researchType rule.)*

### 3. Add papers and metadata
List every source you are authorized to use in `sources`, each with a stable `id`. Mark incomplete
metadata (`metadataComplete: false`) and set `verificationStatus`. *(You supply sources; the
`paper-ingestion` skill builds a faithful inventory and flags gaps/duplicates — it never invents
papers or fills missing fields by guessing.)*

### 4. Map sources to sections
In `sectionSources`, say which source ids each section may draw on (introduction, literature review,
methodology, results, discussion, …). *(You decide; the `source-mapping` skill builds the matrix,
enforces the permitted set, and surfaces any section whose claim lacks a supporting source.)*

### 5. Configure venue, citation style, datasets, implementation
Set the target venue, citation style, output format, datasets (with permissions/IRB flags where
human subjects are involved), and whether implementation/experiments are required. *(Your choices;
the validator sanity-checks them.)*

### 6. Validate the configuration
`gobeshona validate research-project.json`. Resolve errors before proceeding. *(Automated — structure
and integrity rules only, not scientific correctness.)*

### 7. Run the skills or the end-to-end workflow
In a compatible AI agent, invoke `research-paper-workflow` (or individual skills). The orchestrator
sequences design → ingestion → mapping → introduction → literature review → methodology →
(implementation) → (experiments) → results → figures → discussion → references → assembly → review,
skipping stages that do not apply to your `researchType`. *(Agent-assisted; you approve each stage.)*

### 8. Optionally implement and run experiments
When `implementation.required`/`experiments.required` are set, the `implementation-engineer` and
`experiment-runner` skills produce a spec, code, and tests, and either run experiments **safely**
(capturing commands, versions, seeds, logs, raw results) or mark results **unavailable** with
reproduction instructions. *(Toolkit never fabricates numbers; running code is your decision and runs
in isolated directories.)*

### 9. Analyze results and plan figures
`results-analyst` computes metrics from your **saved** result files (uncertainty included, baselines
checked, no causal overclaim). `figure-planner` writes conceptual figure specs + reusable prompts and
reproducible plotting scripts for quantitative figures (plotting verified data only). *(Automated
analysis of real data; interpretation is yours.)*

### 10. Assemble and review
`manuscript-assembler` builds a consistent manuscript (Markdown/LaTeX) and checks that the abstract
matches findings, methods match the implementation, results match evidence, and the conclusion
answers the research questions. `final-reviewer` scores the review rubric, flags **blocking
integrity issues**, and reports publication-readiness **signals and residual risks** — never a
guarantee of acceptance. *(Automated checks + required human/domain-expert review.)*

## Automated vs. human — summary

| Concern | Automated | Needs human / domain expert |
|---------|-----------|-----------------------------|
| Config structure & integrity rules | ✅ `validate` | — |
| Source-to-section matrix, permitted sources | ✅ | Does the source actually support the claim? |
| Duplicate-source detection | ✅ | — |
| Figure data provenance | ✅ | Is the figure the right evidence? |
| Citation resolution (both directions) | ✅ (roadmap: automatic cross-ref) | Verifying each reference against its source |
| Metric computation from saved data | ✅ | Are the results meaningful? |
| Equation dimensional-consistency checklist | partial | Mathematical correctness |
| Overclaiming / conclusion-vs-evidence | checklist | ✅ Judgment |
| Hypothesis change consistency | re-check trigger | ✅ Judgment (HARKing?) |

## Research types

GobeshonaLabAgent supports conceptual, theoretical, qualitative, quantitative, mixed-methods, review,
and computational research. It does **not** force mathematical formalism onto qualitative or
conceptual work: for those, it applies qualitative rigor (triangulation, member checking, thick
description, positionality) instead of equations.
