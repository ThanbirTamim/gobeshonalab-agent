# Mathematical Methodology Guide

> Supporting reference for the `methodology-designer` skill. The formalism requirements below apply
> on top of the general standard (see `knowledge/principles/research-writing-principles.md` §4) that
> methodology must describe *how a study was verified* and be reproducible. Do not add mathematics
> merely to look sophisticated.

## 1. When to use mathematics (and when not to)

Add formal mathematics only when it does real work for the reader. Use this decision aid:

| Situation | Use math? |
|-----------|-----------|
| You define a new objective, estimator, model, or algorithm | Yes — define it precisely. |
| You make a theoretical claim (bound, convergence, complexity) | Yes — state assumptions and derive it. |
| A standard, well-known procedure is used unchanged | Cite it; a formula is optional, not required. |
| The study is qualitative, descriptive, or interpretive | No — use qualitative rigor instead. |
| An equation would only restate prose already clear in words | No — it is decoration; remove it. |

Rule of thumb: if deleting an equation loses no precision the reader needs, it should not be there.

## 2. Required blocks for a mathematical methodology

1. **Formal problem definition.** State inputs, outputs, the space they live in, and the goal
   (e.g., "given x ∈ ℝ^d, predict y ∈ {0,1} minimizing expected 0–1 loss").
2. **Notation / symbol table.** Fill `templates/notation-table.md`; every symbol used later must be
   defined there once, with its type/domain and units (if any).
3. **Explicit assumptions.** List modelling and statistical assumptions (e.g., i.i.d. samples,
   normality, linearity, independence) and tie them to the Limitations section.
4. **Objective function(s) and constraints.** Write what is minimized/maximized and subject to what.
5. **Algorithm / pseudocode.** Give numbered steps with inputs, outputs, and stopping conditions.
6. **Complexity analysis.** State time and space complexity in Big-O with the governing parameters.
7. **Parameter definitions.** Define every hyperparameter/parameter and how its value was chosen.
8. **Equation provenance labels.** Mark each equation (see §4).

## 3. Dimensional-consistency check (run on every equation)

For each equation, verify both sides are consistent before it ships:

- [ ] **Units match on both sides.** The left-hand quantity has the same physical/measurement units
      as the right-hand expression (e.g., do not equate a rate [1/s] with a count).
- [ ] **Dimensions of each term in a sum match.** You may only add/subtract quantities of the same
      dimension; flag any sum mixing, e.g., a length and an area.
- [ ] **Arguments of transcendental functions are dimensionless** (exp, log, sin, softmax inputs,
      etc.). Flag `exp(t)` where `t` has units; it should be `exp(t/τ)`.
- [ ] **Probabilities/proportions lie in [0,1]** and are dimensionless; losses/metrics have the
      stated units or are explicitly dimensionless.
- [ ] **Matrix/vector shapes conform.** For every product, inner dimensions agree; state shapes in
      the notation table (e.g., W ∈ ℝ^{m×n}, x ∈ ℝ^n ⇒ Wx ∈ ℝ^m).
- [ ] **Indices and summation ranges are defined** and consistent (no free index appears on only one
      side; summation bounds exist for every Σ/∏).
- [ ] **Normalization is accounted for** (e.g., a mean divides by N; a softmax denominator sums over
      the correct axis).
- [ ] **Special cases are sane.** Check a boundary value (zero, one, identity) and confirm the
      equation reduces to the expected result.

Record the outcome per equation as: `consistent`, or `inconsistent: <reason>` (surface the latter to
the researcher as a blocking gap — do not silently patch the math).

## 4. Equation provenance rules

Every equation must carry exactly one provenance label:

- **Reproduced** — copied unchanged from a prior work. Cite the source (a `sourceId` from the
  project's permitted source set) and keep the original notation or map it in the notation table.
- **Adapted** — based on prior work but modified (different notation, added term, restricted case).
  Cite the source and state what changed and why.
- **New** — a genuinely original derivation in this study. Provide the derivation steps so a reader
  can check it; do not label something "new" that merely restates a standard result.

Never attribute an equation to a source that does not contain it, and never present a reproduced or
adapted equation as new. If provenance is unknown, mark it `provenance-unknown` and flag it for the
researcher rather than guessing a citation.

## 5. Honest-scope reminders

- Distinguish what was **verified** (derived/tested), what is **assumed**, what is **interpretation**,
  and what is **proposed/future work**.
- A sound methodology that could yield a negative/null result and still be trusted is stronger than
  one tuned toward a desired answer.
