/* ============================================================================
 *  ⚙️  THIS IS THE ONLY FILE YOU NEED TO EDIT.
 *
 *  Everything on the site — your name, bio, projects, skills, links, photos —
 *  is read from this file. Change a string here, save, and the page updates.
 *
 *  Anything marked  // TODO  is a placeholder. Swap it for the real thing.
 *  Images live in  public/images/  — drop a file there and reference it as
 *  "/images/your-file.png".
 * ========================================================================== */

/* ---------------------------------------------------------------------------
 * 1. WHO YOU ARE  — the hero section at the top of the page
 * ------------------------------------------------------------------------ */
export const site = {
  // Used for the browser tab title and search results.
  title: "Matthew Labrador · Portfolio",
  description:
    "CS @ UP Manila. I build multi-agent AI, civic tech, and games, from LangGraph clinical swarms to a CHIP-8 emulator written from scratch.",
  // Used for link previews, the sitemap, and structured data. Update this to
  // your real domain after the first Vercel deploy.
  url: "https://matthewlabrador.vercel.app",
  // Shown on the social/link-preview card.
  ogTagline: "AI & Multi-Agent Systems · Civic Tech · Games",
};

export const hero = {
  greeting: "Hi, I'm",
  name: "Matthew Labrador",
  // The line under your name. Keep it short — it's big on screen.
  roles: ["AI & Multi-Agent Systems", "Civic Tech", "Games"],
  tagline:
    "CS student at the University of the Philippines Manila. I build things that ship, and win: a 4-player online game I built alone in five days and took to 1st place in NCR, an AI triage system for public hospitals, and a four-agent clinical screening swarm.",
  // The two small pills above your name. Set either to "" to hide it.
  status: "Open to internships & research",
  highlight: "🏆 1st Place · Gear Up NCR 2026 · Representing NCR at Nationals",
  // Your photo. Drop a square image in public/images/ and point here.
  photo: "/images/profile.jpg",
  primaryCta: { label: "Get in Touch", href: "#contact" },
  secondaryCta: { label: "View Projects", href: "#projects" },
};

/* ---------------------------------------------------------------------------
 * 1b. THE ID BADGE — the card hanging from the lanyard in the hero.
 *     Drag it with the mouse and it swings and spins. Flip it to see the back.
 * ------------------------------------------------------------------------ */
export const badge = {
  org: "University of the Philippines Manila",
  orgShort: "UP MANILA",
  name: "Matthew Labrador",
  role: "BS Computer Science",
  // Shown as small rows on the front of the card.
  fields: [
    { label: "Program", value: "BSCS '29" },
    { label: "Status", value: "University Scholar" },
  ],
  photo: "/images/profile.jpg",
  /* The UP seal, shown in the badge header and next to UP Manila in the
   * timeline. Save the seal as public/images/up-seal.png (a transparent PNG
   * sits best on the coloured header) and set this to "/images/up-seal.png".
   * Left empty it renders nothing at all, so the card never shows a broken
   * image while the file is missing. */
  seal: "",
  // Text on the back of the card.
  backNote: "DOST Undergraduate Scholar",
};

/* ---------------------------------------------------------------------------
 * 2. CONTACT + SOCIAL LINKS
 * ------------------------------------------------------------------------ */
export const contact = {
  email: "matthewtlabrador@gmail.com",
  location: "Manila, Philippines",
  // Set to "" to hide a link entirely.
  github: "https://github.com/M4tyu633",
  linkedin: "https://www.linkedin.com/in/m4tyuuu1/",
  facebook: "https://www.facebook.com/matthewtlabrador/",
  // The Resume button. Set to "" to hide it.
  // To update: replace public/Matthew_Labrador_Resume.pdf with a new export.
  resume: "/Matthew_Labrador_Resume.pdf",
  blurb:
    "I'm open to internships, research work, and hackathon teams. The fastest way to reach me is email.",
};

/* A plain `mailto:` silently does nothing on a machine with no mail client
 * configured, which is most people on a laptop. Opening Gmail's compose window
 * works in any browser, and the copy button covers everyone else. */
