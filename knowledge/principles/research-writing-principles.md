# Research-Writing Principles

A statement of general, widely-accepted principles for evidence-based academic writing and
reproducible research. These are standard research-methods norms expressed in the project's own
words. They are discipline-neutral unless a section says otherwise, and they apply to conceptual,
theoretical, qualitative, quantitative, mixed-methods, review, and computational work.

Each skill references the relevant section below rather than restating it.

---

## 1. The honesty principle (foundational)

- A paper is a record of what was actually done and found — not a sales pitch. State the question,
  the method, the findings (including negative or inconclusive ones), and the limits.
- Every claim must be supported by the evidence presented. Never let a claim exceed its proof.
- Prefer precise, checkable statements ("improved F1 over baseline X on dataset Y") to superlatives
  ("state of the art", "best available").
- Keep a clear line between what is *verified*, what is *interpretation*, what is *assumption*, and
  what is *proposed/future work*. Every generated artifact should make this distinction explicit.

## 2. Research questions, hypotheses, and design

- Turn a broad interest into a question that is **feasible, novel, significant, and specific**, and
  balance all four rather than maximizing one.
- A **research gap** is a gap in *knowledge* established by reading the literature — not "no one has
  built this exact tool" and not a hunch of novelty.
- Use a **testable hypothesis** only for confirmatory quantitative/computational work. Use an
  **open-ended question** for exploratory or qualitative work. The nature of the question decides;
  do not force a hypothesis onto every study.
- Choose the research design to fit the question. Never reverse-engineer a question to fit a method
  you already wanted to use.
- The researcher owns the question, hypothesis, objectives, and contributions. Tools must never
  silently invent or change them; refinement is an explicit, logged, researcher-approved step.

## 3. Introduction and literature review

- Structure the Introduction as a funnel: broad context → specific problem → why it matters →
  existing approaches → what is missing → what this paper does → research questions → contributions.
- End the Introduction with explicit research questions/objectives and a clear statement of
  contributions (bullets are common in engineering/CS; prose is fine in the humanities).
- A literature review is a **synthesis grouped by theme or method**, not a paper-by-paper list.
  Building a comparison matrix (paper, method, data/context, finding, limitation) while reading makes
  synthesis easier — but the matrix is a thinking tool, not the prose you paste into the paper.
- Each contribution should be genuinely new along at least one axis — novelty, empirical evidence, or
  practical value — and not merely a description of work performed. Keep to a few focused points.
- Never claim exhaustive or comprehensive coverage of a literature without a documented search
  strategy and scope (databases, query terms, inclusion/exclusion criteria, date range).

## 4. Methodology (quantitative, qualitative, mixed, computational)

- Methodology describes **how the result was verified** (data, split, baseline, metric, number of
  runs), not merely what was built. Screenshots and feature lists are not methodology.
- Document assumptions, every preprocessing step, data source/size/features, and the
  train/validation/test split. State and justify each important parameter.
- Prevent data leakage: split before fitting any scaling/encoding; split at the entity level (e.g.,
  per patient/user) when samples repeat.
- Justify sample size with method-appropriate logic — power analysis for confirmatory quantitative
  work, saturation for qualitative work, and a size-vs-complexity argument for machine learning.
- Provide full reproducibility information: hardware, software/library versions, hyperparameters,
  split, random seeds, and number of runs. Report central tendency **and** spread (e.g., mean ±
  standard deviation) over multiple runs rather than a single number.
- For qualitative work, use the appropriate rigor tools instead of equations: triangulation, member
  checking, thick description, and an explicit statement of researcher positionality. For
  quantitative work, address internal, external, and construct validity.
- **Mathematical methodology, only where the discipline warrants it:** a formal problem definition, a
  notation/symbol table, explicit assumptions, objective functions and constraints, pseudocode,
  complexity analysis, and a dimensional-consistency check. Distinguish equations reproduced or
  adapted from prior work from genuinely new derivations. Do not add equations merely to look
  sophisticated.

