# Scenario 5 — Methodology contains an inconsistent equation

**Fixture type:** [HUMAN] mathematical review, supported by the `methodology-designer`
dimensional-consistency checklist (`skills/methodology-designer/references/math-methodology-guide.md`).

## Setup

The draft methodology defines a loss combining a cross-entropy term and an L2 penalty:

> L = CE(y, ŷ) + λ · ‖w‖

with the symbol table declaring `λ` as a dimensionless scalar and `‖w‖` as the L2 **norm** of the
weight vector, while the surrounding text calls the penalty the "squared L2 regularizer".

## The inconsistency

The text says *squared* L2 (`‖w‖²`) but the equation uses the un-squared norm (`‖w‖`). The two are
not interchangeable: the gradient and units differ. A reader cannot reproduce the method because the
objective is ambiguous.

## Expected toolkit behavior

`methodology-designer`'s dimensional-consistency / notation checklist flags:
- Mismatch between the prose ("squared L2") and the equation (`‖w‖`).
- Requirement that every symbol in the equation appears in the notation table with consistent form.

The toolkit must **not** silently "fix" the math by guessing which form was intended. It reports the
inconsistency and asks the researcher to make the equation and text agree. Verifying mathematical
correctness is a **human/domain-expert** responsibility; the toolkit provides the structured check.
