# GobeshonaLabAgent: Claude Integration User Manual

This guide explains how to install and use **GobeshonaLabAgent** inside **Claude Code** or **Claude Desktop** to supercharge your academic research and writing workflow.

## 🗺️ How It Works

The following diagram illustrates how Claude interacts with the GobeshonaLabAgent toolkit to assist your research:

```text
+-----------------------+       +-----------------------+
|      Researcher       |       |      Claude Code      |
|   (You / Terminal)    | <---> |   (AI Coding Agent)   |
+-----------------------+       +-----------------------+
                                            |
                                            | Reads & Executes
                                            v
                                +-----------------------+
                                |   GobeshonaLabAgent   |
                                |       (Skills)        |
                                +-----------------------+
                                            |
                                            | Manages
                                            v
                                +-----------------------+
                                |   Research Project    |
                                |  (Data, Drafts, Bib)  |
                                +-----------------------+
```

---

## 🚀 Installation

You can install the GobeshonaLabAgent skills directly into your Claude environment using the official marketplace or via npm.

### Option 1: Install via Claude Marketplace (Recommended)
If you are using Claude Code, you can install the plugin directly from the GitHub repository:

1. Open your terminal where you want to start your research.
2. Add the marketplace:
   ```bash
   /plugin marketplace add ThanbirTamim/gobeshonalab-agent
   ```
3. Install the skills:
   ```bash
   /plugin install gobeshonalab-agent@gobeshonalab-agent
   ```

### Option 2: Install via npm / npx
If you want to manage the skills manually or are using a different agent harness:

1. Install the CLI globally (optional) or use `npx`:
   ```bash
   npx @thanbir-tamim/gobeshonalab-agent list
   ```
2. Create a new research project:
   ```bash
   npx @thanbir-tamim/gobeshonalab-agent new my-research-paper
   cd my-research-paper
   ```
3. Install the skills into your local `.claude/skills` folder:
   ```bash
   npx @thanbir-tamim/gobeshonalab-agent install all --target .claude/skills
   ```

---

## 💡 How to Use in Claude

Once installed, Claude automatically detects the skills in your `.claude/skills` directory. You can now prompt Claude to act as your research assistant.

### Example Workflow

1. **Start your project:**
   > *"Claude, initialize a new research project about 'The Impact of AI on Academic Writing'. Use the `research-design` skill to help me outline my hypothesis."*

2. **Ingest Literature:**
   > *"I have a PDF of a key paper. Use the `paper-ingestion` skill to summarize it and extract the core methodologies."*

3. **Write the Manuscript:**
   > *"Help me draft the Introduction. Use the `introduction-writer` skill to ensure I follow strict academic integrity and evidence traceability."*

4. **Review and Audit:**
   > *"Run the `reference-auditor` skill to make sure all my citations match the bibliography and there are no unsupported claims."*

---

## 🛠️ Available Skills

GobeshonaLabAgent comes with 16 specialized skills. Here are a few key ones:

| Skill | Description |
| :--- | :--- |
| `research-paper-workflow` | Guides you through the end-to-end academic writing process. |
| `paper-ingestion` | Extracts structured data and summaries from source PDFs. |
| `literature-review` | Helps synthesize multiple papers into a cohesive background. |
| `reference-auditor` | Cross-checks in-text citations against your bibliography. |
| `final-reviewer` | Evaluates your manuscript against a strict academic rubric. |

*For a full list, run `npx @thanbir-tamim/gobeshonalab-agent list` in your terminal.*
