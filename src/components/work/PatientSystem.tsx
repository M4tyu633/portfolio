"use client";
import { useState } from "react";
import Image from "next/image";
import { patientStages } from "@/content/worlds";
export default function PatientSystem() {
  const [stage, setStage] = useState<number | null>(null);
  const [failed, setFailed] = useState(false);
  const active = stage === null ? null : patientStages[stage];
  return (
    <section
      className={`patient-system ${active ? "is-open" : ""}`}
      aria-label="Explore the patient system"
      id="s01"
    >
      <div className="patient-device">
        <div className="patient-screen">
          <Image
            src="/work/egovmed/home.webp"
            alt="Actual signed-in eGovMed home screen supplied by Matthew"
            fill
            sizes="(min-width: 768px) 280px, 220px"
            className="object-contain"
          />
        </div>
        <p>Actual product screen</p>
        <button
          className="world-button"
          onClick={() => {
            setStage(active ? null : 0);
            setFailed(false);
          }}
          aria-expanded={!!active}
        >
          {active ? "Close the system view" : "Look underneath the visit ↗"}
        </button>
      </div>
      <div className="patient-underlay">
        <p className="world-kicker">
          {active ? "The systems underneath" : "From patient to platform"}
        </p>
        <h2>{active ? active.name : "A screen is the small part."}</h2>
        <div className="patient-rail" aria-label="Patient stages">
          {patientStages.map((s, i) => (
            <button
              key={s.name}
              onClick={() => {
                setStage(i);
                setFailed(false);
              }}
              aria-pressed={stage === i}
            >
              <span>{i + 1}</span>
              {s.name}
            </button>
          ))}
        </div>
        <div className="patient-detail" aria-live="polite">
          {active ? (
            <>
              <h3>{active.service}</h3>
              <p>{active.sees}</p>
              <div className="patient-decision">
                <span>The implementation decision</span>
                <p>{active.decision}</p>
                <code>{active.path}</code>
              </div>
              <button
                className="failure-button"
                onClick={() => setFailed(!failed)}
                aria-expanded={failed}
              >
                {failed ? "Reset scenario" : `Test: ${active.failure}`}{" "}
                <span aria-hidden>↗</span>
              </button>
              {failed && (
                <p className="failure-result" role="status">
                  {active.outcome}
                </p>
              )}
            </>
          ) : (
            <p>
              Identity, assessment, verification, booking, messaging and payment
              have to agree on one visit. Open the screen, choose a stage, then
              try its failure case.
            </p>
          )}
        </div>
        <p className="world-note">
          Interactive architecture walkthrough. No patient data is entered and
          no government API is called.
        </p>
      </div>
    </section>
  );
}
