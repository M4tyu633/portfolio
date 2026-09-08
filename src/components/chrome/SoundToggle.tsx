"use client";

import { useSound } from "@/lib/sound";

/* ===========================================================================
 * The sound switch.
 *
 * It starts OFF and it stays off until this button is pressed. No AudioContext
 * is constructed before that press, so a visitor who never touches it never
 * downloads a byte of audio and never hears anything.
 *
 * The glyph is a speaker with two arcs that retract when it is off, which reads
 * at 18px and does not need a label beside it.
 * ======================================================================== */

export default function SoundToggle() {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Turn sound off" : "Turn sound on"}
      title={enabled ? "Sound on" : "Sound off"}
      className="group text-ink-3 hover:text-ink relative flex h-10 w-10 items-center justify-center transition-colors"
      style={enabled ? { color: "var(--w-accent)" } : undefined}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className="h-[1.15rem] w-[1.15rem]"
      >
        <path d="M11 5.5 6.5 9.2H3.5v5.6h3L11 18.5z" />
        <path
          d="M14.6 9.4a3.6 3.6 0 0 1 0 5.2"
          className="origin-left transition-all duration-300"
          style={{ opacity: enabled ? 1 : 0.25 }}
        />
        <path
          d="M17.4 6.8a7.3 7.3 0 0 1 0 10.4"
          className="origin-left transition-all duration-300"
          style={{ opacity: enabled ? 1 : 0 }}
        />
        {/* The struck-through state, so "off" is legible without colour. */}
        <path
          d="M15 9.5 20 15"
          className="transition-opacity duration-300"
          style={{ opacity: enabled ? 0 : 0.55 }}
        />
      </svg>
      <span
        aria-hidden
        className="bg-accent absolute bottom-1.5 left-1/2 h-[2px] -translate-x-1/2 transition-[width] duration-300"
        style={{ width: enabled ? "1rem" : 0 }}
      />
    </button>
  );
}
