---
name: writing-guidelines
description: >-
  Gateway to GobeshonaLabAgent's research-writing knowledge base. Use this skill first, or whenever
  another skill needs the authoritative principle or quality gate behind a research-writing rule
  (the honesty principle, research questions and gaps, the introduction funnel, synthesis literature
  reviews, methodology and reproducibility, results vs. discussion, figures, references, ethics, and
  publication). Returns concise, original, general research-writing guidance with pointers into the
  knowledge base.
metadata:
  version: 1.0.0
  partOf: gobeshonalab-agent
  knowledgeRefs:
    - knowledge/principles/research-writing-principles.md
    - knowledge/quality-framework/manuscript-checklist.md
    - knowledge/quality-framework/review-rubric.md
---

# writing-guidelines

## Purpose

This skill is the single authoritative entry point to the toolkit's research-writing standards. Every
other skill defers to it so that guidance stays consistent across the workflow.

The guidance is a curated statement of **general, widely-accepted research-writing and
research-integrity principles** (the kind taught in graduate research-methods courses and codified in
common author guidelines and publication-ethics norms). It is the project's own original expression
of those standards. It is not derived from, and does not reproduce, any single proprietary or
unpublished source.

## When to use

- At the start of a project, to orient the researcher to the standards the toolkit follows.
- Whenever another skill needs the principle or quality gate behind a rule.
- When a reviewer asks "what standard is this rule based on?"

## Inputs

- A topic or section name (e.g., "introduction", "methodology", "figures", "ethics", "references").

## Outputs

- The relevant principle(s), in concise form.
- A pointer to the exact file/section in `knowledge/` for deeper detail.
- A clear separation of what is a general community standard versus a toolkit engineering convention.

## Instructions

1. Identify the topic the caller needs guidance for and map it to a section of
   `knowledge/principles/research-writing-principles.md` (sections 1-10 cover framing, introduction,
   methodology, implementation, results/figures, limitations/references, ethics, clarity, publication).
2. Return the concise principle(s) plus the file pointer.
3. For quality gates, point to `knowledge/quality-framework/manuscript-checklist.md` and
   `knowledge/quality-framework/review-rubric.md`.
4. If asked for something not covered by the knowledge base, say so plainly — **do not invent
   standards, citations, or sources.**

## Quality gates

- Every rule returned points to a section of the knowledge base.
- Guidance is expressed in original, general terms; no proprietary or unpublished text is reproduced.

## Anti-fabrication rules

- Never attribute a general principle to a fabricated source, author, or publication.
- Never invent a citation, standard, page number, or quotation.
- If guidance is ambiguous or missing, report it rather than guessing.

## References

- `knowledge/principles/research-writing-principles.md` — cross-cutting principles.
- `knowledge/quality-framework/manuscript-checklist.md` — section-by-section checklist.
- `knowledge/quality-framework/review-rubric.md` — scored review rubric.
