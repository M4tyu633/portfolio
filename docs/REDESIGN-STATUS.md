# Redesign status — September 12, 2026

## Current phase

Implementation, local production validation and publication are complete. All six source repositories were committed and pushed. The portfolio and four standalone project sites are live; eGovMed is packaged inside the portfolio. See DELIVERY.md for exact SHAs, READY deployments, corrected public addresses and live checks.

## Non-negotiable user direction

- Kinetic Gallery replaces the rejected green/gold scrapbook. Do not restore the old art direction.
- Preserve TUMP and eGovMed application appearance. eGovMed has a separate local demo adapter because its hackathon services expired.
- No repository links in the portfolio. Standalone portrait only in About. Actual product captures, not generated mockups or old repeated screenshots.
- About decision cards and credentials need internal padding: 24 px minimum on phones; 34–36 px on desktop. The user explicitly rejected flush-to-edge text.
- Keep one agent QA tab, reuse it and close it when done. Do not close user-owned tabs.
- No other conversations, subagents, paid services, usage resets or new hosting plans.

## Completed work

### Portfolio

- New homepage, navigation, footer and work archive; Barlow Condensed display/Plex UI; charcoal, cobalt and orange gallery identity.
- Original Three.js aperture with 18 metallic blades, pointer/keyboard input, Expand/Contract and Pause/Resume controls. Visibility gating, capped resolution, reduced-motion support and static fallback.
- Updated About and achievement copy, accurate ownership/metrics and real project evidence. Original game asset kit usage is credited accurately.
- New product images and native captures throughout the gallery. Fresh CHIP-8 arcade and inspection states; GlycoSwarm workspace; eGovMed home, booking and payment; CardioSense instrument and contributions; MRI reading room; original TUMP game/video frames.
- eGovMed demo entry is /demos/egovmed/index.html. The explicit filename matters: Next does not serve public directory index files automatically.
- CHIP-8 embed is /chip8/index.html?embed=1, with a full-emulator link, roomy viewport and touch controls. It loads only after the visitor presses Boot.
- Music: full Horizons by Scott Buckley, opt-in, no source/download before play; remembered volume, fades, route continuity, hidden-page pause and media ducking. Same-origin emulator audio activity also ducks gallery music. Full original TUMP menu music recovered and normalized. Credits/scripts are documented in MUSIC.md.
- New share image/favicon and README. Source and capture provenance in PROJECT-MEDIA.md. Added repeatable scripts/check-public-links.mjs.

### Other project checkouts

- C:/Users/matth/chip8: tactile arcade shell, synchronized real C++ state, direct cartridge selection, pause/restart/step, optional inspector/settings, local ROM handling, touch pad, normal Tab escape. Interpreter semantics unchanged. Final complete build copied into web-dist and portfolio/public/chip8.
- C:/Users/matth/egovmed-showcase: original patient UI with deterministic demo adapter, no expired-service calls, identity/booking/payment/messages simulated and labeled. No camera or mic in demo. Final Vite build with relative base copied into portfolio/public/demos/egovmed. Original C:/Users/matth/egovmed was not edited.
- C:/Users/matth/glycoswarm-demo: interactive patient/anatomy/evidence workspace. Original engine/fixtures/contracts retained; missing specialists remain missing; demo indices cannot be presented as clinical risk. Manual rotation, demand rendering, no wheel scroll trap.
- C:/Users/matth/heart-disease-prediction: CardioSense research instrument with clear inputs, actual score and signed contributions, optional advanced inputs, mobile score strip. Inference unchanged.
- C:/Users/matth/knee-web: real uncropped MRI reading room, series rail, zoom/contrast/reset and annotated outputs. Data/inference unchanged. Native dark scrollbars refined after phone review.

## Verified locally

- Portfolio lint, TypeScript and production build: pass.
- All other redesigned project builds: pass.
- CHIP-8 core: 106 checks, zero failures. Browser pause, step, cartridge changes, touch layout and embedded launch verified.
- eGovMed adapter lifecycle test: pass with network requests forbidden. Actual sign-in → symptom → identity → booking → simulated payment flow verified. Packaged static entry/sign-in also verified.
- GlycoSwarm source-contract tests and all 16 availability combinations passed during implementation. Sample switching and missing-specialist UI verified.
- CardioSense age 63 → 70 changed model probability 53.7 → 58.3; reset restored baseline. MRI series switching, next study and zoom/reset verified.
- 12 portfolio routes and 75 local assets/links pass the HTTP smoke check. No repository links in rendered pages.
- Widths 390, 768 and desktop checked. No page overflow on home/About/work/achievements and all six case studies; mobile project apps checked too. Mobile menu opens and closes with Escape.
- Music starts without src and paused; explicit play advances through the 293.37-second file; route navigation preserves time; keyboard volume works and persists. Test ended paused with volume restored to 30 percent. Reduced-motion code reviewed; the sculpture pause/expand controls tested directly.
- Key screenshots are in ignored artifacts/: home-mobile.jpg, about-cards-mobile.jpg, about-cards-final.jpg, new-project-cards.jpg, gallery-share.png. Their purpose is review, not shipping app UI.

## Publication plan and known hosting

- Git-linked production branches: portfolio/main, glycoswarm-demo/main, heart-disease-prediction/main. Push the completed source once and inspect the resulting Vercel deployment for the exact SHA.
- CHIP-8: deploy the already linked C:/Users/matth/chip8/web-dist project (chip8-emulator). No Git integration on that Vercel project.
- Knee: deploy the already linked C:/Users/matth/knee-web project (knee-mri-reader); its existing vercel.json declares Next.js and preserves the existing Python inference function settings. No Git integration.
- eGovMed showcase: push its separate M4tyu633/egovmed-showcase repo; publish its frontend through the portfolio package. Do not deploy over the protected original eGovMed app.
- Authenticated Vercel scope: m4tyu633s-projects. Do not create new paid projects or alter plans.
- Deployment verification and final SHAs are recorded in docs/DELIVERY.md.

## Review resources after completion

The single agent-created Chrome QA tab was closed and the viewport override reset. Auxiliary CHIP-8/eGovMed/GlycoSwarm/CardioSense preview servers were stopped; Knee was already stopped. The portfolio production preview remains available at http://localhost:3100 in session 5878 for local review. Live sites and source commits are listed in DELIVERY.md. No user tabs were closed.
