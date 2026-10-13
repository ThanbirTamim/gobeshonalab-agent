# Reproducibility Checklist

Fill this in while implementing. It captures everything another researcher needs to re-run the work
and everything `experiment-runner`, `manuscript-assembler`, and `final-reviewer` need to confirm the
write-up matches the code. Based on general methodology and reproducibility standards (methodology,
dataset, experimental setup) and the implementation safety rules in
`knowledge/principles/research-writing-principles.md` (section 5).

> Rule: every field is either filled with a concrete value or explicitly marked `GAP — <reason>`.
> Never leave a value blank and never invent one. Mark unbuilt components as `PROPOSED` (future work).

## 1. Scope gate

- [ ] `implementation.required` is `true` (if `false`, stop and record the skip reason below).
- Skip reason (if not required): ______________________________________________

## 2. Existing code inspected before change

| `existingCodePaths` entry | What it is / entry points | Tests present? | Build/run command | Changed? |
|---------------------------|---------------------------|----------------|-------------------|----------|
|                           |                           |                |                   |          |

- Summary of pre-existing behavior: __________________________________________

## 3. Environment

| Item | Value |
|------|-------|
| OS / version | |
| Hardware (CPU / GPU / RAM) | |
| Language + version | |
| Package manager | |
| Environment capture (venv / lockfile / container) | |
| Lockfile / manifest path | |

## 4. Dependencies (pin exact versions, not just names)

| Dependency | Exact version | Why needed | Fetched for human review (not auto-run)? |
|------------|---------------|------------|------------------------------------------|
|            |               |            |                                          |

> Never auto-execute untrusted downloaded code. List anything that must be fetched and installed by
> a human here instead of running it inside the skill.

## 5. Data provenance and permissions

| Dataset id | Source (public/private) | Local path | License / terms | Permission (`authorized`?) | License matches intended use? |
|------------|-------------------------|-----------|-----------------|----------------------------|-------------------------------|
|            |                         |           |                 |                            |                               |

- Dataset size / #features / #classes: _______________________________________
- Inclusion / exclusion criteria: ____________________________________________

## 6. Preprocessing (document every decision — each can change results)

- Missing values: ____________________________________________________________
- Scaling / normalization (fit on train only): _______________________________
- Categorical encoding: ______________________________________________________
- Outlier handling: __________________________________________________________
- (Qualitative) transcription / cleaning / anonymization: ____________________

## 7. Data split and leakage prevention

- Split ratio (train/val/test): ______________________________________________
- Split performed **before** any scaling? [ ] yes
- Entity-level split where samples repeat (e.g., per-patient, per-user)? [ ] yes / [ ] n/a
- Leakage review notes: ______________________________________________________

## 8. Parameters / hyperparameters (value + how chosen)

| Parameter | Value | How chosen (grid search / manual / default) |
|-----------|-------|---------------------------------------------|
|           |       |                                             |

- Assumptions this configuration relies on: __________________________________

## 9. Determinism and runs

- Random seed(s): ____________________________________________________________
- Seeds threaded through all stochastic steps? [ ] yes
- Number of runs (report mean ± std, not a single result): ___________________

## 10. Run commands (copy-paste reproducible)

```
# setup
# run
# test
```

## 11. Tests added

| Test file | What it verifies | Type (unit / shape-contract / seed-determinism) |
|-----------|------------------|-------------------------------------------------|
|           |                  |                                                 |

> Tests assert behavior and interfaces, never fabricated result values.

## 12. Code-vs-manuscript fidelity note

- What the code **does** (built): ____________________________________________
- What is **not** built (PROPOSED / future work): ____________________________
- Known gaps / underspecified methodology steps surfaced to the researcher: ___

## 13. Handoff

- [ ] Handed off to `experiment-runner` (which decides whether execution is possible).
- [ ] If execution is not possible, implementation + run instructions delivered and results marked
      **unavailable** (never fabricated).
