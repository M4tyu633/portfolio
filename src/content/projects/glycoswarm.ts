import type { Project } from "../types";

// Verified against the July 12 source archive: specialists.py, run_pipeline.py,
// agent_core.py and README. Model-chosen cutoffs are not clinical validation.
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
  did: "Lead developer. I designed the graph.",
  outcome: "AMD Developer Hackathon · Track 3",
  media: {
    src: "/work/glycoswarm/home.webp",
    alt: "The GlycoSwarm evidence graph: one patient panel separating into four coloured lanes for the renal, retinal, neuropathy and cardiovascular specialists, which rejoin at a single synthesis junction reading four of four reads arrived.",
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
  /* ⚠ The demo is the PRESERVED one, and the label says so. The original
   * hackathon deployment is offline and its URL is deliberately not restored:
   * a dead link would be worse than no link, and pointing at the old dashboard
   * would misrepresent what a visitor is about to open. */
  links: {
    demo: "https://glycoswarm-demo.vercel.app",
    repo: "https://github.com/M4tyu633/glycoswarm-demo",
  },
  linkLabels: {
    demo: "Open the preserved demo",
    repo: "Read the preserved source",
  },
  facts: [
    { label: "My role", value: "Lead developer · full-stack · demo and pitch" },
    { label: "Team", value: "Snowfall, international and cross-timezone" },
    { label: "Event", value: "AMD Developer Hackathon 2026, Track 3: Unicorn" },
    { label: "Data", value: "NHANES laboratory panels" },
    {
      label: "Inference",
      value: "Gemma 4 on MI300X / Ollama; Fireworks GLM 5.2 fallback",
    },
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
          text: "Live inference ran Gemma 4 on an AMD MI300X through Ollama, with Fireworks GLM 5.2 as the hosted fallback when the GPU was unreachable. The graph sits behind a FastAPI service; the front end is Next.js.",
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
