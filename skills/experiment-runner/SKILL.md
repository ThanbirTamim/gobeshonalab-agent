---
name: experiment-runner
description: >-
  Execute a project's experiments safely and reproducibly, or — when the environment, permissions, or
  resources do not permit execution — produce complete reproduction instructions and mark the results
  as UNAVAILABLE rather than fabricating them. Use this skill when `experiments.required` is true in
  the project config and a methodology/implementation already exists, or whenever a researcher asks to
  run, re-run, log, or reproduce an experiment. It captures commands, configs, library versions,
  random seeds, logs, and raw result files; enforces fair comparison (classic + recent baselines on
  the same dataset, split, and metric); and respects consent/IRB rules for any human-subjects data.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs:
    - knowledge/principles/research-writing-principles.md
    - knowledge/quality-framework/manuscript-checklist.md
---

# experiment-runner

## Purpose

Turn an approved methodology and implementation into **evidence**: actual, logged experiment runs
whose raw outputs can be traced back by later skills (`results-analyst`, `figure-planner`,
`final-reviewer`). The guiding standard is that an experimental setup must let another researcher
re-run the exact experiment (reproducibility), and that reporting mean and standard deviation over
multiple runs — not a single lucky number — shows stability. This skill is **optional**: it runs
only when the project config sets `experiments.required: true`.

A core promise of this skill: **if an experiment cannot run, it does not invent results.** It
delivers runnable instructions and marks the result status `unavailable`.

## When to use

- The project config has `experiments.required: true` and a methodology/implementation exists.
- A researcher asks to run, re-run, reproduce, or log an experiment.
- You need to regenerate raw result files that downstream analysis depends on.

Do **not** use this skill to analyze or interpret numbers — that is `results-analyst`'s job. Keep
Results factual and defer interpretation to Discussion.

## Inputs

- `research-project.yaml`/`.json` (see `config/research-project.schema.json`), especially the
  `experiments` block: `baselines` (each tagged `classic-simple` or `recent-sota`), `metrics`,
  `datasetSplit`, `randomSeeds`, `runs`, and `constraints`.
- The implementation produced by `implementation-engineer` (code + tests + dependency list).
- `datasets[]` entries with `path`, `license`, `permission`, `containsHumanSubjects`, `irbApproval`.
- The execution environment (which the skill must inspect, not assume).

## Outputs

- One experiment-log file per run under the project's working directory, using
  `templates/experiment-log-template.md`.
- Raw result files (metrics tables, prediction dumps, stdout/stderr logs) saved to a stable path and
  referenced by the log — never pasted inline as prose.
- A per-experiment status of `ran` or `unavailable`. For `unavailable`, a self-contained reproduction
  recipe (commands, config, environment, data access) so the researcher can run it later.

## Instructions

1. **Pre-flight safety and permissions.**
   - Work only inside the explicitly authorized project working directory; create an **isolated**
     run directory (e.g., `runs/<experiment-id>/<timestamp>/`). Never write outside it, delete user
     data, or touch unrelated projects.
   - Never auto-download and auto-execute untrusted code. If the implementation pulls remote code or
     data, surface it for explicit researcher approval first.
   - For any dataset with `containsHumanSubjects: true`, confirm `permission: authorized` and a
     recorded `irbApproval`/consent basis before running. If missing, stop and mark the experiment
     `unavailable` with reason `ethics-unverified` — informed consent and IRB approval are required
     for human/animal data. Respect dataset `license`/terms even for public data.

2. **Verify fair comparison before running.**
   - Confirm the config declares at least one `classic-simple` baseline and one `recent-sota`
     baseline; a claim without a baseline is empty, and you need both kinds.
   - Confirm every method (proposed + baselines) will run on the **same dataset, same train/test
     split, and same metric**. If not, stop and surface the mismatch as a gap — do not silently
     "fix" it by changing the researcher's design.
   - Confirm the metric suits the data (e.g., do not rely on accuracy alone for imbalanced classes;
     prefer Precision/Recall/F1/AUC); if the config's metric looks unsafe, flag it rather than
     substituting one.

3. **Capture the environment.** Record hardware (CPU/GPU/RAM), OS, language/runtime, library and
   framework **versions**, hyperparameters, the data split, the random seed(s), and the number of
   runs — the reproducibility recipe. Capture the code commit/hash if the implementation is
   version-controlled.

4. **Run with repetition.** Execute the configured number of `runs` with the declared
   `randomSeeds`. Save raw outputs per run; do not overwrite prior runs. Prefer deterministic seeds
   so others can reproduce the exact numbers.

5. **Log each run.** Fill in `templates/experiment-log-template.md` per run: run id, date, commit,
   environment/versions, seed, exact command, config snapshot, dataset + split, raw-results path,
   status, and notes. The log points to raw files; it does not restate numbers as prose.

6. **Aggregate honestly.** Report results as mean ± standard deviation over the runs, not a single
   value. Record **every** run, including failed or negative/null ones — a sound method that yields
   a negative result is still valuable, and unexpected results must be presented honestly, never
   hidden.

7. **Handle the cannot-run case.** If the environment, permissions, or resources do not permit
   execution (missing hardware, restricted data, unverified ethics, unavailable dependency):
   - Produce a complete, self-contained reproduction recipe (environment, install steps, exact
     commands, config, data-access instructions).
   - Set the experiment's status to `unavailable` with an explicit reason.
   - Do **not** estimate, simulate, or invent any numbers to fill the gap.

8. **Hand off.** Point `results-analyst` at the raw result files and logs. Ensure the manuscript will
   describe only the experiment that actually ran (or clearly state which results are unavailable).

## Quality gates

- Every run has a completed log entry referencing a raw-results file that exists on disk.
- Baselines include one `classic-simple` and one `recent-sota`, compared on identical data/split/metric.
- Environment, versions, seeds, and run count are all recorded (reproducibility recipe complete).
- Multiple runs are reported as mean ± standard deviation, not a single number.
- Human-subjects experiments have a recorded consent/IRB basis before any execution.
- Experiments that did not run are marked `unavailable` with a reason and a reproduction recipe.

## Anti-fabrication rules

- **Never invent, estimate, simulate, or round into existence any metric, number, or result.** If it
  did not run, the result is `unavailable`.
- Never conceal failed, negative, or unexpected runs; log them all honestly.
- Never change the researcher's declared design, baselines, dataset, split, or metric to make results
  look better — surface mismatches as gaps instead.
- Never run human/animal-subjects experiments without a verified consent/IRB basis.
- Never auto-execute untrusted downloaded code, write outside the authorized project directory, or
  delete/modify unrelated files.
- Keep Results factual; label aggregated figures as **verified facts** from raw files, and keep
  interpretation (assumptions, implications) out of this skill.

## References

- `knowledge/principles/research-writing-principles.md` — §4 Methodology (reproducibility recipe,
  data leakage, negative results), §5 Implementation and experiments (baselines, fair comparison,
  honest reporting), §8 Research integrity and ethics (IRB/consent, vulnerable populations).
- `knowledge/quality-framework/manuscript-checklist.md` — section E (Implementation & experiments).
- `templates/experiment-log-template.md` — per-run log template.
