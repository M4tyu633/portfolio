import localFont from "next/font/local";
import { IBM_Plex_Mono, IBM_Plex_Sans, Newsreader } from "next/font/google";

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

// Existing civic pages share Plex Sans with product UI throughout the site.
export const franklin = plexSans;
