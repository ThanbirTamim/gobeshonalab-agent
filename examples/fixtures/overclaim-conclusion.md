# Scenario 10 — A conclusion claims more than the results establish

**Fixture type:** [HUMAN] judgement, supported by the `final-reviewer` overclaiming check.

## Setup

Results show the lightweight model is competitive **on one synthetic dataset under one split**. The
draft conclusion says:

> "Our method is the best phishing detector available and is ready for deployment in all major
> browsers."

## The overclaim

- "best … available" — not established; only two baselines on one dataset were compared.
- "ready for deployment in all major browsers" — no deployment study was run.
- Generalization to "all" campaigns/browsers exceeds a single-dataset result.

## Expected toolkit behavior

`final-reviewer` flags the Overclaiming dimension as failing (an **integrity dimension**, so it is
blocking) and requires the conclusion to be scaled to the evidence, e.g.:

> "On this dataset and split, the lightweight model matched a heavier baseline's F1 while using less
> inference compute. Deployment and multi-dataset generalization remain future work."

Deciding the precise acceptable wording is a **human** task; the toolkit enforces that claims do not
exceed evidence and that the conclusion introduces no new results or citations.
