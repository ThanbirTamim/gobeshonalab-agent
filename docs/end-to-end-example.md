# End-to-End Example

This walks through the synthetic `five-papers` project to show how the skills fit together. **The
numbers, papers, and DOIs in the fixture are synthetic** — they demonstrate the *workflow*, not a
real study. The toolkit never fabricates real research content.

Fixture: [`../examples/fixtures/five-papers/`](../examples/fixtures/five-papers/)

## 0. Validate the project config

```bash
npm run build
node dist/cli/index.js validate --config examples/fixtures/five-papers/research-project.json
```

Expected: `0 error(s)`. This confirms the research framing, the five sources, and the
source-to-section assignments are internally consistent before any writing begins.

## 1. Orchestrate (or run skills individually)

In your agent, point `research-paper-workflow` at the config. It will sequence the stages below,
skipping any that do not apply. Each skill can also be invoked on its own.

| Stage | Skill | What it produces | Honesty gate |
|-------|-------|------------------|--------------|
| Ingest | `paper-ingestion` | `paper-inventory.md` + per-paper summaries | flags incomplete metadata; detects duplicates; separates a paper's findings from its claims about others |
| Map | `source-mapping` | source-to-section matrix + claims-traceability table | enforces permitted sources; surfaces evidence gaps |
| Design | `research-design` | formal problem, RQs, (optional) hypothesis, contributions, gap | FNSS check; hypothesis only if confirmatory quantitative |
| Introduction | `introduction-writer` | funnel introduction ending in RQs + contributions | contributions must be genuinely new |
| Lit review | `literature-review` | synthesis grouped by theme + gap statement | no paper-by-paper list; no exhaustive-coverage claim without a documented search |
| Methodology | `methodology-designer` | methodology (here: computational) with reproducibility info | "how verified" not "what built"; leakage/seed/version checks |
| Implementation | `implementation-engineer` | spec + code + tests | inspect before change; isolated dir; no untrusted execution |
| Experiments | `experiment-runner` | run logs + `results/metrics.json` **or** results-unavailable + instructions | never fabricates numbers |
| Results | `results-analyst` | factual results from the saved metrics file | mean±sd; comparable baselines; no causal overclaim |
| Figures | `figure-planner` | `fig1` conceptual spec+prompt; `fig2` reproducible plot script | quantitative figure must read verified data |
| Discussion | `discussion-conclusion` | discussion, limitations, conclusion, future work | conclusion adds no new result; limitations relevant + impact |
| References | `reference-auditor` | citation/bibliography audit | both-direction resolution; unverifiable flagged |
| Assemble | `manuscript-assembler` | `manuscript.md` (or `.tex`) | abstract↔findings, methods↔code, results↔evidence |
| Review | `final-reviewer` | rubric scores + integrity & readiness reports | blocking integrity issues; auto-vs-human split |

## 2. The quantitative figure (reproducible, from verified data)

`fig2-f1-vs-cost` must be generated from the saved results, not drawn by hand or by an image model.
Use the template `skills/figure-planner/templates/plot-script-template.py`, pointing it at
`examples/fixtures/five-papers/results/metrics.json`. The script reads real values and plots F1 vs.
inference cost. (Install `matplotlib` yourself; it is an optional, free dependency.)

## 3. What the toolkit will NOT do

- It will not invent a sixth source or use one outside `sectionSources`.
- It will not report experiment numbers unless they come from a results file; if the environment
  can't run the experiment, `experiment-runner` marks results **unavailable** and emits run
  instructions.
- It will not let the conclusion claim "best detector" from a single-dataset comparison
  (see `../examples/fixtures/overclaim-conclusion.md`).
- It will not call the manuscript publication-ready; `final-reviewer` reports *signals and residual
  risks* only.

## 4. Try the failure scenarios

```bash
node dist/cli/index.js validate --config examples/fixtures/duplicate-paper/research-project.json
node dist/cli/index.js validate --config examples/fixtures/unsupported-figure/research-project.json
node dist/cli/index.js validate --config examples/fixtures/hypothesis-on-qualitative/research-project.json
```

See [`../examples/fixtures/README.md`](../examples/fixtures/README.md) for all twelve scenarios and
which checks are automated vs. human.
