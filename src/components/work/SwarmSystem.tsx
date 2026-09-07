"use client";
import { useState } from "react";
import { specialistContracts } from "@/content/worlds";
export default function SwarmSystem() {
  const [focus, setFocus] = useState(0);
  const [offline, setOffline] = useState(false);
  const agent = specialistContracts[focus];
  return (
    <section
      className="swarm-system"
      id="s01"
      aria-label="GlycoSwarm contract explorer"
    >
      <div className="swarm-input">
        <p className="world-kicker">Input contract</p>
        <h2>
          One panel.
          <br />
          Four independent reads.
        </h2>
        <p>NHANES laboratory fields, split by responsibility.</p>
        <ul>
          {agent.inputs.map((input, i) => (
            <li key={input}>
              <span>{input}</span>
              <code>{agent.fields[i]}</code>
            </li>
          ))}
        </ul>
      </div>
      <div className="swarm-agents" aria-label="Select a specialist">
        {specialistContracts.map((s, i) => (
          <button
            key={s.id}
            onClick={() => setFocus(i)}
            aria-pressed={focus === i}
            style={{ "--agent-colour": s.colour } as React.CSSProperties}
          >
            <span aria-hidden>0{i + 1}</span>
            <strong>{s.name}</strong>
            <span>{focus === i ? "Tracing →" : "Trace input ↗"}</span>
          </button>
        ))}
      </div>
      <div className="swarm-contract" aria-live="polite">
        <p className="world-kicker">{agent.name} → synthesis</p>
        <h3>
          {offline
            ? "Unavailable is an output."
            : "The number must come from code."}
        </h3>
        <p>{agent.responsibility}</p>
        <div className="contract-fields">
          {(offline
            ? [
                "status: unavailable",
                "No substitute risk score",
                "Missing evidence stays missing",
              ]
            : [
                "risk_score · computed float",
                "flag · derived from score",
                "reasoning · values and cutoffs",
                "thresholds_used · explicit dict",
              ]
          ).map((x) => (
            <p key={x}>{x}</p>
          ))}
        </div>
        <button
          className="world-button"
          onClick={() => setOffline(!offline)}
          aria-pressed={offline}
        >
          {offline
            ? "Restore provider availability"
            : "What if neither provider responds?"}
        </button>
      </div>
      <div className="swarm-synthesis">
        <span aria-hidden>↓</span>
        <div>
          <h3>One synthesis stage</h3>
          <p>
            The four outputs converge here. The specialist prompts choose
            cutoffs; executing their Python makes the arithmetic inspectable,
            not clinically validated.
          </p>
        </div>
        <strong>
          Referral
          <br />+ evidence
        </strong>
      </div>
      <p className="world-note">
        Source-based contract explorer, not live inference. No risk scores or
        patient results are fabricated.
      </p>
    </section>
  );
}
