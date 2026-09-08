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
  /** ⚠ THE FULL-BLEED IMAGE FOR THE COVER, WHEN `media` CANNOT BE ONE.
   *
   * `media` is the project's identifying picture and two of them are portrait
   * phone screenshots meant to be shown whole. The cover runs edge to edge, so
   * cover-cropping a tall UI screenshot to a landscape screen produced a grey
   * wall with a few illegible words in it, which is exactly what it looks like.
   * When a project's own picture cannot carry a full screen, it names a
   * landscape one here and keeps `media` for everywhere else. */
  cover?: string;
  /** ⚠ `contain` for an interface. Five of these six projects identify
   *  themselves by their screen, and a screen cropped to fill a landscape
   *  frame shows a random corner of itself: a grey panel, half a chart, three
   *  words of a label. Contained, the whole interface is visible and the
   *  project is recognisable in one glance, which is the only job the cover
   *  image has. Photographs stay `cover`. */
  coverFit?: "cover" | "contain";
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
    /* The product, whole. It is the thing that is recognisably eGovMed. */
    coverFit: "contain",
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
    coverFit: "contain",
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
    coverFit: "contain",
    media: {
      kind: "image",
      src: "/work/chip8/debugger.webp",
      alt: "The CHIP-8 visual debugger: framebuffer, registers, disassembly and memory.",
    },
  },
  /* ⚠ 05 AND 06 BELONG HERE. The homepage grew from four project worlds to six,
   * and this list did not follow, so the opening announced four projects and
   * then scrolled past two more that a reader had been given no reason to
   * expect. The index at the foot of the opening is the page's table of
   * contents; if a world is on the page it has a row here.
   *
   * ⚠ AND THE RESULTS BELOW ARE THE MEASURED ONES, NOT THE FLATTERING ONES.
   * Knee reports the strict out-of-fold macro AUC, which is the honest number;
   * 0.997 is the in-sample score and it does not go in a headline. CardioSense
   * reports the holdout AUC of the RESEARCH comparison, and the browser
   * instrument runs the exported Logistic Regression, which is a different
   * thing again. Neither distinction may be blurred to make a line shorter. */
  {
    n: "05",
    title: "Knee MRI Reader",
    line: "Twelve findings scored from a multi-series DICOM study, in a reading station with real series previews.",
    did: "The whole chain, from raw DICOM to the browser.",
    result: "0.843 macro AUC · strict out-of-fold",
    href: "/work/knee-mri-reader",
    action: "Open the reading station",
    world: "reading",
    display: "plex",
    coverFit: "contain",
    media: {
      kind: "image",
      src: "/work/knee-mri/station.webp",
      alt: "The Knee MRI reading station: a large sagittal preview, series navigation, and held-out scores beside the radiologist's annotations.",
      fit: "contain",
    },
  },
  {
    n: "06",
    title: "CardioSense",
    line: "Change a biomarker and follow its signed contribution through to a probability computed in the page.",
    did: "Data preparation, model comparison, and the browser instrument.",
    result: "0.919 holdout AUC · research comparison",
    href: "/work/heart-disease-prediction",
    action: "Explore the risk instrument",
    world: "cardio",
    display: "plex",
    coverFit: "contain",
    media: {
      kind: "image",
      src: "/work/heart/station.webp",
      alt: "CardioSense showing real UCI inputs, signed Logistic Regression contributions and the locally computed model probability.",
      fit: "contain",
    },
  },
];
