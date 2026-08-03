# Generates cover art for projects that don't have a screenshot yet.
#
# These are meant to look deliberate, not like a to-do: no "add an image here"
# text, just the project name over a motif that matches the project. Replace any
# of them with a real screenshot whenever you have one — drop the file in
# public/images/ and point `image` at it in src/content/data.ts.
#
#   python scripts/make-placeholders.py
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")

BG = "#0b0d12"
FG = "#f2f4f8"
DIM = "#99a1b3"


def motif_chip8(c1):
    """A memory/register grid, for the emulator."""
    cells = []
    on = {3, 5, 6, 9, 12, 13, 17, 20, 22, 25, 28, 30, 33, 36, 38, 41}
    for i in range(44):
        x = 150 + (i % 11) * 82
        y = 470 + (i // 11) * 52
        fill = c1 if i in on else FG
        op = "0.55" if i in on else "0.10"
        cells.append(
            f'<rect x="{x}" y="{y}" width="62" height="34" rx="5" '
            f'fill="{fill}" fill-opacity="{op}"/>'
        )
    return "".join(cells)


def motif_ecg(c1):
    """A heartbeat trace, for the heart-disease model."""
    pts = (
        "120,560 260,560 300,560 330,500 360,620 395,430 430,640 465,545 "
        "520,560 700,560 740,560 770,505 800,615 835,440 870,635 905,548 "
        "960,560 1080,560"
    )
    return (
        f'<polyline points="{pts}" fill="none" stroke="{c1}" stroke-width="6" '
        f'stroke-linecap="round" stroke-linejoin="round" opacity="0.85"/>'
        f'<line x1="80" y1="560" x2="1120" y2="560" stroke="{FG}" '
        f'stroke-opacity="0.10" stroke-width="2"/>'
    )


def motif_terminal(c1):
    """A prompt and a caret, for the no-compiler coding competition."""
    bars = []
    for i, w in enumerate([420, 300, 500, 240]):
        bars.append(
            f'<rect x="220" y="{478 + i * 44}" width="{w}" height="16" rx="8" '
            f'fill="{FG}" fill-opacity="{0.16 - i * 0.03:.2f}"/>'
        )
    return (
        f'<text x="150" y="496" fill="{c1}" font-size="34" '
        f'font-family="ui-monospace,monospace" opacity="0.9">&gt;</text>'
        + "".join(bars)
        + f'<rect x="740" y="608" width="16" height="30" fill="{c1}" opacity="0.9"/>'
    )


COVERS = [
    ("project-chip8", "CHIP-8 Emulator", "C / C++ · Raylib", "#38bdf8", "#a78bfa", motif_chip8),
    ("project-heart", "Heart Disease Model", "Python · pandas", "#f472b6", "#a78bfa", motif_ecg),
    ("project-codewars", "UPLB Code Wars", "Algorithms · No compiler", "#fbbf24", "#5eead4", motif_terminal),
    ("placeholder", "Your Next Project", "", "#5eead4", "#a78bfa", None),
]

TMPL = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="1200" height="750" role="img" aria-label="{title}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{c1}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="{c2}" stop-opacity="0.08"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="750" fill="{bg}"/>
  <rect width="1200" height="750" fill="url(#grid)"/>
  <rect width="1200" height="750" fill="url(#g)"/>
  <circle cx="170" cy="140" r="240" fill="{c1}" fill-opacity="0.13"/>
  <circle cx="1040" cy="630" r="240" fill="{c2}" fill-opacity="0.13"/>
  {motif}
  <g font-family="'Space Grotesk',system-ui,sans-serif">
    <text x="80" y="200" fill="{fg}" font-size="66" font-weight="700">{title}</text>
    <text x="82" y="252" fill="{dim}" font-size="26" letter-spacing="2">{sub}</text>
  </g>
  <rect x="24" y="24" width="1152" height="702" rx="20" fill="none" stroke="#ffffff" stroke-opacity="0.09"/>
</svg>
"""


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, title, sub, c1, c2, motif in COVERS:
        svg = TMPL.format(
            title=title,
            sub=sub,
            c1=c1,
            c2=c2,
            bg=BG,
            fg=FG,
            dim=DIM,
            motif=motif(c1) if motif else "",
        )
        with open(os.path.join(OUT, name + ".svg"), "w", encoding="utf-8") as f:
            f.write(svg)
    print(f"wrote {len(COVERS)} covers to public/images/")


if __name__ == "__main__":
    main()
