/* ============================================================================
 *  ⚙️  THIS IS THE ONLY FILE YOU NEED TO EDIT.
 *
 *  Everything on the site — your name, bio, projects, skills, links, photos —
 *  is read from this file. Change a string here, save, and the page updates.
 *
 *  Anything marked  // TODO  is a placeholder. Swap it for the real thing.
 *  Images live in  public/images/  — drop a file there and reference it as
 *  "/images/your-file.png".
 * ========================================================================== */

/* ---------------------------------------------------------------------------
 * 1. WHO YOU ARE  — the hero section at the top of the page
 * ------------------------------------------------------------------------ */
export const site = {
  // Used for the browser tab title and search results.
  title: "Matthew Labrador · Portfolio",
  description:
    "CS @ UP Manila. I build multi-agent AI, civic tech, and games, from LangGraph clinical swarms to a CHIP-8 emulator written from scratch.",
  // Used for link previews, the sitemap, and structured data. Update this to
  // your real domain after the first Vercel deploy.
  url: "https://matthewlabrador.vercel.app",
  // Shown on the social/link-preview card.
  ogTagline: "AI & Multi-Agent Systems · Civic Tech · Games",
};

export const hero = {
  greeting: "Hi, I'm",
  name: "Matthew Labrador",
  // The line under your name. Keep it short — it's big on screen.
  roles: ["AI & Multi-Agent Systems", "Civic Tech", "Games"],
  tagline:
    "CS student at the University of the Philippines Manila. I build things that ship: multi-agent clinical AI, a triage system aimed at shortening hospital lines, and a 4-player Filipino street game.",
  // The two small pills above your name. Set either to "" to hide it.
  status: "Open to internships & research",
  highlight: "🏆 1st Place · Gear Up NCR Game Dev 2026 · On to Nationals",
  // Your photo. Drop a square image in public/images/ and point here.
  photo: "/images/profile.jpg",
  primaryCta: { label: "Get in Touch", href: "#contact" },
  secondaryCta: { label: "View Projects", href: "#projects" },
};

/* ---------------------------------------------------------------------------
 * 1b. THE ID BADGE — the card hanging from the lanyard in the hero.
 *     Drag it with the mouse and it swings and spins. Flip it to see the back.
 * ------------------------------------------------------------------------ */
export const badge = {
  org: "University of the Philippines Manila",
  orgShort: "UP MANILA",
  name: "Matthew Labrador",
  role: "BS Computer Science",
  // Shown as small rows on the front of the card.
  fields: [
    { label: "Program", value: "BSCS '29" },
    { label: "Status", value: "University Scholar" },
  ],
  photo: "/images/profile.jpg",
  // Text on the back of the card.
  backNote: "DOST Undergraduate Scholar",
};

/* ---------------------------------------------------------------------------
 * 2. CONTACT + SOCIAL LINKS
 * ------------------------------------------------------------------------ */
export const contact = {
  email: "matthewtlabrador@gmail.com",
  location: "Manila, Philippines",
  // Set to "" to hide a link entirely.
  github: "https://github.com/M4tyu633",
  linkedin: "https://www.linkedin.com/in/matthew-emmanuel-labrador-6b52703a4/",
  facebook: "https://www.facebook.com/matthewtlabrador/",
  // The Resume button. Set to "" to hide it.
  // To update: replace public/Matthew_Labrador_Resume.pdf with a new export.
  resume: "/Matthew_Labrador_Resume.pdf",
  blurb:
    "I'm open to internships, research work, and hackathon teams. The fastest way to reach me is email.",
};

/* A plain `mailto:` silently does nothing on a machine with no mail client
 * configured, which is most people on a laptop. Opening Gmail's compose window
 * works in any browser, and the copy button covers everyone else. */
