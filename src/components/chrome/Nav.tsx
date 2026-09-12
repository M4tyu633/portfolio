"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import SoundToggle from "./SoundToggle";
import { contact, gmailCompose, nav } from "@/content/site";

export default function Nav({
  tick,
  overlay,
}: {
  tick?: { n: string; title: string };
  overlay?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 100);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <header
      className="gallery-nav"
      data-overlay={(overlay && !scrolled) || undefined}
    >
      <nav aria-label="Primary" className="gallery-nav-inner">
        <Link href="/" className="gallery-brand" onClick={() => setOpen(false)}>
          <strong>
            ML<span>.</span>
          </strong>
          <span>
            MATTHEW
            <br />
            LABRADOR
          </span>
        </Link>
        {tick ? (
          <span className="gallery-nav-project">
            {tick.n} / {tick.title}
          </span>
        ) : null}
        <div className="gallery-nav-links">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a href={contact.resume} target="_blank" rel="noopener noreferrer">
            Résumé ↗
          </a>
        </div>
        <div className="gallery-nav-actions">
          <SoundToggle />
          <a
            href={gmailCompose}
            className="nav-contact"
            target="_blank"
            rel="noopener noreferrer"
          >
            Let’s talk <span aria-hidden="true">↗</span>
          </a>
          <button
            ref={button}
            type="button"
            className="gallery-menu-button"
            aria-expanded={open}
            aria-controls="gallery-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}{" "}
            <span aria-hidden="true">{open ? "−" : "+"}</span>
          </button>
        </div>
      </nav>
      <div className="gallery-mobile-menu" id="gallery-menu" hidden={!open}>
        <nav aria-label="Mobile navigation">
          {nav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={pathname.startsWith(item.href) ? "page" : undefined}
            >
              <span>0{index + 1}</span>
              {item.label}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <a href={contact.resume} target="_blank" rel="noopener noreferrer">
            <span>04</span>Résumé<span aria-hidden="true">↗</span>
          </a>
        </nav>
        <a
          className="mobile-email"
          href={gmailCompose}
          target="_blank"
          rel="noopener noreferrer"
        >
          {contact.email}
        </a>
      </div>
    </header>
  );
}
