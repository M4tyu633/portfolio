I checked the actual branch at `8cb2971`, not just Claude’s handoff. The handoff is **partly accurate, but it oversells how finished the redesign is**.

The biggest thing Astra should know: Tumbang is now genuinely much better grounded in real footage/assets and has its own bespoke route, which is good.  But **every other project still goes through the same `ProjectHero + Blocks` case-study shell**; the code literally has `BESPOKE = new Set(["tumbang-preso"])`.  Achievements are still essentially a styled results list, and the detail pages use that same numbered-section/Blocks grammar.   The Lab is mostly a list of links back to diagrams elsewhere; CHIP-8 is the only thing that actually runs there. 

Also, Claude says “CHIP-8 screenshot that turns out to be running when you press it” as if that exists. **It doesn’t on the homepage.** The homepage still shows an image and a `Run it` link; the actual emulator is one click away on `/lab/chip-8`.   The current Tumbang asset pipeline is also hardcoded to Claude’s local Windows folders, so it is useful provenance but not reproducible elsewhere without cleanup. 

The social-nav correction **is** implemented properly now: primary routes are text, GitHub/LinkedIn/Facebook/email are icons, Resume is separated. I wouldn’t redo that unless Astra finds a genuinely better composition. 

The prompt below tells Astra all of that while giving it authority to disagree with both me and Claude.

---

