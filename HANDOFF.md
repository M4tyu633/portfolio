# Handoff

Point a new session at this file and at `CLAUDE.md`.

## What this is

Matthew Labrador's portfolio. Next.js 16 (App Router) + React 19 + Tailwind v4 + TypeScript,
with **motion** for choreography and **lenis** available. Fully static, hosted on Vercel.

- **Live:** https://matthewlabrador.vercel.app
- **Repo:** https://github.com/M4tyu633/portfolio
- **Local:** `C:/Users/matth/portfolio`, `npm run dev` on port **3100**

## Where things are

⚠ **There is no `src/content/data.ts`.** Two redesigns ago there was, and older notes still
say so. Content is one module per project under `src/content/projects/`, plus `site.ts`,
`about.ts`, `achievements.ts`, `worlds.ts` and `types.ts`.

```
src/content/            all copy and config
src/app/globals.css     palette tokens, type primitives, materials, motion vocabulary
src/app/css/*.css       one composition sheet per surface
src/components/chrome/  nav, footer, Ambience, Boot, Choreograph, RouteCurtain
src/components/home/    the opening and the four rooms
src/components/work/    the archive, the link rail, the eGovMed walkthrough
src/components/figures/ the interactive figures, incl. FreezeFigure and the CHIP-8 machine
```

Flagship projects have **bespoke routes** (`src/app/work/<slug>/page.tsx`); the rest are served
by `src/app/work/[slug]/page.tsx`. `/projects/<slug>` and `/lab*` permanently redirect.

## The rules that are not negotiable

- Every project carries **`did`** and **`outcome`**: what Matthew built, and where it went.
  They are printed at reading size on the homepage index and on every /work row. Nothing on the
  site may contradict them.
- **No surface is ever a flat colour.** `components/chrome/Ambience.tsx` paints a different
  room per world. It sits at `z-0`; a rule in globals.css lifts every direct child of
  `<body>` to `z-1`. Giving it a negative z-index hides it behind the body background.
- **Repo links only if public and actually the artifact.** See `src/content/types.ts`.
- **No em dashes** in anything rendered. Grep `—` over `src/` before shipping.
- Commits are sole-authored `M4tyu633`. No `Co-authored-by`, no AI tooling named anywhere.

## Verifying

```bash
npm run lint && npx tsc --noEmit && npm run build
```

React Compiler lint is strict: no ref writes during render, no synchronous `setState` in an
effect body. `src/lib/hydrated.ts` is the sanctioned client-only hook.

`node scripts/shots.mjs .review/wall [baseUrl]` captures every route at desktop and phone.
`node scripts/shot-one.mjs <url> <prefix>` does one page.

## Deploying

Pushing `main` builds production. ⚠ **The alias does not follow.** It served a 16-day-old build
after a green deploy. Always:

```bash
vercel ls --prod
vercel alias set <newest-ready-url> matthewlabrador.vercel.app
```

and confirm with a cache-busted `curl`, not with `vercel project inspect`.

⚠ Tailwind v4's dev server does not notice an appended `@import`ed CSS file. If new rules are
missing, `rm -rf .next/dev` and restart.

## The resume

`public/Matthew_Labrador_Resume.pdf`, generated from
`C:/Users/matth/Downloads/Matthew_Labrador_Resume_UPDATED.docx` via LibreOffice (not on
PATH; call `soffice.exe` directly). Tuned to exactly one page.
