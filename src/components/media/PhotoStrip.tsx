"use client";

import Image from "next/image";
import { useRef } from "react";
import { useSound } from "@/lib/sound";

/* ===========================================================================
 * A horizontal strip of real photographs.
 *
 * Scroll-snapped and draggable, with real buttons rather than a carousel
 * library: it is an overflow container and two scrollBy calls. No autoplay, no
 * dots, no infinite loop. On a phone it is just a swipe, which is what a phone
 * already does with an overflowing row.
 * ======================================================================== */

export type Photo = { src: string; alt: string; caption: string };

export default function PhotoStrip({
  photos,
  label,
}: {
  photos: Photo[];
  label: string;
}) {
  const railRef = useRef<HTMLUListElement>(null);
  const { play } = useSound();

  const nudge = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    play("click");
    rail.scrollBy({ left: dir * rail.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section aria-label={label} className="relative">
      <ul
        ref={railRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {photos.map((p) => (
          <li
            key={p.src}
            className="w-[85vw] shrink-0 snap-start sm:w-[46vw] lg:w-[38vw]"
          >
            <figure className="m-0">
              <div className="bg-ground-2 relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 1024px) 38vw, (min-width: 640px) 46vw, 85vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="u-meta text-ink-3 mt-3 normal-case tracking-[0.04em]">
                {p.caption}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-2 flex gap-px">
        <StripButton onClick={() => nudge(-1)} label="Previous photos">
          ←
        </StripButton>
        <StripButton onClick={() => nudge(1)} label="More photos">
          →
        </StripButton>
      </div>
    </section>
  );
}

function StripButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="border-rule text-ink-2 hover:bg-ink hover:text-ground border px-4 py-2 text-lg transition-colors"
    >
      <span aria-hidden>{children}</span>
    </button>
  );
}
