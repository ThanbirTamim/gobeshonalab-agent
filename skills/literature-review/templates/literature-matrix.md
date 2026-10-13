# Literature Matrix & Synthesis Scaffold

Working tool for the `literature-review` skill. The matrix organizes your reading **before** you
write; the synthesis scaffold turns it into prose. **Never paste the matrix itself into the
manuscript** — convert it into theme-grouped synthesis paragraphs (a good review is synthesis, not a
list).

---

## 1. Literature Matrix

One row per permitted source (only sources listed in the project config's `sectionSources` for the
review). Use the source `id` from the config. Mark any unknown or incomplete field as `UNKNOWN` —
do not guess. In the **Finding** column, record what *that* paper found; if the row captures what a
*later* paper claims about this one, note it in **Notes** as a claim, not a finding.

| Source `id` | Method / Approach | Dataset / Context | Finding (this paper's own) | Limitation | Theme/Cluster | Verif. status | Notes (claims-about, conflicts) |
|-------------|-------------------|-------------------|-----------------------------|------------|---------------|---------------|---------------------------------|
| `example2021` | e.g. rule-based filter | e.g. 10k URLs, English web | e.g. 92% precision, misses new patterns | e.g. no novel-attack coverage | A: rule-based | verified / unverified / unverifiable | e.g. later2023 disputes the precision claim |
| | | | | | | | |
| | | | | | | | |

**Instructions**
- Fill one row per permitted source; add rows as needed.
- Assign each row to a theme/cluster label (A, B, C …) — aim for 2–4 clusters, grouped by method or topic.
- Keep provenance strict: findings belong to the paper that produced them; claims-about go in Notes.
- Preserve conflicts explicitly (e.g., "A reports X, B reports not-X") — never average them away.

---

## 2. Cluster Summary (bridge from matrix to prose)

For each theme/cluster, note the shared idea and the disagreement, before drafting the paragraph.

| Cluster | Papers (ids) | What they share | Where they disagree / fall short |
|---------|--------------|-----------------|----------------------------------|
| A | | | |
| B | | | |
| C | | | |

---

## 3. Synthesis Paragraph Scaffold (one per cluster)

Write flowing prose, not a list. Suggested shape for each cluster paragraph:

> **[Topic sentence naming the cluster.]** A line of work has approached <problem> via <shared
> method/idea> [`id1`, `id2`]. These studies agree that <shared finding>, and are strongest at
> <strength>. However, they share <limitation / disagreement>: <specifics, citing the ids>. Where
> findings conflict, state both: <`idA` reports X, while `idB` reports not-X>, which remains
> unresolved because <reason>.

Repeat for each cluster. Then add a short bridging paragraph that compares the clusters against each
other and sets up the gap.

---

## 4. Research-Gap Statement

Derive the gap from the limitations/missing areas across clusters. Fill every field.

- **Gap statement (knowledge gap, not "nobody built this"):**
- **Gap type (choose exactly one):** missing-knowledge · inconsistent-findings ·
  methodological-limitation · unexplored-domain · missing-comparison · scalability · robustness ·
  reproducibility · practical-deployment
- **Supporting sources (ids that evidence the gap):**
- **Why it matters (one sentence):**
- **Links to research question (one sentence connecting the gap to an RQ id):**

**Gap checklist**:
- [ ] The gap comes from literature evidence, not a guess.
- [ ] It fits exactly one defined gap type.
- [ ] "Nobody built this" is not presented as the sole justification.
- [ ] The gap explains why it matters.
- [ ] A declared config gap (`research.researchGap`), if any, is consistent — discrepancies surfaced.

---

## 5. Coverage Note

- **Databases searched:**
- **Query terms:**
- **Date range:**
- **Inclusion / exclusion criteria:**
- **Comprehensive coverage claimed?** yes / no — if yes, the four fields above **must** be filled.
  If they are not, downgrade the wording to "selected literature" and flag it.

---

## 6. Gap / Limitations Log

List any claim the synthesis needed but no permitted source supported. Surface these; do **not**
fabricate support or add out-of-scope sources.

| Needed claim | Why no support | Suggested resolution (researcher decides) |
|--------------|----------------|--------------------------------------------|
| | | |
