import type { Achievement } from "./types";

/* ===========================================================================
 * RECEIPTS
 *
 * ⚠ Only what the repository and his own records confirm. Nothing here is
 * rounded up: eGovMed is "Winner, 1 of 10", never "champion"; the AMD entry is
 * listed with the placement it actually has, which is none.
 *
 * Three tiers, chosen by how much real material exists:
 *   A  its own page, because the result on its own does not say what happened
 *   B  expands in place inside the archive
 *   C  a row, and nothing more
 * ======================================================================== */

export const receipts = {
  title: "Receipts",
  standfirst: "Competitions, rankings, scholarships, and the work behind them.",
};

export const achievements: Achievement[] = [
  {
    n: "11",
    slug: "kaspersky-ctf",
    title: "Kaspersky International CTF 2026",
    result: "42nd in Asia & Oceania",
    org: "BHackers · 1,263 points",
    year: "2026",
    tier: "B",
    summary:
      "My first international benchmark: a 24-hour regional competition alongside Clarence S. Pagaduan as BHackers. We were invited to represent UP Manila and the Philippines in a field that included experienced CTF players and professionals. We finished 42nd in Asia & Oceania with 1,263 points.",
  },
  {
    n: "01",
    slug: "gear-up-ncr",
    title: "Gear Up NCR Esports Game Dev Challenge",
    result: "1st Place",
    org: "National Capital Region",
    year: "2026",
    tier: "A",
    project: "tumbang-preso",
    summary:
      "Sole developer on Tumbang Preso. First place in the region, and NCR's entry at the national finals in General Santos City.",
    lede: "We waded in through knee-deep floodwater on the first morning. On the third, the game was going to nationals.",
    facts: [
      { label: "Event", value: "Gear Up NCR Esports Game Dev Challenge" },
      { label: "Dates", value: "6 to 8 August 2026" },
      { label: "Team", value: "BH Studios" },
      { label: "My role", value: "Lead developer, built the game solo" },
      { label: "Result", value: "1st Place, representing NCR at Nationals" },
      { label: "Next", value: "National finals, General Santos City" },
    ],
    sections: [
      {
        n: "01",
        heading: "The setup",
        blocks: [
          {
            kind: "p",
            text: "A regional game development challenge, three days on site, judged on the build and on the pitch. BH Studios entered as a team: Paul Andrei Recio, Clarence Pagaduan, Harry Gomez, Hans Xavier Lao and me.",
          },
          {
            kind: "p",
            text: "I built the game. Not the gameplay code with art commissioned around it: every 3D model and character, the map, the interface, the sound design, the bots, the physics, the netcode and the codebase under all of it. Then the marketing, the deck, and the Q&A in front of the judges.",
          },
          {
            kind: "figures",
            items: [
              { value: "5", label: "Days, empty project to shipped build" },
              { value: "4", label: "Players, networked" },
              { value: "1", label: "Developer" },
            ],
          },
        ],
      },
      {
        n: "02",
        heading: "The typhoon",
        breath: true,
        blocks: [
          {
            kind: "p",
            text: "The competition ran in the middle of a typhoon. We waded in through knee-deep floodwater every morning, shoes soaked, laptops held up over the water.",
          },
          {
            kind: "p",
            text: "Nobody on the team ever raised missing a day as an option, which is not nothing when the water is at your knees at 7am.",
          },
          {
            kind: "p",
            text: "I built the game alone. I did not get through those three days alone.",
          },
        ],
      },
      {
        n: "03",
        heading: "The result, and what it changed",
        blocks: [
          {
            kind: "p",
            text: "1st Place. The game now represents the National Capital Region at the national finals in General Santos City. DOST and several partner companies are backing the entry from here and are connecting the team with industry professionals.",
          },
          {
            kind: "p",
            text: "What changed afterwards is that it stopped being a five-day build. The regional winner was a Godot project; the version going to nationals is a rewrite, because the thing that wins a three-day competition and the thing that survives being played every day are not the same artefact.",
          },
        ],
      },
    ],
  },
  {
    n: "02",
    slug: "egov-hackathon",
    title: "eGov Hackathon PH",
    result: "Winner, 1 of 10 teams",
    org: "₱100,000 prize",
    year: "2026",
    tier: "A",
    project: "egovmed",
    summary:
      "eGovMed, an AI triage system on the government's own API stack. Full-stack, eight integrations, and the pitch.",
    lede: "One of ten.",
    facts: [
      { label: "Event", value: "eGov Hackathon PH 2026" },
      { label: "Team", value: "BH Studios, UP Manila" },
      { label: "My role", value: "Full-stack · API integrations · pitch" },
      { label: "Result", value: "Winner, 1 of 10 teams" },
      { label: "Prize", value: "₱100,000" },
      { label: "Pilot target", value: "Philippine General Hospital" },
    ],
    sections: [
      {
        n: "01",
        heading: "What was built",
        blocks: [
          {
            kind: "p",
            text: "eGovMed: one login, one record and one payment in front of a Philippine public hospital visit. A patient signs in with an eGovPH account, describes symptoms in English, Tagalog or Taglish, gets a specialty and an urgency level back, confirms identity with consent, books, receives a queue number, and pays through the unified government gateway with statutory discounts already applied.",
          },
          {
            kind: "p",
            text: "The claim being made is narrow and I kept it narrow in the room: assessment happens **before** the queue rather than inside it. That is what makes a line shorter. Another screen for joining one does not.",
          },
        ],
      },
      {
        n: "02",
        heading: "What I owned",
        blocks: [
          {
            kind: "p",
            text: "Full-stack across the React front end and the Node/Express services behind it, and all eight government API integrations: eGovPH SSO, eGov AI, National ID eVerify, Face Liveness, eMessage, eGovChain, eGovPay and eReport.",
          },
          {
            kind: "p",
            text: "Every adapter got a mock path and a live path, switched per service by an environment variable, so the product runs with no credentials at all and a sandbox going down cannot take a demo with it. That decision is the reason the live demo in front of the judges was not a risk.",
          },
          {
            kind: "p",
            text: "I delivered the pitch and the live product demo to the judging panel.",
          },
        ],
      },
      {
        n: "03",
        heading: "The result",
        blocks: [
          {
            kind: "figures",
            items: [
              { value: "10", label: "Winning teams" },
              { value: "₱100,000", label: "Prize" },
              { value: "8", label: "Government APIs integrated" },
            ],
          },
          {
            kind: "p",
            text: "eGovMed was selected as one of ten winning projects. It is a win, not a championship, and it is written that way everywhere on this site.",
          },
        ],
      },
    ],
  },
  {
    n: "03",
    slug: "amd-developer-hackathon",
    title: "AMD Developer Hackathon ACT II",
    result: "Entrant, Track 3: Unicorn",
    org: "Team Snowfall",
    year: "2026",
    tier: "B",
    project: "glycoswarm-ai",
    summary:
      "Lead developer on GlycoSwarm AI for an international, cross-timezone team. Four specialist agents in parallel over NHANES lab panels, served live on an MI300X through Ollama with failover to a hosted provider. I designed and delivered the demo and the deck. No placement was awarded to the team, and this is here as an entry rather than as a result.",
  },
  {
    n: "04",
    slug: "dost-scholar",
    title: "DOST Undergraduate Scholarship",
    result: "Scholar",
    org: "Department of Science and Technology",
    year: "2025 – present",
    tier: "C",
  },
  {
    n: "05",
    slug: "university-scholar",
    title: "University Scholar",
    result: "GWA 1.0375",
    org: "University of the Philippines Manila",
    year: "2025 – present",
    tier: "C",
  },
  {
    n: "06",
    slug: "olymphysics-ncr",
    title: "Olymphysics NCR",
    result: "Top 5 Finalist",
    org: "National Capital Region",
    year: "2025",
    tier: "C",
  },
  {
    n: "07",
    slug: "philippine-statistics-quiz",
    title: "Philippine Statistics Quiz",
    result: "5th Place",
    org: "National Capital Region",
    year: "2025",
    tier: "C",
  },
  {
    n: "08",
    slug: "uplb-code-wars",
    title: "UPLB Code Wars",
    result: "Competitor",
    org: "Shadow-coding competition",
    year: "2025",
    tier: "C",
  },
  {
    n: "09",
    slug: "paref-southridge",
    title: "PAREF Southridge School",
    result: "Valedictorian",
    org: "Gold Medalist · Math Team Captain",
    year: "2025",
    tier: "B",
    summary:
      "Class Valedictorian and Gold Medalist. Captained the math team, ran tutoring sessions and mentored peers for local competitions.",
  },
  {
    n: "10",
    slug: "competitive-debate",
    title: "Competitive debate",
    result: "Quarterfinalist, Ateneo Peace Debate",
    org: "National tournaments",
    year: "2022 – 2025",
    tier: "B",
    summary:
      "Three years on the national circuit: NASH DC at DLSU, PSDC at Ateneo, UP Diliman Debates, XSDC and ASDC, with a quarterfinal at the Ateneo Peace Debate. It is still the most useful thing I have done for explaining a technical system to people who were not there while I built it.",
  },
];

export function achievementBySlug(slug: string): Achievement | undefined {
  return achievements.find((a) => a.slug === slug);
}

/** Tier A only. These are the ones with their own routes. */
export const achievementPages = achievements.filter((a) => a.tier === "A");
