/* Identity, contact, navigation, metadata. Everything true of the whole site
 * rather than of one project. */

export const site = {
  name: "Matthew Labrador",
  url: "https://matthewlabrador.vercel.app",
  title: "Matthew Labrador · Software Developer",
  titleTemplate: "%s · Matthew Labrador",
  description:
    "Software developer and computer science student at UP Manila. Award-winning games, civic software, AI systems and working experiments.",
  locale: "en_PH",
};

/** The three-part metadata line that closes every page. */
export const stamp = ["Matthew Labrador", "Manila", "Computer Science"];

export const contact = {
  email: "matthewtlabrador@gmail.com",
  location: "Manila, Philippines",
  github: "https://github.com/M4tyu633",
  linkedin: "https://www.linkedin.com/in/m4tyuuu1/",
  facebook: "https://www.facebook.com/matthewtlabrador",
  resume: "/Matthew_Labrador_Resume.pdf",
  heading: "Contact",
  body: "I'm open to internships, research, technical collaborations and competition teams. Email is the fastest way to reach me.",
};

/* A bare `mailto:` silently does nothing on a machine with no mail client
 * configured, which is most people on a laptop. Gmail's compose window opens in
 * any browser; the footer prints the address itself for everyone else. */
export const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  contact.email,
)}`;

export const nav = [
  { label: "Work", href: "/work" },
  // ⚠ The nav label is "Achievements"; the page's display heading is
  // "Receipts", printed under an "Achievements" kicker so the destination is
  // never in doubt. Calling the nav item "Receipts" made a real page read as a
  // joke.
  { label: "Achievements", href: "/achievements" },
  { label: "About", href: "/about" },
];

/* The opening. */
export const opening = {
  statement: "Curious mind. Hands-on builder.",
  body: "I'm Matthew, a software developer and computer science student at UP Manila. I turn complex ideas into things people can use, play with, and understand.",
  shortBody:
    "Games, AI, civic software and systems experiments. Explore the problems, the decisions, and the results.",
};

/* One row per technology, and the row's whole content is where it was used. A
 * capability with no work under it does not appear. */
export const technicalIndex: {
  name: string;
  where: string;
  slugs: string[];
}[] = [
  {
    name: "Python",
    where: "Data pipelines, model training and the GlycoSwarm backend",
    slugs: [],
  },
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
    where: "GlycoSwarm's four-specialist agent graph",
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
    where: "eGovMed's services and its single-use identity sessions",
    slugs: ["egovmed"],
  },
  {
    name: "ENet authoritative-host netcode",
    where: "Four-player play, LAN discovery and dedicated lobbies",
    slugs: ["tumbang-preso"],
  },
  {
    name: "Blender",
    where: "Game asset work for Tumbang Preso",
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
