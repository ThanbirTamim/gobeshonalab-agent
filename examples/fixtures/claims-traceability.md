# Scenario 3 — A source does not support the claim attributed to it

**Fixture type:** [HUMAN] judgement, supported by the `source-mapping` claims-traceability table.

## Setup

The draft introduction contains this sentence:

> "Rule-based filters achieve over 95% recall on modern phishing campaigns [smith2019rulebased]."

But `smith2019rulebased` (synthetic) actually reports that rule-based filters *miss* many new
patterns and reports recall around 60%.

## Expected toolkit behavior

`source-mapping` records the claim in the traceability table and marks support status explicitly:

| Claim | Section | Attributed source | Support status | Note |
|-------|---------|-------------------|----------------|------|
| Rule-based filters achieve >95% recall | introduction | smith2019rulebased | **UNSUPPORTED** | Source reports ~60% recall and emphasizes missed new patterns |

The toolkit must:
- **Not** fabricate support or quietly change the citation to a different paper.
- Surface the gap and ask the researcher to either (a) correct the claim to match the source,
  (b) cite a source that genuinely supports it (from the permitted set), or (c) remove the claim.

This is a **human-review** point: deciding whether a source supports a claim requires reading the
source. The toolkit enforces that the link is recorded and its status is honest.