## 5. Implementation and experiments

- Results are meaningful only if others can reproduce them; hand over the full method, not just the
  outcome.
- Fair comparison: include at least one simple/classic baseline and one recent/strong baseline, and
  compare on the **same data, same split, and same metric**.
- Inspect existing code before changing it. Run experiments only when the environment, permissions,
  and resources genuinely permit.
- Capture commands, configurations, library versions, seeds, logs, and raw result files.
- Never run untrusted downloaded code automatically. Never modify unrelated projects or read private
  files beyond the authorized inputs. Use isolated working directories and avoid destructive
  operations.
- If an experiment cannot run, deliver the implementation and exact run instructions and mark the
  results **unavailable** — never fabricate numbers.

## 6. Results, discussion, and figures

- Keep **Results** factual: numbers, tables, and figures, with no interpretation or hype. Put all
  interpretation in the **Discussion**, and do not merely restate the results table there.
- Never claim causation from a correlational or observational design; flag confounders.
- Choose metrics for the task and data. Do not report accuracy alone on imbalanced data; justify the
  metric and prefer precision/recall/F1/AUC or domain-appropriate measures where relevant.
- Report unexpected or negative results honestly, and relate findings to prior work.
- Figures must pass the "stranger test" — understandable from the figure and caption alone. Match the
  chart to the data, label axes with units, remove chartjunk, and ensure legibility in grayscale and
  for color-vision-deficient readers. Captions are self-contained.
- Treat conceptual figures and quantitative figures separately. A conceptual figure gets a detailed
  specification and a reusable image-generation prompt (never used to fabricate data). A quantitative
  figure is produced by reproducible plotting code reading verified data only. Image-generation tools
  must never be used to fabricate charts or measurements.

## 7. Limitations, conclusion, and references

- Always include an honest Limitations section. List only *relevant* limitations (ask: "would the
  result change?") and pair each with its impact. Keep the tone neutral and professional.
- Future Work must be specific and traceable to a stated limitation, not generic filler.
- The Conclusion contains **no new information, result, or citation** — it answers the research
  questions without overclaiming, built from finding + contribution + answer + takeaway.
- References: prefer primary sources with stable identifiers (e.g., DOIs); keep the citation style
  consistent; and **verify every citation against its source** — including anything produced by an AI
  tool — before relying on it.
- Credit every idea, method, or fact that is not your own. Paraphrase genuinely (restructure and
  re-express; do not word-swap). Quote and cite when keeping original wording.

## 8. Research integrity and ethics

- Never fabricate or falsify data; explain any data cleaning or exclusion in the methods.
- No plagiarism, self-plagiarism, duplicate publication, or salami-slicing. Authorship means a
  meaningful intellectual contribution. Declare funding and conflicts of interest.
- Human-subjects research requires informed consent, anonymization, and appropriate ethics/IRB
  approval, with extra care for vulnerable populations; consent is an ongoing process.
- Disclose any AI-tool use in the methodology or acknowledgments, and independently verify AI output
  (facts, references, code). Keep the core research thinking and consequential judgments human-owned.
- Make the researcher's chosen source set enforceable and visible. If a section needs evidence that
  is unavailable, surface the gap rather than fabricate support.

## 9. Clarity and language

- One idea per paragraph, opening with a topic sentence. Use a consistent, venue-appropriate voice
  (active for decisions, passive for mechanical steps is a common, workable default). Trim wordiness,
  keep parallel structure, and use consistent terminology. The read-aloud test catches most problems.
- Writing well in a second language is normal and nothing to apologize for. Use grammar/translation
  tools responsibly, disclose their use where required, and keep an academic register.

## 10. Publication

- Choose venues by fit (for example, where the work's most-relevant references appear), and judge
  venues on multiple factors rather than a single metric. Screen for predatory venues.
- The toolkit never claims a manuscript is accepted, publication-ready, or guaranteed to pass peer
  review. It reports readiness signals and remaining risks only.
