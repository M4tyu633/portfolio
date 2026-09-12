import type { Project } from "../types";
export const heartDisease: Project = {
  n: "06",
  slug: "heart-disease-prediction",
  title: "Heart Disease Prediction",
  category: "ML / Clinical",
  year: "2025",
  world: "cardio",
  display: "plex",
  oneLiner:
    "Change a biomarker and follow its signed contribution through to a locally computed model probability.",
  did: "Data preparation, model comparison, and the browser risk instrument.",
  outcome: "0.919 holdout AUC · Random Forest recall 89.2%",
  media: {
    src: "/work/heart/instrument.webp",
    alt: "CardioSense showing real UCI inputs, signed Logistic Regression contributions and the locally computed model probability.",
  },
  built: ["Python", "scikit-learn", "Next.js 16", "TypeScript"],
  links: {
    demo: "https://cardiosense-app.vercel.app",
  },
  facts: [
    {
      label: "Dataset",
      value: "UCI Heart Disease · 920 records · four hospitals",
    },
    {
      label: "Research comparison",
      value: "Random Forest · Gradient Boosting · Logistic Regression",
    },
    { label: "Random Forest holdout", value: "0.919 AUC · 89.2% recall" },
    {
      label: "Random Forest cross-validation",
      value: "0.891 ± 0.019 AUC · five stratified folds",
    },
    {
      label: "Browser model",
      value: "Exported Logistic Regression · local inference",
    },
    {
      label: "Local explanation",
      value: "Signed additive log-odds contributions",
    },
  ],
  lede: "I built a model comparison on the 920-record UCI Heart Disease dataset and a browser instrument that exposes how a score is assembled. A visitor can start from an actual cohort record, change a biomarker, and see its contribution and the resulting probability move together. The research benchmarks and the model running in the browser are explicitly identified.",
  sections: [
    {
      n: "01",
      heading: "Four hospitals, inconsistent records",
      blocks: [
        {
          kind: "p",
          text: "The dataset combines Cleveland, Hungary, Switzerland and Long Beach. The pipeline imputes numeric values with training-set medians, standardizes them, and one-hot encodes categorical findings. Preprocessing is fitted inside the training pipeline; the saved transform is reused by browser inference.",
        },
      ],
    },
    {
      n: "02",
      heading: "Keep the evaluation labels attached",
      blocks: [
        {
          kind: "figures",
          items: [
            { value: "0.919", label: "Random Forest holdout ROC AUC" },
            { value: "89.2", unit: "%", label: "Random Forest holdout recall" },
            {
              value: "0.891",
              unit: "±0.019",
              label: "Random Forest five-fold CV AUC",
            },
          ],
        },
        {
          kind: "p",
          text: "Random Forest, Gradient Boosting and Logistic Regression are compared separately. The browser uses the exported Logistic Regression model, whose holdout AUC is 0.919 and recall is 88.2%; its five-fold CV AUC is 0.884 ± 0.015. Those are historical cohort results, not clinical validation of the interface.",
        },
      ],
    },
    {
      n: "03",
      heading: "Input → attribution → risk",
      blocks: [
        {
          kind: "image",
          src: "/work/heart/contributions.webp",
          alt: "The actual signed coefficient contributions for the selected CardioSense record.",
          caption:
            "A real UCI example. Once edited, the interface labels the inputs as a hypothetical variation.",
        },
        {
          kind: "p",
          text: "The browser applies the saved numeric means and scales, looks up the active categorical coefficients, and adds all thirteen terms to the intercept. A sigmoid converts the sum to the displayed probability. Every signed term stays visible, including values that lower the score.",
        },
        {
          kind: "aside",
          label: "What the explanation means",
          text: "These are additive Logistic Regression terms in log-odds, not SHAP values and not causal effects. The export stores coefficients rounded to four decimals. No tree model, remote inference call, or fabricated ECG is involved.",
        },
      ],
    },
    {
      n: "04",
      heading: "A research instrument with clear limits",
      blocks: [
        {
          kind: "p",
          text: "The initial examples are records 1 and 5 from the repository's UCI dataset. Reset restores the selected record, and the score change is shown in percentage points. The tool demonstrates a model on a historical cohort; it does not diagnose, prescribe treatment, or estimate future cardiac events.",
        },
      ],
    },
  ],
};
