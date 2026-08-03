"use client";

import { useState } from "react";

/**
 * The CHIP-8 emulator, running inside the page.
 *
 * It's an <iframe> rather than a canvas mounted straight into this tree: the
 * Emscripten glue expects a global `Module`, grabs the keyboard, and ships its
 * own styles. A separate document keeps all three off the portfolio.
 *
 * The build is ~540 KB, so nothing is fetched until the visitor asks for it.
 * That also means the emulator never starts making noise on its own.
 */
export default function Chip8Embed() {
  const [started, setStarted] = useState(false);

  return (
    <figure className="m-0">
      {/* Taller on small screens to leave room for the on-screen keypad the
          shell adds on touch devices. The canvas letterboxes inside whatever
          height it's given, so the extra space costs nothing on desktop. */}
      <div className="border-border bg-surface/40 relative h-[34rem] overflow-hidden rounded-2xl border p-3 sm:h-[clamp(340px,58vw,620px)]">
        {started ? (
          <iframe
            src="/chip8/embed.html"
            title="CHIP-8 emulator and debugger"
            className="h-full w-full"
            // The emulator is served from this origin, but it has no reason to
            // navigate, submit anything, or reach for a payment API.
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="group hover:border-accent/50 flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-transparent transition-colors"
          >
            <span className="border-accent/40 bg-accent/10 text-accent group-hover:bg-accent/20 rounded-full border px-5 py-2 text-sm font-medium transition-colors">
              ▶ Load the emulator
            </span>
            <span className="text-muted max-w-sm text-center text-xs leading-relaxed">
              540 KB of WebAssembly, fetched only when you ask. It opens on
              Brix.
            </span>
          </button>
        )}
      </div>

      {/* Two captions, one per input method. The keyboard one is meaningless
          on a phone, and the keypad one is noise on a desktop. */}
      <figcaption className="text-muted mt-3 text-xs leading-relaxed [@media(pointer:fine)]:hidden">
        The 16 buttons under the screen are the CHIP-8 keypad, labelled with
        the keys they stand in for. Brix and Catch move with <Key>A</Key> and{" "}
        <Key>D</Key>; Pong is <Key>1</Key>/<Key>Q</Key> and <Key>4</Key>/
        <Key>R</Key>. Use <em>Next ROM</em> to cycle through them. The debugger
        panel down the right-hand side is legible on a wider screen.
      </figcaption>

      <figcaption className="text-muted mt-3 text-xs leading-relaxed [@media(pointer:coarse)]:hidden">
        Click the canvas so it takes the keyboard. The 16-key pad maps to{" "}
        <Key>1 2 3 4</Key> <Key>Q W E R</Key> <Key>A S D F</Key>{" "}
        <Key>Z X C V</Key>. Brix and Catch move with <Key>A</Key> and{" "}
        <Key>D</Key>; Pong is <Key>1</Key>/<Key>Q</Key> and <Key>4</Key>/
        <Key>R</Key>. <Key>Space</Key> pauses, <Key>N</Key> steps one
        instruction, <Key>Tab</Key> cycles ROMs, <Key>Backspace</Key> resets,{" "}
        <Key>[</Key> and <Key>]</Key> change speed, and <Key>F1</Key>–
        <Key>F5</Key> toggle the hardware quirks.
      </figcaption>
    </figure>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="border-border bg-surface text-foreground rounded border px-1.5 py-0.5 font-mono text-[0.7rem]">
      {children}
    </kbd>
  );
}
