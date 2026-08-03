import { services } from "@/content/data";
import { serviceIcons } from "./Icons";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Services() {
  return (
    <section className="relative px-5 py-24 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Capabilities"
          title="What I Do"
          sub="The areas I keep coming back to, and what I actually build in each."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={i * 70} as="article">
              <div className="group border-border bg-surface/40 hover:border-accent/50 hover:bg-surface h-full rounded-2xl border p-7 transition-all duration-300 hover:-translate-y-1">
                <div className="border-border bg-background text-accent group-hover:border-accent/40 mb-5 grid h-12 w-12 place-items-center rounded-xl border transition-colors">
                  <span className="h-6 w-6">{serviceIcons[service.icon]}</span>
                </div>
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-muted mt-3 text-sm leading-relaxed">
                  {service.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
