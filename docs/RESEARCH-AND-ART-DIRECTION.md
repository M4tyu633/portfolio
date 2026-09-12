# Research and replacement art direction

Status: September 12, 2026. Replaces the rejected forest-green journal concept. The user requests a distinctive, immersive experience, original art direction, intentional typography, animation/3D, and substantially more research before another implementation.

## What was researched

These are references, not templates to copy. Inspection depth is recorded to avoid treating a search excerpt as a visual audit.

1. **Niccolò Miranda — https://www.niccolomiranda.com/**. Live DOM and screenshot inspected. The newspaper metaphor dictates huge condensed type, tight editorial columns, image treatment and navigation. Lesson: commit to a complete visual language, not a palette. Do not copy its paper treatment: the user rejected our scrapbook attempt.
2. **Henry Heffernan — https://henryheffernan.com/**. Launched the experience and inspected the real 3D office/computer scene and embedded OS. The world provides depth, interaction and a memorable place. Lesson: spatial composition must feel like one environment. Avoid a mandatory boot sequence and tiny embedded text for hiring content.
3. **Dennis Snellenberg — https://dennissnellenberg.com/**. Live DOM and hero screenshot inspected. Enormous moving name, full-bleed portrait, simple navigation, clear role. Lesson: scale and motion work together; one dominant visual can beat a collage of cards.
4. **Bruno Simon — https://bruno-simon.com/**. Official site, control scheme and implementation notes inspected. Drivable world, interaction, keyboard/touch/gamepad support. Lesson: the experience itself demonstrates skill. Do not require visitors to learn game controls to find a resume.
5. **Lusion — https://lusion.co/**. Official site content and live DOM inspected; screenshot capture timed out. 3D storytelling, featured projects and consistent interaction language. Lesson: design the transition between scenes as carefully as each scene. Do not claim visual details not actually captured.
6. **Paco Coursey — https://paco.me/**. Official content inspected. Concise positioning and direct links to substantive work. Lesson: retain fast access to evidence underneath the spectacle.
7. **Rauno Freiberg — https://rauno.me/**. Official content and project hierarchy inspected. A strong emphasis on interaction craft and focused work categories. Lesson: small interactions need consistent timing and feedback.
8. **Jhey Tompkins — https://www.jhey.dev/**. Official content inspected. Experiments and approachable engineering explanations. Lesson: let an interaction reward curiosity without burying what the person does.
9. **Josh W. Comeau — https://www.joshwcomeau.com/**. Official article index and explanations inspected. Lesson: plain-language explanations can invite nontechnical readers into technical content.
10. **Adham Dannaway — https://www.adhamdannaway.com/**. Official content inspected. Designer/coder split communicates two capabilities through one idea. Lesson: the visual metaphor should make positioning clearer.
11. **Brittany Chiang — https://brittanychiang.com/**. Official content and structure inspected. Direct role, experience, work and resume paths; one typeface. Lesson: this is a useful recruiting baseline, but not the user's requested visual destination.
12. **Michaël Garcia — https://michaelg.fr/**. Official project index inspected. Clear collaboration credits and selective work. Lesson: name personal contribution accurately and keep project selection deliberate.
13. **Samuel Day — https://www.samuelday.de/**. Correct official site confirmed; image-led scroll experience and case-study destinations inspected through page extraction. Not confused with the unrelated architect at samuelday.com.
14. **David Heckhoff — https://david-hckh.com/**. Official metadata/skills content inspected. Browser loading failed; not used for unverified visual decisions.
15. **Patrick Heng — https://patrickheng.com/** and **Samsy — https://samsy.ninja/**. Reachable but extracted content was loading-only/empty; discovery references only, not treated as reviewed designs.
16. Robb Owen, Riccardo Zanutta and Aristide Benoist were also investigated, but blocked pages were not used as factual visual evidence. Cassie Evans's current site is a closing note, not an active portfolio reference.

## What the rejected attempt taught us

- A green background, italic name, tilted screenshots and a curiosity seal do not create the requested experience.
- Repeating the same background across long sections makes the page feel empty, regardless of how refined the individual elements are.
- Paper frames make the project interfaces smaller and the composition busier.
- The original screenshots are insufficient as the only visual material. Some have incorrect filenames or loading states.
- Do not revise that attempt by changing its color. Replace its composition, motion system, type and scene transitions.

## Chosen concept: The Kinetic Gallery

An independent visual world: a dark, sculptural gallery with a moving optical centerpiece. A suspended 3D aperture acts as the recurring identity. It is an abstract geometric sculpture, not a pretend project or fabricated product asset. Its opening/closing and rotation establish a visual language for moving through the portfolio.

The atmosphere is cinematic and tactile: charcoal, cobalt light, warm silver and a concentrated orange signal. Avoid space wallpaper, generic glowing particles, glass dashboard tiles and pastel backgrounds. The sculpture supplies real form, illumination and parallax; the page itself has crisp typography and strong composition.

### First viewport

- Name and role are readable immediately, before WebGL loads. Large, carefully fitted display text, short introduction, work/resume/contact paths.
- A real Three.js geometric aperture occupies a deliberate portion of the canvas. It reacts to pointer movement with restrained inertia and can be paused. Keyboard controls offer the same deliberate interaction.
- The scene never obscures the name, navigation, body copy or buttons. Transparent WebGL layers are decorative, semantic content remains HTML.
- No mandatory loader, sound, intro click or mouse-only navigation. Show a designed static fallback if WebGL is unavailable.

### Sequence and compositions

