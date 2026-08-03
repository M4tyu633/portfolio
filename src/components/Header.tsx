"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, hero } from "@/content/data";
import { IconMoon, IconSun } from "./Icons";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>(navLinks[0].href);

  /* A bare "#about" is a dead link on a case-study page — there's no such
   * section to jump to. Off the home page the anchors get a leading "/" so
   * they navigate home first and land on the section. The scroll-spy below
   * finds no sections there and leaves `active` alone, so nothing highlights,
   * which is the right answer when no section is on screen. */
  const home = usePathname() === "/";
  const to = (href: string) => (home ? href : `/${href}`);

  /* Solid-ish backdrop once you scroll past the top of the hero. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight the nav link for whichever section is on screen. */
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  /* Don't let the page scroll behind the open mobile menu. */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      /* private browsing — the toggle still works for this session */
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "border-border bg-background/80 border-b backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href={to("#home")}
          className="group flex items-center gap-2 text-base font-bold tracking-tight"
        >
          <span className="from-accent to-accent-2 text-background grid h-8 w-8 place-items-center rounded-lg bg-linear-to-br text-sm font-bold tracking-tight">
            ML
          </span>
          <span className="hidden sm:inline">{hero.name}</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={to(link.href)}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  active === link.href
                    ? "text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="text-muted hover:bg-surface hover:text-foreground grid h-9 w-9 place-items-center rounded-full transition-colors"
          >
            {/* Which icon shows is pure CSS, so there's nothing to hydrate. */}
            <span className="hidden h-5 w-5 dark:block">
              <IconSun />
            </span>
            <span className="block h-5 w-5 dark:hidden">
              <IconMoon />
            </span>
          </button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="text-muted hover:bg-surface hover:text-foreground grid h-9 w-9 place-items-center rounded-full transition-colors lg:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "top-1/2 rotate-45" : "top-0.5"
                }`}
              />
              <span
                className={`absolute top-1/2 left-0 block h-0.5 w-5 bg-current transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${
                  menuOpen ? "top-1/2 -rotate-45" : "bottom-0.5"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`border-border bg-background/95 overflow-hidden backdrop-blur-xl transition-[max-height] duration-300 lg:hidden ${
          menuOpen ? "max-h-96 border-b" : "max-h-0"
        }`}
      >
        <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-4 sm:px-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={to(link.href)}
                onClick={() => setMenuOpen(false)}
                className={`hover:bg-surface block rounded-lg px-4 py-3 text-sm transition-colors ${
                  active === link.href ? "text-accent" : "text-muted"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
