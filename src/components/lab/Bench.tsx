"use client";
import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
const Machine = dynamic(() => import("@/components/figures/MachineFigure"));
const Throw = dynamic(() => import("@/components/figures/ThrowFigure"));
const Contact = dynamic(() => import("@/components/figures/ContactFigure"));
const Network = dynamic(() => import("@/components/figures/NetworkFigure"));
const Patient = dynamic(() => import("@/components/work/PatientSystem"));
const Swarm = dynamic(() => import("@/components/work/SwarmSystem"));
const instruments = [
  {
    name: "The machine",
    component: Machine,
    world: "chip8",
    project: "chip-8-emulator",
    note: "Boot the emulator. Play a ROM or step through an instruction.",
  },
  {
    name: "Throwing range",
    component: Throw,
    world: "tumbang",
    project: "tumbang-preso",
    note: "An engineering simulation of a throw, not the actual game.",
  },
  {
    name: "Missed contacts",
    component: Contact,
    world: "tumbang",
    project: "tumbang-preso",
    note: "Compare callback contacts with explicit overlap checks.",
  },
  {
    name: "Find a lobby",
    component: Network,
    world: "tumbang",
    project: "tumbang-preso",
    note: "Follow the discovery and join sequence.",
  },
  {
    name: "Patient route",
    component: Patient,
    world: "egov",
    project: "egovmed",
    note: "Trace the visit and explore a failure decision.",
  },
  {
    name: "Specialist contracts",
    component: Swarm,
    world: "glyco",
    project: "glycoswarm-ai",
    note: "Isolate the inputs and output contract of one specialist.",
  },
];
export default function Bench() {
  const [index, setIndex] = useState(0);
  const item = instruments[index];
  const Instrument = item.component;
  return (
    <div className="lab-bench">
      <div className="bench-picker" aria-label="Choose an instrument">
        {instruments.map((x, i) => (
          <button
            key={x.name}
            onClick={() => setIndex(i)}
            aria-pressed={index === i}
          >
            {x.name}
            <span aria-hidden>↗</span>
          </button>
        ))}
      </div>
      <section
        className="bench-surface"
        data-world={item.world}
        data-display="plex"
        aria-label={item.name}
      >
        <header>
          <p>{item.note}</p>
          <Link href={`/work/${item.project}`}>Source project ↗</Link>
        </header>
        <Instrument key={index} />
      </section>
    </div>
  );
}
