# Security Policy

## Reporting a vulnerability or a content concern

Please report security issues (e.g., path-traversal in the installer, unsafe code execution) or
**content/copyright concerns** (for example, if you believe any text reproduces protected
material) privately:

- Use GitHub's **private vulnerability reporting** ("Report a vulnerability" on the Security tab), or
- Open a minimal public issue asking a maintainer to contact you privately (do not include sensitive
  details in the public issue).

We aim to acknowledge reports within a few days.

## Scope and safety model

This toolkit is **local-first** and designed to avoid dangerous operations:

- The CLI only **copies** skill files into a target directory. It validates paths and **rejects path
  traversal** (`..`), absolute escapes, and writes outside the chosen target. It will **not**
  overwrite existing files without `--force`.
- The skills instruct agents to **inspect before changing** code, use **isolated project
  directories**, avoid destructive operations, and **never execute untrusted downloaded code
  automatically**.
- The toolkit does not require network access, a paid API, or a hosted backend to function.
- **No private or unpublished source material is included in the repository**; `.gitignore` excludes
  `.private/`, `.work/`, and `*.pdf`.

## What is out of scope

- The behavior of third-party AI models you connect to the skills.
- Experiments or code you choose to run on your own machine.

If you find that any artifact in the repository exposes private data, credentials, local filesystem
paths, or any third-party copyrighted content, please report it as above — we treat that as a
security issue.
