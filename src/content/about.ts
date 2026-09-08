import type { LabEntry } from "./types";

/* ===========================================================================
 * ABOUT and LAB.
 * The two index-level pages whose content is not a project or a result.
 * ======================================================================== */

export const about = {
  heading: "There’s a person behind all this.",
  paragraphs: [
    "I'm a BS Computer Science student at UP Manila and a DOST undergraduate scholar. Most of my projects end up crossing boundaries I wasn't planning to cross: networking in a game, security in a healthcare system, deployment around an AI model. I like that part.",
    "I also like having receipts. If a collision system feels unreliable, I measure it. If two API documents contradict each other, I test both. If software can fail in a dangerous way, I want to decide what failure should look like before I make the happy path pretty.",
    "Before computer science, I spent three years competing in debate. It still shows up every time I have five minutes to explain a technical system to judges who weren't there while I built it.",
  ],
  /* ⚠ NOT NEW COPY. These three lines are lifted verbatim out of the second
   * paragraph below, because they are the only sentences on the site that say
   * how he works rather than what he built, and they were buried in the middle
   * of a paragraph at 19px. Set at display scale they do the job the direction
   * asks of this page: make someone want to work with him. If the paragraph is
   * ever reworded, reword these with it. */
  credo: [
    "If a collision system feels unreliable, I measure it.",
    "If two API documents contradict each other, I test both.",
    "If software can fail in a dangerous way, I decide what failure looks like before I make the happy path pretty.",
  ],
  portrait: {
    src: "/images/profile.jpg",
    alt: "Matthew Labrador.",
  },
  /* Margin notes. Rendered in the gutter on desktop and folded into the flow on
   * mobile, anchored to the paragraph index they annotate. */
  marginalia: [
    {
      after: 0,
      label: "University Scholar",
      text: "Cumulative GWA 1.0375. Expected BSCS 2029.",
    },
    {
      after: 1,
      label: "The measurements",
      text: "36 contacts staged, 20 fired. 0.997 in-sample against 0.843 out-of-fold. A real liveness session and a random UUID returning byte-identical errors. Each of those changed something.",
    },
    {
      after: 2,
      label: "Debate",
      text: "NASH DC, PSDC, UP Diliman Debates, XSDC, ASDC. Quarterfinalist at the Ateneo Peace Debate.",
    },
  ],
};

/** The short timeline on /about. School first, because it dates everything. */
export const timeline: {
  period: string;
  role: string;
  org: string;
  note?: string;
}[] = [
  {
    period: "2025 – present",
    role: "BS Computer Science, University Scholar",
    org: "University of the Philippines Manila",
    note: "DOST Undergraduate Scholar. Active in Google Developer Group and UP Socomsci.",
  },
  {
    period: "2026",
    role: "Lead developer",
    org: "Gear Up NCR Esports Game Dev Challenge",
    note: "1st place, and NCR's entry at the national finals.",
  },
  {
    period: "2026",
    role: "Full-stack developer, pitch lead",
    org: "eGov Hackathon PH",
    note: "One of ten winning teams.",
  },
  {
    period: "2026",
    role: "Lead developer",
    org: "AMD Developer Hackathon ACT II, Track 3",
    note: "Led an international, cross-timezone team building GlycoSwarm AI.",
  },
  {
    period: "2025 – 2026",
    role: "AI application and LLM work",
    org: "Independent",
    note: "Open models deployed locally to study setup, inference and multi-agent behaviour. Summarisers on hosted APIs using RAG and agent-to-agent architectures. Structured prompt evaluations across model versions.",
  },
  {
    period: "2022 – 2025",
    role: "Competitive debater",
    org: "National tournaments, Philippines",
  },
  {
    period: "2022 – 2025",
    role: "Math team captain, class valedictorian",
    org: "PAREF Southridge School",
  },
];

export const lab = {
  title: "Things you can poke",
  standfirst:
    "Experiments, tools and pieces of larger projects that make more sense when they're running.",
};

export const labEntries: LabEntry[] = [
  {
    n: "01",
    title: "CHIP-8, running",
    blurb:
      "The full interpreter and its debugger, compiled to WebAssembly. Six ROMs, all written by hand for this project.",
    affordance:
      "Play it, pause it, single-step it, watch the registers change.",
    href: "/work/chip-8-emulator",
    status: "live",
  },
  {
    n: "02",
    title: "Throw a tsinelas",
    blurb:
      "The contact question from Tumbang Preso, extracted. Projectile physics with both contact tests running at once.",
    affordance: "Drag back, let go, and watch the two answers disagree.",
    href: "/work/tumbang-preso#s03",
    status: "embedded",
  },
  {
    n: "03",
    title: "Contact resolution, 36 cases",
    blurb:
      "The probe that changed the game's physics, laid out. Sixteen of thirty-six area overlaps never fired, and they clustered by target.",
    affordance: "Toggle between engine callbacks and the host distance check.",
    href: "/work/tumbang-preso#s03",
    status: "diagram",
  },
  {
    n: "04",
    title: "A host cannot know its own address",
    blurb:
      "LAN discovery, four candidate interfaces, carrier-grade NAT, and the machine in Singapore that made it moot.",
    affordance: "Follow a join from the beacon to the lobby.",
    href: "/work/tumbang-preso#s05",
    status: "diagram",
  },
  {
    n: "05",
    title: "One patient, eight services",
    blurb:
      "eGovMed's route, with the government integration behind each stage.",
    affordance: "Step through it with the arrow keys.",
    href: "/work/egovmed#s01",
    status: "diagram",
  },
  {
    n: "06",
    title: "Agent topology explorer",
    blurb:
      "GlycoSwarm's actual StateGraph. Four specialists in parallel, one synthesis stage.",
    affordance: "Isolate a specialist and read what it contributes.",
    href: "/work/glycoswarm-ai#s01",
    status: "diagram",
  },
];
