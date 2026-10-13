<!--
Figure Specification Template — GobeshonaLabAgent / figure-planner
Fill one copy of this template per figure. Keep it alongside the manuscript so every figure is
traceable to the claim it supports and to its data provenance.

Rules (see skills/figure-planner/SKILL.md):
- CONCEPTUAL figures: use the "Image-generation prompt" section; data provenance = "conceptual
  (no measured data)". The prompt must NEVER request fabricated data, numbers, axes, or measurements.
- QUANTITATIVE figures: use the "Plotting instructions" section; a VERIFIED data file must exist.
  Never hard-code measurements; never invent data.
-->

# Figure Spec: <FIGURE_ID>

| Field | Value |
|-------|-------|
| Figure ID | `<figN or FIGname>` (must match the project config `figures[].id`) |
| Kind | `conceptual` \| `quantitative` |
| Purpose | One sentence: what this figure is for. |
| Supported claim / RQ | The exact claim or research question this figure supports. If none, STOP — do not invent one. |
| Placement | Section + the paragraph that first mentions it. |
| Main / supplementary | `main` \| `supplementary` (never bury an essential, claim-proving result in supplementary). |

## Message (one line)

> State the single message a reader should take away (e.g., "Validation loss drops sharply until
> epoch 10, then plateaus"). This is what the text must explain — not merely "see Figure X."

## Required components and relationships

- Components: <boxes / series / categories / nodes>
- Relationships: <arrows, groupings, ordering, dependencies>
- For charts: x-axis = <quantity + unit>, y-axis = <quantity + unit>, scale = linear | log.
- Series / categories: <list each, with its distinguishing color AND second signal (pattern/shape/label)>.

## Data provenance

- Kind: `conceptual (no measured data)` **OR** `quantitative`.
- For quantitative: data file path = `<path/to/verified_data.csv|json>`, produced by
  `<experiment-runner run id / researcher-supplied>`, verified = `yes | no`.
- If no verified data file exists for a quantitative figure: mark **GAP — pending data**, do not plot.

## Image-generation prompt (CONCEPTUAL figures only)

> Reusable prompt for a compatible image-generation tool. Describe layout, labels, and a plain,
> flat, grayscale-friendly style with no decorative 3D. End the prompt with this guard:
> "This is a conceptual diagram. Do not render any data values, numbers, axis ticks, measurements,
> or chart-like quantitative content."

```
<prompt text here>
```

## Plotting instructions (QUANTITATIVE figures only)

- Script: `plot_<figure-id>.py` (copied from `templates/plot-script-template.py`).
- Chart type: line (trend) | bar (distinct categories) | scatter (two continuous variables) | other — justify.
- Reads data from: `<path/to/verified_data.csv|json>` (NO hard-coded numbers in the script).
- Axis labels + units set: [ ]  Colorblind-safe palette + second signal: [ ]  Error bars/CIs if field expects: [ ]
- Output file: `<figure-id>.pdf` / `.png` (vector preferred for line/scatter).

## Caption and legend

- Caption (self-contained — states axes, number of series, and the message; never just "Results"):

> Figure <N>. <caption text>

- Legend entries: <series/category → label>

## Validation (figure checklist — mark pass/fail)

- [ ] Correct chart type for the data's message.
- [ ] Every axis labeled with quantity + unit; scale (log/linear) declared.
- [ ] Fonts readable at final printed/shrunk size.
- [ ] Chartjunk removed (no 3D, no needless gridlines/backgrounds/colors).
- [ ] Consistent decimal places; no false precision; key row/series highlighted.
- [ ] Caption is self-contained.
- [ ] Understandable in grayscale and for colorblind readers (color + second signal).
- [ ] Passes the stranger test (figure + caption understandable with no surrounding text).
- [ ] Text explains the figure's message, not just "shown in Figure X."
- [ ] Field-specific elements present (scale bar+magnification for images; legend for network
      diagrams; error bars/CIs for comparative statistical graphs; legend/scale/north arrow for maps).
- [ ] Not a duplicate of a table or another figure (adds a distinct message).

## Provenance label (choose one)

- [ ] Verified data figure  [ ] Conceptual illustration  [ ] Illustrative assumption (clearly labeled)  [ ] Proposed/future-work figure (not yet producible)
