# Discussion / Limitations / Future Work / Conclusion — Templates

> Scaffolds for the `discussion-conclusion` skill. Fill only with content traceable to the Results
> artifact and the permitted source set. Delete bracketed guidance before use. Grounded in general
> research-writing standards (`knowledge/principles/research-writing-principles.md`).
>
> Label each interpretive statement as one of: **[fact]** (verified from Results),
> **[interpretation]**, **[assumption]**, **[future]** (proposed work). Never leave a number here that
> you cannot trace to the Results artifact.

---

## 1. Discussion scaffold

Repeat the block below once per **key finding**. Interpret the "why" — do not re-describe the results
table.

### Finding <N>: <one-line statement of the finding, with the table/figure it comes from>

- **Expected?** [State yes/no. If expected, why? If unexpected, what could explain it? — the three
  questions.]
- **Mechanism (the "why"):** [Explain *why* this happened — e.g., why one method/condition outperformed
  another. Mark as [interpretation] unless the design directly establishes it.]
- **Bearing on RQ / hypothesis:** [Which research question (RQ id) or hypothesis does this support,
  refute, or leave open? Use the researcher's stated RQ/hypothesis verbatim; do not reword it.]
- **Correlation vs. causation check:** [State explicitly whether the design supports a causal claim.
  If not, phrase as association and list possible confounders.]
- **Conversation with prior research:** [Does this match or contradict <sourceId>? If it contradicts,
  is the difference due to method, dataset, or context? Use only permitted sources for this section;
  never invent a prior finding.]
- **Implication:** [Practical and/or theoretical implication, bounded by the evidence.]

> Sentence test before placing anything here: "Is this giving information, or giving an explanation?"
> Information belongs in Results; explanation belongs in Discussion.

---

## 2. Limitations table

Include a row **only** if it passes the relevance test: *"If this limitation did not exist, would my
result differ?"* If the honest answer is no, omit it. Never claim "no limitations." Keep the tone
neutral and professional.

| # | Limitation (what is bounded) | Type | Relevance test: would the result differ if removed? | Impact on the result/claim |
|---|------------------------------|------|------------------------------------------------------|----------------------------|
| L1 | [e.g., data from one city only] | dataset / method / computational / generalizability / evaluation | Yes — [why it would change the outcome] | [how much and in what direction it limits the conclusion] |
| L2 | [...] | [...] | Yes — [...] | [...] |
| L3 | [...] | [...] | Yes — [...] | [...] |

Rejected candidate limitations (failed the relevance test — kept here for your own record, not for the
manuscript):

- [e.g., "data collection started in January not February" — no expected effect on the result.]

---

## 3. Future Work — mapped from limitations

Each future-work item **must** trace to a limitation row above. Keep the 2–3 most important and
feasible; drop generic filler like "we will use AI" or "we will do better".

| Future direction (what study, specifically) | Addresses limitation | Why it matters / what it would resolve |
|----------------------------------------------|-----------------------|-----------------------------------------|
| [e.g., test on a multilingual dataset across 2–3 regions] | L1 | [removes the single-region generalizability bound] |
| [...] | L2 | [...] |

> Usefulness test: could a reader name their exact first next step from this? If not, make it more
> specific.

---

## 4. Conclusion — four-element skeleton

Hard rule: **no new information, result, or citation may appear for the first time in the Conclusion**
— everything must already be in Results/Discussion. Keep length ≤ roughly the Abstract. Answer the
research questions without overclaiming.

1. **Main finding** — [the single most important result, already reported, no new numbers].
2. **Contribution** — [restate the contribution(s) from the project config: novelty / empirical
   evidence / practical value].
3. **Answer to the research question(s)** — [directly answer each RQ id; do not claim beyond the
   evidence; if an RQ is only partially answered, say so].
4. **Takeaway** — [why this matters, bounded by the study scope].

Draft paragraph (weave the four elements into coherent prose; in CS/engineering a compact paragraph is
typical, in humanities/social science a fuller paragraph):

> [Finding] … [Contribution] … [RQ answer] … [Takeaway].

Self-check before finishing:
- [ ] No sentence introduces a result, claim, or citation not already in Results/Discussion.
- [ ] Each research question is answered (or its partial answer is stated honestly).
- [ ] No overclaiming; no superlatives the evidence does not support.
- [ ] Length ≤ roughly the Abstract.
