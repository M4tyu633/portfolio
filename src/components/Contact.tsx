"use client";

import { useEffect, useState } from "react";
import { contact, gmailCompose } from "@/content/data";
import {
  IconArrow,
  IconCheck,
  IconCopy,
  IconFacebook,
  IconGithub,
  IconLinkedin,
  IconMail,
} from "./Icons";
import Reveal from "./Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure context or denied) — select the address
      // instead so it can still be copied by hand.
      const sel = window.getSelection();
      const node = document.getElementById("contact-email");
      if (sel && node) {
        const range = document.createRange();
        range.selectNodeContents(node);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  };

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
            href={gmailCompose}
            target="_blank"
            rel="noreferrer"
            className="group bg-foreground text-background inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium transition-transform hover:-translate-y-0.5"
          >
            <span className="h-4 w-4">
              <IconMail />
            </span>
            <span id="contact-email">{contact.email}</span>
            <span className="h-4 w-4 transition-transform group-hover:translate-x-1">
              <IconArrow />
            </span>
          </a>

          <button
            onClick={copyEmail}
            aria-label="Copy email address"
            className={`border-border inline-flex items-center gap-2 rounded-full border px-5 py-3.5 text-sm transition-colors ${
              copied
                ? "border-accent text-accent"
                : "text-muted hover:border-accent hover:text-accent"
            }`}
          >
            <span className="h-4 w-4">
              {copied ? <IconCheck /> : <IconCopy />}
            </span>
            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <p className="text-muted mt-4 text-xs">
          Opens a Gmail compose window. Prefer your own mail app?{" "}
          <a
            href={`mailto:${contact.email}`}
            className="hover:text-accent underline underline-offset-4"
          >
            Use mailto instead
          </a>
          .
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {contact.github && (
            <Social href={contact.github} label="GitHub">
              <IconGithub />
            </Social>
          )}
          {contact.linkedin && (
            <Social href={contact.linkedin} label="LinkedIn">
              <IconLinkedin />
            </Social>
          )}
          {contact.facebook && (
            <Social href={contact.facebook} label="Facebook">
              <IconFacebook />
            </Social>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function Social({
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
      target="_blank"
      rel="noreferrer"
      className="border-border text-muted hover:border-accent hover:text-accent inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors"
    >
      <span className="h-4 w-4">{children}</span>
      {label}
    </a>
  );
}
