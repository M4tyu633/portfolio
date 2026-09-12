# Portfolio redesign — September 2026

**SUPERSEDED VISUAL DIRECTION:** The user rejected the forest-green journal implementation. Read `RESEARCH-AND-ART-DIRECTION.md` for the current, research-led Kinetic Gallery concept and revised project scope. The historical plan below is retained for context; it is not the approved visual direction.

## Objective and scope

Scope expansion from the user during implementation: also redesign the older project sites, with particular attention to CHIP-8. eGovMed and GlycoSwarm must have interactive, clearly labeled demos that work without expired hackathon APIs. Inspect existing showcase/demo repositories first, preserve their source-derived behavior, and update the portfolio captures to match the final apps. This explicitly supersedes the initial restriction against modifying the project sites. All work stays in this conversation and no paid services are authorized.

Make Matthew Labrador's existing portfolio memorable, credible and useful to hiring managers, recruiters and engineers. The user gives full creative control and asks for a thorough plan before implementation, persistent repository guidance, and a complete visual and copy overhaul. Latest scope: **website design and text**, with existing functionality preserved.

Repository: `C:\Users\matth\portfolio`. Live site: https://matthewlabrador.vercel.app/. Baseline commit: `dd09c17`, clean `main` at the start. Existing Next.js 16 / React 19 / Tailwind 4 implementation and Vercel hosting stay in place.

## Audit conclusions

- The source already has unusually strong evidence: an award-winning multiplayer game, a winning government hackathon entry, AI prototypes, evaluated ML work and a functioning browser emulator.
- The homepage leads with a long self-deprecating statement over darkened game imagery. Matthew's identity, practical strengths and contact actions receive less attention than the visual effect.
- Six long project worlds repeat material from the case studies and create a large reading commitment before visitors reach the person and contact section.
- The monochrome shared identity, many tiny labels and dense project index make the work feel distant. The full-screen transitions compete with content.
- The copy often explains its own honesty, emphasizes time pressure and calls the work scattered or unreasonable. Concrete ownership and results would make a stronger hiring case.
- Existing project assets, detailed engineering decisions and differentiated project themes are valuable. Reuse them; do not fabricate proof or rebuild the demos.

## Research translated into decisions

- [Paco Coursey](https://paco.me/): concise positioning and direct paths to substantive work. Apply brevity and clarity, not the visual style.
- [Bruno Simon](https://bruno-simon.com/): the website demonstrates the skill being offered. Retain the real playable and technical demonstrations inside accessible project pages; no mandatory game navigation.
- [Josh W. Comeau](https://www.joshwcomeau.com/): approachable voice and interactive technical explanations. Present concepts in plain language before specialist detail.
- Cassie Evans's current site was checked, but its current closing note is not treated as an active portfolio design reference.

## Art direction: a maker's journal

User follow-up: use animation and 3D where useful, and verify every project's actual visual elements instead of guessing. The opening will use a pointer-responsive CSS 3D spread of genuine project captures, with keyboard-operable selection and a reduced-motion fallback. No paid generated assets are needed. Inspect every reused screenshot and compare it with available source/demo evidence; record provenance in `docs/PROJECT-MEDIA.md`. The user will be AFK: complete independent work and defer nonessential questions until delivery.

A tactile, editorial portfolio with deep forest-green stock, warm gold display type, copper details and real project imagery. Large Newsreader serif headlines and IBM Plex body text retain warmth without looking like a software dashboard. Fine rules, catalogue numbers, small annotations and asymmetrical photo composition make it feel considered and personal. No pale default background, glass cards, generic purple gradients or excessive decorative animation.

The home silhouette: a clear masthead; introduction beside a composed spread of real work and team photography; an immediate strip of verified highlights; a large selected-work heading; four varied project presentations; a compact research pair; an achievement photograph and results; a short portrait-led introduction; a strong contact close. Preserve the name, role and contact/resume actions early.

The main visual focus is the work. Give screenshots room, use contained crops for interfaces, let game footage carry the game, and keep achievement photography documentary. The project pages keep their own color and typography identities rather than inheriting a green template.

## Copy strategy

1. Introduce Matthew as a software developer and UP Manila computer science student. State what he builds in a sentence a recruiter can understand.
2. Pair each project with purpose, personal role and real result. Use short project-specific headlines rather than generic capability claims.
3. Keep engineering detail available: netcode and physics decisions, service boundaries, agent architecture, model evaluation and debugger behavior.
4. Remove lines implying incompetence, filler about deadlines, design commentary and repeated claims of honesty. Preserve personality through concrete experiences and curiosity.
5. Keep all factual qualifiers. No invented awards, production users, clinical validation, employment or nationwide results.
6. Close with a clear invitation for internships, research and software collaborations, plus existing email, GitHub, LinkedIn and resume destinations.

## Execution sequence

### 1. Establish continuity

Expand root `AGENTS.md`; create this plan and `REDESIGN-STATUS.md`. Preserve the generated Next.js instructions and user restrictions. Read relevant installed framework docs and inspect repository and live page.

### 2. Build the new front door

Replace homepage composition and text, using existing assets and content. Establish scoped journal styles and shared forest/gold palette. Refine navigation and footer, keeping their existing actions. Remove the obsolete full-screen home presentation from the rendering path; leave interactive demos on their existing project routes.

### 3. Carry the design through the site

Improve Work, About, Achievements, Lab and error-page presentation. Rewrite their copy. Refine case-study openings and reading hierarchy while preserving each project identity, deep sections, anchors, next-project links and functionality. No application/backend changes.

### 4. Verify and refine

Run lint, TypeScript and production build. Inspect responsive layouts at approximately 1440px, 768px and 390px. Review all distinct routes and meaningful interactions. Fix actual visual and usability problems, then rerun only affected checks.

### 5. Handoff

Update status with exact files, results, remaining issues and local preview URL. Provide the user a concise summary and reviewable result. Keep local/committed/pushed/deployed states explicit; publishing is not assumed complete from a successful build.

## Acceptance criteria

- Within the first viewport, a stranger can identify Matthew, understand his focus and find work/contact/resume paths.
- The portfolio has a recognizable visual personality with no reliance on a fullscreen effect or lengthy interaction before content is readable.
- Every project has a useful plain-English explanation and an accurate personal contribution/result.
- Real images are clear and purposeful; the page works on phone and desktop without overflow or awkward text wrapping.
- Navigation, resume, links, diagrams, emulator and optional sound still work; reduced motion and keyboard users can read and navigate everything.
- Existing route paths and project factual claims remain consistent. Clinical research and preserved-demo qualifiers remain accurate.
- Build, lint and TypeScript checks pass. Visual review is recorded separately from automated checks.
- Continuity files reflect the actual final state, not intended completion.
