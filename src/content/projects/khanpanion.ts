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
    "Free entrance-exam preparation and a college bridge, with targeted Khan Academy practice when a prerequisite needs work.",
  did: "Team lead, developer and competition presenter.",
  outcome: "Grand Champion · Khan Academy Education Impact Challenge 2026",
  media: {
    src: "/work/khanpanion/home.jpg",
    alt: "Khanpanion's live homepage with its study profile, topic selector and embedded Khan Academy lesson.",
    fit: "contain",
  },
  award: "Grand Champion · Khan Academy Education Impact Challenge 2026",
  built: [
    "Next.js",
    "React",
    "TypeScript",
    "Rule-based remediation",
    "Khan Academy resources",
  ],
  related: ["khan-academy-education-impact"],
  links: { demo: "https://khanpanion.vercel.app" },
  linkLabels: { demo: "Open Khanpanion" },
  facts: [
    { label: "My role", value: "Team lead · development · pitch" },
    { label: "Result", value: "Grand Champion, KEIC 2026" },
    {
      label: "Event",
      value: "Khan Academy Education Impact Challenge, Enactus Philippines",
    },
    {
      label: "For",
      value: "Students preparing for entrance exams and first-year college",
    },
    { label: "Learning core", value: "Khan Academy lessons and practice" },
    {
      label: "Access",
      value: "Free · no account required · device-local progress",
    },
  ],
  lede: "A student can know which exam they want to pass and still have no idea where to start studying. I helped build Khanpanion to connect exam preparation, a weekly plan and the earlier skills a student needs to repair. Our team won Grand Champion at the Khan Academy Education Impact Challenge 2026.",
  sections: [
    {
      n: "01",
      heading: "A study plan with somewhere to begin",
      blocks: [
        {
          kind: "p",
          text: "Students choose their target exams and available study days. Khanpanion brings together topic reviewers, practice exams and a weekly routine, with a college bridge for prerequisites their senior-high strand may not have covered.",
        },
        {
          kind: "p",
          text: "The site is free and does not require an account. Learning progress stays on the student's device. The live application includes study planning, topic lessons, practice exams and study-group entry points.",
        },
      ],
    },
    {
      n: "02",
      heading: "Find the missing step",
      blocks: [
        {
          kind: "p",
          text: "BACKTRACK uses a student's answer to investigate an earlier skill that may need support. It explains the relevant step, routes the learner to a matching Khan Academy lesson and practice, then checks the return with fresh questions.",
        },
        {
          kind: "p",
          text: "The routing is rule-based rather than a runtime generative-model call. A wrong answer is a clue for another check, not proof that a learner has mastered or failed an entire subject.",
        },
      ],
    },
    {
      n: "03",
      heading: "The result and the next step",
      blocks: [
        {
          kind: "lead",
          text: "Grand Champion at the Khan Academy Education Impact Challenge 2026, an Enactus Philippines competition track.",
        },
        {
          kind: "p",
          text: "I led the team and worked on the product and presentation. The school implementation plan proposes sessions supported by NSTP facilitators and Khan Academy classes. Those future reach and learning targets are a plan; they are not claimed here as students already served or measured learning gains.",
        },
      ],
    },
  ],
};
