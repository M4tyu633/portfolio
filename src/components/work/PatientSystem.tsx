"use client";

import Image from "next/image";
import { useState } from "react";
import { patientStages } from "@/content/worlds";

/* ===========================================================================
 * THE VISIT, AND WHAT IS UNDERNEATH IT.
 *
 * ⚠ THE OLD VERSION OPENED CLOSED. It showed a phone, a row of six words and a
 * button labelled "Look underneath the visit", and everything worth reading was
 * behind that button. An engineer with ninety seconds saw a screenshot and a
 * paragraph. The walkthrough now starts open on the first stop; there is
 * nothing to unlock.
 *
 * The signature interaction is the second control, not the first: PULL A
 * SERVICE OUT. One stop on the route goes amber and dashed, the outcome of
 * that failure is stated, and the other five stops stay exactly as they were.
 * That is the whole architectural claim rendered as a picture — a government
 * service being down is a local event, not the end of the visit.
 *
 * Every string on this surface comes from content/worlds.ts, which was written
 * off the eGovMed backend. Nothing here calls anything: no government API, no
 * network request, no patient data. The note at the foot says so.
 * ======================================================================== */

export default function PatientSystem() {
  const [stage, setStage] = useState(0);
  const [pulled, setPulled] = useState(false);
  const active = patientStages[stage];

  return (
    <section className="visit" aria-label="What one visit crosses" id="s01">
      <div className="visit-top">
        <figure className="visit-device">
          <div className="visit-screen">
            <Image
              src="/work/egovmed/demo-home.webp"
              alt="The signed-in eGovMed home screen: a greeting by name, a Start a visit card, and tiles for records, payments, reports and messages."
              fill
              sizes="(min-width: 768px) 280px, 220px"
              className="object-contain"
            />
          </div>
          <figcaption className="u-meta">
            The actual product, signed in
          </figcaption>
        </figure>

        <div className="visit-body">
          <p className="u-meta visit-kicker">
            One visit &middot; six stops &middot; eight services
          </p>
          <h2>A screen is the small part.</h2>

          {/* The route. Selecting a stop is the primary control; the current
              failure state is drawn on the route rather than described. */}
          <ol
            className="visit-route"
            data-pulled={pulled ? stage : undefined}
            aria-label="Stages of a visit"
          >
            {patientStages.map((s, i) => (
              <li
                key={s.name}
                data-on={i === stage || undefined}
                data-down={pulled && i === stage ? "" : undefined}
              >
                <button
                  type="button"
                  onClick={() => {
                    setStage(i);
                    setPulled(false);
                  }}
                  aria-pressed={i === stage}
                >
                  <span className="visit-node" aria-hidden />
                  <span className="u-meta visit-i">{i + 1}</span>
                  <span className="visit-name">{s.name}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="visit-detail" aria-live="polite">
            <p className="u-meta visit-service">{active.service}</p>
            <p className="visit-sees">{active.sees}</p>

            <div className="visit-decision">
              <span className="u-meta">The implementation decision</span>
              <p>{active.decision}</p>
              <code>{active.path}</code>
            </div>

            <div className="visit-break">
              <button
                type="button"
                className="visit-pull"
                onClick={() => setPulled((v) => !v)}
                aria-expanded={pulled}
              >
                {pulled
                  ? "Put the service back"
                  : `Pull this service out: ${active.failure}`}
              </button>

              {pulled ? (
                <p className="visit-outcome" role="status">
                  <span className="u-meta">Contained</span>
                  {active.outcome}
                </p>
              ) : null}
            </div>
          </div>

          <p className="visit-note">
            An explanation of the architecture, drawn from the eGovMed backend.
            No patient data is entered and no government service is called from
            this page.
          </p>
        </div>
      </div>
    </section>
  );
}
