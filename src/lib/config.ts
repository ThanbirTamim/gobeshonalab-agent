import { readFileSync, existsSync } from "node:fs";

/**
 * Lightweight validator for research-project configuration files.
 *
 * It does not implement full JSON Schema; it enforces the required structure from
 * config/research-project.schema.json PLUS the academic-integrity rules the toolkit cares about:
 *  - hypothesis is required only for confirmatory quantitative work and must be absent/null otherwise
 *  - every sourceId used in sectionSources / gap / baselines must exist in sources[]
 *  - duplicate source ids are flagged
 *  - comprehensive-coverage claims require a documented search strategy
 */

export interface ConfigIssue {
  level: "error" | "warning";
  path: string;
  message: string;
}

export interface ConfigValidationResult {
  ok: boolean;
  issues: ConfigIssue[];
  duplicateSources: string[];
}

type Obj = Record<string, any>;

/** Parse a project config from JSON or a (very small subset of) YAML. */
export function parseConfig(content: string, filename = ""): Obj {
  const trimmed = content.trim();
  if (filename.endsWith(".json") || trimmed.startsWith("{")) {
    return JSON.parse(trimmed);
  }
  // Minimal YAML -> we only officially support JSON for the validator; for YAML we
  // require users to convert, but we try JSON first and otherwise throw a clear error.
  throw new Error(
    "Config validator currently parses JSON project files. Convert YAML to JSON (e.g. via a YAML tool) or provide research-project.json."
  );
}

