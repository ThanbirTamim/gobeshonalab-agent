# Scenario 11 — A researcher changes the hypothesis after drafting

**Fixture type:** [HUMAN] + [AUTOMATED] consistency re-check trigger.

## Setup

Midway through the project the researcher edits `research.hypothesis` in the config from:

> "RF within 2 F1 points of the CNN with ≥50% less compute"

to:

> "RF within 5 F1 points of the CNN with ≥50% less compute"

Earlier artifacts (introduction, abstract draft, methodology) were written against the original
hypothesis.

## Expected toolkit behavior

1. The change is treated as an **explicit, logged decision** (recorded in `project-status.md`),
   never a silent edit.
2. `final-reviewer` runs a **cross-section consistency re-check**: it looks for any section still
   stating the old 2-point threshold (introduction, abstract, discussion) and flags mismatches.
3. The toolkit does **not** auto-rewrite earlier sections; it reports which sections need the
   researcher's attention so the paper tells one consistent story.
4. If the change happened *after* seeing results, the reviewer additionally flags possible HARKing and
   asks the researcher to confirm the change is principled, not results-driven.

The structural trigger and mismatch list are automatable; judging whether the new hypothesis is
scientifically appropriate is a **human** decision.
