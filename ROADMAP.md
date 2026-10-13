# Roadmap

This roadmap is intentionally conservative. Items are proposals, not promises, and nothing here
should be read as a claim that a feature already works.

## 0.1.x — Foundation (current)
- [x] Knowledge base of general research-writing principles + quality framework.
- [x] 16 skills + orchestrator with anti-fabrication rules.
- [x] Project configuration contract + validator.
- [x] CLI (`list`, `new`, `install`, `validate`, `doctor`) with safe installation and scaffolding.
- [x] Plugin + marketplace manifests.
- [x] Evaluation fixtures; `node:test` suite; CI.
- [x] GobeshonaLabAgent branding across code, docs, and manifests.

## 0.2.x — Deeper validation
- [ ] YAML project-config parsing in the validator (currently JSON-first).
- [ ] Citation cross-reference checker that parses a draft + a `.bib`/CSL-JSON and reports
      bidirectional mismatches automatically.
- [ ] Optional offline DOI/metadata verification against a user-provided local index.
- [ ] An `uninstall`/`update` command for installed skills (currently install + manual removal).

## 0.3.x — Assembly & export
- [ ] Reference pandoc-based DOCX/PDF export recipes (free tooling) with a `doctor` check for pandoc.
- [ ] LaTeX template packs for common venues (community-contributed).
- [ ] A reproducible-figure runner that executes `plot-script-template.py` against verified data.

## 0.4.x — Interoperability
- [ ] Documented adapters and tested installation flows for additional agent runtimes.
- [ ] A conformance test that an installed skill set loads in a target runtime.

## Non-goals
- Fabricating or auto-generating research content, results, citations, or figures.
- Claiming a manuscript is accepted, publication-ready, or guaranteed to pass peer review.
- Requiring any paid API, reference manager, or hosted backend in the core.
