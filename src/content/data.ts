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
  highlight: "", // set a string here to show a gold pill above your name
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
export type Project = {
  title: string;
  blurb: string;
  year: string;
  image: string;
  tags: string[];
  featured?: boolean;
  /* How the image sits in its frame.
   *   "cover"   (default) fills the frame and crops the overflow. Right for
   *             art and wide screenshots you can safely cut into.
   *   "contain" shows the whole image on a padded backdrop, never cropping.
   *             Right for logos and UI screenshots where the edges carry
   *             meaning. A featured card's image column is as tall as its text
   *             column, so "cover" there crops far more than the 16:10 you'd
   *             expect from the small cards. */
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
  },
  {
    title: "Tumbang Preso",
    year: "2026",
    featured: true,
    blurb:
      "A 4-player online multiplayer take on the Filipino street game, built in Godot for DOST-GameDev. Four rounds, one taya defending the can against three attackers, with the defender role rotating so everyone defends exactly once. Networked with an authoritative host, so contact is resolved by distance on the host and tags and throws agree across every peer.",
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
    year: "2026",
    featured: true,
    blurb:
      "A multi-agent early-warning system for diabetic complications. A LangGraph StateGraph runs four specialist agents in parallel (renal, neuropathy, retinal and cardiovascular), each writing and executing its own Python scoring code against real NHANES lab data, then fanning into a synthesis agent that ranks the risks and returns one clinical referral. Built as team Snowfall for the AMD Developer Hackathon 2026, Track 3: Unicorn, with an international cross-timezone team I led. I also designed and delivered the live demo and slide deck to the judges.",
    image: "/images/project-glycoswarm.png",
    fit: "contain", // a dashboard shot: cropping it eats the risk figures
    tags: ["LangGraph", "FastAPI", "Gemma 4", "GLM 5.2", "Next.js"],
    links: {
      demo: "https://glycoswarm-ai.vercel.app/",
    },
  },
  {
    title: "CHIP-8 Emulator",
    year: "2026",
    blurb:
      "A CHIP-8 emulator written from scratch in C/C++: the full core instruction set, memory management, delay and sound timers, and a custom Raylib visual debugger that tracks registers, the stack, and live memory while a ROM runs. Compiled to WebAssembly so it plays in the browser.",
    image: "/images/project-chip8.svg", // TODO
    tags: ["C/C++", "Raylib", "WebAssembly", "Emulation"],
    links: {
      demo: "https://chip8-emulator-matthew.vercel.app",
    },
  },
  {
    title: "Heart Disease Prediction",
    year: "2025",
    blurb:
      "A supervised learning model predicting heart disease from patient features, taken end-to-end: data cleaning and feature engineering in pandas, handling missing values and categorical variables, then evaluation past raw accuracy.",
    image: "/images/project-heart.svg", // TODO
    tags: ["Python", "pandas", "Supervised Learning"],
    links: {},
  },
  {
    title: "UPLB Code Wars",
    year: "2025",
    blurb:
      "A day-long 'shadow coding' competition: complex algorithmic problems solved entirely in Notepad, with no compiler, no internet, and no AI assistance. Nothing sharpens your mental model of a language quite like losing the ability to run it.",
    image: "/images/project-codewars.svg", // TODO
    tags: ["Algorithms", "C/C++", "Competition"],
    links: {},
  },
  // ---- TODO: copy this block for each new project -------------------------
  // {
  //   title: "Your Next Project",
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
      "Anthropic API",
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
  "Champion, eGov Hackathon PH 2026 (₱100,000 grand prize)",
  "DOST Undergraduate Scholar (2025 – Present)",
  "Top 5 Finalist, Olymphysics NCR (2025)",
  "5th Place, Philippine Statistics Quiz NCR (2024)",
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
