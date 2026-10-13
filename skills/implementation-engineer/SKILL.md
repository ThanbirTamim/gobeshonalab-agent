---
name: implementation-engineer
description: >-
  Translate an approved research methodology into a concrete technical specification and a working,
  tested implementation — only when the project configuration enables it (implementation.required:
  true). Use this skill after methodology-designer has produced an approved method and before
  experiment-runner, whenever a computational study needs code. It inspects any existing code before
  changing it, documents dependencies/runtime/datasets/hardware, writes code with appropriate tests
  in an isolated project directory, avoids destructive operations, never auto-executes untrusted
  downloaded code, and keeps the manuscript description faithful to the code that actually exists.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs:
    - knowledge/principles/research-writing-principles.md
    - config/research-project.schema.json
---

# implementation-engineer

## Purpose

Turn the approved methodology into (1) a precise technical specification and (2) a working, tested
implementation that a later researcher can reproduce. Implementation is **optional**: it runs only
when the project configuration sets `implementation.required: true`. The engine of trust is
transparency and reproducibility: a methodology should read like a recipe, where exact steps let
anyone reproduce the result.

This skill produces code and a spec; it does **not** run experiments or report measured results.
Executing the implementation and capturing evidence belongs to `experiment-runner`.

## When to use

- After `methodology-designer` has an approved method and `implementation.required` is `true`.
- When a computational/quantitative study needs an algorithm, model, or pipeline built or extended.
- When existing code (`implementation.existingCodePaths`) must be inspected, understood, or modified.
- **Do not** use for conceptual, theoretical, qualitative, or review studies with no code need; skip
  and record the skip reason.

## Inputs

- The validated `research-project.yaml`/`.json` (see `config/research-project.schema.json`),
  especially the `implementation` block: `required`, `existingCodePaths`, `language`,
  `dependencies`, `hardware`, `runtimeNotes`.
- The approved methodology artifact (algorithm/model/pipeline, parameters, assumptions, data split).
- Dataset entries (paths, licenses, permissions) and any `experiments` design (metrics, baselines,
  seeds, runs) needed to shape interfaces — not to run them here.

## Outputs

- A **technical specification** mapping each methodology step to a concrete module/function, inputs,
  outputs, parameters (with values and how they were chosen), and assumptions.
- **Source code** in an isolated project directory, implementing the spec with clear structure.
- **Tests** appropriate to the code (unit tests for core logic, data-contract/shape tests, and
  deterministic seed checks where relevant).
- A completed **reproducibility checklist** (`references/reproducibility-checklist.md`) recording
  dependencies, exact versions, environment capture, random seeds, data provenance, and run commands.
- A short **code-vs-manuscript fidelity note** stating what was built so later sections cannot
  overstate it.

## Instructions

1. **Confirm scope.** Read `implementation.required`. If `false` or absent, stop and record that
   implementation was skipped and why; do not write code.
2. **Inspect before changing.** For every path in `implementation.existingCodePaths`, read and
   summarize what already exists (entry points, interfaces, tests, build/run commands) before
   creating or modifying anything. Never assume; never overwrite blindly.
3. **Write the technical specification.** Translate each approved methodology step into a module or
   function with explicit inputs/outputs, parameters (record every value and how it was chosen —
   grid search, manual tuning, or default), and the assumptions it relies on. Flag any step the
   methodology leaves underspecified as a GAP for the researcher rather than inventing behavior.
4. **Pin the environment.** Document hardware, OS, language, and library/framework **versions** (not
   just names), plus the environment capture method (lockfile/venv/container). Reproducibility
   requires exact versions and seeds, or others may not be able to reproduce the result.
5. **Implement in isolation.** Create or extend code only inside the authorized project directory.
   Do not modify unrelated projects, delete user data, or read files outside the explicitly
   authorized inputs.
6. **Honor data provenance and licenses.** Use only datasets listed with `permission: authorized`.
   Record each dataset's source, license/terms, and whether its license matches the intended use.
   Keep data split and leakage-prevention from the methodology intact (split first; fit scaling only
   on train; split at the entity level).
7. **Make it deterministic where possible.** Thread the configured `experiments.randomSeeds` through
   the code so runs are repeatable; expose the number of runs the methodology specified.
8. **Write tests.** Add unit tests for core logic, shape/contract tests for data flow, and a
   seed-determinism test where applicable. Tests assert behavior and interfaces, not fabricated
   result values.
9. **Never auto-execute untrusted code.** Do not download and run third-party code automatically.
   If a dependency must be fetched, record it for explicit human review and installation; do not
   execute it as part of this skill.
10. **Record the fidelity note.** State plainly what the code does and does not do, so
    `manuscript-assembler` and `final-reviewer` can confirm the write-up matches reality. Mark any
    planned-but-unbuilt component as proposed/future work, not as implemented.
11. **Complete the reproducibility checklist** in `references/reproducibility-checklist.md` and hand
    off to `experiment-runner` (which decides whether execution is possible).

## Quality gates

- Implementation runs only when `implementation.required: true`; otherwise the skip is logged.
- Existing code was inspected and summarized before any change.
- Every parameter has a value and a stated reason; every assumption is written down.
- Dependencies and library **versions** are pinned; environment capture is documented.
- Random seeds and run count are wired through for reproducibility.
- Tests exist and target real behavior/interfaces, not invented numbers.
- The code-vs-manuscript fidelity note exists and distinguishes built vs. proposed work.

## Anti-fabrication rules

- Never fabricate code behavior, results, metrics, logs, or dataset contents.
- Never claim a component is implemented when it is only planned — label it proposed/future work.
- Never invent dataset provenance or ignore a license mismatch; surface it as a GAP.
- Never execute untrusted downloaded code, touch unrelated projects, or access files beyond the
  authorized project inputs.
- Where the methodology is underspecified, raise a GAP for the researcher instead of guessing.
- Keep the researcher's methodology, parameters, and permitted data authoritative; do not silently
  change them.

## References

- `knowledge/principles/research-writing-principles.md` — section 4 (methodology, dataset,
  preprocessing, data leakage, sample size, reproducibility) and section 5 (implementation and
  experiments, including the safety rules).
- `config/research-project.schema.json` — the `implementation`, `datasets`, and `experiments` blocks.
- `references/reproducibility-checklist.md` — the fill-in checklist this skill completes.
