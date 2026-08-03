import { about, contact } from "@/content/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { IconDoc, IconMail, IconPin } from "./Icons";

export default function About() {
  return (
    <section id="about" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Who I am"
          title={about.heading}
          sub="A short version. The long version is the projects."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <div className="text-muted space-y-5 text-base leading-relaxed sm:text-lg">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="text-muted mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <span className="inline-flex items-center gap-2">
                <span className="text-accent h-4 w-4">
                  <IconPin />
                </span>
                {contact.location}
              </span>
              <a
                href={`mailto:${contact.email}`}
                className="hover:text-accent inline-flex items-center gap-2 transition-colors"
              >
                <span className="text-accent h-4 w-4">
                  <IconMail />
                </span>
                {contact.email}
              </a>
              {contact.resume && (
                <a
                  href={contact.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-accent inline-flex items-center gap-2 transition-colors"
                >
                  <span className="text-accent h-4 w-4">
                    <IconDoc />
                  </span>
                  Resume
                </a>
              )}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid grid-cols-2 gap-4">
              {about.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="border-border bg-surface/50 hover:border-accent/50 rounded-2xl border p-5 transition-colors"
                >
                  <p className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="text-muted mt-1 text-xs leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
