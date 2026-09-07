"use client";

import { useState } from "react";

/* ===========================================================================
 * THE AGENT TOPOLOGY.
 *
 * The signature interaction of world 03, and the one the copy promises is not
 * decoration. It is the actual shape of the StateGraph: four specialists in
 * PARALLEL, none of them able to see another's output, fanning into one
 * synthesis stage that ranks their evidence and returns a single referral.
 *
 * ⚠ Each specialist is described at the level the project documents: its
 * domain, that it writes and executes its own Python against the patient's
 * NHANES laboratory panel, and what it hands to synthesis. The specific
 * biomarkers each one reads are not written down anywhere I can read, so they
 * are not written down here either.
 *
 * Connectors are orthogonal 1px rules on a zero-gap grid rather than SVG paths.
 * A bus and four stubs are exactly what a system diagram looks like, and unlike
 * a curve they cannot skew when the grid reflows.
 * ======================================================================== */

const SPECIALISTS = [
  {
    id: "renal",
    name: "Renal",
    domain: "Kidney involvement",
    colour: "var(--gs-renal)",
    job: "Scores renal risk by writing and running its own Python against the patient's laboratory panel.",
    gives: "A renal risk score, with the code that produced it attached.",
  },
  {
    id: "retinal",
    name: "Retinal",
    domain: "Eye involvement",
    colour: "var(--gs-retinal)",
    job: "Scores retinal risk the same way, independently, at the same time.",
    gives: "A retinal risk score, and the panel values it depended on.",
  },
  {
    id: "neuro",
    name: "Neuropathy",
    domain: "Nerve involvement",
    colour: "var(--gs-neuro)",
    job: "Scores peripheral nerve risk from the same panel, without seeing any other specialist's output.",
    gives: "A neuropathy risk score and its supporting evidence.",
  },
  {
    id: "cardio",
    name: "Cardiovascular",
    domain: "Heart and vessel involvement",
    colour: "var(--gs-cardio)",
    job: "Scores cardiovascular risk, in parallel with the other three.",
    gives: "A cardiovascular risk score and its supporting evidence.",
  },
];

