<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## User instructions and current scope

- Work only in this conversation. Never create, fork, message, resume, wake or delegate work to another conversation. Do not use subagents or spend usage in another task.
- Never redeem a usage reset. Ask before optional actions that consume additional credits, including image generation or paid services. Ordinary authorized local editing and verification can proceed.
- The September 2026 request is a complete **visual redesign and copy rewrite** of this existing portfolio, with employability as the purpose. The user delegates design decisions and may be studying; do not interrupt for routine preferences.
- Preserve the existing project facts, routes, downloads and contact destinations. The user subsequently expanded scope to redesign the older project applications, especially CHIP-8, and create clearly labeled interactive demos for eGovMed and GlycoSwarm without expired hackathon APIs. This expansion is authorized. No paid APIs, new CMS or unrelated infrastructure.
- Avoid white and pale default palettes. Give the portfolio a distinct personality beyond a recolored dashboard. Keep the individual project identities.
- Full visual overhaul is authorized. Earlier comments defending the old design are historical context, not restrictions on this redesign.
- The user explicitly requests animation and 3D where useful. Build purposeful dimensional motion while preserving fast reading, accessible controls and reduced-motion fallbacks.
- Verify project visuals against actual assets, source and available demos. Never invent a project interface or use an illustrative diagram as if it were a product screenshot.
- Latest explicit user restrictions: preserve the TUMP and eGovMed application designs; improve all other showcased project sites, prioritizing CHIP-8. eGovMed may still receive a clearly labeled offline demo. Do not put repository links on the portfolio. Internal source inspection remains authorized and required.
- Use Matthew's portrait once in the About context. Do not repeat his face throughout the site or use it as a default hero/background treatment.
- Browser hygiene: keep only one agent preview tab open and reuse it for QA. Close source/research/test tabs when finished; never close the user's own tabs.
- Music is in scope. Use the downloaded, credited soundtrack with opt-in playback, persistent volume, fades, visibility pause and ducking under explicit project audio. The gallery sculpture may react to real measured audio energy. Do not restore the old per-world oscillator loops or noisy hover cues.

## Start here after a compaction

1. Read `docs/RESEARCH-AND-ART-DIRECTION.md` for the current direction, scope and acceptance criteria. The first forest-green scrapbook design was explicitly rejected. Do not revive it.
2. Read `docs/REDESIGN-STATUS.md` for completed changes, verification, blockers and the exact next action.
3. Run `git status --short --branch` and inspect the active diff. Do not discard another session's work or reimplement completed stages.
4. Inspect the current rendered page before revising its appearance. Existing `HANDOFF.md`, `NEXT-PASS.md` and older briefs describe earlier designs; the two REDESIGN documents supersede conflicting visual guidance.
5. Keep the status file accurate after each meaningful phase and before ending a turn. Record actual test results and whether changes are local, committed, pushed or deployed separately.

## Product and content priorities

The reader should quickly learn who Matthew is, what he can build, what he personally contributed, and how to contact him. A recruiter should understand the outcome without specialist vocabulary; an engineer should find concrete implementation decisions in the case study.

- Position Matthew as a software developer and BS Computer Science student at UP Manila. Do not invent employment, seniority, availability dates, clients, testimonials or business impact.
- Use first-person, concrete, confident copy. Remove self-deprecation, inflated claims, meta commentary about the page, and repeated explanations of why the portfolio is honest.
- Lead project summaries with the user problem, personal contribution and substantiated result. Keep detailed caveats where they affect interpretation.
- Tumbang Preso: sole developer of the competition game; BH Studios is the team; 1st Place at Gear Up NCR. Do not claim an unverified national result.
- eGovMed: one of ten winning teams; PHP 100,000 prize; eight government integrations. PGH is a pilot target, not a confirmed deployment.
- GlycoSwarm: AMD hackathon entry, not an award. It is a preserved prototype, not a production clinical service.
- Knee MRI: headline macro AUC is **0.843, strict out-of-fold**. The 0.997 figure is in-sample. Do not conflate them or present AUC as accuracy.
- CardioSense: research demonstration; 0.919 holdout AUC. Do not make clinical claims.
- CHIP-8: existing C++/WebAssembly interpreter and debugger, 35 instructions, 106 assertions, six original ROMs.
- The typed files in `src/content/` are the factual source of truth. Verify before changing numbers or claims. Keep labels consistent with the actual artifact each link opens.

