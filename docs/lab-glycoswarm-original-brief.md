Yeah, I agree on **Lab**. Right now five of the six “labs” are basically case-study diagrams pretending to be standalone experiments. The CHIP-8 emulator is the only one that naturally deserves “go touch this.”

I’d **remove Lab from the primary site entirely**, move the live CHIP-8 machine directly into the CHIP-8 project experience, and keep `/lab/chip-8` only as a redirect/legacy URL if needed.

Send Astra this as an addendum to the handoff:

````md
# IMPORTANT ADDENDUM — REMOVE LAB + BUILD A PRESERVED GLYCOSWARM DEMO

This modifies the previous handoff.

Two decisions are now explicit:

1. The current `/lab` concept should be removed.
2. GlycoSwarm should get its own preserved standalone demo repository that DOES NOT depend on the original hackathon infrastructure.

---

# 1. REMOVE `/LAB` AS A TOP-LEVEL PORTFOLIO DESTINATION

I no longer like the Lab section.

The current Lab contains:

- CHIP-8 emulator
- Tumbang throwing simulation
- collision simulation
- networking explorer
- eGovMed patient route
- GlycoSwarm specialist explorer

Only CHIP-8 genuinely feels like an independent thing someone would visit a “Lab” to use.

The others are explanations belonging to their respective case studies.

They should NOT be artificially grouped together as experiments.

---

# 2. REMOVE LAB FROM NAVIGATION

Primary navigation should become:

```text
Matthew Labrador

Work
Achievements
About

[social utility icons]
```
````

Do NOT leave an empty `Lab` route merely because it already exists.

Do NOT replace it with another vague page such as:

Experiments
Playground
Sandbox

unless genuinely independent experiments are added in the future.

Right now there is not enough material to justify it.

---

# 3. MOVE EACH “LAB” BACK WHERE IT ACTUALLY BELONGS

## Tumbang throwing range

Keep it inside the Tumbang Preso case study where physics / throwing is discussed.

It is an engineering visualization.

It is NOT a standalone project.

---

## Missed-contact visualization

Keep it beside:

**I stopped trusting the collision callbacks.**

It exists specifically to explain that engineering problem.

---

## Networking explorer

Keep it inside the networking section of Tumbang.

---

## eGovMed patient route

Keep it inside the eGovMed portfolio case study.

It exists to explain the system architecture.

It should NOT call the real APIs.

---

## GlycoSwarm specialist explorer

Keep an improved version inside the GlycoSwarm portfolio case study.

It explains the architecture.

---

# 4. CHIP-8 IS DIFFERENT

CHIP-8 is a real standalone executable artifact.

The visitor can actually use the machine.

Therefore:

make the live emulator a FIRST-CLASS part of:

`/work/chip-8-emulator`

rather than making the user leave the project and go to `/lab/chip-8`.

Possible sequence:

```text
CHIP-8

I wanted to understand an emulator,
so I wrote one.

[ BOOT ]

actual machine loads

game framebuffer
registers
disassembly
memory
keypad

then technical case study below
```

The visitor should realize:

**the hero is actually running.**

That is stronger than having a separate Lab.

---

# 5. LEGACY `/lab` URLS

Do not leave broken links.

If currently indexed/shared URLs exist:

`/lab`
can redirect to:

`/work/chip-8-emulator`

or `/work`

depending on what makes more sense.

`/lab/chip-8`
should redirect to:

`/work/chip-8-emulator`

Prefer permanent redirects if appropriate after the redesign is stable.

Update:

- sitemap
- navigation
- cross-links
- metadata
- homepage references
- achievement/project links

so new users never need to encounter `/lab`.

---

# 6. DO NOT DELETE THE USEFUL INTERACTIVE COMPONENTS

Removing Lab does NOT mean deleting:

- ThrowFigure
- ContactFigure
- NetworkFigure
- PatientSystem
- SwarmSystem

if they remain useful.

Relocate/refine them inside the project worlds.

Delete only abstractions that no longer serve the product.

---

# 7. GLYCOSWARM NEEDS A SEPARATE PRESERVED DEMO

The original GlycoSwarm was a hackathon system.

Its original architecture relied on infrastructure that is not guaranteed to exist anymore, including temporary model/API/compute access.

That is NORMAL.

Hackathon infrastructure does not stay alive forever.

Do not make the portfolio look broken because of that.

---

# 8. DO NOT MODIFY OR DEPEND ON THE ORIGINAL GLYCOSWARM REPOSITORY

First locate the actual original GlycoSwarm source or source archive.

Inspect it thoroughly.

Then create a SEPARATE repository for the preserved public demo.

Preferred repository name:

`M4tyu633/glycoswarm-demo`

