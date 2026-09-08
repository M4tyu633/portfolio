"use client";

import { useRef, useState } from "react";

/* ===========================================================================
 * ONE PATIENT, SIX STAGES.
 *
 * The signature interaction of world 02, and the argument of the whole project:
 * assessment happens BEFORE the queue rather than inside it, so the ordering of
 * these six is the claim being made.
 *
 * Every "decision" line below is a failure behaviour he chose rather than
 * inherited, and every one of them is documented in the project. Where a stage
 * has no documented failure rule of its own, it does not get an invented one.
 *
 * Built as a tablist with roving tabindex, so the arrow keys walk the route.
 * That is not an accessibility afterthought bolted onto a hover interaction: it
 * is the same interaction, and it is the only one on touch.
 * ======================================================================== */

const STAGES = [
  {
    n: "01",
    name: "Sign in",
    services: ["eGovPH SSO"],
    what: "The patient signs in with an eGovPH account and the profile auto-fills, instead of being written out again at every counter.",
    decision:
      "Every adapter has a mock path and a live path, switched per service by an environment variable. With mocks disallowed in production, the app refuses to boot if any integration is still mocked or missing credentials, and it names which one.",
  },
  {
    n: "02",
    name: "Triage",
    services: ["eGov AI"],
    what: "They describe symptoms in English, Tagalog or Taglish. Triage returns a specialty, an urgency level and any red flags.",
    decision:
      "A rule-based floor sits under the classifier and can only raise urgency, never lower it, in live mode as well as in mock. A degraded or hostile model response cannot downgrade an emergency.",
  },
  {
    n: "03",
    name: "Identity",
    services: ["Face Liveness", "National ID eVerify"],
    what: "Identity is confirmed with consent: a face liveness capture, and a PhilSys demographic match.",
    decision:
      "Sessions are single-use, patient-bound and expire in ten minutes, claimed through a Redis compare-and-set, so two simultaneous replays resolve to exactly one success and one rejection.",
  },
  {
    n: "04",
    name: "Booking",
    services: ["eGovChain"],
    what: "The appointment is booked against the specialty and urgency triage returned.",
    decision:
      "The record's hash is anchored, never its contents. Anchor writes fail closed, so an unverifiable record is never stored. Verification fails safe, so an RPC error shows unverified rather than a green badge.",
  },
  {
    n: "05",
    name: "Queue",
    services: ["eMessage"],
    what: "A queue number is issued, with an SMS confirmation.",
    decision: "A failed SMS never fails a booking.",
  },
  {
    n: "06",
    name: "Payment",
    services: ["eGovPay", "eReport"],
    what: "The bill settles through the unified government gateway, with statutory discounts already applied.",
    decision:
      "Payment callbacks are treated as non-authoritative. A forged one returns 202 and writes nothing.",
  },
];

export default function RouteFigure() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const move = (to: number) => {
    const i = (to + STAGES.length) % STAGES.length;
    setActive(i);
    tabsRef.current[i]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      move(active + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      move(active - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      move(0);
    } else if (e.key === "End") {
      e.preventDefault();
      move(STAGES.length - 1);
    }
  };

  const stage = STAGES[active];

  return (
    <figure className="border-rule bg-ground my-12 border">
      <div className="border-rule flex items-baseline gap-3 border-b px-4 py-2.5">
        <span className="u-meta text-ink-3">Patient route</span>
        <span className="u-meta text-ink-3 ml-auto tracking-[0.04em] normal-case opacity-70">
          Arrow keys to step
        </span>
      </div>

      {/* -------- the route -------- */}
      <div
        role="tablist"
        aria-label="Patient route stages"
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="m-formgrid grid grid-cols-2 gap-px sm:grid-cols-3 lg:grid-cols-6"
      >
        {STAGES.map((s, i) => {
          const on = i === active;
          return (
            <button
              key={s.n}
              ref={(el) => {
                tabsRef.current[i] = el;
              }}
              role="tab"
              id={`route-tab-${s.n}`}
              aria-selected={on}
              aria-controls="route-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              className="group bg-ground relative px-3 py-4 text-left transition-colors sm:px-4 sm:py-5"
              style={{ background: on ? "var(--w-ground-2)" : undefined }}
            >
              {/* The routing rule. It runs THROUGH the stations rather than
                  between them, which is how hospital wayfinding does it. */}
              <span
                aria-hidden
                className="absolute top-0 left-0 h-[3px] w-full transition-colors duration-300"
                style={{
                  background: i <= active ? "var(--eg-route)" : "var(--w-rule)",
                }}
              />
              <span
                className="u-meta block tabular-nums"
                style={{ color: on ? "var(--eg-route)" : "var(--w-ink-3)" }}
              >
                {s.n}
              </span>
              <span
                className="mt-2 block text-[1.0625rem] leading-tight font-medium tracking-[-0.01em]"
                style={{ color: on ? "var(--w-ink)" : "var(--w-ink-2)" }}
              >
                {s.name}
              </span>
              <span className="u-meta text-ink-3 mt-2 block tracking-[0.04em] normal-case opacity-70">
                {s.services.join(" · ")}
              </span>
            </button>
          );
        })}
      </div>

      {/* -------- the ticket -------- */}
      <div
        role="tabpanel"
        id="route-panel"
        aria-labelledby={`route-tab-${stage.n}`}
        tabIndex={0}
        className="border-rule bg-ground-2 grid gap-6 border-t px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
      >
        <div>
          <p className="text-[1.0625rem] leading-relaxed">{stage.what}</p>
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1">
            {stage.services.map((sv) => (
              <li
                key={sv}
                className="u-meta"
                style={{ color: "var(--eg-route)" }}
              >
                {sv}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="border-l-2 pl-4 sm:pl-5"
          style={{ borderColor: "var(--eg-stamp)" }}
        >
          <div className="u-meta" style={{ color: "var(--eg-stamp)" }}>
            Failure behaviour, chosen
          </div>
          <p className="text-ink-2 mt-2 text-[0.9375rem] leading-relaxed">
            {stage.decision}
          </p>
        </div>
      </div>

      <figcaption className="border-rule text-ink-3 border-t px-4 py-3 text-[0.8125rem] leading-relaxed">
        The ordering is the argument. Assessment happens before the queue rather
        than inside it, which is what makes the line shorter.
      </figcaption>
    </figure>
  );
}
