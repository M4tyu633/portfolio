import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import { about, timeline } from "@/content/about";
import { certifications, contact } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "BS Computer Science at UP Manila, DOST undergraduate scholar. Most of my projects end up crossing boundaries I wasn't planning to cross.",
};

/* ===========================================================================
 * ABOUT.
 *
 * After four worlds this page calms down completely. Editorial: one column of
 * prose, wide margins, and annotations in the gutter rather than a row of stat
 * cards. No skill percentages, no capability grid, no four-tile dashboard.
 *
 * The marginalia are anchored to the paragraph they annotate, and on a phone
 * they fold into the flow directly after it, which is what a margin note does
 * in a book that has been reset for a narrower page.
 * ======================================================================== */

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
          <header className="about-opening" data-seq="rise">
            <div>
              <p className="u-meta text-accent">Matthew Labrador · Manila</p>
              <h1>{about.heading}</h1>
              <p>
                Computer science at UP Manila. Games, systems, debate, and a
                habit of asking one more question.
              </p>
            </div>
            <figure>
              <Image
                src={about.portrait.src}
                alt={about.portrait.alt}
                width={600}
                height={750}
                sizes="(min-width: 768px) 400px, 80vw"
                priority
              />
              <figcaption>
                Usually building. Sometimes explaining what I built.
              </figcaption>
            </figure>
          </header>

          {/* ⚠ THE THREE LINES THAT MAKE THIS PAGE WORTH READING, AT SIZE.
           * They were buried mid-paragraph at 19px, which is where a claim
           * about how somebody works goes to be skipped. They are the same
           * sentences, lifted; see content/about.ts. */}
          <section className="credo" aria-label="How I work" data-seq="credo">
            {about.credo.map((line, i) => (
              <p key={line}>
                <span className="u-meta">0{i + 1}</span>
                <span className="u-display">{line}</span>
              </p>
            ))}
          </section>

          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start">
            {/* -------- the prose column -------- */}
            <div>
              {about.paragraphs.map((p, i) => {
                const note = about.marginalia.find((m) => m.after === i);
                return (
                  <div key={i}>
                    <p className="u-prose text-ink mt-0 mb-7 text-[1.1875rem] leading-[1.6]">
                      {p}
                    </p>
                    {note ? (
                      <aside className="border-rule mb-9 border-l pl-4 lg:hidden">
                        <div className="u-meta text-ink-3">{note.label}</div>
                        <p className="text-ink-2 mt-1.5 text-[0.875rem] leading-relaxed">
                          {note.text}
                        </p>
                      </aside>
                    ) : null}
                  </div>
                );
              })}
            </div>

            {/* -------- the gutter -------- */}
            <div className="hidden lg:sticky lg:top-24 lg:block">
              {about.marginalia.map((m) => (
                <div key={m.label} className="border-rule mb-6 border-t pt-3">
                  <div className="u-meta text-ink-3">{m.label}</div>
                  <p className="text-ink-2 mt-1.5 text-[0.875rem] leading-relaxed">
                    {m.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* -------- the timeline -------- */}
          <section aria-labelledby="timeline" className="py-20 sm:py-28">
            <h2
              id="timeline"
              className="u-display text-[clamp(1.6rem,3.2vw,2.5rem)]"
            >
              Where the time went
            </h2>

            <ol className="border-rule mt-10 border-t">
              {timeline.map((t) => (
                <li
                  key={`${t.period}-${t.org}`}
                  className="border-rule grid gap-x-8 gap-y-1 border-b py-5 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)]"
                >
                  <span className="u-meta text-ink-3 tabular-nums">
                    {t.period}
                  </span>
                  <div>
                    <p className="text-[1.0625rem] tracking-[-0.01em]">
                      {t.role}
                    </p>
                    <p className="u-meta text-ink-3 mt-1 tracking-[0.04em] normal-case">
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

          {/* -------- the flat facts -------- */}
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
                    Receipts
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
                  Resume, one page
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
