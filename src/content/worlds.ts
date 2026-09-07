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
export const entrances = [
  {
    title: "Tumbang Preso",
    line: "A street game. Built from the ground up.",
    href: "/work/tumbang-preso",
    src: "/work/tumbang/match-poster.webp",
    alt: "A round of Tumbang Preso in the actual Godot build",
    world: "tumbang",
  },
  {
    title: "eGovMed",
    line: "One visit. Eight systems underneath.",
    href: "/work/egovmed",
    src: "/work/egovmed/home.webp",
    alt: "The real signed-in eGovMed home screen",
    world: "egov",
  },
  {
    title: "GlycoSwarm AI",
    line: "Four specialists. Follow their evidence.",
    href: "/work/glycoswarm-ai",
    src: "/images/project-glycoswarm.png",
    alt: "GlycoSwarm's dashboard and organ risk map",
    world: "glyco",
  },
  {
    title: "CHIP-8",
    line: "The screenshot is a machine. Boot it below.",
    href: "/#w04",
    src: "/work/chip8/debugger.webp",
    alt: "The CHIP-8 visual debugger running Brix",
    world: "chip8",
  },
];
