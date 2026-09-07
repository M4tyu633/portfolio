"use client";

import { useId, useState } from "react";

/* ===========================================================================
 * THE PROBE, LAID OUT.
 *
 * 36 staged contacts, one cell each, grouped into the six targets the probe
 * grouped them into. Toggle the resolver and watch which cells go dark.
 *
 * ⚠ The counts are his: 36 staged, 20 fired under the engine's area-overlap
 * callbacks, 16 that never fired at all, and they clustered by target rather
 * than scattering. WHICH sixteen is not recorded anywhere I can read, so the
 * arrangement below shows the clustering rather than claiming to be the
 * original table. The caption on the figure says exactly that, because a
 * diagram that looks like a dataset and is not one is worse than no diagram.
 * ======================================================================== */

/** Misses per target column: 0, 1, 2, 4, 4, 5 = 16. Clustered, not scattered. */
const MISSES_PER_TARGET = [0, 1, 2, 4, 4, 5];
const CASES_PER_TARGET = 6;

export default function ContactFigure() {
  const [resolver, setResolver] = useState<"area" | "distance">("area");
  const id = useId();

  const fired =
    resolver === "distance"
      ? 36
      : 36 - MISSES_PER_TARGET.reduce((a, b) => a + b, 0);

  return (
    <figure className="border-rule bg-ground-2 my-12 border">
      <div className="border-rule flex flex-wrap items-center gap-x-4 gap-y-2 border-b px-4 py-3">
        <span id={id} className="u-meta text-ink-3">
          Contact resolver
        </span>
        <div
          role="radiogroup"
          aria-labelledby={id}
          className="border-rule flex border"
        >
          <Choice
            checked={resolver === "area"}
            onSelect={() => setResolver("area")}
            label="Engine callbacks"
          />
          <Choice
            checked={resolver === "distance"}
            onSelect={() => setResolver("distance")}
            label="Host distance check"
          />
        </div>
        <span className="flex-1" />
        <span className="font-mono text-lg tabular-nums">
          <span
            style={{
              color: fired === 36 ? "var(--w-accent)" : "var(--w-focus)",
            }}
          >
            {fired}
          </span>
          <span className="text-ink-3"> / 36</span>
        </span>
        <span className="u-meta text-ink-3 tracking-[0.04em] normal-case">
          contacts resolved
        </span>
      </div>

      <div className="grid grid-cols-3 gap-x-6 gap-y-5 px-4 py-6 sm:grid-cols-6">
        {MISSES_PER_TARGET.map((misses, target) => (
          <div key={target}>
            <div className="u-meta text-ink-3 mb-2">T{target + 1}</div>
            <div className="grid grid-cols-3 gap-1">
              {Array.from({ length: CASES_PER_TARGET }, (_, c) => {
                // The misses sit at the end of each target's run, so a column
                // with five of them reads as a column rather than as noise.
                const missed =
                  resolver === "area" && c >= CASES_PER_TARGET - misses;
                return (
                  <span
                    key={c}
                    aria-hidden
                    className="aspect-square transition-colors duration-300"
                    style={{
                      background: missed ? "transparent" : "var(--w-accent)",
                      border: missed
                        ? "1px dashed var(--w-focus)"
                        : "1px solid var(--w-accent)",
                    }}
                  />
                );
              })}
            </div>
            <div className="u-meta text-ink-3 mt-2 tracking-[0.04em] normal-case tabular-nums opacity-70">
              {resolver === "area"
                ? CASES_PER_TARGET - misses
                : CASES_PER_TARGET}
              /{CASES_PER_TARGET}
            </div>
          </div>
        ))}
      </div>

      {/* The accessible reading of the same data. A grid of coloured squares is
          not information to a screen reader, so the table is the real content
          and the squares are the picture of it. */}
      <p className="sr-only" aria-live="polite">
        {resolver === "area"
          ? "Under the engine's area-overlap callbacks, 20 of 36 staged contacts fired. The 16 that did not clustered into three of the six targets."
          : "Resolved by distance on the host, all 36 staged contacts fired."}
      </p>

      <figcaption className="border-rule text-ink-3 border-t px-4 py-3 text-[0.8125rem] leading-relaxed">
        Six targets, six staged contacts each. The counts are the measured ones:
        20 fired, 16 never fired at all, and the failures clustered by target
        instead of scattering. Which specific sixteen is not something this
        diagram claims to know; the arrangement shows the clustering.
      </figcaption>
    </figure>
  );
}

function Choice({
  checked,
  onSelect,
  label,
}: {
  checked: boolean;
  onSelect: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={checked}
      onClick={onSelect}
      className={`u-meta border-rule border-r px-3 py-1.5 transition-colors last:border-r-0 ${
        checked ? "bg-accent text-accent-ink" : "text-ink-3 hover:text-ink"
      }`}
    >
      {label}
    </button>
  );
}
