// Source: eGovMed backend services and the July 12 GlycoSwarm source archive.
// Implementation explanations, never live clinical results.
export const patientStages = [
  {
    name: "Sign in",
    service: "eGovPH SSO",
    sees: "One account, with a profile that carries through the visit.",
    decision:
      "Every integration has an explicit mock/live adapter. Production can refuse to start with mocks enabled.",
    failure: "Missing live credentials",
    outcome: "Startup refused. No mock identity silently substituted.",
    path: "config/env.js",
  },
  {
    name: "Triage",
    service: "eGov AI",
    sees: "Describe symptoms in English, Tagalog or Taglish before joining a queue.",
    decision:
      "A rule-based urgency floor sits beneath the model. The classifier cannot lower the urgency it sets.",
    failure: "Model downgrades urgency",
    outcome: "The rule-based floor remains. Urgency can only rise.",
    path: "integrations/egovAi.js",
  },
  {
    name: "Verify",
    service: "Face Liveness + eVerify",
    sees: "Consent, a liveness capture, then a demographic match.",
    decision:
      "A patient-bound session expires after ten minutes. Redis atomically claims it before upstream verification.",
    failure: "Replay the same session",
    outcome: "One claim succeeds. The second request is rejected.",
    path: "services/identityService.js",
  },
  {
    name: "Book",
    service: "eGovChain",
    sees: "A booked appointment and records whose fingerprints can be checked.",
    decision:
      "The chain receives a hash and minimal metadata. Clinical payloads stay off-chain.",
    failure: "Chain verification unavailable",
    outcome: "Show unverified. An RPC error cannot become a green badge.",
    path: "integrations/egovChain.js",
  },
  {
    name: "Queue",
    service: "eMessage",
    sees: "A queue number with an SMS confirmation.",
    decision:
      "Booking and notification have different failure boundaries. A message is useful; it is not the appointment.",
    failure: "SMS delivery fails",
    outcome: "The booking survives. Notification failure does not undo it.",
    path: "services/appointmentService.js",
  },
  {
    name: "Pay",
    service: "eGovPay + eReport",
    sees: "A bill, estimated demo benefits, checkout and a reporting route.",
    decision:
      "An unsigned callback is not proof of payment. The authenticated status path checks the gateway.",
    failure: "Forge a paid callback",
    outcome: "202 Accepted. Zero writes. The bill is not marked paid.",
    path: "routes/payments.routes.js",
  },
];
export const specialistContracts = [
  {
    name: "Renal",
    id: "renal",
    colour: "var(--gs-renal)",
    inputs: ["eGFR", "UACR", "Creatinine"],
    fields: ["egfr", "uacr_mg_g", "creatinine_mg_dl"],
    responsibility:
      "Look for early kidney stress in filtration and albumin measurements.",
  },
  {
    name: "Retinal",
    id: "retinal",
    colour: "var(--gs-retinal)",
    inputs: ["Systolic BP", "Diabetes duration"],
    fields: ["systolic_bp", "years_with_diabetes"],
    responsibility:
      "Assess the retinal-risk signal available from blood pressure and diabetes duration. No retinal images are read.",
  },
  {
    name: "Neuropathy",
    id: "neuropathy",
    colour: "var(--gs-neuro)",
    inputs: ["Diabetes duration", "HbA1c"],
    fields: ["years_with_diabetes", "a1c_percent"],
    responsibility:
      "Use duration and HbA1c as the available nerve-risk inputs. Single-visit survey data does not provide day-to-day glucose variability.",
  },
  {
    name: "Cardiovascular",
    id: "cardiovascular",
    colour: "var(--gs-cardio)",
    inputs: ["LDL", "HDL", "Triglycerides"],
    fields: ["ldl_mg_dl", "hdl_mg_dl", "triglycerides_mg_dl"],
    responsibility:
      "Inspect the lipid panel independently of the other specialists.",
  },
];
/* ---------------------------------------------------------------------------
 * THE OPENING INDEX.
 *
 * Four entries, and every one of them answers the three questions a stranger
 * has in the first fifteen seconds, in this order: what is it, what did HE do,
 * and did it go anywhere. `did` is the load-bearing field — it is the only
 * place on the homepage where ownership is stated in the first person, and it
 * is why a visitor does not have to open six pages to work out which of these
 * he actually built.
 *
 * `action` is deliberately not "View project" four times. The verb belongs to
 * the work: you enter a build, you follow a patient, you trace a specialist,
 * you boot a machine.
 * ------------------------------------------------------------------------ */
export type Entrance = {
  n: string;
  title: string;
  /** One engineering line. Not a tagline. */
  line: string;
  /** What Matthew personally did. Shown at full size, never as a badge. */
  did: string;
  /** The outcome, or the measurement that stands in for one. */
  result: string;
  href: string;
  action: string;
  world: string;
  display: "daruma" | "franklin" | "plex" | "mono";
  media:
    | { kind: "video"; src: string; poster: string; alt: string }
    | { kind: "image"; src: string; alt: string; fit?: "cover" | "contain" };
};

export const entrances: Entrance[] = [
  {
    n: "01",
    title: "Tumbang Preso",
    line: "A four-player street game, empty project to shipped build in five days.",
    did: "I built the whole game.",
    result: "1st Place · Gear Up NCR 2026",
    href: "/work/tumbang-preso",
    action: "Enter the build",
    world: "tumbang",
    display: "daruma",
    media: {
      kind: "video",
      src: "/work/tumbang/match.mp4",
      poster: "/work/tumbang/match-poster.webp",
      alt: "A round of Tumbang Preso in the shipped Godot build: the scoreboard, the timer, and the tin can standing in the road.",
    },
  },
  {
    n: "02",
    title: "eGovMed",
    line: "Eight government services behind one hospital visit, each with its own failure boundary.",
    did: "Full-stack, every integration, and the pitch.",
    result: "Winner, 1 of 10 · eGov Hackathon PH",
    href: "/work/egovmed",
    action: "Follow the patient",
    world: "egov",
    display: "franklin",
    media: {
      kind: "image",
      src: "/work/egovmed/home.webp",
      alt: "The signed-in eGovMed home screen on a phone.",
      fit: "contain",
    },
  },
  {
    n: "03",
    title: "GlycoSwarm AI",
    line: "Four specialists read different evidence in parallel before anything is combined.",
    did: "Lead developer. I designed the graph.",
    result: "AMD Developer Hackathon · Track 3",
    href: "/work/glycoswarm-ai",
    action: "Trace a specialist",
    world: "glyco",
    display: "plex",
    media: {
      kind: "image",
      src: "/work/glycoswarm/home.webp",
      alt: "The GlycoSwarm evidence graph: one sample feeding four parallel specialists into a synthesis stage.",
      fit: "contain",
    },
  },
  {
    n: "04",
    title: "CHIP-8",
    line: "An interpreter in C++17 with a debugger that shows the machine changing while a ROM runs.",
    did: "Core, debugger, web build, six ROMs.",
    result: "106 assertions · runs in this browser",
    href: "/work/chip-8-emulator",
    action: "Boot the machine",
    world: "chip8",
    display: "mono",
    media: {
      kind: "image",
      src: "/work/chip8/debugger.webp",
      alt: "The CHIP-8 visual debugger: framebuffer, registers, disassembly and memory.",
    },
  },
];
