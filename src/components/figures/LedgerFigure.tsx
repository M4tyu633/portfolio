"use client";

import { useState } from "react";

/* ===========================================================================
 * THE EIGHT INTEGRATIONS, AS A LEDGER.
 *
 * Not eight cards. A ledger, because that is what it is: a list of services,
 * what each one is for, and which of its two paths is switched on.
 *
 * The interaction is the safety gate itself. Flip any service to its mock path
 * and the production boot line refuses, and names it. That gate is real: with
 * mocks disallowed in production the app will not start if any integration is
 * still mocked or missing credentials. Nothing here is a mockup of a mechanism;
 * it is the mechanism, with its state in your hands.
 * ======================================================================== */

const SERVICES = [
  { name: "eGovPH SSO", role: "Identity, and the profile that auto-fills" },
  { name: "eGov AI", role: "Symptom triage: specialty, urgency, red flags" },
  { name: "National ID eVerify", role: "PhilSys demographic verification" },
  { name: "Face Liveness", role: "Proof that a person was present, with consent" },
  { name: "eMessage", role: "Queue number and appointment confirmation" },
  { name: "eGovChain", role: "Integrity anchor, hash only" },
  { name: "eGovPay", role: "Payment, with statutory discounts applied" },
  { name: "eReport", role: "Reporting" },
];

export default function LedgerFigure() {
  const [mocked, setMocked] = useState<Set<string>>(new Set());

  const toggle = (name: string) =>
    setMocked((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });

  const offenders = SERVICES.filter((s) => mocked.has(s.name));
  const boots = offenders.length === 0;

  return (
    <figure className="border-rule bg-ground my-12 border">
      <div className="border-rule flex items-baseline gap-3 border-b px-4 py-2.5">
        <span className="u-meta text-ink-3">Integration ledger</span>
        <span className="u-meta text-ink-3 ml-auto normal-case tracking-[0.04em] opacity-70">
          Switch a path and watch the boot gate
        </span>
      </div>

      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          The eight government services eGovMed integrates, each with a mock
          path and a live path.
        </caption>
        <thead>
          <tr className="border-rule border-b">
            <th scope="col" className="u-meta text-ink-3 px-4 py-2 font-medium">
              Service
            </th>
            <th
              scope="col"
              className="u-meta text-ink-3 hidden px-4 py-2 font-medium sm:table-cell"
            >
              What it is for
            </th>
            <th
              scope="col"
              className="u-meta text-ink-3 px-4 py-2 text-right font-medium"
            >
              Path
            </th>
          </tr>
        </thead>
        <tbody>
          {SERVICES.map((s) => {
            const isMock = mocked.has(s.name);
            return (
              <tr key={s.name} className="border-rule-2 border-b last:border-0">
                <th
                  scope="row"
                  className="px-4 py-2.5 align-top font-mono text-[0.875rem] font-normal"
                >
                  {s.name}
                  <span className="text-ink-3 mt-1 block font-sans text-[0.8125rem] leading-snug sm:hidden">
                    {s.role}
                  </span>
                </th>
                <td className="text-ink-2 hidden px-4 py-2.5 align-top text-[0.875rem] sm:table-cell">
                  {s.role}
                </td>
                <td className="px-4 py-2 text-right align-top">
                  <button
                    type="button"
                    onClick={() => toggle(s.name)}
                    aria-pressed={isMock}
                    className="u-meta border px-2.5 py-1 transition-colors"
                    style={{
                      borderColor: isMock ? "var(--eg-stamp)" : "var(--eg-ok)",
                      color: isMock ? "var(--eg-stamp)" : "var(--eg-ok)",
                    }}
                  >
                    <span className="sr-only">{s.name} is on the </span>
                    {isMock ? "mock" : "live"}
                    <span className="sr-only"> path. Activate to switch.</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div
        aria-live="polite"
        className="border-rule flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t px-4 py-3"
        style={{ background: boots ? undefined : "var(--w-ground-2)" }}
      >
        <span className="u-meta text-ink-3">Production boot</span>
        <span
          className="font-mono text-[0.9375rem]"
          style={{ color: boots ? "var(--eg-ok)" : "var(--eg-stamp)" }}
        >
          {boots ? "PERMITTED" : "REFUSED"}
        </span>
        <span className="text-ink-2 text-[0.875rem]">
          {boots
            ? "Every integration is on its live path."
            : `Still mocked: ${offenders.map((o) => o.name).join(", ")}.`}
        </span>
      </div>

      <figcaption className="border-rule text-ink-3 border-t px-4 py-3 text-[0.8125rem] leading-relaxed">
        Both paths exist for every service, so the whole product runs offline
        with no credentials and a sandbox going down cannot take a demo with it.
        The same switch is the gate that stops a forgotten mock serving fake
        triage to a real patient.
      </figcaption>
    </figure>
  );
}
