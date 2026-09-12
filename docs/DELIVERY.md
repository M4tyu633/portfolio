# Delivery — September 12, 2026

## Live sites

- Portfolio: https://matthewlabrador.vercel.app/
- CHIP-8 within portfolio: https://matthewlabrador.vercel.app/chip8/index.html
- Standalone CHIP-8: https://chip8-emulator-matthew.vercel.app/ and https://chip8-debugger.vercel.app/ (both corrected to the redesigned build); default project alias https://chip8-emulator-lime.vercel.app/
- Preserved eGovMed demo: https://matthewlabrador.vercel.app/demos/egovmed/index.html
- GlycoSwarm: https://glycoswarm-demo.vercel.app/
- CardioSense: https://cardiosense-app.vercel.app/
- Knee MRI: https://knee-mri-reader.vercel.app/

## Source commits pushed

- portfolio/main: 8f852942539cf295b6c2b2316560a24c45876cd6 — complete redesign, copy, authentic media, demos, soundtrack and guidance.
- chip8/main: 07701f65defaef789efd8092035145499923e7f0 — tactile arcade and C++ UI bridge; interpreter semantics unchanged.
- egovmed-showcase/main: 698323698114ed91a29efea23a14d39f5923e99b — original UI with isolated offline adapter.
- glycoswarm-demo/main: 34e5e338b5e6c706cab9ee2f361c0fb5e4f37a78 — interactive specialist workspace.
- heart-disease-prediction/main: edcde37b5e51bc088c2c632e11d40886acb26c23 — CardioSense instrument.
- knee-mri-reader/master: 5266b93f86c8f177ec80da996d4a22151ca00476 — MRI reading room.

## Verified deployment evidence

- Portfolio implementation: dpl_B8GdrgeQevd919qkEGGeppbbseQ6, exact implementation SHA above, production READY.
- GlycoSwarm: dpl_9cF7CpMSuGpnc7ZAun5VVexLzo6Y, exact source SHA above, production READY.
- CardioSense: dpl_JDjVVWjtdZeVppAqxebGZ7su6M4R, exact source SHA above, production READY.
- CHIP-8: dpl_8KstJCacTnzNa3kZcHY6NW9y7Nko, complete verified web-dist uploaded, production READY.
- Knee MRI: dpl_EKdzuuVVrRLb9wPQxzERJRRY1xdJ, source checkout uploaded with existing function configuration, production READY.
- eGovMed ships within the portfolio deployment and retains the original visual UI. The original eGovMed project was not redeployed.

## Address correction

The old matthewlabrador.vercel.app, cardiosense-app.vercel.app and the two historic CHIP-8 addresses were manual aliases still pointing to older builds. Their current aliases were corrected, then the names were added as verified production domains on the proper existing Vercel projects. This prevents the next Git deployment from leaving the original address behind. No domains were bought and no new projects/plans were created.

The [Vercel alias documentation](https://vercel.com/docs/cli/alias) explains why project domain configuration is needed for automatic assignment. All four additions returned verified: true from the project-domain API.

## Checks

Portfolio lint, TypeScript and production build pass. All other changed applications build. CHIP-8 passes 106 core assertions; eGovMed completes its offline lifecycle test with network access forbidden. GlycoSwarm source/availability tests pass. Browser checks covered 390 px, 768 px and desktop, all main pages/case studies, real project controls, mobile navigation and optional soundtrack playback.

The live portfolio passes scripts/check-public-links.mjs: 12 routes, 75 local assets/links, zero failures and zero rendered repository links. Fresh GlycoSwarm and CHIP-8 asset bytes match the prepared local captures. Published About panels have 34–36 px desktop padding and 24 px at phone width.

Review images are retained locally in artifacts/, including live-home.jpg, live-about-spacing.jpg, home-mobile.jpg and the original product captures. Product media provenance is in PROJECT-MEDIA.md; soundtrack provenance is in MUSIC.md.

## Maintenance

Production changes to the Git-linked projects flow through their existing production branches. The CHIP-8 standalone deployment is the linked web-dist folder; include index.html, JS, WASM, data, arcade CSS/JS and the font/license. Knee uses its existing vercel.json and linked project. The eGovMed public entry must include index.html because Next does not implicitly serve directory indexes.

The local portfolio production preview can be started with npm start -- --port 3100. Close agent QA tabs after inspection and keep other user tabs untouched. No usage resets, paid generation, external paid APIs or delegated conversations were used.
