/** Presentation copy; detailed project records remain the factual source. */
export const projectNotes: Record<
  string,
  {
    label: string;
    title: string;
    summary: string;
    role: string;
    result: string;
  }
> = {
  "tumbang-preso": {
    label: "01 / Multiplayer game",
    title: "A street game. A whole new playground.",
    summary:
      "The Filipino game of slippers and tin cans, rebuilt for four online players. I developed the gameplay, assembled the world, built the interface and wrote the multiplayer netcode.",
    role: "Sole developer · Game design, art & networking",
    result: "1st Place · Gear Up NCR 2026",
  },
  egovmed: {
    label: "02 / Civic technology",
    title: "One patient. One connected visit.",
    summary:
      "A hospital visit brings enough uncertainty. eGovMed connects sign-in, symptom assessment, booking and payment through eight government services.",
    role: "Full-stack developer · API integrations & pitch",
    result: "eGov Hackathon PH · One of 10 winning teams",
  },
  "glycoswarm-ai": {
    label: "03 / AI systems",
    title: "Four perspectives on one patient.",
    summary:
      "Four specialist agents examine different diabetes risks in parallel. I designed their workflow and led the team from the agent graph to the demo.",
    role: "Lead developer · Agent architecture & deployment",
    result: "AMD Developer Hackathon · Preserved prototype",
  },
  "chip-8-emulator": {
    label: "04 / Systems programming",
    title: "A little machine, understood completely.",
    summary:
      "A C++ interpreter for a 1970s virtual machine, with a debugger that makes every instruction visible. You can run it right here in your browser.",
    role: "Sole developer · Interpreter, debugger & six ROMs",
    result: "35 instructions · 106 core assertions · WebAssembly",
  },
  "knee-mri-reader": {
    label: "05 / Machine learning · Imaging",
    title: "From raw scans to a reading station.",
    summary:
      "A complete MRI pipeline: scan processing, labels from radiology reports, model training and a viewer that puts twelve findings beside the original annotations.",
    role: "Data pipeline · Model training · Web application",
    result: "0.843 macro AUC · Strict out-of-fold evaluation",
  },
  "heart-disease-prediction": {
    label: "06 / Machine learning · Explainability",
    title: "A prediction you can take apart.",
    summary:
      "Change a measurement and see how it moves the score. CardioSense turns heart-disease model research into an interactive explanation, with inference in your browser.",
    role: "Data preparation · Model comparison · Front end",
    result: "920 UCI records · Research demonstration",
  },
};
