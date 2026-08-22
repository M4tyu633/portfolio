import Link from "next/link";
import { contact, hero, navLinks } from "@/content/data";
import { IconFacebook, IconGithub, IconLinkedin, IconMail } from "./Icons";

export default function Footer() {
  // Server-rendered, so this is baked in at build time — no hydration mismatch.
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t px-5 py-12 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="flex items-center gap-2 font-bold">
            <span className="from-accent to-accent-2 text-background grid h-7 w-7 place-items-center rounded-lg bg-linear-to-br text-xs font-bold tracking-tight">
              ML
            </span>
            {hero.name}
          </p>
          <p className="text-muted mt-2 text-sm">
            {contact.location} · Building AI, civic tech, and games.
          </p>
        </div>

        <ul className="text-muted flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {/* Rooted rather than bare hashes: the footer also renders on the
              case-study pages, where "#about" points at nothing. */}
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={`/${link.href}`}
                className="hover:text-accent transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="border-border text-muted hover:border-accent hover:text-accent grid h-9 w-9 place-items-center rounded-full border transition-colors"
            >
              <span className="h-4 w-4">
                <IconGithub />
              </span>
            </a>
          )}
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="border-border text-muted hover:border-accent hover:text-accent grid h-9 w-9 place-items-center rounded-full border transition-colors"
            >
              <span className="h-4 w-4">
                <IconLinkedin />
              </span>
            </a>
          )}
          {contact.facebook && (
            <a
              href={contact.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="border-border text-muted hover:border-accent hover:text-accent grid h-9 w-9 place-items-center rounded-full border transition-colors"
            >
              <span className="h-4 w-4">
                <IconFacebook />
              </span>
            </a>
          )}
          <a
            href={`mailto:${contact.email}`}
            aria-label="Email"
            className="border-border text-muted hover:border-accent hover:text-accent grid h-9 w-9 place-items-center rounded-full border transition-colors"
          >
            <span className="h-4 w-4">
              <IconMail />
            </span>
          </a>
        </div>
      </div>

      <p className="text-muted mx-auto mt-10 max-w-6xl text-xs">
        © {year} {hero.name}. Built with Next.js and Tailwind CSS.
      </p>
    </footer>
  );
}