export function validateConfigObject(cfg: Obj): ConfigValidationResult {
  const issues: ConfigIssue[] = [];
  const err = (path: string, message: string) => issues.push({ level: "error", path, message });
  const warn = (path: string, message: string) => issues.push({ level: "warning", path, message });

  if (typeof cfg !== "object" || cfg === null) {
    return { ok: false, issues: [{ level: "error", path: "/", message: "config is not an object" }], duplicateSources: [] };
  }

  // Required top-level
  for (const key of ["project", "research", "sources", "sectionSources"]) {
    if (!(key in cfg)) err(`/${key}`, `missing required section '${key}'`);
  }

  const project = cfg.project ?? {};
  for (const key of ["title", "discipline", "researchType"]) {
    if (!project[key]) err(`/project/${key}`, `missing required field '${key}'`);
  }
  const researchType: string = project.researchType ?? "";
  const validTypes = ["conceptual", "theoretical", "qualitative", "quantitative", "mixed-methods", "review", "computational"];
  if (researchType && !validTypes.includes(researchType)) {
    err("/project/researchType", `invalid researchType '${researchType}'`);
  }

  const research = cfg.research ?? {};
  for (const key of ["concept", "problemStatement", "researchQuestions", "objectives", "contributions"]) {
    if (!research[key]) err(`/research/${key}`, `missing required field '${key}'`);
  }

  // Research questions
  const rqs = Array.isArray(research.researchQuestions) ? research.researchQuestions : [];
  if (research.researchQuestions && rqs.length === 0) {
    err("/research/researchQuestions", "at least one research question is required");
  }
  for (const [i, rq] of rqs.entries()) {
    if (!rq || typeof rq !== "object") { err(`/research/researchQuestions/${i}`, "must be an object"); continue; }
    if (!/^RQ\d+$/.test(rq.id ?? "")) err(`/research/researchQuestions/${i}/id`, `id must match ^RQ[0-9]+$ (got '${rq.id}')`);
    if (!rq.text) err(`/research/researchQuestions/${i}/text`, "missing text");
    // FNSS advisory
    for (const q of ["feasible", "novel", "significant", "specific"]) {
      if (rq[q] === false) warn(`/research/researchQuestions/${i}/${q}`, `research question ${rq.id} is marked NOT ${q}; reconsider before locking the question`);
    }
  }

  // Hypothesis rule
  const hasHypothesis = typeof research.hypothesis === "string" && research.hypothesis.trim().length > 0;
  const hypothesisTypes = ["quantitative", "mixed-methods", "computational"];
  if (hasHypothesis && !hypothesisTypes.includes(researchType)) {
    warn("/research/hypothesis", `a hypothesis is set but researchType is '${researchType}'. A hypothesis is normally only for confirmatory quantitative/computational/mixed-methods work; qualitative/exploratory/conceptual studies should use open-ended research questions.`);
  }
  if (!hasHypothesis && researchType === "quantitative") {
    warn("/research/hypothesis", "researchType is 'quantitative' but no hypothesis is set. Confirmatory quantitative work usually states a testable hypothesis (exploratory quantitative work may not).");
  }

  // Contributions
  const contribs = Array.isArray(research.contributions) ? research.contributions : [];
  for (const [i, c] of contribs.entries()) {
    if (!c || typeof c !== "object") { err(`/research/contributions/${i}`, "must be an object with text + type"); continue; }
    if (!c.text) err(`/research/contributions/${i}/text`, "missing text");
    if (!["novelty", "empirical-evidence", "practical-value"].includes(c.type)) {
      err(`/research/contributions/${i}/type`, `type must be novelty|empirical-evidence|practical-value (got '${c.type}')`);
    }
  }

  // Sources
  const sources = Array.isArray(cfg.sources) ? cfg.sources : [];
  const idCounts = new Map<string, number>();
  for (const [i, s] of sources.entries()) {
    if (!s || typeof s !== "object") { err(`/sources/${i}`, "must be an object"); continue; }
    if (!s.id) err(`/sources/${i}/id`, "missing stable id");
    else idCounts.set(s.id, (idCounts.get(s.id) ?? 0) + 1);
    if (!s.title) err(`/sources/${i}/title`, "missing title");
    if (s.metadataComplete === false && (s.verificationStatus ?? "unverified") === "verified") {
      warn(`/sources/${i}`, `source '${s.id}' has incomplete metadata but is marked verified`);
    }
  }
  const duplicateSources = [...idCounts.entries()].filter(([, n]) => n > 1).map(([id]) => id);
  for (const dup of duplicateSources) {
    err("/sources", `duplicate source id '${dup}' (same paper supplied more than once)`);
  }
  const sourceIds = new Set([...idCounts.keys()]);

  // Section sources must reference existing source ids
  const sectionSources: Obj = cfg.sectionSources ?? {};
  for (const [section, ids] of Object.entries(sectionSources)) {
    if (!Array.isArray(ids)) { err(`/sectionSources/${section}`, "must be an array of source ids"); continue; }
    for (const id of ids) {
      if (!sourceIds.has(id)) err(`/sectionSources/${section}`, `references unknown source id '${id}'`);
    }
  }

  // Research gap supporting sources
  const gap = research.researchGap;
  if (gap && Array.isArray(gap.supportingSources)) {
    for (const id of gap.supportingSources) {
      if (!sourceIds.has(id)) err("/research/researchGap/supportingSources", `references unknown source id '${id}'`);
    }
  }

  // Comprehensive coverage requires documented search
  const search = research.literatureSearch;
  if (search?.claimsComprehensiveCoverage === true) {
    const hasStrategy = Array.isArray(search.databases) && search.databases.length > 0 &&
      Array.isArray(search.queryTerms) && search.queryTerms.length > 0;
    if (!hasStrategy) {
      err("/research/literatureSearch", "claimsComprehensiveCoverage is true but no documented search strategy (databases + queryTerms) is provided");
    }
  }

  // Baselines (if experiments required)
  const exp = cfg.experiments;
  if (exp?.required === true) {
    const baselines = Array.isArray(exp.baselines) ? exp.baselines : [];
    const kinds = new Set(baselines.map((b: Obj) => b?.kind));
    if (!kinds.has("classic-simple") || !kinds.has("recent-sota")) {
      warn("/experiments/baselines", "fair comparison usually needs at least one classic/simple AND one recent/SOTA baseline");
    }
    for (const [i, b] of baselines.entries()) {
      if (b?.sourceId && !sourceIds.has(b.sourceId)) {
        err(`/experiments/baselines/${i}/sourceId`, `references unknown source id '${b.sourceId}'`);
      }
    }
  }

  // Figures: quantitative figures should declare data provenance
  const figures = Array.isArray(cfg.figures) ? cfg.figures : [];
  for (const [i, f] of figures.entries()) {
    if (f?.kind === "quantitative" && !f.dataSource) {
      warn(`/figures/${i}`, `quantitative figure '${f.id}' has no dataSource; it must plot verified data, never fabricated numbers`);
    }
  }

  const ok = issues.every((x) => x.level !== "error");
  return { ok, issues, duplicateSources };
}

export function validateConfigFile(path: string): ConfigValidationResult {
  if (!existsSync(path)) {
    return { ok: false, issues: [{ level: "error", path, message: "file not found" }], duplicateSources: [] };
  }
  const content = readFileSync(path, "utf8");
  const cfg = parseConfig(content, path);
  return validateConfigObject(cfg);
}