Alternative if clearer:

`M4tyu633/glycoswarm-preserved-demo`

Use your judgment.

The goal is:

```text
ORIGINAL GLYCOSWARM
historical hackathon source

            ↓ preserve

GLYCOSWARM DEMO
stable public reconstruction
```

Do NOT overwrite the historical project merely to make the portfolio demo work.

---

# 9. CLONE THE REAL PROJECT, DO NOT REINVENT IT

The new demo should originate from the real GlycoSwarm source.

Preserve as much genuine implementation as makes sense:

- data contracts
- specialist structure
- LangGraph topology
- UI concepts
- patient/lab fields
- synthesis behavior
- project terminology
- original architecture documentation

Do NOT make a random fake GlycoSwarm frontend from the portfolio description alone.

Use the real project.

---

# 10. IF GIT HISTORY CAN BE PRESERVED CLEANLY

Prefer:

clone/fork/copy the actual repository while preserving history.

Then build the preserved-demo branch/repository from that.

If the original repository belongs to another team/org or history cannot safely be duplicated:

create a new repository from the actual source snapshot and document provenance clearly in the README.

Do not misrepresent authorship.

---

# 11. THE NEW GLYCOSWARM DEMO MUST NOT REQUIRE DEAD APIS

The preserved public demo must work with:

```text
NO hackathon API credentials
NO MI300X access
NO temporary Ollama host
NO Fireworks key
NO judge infrastructure
NO secret environment variables
```

A fresh Vercel deployment should still be useful.

---

# 12. DO NOT QUIETLY FAKE LIVE INFERENCE

This is important.

If the original inference infrastructure is offline, say so.

Do NOT present predetermined output as:

“AI is analysing your patient…”

when nothing live is happening.

That is misleading.

Use an explicit DEMO MODE.

---

# 13. REQUIRED GLYCOSWARM DISCLAIMER

Place a small but clearly discoverable disclaimer inside the product itself.

Do NOT bury it only inside the README or footer.

Suggested copy:

### Demo mode

**The original hackathon APIs and compute endpoints are no longer online. This preserved demo uses sample inputs and recorded/deterministic outputs to demonstrate how the original GlycoSwarm system worked. It does not perform live clinical inference.**

You may tighten the wording for the UI, but preserve the meaning.

For example, a compact persistent version could be:

> **Demo mode · Original hackathon services are offline. This reconstruction uses preserved sample data and recorded outputs. No live clinical inference is performed.**

This should appear somewhere such as:

- top utility bar
- information drawer
- first-run notice
- small persistent status area

It should be visible without feeling like an error banner.

---

# 14. THE DISCLAIMER SHOULD FEEL INTENTIONAL

Do NOT make it look like:

⚠ ERROR API DOWN

The site is not broken.

This is an intentional preserved demonstration.

Treat it almost like museum/software preservation metadata:

```text
DEMO MODE
Preserved from the 2026 hackathon build
External inference disabled
```

Then explanatory detail available nearby.

---

# 15. GLYCOSWARM DEMO EXPERIENCE

Use a few carefully selected representative cases.

For example:

```text
CASE 01
Low renal signal / elevated cardiovascular risk

CASE 02
Multiple competing signals

CASE 03
Provider unavailable state
```

Only use values supported by the original project/data structure.

Do not invent clinical claims.

---

# 16. USER FLOW

The demo should function something like:

```text
Choose a preserved sample case

        ↓

LAB PANEL

        ↓

fan out

RENAL
RETINAL
NEUROPATHY
CARDIOVASCULAR

        ↓

inspect any specialist

        ↓

see:
inputs
fields
recorded calculation/result
reasoning contract

        ↓

all four converge

        ↓

SYNTHESIS

        ↓

preserved referral/output
```

The graph itself should be the experience.

---

# 17. PROVIDER FAILURE CAN BE DEMONSTRATED WITHOUT AN API

There is a genuinely interesting design principle in the original system:

**unavailable evidence should remain unavailable rather than becoming a fabricated score.**

Turn that into an explicit demo state.

Allow something like:

`Simulate specialist unavailable`

Then visually show:

```text
CARDIOVASCULAR
        ↓
UNAVAILABLE

not

0.00 risk
```

Synthesis receives missing evidence.

This teaches something real about the architecture.

No network call required.

---

# 18. GLYCOSWARM DESIGN SHOULD ALSO BE COMPLETELY OVERHAULED

Use the previous project-site redesign instructions.

Do NOT preserve the existing mass-produced AI dashboard aesthetic.

The central art direction should be:

**clinical data visualization + parallel computation**

not:

**AI SaaS**

No:

- purple gradients
- glowing brain
- neon nodes
- glass cards
- sparkle icons
- generic dashboards
- huge “AI powered” labels

