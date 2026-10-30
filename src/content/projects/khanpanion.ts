import type { Project } from "../types";

export const khanpanion: Project = {
  n: "07",
  slug: "khanpanion",
  title: "Khanpanion",
  category: "Education / Learning systems",
  year: "2026",
  world: "khan",
  display: "plex",
  oneLiner:
    "A college-prep study app that turns every wrong answer into the right next lesson.",
  did: "Developer and team lead · Learning engine, application architecture and interface.",
  outcome: "Grand Champion · Khan Academy Education Impact Challenge 2026",
  media: {
    src: "/work/khanpanion/overview.jpg",
    alt: "The current Khanpanion application: navy study workspace, subject browser and interactive learning entry points, captured from the local production export.",
    fit: "contain",
  },
  award: "Grand Champion · Khan Academy Education Impact Challenge 2026",
  built: [
    "Next.js",
    "React",
    "TypeScript",
    "Typed prerequisite graph",
    "Generated question families",
    "Device-local persistence",
    "Khan Academy integration",
  ],
  related: ["khan-academy-education-impact"],
  links: { demo: "https://khanpanion.vercel.app" },
  linkLabels: { demo: "Try Khanpanion" },
  facts: [
    {
      label: "My role",
      value: "Developer · team lead · application architecture",
    },
    { label: "Result", value: "Grand Champion, KEIC 2026" },
    { label: "Stack", value: "Next.js · React · TypeScript" },
    {
      label: "Learning engine",
      value: "Deterministic prerequisite routing and fresh question generation",
    },
    {
      label: "Persistence",
      value: "Device-local progress and resumable practice",
    },
    {
      label: "Delivery",
      value: "Static export on Vercel · no account required",
    },
  ],
  lede: "Khanpanion helps students prepare for college exams. When a student gets a question wrong, it finds the earlier skill they are missing, explains it, points to the right Khan Academy lesson and checks again with a new question. I led the team and built the learning engine and interface in Next.js and TypeScript. Progress saves on the student’s own device, so there is no account to create.",
  sections: [
    {
      n: "01",
      heading: "The prerequisite routing engine",
      standfirst:
        "Model the skill dependencies before deciding which screen comes next.",
      blocks: [
        {
          kind: "lead",
          text: "BACKTRACK turns an answer into a specific next step through a typed prerequisite graph.",
        },
        {
          kind: "p",
          text: "I structured the learning flow around explicit topics, skills, question families and session phases in TypeScript. The route can move from a destination problem to a prerequisite check, a focused explanation and a return to the original goal. The policy is deterministic, so routing can be inspected and tested without a runtime language-model call.",
        },
        {
          kind: "decision",
          situation:
            "A correct answer after a hint is different from independent understanding.",
          constraint:
            "Replaying an exposed question must not manufacture fresh learning evidence.",
          decision:
            "Track assisted attempts separately, generate fresh return questions and require two unassisted answers for the repair check. Keep resource opens and self-reports separate from answer evidence.",
        },
        {
          kind: "image",
          src: "/work/khanpanion/lesson.jpg",
          alt: "Actual Khanpanion fractions lesson showing concept notes, a worked example and topic practice.",
          caption:
            "The current application, captured from its local production export. Original explanations connect to targeted practice and reviewed Khan Academy material.",
        },
      ],
    },
    {
      n: "02",
      heading: "State that survives a study break",
      standfirst: "Progress stays coherent across study sessions.",
      blocks: [
        {
          kind: "p",
          text: "I built device-local study state so learners can leave a practice session and return to the same section and question. Answers persist immediately; active exam time is saved periodically and when the page is hidden. Pauses and section breaks are excluded from active time, and overtime is reported without taking the questions away.",
        },
        {
          kind: "image",
          src: "/work/khanpanion/backtrack.jpg",
          alt: "The actual BACKTRACK learning session with a visual explanation and the prerequisite route alongside it.",
          caption:
            "A real fractions session. The explanation, current skill and destination share one learning state.",
        },
        {
          kind: "ledger",
          rows: [
            {
              key: "Learning state",
              value:
                "Explicit phases for checks, feedback, explanation, pause and return.",
            },
            {
              key: "Assessment state",
              value:
                "Saved answers, current question, active elapsed time and result-key visibility.",
            },
            {
              key: "Study planning",
              value:
                "Goal and routine selections generate a weekly calendar with editable sessions and .ics export.",
            },
            {
              key: "Evidence boundaries",
              value:
                "Independent answers, assisted work, resource visits and recall self-reports retain distinct meanings.",
            },
          ],
        },
      ],
    },
    {
      n: "03",
      heading: "Content, computation and delivery",
      standfirst:
        "One web application connects the reviewer, practice bank and college bridge.",
      blocks: [
        {
          kind: "p",
          text: "The interface brings together topic review, generated practice, timed mock exams, recall cards and first-year prerequisite paths. Khan Academy Philippine curriculum units are matched to relevant topics. Question generation and answer checking live in reusable modules rather than being embedded in individual screens.",
        },
        {
          kind: "p",
          text: "The main study application ships as a static Next.js export on Vercel. Progress stays local and the core learning routes need no account or runtime generative service. Initial loading and Khan Academy content still need connectivity. Optional shared study groups use a separate backend; the browser’s private learning records stay local.",
        },
        {
          kind: "p",
          text: "The source includes checks for generated mathematics and science answers, route transitions, exposed-question handling, saved-state validation and browser flows at phone and desktop widths. That gives the learning rules a verification surface beyond the appearance of a finished screen.",
        },
      ],
    },
    {
      n: "04",
      heading: "Developer, team lead, Grand Champion",
      blocks: [
        {
          kind: "lead",
          text: "Grand Champion · Khan Academy Education Impact Challenge 2026.",
        },
        {
          kind: "p",
          text: "I led the team and developed the application across the learning engine, state management and interface. I also presented the product at the competition. The engineering challenge was making a broad study companion behave like one coherent system, with a clear next action and progress that keeps its meaning across visits.",
        },
        {
          kind: "aside",
          label: "Implementation plan",
          text: "The school rollout proposes facilitator-supported sessions and Khan Academy classes. School reach and learning gains remain implementation and evaluation targets.",
        },
      ],
    },
  ],
};
