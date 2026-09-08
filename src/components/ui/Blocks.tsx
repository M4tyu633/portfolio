import Image from "next/image";
import InteractiveFigure from "@/components/figures";
import Figures from "@/components/ui/Figures";
import { Rich } from "@/components/ui/Rich";
import type { Block } from "@/content/types";

/* ===========================================================================
 * The block renderer.
 *
 * One reading column, and only three things are allowed to break out of it:
 * an interactive figure, a row of measured numbers, and an image. That rule is
 * borrowed straight from ciechanow.ski, where the figure sits AT column width
 * inside the prose and the prose points at it. Everything that is not the
 * figure stays quiet.
 * ======================================================================== */

export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <BlockView key={i} block={block} />
      ))}
    </>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "p":
      return (
        <p className="u-prose mt-5">
          <Rich text={block.text} />
        </p>
      );

    case "lead":
      return (
        <p className="u-prose text-ink mt-5 text-[1.25rem] leading-[1.5]">
          <Rich text={block.text} />
        </p>
      );

    case "figures":
      return <Figures items={block.items} caption={block.caption} />;

    case "figure":
      return (
        <div className="not-prose">
          <InteractiveFigure id={block.id} />
          {block.caption ? (
            <p className="u-meta text-ink-3 -mt-8 mb-12 tracking-[0.04em] normal-case">
              {block.caption}
            </p>
          ) : null}
        </div>
      );

    case "aside":
      return (
        <aside className="border-focus my-8 max-w-[34em] border-l-2 pl-4 sm:pl-5">
          <div className="u-meta text-focus">{block.label}</div>
          <p className="text-ink-2 mt-2 text-[0.9375rem] leading-relaxed">
            <Rich text={block.text} />
          </p>
        </aside>
      );

    case "decision":
      return (
        <div className="border-rule my-8 grid max-w-[46em] gap-px border sm:grid-cols-3">
          <Cell label="Situation" text={block.situation} />
          <Cell label="Constraint" text={block.constraint} />
          <Cell label="Decision" text={block.decision} accent />
        </div>
      );

    case "ledger":
      return (
        <dl className="border-rule my-8 max-w-[46em] border-t">
          {block.rows.map((row) => (
            <div
              key={row.key}
              className="border-rule-2 grid gap-x-6 gap-y-1 border-b py-3 sm:grid-cols-[minmax(0,13rem)_minmax(0,1fr)]"
            >
              <dt className="font-mono text-[0.875rem]">{row.key}</dt>
              <dd className="text-ink-2 text-[0.9375rem] leading-relaxed">
                <Rich text={row.value} />
                {row.note ? (
                  <span className="text-ink-3 mt-1 block text-[0.8125rem] leading-relaxed">
                    <Rich text={row.note} />
                  </span>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "list":
      return (
        <ul className="my-6 max-w-[34em] space-y-4">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span
                aria-hidden
                className="text-ink-3 mt-1 font-mono text-[0.7rem] tabular-nums"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-ink-2 text-[1.0625rem] leading-[1.62]">
                <Rich text={item} />
              </span>
            </li>
          ))}
        </ul>
      );

    case "image":
      return (
        <figure className="my-10">
          <div className="border-rule bg-ground-2 relative aspect-[16/10] border">
            <Image
              src={block.src}
              alt={block.alt}
              fill
              sizes="(min-width: 1024px) 70rem, 100vw"
              className={
                block.fit === "contain" ? "object-contain p-6" : "object-cover"
              }
            />
          </div>
          {block.caption ? (
            <figcaption className="u-meta text-ink-3 mt-3 tracking-[0.04em] normal-case">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );

    case "quote":
      return (
        <blockquote className="my-8 max-w-[32em]">
          <p className="u-display text-[clamp(1.25rem,2.6vw,1.75rem)] leading-[1.25]">
            {block.text}
          </p>
          {block.source ? (
            <cite className="u-meta text-ink-3 mt-3 block not-italic">
              {block.source}
            </cite>
          ) : null}
        </blockquote>
      );
  }
}

function Cell({
  label,
  text,
  accent,
}: {
  label: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div className="bg-ground p-4">
      <div
        className="u-meta"
        style={{ color: accent ? "var(--w-focus)" : "var(--w-ink-3)" }}
      >
        {label}
      </div>
      <p className="text-ink-2 mt-2 text-[0.9375rem] leading-relaxed">
        <Rich text={text} />
      </p>
    </div>
  );
}