export default function GraphFigure() {
  const [focused, setFocused] = useState<string | null>(null);
  const active = SPECIALISTS.find((s) => s.id === focused) ?? null;

  const dim = (id: string) => focused !== null && focused !== id;

  return (
    <figure className="border-rule bg-ground-2 my-12 border">
      <div className="border-rule flex items-baseline gap-3 border-b px-4 py-2.5">
        <span className="u-meta text-ink-3">StateGraph</span>
        <span className="u-meta text-ink-3 ml-auto normal-case tracking-[0.04em] opacity-70">
          Select a specialist to isolate it
        </span>
      </div>

      <div className="px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid items-stretch gap-y-0 lg:grid-cols-[minmax(0,0.85fr)_2.75rem_minmax(0,1.5fr)_2.75rem_minmax(0,0.85fr)]">
          {/* ---- input ---- */}
          <Plate
            label="Input"
            title="Patient panel"
            note="NHANES laboratory values for one patient."
            className="lg:row-span-4 lg:self-center"
          />

          {/* ---- the fan out ---- */}
          <Bus side="left" focusedIndex={SPECIALISTS.findIndex((s) => s.id === focused)} />

          {/* ---- specialists ---- */}
          <ul className="border-rule my-4 border lg:row-span-4 lg:my-0">
            {SPECIALISTS.map((s) => (
              <li
                key={s.id}
                className="border-rule-2 border-b last:border-0"
                style={{ height: "calc(100% / 4)" }}
              >
                <button
                  type="button"
                  aria-pressed={focused === s.id}
                  onClick={() => setFocused(focused === s.id ? null : s.id)}
                  className="bg-ground flex h-full w-full items-center gap-3 px-4 py-3.5 text-left transition-opacity duration-300"
                  style={{ opacity: dim(s.id) ? 0.32 : 1 }}
                >
                  <span
                    aria-hidden
                    className="h-8 w-[3px] shrink-0 transition-all duration-300"
                    style={{
                      background: s.colour,
                      height: focused === s.id ? "2.25rem" : "2rem",
                    }}
                  />
                  <span className="min-w-0">
                    <span className="block text-[1.0625rem] leading-tight font-medium tracking-[-0.01em]">
                      {s.name}
                    </span>
                    <span className="u-meta text-ink-3 mt-1 block normal-case tracking-[0.04em]">
                      {s.domain}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>

          {/* ---- the fan in ---- */}
          <Bus side="right" focusedIndex={SPECIALISTS.findIndex((s) => s.id === focused)} />

          {/* ---- synthesis ---- */}
          <div className="lg:row-span-4 lg:self-center">
            <Plate
              label="Synthesis"
              title="One decision"
              note="Ranks the four sets of evidence and decides what matters most."
              accent
            />
            <div
              aria-hidden
              className="mx-auto h-6 w-px lg:mx-0 lg:ml-6"
              style={{ background: "var(--w-rule)" }}
            />
            <Plate label="Output" title="Clinical referral" note="One." />
          </div>
        </div>

        {/* ---- the isolated specialist ---- */}
        <div
          aria-live="polite"
          className="border-rule bg-ground mt-6 border p-4 sm:p-5"
        >
          {active ? (
            <div className="grid gap-5 sm:grid-cols-3">
              <Field label="Input" value="The patient's NHANES laboratory panel." />
              <Field label="Responsibility" value={active.job} />
              <Field label="Into synthesis" value={active.gives} />
            </div>
          ) : (
            <p className="text-ink-2 text-[0.9375rem] leading-relaxed">
              The four run at the same time and none of them can see another&rsquo;s
              output. If they ran in sequence, the fourth would be agreeing with
              the first three, and the synthesis stage would have nothing to
              rank.
            </p>
          )}
        </div>
      </div>

      <figcaption className="border-rule text-ink-3 border-t px-4 py-3 text-[0.8125rem] leading-relaxed">
        The topology is the implemented one. What each specialist reads out of
        the panel is not documented in the project, so it is not stated here.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------------ */

function Plate({
  label,
  title,
  note,
  accent,
  className = "",
}: {
  label: string;
  title: string;
  note: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`bg-ground border p-4 ${className}`}
      style={{
        borderColor: accent ? "var(--w-accent)" : "var(--w-rule)",
      }}
    >
      <div
        className="u-meta"
        style={{ color: accent ? "var(--w-accent)" : "var(--w-ink-3)" }}
      >
        {label}
      </div>
      <div className="mt-2 text-[1.0625rem] leading-tight font-medium tracking-[-0.01em]">
        {title}
      </div>
      <p className="text-ink-3 mt-2 text-[0.8125rem] leading-relaxed">{note}</p>
    </div>
  );
}

/** The vertical bus and its four stubs. Hidden below `lg`, where the layout is
 *  a single column and a horizontal fan would have nothing to fan across. */
function Bus({
  side,
  focusedIndex,
}: {
  side: "left" | "right";
  focusedIndex: number;
}) {
  const rows = [12.5, 37.5, 62.5, 87.5];
  return (
    <div aria-hidden className="relative hidden lg:row-span-4 lg:block">
      {/* the spine */}
      <span
        className="absolute w-px"
        style={{
          background: "var(--w-rule)",
          top: "12.5%",
          bottom: "12.5%",
          [side === "left" ? "left" : "right"]: 0,
        }}
      />
      {/* the entry nub from the plate beside it */}
      <span
        className="absolute h-px w-1/2"
        style={{
          background: "var(--w-rule)",
          top: "50%",
          [side === "left" ? "left" : "right"]: "-50%",
        }}
      />
      {/* four stubs */}
      {rows.map((top, i) => (
        <span
          key={top}
          className="absolute h-px transition-colors duration-300"
          style={{
            top: `${top}%`,
            left: 0,
            right: 0,
            background:
              focusedIndex === i ? "var(--w-accent)" : "var(--w-rule)",
          }}
        />
      ))}
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="u-meta text-ink-3">{label}</div>
      <p className="mt-2 text-[0.9375rem] leading-relaxed">{value}</p>
    </div>
  );
}
