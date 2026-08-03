import { contact } from "@/content/data";
import { IconArrow, IconGithub, IconLinkedin, IconMail } from "./Icons";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden px-5 py-28 sm:px-8"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-accent/15 absolute top-1/2 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[130px]" />
      </div>

      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="text-accent mb-3 text-xs font-medium tracking-[0.2em] uppercase">
          Contact
        </p>
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Let&apos;s build something{" "}
          <span className="text-gradient">worth shipping</span>
        </h2>
        <p className="text-muted mx-auto mt-5 max-w-xl text-base leading-relaxed sm:text-lg">
          {contact.blurb}
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href={`mailto:${contact.email}`}
            className="group bg-foreground text-background inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
          >
            <span className="h-4 w-4">
              <IconMail />
            </span>
            {contact.email}
            <span className="h-4 w-4 transition-transform group-hover:translate-x-1">
              <IconArrow />
            </span>
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-3">
          {contact.github && (
            <a
              href={contact.github}
              target="_blank"
              rel="noreferrer"
              className="border-border text-muted hover:border-accent hover:text-accent inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors"
            >
              <span className="h-4 w-4">
                <IconGithub />
              </span>
              GitHub
            </a>
          )}
          {contact.linkedin && (
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noreferrer"
              className="border-border text-muted hover:border-accent hover:text-accent inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors"
            >
              <span className="h-4 w-4">
                <IconLinkedin />
              </span>
              LinkedIn
            </a>
          )}
        </div>
      </Reveal>
    </section>
  );
}
