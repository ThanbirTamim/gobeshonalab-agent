import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

export interface ScaffoldOptions {
  /** Directory to create the starter project in. */
  target: string;
  /** Overwrite existing files if true. Default false (protected). */
  force?: boolean;
  /** Preview only; write nothing. */
  dryRun?: boolean;
}

export interface ScaffoldResult {
  target: string;
  files: Array<{ relPath: string; action: "create" | "overwrite" | "skip-exists" }>;
  written: number;
  skipped: number;
  dryRun: boolean;
}

/** A minimal, valid starter research-project config (quantitative/computational, with placeholders). */
export function starterConfig(): unknown {
  return {
    schemaVersion: "1.0.0",
    project: {
      title: "Your project title",
      discipline: "your-discipline",
      researchType: "computational",
      targetVenue: "",
      venueType: "unknown",
      citationStyle: "IEEE",
      outputFormat: "markdown",
      timeBudget: "",
    },
    research: {
      concept: "One or two sentences describing the core idea you are investigating.",
      problemStatement: "State the specific problem and why current approaches fall short.",
      hypothesis: null,
      researchQuestions: [
        {
          id: "RQ1",
          text: "Your first research question.",
          feasible: true,
          novel: true,
          significant: true,
          specific: true,
        },
      ],
      objectives: ["Your first objective."],
      contributions: [
        { text: "Your first claimed contribution.", type: "novelty" },
      ],
      researchGap: {
        statement: "What is still unknown that this work addresses.",
        type: "missing-knowledge",
        supportingSources: [],
      },
      literatureSearch: {
        databases: [],
        queryTerms: [],
        dateRange: "",
        inclusionCriteria: [],
        exclusionCriteria: [],
        claimsComprehensiveCoverage: false,
      },
    },
    sources: [
      {
        id: "author-year-keyword",
        title: "Replace with a real paper you are authorized to use.",
        authors: ["Author A"],
        year: null,
        venue: null,
        doi: null,
        url: null,
        localPath: null,
        metadataComplete: false,
        verificationStatus: "unverified",
        notes: "",
      },
    ],
    sectionSources: {
      introduction: ["author-year-keyword"],
      "literature-review": ["author-year-keyword"],
      methodology: [],
      results: [],
      discussion: [],
    },
    datasets: [],
    implementation: { required: false },
    experiments: { required: false },
    figures: [],
    limitations: [],
    openDecisions: [],
  };
}

function readmeText(): string {
  return `# Research project

This folder was scaffolded by GobeshonaLabAgent (\`gobeshona new\`).

## Next steps

1. Edit \`research-project.json\`:
   - Set your title, discipline, and \`researchType\`
     (conceptual | theoretical | qualitative | quantitative | mixed-methods | review | computational).
   - Write your research question(s); add a \`hypothesis\` ONLY for confirmatory quantitative work.
   - List your objectives and claimed contributions.
   - Add each source you are authorized to use to \`sources\` (with a stable \`id\`).
   - Map sources to sections in \`sectionSources\`.
2. Validate it:
   \`\`\`bash
   gobeshona validate research-project.json
   \`\`\`
3. Install the skills into this project (if not already installed):
   \`\`\`bash
   gobeshona install all --target .claude/skills
   \`\`\`
4. In a compatible AI agent (e.g. Claude Code), invoke the \`research-paper-workflow\` skill and point
   it at \`research-project.json\`, or run individual skills.

The toolkit never invents papers, data, results, or citations. Where evidence is missing it surfaces
the gap. Consequential scientific judgments remain yours.
`;
}

/** Create a starter project. Safe: never overwrites without force; validates nothing destructive. */
export function scaffoldProject(opts: ScaffoldOptions): ScaffoldResult {
  const target = resolve(opts.target);
  const files: Array<{ relPath: string; content: string }> = [
    { relPath: "research-project.json", content: JSON.stringify(starterConfig(), null, 2) + "\n" },
    { relPath: "README.md", content: readmeText() },
  ];

  const result: ScaffoldResult = { target, files: [], written: 0, skipped: 0, dryRun: !!opts.dryRun };

  if (!opts.dryRun) mkdirSync(target, { recursive: true });

  for (const f of files) {
    const dest = join(target, f.relPath);
    const exists = existsSync(dest);
    let action: "create" | "overwrite" | "skip-exists";
    if (!exists) action = "create";
    else if (opts.force) action = "overwrite";
    else action = "skip-exists";
    result.files.push({ relPath: f.relPath, action });

    if (!opts.dryRun && action !== "skip-exists") {
      writeFileSync(dest, f.content);
      result.written++;
    } else if (action === "skip-exists") {
      result.skipped++;
    } else {
      result.written++; // dry-run would write
    }
  }
  return result;
}
