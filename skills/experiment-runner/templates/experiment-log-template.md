# Experiment Log — `<experiment-id>` / Run `<run-number>`

> One log file per run. Fill in every field. This log **points to** raw result files; it must not
> restate metrics as prose. Copy this file to
> `runs/<experiment-id>/<timestamp>/experiment-log.md` for each run.
> Status must be one of: `ran` | `unavailable`.

## Identity

| Field | Value |
|-------|-------|
| Experiment ID | `<e.g. exp-phishing-rf>` |
| Run number | `<e.g. 3 of 5>` |
| Date / time (UTC) | `<YYYY-MM-DD HH:MM>` |
| Operator | `<who/what triggered the run>` |
| Code commit / hash | `<git sha or "uncommitted — describe">` |
| Status | `ran` \| `unavailable` |
| Reason (if unavailable) | `<missing-hardware \| restricted-data \| ethics-unverified \| missing-dependency \| other>` |

## Research framing (traceability)

| Field | Value |
|-------|-------|
| Research question(s) addressed | `<RQ ids from project config>` |
| Hypothesis under test (if any) | `<only for confirmatory quantitative work; else "n/a">` |
| Claim this run supports | `<one sentence>` |

## Environment (reproducibility recipe)

| Field | Value |
|-------|-------|
| Hardware (CPU / GPU / RAM) | `<e.g. Intel i5, no GPU, 16GB RAM>` |
| OS | `<e.g. Ubuntu 22.04>` |
| Language / runtime | `<e.g. Python 3.11>` |
| Key libraries + **versions** | `<e.g. scikit-learn 1.3.0, numpy 1.26.0>` |
| Random seed(s) | `<e.g. 42>` |
| Number of runs for this experiment | `<e.g. 5>` |

## Data

| Field | Value |
|-------|-------|
| Dataset ID / source | `<dataset id from config; public/private>` |
| Dataset size / classes / features | `<e.g. 20,000 URLs, 2 classes, 30 features>` |
| Train / val / test split | `<e.g. 70/15/15, split before scaling, entity-level if repeated samples>` |
| License / terms respected? | `<yes/no + note>` |
| Human/animal subjects? | `<yes/no>` |
| Consent / IRB basis (if human subjects) | `<approval id or "n/a"; required before any run>` |

## Fair-comparison check

| Method | Kind | Same dataset? | Same split? | Same metric? |
|--------|------|---------------|-------------|--------------|
| `<proposed method>` | proposed | ✓/✗ | ✓/✗ | ✓/✗ |
| `<classic baseline>` | classic-simple | ✓/✗ | ✓/✗ | ✓/✗ |
| `<recent baseline>` | recent-sota | ✓/✗ | ✓/✗ | ✓/✗ |

- Metric(s) used: `<e.g. F1, AUC>` — justification: `<why this metric fits the data>`
- Both a classic/simple and a recent/SOTA baseline present? `<yes/no>`

## Execution

~~~bash
# Exact command(s) run (verbatim, copy-pasteable):
<command here>
~~~

- Config snapshot path: `<runs/.../config.snapshot.yaml>`
- Working / isolated run directory: `<runs/<experiment-id>/<timestamp>/>`

## Raw results (pointers only — do not transcribe numbers here)

| Artifact | Path |
|----------|------|
| Metrics file | `<runs/.../metrics.json>` |
| Predictions / outputs | `<runs/.../predictions.csv>` |
| stdout log | `<runs/.../stdout.log>` |
| stderr log | `<runs/.../stderr.log>` |

- Aggregation across runs reported elsewhere as **mean ± standard deviation** (not a single value).

## If `unavailable`: reproduction recipe

Provide everything a researcher needs to run this later. Do **not** fabricate any result.

1. Environment setup: `<install steps, versions>`
2. Data access: `<how to obtain/authorize the dataset>`
3. Exact command(s): `<...>`
4. Expected artifacts: `<which files will be produced>`
5. Blocking reason detail: `<what specifically prevented execution>`

## Notes

- Failed / negative / unexpected outcomes (record honestly, never hide): `<...>`
- Deviations from the planned protocol and why: `<...>`
- Follow-up actions: `<...>`
