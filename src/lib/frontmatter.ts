/**
 * Minimal YAML-subset parser for SKILL.md frontmatter.
 *
 * Supports the subset actually used by this project's skill files:
 *  - top-level `key: scalar`
 *  - folded scalars `key: >-` with indented continuation lines
 *  - nested maps (indented `key: value`)
 *  - block sequences (`- item`) of scalars
 *
 * It is intentionally small and dependency-free so the CLI stays auditable.
 * It is NOT a general YAML implementation.
 */

export type YamlValue = string | number | boolean | null | YamlValue[] | { [k: string]: YamlValue };

export interface Frontmatter {
  data: Record<string, YamlValue>;
  body: string;
}

/** Extract the leading `---\n...\n---` frontmatter block and the remaining body. */
export function splitFrontmatter(content: string): { raw: string | null; body: string } {
  const normalized = content.replace(/\r\n/g, "\n");
  if (!normalized.startsWith("---\n")) {
    return { raw: null, body: normalized };
  }
  const end = normalized.indexOf("\n---", 4);
  if (end === -1) {
    return { raw: null, body: normalized };
  }
  const raw = normalized.slice(4, end);
  const after = normalized.slice(end + 4).replace(/^\n/, "");
  return { raw, body: after };
}

interface Line {
  indent: number;
  text: string;
  raw: string;
}

function tolines(src: string): Line[] {
  return src
    .split("\n")
    .filter((l) => l.trim() !== "" && !l.trim().startsWith("#"))
    .map((raw) => {
      const indent = raw.length - raw.replace(/^\s+/, "").length;
      return { indent, text: raw.trim(), raw };
    });
}

function parseScalar(v: string): YamlValue {
  const t = v.trim();
  if (t === "" ) return "";
  if (t === "null" || t === "~") return null;
  if (t === "true") return true;
  if (t === "false") return false;
  if (/^-?\d+$/.test(t)) return parseInt(t, 10);
  if (/^-?\d+\.\d+$/.test(t)) return parseFloat(t);
  // strip matching quotes
  if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith("'") && t.endsWith("'"))) {
    return t.slice(1, -1);
  }
  return t;
}

/**
 * Parse a block of frontmatter lines starting at index `i` with a given base indent.
 * Returns the parsed value and the index after the block.
 */
function parseBlock(lines: Line[], i: number, baseIndent: number): { value: YamlValue; next: number } {
  // Sequence?
  if (lines[i] && lines[i].indent === baseIndent && lines[i].text.startsWith("- ")) {
    const arr: YamlValue[] = [];
    while (i < lines.length && lines[i].indent === baseIndent && lines[i].text.startsWith("- ")) {
      arr.push(parseScalar(lines[i].text.slice(2)));
      i++;
    }
    return { value: arr, next: i };
  }
  // Mapping
  const map: Record<string, YamlValue> = {};
  while (i < lines.length && lines[i].indent === baseIndent) {
    const line = lines[i];
    const m = line.text.match(/^([A-Za-z0-9_-]+):(.*)$/);
    if (!m) break;
    const key = m[1];
    const rest = m[2].trim();
    if (rest === ">-" || rest === ">" || rest === "|" || rest === "|-") {
      // folded/literal scalar: gather deeper-indented lines
      i++;
      const parts: string[] = [];
      const childIndent = i < lines.length ? lines[i].indent : baseIndent + 2;
      while (i < lines.length && lines[i].indent >= childIndent && lines[i].indent > baseIndent) {
        parts.push(lines[i].text);
        i++;
      }
      const joiner = rest.startsWith(">") ? " " : "\n";
      map[key] = parts.join(joiner);
      continue;
    }
    if (rest === "") {
      // nested block
      i++;
      if (i < lines.length && lines[i].indent > baseIndent) {
        const child = parseBlock(lines, i, lines[i].indent);
        map[key] = child.value;
        i = child.next;
      } else {
        map[key] = null;
      }
      continue;
    }
    map[key] = parseScalar(rest);
    i++;
  }
  return { value: map, next: i };
}

export function parseFrontmatter(content: string): Frontmatter {
  const { raw, body } = splitFrontmatter(content);
  if (raw === null) {
    return { data: {}, body };
  }
  const lines = tolines(raw);
  if (lines.length === 0) return { data: {}, body };
  const baseIndent = lines[0].indent;
  const { value } = parseBlock(lines, 0, baseIndent);
  const data = (typeof value === "object" && value !== null && !Array.isArray(value))
    ? (value as Record<string, YamlValue>)
    : {};
  return { data, body };
}