1. **Arrival:** the aperture settles into position while the name enters once. Keep the full animation under 1.2 seconds; text must be readable at once.
2. **Selected work:** a short optical transition opens onto large, sharply framed project presentations. Each project has its own media plan and layout, no repeating paper cards.
3. **Depth:** one clear project synopsis leads to the complete case study. Explain purpose, ownership and outcome in plain English before technical details.
4. **Recognition:** actual event material and results in an energetic, contrasting composition, with no invented client logos/testimonials.
5. **Person:** portrait and concise biography, paced differently from the project gallery.
6. **Contact:** the aperture returns in a simplified form, tying the last scene to the first. Large, legible contact action and resume path.

### Typography plan

- Display: **Barlow Condensed**, 600/700, used for large structural headings/name only. Its narrow engineered proportions make room for deliberate scale without fragile squeezed letter spacing.
- Reading/UI: existing **IBM Plex Sans**, 400/500/600. Body 16–18px, line-height about 1.65–1.8, useful line lengths of 45–65 characters.
- **IBM Plex Mono** only for actual measurements and small secondary metadata; do not set paragraphs or navigation in tiny widely tracked capitals.
- Do not use the rejected giant italic surname treatment. Avoid a new font for every section.
- Preserve project-native typography where it is part of an actual application (especially TUMP and eGovMed).
- Check actual glyph widths, line breaks and clipping at 390, 768 and 1440 CSS pixels, and with enlarged text.

### Motion and rendering plan

- Three.js imperative renderer, lazy-loaded as an enhancement; cap pixel ratio; pause offscreen and in hidden tabs; dispose geometry/materials/listeners.
- Abstract aperture built from parametric geometry; no paid image generation, no copied third-party assets, no invented project imagery.
- Animate transforms and opacity. Use real depth and light for the centerpiece, concise transitions for content. No infinite ambient DOM dust.
- Respect reduced motion, retain readable server-rendered content, provide a pause control, and keep project/resume navigation functional without WebGL.
- One recurring optical transition language instead of unrelated effects on each component.

## Project application plan

### CHIP-8 — highest priority

Complete visual overhaul into a **1977 micro-arcade instrument**. Charcoal hardware, amber monochrome pixels, tactile orange controls, a large game screen, clear ROM library, and an optional debugger. This is distinct from the portfolio's gallery identity.

- Preserve the C++ interpreter, original six ROMs and native/browser behavior.
- Remove shell-forced debugger opening. Start in playable focus mode; show exactly how to move in the selected game.
- Rebuild the wrapper layout rather than recoloring its current futuristic HUD box.
- Refine the actual Raylib canvas palette/reading hierarchy so the inner application matches the shell.
- Synchronize UI controls with actual C++ state. Existing local JS state drifts; use a small exported state/command bridge, with no changes to instruction semantics.
- Fix ROM selection races, pause-label synchronization and keyboard focus handling as part of the UI pass.
- Provide pause/restart/step, accessible touch controls, proper volume state and local ROM loading.
- Create new images from real running Brix, Pong and debugger states. Do not illustrate pretend register values or reuse the same screenshot everywhere.

### eGovMed — preserve appearance, make a usable demo

User explicitly likes its design. Keep the original React screens, branding, layout and assets. Implement a local deterministic demo adapter where needed so no expired API is required. Demo sign-in, symptom scenario, booking, queue and simulated payment should form a coherent flow. Show a persistent, concise demo notice; no real identity, messages, bookings or payments are submitted.

### TUMP / Tumbang Preso — preserve appearance

Do not redesign the original game or its product identity. Inspect the original competition-build source/assets and actual recordings. Use distinct gameplay, model/UI and event material. Avoid substituting unfinished Unity-port art for the Godot competition build. Current clips and captures have provenance scripts but must be checked individually.

### GlycoSwarm — redesign the interactive preserved demo

Use the sanitized original under `glycoswarm-demo/historical` to verify patient fields, four specialists, topology and available assets. The existing local demo engine has no recorded model outputs; preserve the distinction between demo indices and clinical results. A new readable, interactive workspace should allow sample selection, independent specialist inspection and synthesis replay. Explain clearly that the hackathon compute/APIs are offline and this is a demonstration, not live clinical inference.

### Knee MRI Reader

Redesign the existing station using actual DICOM previews, existing study selection and finding annotations. No fabricated scan slices, model scores or certainty. Keep strict out-of-fold AUC 0.843. Refine image hierarchy, legibility, study navigation and contextual evidence.

### CardioSense

Redesign around the actual local inference and signed contributions. Preserve the distinction between the research benchmark and model running in the browser. Improve control grouping, explanation, hierarchy and charts. No decorative ECG presented as data. Keep research-demo labeling.

## Original-source and media workflow

1. Inspect project-local instructions, git state and original source before editing.
2. Verify the original application structures and visual assets. Record source file, build/version and intended use.
3. Build the new or preserved demo locally.
4. Capture multiple actual states through the supported browser tooling. Never fabricate screenshots or change the application solely to stage false output.
5. Put selected media in the portfolio with useful alt text and explicit demo context where relevant. Use responsive variants and avoid repeating one capture throughout.
6. Keep `docs/PROJECT-MEDIA.md` current. No repository/source links appear on the portfolio, per the user.

## Execution order and finish gate

1. Finish this research/specification pass and original source inventory.
2. CHIP-8 shell, canvas styling and controls; build and play-test.
3. eGovMed offline demo; GlycoSwarm redesign; MRI and CardioSense redesigns.
4. New portfolio experience and full-route copy/presentation, using fresh final project imagery.
5. Lint/type/build where applicable, emulator tests, desktop/mobile/keyboard/reduced-motion checks, working demo flows, no expired endpoints, no repository links.
6. Update status and deliver a reviewable finished result. Never describe a local build as deployed. Ask about any paid/publication action only after the result is concrete, when authorization is actually missing.
