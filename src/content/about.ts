import type { LabEntry } from "./types";

/* /about and /lab: the two index-level pages whose content is not a project or
 * a result. */

export const about = {
  paragraphs: [
    "I'm a BS Computer Science student at UP Manila and a DOST undergraduate scholar. I enjoy building across the whole system: the interface people touch, the services behind it, and the decisions that make it reliable.",
    "That curiosity has taken me from multiplayer games to hospital workflows, machine-learning pipelines and a C++ emulator. Competitions taught me to make clear decisions under time pressure, test the parts that matter and bring a working product into the room.",
    "Before computer science, I spent three years competing in debate. It still shapes how I work: I like asking good questions, explaining technical ideas clearly and being able to defend a decision with evidence. I want to bring that mix of building and communication to a team doing useful work.",
  ],
  portrait: {
    src: "/images/profile.jpg",
    alt: "Matthew Labrador.",
  },
  /* Evidence, not maxims. Each row is one thing that actually happened on a
   * named project, so the claim underneath it is checkable. */
  evidence: [
    {
      project: "Tumbang Preso",
      href: "/work/tumbang-preso",
      label: "Game physics",
      text: "The engine's collision callbacks felt unreliable, so I staged 36 contacts and logged both tests. 16 area overlaps never fired, and they clustered by target. The build ships a host-side distance check instead.",
    },
    {
      project: "Knee MRI Reader",
      href: "/work/knee-mri-reader",
      label: "Model evaluation",
      text: "The model scores 0.997 macro AUC in-sample and 0.843 strictly out-of-fold. The headline number on this site is 0.843, because the other one is measured on studies the model has already seen.",
    },
    {
      project: "eGovMed",
      href: "/work/egovmed",
      label: "Identity API",
      text: "Two government documents disagreed about the liveness endpoint, so I ran a real session and a random UUID against it. Both returned byte-identical errors, which told me the failure mode I had to design for.",
    },
  ],
  /* Short annotations for a reader outside the Philippines, who has no reason
   * to know what a GWA or a DOST scholarship is. */
  credentials: [
    {
      label: "University Scholar",
      text: "Cumulative GWA 1.0375. On the UP scale 1.0 is the highest possible grade. Expected BSCS 2029.",
    },
    {
      label: "DOST Undergraduate Scholar",
      text: "A Philippine government scholarship for students in science and engineering, awarded by the Department of Science and Technology.",
    },
    {
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
    note: "1st place in Metro Manila, and the region's entry at the national finals.",
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
      "GlycoSwarm's actual agent graph. Four specialists in parallel, one synthesis stage.",
    affordance: "Isolate a specialist and read what it contributes.",
    href: "/work/glycoswarm-ai#s01",
    status: "diagram",
  },
];
