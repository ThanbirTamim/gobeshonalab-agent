# Notation / Symbol Table (template)

> Fill this table for any mathematical methodology. Every symbol used in an equation, objective
> function, or pseudocode step must be defined here exactly once. Keep it next to the Methodology
> section so a reader never meets an undefined symbol. Units are "—" when the quantity is
> dimensionless (e.g., probabilities, ratios, counts without a physical unit).

## How to use

1. Add one row per symbol, in roughly the order symbols first appear.
2. Give each symbol a precise type/domain (e.g., `ℝ`, `ℝ^d`, `ℝ^{m×n}`, `{0,1}`, `ℕ`).
3. State units where the quantity is physical/measured; use "—" for dimensionless quantities.
4. Keep notation consistent across the whole manuscript; do not reuse one symbol for two meanings.

## Table

| Symbol | Meaning | Type / Domain | Units | Notes |
|--------|---------|---------------|-------|-------|
| `x` | Input feature vector for one sample | `ℝ^d` | — | d = number of features |
| `y` | Target label / outcome | e.g. `{0,1}` or `ℝ` | — or measured unit | classification vs. regression |
| `d` | Number of input features | `ℕ` | — | |
| `n` | Number of samples (train) | `ℕ` | — | |
| `W` | Weight matrix of a layer/model | `ℝ^{m×n}` | — | shapes must conform in products |
| `θ` | Model parameters (all) | `ℝ^p` | — | p = parameter count |
| `L(·)` | Loss / objective function | `ℝ → ℝ` | — or measured unit | state what it penalizes |
| `λ` | Regularization strength | `ℝ_{≥0}` | — | chosen by: <grid search / default / tuning> |
| `η` | Learning rate | `ℝ_{>0}` | — | optimizer step size |
| `α` | Significance level | `(0,1)` | — | e.g., 0.05 for hypothesis tests |
| `p` | p-value | `[0,1]` | — | interpret correctly as the probability of data at least as extreme under the null |
| `t` | Time / step index | `ℕ` or `ℝ_{≥0}` | s (if physical) | |
| `τ` | Time constant / temperature | matches `t` or — | s or — | makes `exp(t/τ)` dimensionless |

## Checklist before finalizing

- [ ] Every symbol appearing in an equation/pseudocode is in the table.
- [ ] No symbol has two different meanings anywhere in the manuscript.
- [ ] Units are stated for all physical quantities; dimensionless ones marked "—".
- [ ] Vector/matrix shapes are given so all products conform.
- [ ] Hyperparameters note how their value was chosen.
- [ ] Table ordering roughly follows first appearance in the text.
