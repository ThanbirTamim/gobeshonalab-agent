# Metrics Guide

Practical reference for the `results-analyst` skill. It aligns with the general results and figure
standards in `knowledge/principles/research-writing-principles.md`. This guide helps you *choose and
report* metrics from **actual saved data**; it never licenses inventing or estimating numbers.

---

## 1. Metric selection by task and data balance

Always answer two questions before picking a metric:
1. **What am I measuring?**
2. **Why is this metric right for this problem?**

If you cannot explain the choice in one plain sentence, reconsider it.

### Classification

| Metric | What it tells you | Use when | Caution |
|--------|-------------------|----------|---------|
| Accuracy | Overall fraction correct | Classes roughly balanced | **Misleading on imbalanced data** |
| Precision | Of predicted positives, how many are truly positive | False positives are costly | Ignores missed positives |
| Recall / Sensitivity | Of real positives, how many were caught | Missing a positive is costly (e.g., disease screening) | Ignores false alarms |
| Specificity | Of real negatives, how many correctly cleared | Need to limit false alarms | Paired with sensitivity |
| F1 | Harmonic balance of precision & recall | Imbalanced data; both error types matter | Hides which of P/R is weak |
| ROC-AUC | Ability to separate classes across thresholds | Threshold-independent comparison | Can look optimistic on heavy imbalance |

**Imbalance red flag:** with 95 legit vs 5 phishing, a model that always
predicts "legitimate" scores 95% accuracy yet catches zero phishing. On imbalanced data, prefer
Precision/Recall/F1/AUC and **state why accuracy alone is not reported.** This is context-dependent
guidance, not a universal law.

### Regression

| Metric | Meaning |
|--------|---------|
| MAE | Mean absolute prediction error |
| RMSE | Root mean squared error (penalizes large errors more) |
| R² | Variance explained by the model |

### Social science / statistics

- **Statistical significance ≠ effect size.** A result can be
  significant but trivially small, or large but non-significant with a small sample. Report effect
  size alongside any p-value; never decide on a single p-value.

### Economics / policy

- An average alone can hide distribution. Report distribution-sensitive measures alongside the mean,
  e.g. **poverty headcount** (people crossing the poverty line) and **poverty gap** (depth of poverty
  reduced). Choosing a metric is a conscious analytical decision.

---

## 2. Baseline-comparability checklist

Mark each item PASS / FAIL / N/A with evidence (the result file that proves it):

- [ ] At least one **classic/simple** baseline present.
- [ ] At least one **recent/SOTA** baseline present.
- [ ] All methods evaluated on the **same dataset**.
- [ ] All methods evaluated on the **same train/test split**.
- [ ] All methods evaluated with the **same metric(s)**.
- [ ] No deliberately weak/outdated "straw-man" baseline chosen to flatter the proposed method.
- [ ] The baseline matches the field's accepted standard (e.g., current gold-standard test in
      medicine; prior image-processing method, not only human inspection, in vision).
- [ ] Marginal gain assessed honestly (e.g., 96% vs 95% F1 is ~1% — is the added complexity worth it?).

Any FAIL is reported to the researcher, not silently published.

---

## 3. Uncertainty reporting

- With multiple runs/seeds, report **mean ± standard deviation** rather than a single number.
- Report **confidence intervals** where the data and design support them; statistical results commonly
  include p-value and confidence interval.
- For comparative statistical graphs, include **error bars / confidence intervals**; omitting error
  bars prevents readers from judging whether a difference is meaningful or noise.
- If only a single run exists, state this explicitly and record it as a limitation; do not imply
  stability you did not measure.

Template line (fill only from computed values):

```
<Method> achieved <metric> = <mean> ± <sd> over <N> runs (seeds: <list>), on <dataset>/<split>.
```

---

## 4. Results-vs-Discussion split test

For **every sentence**, ask: *"Is this giving information, or giving an explanation?"*

- **Information → Results.** Numbers, tables, graphs, neutral descriptions of what happened.
  - Good: "The proposed method achieved an F1 of 0.96, compared to 0.80 and 0.89 for the baselines."
- **Explanation → Discussion.** Mechanisms, reasons, implications, hypothesis support, comparisons to
  prior work.
  - Belongs in Discussion: "…because it captures non-linear boundaries a rule-based method cannot."

Banned in Results: evaluative/hype words such as "amazing", "revolutionary", "performs amazingly".

### Ablation / additional analysis

- Support any "all parts matter" claim with an ablation table that removes one component (or logical
  feature group) at a time and reports the metric drop.
- Include at least one of: ablation, sensitivity analysis, or error analysis.
- Don't brute-force every combination; remove the most important, hypothesis-driven components.

---

## 5. Honesty rules (non-negotiable)

- Report unexpected/negative results plainly; never hide or soften them.
- Never claim causation from correlation; flag confounders (ice-cream sales vs drowning both rise in
  summer — the cause is the season).
- Every number must trace to a saved result file. If it cannot be computed from available data, mark
  it **unavailable** — never fabricate, round-up, or estimate a favorable value.
