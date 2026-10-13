# End-to-End Evaluation Fixtures

These synthetic, openly-licensed fixtures exercise the toolkit against twelve scenarios with known
expected behavior. **All papers, authors, DOIs, datasets, and numbers here are synthetic and for
testing only** — they are not real research artifacts.

Each scenario states the expected behavior and whether the check is **[AUTOMATED]** (enforced by
`gobeshona validate` / the test suite) or **[HUMAN]** (requires author or domain-expert review,
guided by the relevant skill and the review rubric).

| # | Scenario | Fixture | Expected behavior | Check type |
|---|----------|---------|-------------------|------------|
| 1 | Five papers assigned to different sections | `five-papers/` | Config validates with no errors; source-to-section matrix built; each section only draws on its assigned sources | [AUTOMATED] config valid + [HUMAN] synthesis quality |
| 2 | A supplied paper has incomplete metadata | `incomplete-metadata/` (`incomplete2021`) | Flagged: incomplete metadata cannot be "verified"; `paper-ingestion` records the gap instead of guessing | [AUTOMATED] warning |
| 3 | A source does not support the claim attributed to it | `claims-traceability.md` | `source-mapping` records the claim→source link as UNSUPPORTED and surfaces the gap; no fabricated support | [HUMAN] (claim support is a judgement) + [AUTOMATED] matrix completeness |
| 4 | A reference cannot be verified | `incomplete-metadata/` (`unverifiable2019`) | Reference marked `unverifiable`; `reference-auditor` flags it; never silently treated as verified | [AUTOMATED] status surfaced + [HUMAN] verification attempt |
| 5 | Methodology contains an inconsistent equation | `inconsistent-equation.md` | `methodology-designer` dimensional-consistency check flags the mismatch; equation not accepted as-is | [HUMAN] (math review) — toolkit provides the checklist |
| 6 | A requested experiment cannot execute | `five-papers/` with no runtime | `experiment-runner` produces runnable instructions and marks results **unavailable**; no fabricated numbers | [HUMAN] execution + [AUTOMATED] unavailable-marking convention |
| 7 | Results conflict with the original hypothesis | `results-conflict.md` | Conflict reported honestly in Results/Discussion; hypothesis not quietly rewritten; negative result preserved | [HUMAN] |
| 8 | A figure contains unsupported data | `unsupported-figure/` (`fig1-effect`) | Quantitative figure without `dataSource` flagged; `figure-planner` refuses to fabricate chart data | [AUTOMATED] warning |
| 9 | The same paper is accidentally duplicated | `duplicate-paper/` (`doe2020` x2) | Duplicate source id raised as an **error**; `paper-ingestion` flags duplicate | [AUTOMATED] error |
| 10 | A conclusion claims more than the results establish | `overclaim-conclusion.md` | `final-reviewer` overclaiming check flags the gap; conclusion must be scaled back to the evidence | [HUMAN] |
| 11 | A researcher changes the hypothesis after drafting | `hypothesis-change.md` | Change is explicit and logged; `final-reviewer` triggers a cross-section consistency re-check; earlier artifacts are not silently rewritten | [HUMAN] + [AUTOMATED] consistency re-check trigger |
| 12 | A qualitative study needs no code or math | `qualitative-study/` | Config validates; no false "missing hypothesis/experiments" warnings; qualitative rigor standards apply instead | [AUTOMATED] no false positives + [HUMAN] rigor review |

Bonus fixture: `hypothesis-on-qualitative/` — a qualitative study that incorrectly declares a
confirmatory hypothesis; the validator emits a warning (the hypothesis-vs-research-question rule).

## Running the automated checks

```bash
npm run build
node dist/cli/index.js validate --config examples/fixtures/five-papers/research-project.json
npm test   # runs the full fixture-backed test suite
```

Automated coverage asserts: config validity (scenario 1, 12), warnings (2, 4, 8, hypothesis-on-qualitative),
errors (9), and unknown-source detection (8's `ghost2099`). Scenarios 3, 5, 7, 10, 11 are documented
human/domain-expert review points — the toolkit supplies the structure and checklists but does not
pretend to automate scientific judgement.
