---
name: results-analyst
description: >-
  Turn saved experimental evidence into an honest, factual Results section. Use this skill after
  experiments have produced real result files (metrics logs, CSVs, raw outputs) and the researcher
  needs metrics computed, baseline comparisons checked, uncertainty reported, and findings written up
  without spin. Triggers: "analyze my results", "build the results table", "which metric should I
  report", "is my baseline comparison fair", "report mean and standard deviation". It computes metrics
  only from actual data, keeps interpretation out of Results (that belongs to discussion-conclusion),
  and never invents favorable numbers or hides failed/negative runs.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs:
    - knowledge/principles/research-writing-principles.md
    - knowledge/quality-framework/manuscript-checklist.md
    - knowledge/quality-framework/review-rubric.md
---

# results-analyst

## Purpose

Produce the Results section from **actual saved result files only**. This skill computes or verifies
metrics from the data the researcher provides, checks that baseline comparisons are fair, reports
uncertainty, and writes findings as neutral facts. Its guiding question is not "did you do well?" but
"better than what?"

Interpretation of *why* a result occurred is explicitly out of scope here — that is handed to
`discussion-conclusion`. Keeping that boundary is a core quality gate.

## When to use

- Experiments (via `experiment-runner`) have written result files and the researcher wants a Results
  section, a comparison table, or an ablation/error analysis summary.
- The researcher asks which metric to report, or whether reporting accuracy alone is defensible.
- A reviewer questions baseline comparability or missing uncertainty estimates.

Do **not** use this skill to generate numbers when no result files exist; surface the gap instead.

## Inputs

- Paths to saved result files (metrics logs, CSVs, JSON, raw prediction/label files) authorized in the
  project config under `experiments`/`datasets`.
- The `experiments` block of `research-project.yaml` (baselines, metrics, dataset split, seeds, runs).
- The research question(s) and, if the design is confirmatory quantitative, the hypothesis — read
  only; never altered here.

## Outputs

- A factual Results section (Markdown) containing numbers, tables, and references to figures — no
  interpretation or hype.
- A baseline comparison table (same dataset / split / metric) and, where applicable, ablation,
  sensitivity, or error-analysis tables.
- A per-number provenance note mapping each reported value to the exact source file (and seed/run
  where relevant), so every figure in the text is traceable to saved evidence.
- A gap list: any requested metric, baseline, or uncertainty estimate that could not be computed
  because the underlying data was missing, marked clearly as **unavailable**.

## Instructions

1. **Load the evidence.** Read only the authorized result files. Record each file's path and what it
   contains. If a required file is missing, stop and record the gap — do not estimate or fabricate.
2. **Pick and justify metrics.** Using `references/metrics-guide.md`, choose metrics that fit the task
   and the data balance. Never report accuracy alone on imbalanced data; prefer Precision/Recall/F1/
   AUC when appropriate, and justify the choice in one explicit sentence. For regression use
   MAE/RMSE/R²; for policy/economics add distribution-sensitive measures (e.g., poverty headcount/gap)
   alongside any average.
3. **Compute from data.** Calculate each metric from the raw files. Keep the computation reproducible
   (record the exact file, column, and formula). Re-derive rather than trust pre-summarized numbers
   when the raw data is available.
4. **Check baseline comparability.** Confirm every method — proposed and baselines — was evaluated on
   the **same dataset, same train/test split, and same metric**. Require at least one classic/simple
   baseline and one recent/SOTA baseline. Flag any mismatch or weak-opponent comparison instead of
   silently reporting it.
5. **Report uncertainty.** When multiple runs/seeds exist, report mean ± standard deviation (and
   confidence intervals where the data supports them) rather than a single number. If only one run
   exists, say so and flag it as a limitation.
6. **Assemble Results, numbers only.** Write each key finding as its own paragraph referencing its
   specific table/figure ("As shown in Table 2…"), ordered main result → comparison → additional
   analysis. Remove all explanatory and evaluative language ("amazing", "revolutionary", "because it
   uses meaningful features") — that is Discussion.
7. **Apply the information-vs-explanation test.** For every sentence ask: "Is this giving information
   or an explanation?" Information stays in Results; explanation is routed to `discussion-conclusion`.
8. **Support any ablation claim.** Only state that a component matters if an ablation table (removing
   one component/feature group at a time) backs it. Include at least one of ablation, sensitivity, or
   error analysis.
9. **Handle unexpected and negative results honestly.** Report them plainly; never hide, drop, or
   soften them. Note them for `discussion-conclusion` to interpret.
10. **Emit provenance + gaps.** Attach the per-number provenance note and the gap list to the output.

## Quality gates

- Every reported number traces to a named saved result file (and seed/run where relevant).
- At least one classic/simple and one recent/SOTA baseline, all compared on identical data/split/metric.
- Metric choice is justified explicitly; accuracy is never reported alone on imbalanced data.
- Results contains facts only; no interpretation, no evaluative adjectives.
- Uncertainty reported (mean ± sd / CI) whenever multiple runs exist; single-run results flagged.
- At least one ablation, sensitivity, or error analysis present when the study is experimental.
- Any claim that "every part matters" is backed by an ablation table.

## Anti-fabrication rules

- Never invent, round-up, or "clean" favorable numbers; never conceal failed or negative runs.
- Never claim causation from correlation; flag possible confounders and leave causal reasoning to the
  study design and `discussion-conclusion`.
- Never compare against a deliberately weak/outdated baseline to look better.
- If a metric, baseline, or uncertainty estimate cannot be computed from available data, mark it
  **unavailable** and surface the gap — do not substitute a guess.
- Distinguish verified facts (computed values), interpretations (deferred to Discussion), assumptions
  (e.g., metric-choice rationale), and proposed/future work.
- Read research questions and hypotheses; never alter them, and never select results to flatter them.

## References

- `references/metrics-guide.md` — metric selection by task/data balance, uncertainty reporting, the
  baseline-comparability checklist, and the Results-vs-Discussion split test.
- `knowledge/principles/research-writing-principles.md` — results, baselines, metrics, and ablation
  standards, plus guidance on error bars/confidence intervals for comparative statistical graphs.
- `knowledge/quality-framework/manuscript-checklist.md` — section F (results, discussion, figures).
- `knowledge/quality-framework/review-rubric.md` — dimensions 6 (result provenance) and 9 (overclaiming).