```md
# ASTRA FINAL PASS — TAKE OWNERSHIP OF MATTHEW'S PORTFOLIO

Repository:
https://github.com/M4tyu633/portfolio

Work from:
`redesign/archive-of-systems`

Current branch HEAD when this prompt was written:
`8cb29710896d58cef6e50d22824899588a452eee`

Production:
https://matthewlabrador.vercel.app/

---

# FIRST: DO NOT TRUST THE HANDOFF

Claude left a handoff describing what it believes is finished and what remains.

Treat that document as historical context ONLY.

Do not take statements such as:

- “this world is finished”
- “this interaction works”
- “this is the right art direction”
- “this asset is the correct source”
- “this is mobile-ready”
- “this screen has enough spectacle”

as truth simply because they are written in comments or HANDOFF.md.

Inspect the code yourself.

Run the site yourself.

Inspect the project repositories yourself.

Inspect the live products yourself.

Look at the actual screenshots yourself.

Use your own judgment.

You have authority to disagree with both Claude and the previous design prompts.

I want you to FINISH the portfolio, not obey a checklist written by another model.

---

# 1. WHAT I ACTUALLY WANT

The portfolio itself should be one of the strongest projects in the portfolio.

I do NOT want:

a clean developer portfolio.

I do NOT want:

a tasteful technical archive.

I do NOT want:

a better Tailwind résumé.

I want people to encounter parts of the site and genuinely think:

> holy shit, you can do that on a portfolio?

or:

> wait, go back, I want to play with that.

The key idea remains:

# ONE SITE, MULTIPLE WORLDS

The global site connects everything.

Individual flagship projects are allowed to completely transform the browser.

Tumbang Preso should feel like Tumbang Preso.

eGovMed should feel like eGovMed.

GlycoSwarm should feel like GlycoSwarm.

CHIP-8 should feel like a machine.

Achievements should feel like real events that happened to a real person.

About should feel human.

Lab should feel like somewhere you can touch things.

Do not achieve consistency by forcing everything through one component template.

Achieve consistency through:

- taste
- typography discipline
- navigation quality
- transitions
- responsiveness
- accessibility
- interaction quality
- Matthew's voice

---

# 2. YOU HAVE FULL CREATIVE AUTHORITY

You may:

- radically change layouts
- delete interactions that are not good enough
- replace interactions
- rewrite visible copy
- reorder homepage sections
- add routes
- remove routes that serve no purpose
- restructure project pages
- change fonts
- change colors
- change motion
- redesign transitions
- add libraries
- remove libraries
- refactor components
- refactor content architecture
- create additional bespoke project routes
- replace shared shells
- use WebGL
- use Canvas
- use SVG
- use GSAP
- use Motion
- use React Three Fiber
- use native View Transitions
- replace Tailwind in certain surfaces with CSS Modules/custom CSS if that is cleaner
- partially change the stack if there is a real benefit

The current stack is:

- Next.js 16
- React 19
- TypeScript
- Tailwind 4
- Vercel

That stack is not limiting you.

Do NOT migrate frameworks merely because a migration feels more sophisticated.

Add or change technology when the ART DIRECTION requires it.

---

# 3. DO NOT ASK ME TO DESIGN IT FOR YOU

I want your judgment.

Do not repeatedly stop and ask:

“Would you like A or B?”

“Should I use GSAP?”

“Should this be red or blue?”

“Would you prefer this heading?”

Research, inspect the work, make the best decision and execute.

Only stop for information that is genuinely impossible to determine safely.

---

# 4. AUDIT THE ACTUAL BRANCH FIRST

Before redesigning anything:

Run:

```bash
git status
git log --oneline --decorate -15
git diff main...redesign/archive-of-systems --stat
```

Read:

```text
HANDOFF.md
CLAUDE.md
AGENTS.md
```

but again, verify their claims.

Then inspect:

```text
src/app/
src/components/
src/content/
src/lib/
public/work/
public/sound/
scripts/
```

Run:

```bash
npm install
npm run lint
npx tsc --noEmit
npm run build
npm run dev
```

Use the site.

Do not only read the React tree.

---

# 5. IMPORTANT CURRENT FINDINGS YOU SHOULD VERIFY YOURSELF

These are observations from the current branch, not immutable instructions.

## Tumbang Preso

This is currently the ONLY project with its own bespoke project route.

It is significantly closer to the desired direction than the previous pass.

It uses:

- real game footage
- real menu art
- real wordmark
- real competition photos
- real showcase photos
- actual sound assets
- a distinct hero
- a custom long-form composition

Do not casually flatten this back into a universal case-study component.

However, still judge it visually yourself.

If it is not exceptional enough, improve it.

---

## Other project pages

At the moment:

```ts
const BESPOKE = new Set(["tumbang-preso"]);
```

Everything else still uses the dynamic shared:

```text
ProjectHero
+
Blocks
+
numbered sections
+
Colophon
+
next-project footer
```

This is the largest architectural/art-direction weakness remaining.

The earlier brief said different flagship projects should become different worlds.

That requirement is NOT currently fulfilled merely because each project has a different CSS palette.

---

## Achievements

`/achievements` is currently a clean result list.

That is acceptable as an INDEX.

It is not enough as the entire achievement experience.

The Tier A detail pages currently use the same:

number  
heading  
prose  
Blocks

case-study grammar.

They need another creative pass.

---

## Lab

`/lab` currently functions mostly as an index pointing visitors back toward existing diagrams.

CHIP-8 is the one genuinely live instrument.

That means the idea:

> Things you can poke

is currently much stronger than the implementation.

Fix that.

---

## Homepage

The current opening uses a pointer-following “window” through the headline into a strip of the four projects.

It is custom and technically thoughtful.

That does NOT automatically mean it is the right opening.

Use it.

Judge it.

If it genuinely looks incredible and communicates the work, improve it.

If it feels like a clever code demo that somebody has to discover before understanding, replace it.

You have permission.

---

## Navigation

The current navigation correction is directionally strong:

- Work
- Achievements
- Lab
- About

are primary text destinations.

GitHub
LinkedIn
Facebook
Email

are icons.

Resume is separated as a utility.

Do not undo this without a better reason.

---

# 6. RUN A REAL VISUAL REVIEW

Use the existing screenshot tooling if useful:

```bash
bash scripts/review-shots.sh
```

However, do NOT rely solely on automated screenshots.

Actually interact with the app.

Review:

### Desktop
1440 × 900
1920 × 1080

### Laptop
1366 × 768

### Tablet
768 width

### Mobile
390 × 844
360 × 800

Inspect:

- homepage
- each homepage world
- Work
- Tumbang
- eGovMed
- GlycoSwarm
- Knee MRI
- Heart project
- CHIP-8 project
- Lab
- CHIP-8 Lab
- Achievements
- major achievement page
- About
- navigation in each world
- footer/contact
- transitions
- sound controls

Do not call a page finished because its CSS looks reasonable in source.

---

# 7. RESEARCH AGAIN IF THE SITE STILL LOOKS SAFE

If the current site feels like:

“nice editorial developer portfolio”

that is still not enough.

Research strong contemporary examples from:

- Awwwards
- Godly
- SiteInspire
- CSS Design Awards
- experimental personal sites
- game websites
- interactive editorial experiences
- digital exhibitions
- museum sites
- creative coding portfolios
- data storytelling
- WebGL portfolios
- product-launch storytelling

Do not copy layouts.

Study:

- what creates surprise
- how a section takes over the viewport
- transitions between visual languages
- how actual project assets become the UI
- how full-bleed media is composed
- how technically dense work is made interactive
- how calm sections create contrast with spectacle
- how navigation survives an immersive world

Privately choose a handful of useful principles.

Then build.

---

# 8. DO NOT TURN EVERYTHING INTO “THE ARCHIVE”

The archive metaphor works for `/work`.

It can work for `/achievements`.

It should not be the default visual language of every project.

The current design still has a tendency toward:

- ruled lines
- tiny mono labels
- numbered sections
- restrained serif headlines
- centered max-width wrappers
- dossier/facts presentation

This language is fine where appropriate.

It becomes generic when used everywhere.

---

# 9. `/WORK` SHOULD BE THE CALM NEUTRAL SPACE

This is one place where restraint is desirable.

I like the general idea that:

```text
/work
```

is a calm index.

Then:

click Tumbang
→ enter the game

click eGovMed
→ enter the health/civic system

click GlycoSwarm
→ enter the agent system

click CHIP-8
→ enter the machine

The contrast between INDEX and WORLD is useful.

Preserve or improve that concept.

---

# 10. FLAGSHIP PROJECTS NEED BESPOKE ROUTES

Strongly consider giving bespoke routes to at least:

```text
/work/tumbang-preso
/work/egovmed
/work/glycoswarm-ai
```

Potentially:

```text
/work/knee-mri-reader
/work/chip-8-emulator
```

if the content supports enough differentiation.

Do not create bespoke routes simply to satisfy a number.

Create them because the content gives you a better interface.

---

# 11. RULE FOR EVERY PROJECT WORLD

Before designing one:

## FIND THE ACTUAL PROJECT.

Do not design from its description alone.

Inspect:

- repository
- live deployment
- assets
- screenshots
- videos
- diagrams
- UI
- source
- pitch material
- docs
- actual outputs

Then create the art direction.

The browser experience should feel like the project escaped its original application and took over the portfolio.

---

# 12. TUMBANG — AUDIT, THEN PUSH FURTHER

The latest Tumbang page is much better.

It now uses real:

- footage
- key art
- wordmark
- menu screens
- character selection
- event photography
- trophies
- team image

Keep reality as the foundation.

Do not replace those with generated illustrations.

---

# 13. TUMBANG ASSET PIPELINE NEEDS A TECHNICAL CLEANUP

Inspect:

```text
scripts/build-tumbang-media.sh
```

It currently contains hardcoded local Windows paths such as:

```text
/c/Users/matth/Downloads
/c/Users/matth/Documents/GitHub/DOST-GameDev/assets
```

That script is useful as provenance, but it is not portable.

Improve it.

Possible approach:

```bash
GODOT_DIR="${GODOT_DIR:-...}"
DEMO_FILE="${DEMO_FILE:-...}"
TRAILER_FILE="${TRAILER_FILE:-...}"
PICS_DIR="${PICS_DIR:-...}"
EVENT_DIR="${EVENT_DIR:-...}"
FFMPEG_BIN="${FFMPEG_BIN:-ffmpeg}"
```

Give understandable errors when a source is absent.

Do not delete the already-curated public media just because the original source is not mounted.

---

# 14. VERIFY TUMBANG'S ACTUAL FONT

The branch claims the display face corresponds to the game's actual typography.

Verify that against the real Godot assets.

If the exact original game font can legally and technically be used on the web, use it.

If the Google font currently used is merely similar:

do not describe it in code comments as the literal original.

Accuracy over mythology.

Maximum:

**1–2 font families visible on a page.**

Never solve “different worlds” by loading twelve fonts.

---

# 15. TUMBANG'S WOW MOMENT

The current site now shows the game.

Good.

The next question is:

**Can I feel the game?**

Consider using actual game assets for ONE strong interactive moment.

Potentially:

- actual tsinelas / lata render in the throw interaction
- actual character/model entering the page
- game footage becoming an engineering visualization
- cursor/touch manipulating an actual project object
- a gameplay frame pulling apart into netcode / collision layers

If a true 3D interaction using optimized GLB/GLTF assets is excellent, do it.

If 3D makes it slower and uglier than the footage, don't.

A beautiful real clip beats mediocre WebGL.

---

# 16. TUMBANG TECHNICAL VISUALS

The current collision simulator is intentionally abstract.

That is okay.

Keep this separation clear:

### actual game
real footage/assets

### engineering explanation
diagram/simulation

Do not make the engineering diagram masquerade as gameplay.

The current explicit label:

`Engineering visualisation · not the game`

is a good instinct.

---

# 17. eGOVMED IS THE NEXT BIG PRIORITY

The homepage at least uses a real signed-in eGovMed screenshot now.

The full case study does not yet deserve the word “world.”

Build it around the ACTUAL PRODUCT.

First locate and inspect:

- actual eGovMed repository
- live deployment
- actual screenshots
- API adapter architecture
- real visual identity
- actual user flow

Do not assume “government = paper form.”

Do not assume “healthcare = pale blue cards.”

Let eGovMed itself tell you what the page should look like.

---

# 18. POSSIBLE eGOVMED WORLD

Do not follow this blindly.

Use it as an example of the quality level.

The visitor lands in something resembling the REAL patient experience.

A real app screen is visible.

Then it begins to reveal the system underneath it:

```text
SIGN IN
↓
TRIAGE
↓
VERIFY
↓
BOOK
↓
QUEUE
↓
PAY
```

Selecting a stage can reveal:

- what the patient sees
- which government service is involved
- what Matthew implemented
- what can fail
- what the system does about that failure

The case study itself becomes the patient route.

---

# 19. eGOVMED'S BEST MATERIAL IS NOT ITS TECH STACK

The strongest things in the current content are:

- eight real government integrations
- mock/live adapter design
- session replay protection
- Redis compare-and-set
- chain stores hashes, not clinical payloads
- forged payment callbacks remain non-authoritative
- rule-based urgency floor
- defined failure behavior
- testing contradictory API docs instead of guessing

Those are engineering decisions.

Make them visual.

Do not turn them into eight cards.

---

# 20. POSSIBLE eGOVMED “HOLY SHIT” MOMENT

Start with the actual app.

Then let the app decompose into its infrastructure.

For example:

The real patient home UI
→ user selects Start a visit
→ interface spreads apart
→ underneath it appears:

SSO  
AI  
eVerify  
Liveness  
Messaging  
Chain  
Pay  
Report

Then continue the case study.

The actual product should transform into the architecture.

That is much stronger than a diagram beside a screenshot.

---

# 21. GLYCOSWARM NEEDS A REAL WORLD TOO

Current GlycoSwarm is still:

real screenshot  
+
generic shared case-study shell  
+
interactive graph.

That is not enough.

Inspect the real repo and real deployed system first.

The actual graph architecture is appropriate because it is genuinely part of the project.

Use it as a spatial system, not as a figure embedded between paragraphs.

---

# 22. GLYCOSWARM'S POSSIBLE STRUCTURE

Again, creative freedom.

Something closer to:

patient/lab input

→ viewport splits

→ RENAL
→ RETINAL
→ NEUROPATHY
→ CARDIOVASCULAR

→ individual evidence streams

→ synthesis

→ one referral

Let the visitor:

- isolate an agent
- trace its input
- see its responsibility
- see its output
- see what synthesis retained

Use real project data/examples only when appropriate.

No glowing AI brain.

No generic cyberpunk nodes.

No purple neural-network wallpaper.

---

# 23. IMPORTANT: GLYCOSWARM CONTENT IS THIN

The current source itself admits the old site only had a card blurb and the new case-study copy was reconstructed from a small number of documented facts.

Do NOT invent another 1,000 words.

Instead:

inspect the actual GlycoSwarm repository.

Inspect:

- source
- README/docs
- agent prompts/contracts
- StateGraph
- backend
- front end
- model deployment
- evaluation material
- hackathon artifacts

There may be much better real material available than the current `glycoswarm.ts`.

If there isn't:

keep it short.

A short case study with one excellent interactive system is better than AI-generated filler.

---

# 24. CHIP-8 — FIX THE HANDOFF'S OVERCLAIM

The handoff says the best next interaction is:

> the CHIP-8 screenshot that turns out to be running when you press it

At the current HEAD, that is NOT what the homepage does.

The homepage uses a static screenshot and links to `/lab/chip-8`.

The actual emulator runs on `/lab/chip-8`.

Decide whether the promised interaction is actually worth implementing.

I think it potentially is.

Example:

Homepage CHIP-8 world shows what appears to be the debugger screenshot.

A clear but understated affordance appears:

`BOOT`

Press it.

The screenshot seamlessly becomes the real running emulator in place.

That would be a genuinely memorable interaction.

Do not automatically do this if it makes the homepage heavy or unstable.

Dynamic-import/load the machine only on user request.

---

# 25. LAB NEEDS A REAL REWORK

The current Lab has the right title:

**Things you can poke**

but most entries are essentially:

click here to see a diagram on another page.

That is not a Lab yet.

Make `/lab` itself interactive.

Possible direction:

A collection of actual instruments.

Not cards.

Not another archive table.

For example:

### CHIP-8
boot directly

### Tumbang contact lab
run directly

### Tumbang networking explorer
interact directly

### eGovMed route
step directly

### GlycoSwarm topology
explore directly

Not all of them need to load at once.

Use lazy loading / expand-on-demand.

The Lab should feel slightly dangerous in a fun way:

**here are the pieces, touch them.**

---

# 26. ACHIEVEMENTS NEED MORE THAN CLEAN TYPOGRAPHY

The `/achievements` result-sheet index can stay restrained.

The DETAIL experience is where this needs to improve.

A meaningful achievement page should use real event-specific artifacts where possible:

- actual competition photo
- actual ranking
- actual project
- actual screenshot
- actual certificate
- actual stage image
- actual pitch/deck
- actual team photo
- actual scoreboard

No fake trophies.

No stock photography.

No generated “certificate.”

---

# 27. ADD THE MISSING KASPERSKY{CTF} RESULT

The current `achievements.ts` does not contain this.

Add it.

Confirmed details to use:

### Kaspersky{CTF} 2026
Asia & Oceania Regional Stage

Team:
**BHackers**

Matthew competed with:
**Clarence S. Pagaduan**

Result:
**42nd in Asia & Oceania**

Score:
**1,263 points**

Format:
**24-hour competition**

Context:
This was Matthew's first time competing in the event.

Matthew and Clarence were invited to represent:
**UP Manila and the Philippines**

This was not a student-only field.

Do not exaggerate the result.

Do not call it a win.

Do not turn the page into cope about the ranking.

The interesting angle is:

**first international benchmark**

and what it was like entering a field with experienced CTF players/professionals.

If real screenshots, challenge artifacts or ranking evidence are available, use them.

If not, make it a strong Tier B entry rather than manufacturing a fake hacking world.

---

# 28. RE-EVALUATE ACHIEVEMENT TIERS

Do not mechanically follow the current Tier A/B/C assignments.

Use:

### Tier A
there is enough real story + evidence for a strong page

### Tier B
there is a meaningful short story

### Tier C
the result itself is enough

Do not create huge pages because a result “sounds impressive.”

---

# 29. GEAR UP ACHIEVEMENT SHOULD NOT DUPLICATE THE TUMBANG CASE STUDY

These two routes must answer different questions.

### Tumbang page
How was the game built?

### Gear Up page
What happened at the competition?

Use:

- flood
- venue
- team
- pitch
- judging
- result
- nationals

Do not make users read the collision callback story twice.

---

# 30. eGOV HACKATHON ACHIEVEMENT SHOULD ALSO BE EVENT-LED

Project page:

how eGovMed works.

Achievement page:

competition  
team  
what was presented  
what Matthew personally delivered  
judging/demo context  
result

Avoid duplication.

---

# 31. ABOUT IS DECENT COPY, BUT VISUALLY UNDERDEVELOPED

The current About page is intentionally quiet.

I agree with the need for a quiet page.

I do not automatically agree with:

prose  
grayscale portrait  
margin notes  
timeline

being the final answer.

Judge it.

It should feel HUMAN after the project worlds.

Not generic editorial portfolio.

---

# 32. RECONSIDER THIS HEADING

Current:

**The part that doesn't fit in the project cards.**

The redesigned site is explicitly trying to STOP being a project-card portfolio.

That line may now reference a visual model the site no longer has.

Rewrite if it feels stale.

Possible conceptual direction:

**Everything between the builds.**

or something better you devise.

Do not use that line merely because it is written here.

---

# 33. ABOUT SHOULD CONTAIN SOMETHING ONLY MATTHEW COULD HAVE

Potential ingredients already grounded in his work:

- UP Manila CS
- DOST scholarship
- debate background
- math competition background
- building across boundaries
- measuring instead of guessing
- live pitching
- current work
- real photo
- real timeline
- links

Could also include a small “currently” section.

Do not turn it into:

My Values  
My Journey  
My Skills

cards.

---

# 34. COPY IS NOT LOCKED

Rewrite anything that feels AI-written, self-important or generic.

You have permission to make it:

- shorter
- funnier
- more technical
- more personal
- more blunt

depending on context.

Preserve facts.

---

# 35. PARTICULAR COPY TO REVIEW

Homepage:

**I keep picking projects that are slightly unreasonable.**

This is decent.

It is not sacred.

If the visual concept gives you a stronger line, replace it.

---

Current About:

> I also like having receipts.

This makes sense with the site concept, but ensure “receipts” does not become a forced brand word repeated everywhere.

One memorable use is better than seven.

---

# 36. DO NOT OVERUSE TINY MONO LABELS

The site currently enjoys:

```text
01
ROLE
RESULT
BUILT WITH
COLOPHON
```

in small mono type.

That is a useful language.

It is becoming a habit.

Audit it.

If every page starts looking like a design magazine's technical colophon, reduce it.

---

# 37. FONT DISCIPLINE

You may completely change typography.

Rules:

## Per page:
maximum 1–2 meaningful font families.

A sans + its mono sibling can count as one system if they genuinely belong together.

Project-specific display typography is allowed.

Do NOT create:

Tumbang font  
eGov font  
Glyco font  
achievement font  
about font  
navigation font  
body font  
special italic font

all on the same screen.

---

# 38. ANTI-AI-SLOP AUDIT

Before finalizing, actively search for:

- repetitive cards
- bento grids
- pill soup
- random blur blobs
- generic gradients
- glass
- glow
- meaningless 3D
- custom cursor with no purpose
- fake terminal aesthetics
- generic “AI node” diagrams
- giant headings with no composition behind them
- every section having a number
- every section using the same max-width wrapper
- every section fading upward
- endless ruled borders
- excessive tiny uppercase labels
- decorative noise textures
- fake stats
- “premium SaaS” spacing
- template-looking sidebars

Also look for the NEW kind of AI slop:

**over-designed editorial archive slop.**

A website can avoid gradient blobs and still feel generated if every screen uses:

serif heading  
mono metadata  
thin rule  
large whitespace  
paragraph  
diagram

over and over.

Avoid that too.

---

# 39. SOUND — BE SKEPTICAL

The current system includes sound.

Tumbang uses real game cues/music.

That can make sense when opt-in.

CHIP-8's sound can make sense because the machine actually produces it.

For other worlds, the handoff says some sounds are synthesized through WebAudio.

Question whether that adds anything.

Do not manufacture a “sound identity” for eGovMed or GlycoSwarm just because the infrastructure exists.

If it feels gimmicky:

remove those sounds.

Sound should come from the project or from a clearly meaningful interface action.

---

# 40. ROUTE CURTAIN — JUDGE IT, DON'T WORSHIP IT

There is now a curtain transition between worlds.

Use it.

Test:

- desktop
- mobile
- fast navigation
- back button
- forward button
- external links
- modifier click
- reduced motion
- slow hardware

Then answer:

Does this make changing worlds feel intentional?

Or:

Does it feel like a portfolio transition effect?

If the latter, redesign or remove it.

You have authority.

---

# 41. HOME DOES NOT NEED TO SHOW EVERYTHING

The homepage can be shorter.

It needs to:

- introduce Matthew
- create curiosity
- show enough flagship work
- give multiple directions to explore

It does not need to duplicate every project case study.

If the four-world scrolling sequence becomes too long or repetitive, change the model.

Possible alternative:

one spatial/project selector  
+
one or two flagship takeovers  
+
achievement signal  
+
contact

Again, your judgment.

---

# 42. HOME SHOULD NOT BE “JUST A SCROLL WEBSITE”

The site now has real routes, which is good.

Lean into that.

Give people reasons to:

- enter Work
- inspect a project
- open an achievement
- use Lab
- go to About
- follow project ↔ achievement connections

Do not make the homepage contain the entire experience.

---

# 43. CROSS-LINKING SHOULD FEEL INTENTIONAL

Keep:

Project → related achievement

Achievement → project

Lab → source project

About → relevant work where appropriate

Also consider:

Project → related technical experiment

Achievement → next related event

Do not make every page a dead end.

---

# 44. USE ACTUAL PROJECT REPOSITORIES

For EVERY flagship project, locate the repo if accessible.

Do not assume the portfolio content file contains the whole truth.

Cross-check:

- implementation
- README
- architecture
- tests
- screenshots
- documentation
- commits
- assets

If the portfolio copy makes a technical claim and the repository contradicts it:

fix the portfolio.

---

# 45. USE ACTUAL LIVE PRODUCTS

Existing project content contains live deployments.

Open them.

Use their actual visual language.

If a product requires authentication and you cannot capture the real inner UI:

use genuine supplied screenshots.

Do not fake a logged-in screen.

---

# 46. USE GOOGLE DRIVE / REAL VIDEOS WHEN AVAILABLE

Tumbang already has real footage and Drive links.

If more footage materially improves the case study:

use it.

Download and optimize owned media into web-friendly local files where appropriate.

Do not iframe ugly Drive viewers into the designed experience unless there is no better option.

Keep external links to originals.

---

# 47. DO NOT LINK THE WRONG TUMBANG REPOSITORY AS THE WINNING BUILD

There are multiple generations of Tumbang.

The regional competition build was the Godot version.

The later/current rewrite may use Unity.

If you expose source links:

label them truthfully.

Do not imply that the current Unity repository is the exact five-day build that won Gear Up if it is not.

---

# 48. PERFORMANCE BUDGET

You have permission to get technically ambitious.

You do not have permission to make the site miserable.

Use:

- route-level splitting
- dynamic imports
- lazy video
- compressed media
- proper poster images
- optimized textures
- render-loop pausing
- reduced motion
- intersection-based initialization where safe

Do not load Three.js globally because one project uses it.

Do not preload five videos on the homepage.

---

# 49. INTERACTIONS MUST SURVIVE MOBILE

Every wow moment needs a mobile equivalent.

Not necessarily the same implementation.

Examples:

Desktop hover graph
→ mobile tap isolation

Desktop spatial Tumbang throw
→ mobile drag gesture

Desktop debugger hover
→ mobile direct controls

Do not merely disable the interesting thing on phones.

---

# 50. DON'T LET RESPONSIVENESS BECOME A FINAL CLEANUP TASK

Design mobile while designing each world.

Specifically inspect:

- hero crops
- wordmarks
- long headings
- technical diagrams
- nav
- social icons
- touch controls
- video height
- sticky elements
- project transitions
- achievement tables
- iframe sizing

---

# 51. ACCESSIBILITY IS NON-NEGOTIABLE

Keep or improve:

- semantic headings
- keyboard interaction
- visible focus
- reduced motion
- readable contrast
- alt text
- accessible names for icon links
- touch targets
- non-color status communication

Creative does not mean inaccessible.

---

# 52. REALITY TEST FOR EVERY VISUAL

Ask:

**What actual project evidence is this visual based on?**

Good answers:

- real screenshot
- real model
- real footage
- real architecture
- real code
- real measurement
- real game object
- real ranking
- real competition photo
- real UI
- real output

Weak answer:

> the aesthetic seemed appropriate.

Some interpretive art direction is necessary.

But the interesting part should originate in the work.

---

# 53. THE “HOLY SHIT” TEST

Aim for roughly 3–5 unforgettable moments across the entire site.

Not thirty.

Potential examples:

### Tumbang
actual game object becomes interactive / game-to-engineering transition

### eGovMed
actual app decomposes into the government systems underneath

### GlycoSwarm
actual dashboard fans out into the live agent topology and recombines

### CHIP-8
a static-looking debugger boots and becomes the real machine

### Work archive
media/world transforms around the selected project

You may find better ideas.

---

# 54. THE REST SHOULD BE CALM

Contrast is why spectacle works.

Do not animate:

- every paragraph
- every heading
- every line
- every hover
- every page load

Give people time to read.

---

# 55. REVIEW THE ACTUAL WRITING

Read every visible sentence.

Remove generic portfolio language.

Warnings include:

- passionate
- innovative
- cutting-edge
- impactful
- journey
- expertise
- seamless
- leveraging
- robust
- solutions

Not banned individually.

Just suspicious.

Prefer:

- what happened
- what broke
- what was measured
- what was chosen
- what Matthew personally did
- what the result was

---

# 56. DO NOT MAKE MATTHEW SOUND 35

This is a student portfolio.

That is a strength.

Do not rewrite it like a consultancy principal.

He has unusually ambitious student work.

Show that.

---

# 57. HOME / ABOUT / ACHIEVEMENTS SHOULD NOT ALL SOUND THE SAME

Voice can adapt.

Tumbang:
playful + technical

eGovMed:
precise + serious

Glyco:
technical + exploratory

CHIP-8:
nerdy + exact

Achievements:
personal + factual

About:
human

One person can have multiple registers.

---

# 58. FINAL SCREENSHOT WALL

Before calling this finished, make screenshots of:

- homepage opening desktop
- homepage opening mobile
- homepage Tumbang
- homepage eGovMed
- homepage Glyco
- homepage CHIP-8
- Work
- Tumbang project
- eGovMed project
- Glyco project
- CHIP-8 Lab
- Achievements
- Gear Up achievement
- eGov Hackathon achievement
- About

Put them side by side.

Ask:

## Do the projects genuinely look like different worlds?

## Does every screen still obviously belong to one site?

## Are real artifacts doing most of the visual work?

## Does any screen look like AI-generated editorial web design?

## Is any screen boring only because the animation is paused?

If yes:

fix it.

---

# 59. INTERACTION REVIEW

Then test:

- all project transitions
- direct URLs
- refresh
- back/forward
- keyboard
- touch
- reduced motion
- sound on/off
- video autoplay policy
- iframe loading
- slow connection
- route curtain
- hover-to-touch equivalents

---

# 60. TECHNICAL CLEANUP

After design is genuinely finished:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm run format:check
```

