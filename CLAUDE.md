@AGENTS.md

# Matthew Labrador — portfolio

A single-page personal portfolio. Next.js 16 (App Router) + React 19 + Tailwind
CSS v4 + TypeScript. Static — there is no database, no API, and no auth.

## The one rule that matters

**All content lives in `src/content/data.ts`.** Name, bio, projects, skills,
timeline, links, ID-badge text — all of it. Components import from there and
render; they never hardcode copy.

If asked to "add a project", "change the bio", "update my skills" or anything
else about _what the site says_, edit `data.ts` and nothing else. Only touch
`src/components/` when changing _how_ it looks or behaves.

Placeholders are marked `// TODO` in `data.ts`. Leave them until Matthew
supplies the real thing — don't invent project descriptions, dates, or metrics.

## Layout

```
src/content/data.ts      ← all copy + config (edit this first)
src/app/layout.tsx       fonts, metadata, the anti-flash theme script
src/app/page.tsx         section order
src/app/globals.css      colour tokens, dark mode, reveal + hero animations
src/components/          one file per section, plus Icons/Reveal/IdBadge
public/images/           screenshots and photos
scripts/make-placeholders.py   regenerates the placeholder SVGs
```

Sections render in the order listed in `page.tsx`. A section's `id` must match
its `navLinks` entry in `data.ts` or the nav highlight breaks.

## Conventions

- **Server Components by default.** Only `Header`, `Reveal` and `IdBadge` are
  `"use client"` — they need pointer events, IntersectionObserver, or rAF.
- **Colours come from CSS variables**, never literal hex in components. Use
  `text-accent`, `bg-surface`, `border-border`, `text-muted`. The palette is
  defined once in `globals.css` under `:root` and `.dark`; changing `--accent`
  there restyles the whole site.
- **Tailwind v4 syntax.** Gradients are `bg-linear-to-r`, not `bg-gradient-to-r`.
  Dark mode is the class-based `@custom-variant` at the top of `globals.css`.
- Wrap new content blocks in `<Reveal>` so they fade in on scroll. `delay` (ms)
  staggers a row.

## Two things that will bite you

**Dark mode.** `<html>` ships with `class="dark"` and an inline script in
`layout.tsx` reads `localStorage.theme` before first paint. Don't replace that
with a `useEffect` — it reintroduces a flash of the wrong theme. The theme
toggle's sun/moon swap is done with `dark:` CSS variants, not React state, so
there's nothing to hydrate.

**The ID badge** (`IdBadge.tsx`) is a small pendulum sim in a rAF loop that
writes transforms straight to the DOM — deliberately no React state per frame.
The clamps near the top (`MAX_SWING_VEL`, `MAX_DRAG_ANGLE`, `MAX_ANGLE`) exist
so a hard flick can't swing the card above horizontal, which looks broken on a
lanyard. Raising them re-introduces that. The worst case a drag can produce
currently peaks around 71°.

Two things in it that look like they could be simplified, and can't:

- The strap's SVG spans the whole wrapper and the anchor is placed at a
  _measured_ centre. An earlier version used a zero-width SVG relying on
  `overflow: visible` to paint outside its own viewport; the geometry and the
  stroke colour both computed correctly and the strap still never appeared.
- Flipping drives `spin` to an explicit target with a critically-damped spring
  (`flipTarget`). An impulse cannot work: too little never clears the potential
  barrier at π, too much carries straight through to 2π — which is the front
  face again.

## Verifying changes

`npm run dev` runs on **port 3100** (3000 is used by another project).

```bash
npm run lint && npx tsc --noEmit && npm run build
```

`next lint` no longer exists in Next 16 — the `lint` script calls `eslint`
directly.

Note that `requestAnimationFrame` is paused when the browser tab is hidden, so
the badge's transform stays empty and CSS transitions read back stale in an
automated/headless check. That is the harness, not a bug — verify the badge's
physics by exercising the integrator's maths directly rather than by sampling
the DOM.

## Deploying

Pushing to `main` deploys. The Vercel project is connected to this repo, so
the build runs on its own.

The alias is less reliable than it looks. Twice now the new deployment has gone
`● Ready` while `matthewlabrador.vercel.app` still served the previous one more
than two minutes later. Check what production actually serves rather than
assuming, and move it by hand if it is stale:

```bash
vercel ls --prod
vercel alias set <newest-ready-url> matthewlabrador.vercel.app
```

Check with a request, not with `vercel project inspect`, which never prints the
git link. A cache-busting query string avoids reading a stale CDN entry.

It was not always so. Deploys used to be `vercel deploy --prod --yes` followed
by `vercel alias set <new-url> matthewlabrador.vercel.app`, which still works
if you need to ship without pushing.

## Git

Commits are authored **`M4tyu633 <matthewtlabrador@gmail.com>`**, sole author.
Never add a `Co-authored-by` trailer. `user.name`/`user.email` are already set
locally on this repo.
