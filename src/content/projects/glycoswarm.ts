import type { Project } from "../types";

/* ===========================================================================
 * 03 · GLYCOSWARM AI
 *
 * ⚠ This project had no case study in the old data file, only a card blurb.
 * Everything below is drawn from that blurb and from the experience timeline:
 * the four specialist domains, the parallel StateGraph, the agent-written
 * Python, NHANES as the data source, the MI300X with hosted failover, and the
 * team's placement in the event. No metric has been invented to fill it out,
 * and the sections stop where the documented material stops.
 * ======================================================================== */

export const glycoswarm: Project = {
  n: "03",
  slug: "glycoswarm-ai",
  title: "GlycoSwarm AI",
  category: "Agents / Clinical",
  year: "2026",
  world: "glyco",
  display: "plex",
  oneLiner:
    "Four specialist agents score a patient in parallel, then hand their evidence to a synthesis agent.",
  media: {
    src: "/images/project-glycoswarm.png",
    alt: "The GlycoSwarm dashboard, showing the anatomical risk map.",
    fit: "contain",
  },
  built: [
    "LangGraph",
    "FastAPI",
    "Next.js",
    "Gemma 4",
    "GLM 5.2",
    "Ollama",
    "AMD MI300X",
  ],
  links: { demo: "https://glycoswarm-ai.vercel.app/" },
  facts: [
    { label: "My role", value: "Lead developer · full-stack · demo and pitch" },
    { label: "Team", value: "Snowfall, international and cross-timezone" },
    { label: "Event", value: "AMD Developer Hackathon 2026, Track 3: Unicorn" },
    { label: "Data", value: "NHANES laboratory panels" },
    { label: "Inference", value: "Gemma 4 and GLM 5.2 on an MI300X, via Ollama" },
    { label: "Topology", value: "Four specialists in parallel, one synthesis" },
  ],

  home: {
    headline: "Four specialists. One decision.",
    body: "I built a LangGraph system where renal, retinal, neuropathy and cardiovascular agents work in parallel, then hand their evidence to a synthesis agent that decides what matters most.",
    coda: "The diagram below isn't decoration. It's the architecture.",
    figure: "gs-graph",
    figureCaption:
      "Select a specialist to isolate it. The others dim, and its inputs, its job and what it contributes to synthesis appear.",
  },

  lede: "One model can answer a question about a diabetic patient. I wanted four to look at different organs first, and then argue it out somewhere I could inspect. GlycoSwarm is a LangGraph StateGraph that runs renal, retinal, neuropathy and cardiovascular specialists in parallel over real NHANES lab panels, each writing and executing its own Python scoring code, and fans them into a synthesis agent that ranks the risks and returns one clinical referral.",

  sections: [
    {
      n: "01",
      heading: "The graph is the product",
      blocks: [
        { kind: "figure", id: "gs-graph" },
        {
          kind: "p",
          text: "A single model asked to assess a diabetic patient produces one paragraph with everything blended into it, and you cannot tell which finding carried the conclusion. Splitting the assessment into four named domains means every claim on screen has a specialist attached to it, and the synthesis stage has to say which evidence it used.",
        },
        {
          kind: "p",
          text: "The four run **in parallel**, not in a chain. None of them can see another's output, which is the property that makes the synthesis stage meaningful: if they ran in sequence, the fourth would just be agreeing with the first three.",
        },
        {
          kind: "figures",
          items: [
            { value: "4", label: "Specialists, running concurrently" },
            { value: "1", label: "Synthesis stage, ranking their evidence" },
            { value: "1", label: "Clinical referral returned" },
          ],
        },
      ],
    },
    {
      n: "02",
      heading: "Each agent writes its own scoring code",
      blocks: [
        {
          kind: "p",
          text: "The specialists do not answer from the prompt. Each one writes Python against the patient's actual NHANES laboratory panel and executes it, so the number it reports is the output of code you can read rather than a figure a language model produced in prose.",
        },
        {
          kind: "p",
          text: "That is the part I would defend hardest. A clinical screening tool whose numbers are generated as text is a tool that can produce a plausible eGFR that was never calculated. Making the agent emit code and then run it moves the arithmetic out of the model entirely.",
        },
      ],
    },
    {
      n: "03",
      heading: "Serving it",
      blocks: [
        {
          kind: "p",
          text: "Live inference ran on an AMD MI300X through Ollama, with Gemma 4 and GLM 5.2 as the served models and automatic failover to a hosted provider when the GPU was unreachable. The graph sits behind a FastAPI service; the front end is Next.js.",
        },
        {
          kind: "p",
          text: "Failover mattered more than throughput did. A four-agent graph makes at least five model calls per assessment, so any one of them failing takes the whole answer with it. Falling back per call rather than per session means a single dropped request degrades one specialist instead of the referral.",
        },
        {
          kind: "aside",
          label: "The team",
          text: "Snowfall was international and spread across timezones, which mostly meant the graph's contract had to be written down before anyone could work on their half of it. I led the build and owned the agent graph, the FastAPI service and the front end, then designed and delivered the demo and the pitch.",
        },
      ],
    },
  ],
};
