import localFont from "next/font/local";
import {
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Libre_Franklin,
  Newsreader,
} from "next/font/google";

// Plex is the common body system. Display faces are scoped to their surfaces.
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

// Exact font file referenced by assets/ui/tumbang_preso.tres in the Godot build.
// Distributed with its SIL Open Font License in public/fonts.
export const daruma = localFont({
  src: "../../public/fonts/DarumadropOne-Regular.ttf",
  variable: "--font-daruma",
  weight: "400",
  display: "swap",
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