export const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
  contact.email,
)}`;

/* ---------------------------------------------------------------------------
 * 3. ABOUT — the short story next to your photo
 * ------------------------------------------------------------------------ */
export const about = {
  heading: "About Me",
  // Each string is its own paragraph.
  paragraphs: [
    "I'm a BS Computer Science student and University Scholar at UP Manila, and a DOST Undergraduate Scholar. In 2026 I took 1st place at the Gear Up NCR Esports Game Dev Challenge as sole developer, and a ₱100,000 prize at the eGov Hackathon PH. Before that I was class valedictorian at PAREF Southridge School.",
    "Most of my work sits where AI meets something physical and messy: hospital queues, patient lab data, a street game played with a tin can. I like problems where the model is only half the answer and the rest is systems design.",
    "Outside of code I spent three years as a competitive debater, which is still the most useful thing I've done for explaining technical work to people who don't share my context.",
  ],
  // Small stat cards. Keep to 3–4 or the row gets cramped.
  stats: [
    { value: "1.0375", label: "Cumulative GWA" },
    { value: "2029", label: "Expected BSCS" },
    { value: "1st", label: "Gear Up NCR 2026" },
    { value: "₱100k", label: "Hackathon prize" },
  ],
};

/* ---------------------------------------------------------------------------
 * 4. WHAT I DO — the card grid
 * ------------------------------------------------------------------------ */
export type Service = { icon: IconName; title: string; body: string };

export const services: Service[] = [
  {
    icon: "agents",
    title: "Agentic AI",
    body: "Multi-agent systems with LangGraph and LangChain: parallel specialist agents, tool use, and synthesis stages that produce one ranked answer.",
  },
  {
    icon: "brain",
    title: "Machine Learning",
    body: "Supervised models end-to-end in Python: cleaning, feature engineering with pandas, and honest evaluation past raw accuracy.",
  },
  {
    icon: "server",
    title: "LLM Deployment",
    body: "Running open models locally and on GPU. Gemma and GLM via Ollama, served through FastAPI with failover when a provider drops.",
  },
  {
    icon: "chip",
    title: "Systems & Low-Level",
    body: "C and C++ close to the metal. Wrote a CHIP-8 emulator from scratch, plus a visual debugger to watch registers and memory live.",
  },
  {
    icon: "gamepad",
    title: "Game Development",
    body: "Godot and GDScript, including authoritative-host networked multiplayer where every contact call has to resolve the same way on all peers.",
  },
  {
    icon: "chart",
    title: "Data & Analysis",
    body: "Turning raw datasets into something decidable: statistical analysis, prompt evaluations across model versions, documented findings.",
  },
];

/* ---------------------------------------------------------------------------
 * 5. PROJECTS  ← the part you'll edit most
 *
 *  featured: true  → big card with an image
 *  featured: false → compact card in the grid below
 *
 *  image: drop a screenshot in public/images/ and point here.
 *  tags:  keep to 3–5, they're the little pills on the card.
 *  links: any you leave out simply won't render.
 * ------------------------------------------------------------------------ */
/* The long-form write-up behind a project card. A project with a `caseStudy`
 * gets its own page at /projects/<slug> and a "Case study" link on its card.
 * Leave it out and the card behaves exactly as it always has. */
export type CaseStudy = {
  // One paragraph under the title. Say what it is and why it was hard.
  intro: string;
  // The small facts panel: role, team, dates, whatever is worth stating flatly.
  facts: { label: string; value: string }[];
  // The body. Each entry is a heading and one paragraph per string.
  sections: { heading: string; body: string[] }[];
  /* Mounts an interactive panel above the body. "chip8" is the only one wired
   * up — it serves the WebAssembly build from public/chip8/. */
  embed?: "chip8";
};

export type Project = {
  title: string;
  // Used for the case-study URL, /projects/<slug>. Lowercase, hyphenated.
  slug: string;
  blurb: string;
  year: string;
  image: string;
  tags: string[];
  featured?: boolean;
  caseStudy?: CaseStudy;
  /* How the image sits in its 16:10 frame.
   *   "cover"   (default) fills the frame and crops any overflow. A 16:10
   *             source fills it exactly, so nothing is lost. Screenshots are
   *             easiest to keep at 16:10 when you take them.
   *   "contain" shows the whole image on a padded backdrop, never cropping.
   *             Use it when the source is not 16:10 and cropping would eat
   *             something that matters, which in practice means logos. */
  fit?: "cover" | "contain";
  // Optional. Renders a gold ribbon on the card. Leave it out for no ribbon.
  award?: string;
  /* Any you leave out simply won't render. `trailer` and `gameplay` are for
   * projects that can't be deployed, like the game; `download` is for one that
   * ships as a build you run rather than a URL you visit. */
  links?: {
    demo?: string;
    download?: string;
    trailer?: string;
    gameplay?: string;
    more?: string;
  };
};

/* The filter buttons above the project grid. Each must match a tag used below,
 * spelled identically. Leave the array empty to fall back to auto-picking the
 * tags that appear on more than one project. */
export const projectFilters: string[] = [
  "Next.js",
  "LangGraph",
  "Python",
  "C/C++",
  "Godot 4",
  "Multiplayer",
];

export const projects: Project[] = [
  {
    title: "Tumbang Preso",
    slug: "tumbang-preso",
    year: "2026",
    featured: true,
    award: "🏆 1st Place · Gear Up NCR Game Dev Challenge 2026",
    blurb:
      "1st place at the Gear Up NCR Esports Game Dev Challenge 2026, now representing the National Capital Region at the national finals in General Santos City. A 4-player networked take on the Filipino street game, built in Godot in five days. I was lead developer and made all of it myself: every model, character, map, menu, sound, bot, physics rule and line of netcode, plus the pitch that won it. Four rounds, one taya defending the can against three attackers, with the defender role rotating so everyone defends exactly once.",
    image: "/images/project-tumbang-preso.jpg",
    tags: ["Godot 4", "GDScript", "Multiplayer", "Blender"],
    links: {
      download:
        "https://drive.google.com/drive/folders/1vbfB_JqTbfrG5mT_SyqvXXy4LsM6LHTy?usp=sharing",
      trailer:
        "https://drive.google.com/file/d/15yPUlkaltsnbQn5zuD2bBwSrXgxYpo9n/view?usp=drive_link",
      gameplay:
        "https://drive.google.com/file/d/1zadxFIYe46-x3y5XQiFOI0cB80uuZlGs/view?usp=drive_link",
    },
    caseStudy: {
      intro:
        "Tumbang Preso is the street game every Filipino kid knows: one person guards a tin can inside a chalk box, everybody else throws a slipper at it from outside. I rebuilt it as a 4-player networked game in Godot 4. A studio would split that across a 3D artist, a UI designer, an SFX designer, a gameplay programmer, someone on AI and physics, and a marketing lead for the pitch. I did all of it, in five days, and then pitched it. It won 1st place at the Gear Up NCR Esports Game Dev Challenge 2026 and is going to the national finals in General Santos City.",
      facts: [
        { label: "Role", value: "Lead developer, built it solo" },
        { label: "Team", value: "BH Studios" },
        { label: "Event", value: "Gear Up NCR Esports Game Dev Challenge, 6 to 8 August 2026" },
        { label: "Result", value: "1st Place, representing NCR at Nationals" },
        { label: "Nationals", value: "General Santos City, Mindanao (ongoing)" },
        { label: "Built in", value: "Five days, empty project to shipped build" },
        { label: "Stack", value: "Godot 4.7 · Forward+ · GDScript · Blender" },
      ],
      sections: [
        {
          heading: "Every layer of it was mine",
          body: [
            "Every 3D model and character, the map, the interface, the sound design, the bots, the physics, the netcode, and the codebase under all of it. Then the marketing, the deck, the pitch, and the Q&A in front of the judges.",
            "Five days is why a lot of what follows looks blunt. I did not have time for the clever version of any of these problems. I had time for the version I could measure, confirm, and then stop thinking about. Most of the decisions below are really decisions about what I could verify fast.",
          ],
        },
        {
          heading: "We got to the venue through the flood",
          body: [
            "The competition ran 6 to 8 August, in the middle of a typhoon. We waded in through knee-deep floodwater every morning, shoes soaked, laptops held up over the water. Nobody on the team ever raised missing a day as an option, which is not nothing when the water is at your knees at 7am.",
            "I built the game alone. I did not get through those three days alone. BH Studios is Paul Andrei Recio, Clarence Pagaduan, Harry Gomez and Hans Xavier Lao, and they carried everything that was not the codebase.",
          ],
        },
        {
          heading: "What a match actually is",
          body: [
            "One player is the taya, stuck inside a chalk box guarding the lata. The other three are attackers throwing tsinelas at it from outside. Four rounds of 90 seconds, one per player, so everyone is taya exactly once. The round count is not a setting I chose, it falls out of having four seats and rotating the role. Scoring is cumulative and personal, so the highest total after the fourth round wins and there is no per-round winner.",
            "The interesting part is not the throw, it is the retrieval. Throwing is free. But your slipper lands inside the taya's box, and walking in to pick it up is exactly what puts you in range of being tagged. Knock the lata over and the taya has to stop and stand it back up, which is the one window they cannot defend.",
          ],
        },
        {
          heading: "I stopped trusting the engine's collision callbacks",
          body: [
            "Tags, slipper contact and the reset ring are all decided by measuring distance on the host. Not by Godot's area-overlap callbacks, which is what I built first and what any tutorial would tell you to use.",
            "I only caught it because I wrote a probe that ran every contact case and counted what actually fired. 16 of 36 overlaps never fired at all. They were not random misses either, they clustered by target. That is the part that would have hurt: if I had shipped it, the bug would have reached me as \"this character feels unfair\", and with the time I had I would have gone and rebalanced a number instead of fixing the physics underneath it.",
            "Deciding on the host also means every peer agrees. A tag that lands on my screen cannot be a miss on yours. That is the whole reason authority sits with the host and not with whoever threw.",
          ],
        },
        {
          heading: "The picks change how you play, but only a little",
          body: [
            "You pick three things: your person, your lata and your tsinelas. All three reach gameplay. Each carries three meters, and I named the meters per tab after what they actually do, because a can does not walk and a slipper does not get stunned. The lata's three are three answers to the same question. The taya wants the can upright, so STANCE refuses the knockdown, RESET shortens the recovery, and REBOUND punishes you for trying.",
            "I kept the spread deliberately narrow, roughly ±10 to 14% across the full range. This is a party game about hitting a can with a slipper. A pick that is 40% better than the others is not a personality, it is just the right answer, and then nobody picks anything else.",
            "Two rules kept me honest. The number has to be readable off the description, because a stat you cannot predict from the lore is a random modifier wearing a costume. And any competitive difference between cosmetic picks has to be declared. My four cans differ in collider radius by 32%, so I derived the scoring window from the STANCE meter instead of from that geometry. Otherwise the best-looking can is quietly the hardest to hit and nothing on screen tells you.",
          ],
        },
        {
          heading: "A host cannot reliably know its own address",
          body: [
            "Hosts broadcast a UDP packet and the browse screen lists whatever it hears. I learned the trap on my own machine: ask it for its address and it offers a LAN card, a Hamachi 25.x, a Radmin 26.x and a few link-local 169.254s, in no promised order. Pick wrong and you send everyone to an address that only exists on the host.",
            "The receiver has no such problem, so the beacon payload carries only the port and the listener takes the host half from the datagram's own source. If anyone later helpfully puts an address back in the payload, the bug is back.",
            "Clicking a discovered game selects it, it does not join. It fills the address field and leaves the press to JOIN. I wanted the typed field to be the only source of truth, so there is never a second hidden way to open a connection.",
          ],
        },
        {
          heading: "Getting it played across the country",
          body: [
            "LAN was never going to be enough for a game whose entire pitch is the friends who moved away. Online runs on dedicated lobbies on a VPS in Singapore, found with join codes over a small UDP status protocol that sits separately from the game ports.",
            "I needed a real server because of my own connection. Like a lot of people on Philippine ISPs, I am behind carrier-grade NAT, where no port-forwarding rule on your own router is reachable from outside at all. The tell is a traceroute landing on a 100.64.x.x address at the second hop. Once you see that, your options are an overlay network, a tunnel, or a machine with a public address. I went and got the machine.",
          ],
        },
        {
          heading: "The pitch counted as much as the build",
          body: [
            "I built the deck out of the game's own nine-patch UI art and the game's own font, so the slides and the product read as one thing instead of a product sitting next to a template. Slides carry keywords only, because I wanted the judges listening rather than reading, and every clip runs muted and looping under narration instead of being given its own airtime.",
            "The spine is a childhood memory and I ran it through the technical half instead of just topping and tailing with it. The contextual controls hang on nobody ever handing you a rulebook. The fairness work hangs on the kid who was always taya and swore it was rigged. The dedicated servers hang on everybody moving away. My first draft kept the memory at the front and the numbers at the back, and it went cold in the middle.",
            "The deeper technical material (probe tables, network measurements, server specs, AI disclosure) sits in an appendix behind the closing slide. I never present it. It is there so that when a judge asks, the receipts are already in the room.",
          ],
        },
        {
          heading: "What happens next",
          body: [
            "The competition is not over. As NCR's representative the game goes to the national finals in General Santos City. DOST and several partner companies are backing the entry from here and are connecting us with industry professionals to take it further.",
            "The build I show there will not be the build that won the region.",
          ],
        },
      ],
    },
  },
  {
    title: "eGovMed",
    slug: "egovmed",
    year: "2026",
    featured: true,
    award: "🏆 Winner (1 of 10) · eGov Hackathon PH 2026 · ₱100,000",
    blurb:
      "One of ten winning teams at the eGov Hackathon PH 2026, with a ₱100,000 prize. An AI triage system for Philippine public healthcare, built with BH Studios: patients are assessed and routed before they queue, so the line itself gets shorter. I worked full-stack and owned the integration of eight government eGov APIs: triage, identity, face liveness, messaging, payments and reporting. I also built the pitch and presented it to the judges.",
    image: "/images/project-egovmed.png",
    fit: "contain", // a logo, so cropping it just cuts the wordmark in half
    tags: ["Next.js", "Node.js", "eGov APIs", "AI Triage"],
    links: {
      demo: "https://egovmed-frontend.vercel.app/",
    },
    caseStudy: {
      intro:
        "Go to a Philippine public hospital and you will re-enter the same details at every counter, repeat labs another facility already ran, and queue a second time just to pay. We built eGovMed to put one login, one record and one payment in front of all of that, on the government's own eGov API stack. I worked full-stack on it and owned the API integrations, then pitched it. It was picked as one of ten winning entries at the eGov Hackathon PH 2026, with a ₱100,000 prize.",
      facts: [
        {
          label: "My role",
          value: "Full-stack dev · API integrations · pitch & presentation",
        },
        { label: "Team", value: "BH Studios, UP Manila" },
        { label: "Event", value: "eGov Hackathon PH 2026" },
        { label: "Result", value: "Winner, 1 of 10 teams · ₱100,000" },
        { label: "Pilot target", value: "Philippine General Hospital" },
        { label: "Stack", value: "React + Vite · Node/Express · Redis · Besu" },
      ],
      sections: [
        {
          heading: "The flow",
          body: [
            "A patient signs in with an eGovPH account and the profile auto-fills from SSO. They describe symptoms in English, Tagalog or Taglish, and triage returns a specialty, an urgency level and any red flags. Identity is confirmed with consent through a face liveness capture and a PhilSys demographic match, then the appointment is booked and a queue number issued with an SMS confirmation. The bill settles through the unified government gateway with statutory discounts already applied.",
            "The point of the ordering is that assessment happens before the queue rather than inside it. Routing a patient to the right specialty and urgency up front is what makes the line shorter, not another screen for joining it.",
          ],
        },
        {
          heading: "Eight government APIs, two modes each",
          body: [
            "I integrated eight of them: eGovPH SSO, eGov AI, National ID eVerify, Face Liveness, eMessage, eGovChain, eGovPay and eReport. I gave every adapter both a mock and a live path, picked per service by an environment variable, so the whole product runs offline with no credentials and a sandbox going down cannot take the demo with it.",
            "That switch doubles as a safety gate. With mocks disallowed in production the app refuses to boot if any integration is still mocked or missing credentials, and it tells you which one. I did not want a forgotten mock quietly serving fake triage or fake payment data to a real patient.",
            "The two portal docs flatly contradicted each other about where the face liveness session ID comes from. I stopped reading and tested it instead: I queried eVerify with a real completed hosted session, then again with a random UUID as a control, and got byte-identical error responses. The control is the only reason that meant anything. On its own, a rejection could just as easily have been a bad demographic match.",
          ],
        },
        {
          heading: "Built for real patient data",
          body: [
            "I assumed real health information from the start, so most of my time went here instead of into features. Records are encrypted at rest with a versioned envelope, and the decryptor reads both formats so a schema change never orphans existing data. On-chain anchoring is hash-only. Payloads are stripped to a type and a timestamp before submission, so no patient ID, facility or clinical content ever reaches the chain, which is what the Data Privacy Act requires.",
            "Liveness sessions are single-use, patient-bound and expire in ten minutes, claimed through a Redis compare-and-set so two simultaneous replays resolve to exactly one success and one rejection. Payment callbacks are treated as non-authoritative: a forged one returns 202 and writes nothing. The SSRF guard lives at the transport rather than the call site, so a later refactor cannot reintroduce the hole by forgetting it in one place.",
            "I picked the failure behaviour rather than inheriting it. Anchor writes fail closed, so an unverifiable record is never stored. Anchor verification fails safe, so an RPC error shows unverified rather than a green badge. A failed SMS never fails a booking. The triage classifier keeps a rule-based floor that can only raise urgency and never lower it, in live mode as well as mock, so a degraded or hostile model response cannot downgrade an emergency.",
          ],
        },
        {
          heading: "Verification",
          body: [
            "I gated merges on thirty backend security regression tests, including a concurrency test for the replay path and one asserting that message bodies never reach the audit log. CI runs the suite, dependency audits on both packages, CodeQL on the security-extended query set, and a secret scan. Branch protection on main requires all of it and blocks force-pushes.",
          ],
        },
      ],
    },
  },
  {
    title: "GlycoSwarm AI",
    slug: "glycoswarm-ai",
    year: "2026",
    featured: true,
    // TODO: no case study yet. Copy the `caseStudy` block from eGovMed above,
    // fill it in, and the card grows a "Case study" link on its own.
    blurb:
      "A multi-agent early-warning system for diabetic complications. A LangGraph StateGraph runs four specialist agents in parallel (renal, neuropathy, retinal and cardiovascular), each writing and executing its own Python scoring code against real NHANES lab data, then fanning into a synthesis agent that ranks the risks and returns one clinical referral. Built as team Snowfall for the AMD Developer Hackathon 2026, Track 3: Unicorn. I was lead developer of an international cross-timezone team and built it full-stack: the agent graph, the FastAPI service and the Next.js front end. I served live inference on an AMD MI300X, and designed and delivered the demo and pitch to the judges.",
    image: "/images/project-glycoswarm.png",
    tags: ["LangGraph", "FastAPI", "Gemma 4", "GLM 5.2", "Next.js"],
    links: {
      demo: "https://glycoswarm-ai.vercel.app/",
    },
  },
  {
    title: "Knee MRI Reader",
    slug: "knee-mri-reader",
    year: "2026",
    featured: false,
    blurb:
      "An AI reading station that scores twelve knee abnormalities from a multi-plane MRI study. Built on the RSNA dataset with DINOv2 vision transformers, cross-view attention across six anatomical orientations, and an out-of-fold ensemble of twenty models. Trained against weak labels extracted via a 3-LLM consensus pipeline across multilingual radiology reports, and deployed as a live interactive DICOM viewer with serverless ONNX inference.",
    image: "/images/project-knee-mri.svg",
    tags: ["Next.js", "Python", "PyTorch", "DINOv2", "ONNX"],
    links: {
      demo: "https://knee-mri-reader.vercel.app/",
    },
    caseStudy: {
      intro:
        "A knee MRI is not a single photo; it is a set of series shot from several angles with different contrast settings. I built an end-to-end reading station that takes raw, unlabelled DICOM series, runs cross-attention across six anatomical views using DINOv2 encoders, and scores twelve abnormalities simultaneously (ligament tears, cartilage tears, three-compartment osteoarthritis, swelling, cysts, contusions, and fractures). Scored honestly at 0.843 macro AUC on completely unseen test studies, with a live Next.js DICOM station for side-by-side comparison with specialist doctor notes.",
      facts: [
        { label: "Domain", value: "Musculoskeletal Radiology & Computer Vision" },
        { label: "Dataset", value: "RSNA Knee Abnormality Detection (4,407 studies)" },
        { label: "Architecture", value: "DINOv2 + Cross-View Attention + 20-Model Ensemble" },
        { label: "Validation", value: "0.843 Macro AUC (Strict Out-of-Fold)" },
        { label: "Inference", value: "ONNX Runtime with client-side DICOM parser" },
        { label: "Stack", value: "Next.js 16 · React 19 · Python · PyTorch · Tailwind" },
      ],
      sections: [
        {
          heading: "Six angles, twelve targets",
          body: [
            "Scans arrive unlabelled from hospital scanners with different zoom levels, orientations, and contrast sequences. The first job is sorting them by plane and sequence from their DICOM headers into six canonical slots: sagittal, coronal, and axial fluid-sensitive sequences, sagittal fluid without fat suppression, and T1 sequences. Right knees are mirrored so the medial and lateral compartments always sit on the same side of the tensor.",
            "The twelve targets are not all visible from any single vantage point. An ACL or PCL tear is clearest on sagittal fluid views, collateral ligament sprains on coronal cuts, and joint effusion or synovitis on axial slices. Trying to force all twelve predictions out of one 2D slice or a generic 3D convnet loses the specific sequence contrast needed for each tissue.",
          ],
        },
        {
          heading: "The hard part: there is almost no answer key",
          body: [
            "Out of 4,407 patient studies, only 58 had direct expert ground-truth labels. The remaining 4,349 arrived with free-text doctor reports written in nine different languages. Anything missed or mislabeled during extraction sets a ceiling on the vision model downstream.",
            "Instead of a single NLP pass, I ran three distinct language models over each clinical report and took the consensus label. Evaluated against the 58 expert ground-truth studies, this ensemble reached 0.89 agreement compared to 0.87 for single-model extraction, a difference verified under a paired bootstrap test.",
          ],
        },
        {
          heading: "Cross-view attention and rank pooling",
          body: [
            "Each slice is encoded using a DINOv2 vision transformer backbone. Each of the twelve abnormality heads maintains independent cross-attention weights over all six series slots, learning to attend to the sequence and angle relevant to its target (such as weighting sagittal cuts for meniscus tears and axial cuts for joint effusion).",
            "To prevent single-model overconfidence, twenty models trained across five cross-validation folds vote on every scan. Predictions are aggregated via rank pooling rather than raw average probabilities, preserving relative ordering and clinical calibration.",
          ],
        },
        {
          heading: "Honest evaluation over memorization",
          body: [
            "If scored on the scans it trained on, the ensemble reaches a 0.997 macro AUC. But testing a model on data it has already seen is just testing memorization. Every metric reported on the site is strictly out-of-fold on unseen studies, where the macro AUC is 0.843 across all twelve findings.",
            "Rare findings like lateral meniscus tears score lower primarily because there are fewer training instances, while high-contrast findings like medial osteoarthritis (0.96 AUC) and joint effusion (0.95 AUC) resolve with high confidence.",
          ],
        },
        {
          heading: "The reading station",
          body: [
            "The web interface is built in Next.js 16 and React 19 as an interactive radiology station. It allows clinicians to scrub through multi-slice DICOM series across all viewports simultaneously, inspect prediction confidences against the radiologist's original text report, and upload local DICOM or image sets for live inference.",
          ],
        },
      ],
    },
  },
  {
    title: "CHIP-8 Emulator",
    slug: "chip-8-emulator",
    year: "2026",
    blurb:
      "I wrote a CHIP-8 emulator from scratch in C/C++: the full core instruction set, memory management, delay and sound timers, and a custom Raylib visual debugger I built to track registers, the stack, and live memory while a ROM runs. I compiled it to WebAssembly so it plays in the browser.",
    image: "/images/project-chip8.svg", // TODO
    tags: ["C/C++", "Raylib", "WebAssembly", "Emulation"],
    links: {
      demo: "https://chip8-emulator-matthew.vercel.app",
    },
    caseStudy: {
      embed: "chip8",
      intro:
        "CHIP-8 is a virtual machine from 1977, built so hobbyists could write a game once and run it on any 8-bit micro with an interpreter. Thirty-five instructions, 4 KB of memory, sixteen 8-bit registers and a 64×32 monochrome display, small enough to hold in your head and awkward enough to stay interesting. I wrote a full interpreter for it in C++17, with a Raylib front end that doubles as a live debugger, running natively and in the browser through WebAssembly.",
      facts: [
        { label: "Language", value: "C++17, no dependencies in the core" },
        { label: "Front end", value: "Raylib, doubling as a debugger" },
        { label: "Tests", value: "106 assertions over the core" },
        { label: "Web build", value: "Emscripten → WebAssembly" },
        { label: "Licence", value: "MIT" },
      ],
      sections: [
        {
          heading: "How to drive it",
          body: [
            "Click the screen first, because the keyboard only reaches the emulator while it has focus. It opens on Brix, a brick breaker: A and D move the paddle. Tab loads the next ROM. There are six, all written by hand for this project: Brix, Pong (two players, 1 and Q on the left, 4 and R on the right), Catch (A and D again), then Bounce, Counter and Keypad, three smaller ROMs that exercise specific instructions rather than being games.",
            "The panel above opens on the game alone. H, or the Show debugger button, folds the machine state in and out. None of it is needed to play, and six panels of hex handed to you unasked is a lot to walk into.",
            "The debugger has its own keys. Space pauses and resumes, N runs exactly one instruction while paused, Backspace restarts the current ROM, and the bracket keys change how many instructions run per frame, which is the emulator's clock speed, eleven by default. F1 through F5 toggle the five hardware quirks described further down.",
            "The keypad panel on the right reads CHIP-8 value / your key, and the two rarely agree. The original COSMAC VIP had a sixteen-key hex pad laid out 1 2 3 C / 4 5 6 D / 7 8 9 E / A 0 B F, mapped here onto the left block of a QWERTY keyboard, so pressing A lights CHIP-8 key 7. Showing only the hex value made the panel look like it was responding to the wrong key entirely.",
          ],
        },
        {
          heading: "The core knows nothing about a window",
          body: [
            "I gave the interpreter no platform dependencies and no idea what a window is. Everything it does is visible in its own state, and the front end reads that state once a frame. That split is what lets the test suite and a headless ASCII runner build and run in CI on a machine with no GPU and no X11 headers at all. The front end is simply switched off at configure time and nothing is fetched or linked.",
          ],
        },
        {
          heading: "A debugger, not a log",
          body: [
            "The right-hand panel is live machine state. V0 to VF in hex and decimal, with a register flashing amber for a moment after it is written. PC, I and SP, plus both timers highlighted while they count down. The call stack, which is the thing that tells you a ROM is about to overflow it. And the eight bytes around I, because I is almost always pointing at whatever matters next: a sprite, a BCD result, or a block of registers about to be loaded.",
            "Under the display is a live disassembly. CHIP-8 instructions are a fixed two bytes, so the listing can be walked from any even address without the usual guesswork about where an instruction actually starts.",
            "My first instinct was to make the listing follow the program counter, and it was wrong. A single frame is eleven instructions scattered across the main loop, every subroutine it calls, and whatever busy-wait the ROM is parked in, so scrolling to wherever the PC stopped picks a different region almost every frame. Brix rewrote all eighteen rows on 110 frames out of 139, which reads as a flicker and cannot be read at all. It now parks over the busiest stretch of code, measured from a decaying histogram of executed addresses, and may move at most twice a second. Fifteen seconds of play settles to three moves. A green wash on a row means it ran recently, so the listing still shows what is executing without anything moving. Pause and it follows the PC exactly again, which is when N single-stepping needs it.",
          ],
        },
        {
          heading: "The quirks are switches, not decisions",
          body: [
            "Programs back then were written against one specific interpreter, and the popular ones disagreed with each other. A ROM that renders perfectly under one set of rules can be unplayable under another, so the five contested behaviours are toggles bound to F1 through F5 rather than choices baked into the code: whether the shift opcodes read Vy or shift in place, whether load and store leave I incremented, whether the bitwise ops reset VF as a side effect, whether draws wait for vertical blank, and whether sprites clip or wrap at the edge.",
            "The defaults are original COSMAC VIP behaviour, which is what the bundled ROMs assume. Most ROMs written after about 1990 want the first two flipped.",
          ],
        },
        {
          heading: "Four things that are easy to get wrong",
          body: [
            "VF is written last. Every arithmetic opcode that sets a flag computes the flag, stores the result, then writes VF. The other order is correct for fifteen of the sixteen registers and wrong for VF itself.",
            "Display wait rewinds the PC. When a draw is held back to the next frame the instruction has already been fetched and the PC has already advanced, so the step rewinds it and the same draw is retried rather than skipped.",
            "Fx0A completes on release, not on press. Waiting for the press is the obvious reading and it is wrong: one held key would satisfy several consecutive Fx0A instructions, which breaks any menu asking for two inputs in a row.",
            "Sprite positions wrap even when the body clips. The starting coordinate is taken modulo the screen size, but a sprite that then runs off the edge is cut off. That asymmetry is real hardware behaviour rather than an oversight, and it, along with the flag-order and release cases, is what the test suite concentrates on.",
          ],
        },
        {
          heading: "The ROMs are original",
          body: [
            "There are no third-party binaries in the repository. I wrote every bundled ROM myself in CHIP-8 assembly, kept the readable source next to it, and wrote a small assembler in the tools directory to build them. Brix is a brick breaker, Pong is two-player, and Catch is a one-button reaction game; three smaller ROMs exercise specific instructions. Bounce paces a ball off the display-wait quirk rather than the delay timer and checks its bounds by equality, since CHIP-8 has no signed comparison and a one-pixel step can only ever overshoot an edge by one. Counter walks 0 to 255 in decimal, where the awkward part is that the load instruction always reads from V0 upwards, so reading the digits back necessarily clobbers the counter. Keypad is a test for the blocking key-wait.",
            "The web build bakes them into a data file next to the WebAssembly, so the page issues no network requests at all once it has loaded.",
          ],
        },
      ],
    },
  },
  {
    title: "Heart Disease Prediction",
    slug: "heart-disease-prediction",
    year: "2025",
    blurb:
      "I trained a supervised learning model to predict heart disease from patient features and took it end to end: data cleaning and feature engineering in pandas, handling missing values and categorical variables, then evaluation past raw accuracy.",
    image: "/images/project-heart.svg", // TODO
    tags: ["Python", "pandas", "Supervised Learning"],
    // TODO: this card has nowhere to go — no demo, no repo link, no case study.
    // Filling in a `caseStudy` block (copy eGovMed's above) is what fixes that.
    // Which dataset, which models compared, and what the evaluation actually
    // showed would be enough.
  },
  // UPLB Code Wars used to sit here. It's a competition rather than a project,
  // so it lives in `awards` below instead.
  // ---- TODO: copy this block for each new project -------------------------
  // {
  //   title: "Your Next Project",
  //   slug: "your-next-project",
  //   year: "2026",
  //   featured: false,
  //   blurb: "One or two sentences on what it does and what was hard about it.",
  //   image: "/images/placeholder.svg",
  //   fit: "cover",
  //   tags: ["Tag", "Tag"],
  //   links: { demo: "" },
  // },
];

/* ---------------------------------------------------------------------------
 * 6. EXPERIENCE & LEADERSHIP — the vertical timeline
 * ------------------------------------------------------------------------ */
export type TimelineItem = {
  period: string;
  role: string;
  org: string;
  bullets: string[];
  /* Optional logo beside the org name. Same rule as `badge.seal`: an empty or
   * missing value renders nothing rather than a broken image. */
  logo?: string;
};

/* Order: school first, because it dates everything else. Then the three 2026
 * competitions in the SAME order as the project grid above — Tumbang Preso,
 * eGovMed, GlycoSwarm — so the two sections agree and reading one after the
 * other doesn't feel like two different lists. Then independent work, then the
 * pre-university years. Every competition here has a project card above it; if
 * you add one to `projects`, add it here too or the sections drift apart. */
export const timeline: TimelineItem[] = [
  {
    period: "2025 – Present",
    role: "BS Computer Science, University Scholar",
    org: "University of the Philippines Manila",
    logo: badge.seal,
    bullets: [
      "DOST Undergraduate Scholar. Cumulative GWA 1.0375.",
      "Active in Google Developer Group and UP Socomsci, coordinating cross-functional teams on operations and event setup.",
    ],
  },
  {
    period: "2026",
    role: "Lead Developer",
    org: "Gear Up NCR Esports Game Dev Challenge",
    bullets: [
      "Won 1st place and now represent NCR at the national finals in General Santos City, backed by DOST and partner companies.",
      "Sole developer on Tumbang Preso, start to finish in five days: 3D models and characters, the map, the UI, sound design, bots, physics, netcode and the codebase under all of it.",
      "Shipped four-player networked play: an authoritative host that resolves contact by distance, LAN discovery over UDP, and dedicated online lobbies on a Singapore VPS.",
      "Ran the marketing, built the deck out of the game's own art, and delivered the pitch, presentation and Q&A to the judges.",
    ],
  },
  {
    period: "2026",
    role: "Full-Stack Developer · Pitch Lead",
    org: "eGov Hackathon PH, 1 of 10 winners (₱100,000)",
    bullets: [
      "Picked as one of ten winning teams, with a ₱100,000 prize, building eGovMed with BH Studios, an AI triage system that assesses and routes patients before they queue.",
      "Built full-stack across the React front end and the Node/Express services behind it.",
      "Owned the integration of eight national eGov APIs: triage, SSO identity, National ID eVerify, face liveness, messaging, payments, reporting and chain anchoring.",
      "Delivered the pitch and the live product demo to the judging panel.",
    ],
  },
  {
    period: "2026",
    role: "Lead Developer",
    org: "AMD Developer Hackathon ACT II, Track 3",
    bullets: [
      "Led an international, cross-timezone team building GlycoSwarm AI, a four-agent clinical screening prototype.",
      "Served live inference on an AMD MI300X GPU via Ollama, with automatic failover to a hosted provider.",
      "Designed and delivered the live product demo and full slide deck to the judges.",
    ],
  },
  {
    period: "2025 – 2026",
    role: "AI Application & LLM Development",
    org: "Independent",
    bullets: [
      "Deployed open LLMs locally to study end-to-end setup, inference, and multi-agent performance.",
      "Built automated summarizer applications on hosted LLM APIs using RAG and agent-to-agent architectures.",
      "Ran structured prompt evaluations across model versions and documented the findings.",
    ],
  },
  {
    period: "2022 – 2025",
    role: "Competitive Debater",
    org: "National Tournaments, Philippines",
    bullets: [
      "Quarterfinalist at the Ateneo Peace Debate; competed at NASH DC (DLSU), PSDC (Ateneo), UP Diliman Debates, XSDC, and ASDC.",
      "Three years of presenting technical arguments clearly under time pressure.",
    ],
  },
  {
    period: "2022 – 2025",
    role: "Math Team Captain · Class Valedictorian",
    org: "PAREF Southridge School",
    bullets: [
      "Gold Medalist and Class Valedictorian, 2025.",
      "Led tutoring sessions and mentored peers for local math competitions.",
    ],
  },
];

/* ---------------------------------------------------------------------------
 * 7. SKILLS — grouped pills
 * ------------------------------------------------------------------------ */
export const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Languages",
    items: [
      "Python",
      "C",
      "C++",
      "TypeScript",
      "JavaScript",
      "SQL",
      "GDScript",
      "HTML",
    ],
  },
  {
    label: "Web & Mobile",
    items: [
      "React",
      "Next.js",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "Capacitor (Android / iOS)",
      "PWA & Web Push",
      "GSAP",
    ],
  },
  {
    label: "Agentic AI & Orchestration",
    items: [
      "LangChain",
      "LangGraph",
      "FastAPI",
      "Multi-Agent Systems",
      "Ollama",
      "RAG",
    ],
  },
  {
    label: "Systems & Games",
    items: [
      "Godot 4",
      "ENet Authoritative-Host Netcode",
      "Raylib",
      "CMake",
      "WebAssembly / Emscripten",
      "Blender",
    ],
  },
  {
    label: "Data & Infrastructure",
    items: [
      "PostgreSQL (Neon)",
      "Drizzle ORM",
      "Redis",
      "JWT Auth",
      "ONNX Runtime",
      "Vercel",
      "Linux VPS",
      "Git",
    ],
  },
  {
    label: "ML & Data",
    items: [
      "pandas",
      "Feature Engineering",
      "Model Evaluation",
      "Data Preprocessing",
      "Prompt Engineering",
      "Model Deployment",
    ],
  },
];

export const certifications = [
  "AMD Multiagent Systems Deployment",
  "CS50 Introduction to Computer Science",
  "AI Prompt Engineering",
  "Python",
  "C",
];

export const awards = [
  "1st Place, Gear Up NCR Esports Game Dev Challenge 2026, representing NCR at the nationals in General Santos City",
  "Winner (1 of 10 teams), eGov Hackathon PH 2026 (₱100,000 prize)",
  "DOST Undergraduate Scholar (2025 – Present)",
  "Top 5 Finalist, Olymphysics NCR (2025)",
  "5th Place, Philippine Statistics Quiz NCR (2025)",
  "Competitor, UPLB Code Wars shadow-coding competition (2025)",
  "Class Valedictorian & Gold Medalist, PAREF Southridge (2025)",
];

/* ---------------------------------------------------------------------------
 * 8. NAV — section links in the header. `href` must match a section id.
 * ------------------------------------------------------------------------ */
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

/* --------------------------------------------------------------------------
 * Icon names available to `services` above. Add new SVGs in
 * src/components/Icons.tsx if you want more.
 * ------------------------------------------------------------------------ */
export type IconName =
  "agents" | "brain" | "server" | "chip" | "gamepad" | "chart";