---

# 19. USE TEXTURE CAREFULLY

GlycoSwarm can look rich through:

- scientific plotting grids
- line traces
- anatomical/data annotations
- beautiful numeric typography
- print-like legends
- chart markers
- subtle measurement texture

not fake paper or generic noise.

---

# 20. CREATE NEW GLYCOSWARM PORTFOLIO ASSETS

Once the preserved demo is redesigned and deployed:

capture NEW media.

Do not continue using:

`/images/project-glycoswarm.png`

if the new demo is substantially better.

Create intentionally art-directed portfolio media such as:

```text
public/work/glycoswarm/cover.webp
public/work/glycoswarm/demo.webp
public/work/glycoswarm/topology.webp
```

Potential cover composition:

```text
lab panel
    ↓
four real specialist branches
    ↓
synthesis

+ small fragment of redesigned UI
```

Use REAL demo elements.

Not generated fake UI.

---

# 21. UPDATE THE PORTFOLIO LINK

Once deployed, the portfolio's GlycoSwarm:

`Open the actual dashboard ↗`

wording is no longer correct if it refers to the preserved demonstration.

Change it.

Possible:

**Open the preserved demo ↗**

or:

**Try the interactive demo ↗**

Then near the link make the historical distinction clear.

---

# 22. GLYCOSWARM PORTFOLIO COPY SHOULD EXPLAIN THE DIFFERENCE

Somewhere concise:

> The original hackathon build ran live inference on AMD compute. Those temporary services are no longer online, so the public version preserves the interaction with representative inputs and recorded outputs rather than pretending the original infrastructure still exists.

This actually makes the project MORE credible.

Do not apologize for it.

---

# 23. README FOR THE NEW DEMO

The new repository README should clearly explain:

## What this is

A preserved interactive demo of GlycoSwarm AI.

## Original project

AMD Developer Hackathon 2026.

## Original architecture

LangGraph
FastAPI
Next.js
Gemma / Ollama on MI300X
hosted fallback

## Why the public demo is deterministic

Hackathon-hosted APIs/compute are no longer available.

## What is real

- source-derived architecture
- specialist contracts
- sample data schema
- preserved outputs
- interface
- graph behavior

## What is not happening

- live clinical inference
- live MI300X inference
- clinical validation

---

# 24. DEPLOY IT SEPARATELY

Deploy the new demo to Vercel.

A suitable URL could eventually be something like:

`glycoswarm-demo.vercel.app`

or another available project domain.

Do not break the historical deployment while experimenting.

---

# 25. FINAL NAV STRUCTURE FOR THE PORTFOLIO

After removing Lab, I recommend:

```text
MATTHEW LABRADOR

Work
Achievements
About

[GitHub icon]
[LinkedIn icon]
[Facebook icon]
[Email icon]
| [Resume]
```

Simple.

The site does not need a fourth primary destination merely to fill space.

---

# 26. WHERE DOES CHIP-8 GO?

CHIP-8 remains under:

`Work`

and its project page contains the actual machine.

That is enough.

It does not need:

Work +
Lab

duplicating the same project.

---

# 27. RE-EVALUATE THE HOMEPAGE AFTER REMOVING LAB

Any CTA currently saying:

`More things to try →`

or:

`Lab`

should be changed contextually.

Examples:

GlycoSwarm:
`Try the preserved demo ↗`

CHIP-8:
`Boot the machine`

Tumbang:
`See how the build works`

eGovMed:
`Follow the patient route`

Generic “go to Lab” CTAs should disappear.

---

# 28. UPDATE SITE METADATA

Remove Lab from:

- nav config
- sitemap
- homepage references
- footer
- OG copy where applicable
- structured links
- keyboard navigation
- mobile menu

Do not leave the concept half-removed.

---

# 29. FINAL PRINCIPLE

A portfolio page should contain an interaction when that interaction helps explain the work.

It does NOT need a separate “Lab” collection to justify those interactions.

The work itself is interactive.

That is stronger.

And for GlycoSwarm:

do not leave a broken historical AI project online and pretend its temporary infrastructure is permanent.

Preserve it properly.

Clone the real project.

Build a beautiful deterministic demo.

Clearly say the original hackathon services are offline.

Show exactly how the system worked.

That is the honest and better version.

```

I’d make that an explicit decision now: **kill `/lab`**. CHIP-8 gets even cooler when it’s just unexpectedly live inside its actual case study instead of being quarantined in a “Lab” section.

And for Glyco, the disclaimer is a feature, not an embarrassment. “**Preserved demo · original hackathon infrastructure is offline**” makes way more sense than having an impressive-looking button randomly fail six months after the competition.
```
