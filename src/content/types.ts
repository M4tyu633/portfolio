/* ===========================================================================
 * CONTENT TYPES
 *
 * The old `data.ts` was one 800 line file holding every string on a one page
 * site. There are now seven routes and six case studies, so it is one module
 * per project under `projects/`, and this file is the shape they all satisfy.
 *
 * Long-form bodies are a discriminated union of blocks rather than MDX. MDX
 * would have added a compile step to Next 16 + Turbopack in exchange for
 * expressiveness that `Block` already gives, and this way a mistyped figure or
 * a missing caption is a build error rather than something you find in a
 * screenshot.
 * ======================================================================== */

/** Which visual world a surface belongs to. Drives every colour on the page
 *  through the `[data-world]` blocks in globals.css. */
export type WorldId =
  | "index"
  | "tumbang"
  | "egov"
  | "glyco"
  | "chip8"
  | "reading";

/** Which display family a page loads. Never more than one per page, and two of
 *  the worlds deliberately choose the utility family instead. */
export type DisplayId = "serif" | "daruma" | "franklin" | "plex" | "mono";

/** A measured number. The label says how it was measured, not what it is: the
 *  whole site's voice lives in this distinction. */
export type Figure = {
  value: string;
  unit?: string;
  label: string;
  /** Colours the value. `bad` is for the number that was wrong, `good` for the
   *  one that replaced it. Neutral is the default and most figures are neutral. */
  tone?: "neutral" | "good" | "bad";
};

export type Block =
  /** Body copy. */
  | { kind: "p"; text: string }
  /** The one oversized paragraph that opens a section. */
  | { kind: "lead"; text: string }
  /** A row of measured numbers. Two to four; more than that stops reading as
   *  evidence and starts reading as a stat-card dashboard. */
  | { kind: "figures"; items: Figure[]; caption?: string }
  /** A short aside in the margin on desktop, inline on mobile. */
  | { kind: "aside"; label: string; text: string }
  /** How a decision got made. Used down the eGovMed security section, where the
   *  interesting content is the constraint rather than the conclusion. */
  | {
      kind: "decision";
      situation: string;
      constraint: string;
      decision: string;
    }
  /** A flat two-column ledger. The eight integrations, the ROM list. */
  | { kind: "ledger"; rows: { key: string; value: string; note?: string }[] }
  | { kind: "list"; items: string[] }
  | {
      kind: "image";
      src: string;
      alt: string;
      caption?: string;
      fit?: "cover" | "contain";
    }
  /** Mounts one of the interactive figures. The id is checked against the
   *  registry in components/figures/index.tsx. */
  | { kind: "figure"; id: FigureId; caption?: string }
  | { kind: "quote"; text: string; source?: string };

/** Every interactive figure on the site. Adding one here without registering a
 *  component fails the build, which is the point. */
export type FigureId =
  | "tp-throw"
  | "tp-contact"
  | "tp-network"
  | "eg-route"
  | "eg-ledger"
  | "gs-graph"
  | "c8-machine";

export type Section = {
  /** Two-digit index. Persistent across a case study and used as the anchor. */
  n: string;
  heading: string;
  /** Optional one-line answer to "why is this section here". */
  standfirst?: string;
  blocks: Block[];
  /** Breaks the rhythm: full-bleed, centred, no column. Used once, for the flood. */
  breath?: boolean;
};

export type ProjectLinks = {
  demo?: string;
  download?: string;
  trailer?: string;
  gameplay?: string;
};

export type Project = {
  /** Catalogue number. Shown everywhere the project is, in every world. */
  n: string;
  slug: string;
  title: string;
  /** The archive row's classification, e.g. "Game / Multiplayer". */
  category: string;
  year: string;
  world: WorldId;
  display: DisplayId;
  /** One line, present tense, no adjectives. Read in the /work archive. */
  oneLiner: string;
  /** The archive's media stage. */
  media: { src: string; alt: string; fit?: "cover" | "contain" };
  /** Flat facts. Role, team, event, stack. */
  facts: { label: string; value: string }[];
  /** Only the flagship four have a homepage world. */
  home?: {
    headline: string;
    body: string;
    coda?: string;
    figure?: FigureId;
    /** The line that goes under the interactive figure on the homepage. */
    figureCaption?: string;
  };
  /** The case study opening. */
  lede: string;
  sections: Section[];
  links?: ProjectLinks;
  /** Rendered as a small stamped line, never as a gold pill. */
  award?: string;
  /** Technologies. Metadata, printed once, in the case study's colophon. */
  built: string[];
  /** Slugs of related achievements. */
  related?: string[];
};

export type Achievement = {
  n: string;
  slug: string;
  title: string;
  /** "1st Place", "Winner, 1 of 10", "5th Place". */
  result: string;
  org: string;
  year: string;
  /** Tier A gets a page, B expands in place, C is a row and nothing more. */
  tier: "A" | "B" | "C";
  /** Tier B's expandable body. Tier A's page opener. */
  summary?: string;
  /** Tier A only. */
  lede?: string;
  sections?: Section[];
  /** Slug of the project this produced, if any. */
  project?: string;
  facts?: { label: string; value: string }[];
};

export type LabEntry = {
  n: string;
  title: string;
  blurb: string;
  /** Internal route, or an external demo. */
  href: string;
  external?: boolean;
  /** What you can actually do with it. Shown as the row's second line. */
  affordance: string;
  status: "live" | "embedded" | "diagram";
};
