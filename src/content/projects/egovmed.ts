import type { Project } from "../types";

/* ===========================================================================
 * 02 · eGOVMED
 *
 * ⚠ The result is "Winner, 1 of 10 teams", never "champion". The prize is
 * ₱100,000 and it is confirmed rather than estimated. No fake government
 * marks, no PGH endorsement: PGH is the pilot TARGET and is written as one.
 * ======================================================================== */

export const egovmed: Project = {
  n: "02",
  slug: "egovmed",
  title: "eGovMed",
  category: "Civic / Healthcare",
  year: "2026",
  world: "egov",
  display: "franklin",
  oneLiner:
    "Assess and route the patient before they join the queue, on the government's own API stack.",
  did: "Full-stack, every integration, and the pitch.",
  outcome: "Winner, 1 of 10 · eGov Hackathon PH",
  media: {
    // ⚠ The SIGNED-IN home screen, not the sign-in wall. Every route on the
    // deployed app redirects to MPIN entry without a session, so a headless
    // capture can only ever photograph the door. He supplied this one from a
    // real session; it is the screen the product actually is.
    src: "/work/egovmed/home.webp",
    alt: "The eGovMed home screen: a greeting by name, a Start a visit card, tiles for Records, Payments, Report and Messages, and a bottom tab bar.",
    fit: "contain",
  },
  award: "Winner, 1 of 10 teams · eGov Hackathon PH 2026 · ₱100,000",
  built: ["React + Vite", "Node / Express", "Redis", "Besu", "eGov API stack"],
  related: ["egov-hackathon"],
  links: {
    demo: "https://egovmed-frontend.vercel.app/",
    repo: "https://github.com/M4tyu633/egovmed",
  },
  facts: [
    {
      label: "My role",
      value: "Full-stack · API integrations · pitch and presentation",
    },
    { label: "Team", value: "BH Studios, UP Manila" },
    { label: "Event", value: "eGov Hackathon PH 2026" },
    { label: "Result", value: "Winner, 1 of 10 teams · ₱100,000" },
    { label: "Pilot target", value: "Philippine General Hospital" },
    { label: "Stack", value: "React + Vite · Node/Express · Redis · Besu" },
  ],

  home: {
    headline: "Eight government APIs. One patient flow.",
    body: "I connected identity, triage, verification, booking, messaging and payments into one patient journey, with explicit safeguards at each service boundary.",
    coda: "eGovMed was selected as one of ten winning projects at the eGov Hackathon PH 2026.",
    figure: "eg-route",
    figureCaption:
      "One patient, six stages. Select a stage to see which government service is behind it.",
  },

  lede: "Go to a Philippine public hospital and you will re-enter the same details at every counter, repeat labs another facility already ran, and queue a second time just to pay. We built eGovMed to put one login, one record and one payment in front of all of that, on the government's own eGov API stack. I worked full-stack on it and owned the API integrations, then pitched it.",

  sections: [
    {
      n: "01",
      heading: "A queue is already too late",
      standfirst:
        "The idea was to assess and route the patient before they join it.",
      blocks: [
        {
          kind: "p",
          text: "A patient signs in with an eGovPH account and the profile auto-fills from SSO. They describe symptoms in English, Tagalog or Taglish, and triage returns a specialty, an urgency level and any red flags. Identity is confirmed with consent through a face liveness capture and a PhilSys demographic match, then the appointment is booked and a queue number issued with an SMS confirmation. The bill settles through the unified government gateway with demo benefit estimates clearly labelled.",
        },
        {
          kind: "p",
          text: "The point of the ordering is that assessment happens **before** the queue rather than inside it. Routing a patient to the right specialty and urgency up front is what makes the line shorter, not another screen for joining it.",
        },
        { kind: "figure", id: "eg-route" },
      ],
    },
    {
      n: "02",
      heading: "Eight integrations, two modes each",
      blocks: [
        {
          kind: "p",
          text: "I gave every adapter both a mock and a live path, picked per service by an environment variable, so the whole product runs offline with no credentials and a sandbox going down cannot take the demo with it.",
        },
        { kind: "figure", id: "eg-ledger" },
        {
          kind: "p",
          text: "That switch doubles as a safety gate. With mocks disallowed in production the app refuses to boot if any integration is still mocked or missing credentials, and it tells you which one. I did not want a forgotten mock quietly serving fake triage or fake payment data to a real patient.",
        },
        {
          kind: "aside",
          label: "Two docs, one control",
          text: "The two portal documents flatly contradicted each other about where the face liveness session ID comes from. I stopped reading and tested it: I queried eVerify with a real completed hosted session, then again with a random UUID as a control, and got byte-identical error responses. The control is the only reason that meant anything. On its own, a rejection could just as easily have been a bad demographic match.",
        },
      ],
    },
    {
      n: "03",
      heading: "Decisions, not features",
      standfirst:
        "I assumed real health information from the start, so most of my time went here instead of into features.",
      blocks: [
        {
          kind: "decision",
          situation: "A chain can prove that a record existed.",
          constraint:
            "Clinical data should stay private; an immutable chain is the wrong place for its payload.",
          decision:
            "Anchor a hash only. Payloads are stripped to a type and a timestamp before submission, so no patient ID, facility or clinical content ever reaches the chain.",
        },
        {
          kind: "decision",
          situation: "A liveness session proves a person was present.",
          constraint:
            "Two simultaneous replays of the same session must not both succeed.",
          decision:
            "Sessions are single-use, patient-bound and expire in ten minutes, claimed through a Redis compare-and-set so concurrent replays resolve to exactly one success and one rejection.",
        },
        {
          kind: "decision",
          situation: "A payment gateway calls back to say it is done.",
          constraint: "Anyone can send that callback.",
          decision:
            "Treat it as non-authoritative. A forged callback returns 202 and writes nothing.",
        },
        {
          kind: "decision",
          situation: "A model classifies the patient's symptoms.",
          constraint:
            "A degraded or hostile model response must not be able to downgrade an emergency.",
          decision:
            "Keep a rule-based floor under the classifier that can only raise urgency and never lower it, in live mode as well as in mock.",
        },
        {
          kind: "p",
          text: "I picked the failure behaviour rather than inheriting it. Anchor writes **fail closed**, so an unverifiable record is never stored. Anchor verification **fails safe**, so an RPC error shows unverified rather than a green badge. A failed SMS never fails a booking.",
        },
        {
          kind: "p",
          text: "Records are encrypted at rest with a versioned envelope, and the decryptor reads both formats so a schema change never orphans existing data. The SSRF guard lives at the transport rather than the call site, so a later refactor cannot reintroduce the hole by forgetting it in one place.",
        },
      ],
    },
    {
      n: "04",
      heading: "Verification",
      blocks: [
        {
          kind: "figures",
          items: [
            {
              value: "38",
              label: "Backend security regression tests gating merges",
            },
            { value: "2", label: "Package trees under dependency audit" },
            { value: "0", label: "Force-pushes permitted on main" },
          ],
        },
        {
          kind: "p",
          text: "The suite includes a concurrency test for the replay path and one asserting that message bodies never reach the audit log. CI runs it alongside dependency audits on both packages, CodeQL on the security-extended query set, and a secret scan. Branch protection on main requires all of it.",
        },
      ],
    },
    {
      n: "05",
      heading: "The result",
      blocks: [
        {
          kind: "p",
          text: "eGovMed was picked as one of ten winning entries at the eGov Hackathon PH 2026, with a ₱100,000 prize. The pilot target is the Philippine General Hospital.",
        },
      ],
    },
  ],
};
