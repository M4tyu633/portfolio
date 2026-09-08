"use client";

import Image from "next/image";
import { useState } from "react";
import { specialistContracts } from "@/content/worlds";

/** A small, inspectable view of the preserved topology; no inference calls. */
export default function SwarmPreview() {
  const [active, setActive] = useState(0);
  const specialist = specialistContracts[active];
  return (
    <div className="swarm-preview">
      <div className="swarm-body" aria-hidden="true">
        <Image src="/work/glycoswarm/patient.webp" alt="" fill sizes="440px" />
      </div>
      <div className="swarm-trace">
        <p className="u-meta">One panel / four independent reads</p>
        <svg
          viewBox="0 0 600 310"
          className="swarm-wires"
          role="img"
          aria-label="One patient input separates into four parallel specialist paths and joins at synthesis."
        >
          {specialistContracts.map((s, i) => (
            <g
              key={s.id}
              style={{ color: s.colour }}
              opacity={active === i ? 1 : 0.35}
            >
              <path
                d={`M 20 155 C 110 155 100 ${42 + i * 75} 205 ${42 + i * 75} H 365 C 470 ${42 + i * 75} 470 155 575 155`}
                fill="none"
                stroke="currentColor"
                strokeWidth={active === i ? 3 : 1.5}
              />
              <circle
                cx="285"
                cy={42 + i * 75}
                r={active === i ? 7 : 4}
                fill="currentColor"
              />
            </g>
          ))}
          <circle cx="20" cy="155" r="8" fill="#e5ede9" />
          <circle cx="575" cy="155" r="11" fill="#e5ede9" />
        </svg>
        <div className="swarm-choices" aria-label="Inspect a specialist">
          {specialistContracts.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-pressed={active === i}
              onClick={() => setActive(i)}
              style={{ color: s.colour }}
            >
              <span>0{i + 1}</span>
              {s.name}
            </button>
          ))}
        </div>
        <div className="swarm-read" aria-live="polite">
          <span className="u-meta">{specialist.name} / input contract</span>
          <p>{specialist.inputs.join(" · ")}</p>
        </div>
      </div>
      <p className="swarm-preserved">
        Preserved demonstration · source-derived topology · no live clinical
        inference
      </p>
    </div>
  );
}
