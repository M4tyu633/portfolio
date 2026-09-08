"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  ResumeIcon,
} from "@/components/chrome/Icons";
import SoundToggle from "@/components/chrome/SoundToggle";
import { contact, gmailCompose, nav } from "@/content/site";
import { useSound } from "@/lib/sound";

/* ===========================================================================
 * NAVIGATION
 *
 * The one thing on this site that is identical in every world. It reads its
 * colours from `--w-*`, so it inverts when a world takes the page over without
 * knowing which world that is.
 *
 * ⚠ THE HIERARCHY IS THE POINT, AND THE FIRST VERSION GOT IT WRONG. It printed
 *   Work · Achievements · About · RESUME · GITHUB · LINKEDIN
 * as one row of text, so three external profiles read as sections of the site.
 * They are not. The order of importance is now built into the markup:
 *
 *   1  the name, and the four real destinations       text, full size
 *   2  GitHub, LinkedIn, Facebook, email              icons, no labels
 *   3  Resume                                         an icon, held apart by a
 *                                                     rule, because a PDF is
 *                                                     not a social profile
 *
 * Every icon still carries an accessible name and a title, so nothing is
 * hidden from a reader just because the visible label is gone.
 *
 * Explicitly not: a floating rounded pill, a fake OS dock, or a desktop menu
 * behind a hamburger. The panel below only exists under 768px.
 * ======================================================================== */

const SOCIALS = [
  { label: "GitHub", href: contact.github, Icon: GithubIcon },
  { label: "LinkedIn", href: contact.linkedin, Icon: LinkedinIcon },
  { label: "Facebook", href: contact.facebook, Icon: FacebookIcon },
];

export default function Nav({
  /** Set on a project page: the nav grows a catalogue tick once you scroll past
   *  the title, which is what carries the project number from the archive row
   *  you pressed into the world you are now standing in. */
  tick,
  /* ⚠ Set on a page whose hero is full-bleed media. The bar starts transparent
   * and inherits the hero's own ink, so a cream strip does not sit across the
   * top of a photograph, then fades to the solid ground once you scroll past
   * it. The BEHAVIOUR never changes: same links, same order, same position.
   * Only the paint does, which is the one thing a project world is allowed to
   * take from the building. */
  overlay,
}: {
  tick?: { n: string; title: string };
  overlay?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { play } = useSound();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 140);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      data-surface={overlay && !scrolled ? "stage" : undefined}
      className="sticky top-0 z-50 border-b transition-colors duration-300"
      style={
        overlay && !scrolled
          ? { background: "transparent", borderColor: "transparent" }
          : { background: "var(--w-ground)", borderColor: "var(--w-rule)" }
      }
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-[4.25rem] max-w-[92rem] items-center gap-5 px-5 sm:px-8"
      >
        <Link
          href="/"
          onPointerEnter={() => play("hover")}
          onClick={() => play("click")}
          className="hover:text-ink-2 shrink-0 text-[1.0625rem] font-medium tracking-[-0.015em] transition-colors"
        >
          Matthew Labrador
        </Link>

        {tick ? (
          <span
            aria-hidden
            className="u-meta text-ink-3 hidden shrink-0 items-center gap-2.5 transition-opacity duration-300 lg:flex"
            style={{ opacity: scrolled ? 1 : 0 }}
          >
            <span className="bg-rule h-3.5 w-px" />
            <span className="text-accent">{tick.n}</span>
            <span>{tick.title}</span>
          </span>
        ) : null}

        <div className="flex-1" />

        {/* ---- 1 · the destinations ---- */}
        <ul className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onPointerEnter={() => play("hover")}
                onClick={() => play("click")}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="group relative block py-1 text-[1.0625rem]"
              >
                <span
                  className={
                    isActive(item.href)
                      ? "text-ink"
                      : "text-ink-2 hover:text-ink"
                  }
                >
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className="bg-accent absolute -bottom-0.5 left-0 h-[2px] transition-[width] duration-300"
                  style={{ width: isActive(item.href) ? "100%" : 0 }}
                />
                <span
                  aria-hidden
                  className="bg-ink-3 absolute -bottom-0.5 left-0 h-[2px] w-0 transition-[width] duration-300 group-hover:w-full"
                />
              </Link>
            </li>
          ))}
        </ul>

        {/* ---- 2 · the profiles ---- */}
        <ul className="hidden items-center lg:flex">
          {SOCIALS.map((s) => (
            <li key={s.label}>
              <IconLink href={s.href} label={s.label}>
                <s.Icon className="h-[1.05rem] w-[1.05rem]" />
              </IconLink>
            </li>
          ))}
          <li>
            <IconLink href={gmailCompose} label="Email">
              <MailIcon className="h-[1.15rem] w-[1.15rem]" />
            </IconLink>
          </li>
        </ul>

        {/* ---- 3 · the utilities ---- */}
        <span aria-hidden className="bg-rule hidden h-5 w-px lg:block" />
        <div className="hidden items-center lg:flex">
          <IconLink href={contact.resume} label="Resume">
            <ResumeIcon className="h-[1.15rem] w-[1.15rem]" />
          </IconLink>
          <SoundToggle />
        </div>

        <div className="flex items-center lg:hidden">
          <SoundToggle />
          <button
            type="button"
            onClick={() => {
              play("click");
              setOpen((v) => !v);
            }}
            aria-expanded={open}
            aria-controls="nav-index"
            className="u-meta text-ink-2 hover:text-ink -mr-2 px-3 py-3"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* ---- mobile / tablet drawer ---- */}
      <div
        id="nav-index"
        hidden={!open}
        className="border-rule bg-ground border-t lg:hidden"
      >
        <ul className="px-5 pt-1 pb-2">
          {nav.map((item) => (
            <li
              key={item.href}
              className="border-rule-2 border-b last:border-0"
            >
              <Link
                href={item.href}
                onClick={() => {
                  play("click");
                  setOpen(false);
                }}
                className="flex items-baseline gap-3 py-3.5"
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                <span className="u-meta text-accent w-3">
                  {isActive(item.href) ? "·" : ""}
                </span>
                <span className="text-xl">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center gap-1 px-4 pb-4">
          {SOCIALS.map((s) => (
            <IconLink key={s.label} href={s.href} label={s.label} big>
              <s.Icon className="h-5 w-5" />
            </IconLink>
          ))}
          <IconLink href={gmailCompose} label="Email" big>
            <MailIcon className="h-[1.35rem] w-[1.35rem]" />
          </IconLink>
          <span aria-hidden className="bg-rule mx-2 h-6 w-px" />
          <a
            href={contact.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="u-meta text-ink-2 hover:text-ink inline-flex items-center gap-2 px-2 py-3"
          >
            <ResumeIcon className="h-[1.15rem] w-[1.15rem]" />
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}

/* A 40px hit area around a ~17px glyph. No pill, no circle, no glow: the
 * treatment is the world's own accent arriving under the icon on hover. */
function IconLink({
  href,
  label,
  children,
  big,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  big?: boolean;
}) {
  const { play } = useSound();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      onPointerEnter={() => play("hover")}
      onClick={() => play("click")}
      className={`group text-ink-3 hover:text-ink relative flex items-center justify-center transition-colors ${
        big ? "h-11 w-11" : "h-10 w-10"
      }`}
    >
      {children}
      <span
        aria-hidden
        className="bg-accent absolute bottom-1.5 left-1/2 h-[2px] w-0 -translate-x-1/2 transition-[width] duration-300 group-hover:w-4 group-focus-visible:w-4"
      />
    </a>
  );
}
