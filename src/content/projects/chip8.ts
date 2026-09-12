import type { Project } from "../types";

/* ===========================================================================
 * 04 · CHIP-8
 *
 * The one project on the site that can simply be handed to the visitor. The
 * page is built around the running machine rather than around prose about it,
 * and the WebAssembly is not fetched until someone asks for it.
 * ======================================================================== */

export const chip8: Project = {
  n: "04",
  slug: "chip-8-emulator",
  title: "CHIP-8 Emulator",
  category: "Systems / Emulation",
  year: "2026",
  world: "chip8",
  display: "mono",
  oneLiner:
    "A CHIP-8 interpreter in C++17 with a debugger that shows the machine changing while a ROM runs.",
  did: "Core, debugger, web build, six ROMs.",
  outcome: "106 assertions · runs in this browser",
  media: {
    // A capture of the deployed debugger, mid-frame, running Brix.
    src: "/work/chip8/arcade.webp",
    alt: "The actual redesigned CHIP-8 micro arcade running Brix with the debugger tucked away.",
  },
  built: [
    "C++17",
    "Raylib",
    "CMake",
    "Emscripten",
    "WebAssembly",
    "CHIP-8 assembly",
  ],
  links: {
    demo: "/chip8/index.html",
  },
  facts: [
    { label: "Language", value: "C++17, no dependencies in the core" },
    { label: "Front end", value: "Raylib, doubling as a debugger" },
    { label: "Tests", value: "106 assertions over the core" },
    { label: "Web build", value: "Emscripten to WebAssembly" },
    { label: "ROMs", value: "Six, all written for this project" },
    { label: "Licence", value: "MIT" },
  ],

  home: {
    headline: "I wanted to understand an emulator, so I wrote one.",
    body: "An emulator for a 1970s virtual computer, written from scratch in C++, with a debugger that shows every register and instruction as the program executes. It is running below.",
    coda: "It runs in this browser. Thirty-five instructions, 4 KB of memory, and a 64 by 32 display.",
  },

  lede: "CHIP-8 is a virtual machine from 1977, built so hobbyists could write a game once and run it on any 8-bit micro with an interpreter. Thirty-five instructions, 4 KB of memory, sixteen 8-bit registers and a 64 by 32 monochrome display: small enough to hold in your head and awkward enough to stay interesting. I wrote a full interpreter for it in C++17, with a Raylib front end that doubles as a live debugger, running natively and in the browser through WebAssembly.",

  sections: [
    {
      n: "01",
      heading: "The machine",
      standfirst: "It is right here. Load it and press a key.",
      blocks: [
        { kind: "figure", id: "c8-machine" },
        {
          kind: "p",
          text: "It opens on Brix, a brick breaker. **A** and **D** move the paddle. The cartridge library switches ROMs; **Tab** leaves the game. There are six: Brix, Pong (two players, 1 and Q on the left, 4 and R on the right), Catch, then Bounce, Counter and Keypad, three smaller ROMs that exercise specific instructions rather than being games.",
        },
        {
          kind: "p",
          text: "The panel opens on the game alone. **H** folds the machine state in and out. None of it is needed to play, and six panels of hex handed to you unasked is a lot to walk into.",
        },
        {
          kind: "ledger",
          rows: [
            { key: "Space", value: "Pause and resume" },
            { key: "N", value: "Run exactly one instruction, while paused" },
            { key: "Backspace", value: "Restart the current ROM" },
            {
              key: "[  ]",
              value: "Instructions per frame, which is the clock speed",
              note: "11 by default",
            },
            { key: "F1 – F5", value: "Toggle the five hardware quirks" },
          ],
        },
        {
          kind: "aside",
          label: "Why the keypad panel shows two numbers",
          text: "It reads CHIP-8 value / your key, and the two rarely agree. The original COSMAC VIP had a sixteen-key hex pad laid out 1 2 3 C / 4 5 6 D / 7 8 9 E / A 0 B F, mapped here onto the left block of a QWERTY keyboard, so pressing A lights CHIP-8 key 7. Showing only the hex value made the panel look like it was responding to the wrong key entirely.",
        },
      ],
    },
    {
      n: "02",
      heading: "The core knows nothing about a window",
      blocks: [
        {
          kind: "p",
          text: "I gave the interpreter no platform dependencies and no idea what a window is. Everything it does is visible in its own state, and the front end reads that state once a frame.",
        },
        {
          kind: "p",
          text: "That split is what lets the test suite and a headless ASCII runner build and run in CI on a machine with no GPU and no X11 headers at all. The front end is simply switched off at configure time and nothing is fetched or linked.",
        },
      ],
    },
    {
      n: "03",
      heading: "Watching the machine instead of reading about it",
      blocks: [
        {
          kind: "image",
          src: "/work/chip8/inspection.webp",
          alt: "The redesigned emulator in inspection mode, with actual Brix instructions, registers and memory.",
          caption:
            "Inspect machine reveals the running C++ state. Return to game hides it again.",
        },
        {
          kind: "p",
          text: "The right-hand panel is live machine state. V0 to VF in hex and decimal, with a register flashing amber for a moment after it is written. PC, I and SP, plus both timers highlighted while they count down. The call stack, which is the thing that tells you a ROM is about to overflow it. And the eight bytes around **I**, because I is almost always pointing at whatever matters next: a sprite, a BCD result, or a block of registers about to be loaded.",
        },
        {
          kind: "p",
          text: "Under the display is a live disassembly. CHIP-8 instructions are a fixed two bytes, so the listing can be walked from any even address without the usual guesswork about where an instruction actually starts.",
        },
        {
          kind: "figures",
          caption: "Why the disassembly stopped following the program counter.",
          items: [
            {
              value: "110",
              unit: "/139",
              label: "Frames on which all 18 rows were rewritten",
              tone: "bad",
            },
            {
              value: "2",
              unit: "/s",
              label: "Times the listing may now move",
              tone: "good",
            },
            {
              value: "3",
              label: "Moves over fifteen seconds of play",
              tone: "good",
            },
          ],
        },
        {
          kind: "p",
          text: "My first instinct was to make the listing follow the program counter, and it was wrong. A single frame is eleven instructions scattered across the main loop, every subroutine it calls, and whatever busy-wait the ROM is parked in, so scrolling to wherever the PC stopped picks a different region almost every frame. That reads as a flicker and cannot be read at all.",
        },
        {
          kind: "p",
          text: "It now parks over the busiest stretch of code, measured from a decaying histogram of executed addresses. A green wash on a row means it ran recently, so the listing still shows what is executing without anything moving. Pause and it follows the PC exactly again, which is when N single-stepping needs it.",
        },
      ],
    },
    {
      n: "04",
      heading: "Every incompatible behaviour is a switch",
      blocks: [
        {
          kind: "p",
          text: "Programs back then were written against one specific interpreter, and the popular ones disagreed with each other. A ROM that renders perfectly under one set of rules can be unplayable under another, so the five contested behaviours are toggles bound to F1 through F5 rather than choices baked into the code.",
        },
        {
          kind: "ledger",
          rows: [
            { key: "F1", value: "Shift opcodes read Vy, or shift in place" },
            { key: "F2", value: "Load and store leave I incremented" },
            { key: "F3", value: "Bitwise ops reset VF as a side effect" },
            { key: "F4", value: "Draws wait for vertical blank" },
            { key: "F5", value: "Sprites clip, or wrap, at the edge" },
          ],
        },
        {
          kind: "p",
          text: "The defaults are original COSMAC VIP behaviour, which is what the bundled ROMs assume. Most ROMs written after about 1990 want the first two flipped.",
        },
      ],
    },
    {
      n: "05",
      heading: "Four things that are easy to get wrong",
      blocks: [
        {
          kind: "list",
          items: [
            "**VF is written last.** Every arithmetic opcode that sets a flag computes the flag, stores the result, then writes VF. The other order is correct for fifteen of the sixteen registers and wrong for VF itself.",
            "**Display wait rewinds the PC.** When a draw is held back to the next frame the instruction has already been fetched and the PC has already advanced, so the step rewinds it and the same draw is retried rather than skipped.",
            "**Fx0A completes on release, not on press.** Waiting for the press is the obvious reading and it is wrong: one held key would satisfy several consecutive Fx0A instructions, which breaks any menu asking for two inputs in a row.",
            "**Sprite positions wrap even when the body clips.** The starting coordinate is taken modulo the screen size, but a sprite that then runs off the edge is cut off. That asymmetry is real hardware behaviour rather than an oversight.",
          ],
        },
        {
          kind: "p",
          text: "Those three cases, plus the flag ordering, are what the 106 assertions concentrate on.",
        },
      ],
    },
    {
      n: "06",
      heading: "The ROMs are original",
      blocks: [
        {
          kind: "p",
          text: "I wrote all six bundled ROMs in CHIP-8 assembly and built a small assembler for them. Each program has readable, commented source alongside its compiled ROM.",
        },
        {
          kind: "ledger",
          rows: [
            { key: "Brix", value: "Brick breaker" },
            { key: "Pong", value: "Two players" },
            { key: "Catch", value: "One-button reaction game" },
            {
              key: "Bounce",
              value:
                "Paces a ball off the display-wait quirk rather than the delay timer",
              note: "checks its bounds by equality, since CHIP-8 has no signed comparison and a one-pixel step can only overshoot an edge by one",
            },
            {
              key: "Counter",
              value: "Walks 0 to 255 in decimal",
              note: "the load instruction always reads from V0 upwards, so reading the digits back necessarily clobbers the counter",
            },
            { key: "Keypad", value: "A test for the blocking key-wait" },
          ],
        },
        {
          kind: "p",
          text: "The web build bakes them into a data file next to the WebAssembly, so the page issues no network requests at all once it has loaded.",
        },
      ],
    },
  ],
};