Fix actual errors.

Do not silence them.

Check:

- console
- hydration
- 404s
- missing media
- broken internal links
- external links
- image aspect ratios
- metadata
- sitemap
- canonical URLs
- OG rendering
- resume
- contact links

---

# 61. DO NOT PRESERVE COMPLEXITY JUST BECAUSE CLAUDE WROTE IT

Some components are hundreds of lines long.

That is not automatically impressive.

If an interaction is not earning its complexity:

simplify or remove it.

The code should be as sophisticated as the experience requires.

No more.

---

# 62. DO NOT THROW AWAY GOOD ENGINEERING EITHER

Likewise, do not rewrite a working component because you personally would have coded it differently.

Keep good work.

The goal is the site.

Not authorship.

---

# 63. FINAL DEPLOYMENT

Work on:

`redesign/archive-of-systems`

Commit your changes there throughout the work.

Do not destroy `main` while experimenting.

When the site is genuinely production-ready:

1. verify the entire redesign branch
2. make sure it contains latest `main`
3. ensure build/lint/typecheck pass
4. create/verify the Vercel preview
5. inspect the real preview, not localhost only

If you are confident the redesign is clearly superior and production-ready, merge it cleanly to `main`.

Then verify:

https://matthewlabrador.vercel.app/

on production.

