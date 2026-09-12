import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import { about, timeline } from "@/content/about";
import { certifications, contact } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Software developer, BS Computer Science student at UP Manila and DOST scholar. Building across interfaces, systems, games and machine learning.",
};

/* /about is the quietest page on the site, and that is the point. A reader
 * arrives here after four or five project worlds; this one is a column of
 * prose, a portrait, three pieces of evidence and a dated list. No credo, no
 * capability grid, no stat cards. */

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main" className="about-page flex-1">
        <div className="mx-auto max-w-[76rem] px-5 sm:px-8">
          <header className="about-opening" data-seq="rise">
            <div>
              <p className="u-meta text-ink-3">About</p>
              <h1>Matthew Labrador</h1>
              <p className="about-standfirst">
                Computer science at UP Manila. I build games, civic systems and
                machine-learning tools, from the first idea to a working system.
              </p>
            </div>
            <figure>
              <Image
                src={about.portrait.src}
                alt={about.portrait.alt}
                width={600}
                height={750}
                sizes="(min-width: 900px) 26rem, 70vw"
                priority
              />
            </figure>
          </header>

          <div className="about-body">
            <div className="about-prose">
              {about.paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>

            <aside className="about-credentials" aria-label="Credentials">
              {about.credentials.map((c) => (
                <div key={c.label}>
                  <div className="u-meta text-ink-3">{c.label}</div>
                  <p>{c.text}</p>
                </div>
              ))}
            </aside>
          </div>

          {/* Three things that actually happened, each on a named project, in
              place of a philosophy section. */}
          <section aria-labelledby="evidence" className="about-evidence">
            <h2 id="evidence" className="u-display">
              How I make decisions
            </h2>
            <ol>
              {about.evidence.map((e) => (
                <li key={e.label}>
                  <div className="u-meta text-ink-3">{e.label}</div>
                  <p>{e.text}</p>
                  <Link href={e.href} className="u-meta">
                    {e.project} <span aria-hidden>&rarr;</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="timeline" className="about-timeline">
            <h2 id="timeline" className="u-display">
              The path so far
            </h2>

            <ol className="border-rule mt-8 border-t">
              {timeline.map((t) => (
                <li
                  key={`${t.period}-${t.org}`}
                  className="border-rule grid gap-x-8 gap-y-1 border-b py-5 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]"
                >
                  <span className="u-meta text-ink-2 tabular-nums">
                    {t.period}
                  </span>
                  <div>
                    <p className="text-[1.0625rem] tracking-[-0.01em]">
                      {t.role}
                    </p>
                    <p className="u-meta text-ink-2 mt-1 tracking-[0.04em] normal-case">
                      {t.org}
                    </p>
                    {t.note ? (
                      <p className="text-ink-2 mt-2 max-w-[60ch] text-[0.9375rem] leading-relaxed">
                        {t.note}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="border-rule grid gap-x-14 gap-y-8 border-t py-14 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <div className="u-meta text-ink-3">Certifications</div>
              <ul className="mt-3 space-y-1.5">
                {certifications.map((c) => (
                  <li key={c} className="text-[0.9375rem]">
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="u-meta text-ink-3">Based in</div>
              <p className="mt-3 text-[0.9375rem]">{contact.location}</p>
              <div className="u-meta text-ink-3 mt-6">Reading next</div>
              <ul className="mt-3 space-y-1.5">
                <li>
                  <Link
                    href="/work"
                    className="border-ink hover:bg-ink hover:text-ground border-b pb-0.5 text-[0.9375rem] transition-colors"
                  >
                    The archive
                  </Link>
                </li>
                <li>
                  <Link
                    href="/achievements"
                    className="border-ink hover:bg-ink hover:text-ground border-b pb-0.5 text-[0.9375rem] transition-colors"
                  >
                    Achievements
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <div className="u-meta text-ink-3">On paper</div>
              <p className="mt-3">
                <a
                  href={contact.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-ink hover:bg-ink hover:text-ground border-b pb-0.5 text-[0.9375rem] transition-colors"
                >
                  Resume, one page (PDF)
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
