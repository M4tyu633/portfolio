import { hero, contact } from "@/content/data";
import IdBadge from "./IdBadge";
import {
  IconArrow,
  IconDoc,
  IconFacebook,
  IconGithub,
  IconLinkedin,
  IconMail,
} from "./Icons";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center px-5 pt-24 pb-16 sm:px-8"
    >
      {/* Background: faint moving grid + two soft accent glows.
          overflow-hidden lives here, not on the section, so the dragged badge
          can swing past the hero's edges without being clipped. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] opacity-40" />
        <div className="bg-accent/20 absolute -top-24 -left-24 h-96 w-96 rounded-full blur-[120px]" />
        <div className="bg-accent-2/20 absolute -right-24 bottom-0 h-96 w-96 rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.35fr_1fr]">
        {/* Left: the words */}
        <div>
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {hero.highlight && (
              <p className="inline-flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-700 backdrop-blur dark:text-amber-300">
                {hero.highlight}
              </p>
            )}
            {hero.status && (
              <p className="border-border bg-surface/60 text-muted inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="bg-accent absolute inline-flex h-full w-full animate-ping rounded-full opacity-70" />
                  <span className="bg-accent relative inline-flex h-2 w-2 rounded-full" />
                </span>
                {hero.status}
              </p>
            )}
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            {hero.greeting} <span className="text-gradient">{hero.name}</span>
          </h1>

          <h2 className="text-muted mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-lg font-medium sm:text-2xl">
            {hero.roles.map((role, i) => (
              <span key={role} className="flex items-center gap-3">
                {i > 0 && (
                  <span className="text-accent/60" aria-hidden="true">
                    ·
                  </span>
                )}
                {role}
              </span>
            ))}
          </h2>

          <p className="text-muted mt-6 max-w-xl text-base leading-relaxed sm:text-lg">
            {hero.tagline}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="group bg-foreground text-background inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
            >
              {hero.primaryCta.label}
              <span className="h-4 w-4 transition-transform group-hover:translate-x-1">
                <IconArrow />
              </span>
            </a>
            <a
              href={hero.secondaryCta.href}
              className="border-border hover:border-accent hover:text-accent inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors"
            >
              {hero.secondaryCta.label}
            </a>
            {contact.resume && (
              <a
                href={contact.resume}
                target="_blank"
                rel="noreferrer"
                className="border-border text-muted hover:border-accent hover:text-accent inline-flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors"
              >
                <span className="h-4 w-4">
                  <IconDoc />
                </span>
                Resume
              </a>
            )}
          </div>

          <div className="mt-9 flex items-center gap-2">
            {contact.github && (
              <SocialLink href={contact.github} label="GitHub">
                <IconGithub />
              </SocialLink>
            )}
            {contact.linkedin && (
              <SocialLink href={contact.linkedin} label="LinkedIn">
                <IconLinkedin />
              </SocialLink>
            )}
            {contact.facebook && (
              <SocialLink href={contact.facebook} label="Facebook">
                <IconFacebook />
              </SocialLink>
            )}
            <SocialLink href={`mailto:${contact.email}`} label="Email">
              <IconMail />
            </SocialLink>
          </div>
        </div>

        {/* Right: the ID badge on its lanyard — drag it. */}
        <div className="order-first w-full lg:order-last">
          <IdBadge />
        </div>
      </div>
    </section>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noreferrer"
      aria-label={label}
      className="border-border text-muted hover:border-accent hover:text-accent grid h-10 w-10 place-items-center rounded-full border transition-colors"
    >
      <span className="h-[18px] w-[18px]">{children}</span>
    </a>
  );
}
