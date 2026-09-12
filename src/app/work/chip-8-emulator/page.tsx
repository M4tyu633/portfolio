import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import WorldSync from "@/components/chrome/WorldSync";
import MachineFigure from "@/components/figures/MachineFigure";
import Blocks from "@/components/ui/Blocks";
import { chip8 } from "@/content/projects/chip8";

export const metadata: Metadata = {
  title: "CHIP-8, boot the machine",
  description: chip8.oneLiner,
  alternates: { canonical: "/work/chip-8-emulator" },
};

export default function Chip8Page() {
  return (
    <div data-world="chip8" data-display="mono" className="bg-ground text-ink">
      <WorldSync world="chip8" />
      <Nav tick={{ n: "04", title: "CHIP-8" }} />
      <main id="main" className="mx-auto max-w-[88rem] px-5 sm:px-8">
        <header className="pt-8 sm:pt-12">
          <Link href="/work" className="u-meta text-ink-3">
            ← All work
          </Link>
          <div className="grid items-end gap-6 pt-8 lg:grid-cols-[1.5fr_1fr]">
            <h1 className="u-display text-[clamp(2rem,5vw,4.5rem)]">
              A small machine.
              <br />A complete emulator.
            </h1>
            <p className="u-prose">
              This is the actual C++ machine, compiled to WebAssembly. Boot it,
              play a ROM, then open the debugger to watch the instructions
              change its state.
            </p>
          </div>
        </header>
        <div id="machine" className="scroll-mt-20">
          <MachineFigure />
        </div>
        {chip8.sections.map((section) => (
          <section
            key={section.n}
            id={`s${section.n}`}
            className="border-rule grid gap-6 border-t py-14 lg:grid-cols-[15rem_1fr]"
          >
            <div>
              <p className="u-meta text-accent">{section.n}</p>
              <h2 className="u-display mt-3 text-2xl">{section.heading}</h2>
            </div>
            <div className="min-w-0">
              <Blocks
                blocks={section.blocks.filter(
                  (block) =>
                    !(block.kind === "figure" && block.id === "c8-machine"),
                )}
              />
            </div>
          </section>
        ))}
        <footer className="border-rule flex flex-wrap justify-between gap-6 border-t py-12">
          <p className="u-meta">{chip8.built.join(" · ")}</p>
          <Link href="/work">Back to work →</Link>
        </footer>
      </main>
    </div>
  );
}
