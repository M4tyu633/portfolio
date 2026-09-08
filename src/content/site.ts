/* ===========================================================================
 * IDENTITY, CONTACT, NAVIGATION, METADATA.
 * Everything that is true of the whole site rather than of one project.
 * ======================================================================== */

export const site = {
  name: "Matthew Labrador",
  url: "https://matthewlabrador.vercel.app",
  title: "Matthew Labrador",
  titleTemplate: "%s · Matthew Labrador",
  description:
    "Games, AI systems, public-sector software and low-level experiments by Matthew Labrador, CS at UP Manila. An archive of things that were built, measured, and changed.",
  locale: "en_PH",
};

/** The three-part metadata line that opens the site and closes every page. */
export const stamp = ["Matthew Labrador", "Manila", "Computer Science"];

export const contact = {
  email: "matthewtlabrador@gmail.com",
  location: "Manila, Philippines",
  github: "https://github.com/M4tyu633",
  linkedin: "https://www.linkedin.com/in/m4tyuuu1/",
  facebook: "https://www.facebook.com/matthewtlabrador",
  resume: "/Matthew_Labrador_Resume.pdf",
  heading: "Got something difficult?",
  body: "I'm open to internships, research, technical collaborations and competition teams. If you're working on something with real constraints, I'd like to hear about it.",
};

/* A bare `mailto:` silently does nothing on a machine with no mail client
 * configured, which is most people on a laptop, and that is exactly what he
 * reported. Gmail's compose window opens in any browser; the copy button in the
 * footer covers everyone else. */
export const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  contact.email,
)}`;

export const nav = [
  { label: "Work", href: "/work" },
  // ⚠ The LABEL is "Achievements" and the PAGE TITLE is "Receipts". Navigation
  // optimises for clarity; a page title can carry personality. Calling the nav
  // item "Receipts" made a real destination read as a joke.
  { label: "Achievements", href: "/achievements" },
  { label: "About", href: "/about" },
];

export const utilities = [
  { label: "Resume", href: contact.resume, external: true },
  { label: "GitHub", href: contact.github, external: true },
  { label: "LinkedIn", href: contact.linkedin, external: true },
];

/* ---------------------------------------------------------------------------
 * The opening. Every word of this was written against the composition rather
 * than lifted from a résumé, which is why there is no "passionate" in it and no
 * three-role subtitle.
 * ------------------------------------------------------------------------ */
export const opening = {
  statement: "I keep picking projects that are slightly unreasonable.",
  body: "I'm a computer science student at UP Manila. I build games, civic systems, AI tools, and the infrastructure that brings them to life.",
  coda: "Then I figure out why.",
  /* The alternative hero, tested against the composition and kept: it is the
   * line the /work archive opens with, where the long version would be a
   * second introduction on a page nobody arrives at first. */
  short: "I like the part where it gets complicated.",
  shortBody:
    "Games, AI systems, public-sector software and low-level experiments by Matthew Labrador, CS @ UP Manila.",
};

/** The index strip under the opening. Order is the order of the homepage. */
export const worldIndex = [
  { n: "01", title: "Tumbang Preso", tag: "Game / Multiplayer", href: "#w01" },
  { n: "02", title: "eGovMed", tag: "Civic / Healthcare", href: "#w02" },
  { n: "03", title: "GlycoSwarm AI", tag: "Agents / Clinical", href: "#w03" },
  { n: "04", title: "CHIP-8", tag: "Systems / Emulation", href: "#w04" },
];

/* ---------------------------------------------------------------------------
 * The technical index. Capability shown through the work that proves it, not
 * as forty pills in five groups. Each row names where it was used, and that is
 * the entire claim being made.
 * ------------------------------------------------------------------------ */
export const technicalIndex: {
  name: string;
  where: string;
  slugs: string[];
}[] = [
  { name: "Python", where: "Used in five of the projects here", slugs: [] },
  {
    name: "C / C++",
    where: "CHIP-8 interpreter, Raylib debugger, Emscripten build",
    slugs: ["chip-8-emulator"],
  },
  {
    name: "Godot 4 · GDScript",
    where: "Tumbang Preso, engine to shipped build",
    slugs: ["tumbang-preso"],
  },
  {
    name: "LangGraph · LangChain",
    where: "GlycoSwarm's four-specialist StateGraph",
    slugs: ["glycoswarm-ai"],
  },
  {
    name: "PyTorch · ONNX",
    where: "Knee MRI Reader, training through serverless inference",
    slugs: ["knee-mri-reader"],
  },
  {
    name: "Next.js · React · TypeScript",
    where: "Four front ends, including this one",
    slugs: ["knee-mri-reader", "heart-disease-prediction"],
  },
  {
    name: "Node · Express · Redis",
    where: "eGovMed's services and its single-use liveness sessions",
    slugs: ["egovmed"],
  },
  {
    name: "ENet authoritative-host netcode",
    where: "Four-player play, LAN discovery and dedicated lobbies",
    slugs: ["tumbang-preso"],
  },
  {
    name: "Blender",
    where: "Every model and character in Tumbang Preso",
    slugs: ["tumbang-preso"],
  },
  {
    name: "Linux VPS · Vercel",
    where: "A Singapore game server, and everything else here",
    slugs: [],
  },
  {
    name: "scikit-learn · pandas",
    where: "Heart disease model, and the weak-label pipeline",
    slugs: ["heart-disease-prediction"],
  },
  {
    name: "Ollama · self-hosted models",
    where: "Gemma and GLM served on an MI300X with hosted failover",
    slugs: ["glycoswarm-ai"],
  },
];

export const certifications = [
  "AMD Multiagent Systems Deployment",
  "CS50 Introduction to Computer Science",
  "AI Prompt Engineering",
  "Python",
  "C",
];
