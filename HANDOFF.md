# Handoff — start here

Paste this whole file to a new AI session, or just point it at the repo. It
covers what this project is, how to change it, and the traps that already cost
time once.

## What this is

Matthew Labrador's personal portfolio.

- **Live:** https://matthewlabrador.vercel.app
- **Repo:** https://github.com/M4tyu633/portfolio
- **Local:** `C:\Users\matth\portfolio`

Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript. Fully
static — no database, no API, no auth. Hosted on Vercel.

## The one rule

**All content lives in `src/content/data.ts`.** Name, bio, projects, skills,
timeline, links, ID-badge text, hero pills — all of it. Components read from
there and never hardcode copy.

"Add a project", "change the bio", "fix a link" → edit `data.ts` and nothing
else. Only touch `src/components/` when changing _how_ something looks or
behaves.

## Owner preferences already established

- **Commits are sole-authored `M4tyu633 <matthewtlabrador@gmail.com>`. Never
  add a `Co-authored-by` trailer.** `user.name`/`user.email` are already set
  locally on this repo.
- He does **not** want the hackathon win as a hero headline. `hero.highlight`
  is deliberately `""`. The gold ribbon on the eGovMed project card and the
  Awards entry stay — he confirmed that explicitly.
- The ₱100,000 eGov Hackathon PH championship is **confirmed accurate**, not
  an estimate.

## Commands

```bash
npm run dev      # port 3100 — 3000 is taken by his eGovMed project
npm run build
npm run lint     # `next lint` no longer exists in Next 16; this calls eslint
npm run format
```

Verify with `npm run lint && npx tsc --noEmit && npm run build` before pushing.

## Deploying

**Auto-deploy is not wired up yet.** `vercel git connect` fails until the
Vercel GitHub App is installed at https://github.com/apps/vercel — that needs
a browser click from Matthew. Until then, deploy manually:

```bash
cd C:/Users/matth/portfolio && vercel deploy --prod --yes
```

Then point the pretty domain at the new deployment:

```bash
vercel alias set <the-new-deployment-url> matthewlabrador.vercel.app
```

⚠️ **Vercel Deployment Protection was ON by default** and served a
"Login – Vercel" page to _every_ visitor on _every_ route — including images
and the resume PDF — while still returning HTTP 200, so a status-code check
looked fine. It has been turned off for this project. If the site ever looks
deployed but shows nothing, check that first (the CLI has no command for it;
PATCH `ssoProtection: null` on the project via the REST API, token at
`%APPDATA%\xdg.data\com.vercel.cli\auth.json`).

## Things that look wrong and are deliberate

**`IdBadge.tsx`** — the draggable ID card on the lanyard. Two traps:

- The strap's SVG spans the whole wrapper with the anchor at a _measured_
  centre. An earlier version used a zero-width SVG relying on
  `overflow: visible`; the path geometry and stroke colour both computed
  correctly and the strap still never rendered. Don't "simplify" it back.
- Flipping drives `spin` to an explicit target with a critically-damped spring
  (`flipTarget`). An impulse cannot work — too little never clears the
  potential barrier at π, too much carries through to 2π, which is the front
  face again. Verified by simulation.
- The clamps (`MAX_SWING_VEL`, `MAX_DRAG_ANGLE`, `MAX_ANGLE`) stop a hard flick
  swinging the card above horizontal. Worst case currently peaks near 71°.

**Theme** — `<html>` ships with `class="dark"` plus an inline script in
`layout.tsx` that reads `localStorage` before first paint. Replacing it with a
`useEffect` reintroduces a flash of the wrong theme. The sun/moon swap is pure
CSS, so there is nothing to hydrate.

**Contact button** — deliberately opens Gmail compose, not `mailto:`. A bare
`mailto:` silently does nothing on a machine with no mail client configured,
which is what he reported.

**React Compiler lint is strict.** It rejects mutating a variable during render
and calling `setState` inside an effect. Both were hit while building the
command palette; derive values instead.

## Testing gotcha

`requestAnimationFrame` is paused in a hidden/background tab, and CSS
transitions read back stale there. In an automated browser check the badge's
transform stays empty and `max-height` looks one step behind — that is the
harness, not a bug. Verify physics by exercising the maths directly rather than
sampling the DOM.

## The resume

`public/Matthew_Labrador_Resume.pdf` is generated from a `.docx`. The editable
source with all current edits is
`C:\Users\matth\Downloads\Matthew_Labrador_Resume_UPDATED.docx`.

To regenerate the PDF after editing the docx:

```bash
"C:/Program Files/LibreOffice/program/soffice.exe" --headless --convert-to pdf --outdir . file.docx
```

LibreOffice is installed but **not on PATH**. The docx skill's
`scripts/office/soffice.py` helper crashes on Windows (`socket.AF_UNIX`) — call
`soffice.exe` directly. It also does PDF→PNG (`--convert-to png`), which is the
only way to actually look at a PDF here; `pdftoppm`/poppler is not installed.

It is tuned to fit **exactly one page**. Adding a bullet will push it to two —
check with:

```bash
python -c "import re;print(len(re.findall(rb'/Type\s*/Page\b',open('out.pdf','rb').read())))"
```

## Still outstanding

1. **Install the Vercel GitHub App** so pushes auto-deploy (one click, above).
2. Three projects still use generated cover art rather than real screenshots:
   CHIP-8, Heart Disease Model, UPLB Code Wars. Regenerate covers with
   `python scripts/make-placeholders.py`; replace with real screenshots by
   dropping files in `public/images/` and pointing `image` at them in
   `data.ts`.
3. `site.url` in `data.ts` should change if he ever gets a custom domain.
