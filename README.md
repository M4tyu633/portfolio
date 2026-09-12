# Matthew Labrador — portfolio

A software developer portfolio built with Next.js, React, TypeScript and Three.js. The Kinetic Gallery combines a procedural metallic aperture, readable project case studies and working browser demonstrations.

## Run locally

Use Node.js 24 and npm. Run npm ci, then npm run dev. Production checks are npm run lint, npx tsc --noEmit and npm run build; npm start serves the production build. Stop the development server before building into the same .next directory.

## Editing

- Start with AGENTS.md and docs/REDESIGN-STATUS.md for current scope and continuity.
- docs/RESEARCH-AND-ART-DIRECTION.md records research, visual decisions and project-specific boundaries.
- src/content holds verified identity, project and achievement facts; src/content/portfolio.ts contains the concise gallery presentation.
- src/components/home/KineticScene.tsx owns the optional 3D aperture. It pauses when hidden, supports reduced motion and includes a static fallback.
- src/app/css/gallery.css owns shared gallery compositions. Individual case studies retain their own palettes and typography.
- public/chip8 contains the actual compiled C++ emulator. Its source is maintained in the separate chip8 checkout.
- public/demos/egovmed contains the preserved patient interface and a fully local, clearly labeled demo adapter. Rebuild it from egovmed-showcase/frontend with Vite base ./.
- docs/PROJECT-MEDIA.md records original source material and fresh captures. scripts/prepare-captures.mjs prepares WebP assets.
- docs/MUSIC.md records the downloaded soundtrack, original game music and playback behavior. Music is opt-in and is not downloaded before a play gesture.

## Product constraints

No repository links in the portfolio. No invented project interfaces, results or employment claims. TUMP and eGovMed retain their original app designs. Historical service demos explicitly identify simulated output. The portrait belongs in About, and every boxed text panel needs generous internal padding.

## Delivery

The existing Vercel portfolio project is the hosting target. Do not create paid services, change plans or redeem credits. Keep source commits and deployment status separate in the status document. Browser QA uses one reusable tab and closes it when finished.
