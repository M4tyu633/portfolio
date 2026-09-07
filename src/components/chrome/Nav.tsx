"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, utilities } from "@/content/site";

/* ===========================================================================
 * NAVIGATION
 *
 * The one thing on this site that is identical in every world. It reads its
 * colours from `--w-*`, so it inverts when a world takes the page over without
 * knowing anything about which world that is.
 *
 * Explicitly not: a floating rounded pill, a fake OS dock, or a desktop menu
 * hidden behind a hamburger. Four links fit on a phone-adjacent screen and they
 * are shown. The panel below only exists under 640px, where they genuinely
 * do not fit.
 * ======================================================================== */

export default function Nav({
  /** Set on a project page: the nav grows a catalogue tick once you scroll
   *  past the title, which is what carries the project number between the
   *  archive row you clicked and the world you are now standing in. */
  tick,
}: {
  tick?: { n: string; title: string };
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* The panel closes from the press that navigates rather than from an effect
   * watching the pathname. React Compiler's lint rejects setState in an effect
   * body, and the press is the real cause anyway; a route change with no press
   * behind it cannot happen while a full-screen panel is covering the page. */

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="border-rule bg-ground sticky top-0 z-50 border-b">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-[88rem] items-center gap-4 px-5 sm:px-8"
      >
        <Link
          href="/"
          className="hover:text-ink-2 shrink-0 text-[0.9375rem] font-medium tracking-[-0.015em] transition-colors"
        >
          Matthew Labrador
        </Link>

        {/* The catalogue tick. Present only inside a world, and only once the
            title has scrolled away, so it never duplicates what is on screen. */}
        {tick ? (
          <span
            aria-hidden
            className="u-meta text-ink-3 hidden shrink-0 items-center gap-2 transition-opacity duration-300 sm:flex"
            style={{ opacity: scrolled ? 1 : 0 }}
          >
            <span className="bg-rule h-3 w-px" />
            <span className="text-accent">{tick.n}</span>
            <span>{tick.title}</span>
          </span>
        ) : null}

        <div className="flex-1" />

        <ul className="hidden items-center gap-6 sm:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="group relative block py-1 text-sm"
              >
                <span
                  className={
                    isActive(item.href) ? "text-ink" : "text-ink-2 hover:text-ink"
                  }
                >
                  {item.label}
                </span>
                <span
                  aria-hidden
                  className={`bg-ink absolute -bottom-0.5 left-0 h-px transition-[width] duration-300 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        <span aria-hidden className="bg-rule hidden h-4 w-px lg:block" />

        <ul className="hidden items-center gap-5 lg:flex">
          {utilities.map((u) => (
            <li key={u.label}>
              <a
                href={u.href}
                target="_blank"
                rel="noopener noreferrer"
                className="u-meta text-ink-3 hover:text-ink transition-colors"
              >
                {u.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="nav-index"
          className="u-meta text-ink-2 hover:text-ink -mr-1 px-1 py-2 sm:hidden"
        >
          {open ? "Close" : "Index"}
        </button>
      </nav>

      {/* Under 640px only. A list of the same four destinations plus the
          utilities, in the same order, so nothing is discoverable only here. */}
      <div
        id="nav-index"
        hidden={!open}
        className="border-rule bg-ground border-t sm:hidden"
      >
        <ul className="px-5 py-2">
          {nav.map((item) => (
            <li key={item.href} className="border-rule-2 border-b last:border-0">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-3 py-3"
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                <span className="u-meta text-ink-3">
                  {isActive(item.href) ? "·" : ""}
                </span>
                <span className="text-lg">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex gap-5 px-5 pt-1 pb-4">
          {utilities.map((u) => (
            <li key={u.label}>
              <a
                href={u.href}
                target="_blank"
                rel="noopener noreferrer"
                className="u-meta text-ink-3"
              >
                {u.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
