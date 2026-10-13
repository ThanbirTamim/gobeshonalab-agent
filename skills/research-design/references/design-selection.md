# Research Design Selection Guide

> Companion reference for the `research-design` skill. It maps a project's `researchType` to an
> appropriate research design, sampling strategy, and whether a hypothesis applies — and provides the
> FNSS (Feasible / Novel / Significant / Specific) checklist for vetting every research question.
>
> Built from general research-writing standards for research questions, gaps, hypotheses, and the
> quantitative/qualitative distinction (see `knowledge/principles/research-writing-principles.md`).
>
> This guide **informs** the researcher's choice; it never decides for them. The question drives the
> design — never reverse-engineer a question to fit a method.

## 1. FNSS checklist (apply to every research question)

For each research question, mark Yes/No and record a one-line justification:

| Quality | Question to ask | Yes/No | Note |
|---------|-----------------|--------|------|
| **Feasible** | Do I actually have the time, data, equipment, and permission to answer this within my budget? | | |
| **Novel** | Is the answer still genuinely unknown, not already well established? | | |
| **Significant** | Does answering it change a life, shape a policy, or fill a knowledge gap (including long-term/theoretical)? | | |
| **Specific** | Is it narrow and precise enough to be answerable? | | |

**Imbalance flags** (a common framing mistake) — raise explicitly when seen:
- *Significant but not Feasible* — important but impossible within the budget → narrow it.
- *Specific but not Significant* — answerable but matters to no one → broaden the "so what".
- *Novel but not Feasible* — new but no resources/data/permission to pursue → rescope.
- *Feasible + Specific but not Novel* — answer already well established → find a true gap first.

A good question balances **all four**; flag any question missing one or more.

## 2. researchType → design / sampling / hypothesis

| researchType | Typical design | Sampling | Hypothesis? |
|--------------|----------------|----------|-------------|
| `quantitative` (confirmatory) | Experiment, RCT, survey with statistical tests, benchmark comparison | Random sampling; larger samples for smaller effects | **Yes** — a testable claim to confirm/disconfirm |
| `quantitative` (exploratory/descriptive) | Descriptive/correlational analysis | Random or available sampling | Optional — often an open question instead |
| `qualitative` | Interviews, ethnography, grounded theory, thematic analysis | Purposive sampling; small (often 10-20), stop at **saturation** | **No** — use an open-ended research question |
| `mixed-methods` | Combined quant + qual phases (sequential/concurrent) | Both: random for the quant arm, purposive for the qual arm | Hypothesis for the quantitative arm only |
| `review` | Systematic/scoping/narrative review | Documented search strategy + inclusion/exclusion (see `literatureSearch`) | No — guided by review questions |
| `theoretical` | Formal modelling, derivation, proof | N/A (no empirical sample) | A conjecture/claim to prove, not a statistical hypothesis |
| `conceptual` | Framework/argument development | N/A | No — guiding questions |
| `computational` | Algorithm/system design + benchmark evaluation | Dataset splits (train/val/test); report seeds and runs | Often a performance claim tested against baselines |

**Rule:** set `research.hypothesis` to a concrete, testable statement **only** for confirmatory
quantitative work (and the quantitative arm of mixed-methods). For every other type, `hypothesis`
should be `null` with a one-line reason — forcing a hypothesis onto exploratory/qualitative work
damages the research.

## 3. From gap to question (the required chain)

Never jump from a gap straight to a method. Make the chain explicit:

```
Existing Knowledge → Existing Studies → Common Findings → Limitations / Missing Areas
    → Research Gap (knowledge gap, source-backed) → Research Question → Objectives → Design
```

- The **gap** must be a gap in knowledge grounded in cited sources from the permitted `sources` list
  — not "nobody built this product" and not a feeling of novelty from not having read enough.
- If no permitted source supports the gap, mark it **UNSUPPORTED-GAP** and resolve it (read more /
  adjust the claim) before locking the design.

## 4. Contributions check

Each claimed contribution must be a genuinely new thing, tagged as one of:
- **novelty** — a new method, feature, framework, or theory;
- **empirical-evidence** — new experimental proof or evidence in a new context;
- **practical-value** — solves a real-world problem (e.g., a deployable tool).

Reject "contributions" that merely describe work done ("We used dataset X"). Keep to ~3-4 focused
points. At least one must clearly fall into one of the three types above.

## 5. Scope vs budget sanity-check

Compare question ambition to `project.timeBudget`:
- A ~1-year (Master's) budget needs a question answerable in ~1 year.
- A ~4-5-year (PhD) budget can carry a larger question.

If the question cannot plausibly be answered in the available time/resources, **flag it for
narrowing** and record it as an open decision — do not silently shrink the researcher's question.

## 6. Ethics flag (defer detail downstream)

If the design involves human subjects, personal data, or sensitive contexts, record now that
informed consent, anonymization, and IRB/ethics approval will be required, and pass this to the
`experiment-runner` / `methodology-designer` skills.

## Worked micro-example (illustrative)

- **Curiosity:** "Does social media affect teenagers?" → too broad, not Specific.
- **Sharpened RQ:** "Among 14-17-year-olds in one city, how does daily time on platform P relate to a
  validated anxiety score?" → Specific, Feasible (survey), Novel (local gap), Significant (policy).
- **researchType:** quantitative (correlational, exploratory) → random sampling, hypothesis optional.
- **Contribution:** empirical-evidence (new local evidence on an under-studied population).
