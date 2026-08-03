import { timeline } from "@/content/data";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          eyebrow="Path so far"
          title="Experience & Leadership"
          sub="School, hackathons, and the years of debate that taught me to explain any of it."
        />

        <ol className="border-border relative mt-14 border-l pl-8 sm:pl-10">
          {timeline.map((item, i) => (
            <Reveal as="li" key={`${item.org}-${item.period}`} delay={i * 60}>
              <div className="pb-12 last:pb-0">
                {/* the dot on the line */}
                <span className="border-accent bg-background absolute -left-[7px] mt-2 grid h-3.5 w-3.5 place-items-center rounded-full border-2" />

                <p className="text-accent text-xs font-medium tracking-[0.16em] uppercase">
                  {item.period}
                </p>
                <h3 className="mt-2 text-lg font-bold sm:text-xl">
                  {item.role}
                </h3>
                <p className="text-muted mt-0.5 text-sm">{item.org}</p>

                <ul className="mt-4 space-y-2">
                  {item.bullets.map((bullet, b) => (
                    <li
                      key={b}
                      className="text-muted before:bg-accent relative pl-5 text-sm leading-relaxed before:absolute before:top-2.5 before:left-0 before:h-1 before:w-1 before:rounded-full"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
