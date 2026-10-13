# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.0] - 2026-01-01

### Added
- **GobeshonaLabAgent** toolkit: 16 Agent Skills — `writing-guidelines`, `paper-ingestion`,
  `source-mapping`, `research-design`, `introduction-writer`, `literature-review`,
  `methodology-designer`, `implementation-engineer`, `experiment-runner`, `results-analyst`,
  `figure-planner`, `discussion-conclusion`, `reference-auditor`, `manuscript-assembler`,
  `final-reviewer`, and the `research-paper-workflow` orchestrator — each with supporting
  templates/references.
- Knowledge base of general, original research-writing principles plus a manuscript checklist and a
  review rubric (`knowledge/`).
- Researcher-driven project configuration contract (`config/research-project.schema.json`).
- CLI (`gobeshona`): `list`, `new` (project scaffolder), `install <skill>|all`, `validate`,
  `doctor` — with dry-run, overwrite protection, path-traversal rejection, and clear exit codes.
- Claude Code plugin and marketplace manifests (`.claude-plugin/`).
- Evaluation fixtures with documented automated vs. human checks.
- Test suite (`node:test`): frontmatter parsing, skill metadata, safe installation, project
  scaffolding, manifest validity, documentation-link integrity, and config/quality checks.
- GitHub Actions CI for lint/typecheck, tests, and skill validation.
- Documentation set: installation, quickstart, user guide, interfaces, project config, licensing,
  publishing, troubleshooting, and architecture.

### Notes
- The project name is GobeshonaLabAgent; the installed CLI command is `gobeshona`; the intended npm
  package is `@gobeshonalab/agent` (not yet reserved or published).

[Unreleased]: https://github.com/gobeshonalab/gobeshonalab-agent/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/gobeshonalab/gobeshonalab-agent/releases/tag/v0.1.0