export const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  contact.email,
)}`;

/* ---------------------------------------------------------------------------
 * 3. ABOUT — the short story next to your photo
 * ------------------------------------------------------------------------ */
export const about = {
  heading: "About Me",
  // Each string is its own paragraph.
  paragraphs: [
    "I'm a BS Computer Science student and University Scholar at UP Manila, and a DOST Undergraduate Scholar. Before that I was class valedictorian at PAREF Southridge School.",
    "Most of my work sits where AI meets something physical and messy: hospital queues, patient lab data, a street game played with a tin can. I like problems where the model is only half the answer and the rest is systems design.",
    "Outside of code I spent three years as a competitive debater, which is still the most useful thing I've done for explaining technical work to people who don't share my context.",
  ],
  // Small stat cards. Keep to 3–4 or the row gets cramped.
  stats: [
    { value: "1.0375", label: "Cumulative GWA" },
    { value: "2029", label: "Expected BSCS" },
    { value: "6+", label: "Shipped projects" },
    { value: "₱100k", label: "Hackathon grand prize" },
  ],
};

/* ---------------------------------------------------------------------------
 * 4. WHAT I DO — the card grid
 * ------------------------------------------------------------------------ */
export type Service = { icon: IconName; title: string; body: string };

export const services: Service[] = [
  {
    icon: "agents",
    title: "Agentic AI",
    body: "Multi-agent systems with LangGraph and LangChain: parallel specialist agents, tool use, and synthesis stages that produce one ranked answer.",
  },
  {
    icon: "brain",
    title: "Machine Learning",
    body: "Supervised models end-to-end in Python: cleaning, feature engineering with pandas, and honest evaluation past raw accuracy.",
  },
  {
    icon: "server",
    title: "LLM Deployment",
    body: "Running open models locally and on GPU. Gemma and GLM via Ollama, served through FastAPI with failover when a provider drops.",
  },
  {
    icon: "chip",
    title: "Systems & Low-Level",
    body: "C and C++ close to the metal. Wrote a CHIP-8 emulator from scratch, plus a visual debugger to watch registers and memory live.",
  },
  {
    icon: "gamepad",
    title: "Game Development",
    body: "Godot and GDScript, including authoritative-host networked multiplayer where every contact call has to resolve the same way on all peers.",
  },
  {
    icon: "chart",
    title: "Data & Analysis",
    body: "Turning raw datasets into something decidable: statistical analysis, prompt evaluations across model versions, documented findings.",
  },
];

/* ---------------------------------------------------------------------------
 * 5. PROJECTS  ← the part you'll edit most
 *
 *  featured: true  → big card with an image
 *  featured: false → compact card in the grid below
 *
 *  image: drop a screenshot in public/images/ and point here.
 *  tags:  keep to 3–5, they're the little pills on the card.
 *  links: any you leave out simply won't render.
 * ------------------------------------------------------------------------ */
/* The long-form write-up behind a project card. A project with a `caseStudy`
 * gets its own page at /projects/<slug> and a "Case study" link on its card.
 * Leave it out and the card behaves exactly as it always has. */
export type CaseStudy = {
  // One paragraph under the title. Say what it is and why it was hard.
  intro: string;
  // The small facts panel: role, team, dates, whatever is worth stating flatly.
  facts: { label: string; value: string }[];
  // The body. Each entry is a heading and one paragraph per string.
  sections: { heading: string; body: string[] }[];
  /* Mounts an interactive panel above the body. "chip8" is the only one wired
   * up — it serves the WebAssembly build from public/chip8/. */
  embed?: "chip8";
};

export type Project = {
  title: string;
  // Used for the case-study URL, /projects/<slug>. Lowercase, hyphenated.
  slug: string;
  blurb: string;
  year: string;
  image: string;
  tags: string[];
  featured?: boolean;
  caseStudy?: CaseStudy;
  /* How the image sits in its 16:10 frame.
   *   "cover"   (default) fills the frame and crops any overflow. A 16:10
   *             source fills it exactly, so nothing is lost. Screenshots are
   *             easiest to keep at 16:10 when you take them.
   *   "contain" shows the whole image on a padded backdrop, never cropping.
   *             Use it when the source is not 16:10 and cropping would eat
   *             something that matters, which in practice means logos. */
  fit?: "cover" | "contain";
  // Optional. Renders a gold ribbon on the card. Leave it out for no ribbon.
  award?: string;
  /* Any you leave out simply won't render. `trailer` and `gameplay` are for
   * projects that can't be deployed, like the game. */
  links?: {
    demo?: string;
    trailer?: string;
    gameplay?: string;
    more?: string;
  };
};

/* The filter buttons above the project grid. Each must match a tag used below,
 * spelled identically. Leave the array empty to fall back to auto-picking the
 * tags that appear on more than one project. */
export const projectFilters: string[] = [
  "Next.js",
  "LangGraph",
  "Python",
  "C/C++",
  "Godot 4",
  "Multiplayer",
];

export const projects: Project[] = [
  {
    title: "eGovMed",
    slug: "egovmed",
    year: "2026",
    featured: true,
    award: "🏆 Champion · eGov Hackathon PH 2026 · ₱100,000",
    blurb:
      "Winner of the eGov Hackathon PH 2026 and its ₱100,000 grand prize. An AI triage system for Philippine public healthcare, built with the Bisaya Hackers team. Patients are assessed and routed before they queue, so the line itself gets shorter. Integrates the government's eGov API stack: AI triage, messaging, reporting, identity, and payments.",
    image: "/images/project-egovmed.png",
    fit: "contain", // a logo, so cropping it just cuts the wordmark in half
    tags: ["Next.js", "Node.js", "eGov APIs", "AI Triage"],
    links: {
      demo: "https://egovmed-frontend.vercel.app/",
    },
    caseStudy: {
      intro:
        "A patient at a Philippine public hospital re-enters the same details at every counter, repeats labs another facility already ran, and queues a second time to pay. eGovMed puts one login, one record and one payment in front of all of it, built on the government's own eGov API stack. It won the eGov Hackathon PH 2026 and its ₱100,000 grand prize.",
      facts: [
        { label: "Team", value: "Bisaya-Hackers, UP Manila" },
        { label: "Event", value: "eGov Hackathon PH 2026" },
        { label: "Result", value: "Champion · ₱100,000" },
        { label: "Pilot target", value: "Philippine General Hospital" },
        { label: "Stack", value: "React + Vite · Node/Express · Redis · Besu" },
      ],
      sections: [
        {
          heading: "The flow",
          body: [
            "A patient signs in with an eGovPH account and the profile auto-fills from SSO. They describe symptoms in English, Tagalog or Taglish, and triage returns a specialty, an urgency level and any red flags. Identity is confirmed with consent through a face liveness capture and a PhilSys demographic match, then the appointment is booked and a queue number issued with an SMS confirmation. The bill settles through the unified government gateway with statutory discounts already applied.",
            "The point of the ordering is that assessment happens before the queue rather than inside it. Routing a patient to the right specialty and urgency up front is what makes the line shorter, not another screen for joining it.",
          ],
        },
        {
          heading: "Eight government APIs, two modes each",
          body: [
            "The build integrates eGovPH SSO, eGov AI, National ID eVerify, Face Liveness, eMessage, eGovChain, eGovPay and eReport. Every adapter carries both a mock and a live path, chosen per service by an environment variable, so the whole product runs offline with no credentials and a sandbox outage never takes the demo down.",
            "That switch is also a safety gate. With mocks disallowed in production the app refuses to boot if any integration is still mocked or missing credentials, and it names the offender. A silent mock cannot quietly serve fake triage or fake payment data to a real patient.",
            "The two portal docs contradicted each other on where the face liveness session ID comes from. We settled it by testing instead of reading: querying eVerify with a real completed hosted session, and again with a random UUID as a control, produced byte-identical error responses. Without the control query the first result would have been unreadable, because a rejection could just as easily have meant a bad demographic match.",
          ],
        },
        {
          heading: "Built for real patient data",
          body: [
            "The threat model assumes real health information, so most of the engineering went here rather than into features. Records are encrypted at rest with a versioned envelope, and the decryptor reads both formats so a schema change never orphans existing data. On-chain anchoring is hash-only — payloads are stripped to a type and a timestamp before submission, so no patient ID, facility or clinical content ever reaches the chain, which is what the Data Privacy Act requires.",
            "Liveness sessions are single-use, patient-bound and expire in ten minutes, claimed through a Redis compare-and-set so two simultaneous replays resolve to exactly one success and one rejection. Payment callbacks are treated as non-authoritative: a forged one returns 202 and writes nothing. The SSRF guard lives at the transport rather than the call site, so a later refactor cannot reintroduce the hole by forgetting it in one place.",
            "Failure behaviour is chosen rather than inherited. Anchor writes fail closed, so an unverifiable record is never stored. Anchor verification fails safe, so an RPC error shows unverified rather than a green badge. A failed SMS never fails a booking. The triage classifier keeps a rule-based floor that can only raise urgency and never lower it, in live mode as well as mock, so a degraded or hostile model response cannot downgrade an emergency.",
          ],
        },
        {
          heading: "Verification",
          body: [
            "Thirty backend security regression tests have to pass before a merge, including a concurrency test for the replay path and one asserting that message bodies never reach the audit log. CI runs the suite, dependency audits on both packages, CodeQL on the security-extended query set, and a secret scan. Branch protection on main requires all of it and blocks force-pushes.",
          ],
        },
      ],
    },
  },
  {
    title: "Tumbang Preso",
    slug: "tumbang-preso",
    year: "2026",
    featured: true,
    // TODO: no case study yet. Copy the `caseStudy` block from eGovMed above,
    // fill it in, and the card grows a "Case study" link on its own.
    award: "🏆 1st Place · Gear Up NCR Esports Game Dev Challenge 2026",
    blurb:
      "1st place at the Gear Up NCR Esports Game Dev Challenge 2026, advancing to the national finals in General Santos City. A 4-player online multiplayer take on the Filipino street game, built in Godot. Four rounds, one taya defending the can against three attackers, with the defender role rotating so everyone defends exactly once. Networked with an authoritative host, so contact is resolved by distance on the host and tags and throws agree across every peer.",
    image: "/images/project-tumbang-preso.jpg",
    tags: ["Godot 4", "GDScript", "Multiplayer", "Blender"],
    links: {
      trailer:
        "https://drive.google.com/file/d/15yPUlkaltsnbQn5zuD2bBwSrXgxYpo9n/view?usp=drive_link",
      gameplay:
        "https://drive.google.com/file/d/1zadxFIYe46-x3y5XQiFOI0cB80uuZlGs/view?usp=drive_link",
    },
  },
  {
    title: "GlycoSwarm AI",
    slug: "glycoswarm-ai",
    year: "2026",
    featured: true,
    // TODO: no case study yet. Copy the `caseStudy` block from eGovMed above,
    // fill it in, and the card grows a "Case study" link on its own.
    blurb:
      "A multi-agent early-warning system for diabetic complications. A LangGraph StateGraph runs four specialist agents in parallel (renal, neuropathy, retinal and cardiovascular), each writing and executing its own Python scoring code against real NHANES lab data, then fanning into a synthesis agent that ranks the risks and returns one clinical referral. Built as team Snowfall for the AMD Developer Hackathon 2026, Track 3: Unicorn, with an international cross-timezone team I led. I also designed and delivered the live demo and slide deck to the judges.",
    image: "/images/project-glycoswarm.png",
    tags: ["LangGraph", "FastAPI", "Gemma 4", "GLM 5.2", "Next.js"],
    links: {
      demo: "https://glycoswarm-ai.vercel.app/",
    },
  },
  {
    title: "CHIP-8 Emulator",
    slug: "chip-8-emulator",
    year: "2026",
    blurb:
      "A CHIP-8 emulator written from scratch in C/C++: the full core instruction set, memory management, delay and sound timers, and a custom Raylib visual debugger that tracks registers, the stack, and live memory while a ROM runs. Compiled to WebAssembly so it plays in the browser.",
    image: "/images/project-chip8.svg", // TODO
    tags: ["C/C++", "Raylib", "WebAssembly", "Emulation"],
    links: {
      demo: "https://chip8-emulator-matthew.vercel.app",
    },
    caseStudy: {
      embed: "chip8",
      intro:
        "CHIP-8 is a virtual machine from 1977, built so hobbyists could write a game once and run it on any 8-bit micro with an interpreter. Thirty-five instructions, 4 KB of memory, sixteen 8-bit registers and a 64×32 monochrome display — small enough to hold in your head, and awkward enough to stay interesting. This is a full interpreter in C++17 with a Raylib front end that doubles as a live debugger, running natively and in the browser through WebAssembly.",
      facts: [
        { label: "Language", value: "C++17, no dependencies in the core" },
        { label: "Front end", value: "Raylib, doubling as a debugger" },
        { label: "Tests", value: "106 assertions over the core" },
        { label: "Web build", value: "Emscripten → WebAssembly" },
        { label: "Licence", value: "MIT" },
      ],
      sections: [
        {
          heading: "How to drive it",
          body: [
            "Click the screen first — the keyboard only reaches the emulator while it has focus. It opens on Brix, a brick breaker: A and D move the paddle. Tab loads the next ROM. There are six, all written by hand for this project: Brix, Pong (two players, 1 and Q on the left, 4 and R on the right), Catch (A and D again), then Bounce, Counter and Keypad, three smaller ROMs that exercise specific instructions rather than being games.",
            "The panel above opens on the game alone. H, or the Show debugger button, folds the machine state in and out — none of it is needed to play, and six panels of hex handed to you unasked is a lot to walk into.",
            "The debugger has its own keys. Space pauses and resumes, N runs exactly one instruction while paused, Backspace restarts the current ROM, and the bracket keys change how many instructions run per frame — the emulator's clock speed, eleven by default. F1 through F5 toggle the five hardware quirks described further down.",
            "The keypad panel on the right reads CHIP-8 value / your key, and the two rarely agree. The original COSMAC VIP had a sixteen-key hex pad laid out 1 2 3 C / 4 5 6 D / 7 8 9 E / A 0 B F, mapped here onto the left block of a QWERTY keyboard, so pressing A lights CHIP-8 key 7. Showing only the hex value made the panel look like it was responding to the wrong key entirely.",
          ],
        },
        {
          heading: "The core knows nothing about a window",
          body: [
            "The interpreter has no platform dependencies and no idea what a window is. Everything it does is visible in its own state, and the front end reads that state once a frame. That split is what lets the test suite and a headless ASCII runner build and run in CI on a machine with no GPU and no X11 headers at all — the front end is simply switched off at configure time and nothing is fetched or linked.",
          ],
        },
        {
          heading: "A debugger, not a log",
          body: [
            "The right-hand panel is live machine state. V0 to VF in hex and decimal, with a register flashing amber for a moment after it is written. PC, I and SP, plus both timers highlighted while they count down. The call stack, which is the thing that tells you a ROM is about to overflow it. And the eight bytes around I, because I is almost always pointing at whatever matters next: a sprite, a BCD result, or a block of registers about to be loaded.",
            "Under the display is a live disassembly. CHIP-8 instructions are a fixed two bytes, so the listing can be walked from any even address without the usual guesswork about where an instruction actually starts.",
            "Making it follow the program counter turned out to be the wrong instinct. A single frame is eleven instructions scattered across the main loop, every subroutine it calls, and whatever busy-wait the ROM is parked in, so scrolling to wherever the PC stopped picks a different region almost every frame — Brix rewrote all eighteen rows on 110 frames out of 139, which reads as a flicker and cannot be read at all. It now parks over the busiest stretch of code, measured from a decaying histogram of executed addresses, and may move at most twice a second. Fifteen seconds of play settles to three moves. A green wash on a row means it ran recently, so the listing still shows what is executing without anything moving. Pause and it follows the PC exactly again, which is when N single-stepping needs it.",
          ],
        },
        {
          heading: "The quirks are switches, not decisions",
          body: [
            "Programs were written against one specific interpreter, and the popular ones disagreed with each other. A ROM that renders perfectly under one set of rules can be unplayable under another, so the five contested behaviours are toggles bound to F1 through F5 rather than choices baked into the code: whether the shift opcodes read Vy or shift in place, whether load and store leave I incremented, whether the bitwise ops reset VF as a side effect, whether draws wait for vertical blank, and whether sprites clip or wrap at the edge.",
            "The defaults are original COSMAC VIP behaviour, which is what the bundled ROMs assume. Most ROMs written after about 1990 want the first two flipped.",
          ],
        },
        {
          heading: "Four things that are easy to get wrong",
          body: [
            "VF is written last. Every arithmetic opcode that sets a flag computes the flag, stores the result, then writes VF. The other order is correct for fifteen of the sixteen registers and wrong for VF itself.",
            "Display wait rewinds the PC. When a draw is held back to the next frame the instruction has already been fetched and the PC has already advanced, so the step rewinds it and the same draw is retried rather than skipped.",
            "Fx0A completes on release, not on press. Waiting for the press is the obvious reading and it is wrong: one held key would satisfy several consecutive Fx0A instructions, which breaks any menu asking for two inputs in a row.",
            "Sprite positions wrap even when the body clips. The starting coordinate is taken modulo the screen size, but a sprite that then runs off the edge is cut off. That asymmetry is real hardware behaviour rather than an oversight — and it, along with the flag-order and release cases, is what the test suite concentrates on.",
          ],
        },
        {
          heading: "The ROMs are original",
          body: [
            "The repository carries no third-party binaries. Every bundled ROM was written for this project in CHIP-8 assembly, with readable source kept alongside it and a small assembler in the tools directory to build it. Brix is a brick breaker, Pong is two-player, and Catch is a one-button reaction game; three smaller ROMs exercise specific instructions. Bounce paces a ball off the display-wait quirk rather than the delay timer and checks its bounds by equality, since CHIP-8 has no signed comparison and a one-pixel step can only ever overshoot an edge by one. Counter walks 0 to 255 in decimal, where the awkward part is that the load instruction always reads from V0 upwards, so reading the digits back necessarily clobbers the counter. Keypad is a test for the blocking key-wait.",
            "The web build bakes them into a data file next to the WebAssembly, so the page issues no network requests at all once it has loaded.",
          ],
        },
      ],
    },
  },
  {
    title: "Heart Disease Prediction",
    slug: "heart-disease-prediction",
    year: "2025",
    blurb:
      "A supervised learning model predicting heart disease from patient features, taken end-to-end: data cleaning and feature engineering in pandas, handling missing values and categorical variables, then evaluation past raw accuracy.",
    image: "/images/project-heart.svg", // TODO
    tags: ["Python", "pandas", "Supervised Learning"],
    // TODO: this card has nowhere to go — no demo, no repo link, no case study.
    // Filling in a `caseStudy` block (copy eGovMed's above) is what fixes that.
    // Which dataset, which models compared, and what the evaluation actually
    // showed would be enough.
  },
  // UPLB Code Wars used to sit here. It's a competition rather than a project,
  // so it lives in `awards` below instead.
  // ---- TODO: copy this block for each new project -------------------------
  // {
  //   title: "Your Next Project",
  //   slug: "your-next-project",
  //   year: "2026",
  //   featured: false,
  //   blurb: "One or two sentences on what it does and what was hard about it.",
  //   image: "/images/placeholder.svg",
  //   fit: "cover",
  //   tags: ["Tag", "Tag"],
  //   links: { demo: "" },
  // },
];

/* ---------------------------------------------------------------------------
 * 6. EXPERIENCE & LEADERSHIP — the vertical timeline
 * ------------------------------------------------------------------------ */
export type TimelineItem = {
  period: string;
  role: string;
  org: string;
  bullets: string[];
};

export const timeline: TimelineItem[] = [
  {
    period: "2025 – Present",
    role: "BS Computer Science, University Scholar",
    org: "University of the Philippines Manila",
    bullets: [
      "DOST Undergraduate Scholar. Cumulative GWA 1.0375.",
      "Active in Google Developer Group and UP Socomsci, coordinating cross-functional teams on operations and event setup.",
    ],
  },
  {
    period: "2026",
    role: "Game Developer", // TODO: change if "Team Lead" is the accurate title
    org: "Gear Up NCR — Esports Game Dev Challenge",
    bullets: [
      "Won 1st place in the NCR regional finals and advanced to the national finals in General Santos City, Mindanao.",
      "Built Tumbang Preso in Godot 4: four-player online multiplayer over an authoritative host, with the taya role rotating so every player defends exactly once.",
      "Designed and delivered the pitch deck presented to the judges.",
    ],
  },
  {
    period: "2026",
    role: "Team Lead",
    org: "AMD Developer Hackathon ACT II, Track 3",
    bullets: [
      "Led an international, cross-timezone team building GlycoSwarm AI, a four-agent clinical screening prototype.",
      "Served live inference on an AMD MI300X GPU via Ollama, with automatic failover to a hosted provider.",
      "Designed and delivered the live product demo and full slide deck to the judges.",
    ],
  },
  {
    period: "2025 – 2026",
    role: "AI Application & LLM Development",
    org: "Independent",
    bullets: [
      "Deployed open LLMs locally to study end-to-end setup, inference, and multi-agent performance.",
      "Built automated summarizer applications on the Anthropic API using RAG and agent-to-agent architectures.",
      "Ran structured prompt evaluations across model versions and documented the findings.",
    ],
  },
  {
    period: "2022 – 2025",
    role: "Competitive Debater",
    org: "National Tournaments, Philippines",
    bullets: [
      "Quarterfinalist at the Ateneo Peace Debate; competed at UP Diliman Debates, XSDC, and ASDC.",
      "Three years of presenting technical arguments clearly under time pressure.",
    ],
  },
  {
    period: "2022 – 2025",
    role: "Math Team Captain · Class Valedictorian",
    org: "PAREF Southridge School",
    bullets: [
      "Gold Medalist and Class Valedictorian, 2025.",
      "Led tutoring sessions and mentored peers for local math competitions.",
    ],
  },
];

/* ---------------------------------------------------------------------------
 * 7. SKILLS — grouped pills
 * ------------------------------------------------------------------------ */
export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: ["Python", "C", "C++", "SQL", "GDScript", "TypeScript", "HTML"],
  },
  {
    label: "Agentic AI & Orchestration",
    items: [
      "LangChain",
      "LangGraph",
      "FastAPI",
      "Multi-Agent Systems",
      "Ollama",
      "RAG",
    ],
  },
  {
    label: "ML & Data",
    items: [
      "pandas",
      "Feature Engineering",
      "Model Evaluation",
      "Data Preprocessing",
      "Prompt Engineering",
      "Model Deployment",
    ],
  },
  {
    label: "Tools",
    items: [
      "Git",
      "Linux / CLI",
      "Google Colab",
      "Godot",
      "Blender",
      "Raylib",
      "Vercel",
    ],
  },
];

export const certifications = [
  "AMD Multiagent Systems Deployment",
  "CS50 Introduction to Computer Science",
  "AI Prompt Engineering",
  "Python",
  "C",
];

export const awards = [
  "1st Place, Gear Up NCR Esports Game Dev Challenge 2026 — representing NCR at the nationals in General Santos City",
  "Champion, eGov Hackathon PH 2026 (₱100,000 grand prize)",
  "DOST Undergraduate Scholar (2025 – Present)",
  "Top 5 Finalist, Olymphysics NCR (2025)",
  "5th Place, Philippine Statistics Quiz NCR (2025)",
  "Competitor, UPLB Code Wars shadow-coding competition (2025)",
  "Class Valedictorian & Gold Medalist, PAREF Southridge (2025)",
];

/* ---------------------------------------------------------------------------
 * 8. NAV — section links in the header. `href` must match a section id.
 * ------------------------------------------------------------------------ */
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* --------------------------------------------------------------------------
 * Icon names available to `services` above. Add new SVGs in
 * src/components/Icons.tsx if you want more.
 * ------------------------------------------------------------------------ */
export type IconName =
  "agents" | "brain" | "server" | "chip" | "gamepad" | "chart";
