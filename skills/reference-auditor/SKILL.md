---
name: reference-auditor
description: >-
  Audit a manuscript's in-text citations and bibliography for integrity. Use this whenever a draft
  cites sources, before assembly or final review, or when a researcher asks "are my references
  correct / complete / real?". It resolves citations in both directions (every in-text citation has a
  bibliography entry, and every bibliography entry is cited), verifies reference metadata against
  reliable sources where possible, and marks anything that cannot be verified as unverifiable. It
  never invents papers, authors, titles, DOIs, URLs, or quotations, distinguishes a paper's original
  findings from secondary claims about it, and flags unsupported novelty claims and unsubstantiated
  research gaps.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs:
    - knowledge/principles/research-writing-principles.md
    - knowledge/principles/research-writing-principles.md
    - knowledge/quality-framework/manuscript-checklist.md
    - skills/reference-auditor/references/citation-integrity.md
---

# reference-auditor

## Purpose

The reference-auditor protects the citation layer of a manuscript — the part most prone to silent
fabrication, especially when AI tools are involved. It checks that citations and references map onto
each other cleanly, that reference metadata is accurate and verifiable, and that claims attributed to
sources (findings, novelty, gaps) are actually supported.

References are a foundation of research integrity: they let readers verify your
claims. A critical warning: AI tools can invent fake citations
with wrong authors, DOIs, or imaginary titles, so you must open and verify every original source
yourself.

## When to use

- A draft section cites sources and you want to confirm each citation resolves and is real.
- Before `manuscript-assembler` finalizes the bibliography, and before `final-reviewer` scores it.
- After any AI-assisted drafting step, to catch hallucinated or mangled references.
- When a reviewer or researcher questions whether a cited paper actually says what is claimed.

## Inputs

- The manuscript draft(s) with in-text citations.
- The reference list / bibliography (BibTeX, CSL-JSON, or formatted text).
- The project config `sources` array and `citationStyle` (`config/research-project.schema.json`).
- Where available, access to reliable metadata (DOI resolver, publisher record, library catalog) or
  the researcher's locally stored authorized copies of the sources.

## Outputs

- A **citation audit report** listing, per issue: location, issue type, severity, and required fix.
- An updated reference list where each entry carries a `verificationStatus` of `verified`,
  `unverified`, or `unverifiable` (matching the schema's enum), with the method/source of verification.
- A list of **integrity flags**: missing in-text citations, bibliography mismatches, suspected
  invented references, misattributed findings, unsupported novelty claims, and unsubstantiated gaps.

## Instructions

1. **Collect both sides.** Extract every in-text citation key/marker from the draft and every entry
   from the bibliography. Normalize keys so they can be compared.
2. **Resolve in both directions** using the procedure in
   `skills/reference-auditor/references/citation-integrity.md`:
   - Every in-text citation must have a matching bibliography entry (no dangling citations).
   - Every bibliography entry must be cited at least once in the text (no orphan references).
   Report each unmatched item with its location.
3. **Check against the permitted source set.** Compare citations to the config `sources` ids. If a
   citation uses a source not in the permitted set, flag it — do not silently accept or expand the set.
4. **Verify metadata.** For each reference, confirm author list, title, year, venue, and DOI/URL
   against a reliable source or the researcher's authorized local copy. Prioritize primary sources
   with DOIs. Record how each was checked.
5. **Mark the unverifiable.** If a reference cannot be independently confirmed, set
   `verificationStatus: unverifiable` and state why (e.g., no DOI, no accessible record). Never
   "fix" it by inventing or guessing missing fields.
6. **Detect suspected fabrication.** Watch for signatures of invented citations: DOIs that do not
   resolve, author/title/venue combinations that do not co-occur in any record, or references with no
   locatable source. Flag these as suspected-invented and require human verification before use.
7. **Check attribution of findings.** For claims pinned to a source, confirm the source actually
   makes that claim. Distinguish a paper's **original findings** from **secondary claims** it merely
   repeats or cites from others; flag misattribution.
8. **Challenge novelty and gap claims.** Flag any "first to", "novel", or "no prior work" statement
   and any research-gap claim that is not backed by cited evidence or the config `researchGap`
   supporting sources. If `literatureSearch.claimsComprehensiveCoverage` is true, require a documented
   search strategy; otherwise flag "exhaustive coverage" language.
9. **Enforce style consistency.** Check that all entries follow the config `citationStyle`
   consistently; report, but do not fabricate missing fields to satisfy a
   style — surface the gap instead.
10. **Report, do not rewrite silently.** Produce the audit report and proposed corrections for the
    researcher to approve. Never alter cited content, invent sources, or change the permitted source set.

## Quality gates

- Citation ↔ reference resolution is complete in both directions, with every exception listed.
- Every reference has an explicit `verificationStatus`; nothing is left implicitly "assumed correct".
- Every suspected-invented or misattributed reference is flagged for human verification.
- No reference field was filled in by guessing; unknown fields are reported as gaps.
- Novelty and gap claims each either cite supporting evidence or are flagged as unsupported.

## Anti-fabrication rules

- Never invent or "best-guess" papers, authors, titles, years, venues, DOIs, URLs, or quotations.
- Never upgrade a reference to `verified` without a real, recorded verification source.
- Never expand or override the researcher's permitted source set to make a citation resolve.
- Never assert a source supports a claim without confirming it; mark unverifiable attributions as such.
- Treat every AI-generated citation as unverified until personally confirmed against the source.
- Distinguish verified facts (confirmed against the source), interpretations (your reading of it),
  assumptions, and proposed/future work in the report.

## References

- `skills/reference-auditor/references/citation-integrity.md` — resolution procedure, verification
  sources, no-invention rules, and the unverifiable-flagging convention.
- `knowledge/principles/research-writing-principles.md` — Ch3 (plagiarism, citation vs. paraphrasing line)
  and Ch8 (references as integrity foundation; verify every citation).
- `knowledge/principles/research-writing-principles.md` — cross-cutting rules.
- `knowledge/quality-framework/manuscript-checklist.md` — the reference/citation checklist items.
