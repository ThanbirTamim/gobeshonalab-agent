# Citation Integrity — Procedures and Conventions

This reference backs the `reference-auditor` skill. It defines the exact procedures for resolving
citations, verifying references, refusing to invent anything, and flagging what cannot be verified.

Grounded in general research-integrity principles: references are a foundation of research integrity and
let readers verify your claims; AI tools can invent fake citations, so you
must open and verify every original source yourself; near-verbatim
paraphrasing (keeping the structure, swapping a few words) is treated as plagiarism — paraphrase from
understanding and still cite, or quote directly with quotation marks and a citation.

---

## 1. Both-direction resolution procedure

Build two sets and compare them. Nothing passes until both directions resolve or every exception is
explicitly reported.

**Step 1 — Extract in-text citations.** Scan each section for every citation marker (numeric `[12]`,
author-year `(Rahman, 2021)`, `\cite{key}`, footnote markers, etc.). Record: the citation key, the
section, and the sentence it supports.

**Step 2 — Extract bibliography entries.** Parse every reference entry. Record: its key/identifier,
author list, title, year, venue, and DOI/URL.

**Step 3 — Forward check (text → bibliography).** For each in-text citation, find a matching
bibliography entry.
- Match found → OK.
- No match → **DANGLING CITATION** (severity: blocking). The text points to a reference that does not
  exist. Report location; do not invent the missing entry.

**Step 4 — Backward check (bibliography → text).** For each bibliography entry, find at least one
in-text citation.
- Cited → OK.
- Never cited → **ORPHAN REFERENCE** (severity: fix-before-submit). Either the citation was dropped
  from the text or the entry is padding. Report; let the researcher decide.

**Step 5 — Permitted-source check.** Compare each citation key against the project config `sources`
ids.
- In set → OK.
- Not in set → **OUT-OF-SCOPE SOURCE** (severity: blocking). Flag it; never silently add it to the
  permitted set.

**Step 6 — Duplicate check.** Detect two bibliography entries describing the same work (same DOI, or
same title+year+authors). Report as **DUPLICATE REFERENCE**; propose a merge for researcher approval.

---

## 2. Verification sources (free / local first)

Verify metadata against reliable, free sources, in roughly this priority order:

1. **The researcher's authorized local copy** of the source (the actual PDF/text they are permitted
   to use) — the most trustworthy check for what the source actually says.
2. **DOI resolution** via `https://doi.org/<doi>` — confirms the DOI exists and points to the stated
   work.
3. **Open bibliographic records** (e.g., Crossref, DataCite, OpenAlex, arXiv listing, publisher
   landing page) — confirm author/title/year/venue agree.
4. **Library catalogs / official conference or journal tables of contents** for works without a DOI.

Record, per reference, which source(s) were used and the result. Verification requires a real,
recorded check — never a guess.

---

## 3. The no-invention rules (hard constraints)

The auditor must **never**:

- Invent or "best-guess" an author, title, year, venue, page range, DOI, or URL.
- Fill a missing field to satisfy a citation style; report the missing field as a gap instead.
- Mark a reference `verified` without a recorded verification source.
- Add a source to the permitted set to make a dangling citation resolve.
- Assert that a source supports a claim without confirming the source actually makes that claim.
- Convert a secondary claim (a finding the paper cites from someone else) into that paper's own
  original finding.

When information is missing, the correct action is always to **surface the gap**, not to fabricate.

---

## 4. Unverifiable-flagging convention

Each reference ends the audit with exactly one `verificationStatus` (matching
`config/research-project.schema.json`):

| Status | Meaning | How to record |
|--------|---------|---------------|
| `verified` | Metadata independently confirmed against a reliable source or authorized local copy. | Note the source used (e.g., "DOI resolved + Crossref title match"). |
| `unverified` | Not yet checked (default state before auditing). | Must not survive into a final draft; convert to `verified` or `unverifiable`. |
| `unverifiable` | Checked, but cannot be independently confirmed (no DOI, no accessible record, conflicting metadata). | State the reason (e.g., "no DOI; no record found in Crossref/OpenAlex/arXiv"). |

Alongside the status, attach integrity flags where relevant:

- `SUSPECTED-INVENTED` — DOI does not resolve, or the author/title/venue combination appears in no
  record; requires human verification before the reference may be used.
- `MISATTRIBUTED-FINDING` — the cited source does not make the claim attributed to it, or the claim
  is secondary (cited from a third party) but presented as the source's own.
- `UNSUPPORTED-NOVELTY` — a "first/novel/no prior work" claim with no supporting evidence.
- `UNSUBSTANTIATED-GAP` — a research-gap claim not backed by cited evidence or the config
  `researchGap.supportingSources`.
- `COVERAGE-OVERCLAIM` — "comprehensive/exhaustive coverage" language without a documented
  `literatureSearch` strategy.

---

## 5. Audit report shape

Produce a report with:

1. **Summary counts** — total citations, total references, dangling, orphan, out-of-scope, duplicate,
   unverifiable, suspected-invented, misattributed.
2. **Per-issue table** — location, issue type, severity (`blocking` / `fix-before-submit` /
   `advisory`), and the required fix.
3. **Reference ledger** — every reference with its final `verificationStatus`, verification source,
   and any integrity flags.
4. **Researcher actions** — a short list of decisions only the researcher can make (approve merges,
   locate missing sources, remove orphan references, substantiate novelty/gap claims).

Nothing in the report rewrites the manuscript automatically; it proposes fixes for approval.
