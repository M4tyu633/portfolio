# Matthew Labrador — Portfolio

My personal site: [matthewlabrador.vercel.app](https://matthewlabrador.vercel.app)

A single-page portfolio with an interactive ID badge, dark/light theming,
scroll-reveal animations, and filterable project cards. Statically generated,
so every page is served as pre-rendered HTML.

---

## Tech stack

| Layer      | Choice                              | Why / what it's doing here                                                                   |
| ---------- | ----------------------------------- | -------------------------------------------------------------------------------------------- |
| Framework  | **Next.js 16** (App Router)         | Static generation, file-based metadata, built-in image + font optimization                   |
| UI library | **React 19**                        | Server Components by default; only 4 components ship JavaScript to the browser               |
| Language   | **TypeScript 5**                    | The content file is typed, so a malformed project entry fails at build instead of at runtime |
| Styling    | **Tailwind CSS v4**                 | Utility classes; theme tokens defined as CSS variables in `globals.css`                      |
| Font       | **Space Grotesk** (`next/font`)     | Self-hosted at build time — no request to Google, no layout shift                            |
| Icons      | Hand-written inline SVG             | No icon dependency; all icons live in `src/components/Icons.tsx`                             |
| Build tool | **Turbopack**                       | Next 16's default bundler                                                                    |
| Linting    | **ESLint 9** + React Compiler rules | `next lint` is gone in Next 16; the `lint` script calls `eslint` directly                    |
| Formatting | **Prettier**                        | Includes the Tailwind class-sorting plugin                                                   |
| Hosting    | **Vercel**                          | Pushes to `main` deploy automatically; PRs get preview URLs                                  |

**Zero runtime dependencies beyond React and Next.** No animation library, no
UI kit, no icon package, no 3D engine — everything below is hand-built.

### What's implemented and how

- **Interactive ID badge** (`IdBadge.tsx`) — the card hanging in the hero is a
  pendulum simulation: gravity, angular damping, a stretchy strap, and a
  separate spin axis, integrated in a `requestAnimationFrame` loop that writes
  transforms straight to the DOM (no React state per frame). It has a real back
  face via `backface-visibility`, so it reads correctly when it settles flipped.
  Drag it, tap it to flip, or focus it and use the arrow keys.
- **Command palette** (`CommandPalette.tsx`) — ⌘K / Ctrl-K to jump to a section,
  open a project's repo, download the resume, copy the email or flip the theme.
  Arrow keys, Enter, Esc, grouped results, live filtering; no dependency.
- **Dark / light theme** — class-based, with an inline script in `layout.tsx`
  that reads `localStorage` _before first paint_, so there's no flash of the
  wrong theme on reload. The sun/moon icon swap is pure CSS, so there is no
  hydration mismatch to handle.
- **Scroll reveal** (`Reveal.tsx`) — one `IntersectionObserver` per block,
  unobserving after it fires. Staggered via a `delay` prop.
- **Active-section nav** — a second `IntersectionObserver` highlights the nav
  link for whichever section is currently on screen.
- **Filterable projects** — curated tag filters defined in `data.ts`; filters
  that no longer match any project are dropped automatically.
- **SEO / sharing** — `opengraph-image.tsx` generates a 1200×630 link-preview
  card at build time with `next/og`, `icon.tsx` generates the favicon, plus
  `sitemap.xml`, `robots.txt`, and JSON-LD `Person` structured data.
- **Accessibility** — semantic landmarks, `aria-label`/`aria-pressed` on
  controls, keyboard support on the badge, and a `prefers-reduced-motion` branch
  that disables the physics loop and all transitions.

---

## Editing the site

**Everything you'd want to change lives in one file:
[`src/content/data.ts`](src/content/data.ts).**

Open it, change the text, save. Your name, bio, projects, skills, timeline,
links and the ID badge all come from there. Anything marked `// TODO` is a
placeholder waiting on you.

### Adding a project

Find the `projects` list and copy the commented-out block at the bottom of it:

```ts
{
  title: "Your Next Project",
  year: "2026",
  featured: false,          // true = big card with an image, false = small card
  blurb: "One or two sentences on what it does and what was hard about it.",
  image: "/images/your-screenshot.png",
  tags: ["Python", "FastAPI"],
  links: { github: "https://github.com/...", demo: "https://..." },
},
```

Leave out any link you don't have and it simply won't render.

### Adding images

Drop the file into `public/images/`, then reference it as
`/images/your-file.png`. Square works best for the photo, roughly 16:10 for
project screenshots.

The current placeholders are generated SVGs — replace them as you go. To
regenerate them: `python scripts/make-placeholders.py`.

### Changing the colours

`src/app/globals.css`, at the top. Change `--accent` and `--accent-2` under
`:root` (light mode) and `.dark` (dark mode) and the whole site follows.

### Updating the resume

Replace `public/Matthew_Labrador_Resume.pdf`. To hide the button, set
`contact.resume` to `""` in `data.ts`.

---

## Project structure

```
src/
  content/data.ts        all copy + config  ← edit this
  app/
    layout.tsx           fonts, metadata, JSON-LD, anti-flash theme script
    page.tsx             section order
    globals.css          colour tokens, dark mode, animations
    opengraph-image.tsx  generated link-preview card
    icon.tsx             generated favicon
    sitemap.ts robots.ts
  components/            one file per section + Icons / Reveal / IdBadge
public/
  images/                screenshots and photos
  Matthew_Labrador_Resume.pdf
scripts/
  make-placeholders.py   regenerates the placeholder SVGs
```

---

## Running it locally

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3100.

## Checking it before you push

```bash
npm run lint && npx tsc --noEmit && npm run build
```

## Deploying

Hosted on Vercel. Pushing to `main` triggers a production deploy; every pull
request gets its own preview URL.
