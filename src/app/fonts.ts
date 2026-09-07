import {
  Darumadrop_One,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Libre_Franklin,
  Newsreader,
} from "next/font/google";

/* ===========================================================================
 * TYPE
 *
 * One persistent superfamily, and exactly one display family per page.
 *
 * IBM Plex Sans and IBM Plex Mono are one family, not two: they share a
 * skeleton, so using both on a page is not the font soup the rule is about.
 * They carry the navigation, the body copy, every label and, critically, every
 * NUMBER on the site. The mono is the site's identity mark.
 *
 * ⚠ Only `plexSans`, `plexMono` and `newsreader` are loaded in the root layout.
 * `daruma` and `franklin` are imported by the two project pages that use them,
 * so no other route pays for a face it never draws. The homepage in particular
 * loads two families and no more, which is why its world panels are
 * differentiated by colour, material, layout and interaction rather than by
 * type: the type change is the reward for walking through the door.
 * ======================================================================== */

export const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

/** The building's display face. Variable optical size, and the italic is what
 *  carries every aside in the archive. */
export const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Tumbang Preso only. This is the actual typeface of the actual game: it is
 *  installed on the machine the game is built on and set in its menus. Using
 *  anything else here would be a portfolio's impression of the game rather than
 *  the game. ⚠ It has no U+00D7, so write "x" rather than a multiplication sign. */
export const daruma = Darumadrop_One({
  variable: "--font-daruma",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  // ⚠ `/work/[slug]` is one route serving six projects, so both display faces
  // are imported by the same module. Preloading would put a <link rel=preload>
  // for Darumadrop on the eGovMed page, which never draws a glyph of it.
  // Turning preload off lets the browser fetch each face only when something on
  // the page actually asks for it.
  preload: false,
});

/** eGovMed only. Franklin Gothic lineage, so it reads as civic and newspaper
 *  rather than as a product sans, and it holds up set in tracked-out caps for
 *  anything that wants to look like a government header. */
export const franklin = Libre_Franklin({
  variable: "--font-franklin",
  subsets: ["latin"],
  display: "swap",
  // See the note on `daruma`.
  preload: false,
});
