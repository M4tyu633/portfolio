import { awards, certifications, skillGroups } from "@/content/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Skills() {
  return (
    <section className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Toolbox"
          title="Skills & Recognition"
          sub="What I reach for, and a few things people handed me along the way."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 60}>
              <div className="border-border bg-surface/40 h-full rounded-2xl border p-7">
                <h3 className="text-accent text-sm font-medium tracking-[0.16em] uppercase">
                  {group.label}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="border-border bg-background text-muted hover:border-accent/50 hover:text-foreground rounded-lg border px-3 py-1.5 text-sm transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="border-border bg-surface/40 h-full rounded-2xl border p-7">
              <h3 className="text-accent text-sm font-medium tracking-[0.16em] uppercase">
                Certifications
              </h3>
              <ul className="mt-5 space-y-2.5">
                {certifications.map((cert) => (
                  <li
                    key={cert}
                    className="text-muted before:bg-accent/60 relative pl-5 text-sm before:absolute before:top-2 before:left-0 before:h-1.5 before:w-1.5 before:rounded-full"
                  >
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={60}>
            <div className="border-border bg-surface/40 h-full rounded-2xl border p-7">
              <h3 className="text-accent text-sm font-medium tracking-[0.16em] uppercase">
                Awards
              </h3>
              <ul className="mt-5 space-y-2.5">
                {awards.map((award) => (
                  <li
                    key={award}
                    className="text-muted before:bg-accent-2/70 relative pl-5 text-sm before:absolute before:top-2 before:left-0 before:h-1.5 before:w-1.5 before:rounded-full"
                  >
                    {award}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