If there is any serious unresolved visual or factual issue, do NOT hide it behind a merge.

Fix it first.

---

# 64. AT THE END, GIVE ME ONLY A USEFUL HANDOFF

Do not write a victory essay.

Give me:

### Final URLs
- production
- branch/PR if relevant

### Final commit
SHA

### Biggest changes
5–10 concise bullets

### What you deliberately removed
anything that looked good in code but made the site worse

### Factual uncertainties
only real unresolved facts

### Performance
short note on heavy routes/assets

### Final assessment
one paragraph on whether YOU genuinely believe this now reaches the intended quality bar

---

# 65. LAST INSTRUCTION

You are not here to finish Claude's design.

You are here to finish Matthew's portfolio.

If Claude made something excellent:

keep it.

If Claude made something mediocre:

replace it.

If my suggestions above are weaker than what you can devise:

ignore them and make something better.

Use the actual work.

Use the actual assets.

Use the actual systems.

Give each flagship project the interface it deserves.

Make the portfolio itself evidence that Matthew can build things people remember.
```

### The 5 things I’d personally prioritize for Astra

1. **Bespoke eGovMed + GlycoSwarm pages.** Right now Tumbang is the only page that truly escaped the template. 
2. **Make Lab actually interactive.** At the moment five of six entries mostly bounce you to figures elsewhere. 
3. **Make CHIP-8 “boot in place.”** The real emulator already exists and lazy-loads cleanly, so this is unusually achievable. 
4. **Redo achievement detail experiences + add Kaspersky CTF.** The current achievement system is very clean but still feels like a designed résumé. 
5. **Let Astra judge the opening lens itself.** It’s technically bespoke, but it may still be more “clever interaction” than “unforgettable first impression.” 

Tumbang is the one area where I **wouldn’t tell Astra to start over anymore**. Claude’s second pass actually moved that in the right direction: the page is now using the real footage, UI, event photos, trophy/team media, and it correctly isolates the fake browser physics simulation as an engineering explanation rather than pretending it’s the game. 

The rest is where Astra can go significantly harder.