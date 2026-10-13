# Review Rubric

> Used by the `final-reviewer` skill and the `gobeshona validate` quality checks.
> Scores are **advisory signals**, never a guarantee of acceptance. Tags: **[auto]** = toolkit can
> check mechanically; **[human]** = requires author/domain-expert judgement.
> Built from general research-writing principles (see [`../principles/research-writing-principles.md`](../principles/research-writing-principles.md)).

## Scoring

Each dimension is scored on a 4-point scale and must record **evidence** (file/section pointers):

| Score | Meaning |
|-------|---------|
| 3 — Strong | Fully meets the standard with evidence. |
| 2 — Adequate | Meets the standard with minor gaps. |
| 1 — Weak | Partially meets; notable gaps to fix before submission. |
| 0 — Failing / blocking | Violates an integrity rule or is absent; must fix. |
| N/A | Not applicable to this study type (record why). |

A score of **0 on any Integrity dimension is blocking** regardless of other scores.

## Dimensions

### 1. Evidence traceability [human + auto]
- Every substantive claim maps to a source (paper, dataset, result file) via the source-to-section map.
- Section-level source assignments respected; no out-of-scope sources used.
- **Auto signals:** citations resolve both directions; results reference saved evidence files.

### 2. Citation integrity [human + auto] — *integrity dimension*
- No invented papers, authors, titles, DOIs, URLs, quotations, or results.
- Each reference verified or explicitly flagged unverifiable.
- A paper's own findings distinguished from claims later papers make about it.

### 3. Extraction accuracy [human] — *integrity dimension*
- Paper summaries faithfully represent the source; incomplete metadata is flagged, not guessed.
- Duplicate sources detected and merged/flagged.

### 4. Section consistency [human + auto]
- Abstract ↔ findings; methodology ↔ implementation; results ↔ saved evidence; conclusion ↔ RQs.
- Introduction's promises match Results/Discussion.
- Terminology consistent across sections.

### 5. Mathematical / methodological review [human]
- Notation defined; assumptions explicit; derivations checkable; dimensional consistency holds.
- Reproduced/adapted equations distinguished from new ones.
- For qualitative work: appropriate rigor (triangulation, member checking, positionality) instead.

### 6. Result provenance [human + auto] — *integrity dimension*
- Reported numbers trace to raw result files; unexecuted experiments marked unavailable.
- No favorable numbers invented; failed/negative results not concealed.
- Baselines comparable (same data/split/metric); causal claims justified by design.

### 7. Figure integrity [human + auto] — *integrity dimension*
- Every figure has provenance; quantitative figures come from reproducible code over verified data.
- No quantitative chart fabricated by an image model.
- Figures pass the stranger test; axes/units/legends/grayscale handled.

### 8. Completeness [auto]
- All venue-required sections present; declarations (funding, CoI, ethics, AI use) included.
- Limitations and Future Work present and non-trivial.

### 9. Overclaiming check [human] — *integrity dimension*
- No claim exceeds the evidence; conclusion answers RQs without inflation.
- No "best in the world"/exhaustive-coverage/accepted-for-publication claims.

### 10. Clarity & language [human]
- Funnel introduction; synthesis literature review; one idea per paragraph; consistent voice; trimmed wordiness.

## Output format for a review

The `final-reviewer` produces a report with, per dimension: score, evidence pointers, specific
findings, and required fixes — plus a top-level list of **blocking integrity issues** and a clearly
labelled "Which checks were automated vs. require human/domain-expert review" section.