## Visual system

- The current shared concept is the Kinetic Gallery: a sculptural optical 3D centerpiece, charcoal/cobalt/orange light, intentional condensed display type and readable sans-serif UI. The user explicitly rejected the green/gold scrapbook version. This must be a coherent experience, not a palette swap. Follow the current research/specification file.
- Use asymmetry, generous but useful whitespace, varied image scales and actual project captures. Prefer real images in `public/` over decorative stock or generated imagery.
- Homepage: clear introduction and hiring actions, selected work, supporting projects, achievement evidence, short personal introduction, contact. The homepage is a useful overview; case studies carry the deep technical material.
- Project pages retain their distinctive contexts: playful street-game identity, civic blue, clinical teal, phosphor terminal green, radiology grayscale and cardio burgundy.
- Interactions should clarify affordances and reward exploration. No forced intro, cursor replacement, scroll hijacking or content that depends on an animation finishing.
- Keep body text at least 16px where practical. Small metadata must remain legible. Avoid overly tight letter spacing, low contrast and enormous line lengths.
- Reuse the existing CSS world tokens. Keep new redesign composition rules in clearly named sheets/components rather than scattering overriding declarations across old files.

## Repository map and implementation conventions

- `src/app/`: Next.js App Router routes, layout and metadata.
- `src/content/site.ts`, `about.ts`, `achievements.ts`, `projects/*.ts`: identity and typed content.
- `src/components/chrome/`: shared navigation, footer, optional sound and motion.
- `src/components/home/`: homepage presentation.
- `src/components/work/`, `figures/`, `media/`: case studies and working demos.
- `src/app/globals.css`: world palette tokens and shared primitives; `src/app/css/`: composition sheets.
- `public/work/`, `public/images/`: existing real project media and portrait; `public/chip8/`: working compiled demo; resume PDF at `public/Matthew_Labrador_Resume.pdf`.
- Read relevant installed Next.js guides before changing framework APIs. Preserve TypeScript, existing dependencies and the package lock unless a task requires changes.
- Prefer Server Components for static presentation. Client code is for actual interactions. Use `next/image`, correct aspect ratios and `sizes`. Do not eagerly load every project video.
- Preserve keyboard access, real links/buttons, semantic headings, skip navigation, visible focus and reduced-motion behavior. No hover-only access to content or controls.
- Respect current uncommitted changes. No destructive cleanup, rewriting git history or recursive deletion. Do not touch credentials or environment files.
- Keep code comments about lasting behavior and constraints; remove obsolete manifesto-style comments where rewriting a component.

## Validation and delivery

- Run `npm run lint`, `npx tsc --noEmit` and `npm run build` after the final implementation stage. Build and dev should not share the same active output directory concurrently.
- Inspect the homepage, work archive, about, achievements and each distinct case-study layout in the browser.
- Check desktop and phone layouts, intermediate widths where useful, keyboard navigation, mobile navigation, active route state, link targets, images, resume download, optional audio and existing demos.
- Check for horizontal overflow, clipped type, unreadable overlays, empty sections, console errors and content hidden with reduced motion or failed JavaScript.
- Use current browser controls for UI checks. Do not write tests that simply repeat CSS or copy assertions. Tests should cover meaningful behavior only when warranted.
- Keep a local preview available for review. Do not claim production changed without a verified deployment. Any publication decision comes after a concrete, validated result exists.

## Latest visual feedback

The user identified flush text in the About decision cards and credentials panel as unacceptable. All filled panels need deliberate internal padding (24 px minimum at phone width), space between labels, paragraphs and links, and clear vertical rhythm. Inspect computed padding and the actual rendering. Changing a background color without revisiting the box model is incomplete. The latest gallery media must show the redesigned working products, especially CHIP-8.
