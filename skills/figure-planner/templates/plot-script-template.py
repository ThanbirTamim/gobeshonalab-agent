#!/usr/bin/env python3
"""
Reproducible plotting-script TEMPLATE — GobeshonaLabAgent / figure-planner
================================================================================

HONESTY / PROVENANCE RULE (read first):
    This script MUST read real, verified data from a file. It must NOT contain hard-coded
    measurements, invented numbers, or "estimated" values used to stand in for data. If the
    verified data file does not exist, DO NOT fabricate it — stop and surface the gap in the
    figure spec (data provenance = "GAP — pending data").

    Image-generation tools are NEVER used to produce quantitative charts. Quantitative figures
    come only from this kind of reproducible code over verified data.

Usage:
    1. Copy this file to  plot_<figure-id>.py  inside the project.
    2. Set DATA_PATH to the verified data file (CSV or JSON) produced by experiment-runner
       or supplied by the researcher.
    3. Adjust the column names, chart type, labels (WITH UNITS), and output path.
    4. Run:  python plot_<figure-id>.py
    Re-running after a data or style change regenerates the figure deterministically.

Dependencies (free / open-source): matplotlib, and either the standard library csv module or
pandas. No paid tools are required.
"""

from __future__ import annotations

import csv
import os
import sys
from typing import List

import matplotlib

# Use a non-interactive backend so the script runs headless (CI, servers) and saves to file.
matplotlib.use("Agg")
import matplotlib.pyplot as plt  # noqa: E402

# ---------------------------------------------------------------------------
# CONFIGURE THESE for your figure
# ---------------------------------------------------------------------------
FIGURE_ID = "figX"                       # must match the project config figures[].id
DATA_PATH = "results/figX_data.csv"      # VERIFIED data file — must exist; never fabricated
CHART_TYPE = "line"                      # "line" | "bar" | "scatter"
X_COLUMN = "epoch"                       # column name in the data file
Y_COLUMNS = ["val_loss"]                 # one or more series columns
X_LABEL = "Epoch"                        # include the UNIT where applicable, e.g. "Time (s)"
Y_LABEL = "Validation loss"              # include the UNIT, e.g. "Accuracy (%)"
TITLE = ""                               # usually empty; the caption carries the message
OUTPUT_PATH = f"{FIGURE_ID}.pdf"         # vector output (PDF/SVG) preferred for line/scatter
LOG_Y = False                            # declare log vs linear explicitly in the caption too

# Colorblind-safe palette (Okabe-Ito subset): also pair with distinct markers/linestyles.
COLORS = ["#0072B2", "#E69F00", "#009E73", "#CC79A7", "#56B4E9", "#D55E00"]
MARKERS = ["o", "s", "^", "D", "v", "P"]
LINESTYLES = ["-", "--", "-.", ":", "-", "--"]


def load_rows(path: str) -> List[dict]:
    """Load verified data from CSV or JSON. Fails loudly if the file is missing."""
    if not os.path.exists(path):
        sys.stderr.write(
            f"ERROR: data file '{path}' not found. Do NOT fabricate data to draw this figure.\n"
            f"Mark the figure as 'GAP — pending data' in its spec until verified data exists.\n"
        )
        sys.exit(1)

    if path.lower().endswith(".json"):
        import json

        with open(path, "r", encoding="utf-8") as fh:
            data = json.load(fh)
        if not isinstance(data, list):
            sys.stderr.write("ERROR: JSON data must be a list of record objects.\n")
            sys.exit(1)
        return data

    with open(path, "r", encoding="utf-8", newline="") as fh:
        return list(csv.DictReader(fh))


def as_float(value: str) -> float:
    return float(value)


def main() -> None:
    rows = load_rows(DATA_PATH)
    if not rows:
        sys.stderr.write("ERROR: data file is empty.\n")
        sys.exit(1)

    x = [as_float(r[X_COLUMN]) for r in rows]

    fig, ax = plt.subplots(figsize=(6, 4))  # sized for a single column; stays readable when shrunk

    for i, col in enumerate(Y_COLUMNS):
        y = [as_float(r[col]) for r in rows]
        color = COLORS[i % len(COLORS)]
        marker = MARKERS[i % len(MARKERS)]
        linestyle = LINESTYLES[i % len(LINESTYLES)]

        if CHART_TYPE == "line":
            ax.plot(x, y, label=col, color=color, marker=marker, linestyle=linestyle, markersize=4)
        elif CHART_TYPE == "scatter":
            ax.scatter(x, y, label=col, color=color, marker=marker)
        elif CHART_TYPE == "bar":
            # Simple grouped bars; for many series prefer a dedicated grouped-bar layout.
            width = 0.8 / max(len(Y_COLUMNS), 1)
            positions = [xi + i * width for xi in range(len(x))]
            ax.bar(positions, y, width=width, label=col, color=color)
            ax.set_xticks(range(len(x)))
            ax.set_xticklabels([str(v) for v in x])
        else:
            sys.stderr.write(f"ERROR: unsupported CHART_TYPE '{CHART_TYPE}'.\n")
            sys.exit(1)

    ax.set_xlabel(X_LABEL)   # keep the UNIT in the label
    ax.set_ylabel(Y_LABEL)   # keep the UNIT in the label
    if TITLE:
        ax.set_title(TITLE)
    if LOG_Y:
        ax.set_yscale("log")

    # Chartjunk removal: no top/right spines, no heavy background.
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)

    if len(Y_COLUMNS) > 1:
        ax.legend(frameon=False)  # legend off the data; distinguish by color AND marker/linestyle

    fig.tight_layout()
    fig.savefig(OUTPUT_PATH, bbox_inches="tight")
    print(f"Wrote {OUTPUT_PATH} from verified data {DATA_PATH} ({len(rows)} rows).")


if __name__ == "__main__":
    main()
