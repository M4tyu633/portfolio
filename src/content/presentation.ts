import type { WorldId } from "./types";

type Presentation = {
  name: string;
  headline: string;
  caption: string;
  technical: string;
  signals: { label: string; value: string }[];
};
export const presentations: Partial<Record<WorldId, Presentation>> = {
  khan: {
    name: "Khanpanion",
    headline: "A wrong answer.\nA better next step.",
    caption: "College preparation, connected.",
    technical: "Next.js / TypeScript / Deterministic learning engine",
    signals: [
      { label: "Engineering", value: "Typed prerequisite graph" },
      { label: "Delivery", value: "Static app · local persistence" },
      { label: "Recognition", value: "Grand Champion · KEIC 2026" },
    ],
  },
  egov: {
    name: "eGovMed",
    headline: "One patient.\nOne connected visit.",
    caption: "Your health visit starts on your phone.",
    technical: "React / Express / Eight government integrations",
    signals: [
      { label: "My role", value: "Full-stack development · service adapters" },
      { label: "Architecture", value: "Explicit mock/live service boundaries" },
      { label: "Recognition", value: "Grand Champion · eGov Hackathon PH" },
    ],
  },
  glyco: {
    name: "GlycoSwarm AI",
    headline: "Parallel specialists.\nTraceable evidence.",
    caption: "Four perspectives. One inspectable workflow.",
    technical: "LangGraph / FastAPI / Next.js",
    signals: [
      { label: "My role", value: "Agent graph · API · frontend" },
      { label: "Architecture", value: "Four specialists → synthesis" },
      { label: "Artifact", value: "Preserved research prototype" },
    ],
  },
  chip8: {
    name: "CHIP—8",
    headline: "From opcode\nto playable pixels.",
    caption: "A complete machine, in your browser.",
    technical: "C++ / Raylib / WebAssembly",
    signals: [
      {
        label: "Implementation",
        value: "35 instructions · real-time debugger",
      },
      { label: "Validation", value: "106 core assertions" },
      { label: "Delivery", value: "Native + browser · six original ROMs" },
    ],
  },
  reading: {
    name: "Knee MRI Reader",
    headline: "Raw DICOM.\nReadable evidence.",
    caption: "Multi-view learning. A real reading station.",
    technical: "PyTorch / DINOv2 / ONNX / Next.js",
    signals: [
      { label: "Pipeline", value: "DICOM → multi-view model → viewer" },
      { label: "Validation", value: "0.843 macro AUC · strict out-of-fold" },
      { label: "Scope", value: "12 findings · research demonstration" },
    ],
  },
  cardio: {
    name: "CardioSense",
    headline: "A model you\ncan take apart.",
    caption: "Change an input. Follow its contribution.",
    technical: "Python / scikit-learn / TypeScript",
    signals: [
      { label: "Research", value: "920 UCI records · three model families" },
      { label: "Benchmark", value: "0.919 Random Forest holdout AUC" },
      { label: "Browser", value: "Logistic Regression · local inference" },
    ],
  },
};
