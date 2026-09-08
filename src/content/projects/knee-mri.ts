import type { Project } from "../types";

/* ===========================================================================
 * 05 · KNEE MRI READER
 *
 * The prose here is rewritten. Every number is the one that was in the old
 * file; the sentences around them are not, because the old ones read like a
 * conference abstract ("A model is only as useful as its delivery").
 * ======================================================================== */

export const kneeMri: Project = {
  n: "05",
  slug: "knee-mri-reader",
  title: "Knee MRI Reader",
  category: "ML / Imaging",
  year: "2026",
  world: "reading",
  display: "plex",
  oneLiner:
    "Twelve knee findings scored from a multi-series DICOM study, in a reading station with real series previews.",
  did: "The whole chain, from raw DICOM to a browser reading station.",
  outcome: "0.843 macro AUC, strict out-of-fold",
  media: {
    // A capture of the deployed reading station. See scripts/capture-live.sh.
    src: "/work/knee-mri/station.webp",
    alt: "The redesigned Knee MRI station: a large sagittal preview, series navigation and held-out scores beside radiologist annotations.",
  },
  built: ["PyTorch", "DINOv2", "ONNX Runtime", "Next.js 16", "React 19"],
  // ⚠ No `repo` here on purpose: M4tyu633/knee-mri-reader is PRIVATE, so a
  // source link would 404 for every visitor. Add it if the repo is opened up.
  links: { demo: "https://knee-mri-reader.vercel.app/" },
  facts: [
    {
      label: "Dataset",
      value: "RSNA Knee Abnormality Detection, 4,407 studies",
    },
    {
      label: "Architecture",
      value: "DINOv2 + cross-view attention, 20-model ensemble",
    },
    { label: "Validation", value: "0.843 macro AUC, strict out-of-fold" },
    {
      label: "Inference",
      value: "Single-member serverless ONNX, client-side DICOM parsing",
    },
    { label: "Findings", value: "Twelve, scored simultaneously" },
  ],

  lede: "A knee MRI is not a photograph. It is a multi-series volume shot on different scanners at different slice thicknesses and contrast weightings, and the finding you are looking for is often visible in exactly one of those series. I built the whole chain: parsing raw unlabelled DICOM, pulling weak supervision out of nine languages of radiology notes, training a multi-view transformer across six anatomical orientations, and serving it as a browser reading station with one real preview frame per acquired series.",

  sections: [
    {
      n: "01",
      heading: "Hospitals do not hand you clean tensors",
      blocks: [
        {
          kind: "p",
          text: "A single patient study contains anywhere from 3 to 12 separate image series, shot on GE, Siemens and Philips machines with arbitrary vendor series names, variable slice spacing, and mixed left and right knees. You cannot feed raw folders into a vision network and expect the axes to mean anything.",
        },
        {
          kind: "p",
          text: "The normalizer reads the directional cosine vectors out of `ImageOrientationPatient` and projects each volume into its true anatomical plane, then slots the series into six canonical buckets: SAG FS, COR FS, AX FS, SAG PD, COR T1, SAG T1. Slices are ordered anatomically, lateral to medial or superior to inferior, and right knees are mirrored so that the medial femoral condyle lands on the same coordinate in every study.",
        },
      ],
    },
    {
      n: "02",
      heading: "58 labelled studies against 4,349 free-text reports",
      blocks: [
        {
          kind: "figures",
          items: [
            {
              value: "58",
              label: "Studies with expert ground truth",
              tone: "bad",
            },
            { value: "4,349", label: "With only a free-text report" },
            { value: "9", label: "Languages those reports were written in" },
          ],
        },
        {
          kind: "p",
          text: "English, Spanish, German, Greek, Bulgarian, Turkish, Portuguese, Italian and French. A regex or a single naive model pass fails on negation (*“no evidence of ACL tear”*, *“ligaments intact”*) and on qualifiers (*“degenerative signal without surfacing tear”*), and both of those failure modes produce confidently wrong labels rather than missing ones.",
        },
        {
          kind: "p",
          text: "I prompted three distinct language models with clinical few-shot examples and took their consensus vote. Scored against the 58 gold-standard cases, consensus reached 0.89 agreement against 0.87 for a single model, and I ran a paired bootstrap test to check the gap was real rather than a lucky split.",
        },
        {
          kind: "aside",
          label: "Where the leverage actually was",
          text: "Clean training labels were the single highest-leverage improvement in the entire project. Nothing I did to the architecture moved the metric as much as fixing what the architecture was being told.",
        },
      ],
    },
    {
      n: "03",
      heading: "Twelve heads, six views, one attention pattern each",
      blocks: [
        {
          kind: "p",
          text: "Different abnormalities live in different planes. An ACL tear is obvious on a sagittal fluid-sensitive cut and invisible on an axial slice. Joint effusion and popliteal cysts are diagnosed primarily on axial sequences. Cartilage loss and bone marrow lesions need coronal T1 and fluid-suppressed views. A single shared representation has to compromise across all of that.",
        },
        {
          kind: "p",
          text: "A frozen DINOv2 extracts patch features per slice, pooled across each series volume. On top of that sits a cross-view attention module with twelve independent classification heads, so each finding learns its own weighting across the six view slots rather than inheriting one.",
        },
      ],
    },
    {
      n: "04",
      heading: "0.997, and why I report 0.843",
      blocks: [
        {
          kind: "figures",
          caption: "The same twenty-model ensemble, scored two ways.",
          items: [
            {
              value: "0.997",
              label: "Macro AUC on its own training data",
              tone: "bad",
            },
            {
              value: "0.843",
              label: "Macro AUC, strict out-of-fold",
              tone: "good",
            },
          ],
        },
        {
          kind: "p",
          text: "In clinical work, memorisation is the dangerous failure. The first number is what the model remembers. The second is what it can do on studies it has never seen, and it is the only one worth quoting.",
        },
        {
          kind: "ledger",
          rows: [
            { key: "Medial osteoarthritis", value: "0.96" },
            { key: "Joint effusion", value: "0.95" },
            { key: "Baker's cyst", value: "0.95" },
            { key: "Fracture", value: "0.90" },
            { key: "MCL tear", value: "0.89" },
            { key: "ACL tear", value: "0.88" },
          ],
        },
        {
          kind: "p",
          text: "Twenty models over a 5-fold stratified split, aggregated by out-of-fold rank pooling rather than by averaging sigmoid probabilities. Logit scales differ across folds, so averaging raw probabilities introduces calibration distortion; converting to percentile ranks first optimises the thing ROC AUC actually measures.",
        },
      ],
    },
    {
      n: "05",
      heading: "The reading station",
      blocks: [
        {
          kind: "p",
          text: "The reading station opens on a large real scan preview. Select a study, switch between acquired series, adjust preview zoom and contrast, and compare twelve held-out scores against radiologist annotations. The bundled cases contain one frame per series, not navigable slice stacks. The original report remains available. Upload inference parses DICOM locally and sends the derived image tensor to a single exported ONNX member, separate from the twenty-model ensemble used for the reported evaluation.",
        },
        {
          kind: "image",
          src: "/work/knee-mri/station.webp",
          alt: "The reading station with a real scan preview, series navigation and per-finding model scores.",
          caption:
            "The station, with the twelve findings scored down the right.",
        },
      ],
    },
  ],
};
