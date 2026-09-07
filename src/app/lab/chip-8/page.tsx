import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/chrome/Nav";
import WorldSync from "@/components/chrome/WorldSync";
import MachineFigure from "@/components/figures/MachineFigure";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "CHIP-8, running",
  description:
    "A CHIP-8 interpreter written from scratch in C++17, with a visual debugger, compiled to WebAssembly. Six ROMs, all written by hand for this project.",
  alternates: { canonical: `${site.url}/lab/chip-8` },
};

/* The machine, on its own, with the least possible amount of page around it.
 * Everything explanatory lives in the case study; this route exists so that
 * "run it" is one click from the homepage and from /lab without dragging a
 * 3,000 word document along with it. */
export default function Chip8LabPage() {
  return (
    <div data-world="chip8" data-display="mono" className="bg-ground text-ink">
      <WorldSync world="chip8" />
      <Nav />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-[88rem] px-5 sm:px-8">
          <div className="border-rule flex flex-wrap items-baseline gap-x-5 gap-y-1 border-b py-4">
            <Link
              href="/lab"
              className="u-meta text-ink-3 hover:text-ink transition-colors"
            >
              ← Lab
            </Link>
            <span className="u-meta text-ink-3 ml-auto">01</span>
          </div>

          <header className="grid gap-x-14 gap-y-5 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end">
            <h1 className="u-display text-[clamp(2.2rem,6vw,4.5rem)]">
              I wanted to understand an emulator, so I wrote one.
            </h1>
            <p className="u-prose">
              A virtual machine from 1977, in C++17, with a debugger that shows
              the registers and memory changing while a ROM runs. Click the
              screen so it takes the keyboard.
            </p>
          </header>

          <MachineFigure />

          <nav
            aria-label="Read more"
            className="border-rule border-t py-10 sm:py-14"
          >
            <Link href="/work/chip-8-emulator" className="group block">
              <span className="u-meta text-ink-3">How it works</span>
              <span className="mt-3 flex items-baseline gap-4 sm:gap-6">
                <span className="u-meta text-ink-3 tabular-nums">04</span>
                <span className="u-display group-hover:text-ink-2 text-[clamp(1.5rem,4.4vw,3rem)] transition-colors">
                  The CHIP-8 case study
                </span>
                <span
                  aria-hidden
                  className="text-ink-3 ml-auto transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </nav>
        </div>
      </main>
    </div>
  );
}
