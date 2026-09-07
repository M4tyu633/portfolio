"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/content/types";

/* ===========================================================================
 * THE ARCHIVE.
 *
 * A museum collection record is a row of typed metadata, and the object
 * photograph is served BESIDE the list rather than inside every row. That is
 * the whole layout: move down the catalogue and the plate changes.
 *
 * The stage updates on hover AND on focus, so tabbing through the rows drives
 * it identically. Every plate is rendered and cross-faded rather than swapped,
 * because a swap shows a blank frame for one paint on a slow connection and
 * turns a catalogue into a flicker.
 *
 * Below `lg` the composition is different rather than scaled: the stage is
 * gone and each row carries its own plate, because a fixed pane beside a list
 * needs a width a phone does not have.
 * ======================================================================== */

export default function Archive({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-x-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:items-start">
      {/* -------- the catalogue -------- */}
      <ol className="border-rule border-t">
        {projects.map((p, i) => (
          <li key={p.slug} className="border-rule border-b">
            <Link
              href={`/work/${p.slug}`}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group block py-5 lg:py-6"
              aria-describedby={`cat-${p.slug}`}
            >
              <div className="flex items-baseline gap-4 sm:gap-6">
                <span
                  className="u-meta tabular-nums transition-colors"
                  style={{
                    color: active === i ? "var(--w-ink)" : "var(--w-ink-3)",
                  }}
                >
                  {p.n}
                </span>
                <span className="u-display min-w-0 flex-1 text-[clamp(1.5rem,3.4vw,2.5rem)]">
                  {p.title}
                </span>
                <span
                  id={`cat-${p.slug}`}
                  className="u-meta text-ink-3 hidden normal-case tracking-[0.04em] sm:block"
                >
                  {p.category}
                </span>
                <span className="u-meta text-ink-3 tabular-nums">{p.year}</span>
              </div>

              <p className="text-ink-2 mt-2 max-w-[46ch] pl-10 text-[0.9375rem] leading-relaxed sm:pl-12">
                {p.oneLiner}
              </p>

              {/* The mobile composition: the plate lives in the row. */}
              <div className="border-rule bg-ground-2 relative mt-4 ml-10 aspect-[16/10] border sm:ml-12 lg:hidden">
                <Image
                  src={p.media.src}
                  alt={p.media.alt}
                  fill
                  sizes="100vw"
                  className={
                    p.media.fit === "contain"
                      ? "object-contain p-5"
                      : "object-cover"
                  }
                />
              </div>
            </Link>
          </li>
        ))}
      </ol>

      {/* -------- the stage -------- */}
      <div className="sticky top-24 hidden lg:block">
        <div className="border-rule bg-ground-2 relative aspect-[16/10] overflow-hidden border">
          {projects.map((p, i) => (
            <div
              key={p.slug}
              aria-hidden
              className="absolute inset-0 transition-opacity duration-[450ms] ease-out"
              style={{ opacity: active === i ? 1 : 0 }}
            >
              <Image
                src={p.media.src}
                alt=""
                fill
                sizes="44rem"
                priority={i === 0}
                className={
                  p.media.fit === "contain"
                    ? "object-contain p-8"
                    : "object-cover"
                }
              />
            </div>
          ))}
        </div>

        <dl className="border-rule mt-px grid grid-cols-2 gap-px border-t sm:grid-cols-3">
          {projects[active].facts.slice(0, 3).map((f) => (
            <div key={f.label} className="bg-ground py-3">
              <dt className="u-meta text-ink-3">{f.label}</dt>
              <dd className="mt-1.5 text-[0.9375rem] leading-snug">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
