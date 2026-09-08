import type { Project } from "../types";
import { chip8 } from "./chip8";
import { egovmed } from "./egovmed";
import { glycoswarm } from "./glycoswarm";
import { heartDisease } from "./heart-disease";
import { kneeMri } from "./knee-mri";
import { tumbangPreso } from "./tumbang-preso";

/* Catalogue order. The archive, the homepage and the sitemap all read this, so
 * the two-digit numbers never disagree with the order they appear in. */
export const projects: Project[] = [
  tumbangPreso,
  egovmed,
  glycoswarm,
  chip8,
  kneeMri,
  heartDisease,
];

/** The four that take over the homepage, in homepage order. */
export const featured: Project[] = [tumbangPreso, egovmed, glycoswarm, chip8];

export function projectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
