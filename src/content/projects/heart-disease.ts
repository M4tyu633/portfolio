import type { Project } from "../types";

/* ===========================================================================
 * 06 · HEART DISEASE PREDICTION
 * ======================================================================== */

export const heartDisease: Project = {
  n: "06",
  slug: "heart-disease-prediction",
  title: "Heart Disease Prediction",
  category: "ML / Clinical",
  year: "2025",
  world: "cardio",
  display: "plex",
  oneLiner:
    "Coronary risk from biomarkers, tuned for recall rather than accuracy, with the attributions on screen.",
  did: "Data work, model selection, and the client-side app.",
  outcome: "0.919 ROC-AUC · 89.2% recall",
  media: {
    // A capture of the deployed risk station itself. See scripts/capture-live.sh.
    src: "/work/heart/station.webp",
    alt: "The CardioSense risk station: a 98% predicted probability of stenosis beside a list of SHAP feature drivers.",
  },
  built: ["Python", "scikit-learn", "SHAP", "Next.js 16", "TypeScript"],
  links: {
    demo: "https://cardiosense-app.vercel.app",
    repo: "https://github.com/M4tyu633/heart-disease-prediction",
  },
  facts: [
    { label: "Dataset", value: "UCI Heart Disease, 920 patients, 4 hospitals" },
    {
      label: "Models",
      value:
        "Random Forest · Gradient Boosting · calibrated Logistic Regression",
    },
    {
      label: "Validation",
      value: "0.919 ROC-AUC · 89.2% recall, 5-fold stratified",
    },
    { label: "Explainability", value: "Permutation importance and local SHAP" },
    { label: "Inference", value: "Entirely client-side" },
  ],

  lede: "Coronary artery disease is the leading cause of premature death worldwide, and detecting more than 50% stenosis early is what makes intervention possible. I built the whole chain on the 920-patient UCI multi-centre dataset: imputation that survives non-random missingness, model selection tuned for the failure that actually matters, and a risk station where you can move a biomarker and watch the attribution move with it.",

  sections: [
    {
      n: "01",
      heading: "Four hospitals, four protocols, four kinds of missing",
      blocks: [
        {
          kind: "p",
          text: "The dataset aggregates records from the Cleveland Clinic Foundation, the Hungarian Institute of Cardiology in Budapest, University Hospital Zurich, and the VA Medical Center at Long Beach. Because each followed its own diagnostic protocol, the missingness is not random: it correlates with which hospital you walked into.",
        },
        {
          kind: "figures",
          items: [
            { value: "611", label: "Records missing fluoroscopy vessel count" },
            { value: "486", label: "Records missing thallium scintigraphy" },
            { value: "920", label: "Patients in total" },
          ],
        },
        {
          kind: "p",
          text: "Median imputation and standardised scaling for continuous vitals, one-hot encoding for categoricals, and a missing-indicator column alongside each imputed field, so *“this test was not run here”* stays in the feature set instead of being smoothed away. All of it fitted inside the cross-validation split rather than over the whole frame, so nothing leaks.",
        },
      ],
    },
    {
      n: "02",
      heading: "Recall over accuracy, because the errors are not symmetric",
      blocks: [
        {
          kind: "p",
          text: "A false negative here is a patient with ischemia sent home. A false positive is a stress echo they did not need. Optimising accuracy on an imbalanced cohort treats those as the same mistake.",
        },
        {
          kind: "figures",
          items: [
            { value: "0.919", label: "Holdout ROC-AUC" },
            { value: "89.2", unit: "%", label: "Recall, Random Forest" },
            { value: "90.2", unit: "%", label: "Recall, Gradient Boosting" },
            { value: "0.891", unit: "±0.018", label: "5-fold CV AUC" },
          ],
        },
        {
          kind: "p",
          text: "Logistic Regression, SVM, Random Forest and Gradient Boosting under 5-fold stratified cross-validation. Sigmoid calibration on top, so a predicted 0.3 corresponds to something like 30% prevalence rather than to an arbitrary position on a decision function.",
        },
      ],
    },
    {
      n: "03",
      heading: "What the model was actually looking at",
      blocks: [
        {
          kind: "p",
          text: "Global permutation importance and local SHAP attributions, mostly so I could check the model was not right for the wrong reason.",
        },
        {
          kind: "ledger",
          rows: [
            {
              key: "Asymptomatic chest pain",
              value: "22.4%",
              note: "silent ischemia",
            },
            { key: "Vessels coloured on fluoroscopy", value: "16.5%" },
            { key: "Reversible thallium perfusion defect", value: "14.2%" },
            { key: "Exercise-induced ST depression", value: "11.8%" },
            {
              key: "Max heart rate achieved",
              value: "9.8%",
              note: "chronotropic incompetence",
            },
          ],
        },
        {
          kind: "p",
          text: "That ordering lines up with established cardiology guidance, which is the result I wanted: a model whose top feature was something like resting blood pressure would have been a signal that the pipeline had a leak rather than that cardiology was wrong.",
        },
      ],
    },
    {
      n: "04",
      heading: "The risk station",
      blocks: [
        {
          kind: "p",
          text: "Precomputed model weights and matrix transforms run entirely in the browser. Move a hemodynamic value, a resting ECG parameter or a stress marker and the risk and its attribution waterfall recalculate immediately. No server cold start, and no patient data leaving the machine, which for this kind of tool is the more important half.",
        },
      ],
    },
  ],
};
