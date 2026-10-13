---
name: discussion-conclusion
description: >-
  Draft the Discussion, Limitations, Conclusion, and Future Work sections of a scientific manuscript
  from already-reported results. Use this after the Results section exists (see results-analyst) and
  before final assembly, whenever a researcher needs to interpret findings, state honest limitations,
  plan future work, or write a conclusion. It interprets the "why" behind results, connects them to
  prior literature, keeps correlation separate from causation, writes relevant limitations paired with
  impact, derives future work from stated limitations, and produces a conclusion that answers the
  research questions with no new information and no overclaiming.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs:
    - knowledge/principles/research-writing-principles.md
    - knowledge/quality-framework/manuscript-checklist.md
---

# discussion-conclusion

## Purpose

Turn reported results into meaning. This skill produces four tightly linked sections — Discussion,
Limitations, Future Work, and Conclusion — each governed by the honesty principle and the clean
separation of "what happened" (Results) from "what it means" (Discussion).

The guiding distinction: Results reports facts, Discussion explains the "why," Limitations admits the
boundaries, Future Work turns those boundaries into concrete next studies, and Conclusion restates
the essence with nothing new.

## When to use

- The Results section (or equivalent qualitative findings) already exists and is evidence-backed.
- A researcher asks to interpret findings, write limitations, plan future work, or draft a conclusion.
- A review flags that the Discussion merely repeats the results table, overclaims, or hides limits.

## Inputs

- The project config (`config/research-project.schema.json`) — especially `research.researchQuestions`,
  `research.hypothesis` (may be null), `research.contributions`, and declared `limitations`.
- The finalized Results artifact (tables, metrics, qualitative findings) from `results-analyst`.
- The permitted source set and the source-to-section map (for the "conversation with prior research").

## Outputs

- A Discussion section that explains the mechanism behind each key finding, states whether it supports
  the hypothesis/research question, and relates it to prior work (match or contradiction).
- A Limitations section: only relevant limits, each paired with an impact statement, in neutral tone.
- A Future Work section: 2–3 prioritized, specific directions, each traceable to a stated limitation.
- A Conclusion built from the four elements (finding, contribution, RQ answer, takeaway) with no new
  information, result, or citation.
- A note of any gaps where interpretation is unsupported by the available evidence.

## Instructions

1. **Load the evidence.** Read the Results artifact and the project config. List each key finding and
   the research question(s)/hypothesis it bears on. Do not restate numbers you cannot trace to the
   Results artifact; if a number is missing, surface the gap instead of inventing it.
2. **Draft the Discussion ("why", not "what").** For each key finding, answer three questions: "Was
   this expected?", "If expected, why?", "If unexpected, what could explain it?". Explain the
   mechanism (e.g., why one method beat another) rather than re-describing the results table —
   repetition is the most common Discussion mistake.
3. **Guard correlation vs. causation.** Never state or imply causation that the study design does not
   support; flag possible confounders explicitly. Mark each interpretive sentence as a *verified
   fact*, an *interpretation*, or an *assumption*.
4. **Hold a conversation with prior research.** For each key finding, say whether it supports or
   contradicts earlier work (using only the permitted sources for this section), and if it
   contradicts, discuss whether method, dataset, or context differences explain it. Never invent a
   source or a prior finding.
5. **Write Limitations with the relevance test.** For each candidate limit ask: "If this limit did not
   exist, would my result differ?" Keep it only if yes. Classify it (dataset, method, computational,
   generalizability, evaluation) and pair it with an explicit impact statement. Use the template's
   limitations table. Never claim "no limitations." Keep tone neutral — avoid "unfortunately, we
   failed."
6. **Derive Future Work from limitations.** Map each future direction back to a specific limitation
   from step 5; drop any direction that is not tied to a real limitation. Keep the 2–3 most important
   and feasible, each stating what, why, and from which limitation.
7. **Write the Conclusion with the four-element skeleton.** Compose finding → contribution →
   research-question answer → takeaway. Enforce the hard rule: no new information, result, or citation
   may appear for the first time here. Keep length ≤ roughly the Abstract. Answer the research
   questions without overclaiming.
8. **Final consistency pass.** Confirm the Discussion does not leak into Results-style restatement,
   the Conclusion introduces nothing new, and every claim stays within what the evidence establishes.

## Quality gates

- Discussion explains the "why" of each key finding without repeating the results table.
- Correlation and causation are kept clearly separate; confounders are flagged.
- Findings are connected to prior literature (support or contradiction) using only permitted sources.
- Limitations are relevant (pass the "would the result differ?" test), each paired with impact, in
  neutral tone; "no limitations" is never claimed.
- Future Work is specific and each item traces to a stated limitation; 2–3 prioritized directions.
- Conclusion contains no new information/result/citation, follows the four-element structure, and is
  ≤ roughly the Abstract in length.

## Anti-fabrication rules

- Never invent results, numbers, mechanisms, confounders, prior findings, or citations; use only the
  Results artifact and the permitted source set.
- Never introduce a new result or citation in the Conclusion.
- Never upgrade correlation to causation beyond what the design supports.
- Never silently drop or soften an inconvenient result; report unexpected results honestly.
- Keep the researcher's hypothesis and research questions as given; do not restate them to fit the
  results. Where interpretation is unsupported by evidence, surface the gap.
- Label every interpretive statement as verified fact, interpretation, assumption, or proposed/future
  work.

## References

- `knowledge/principles/research-writing-principles.md` — results-vs-interpretation,
  correlation/causation, limitations, future work, and conclusion standards.
- `knowledge/quality-framework/manuscript-checklist.md` — sections F and G.
- `skills/discussion-conclusion/templates/discussion-template.md` — scaffolds for all four sections.
