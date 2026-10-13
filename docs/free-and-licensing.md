# Why this toolkit is free (and what you still pay for)

## The toolkit itself is free and open source

Everything in this repository is free to use, modify, and redistribute:

- **Code** (CLI, validators, tests) — Apache License 2.0 (`LICENSE`).
- **Content** (skills, knowledge base, docs) — Creative Commons Attribution 4.0 (`LICENSE-CONTENT`).

The core has **no required paid dependency**:

- No paid API is required to read, install, or validate the skills.
- No paid reference manager — the toolkit uses local files (`research-project.json`, `.bib`/CSL-JSON
  you already have). Reference managers like Zotero (free/open source) are optional.
- No hosted backend or proprietary cloud service — everything runs locally.
- No required network access — `gobeshona validate|doctor|install` work offline.
- Figures: conceptual figure *prompts* are text; quantitative figures use free tooling (e.g.,
  Python + matplotlib). Export to DOCX/PDF can use free pandoc.

## What is *not* part of the toolkit (and may cost money)

The skills are **instructions for an AI agent**. Running an AI model to follow those instructions
requires **AI inference**, which you provide separately. That inference may be:

- a paid API (e.g., a commercial model subscription or usage billing), or
- a locally hosted open-weights model you run yourself (no per-use fee, but you provide the hardware).

This separation is deliberate and standard: **free software can require separately licensed
inference.** The toolkit does not sell, bundle, or require any particular model. You choose the
engine; the toolkit stays free and portable.

## Where the guidance comes from

The research-writing standards are the project's own statement of general, widely-accepted
research-methods and research-integrity principles, written in original wording (see
`LICENSE-CONTENT`). The toolkit contains no third-party book, article, or other copyrighted text.

## Summary

| Component | Cost | License |
|-----------|------|---------|
| Skills, knowledge, docs | Free | CC BY 4.0 |
| CLI and tooling | Free | Apache-2.0 |
| AI inference to run the skills | You provide (paid API or local model) | Separate |
