# Regenerates the placeholder art in public/images/.
# You won't need this once you've dropped in real screenshots — it exists so the
# site never renders a broken image while the placeholders are still in place.
#   python scripts/make-placeholders.py
import os

OUT = os.path.join(os.path.dirname(__file__), "..", "public", "images")

CARDS = [
    ("project-egovmed", "eGovMed", "1200x750", "#5eead4", "#a78bfa"),
    ("project-tumbang-preso", "Tumbang Preso", "1200x750", "#a78bfa", "#5eead4"),
    ("project-glycoswarm", "GlycoSwarm AI", "1200x750", "#5eead4", "#38bdf8"),
    ("project-chip8", "CHIP-8 Emulator", "1200x750", "#38bdf8", "#a78bfa"),
    ("project-heart", "Heart Disease Model", "1200x750", "#f472b6", "#a78bfa"),
    ("project-codewars", "UPLB Code Wars", "1200x750", "#fbbf24", "#5eead4"),
    ("placeholder", "Your Next Project", "1200x750", "#5eead4", "#a78bfa"),
]

CARD_TMPL = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 750" width="1200" height="750" role="img" aria-label="{title} placeholder">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="{c1}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="{c2}" stop-opacity="0.10"/>
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.06" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="1200" height="750" fill="#0b0d12"/>
  <rect width="1200" height="750" fill="url(#grid)"/>
  <rect width="1200" height="750" fill="url(#g)"/>
  <circle cx="180" cy="150" r="230" fill="{c1}" fill-opacity="0.14"/>
  <circle cx="1030" cy="620" r="230" fill="{c2}" fill-opacity="0.14"/>
  <g font-family="'Space Grotesk',system-ui,sans-serif" text-anchor="middle">
    <text x="600" y="360" fill="#f2f4f8" font-size="62" font-weight="700">{title}</text>
    <text x="600" y="418" fill="#99a1b3" font-size="26">Drop a screenshot in public/images/</text>
    <text x="600" y="456" fill="#99a1b3" font-size="22" fill-opacity="0.7">then point `image` at it in src/content/data.ts</text>
  </g>
  <rect x="24" y="24" width="1152" height="702" rx="20" fill="none" stroke="#ffffff" stroke-opacity="0.10"/>
</svg>
"""

PROFILE = """<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800" role="img" aria-label="Profile photo placeholder">
  <defs>
    <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#5eead4" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#a78bfa" stop-opacity="0.18"/>
    </linearGradient>
  </defs>
  <rect width="800" height="800" fill="#0f1117"/>
  <rect width="800" height="800" fill="url(#pg)"/>
  <circle cx="400" cy="318" r="122" fill="#f2f4f8" fill-opacity="0.20"/>
  <path d="M188 700c0-117 95-212 212-212s212 95 212 212z" fill="#f2f4f8" fill-opacity="0.20"/>
  <g font-family="'Space Grotesk',system-ui,sans-serif" text-anchor="middle">
    <text x="400" y="756" fill="#99a1b3" font-size="30">Add your photo here</text>
  </g>
</svg>
"""


def main():
    os.makedirs(OUT, exist_ok=True)
    for name, title, _size, c1, c2 in CARDS:
        svg = CARD_TMPL.format(title=title, c1=c1, c2=c2)
        with open(os.path.join(OUT, name + ".svg"), "w", encoding="utf-8") as f:
            f.write(svg)
    with open(os.path.join(OUT, "profile-placeholder.svg"), "w", encoding="utf-8") as f:
        f.write(PROFILE)
    print("wrote", len(CARDS) + 1, "placeholders to public/images/")


if __name__ == "__main__":
    main()
