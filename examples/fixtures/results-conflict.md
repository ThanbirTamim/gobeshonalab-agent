# Scenario 7 — Results conflict with the original hypothesis

**Fixture type:** [HUMAN] judgement, supported by `results-analyst` and `discussion-conclusion`.

## Setup

The hypothesis (five-papers project) states the lightweight Random Forest will land within 2 F1
points of the heavy CNN. Suppose the (synthetic) measured results instead show a 6-point F1 gap.

## Expected toolkit behavior

- `results-analyst` reports the **measured** numbers from the saved results file, including the gap —
  it never adjusts numbers toward the hypothesis.
- `discussion-conclusion` discusses the conflict honestly: the hypothesis was **not** supported at the
  pre-stated 2-point threshold; it explains possible reasons and keeps the negative/partial result.
- The hypothesis in the project config is **not** rewritten to match the data (that would be HARKing —
  hypothesizing after results are known). If the researcher wants to reframe, that is an explicit,
  logged decision, and the original hypothesis and its outcome remain on record.

The toolkit's job is to prevent silent reconciliation. Judging the scientific meaning of the conflict
is a **human** task.
