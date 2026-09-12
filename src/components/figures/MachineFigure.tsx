"use client";

import Image from "next/image";
import { useState } from "react";

/* ===========================================================================
 * THE MACHINE.
 *
 * The one project on this site that can simply be handed over, so the page is
 * built around it rather than around prose about it.
 *
 * It stays an <iframe>. The Emscripten glue expects a global `Module`, grabs
 * the keyboard, and ships its own styles; a separate document keeps all three
 * off the portfolio. Nothing is fetched until somebody
 * asks, which is also why the emulator never starts making noise on its own.
 * ======================================================================== */

export default function MachineFigure() {
  const [started, setStarted] = useState(false);

  return (
    <figure
      className="machine-console border-rule bg-ground-2 my-12 border"
      data-running={started}
    >
      <div className="border-rule flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b px-4 py-2.5">
        <span className="u-meta text-accent">CHIP-8</span>
        <span className="u-meta text-ink-3 tracking-[0.04em] normal-case">
          35 instructions · 4 KB · 16 registers · 64 x 32
        </span>
        <span className="u-meta text-ink-3 ml-auto tracking-[0.04em] normal-case opacity-70">
          {started ? "running" : "loads when you press play"}
        </span>
      </div>

      <a
        href="/chip8/index.html"
        className="border-rule text-accent block border-b px-4 py-3 text-sm"
      >
        Open the full emulator ↗
      </a>
      <div className="machine-viewport relative overflow-hidden">
        {started ? (
          <iframe
            src="/chip8/index.html?embed=1"
            title="CHIP-8 emulator and debugger"
            className="h-full w-full"
            // Same origin, but it has no reason to navigate, submit anything,
            // or reach for a payment API.
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="machine-boot group relative flex h-full w-full flex-col items-center justify-end gap-4"
          >
            <Image
              src="/work/chip8/arcade.webp"
              alt=""
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              className="object-contain object-top"
            />
            <span className="u-meta border-accent text-accent group-hover:bg-accent group-hover:text-accent-ink relative border px-4 py-2 transition-colors">
              Boot the machine
            </span>
            <span className="machine-boot-note text-ink relative max-w-sm px-6 text-center text-[0.8125rem] leading-relaxed">
              Start Brix, then explore the registers, memory and instructions.
            </span>
          </button>
        )}
      </div>

      {/* Two captions, one per input method. The keyboard one is meaningless on
          a phone and the keypad one is noise on a desktop. */}
      <figcaption className="border-rule text-ink-3 border-t px-4 py-3 text-[0.8125rem] leading-relaxed [@media(pointer:fine)]:hidden">
        The 16 buttons under the screen are the CHIP-8 keypad, labelled with the
        keys they stand in for. Brix and Catch move with <Key>A</Key> and{" "}
        <Key>D</Key>; Pong is <Key>1</Key>/<Key>Q</Key> and <Key>4</Key>/
        <Key>R</Key>. The game library switches between ROMs, and{" "}
        <em>Inspect machine</em> reveals the machine state, though it needs a
        wider screen to be legible.
      </figcaption>

      <figcaption className="border-rule text-ink-3 border-t px-4 py-3 text-[0.8125rem] leading-relaxed [@media(pointer:coarse)]:hidden">
        Click the canvas so it takes the keyboard. The 16-key pad maps to{" "}
        <Key>1 2 3 4</Key> <Key>Q W E R</Key> <Key>A S D F</Key>{" "}
        <Key>Z X C V</Key>. Brix and Catch move with <Key>A</Key> and{" "}
        <Key>D</Key>; Pong is <Key>1</Key>/<Key>Q</Key> and <Key>4</Key>/
        <Key>R</Key>. <Key>Space</Key> pauses, <Key>N</Key> steps one
        instruction, <Key>Tab</Key> leaves the game, <Key>Backspace</Key>{" "}
        resets, <Key>[</Key> and <Key>]</Key> change the clock, and{" "}
        <Key>F1</Key> to <Key>F5</Key> toggle the hardware quirks. <Key>H</Key>{" "}
        folds the debugger in and out.
      </figcaption>
    </figure>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="border-rule bg-ground text-ink border px-1.5 py-0.5 font-mono text-[0.72rem]">
      {children}
    </kbd>
  );
}
