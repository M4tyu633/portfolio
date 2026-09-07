import type { Figure } from "@/content/types";

/* ===========================================================================
 * THE FIGURE.
 *
 * The one component that is the same object in all five worlds, and the reason
 * they read as one building. Its rules:
 *
 *   1. The number is set in the mono, at a size well above its label.
 *   2. The label says HOW the number was measured, not what it is. "Contacts
 *      the probe staged", never "Contacts". That distinction is the site's
 *      entire voice.
 *   3. Tone is only ever used on a pair: the number that was wrong beside the
 *      number that replaced it. A row of four "good" figures is a stat-card
 *      dashboard wearing a costume.
 *
 * It takes no colour of its own. `--w-*` decides, so the same figure is chalk
 * on asphalt in one room and ink on office paper in the next.
 * ======================================================================== */

export default function Figures({
  items,
  caption,
  size = "md",
}: {
  items: Figure[];
  caption?: string;
  size?: "md" | "lg";
}) {
  return (
    <figure className="my-10">
      <dl
        className={`grid gap-px ${
          items.length >= 4
            ? "grid-cols-2 lg:grid-cols-4"
            : items.length === 3
              ? "grid-cols-1 sm:grid-cols-3"
              : "grid-cols-2"
        } bg-rule border-rule border`}
      >
        {items.map((f) => (
          <div key={f.label} className="bg-ground px-4 py-5 sm:px-5 sm:py-6">
            <dd
              className={`font-mono leading-[0.95] tracking-[-0.045em] tabular-nums ${
                size === "lg"
                  ? "text-[clamp(2.5rem,6vw,4rem)]"
                  : "text-[clamp(1.9rem,4.4vw,3rem)]"
              }`}
              style={{ color: toneColour(f.tone) }}
            >
              {f.value}
              {f.unit ? (
                <span className="text-ink-3 ml-0.5 text-[0.42em] tracking-normal">
                  {f.unit}
                </span>
              ) : null}
            </dd>
            <dt className="u-meta text-ink-3 mt-3 leading-[1.5] tracking-[0.04em] normal-case">
              {f.label}
            </dt>
          </div>
        ))}
      </dl>
      {caption ? (
        <figcaption className="u-meta text-ink-3 mt-3 tracking-[0.04em] normal-case">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/* `bad` and `good` are deliberately not red and green. They are the world's own
 * ink at two different strengths plus the world's focus colour, so a figure pair
 * reads as "this one, not that one" without importing a traffic light into a
 * palette that was measured off a logo. */
function toneColour(tone: Figure["tone"]) {
  if (tone === "bad") return "var(--w-ink-3)";
  if (tone === "good") return "var(--w-focus)";
  return "var(--w-ink)";
}

/** A single figure, large, standing alone. Used for the one number a section
 *  turns on. */
export function BigFigure({
  value,
  unit,
  label,
}: {
  value: string;
  unit?: string;
  label: string;
}) {
  return (
    <div className="my-10">
      <div className="font-mono text-[clamp(3.5rem,12vw,8rem)] leading-[0.85] tracking-[-0.05em] tabular-nums">
        {value}
        {unit ? (
          <span className="text-ink-3 ml-1 text-[0.3em] tracking-normal">
            {unit}
          </span>
        ) : null}
      </div>
      <p className="u-meta text-ink-3 mt-4 tracking-[0.04em] normal-case">
        {label}
      </p>
    </div>
  );
}
