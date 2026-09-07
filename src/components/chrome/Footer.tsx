import Link from "next/link";
import { contact, gmailCompose, nav, stamp } from "@/content/site";

/* The same colophon everywhere. It restates the site's three-part stamp, which
 * is the first thing on the homepage and the last thing on every other page. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-rule bg-ground mt-24 border-t">
      <div className="mx-auto max-w-[88rem] px-5 py-12 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <h2 className="u-display text-[clamp(1.75rem,4vw,2.75rem)]">
              {contact.heading}
            </h2>
            <p className="u-prose mt-4 text-base">{contact.body}</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href={gmailCompose}
                target="_blank"
                rel="noopener noreferrer"
                className="border-ink hover:bg-ink hover:text-ground border-b-2 pb-0.5 text-[0.9375rem] transition-colors"
              >
                {contact.email}
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="u-meta text-ink-3 hover:text-ink transition-colors"
              >
                GitHub
              </a>
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="u-meta text-ink-3 hover:text-ink transition-colors"
              >
                LinkedIn
              </a>
              <a
                href={contact.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="u-meta text-ink-3 hover:text-ink transition-colors"
              >
                Resume
              </a>
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="flex gap-6 sm:flex-col sm:gap-2 sm:text-right">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-ink-2 hover:text-ink text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <hr className="u-rule mt-12" />
        <div className="u-meta text-ink-3 mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
          {stamp.map((s, i) => (
            <span key={s} className="flex items-center gap-3">
              {i > 0 ? <span aria-hidden>/</span> : null}
              {s}
            </span>
          ))}
          <span className="flex-1" />
          <span>{year}</span>
        </div>
      </div>
    </footer>
  );
}
