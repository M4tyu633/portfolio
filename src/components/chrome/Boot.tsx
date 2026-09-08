"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

/* ===========================================================================
 * THE OPENING CARD.
 *
 * The site is an index of things that were built and measured, so it opens the
 * way an index does: a name, a rule, and a manifest of what is inside. Every
 * number on it is real and is stated somewhere further in — six projects,
 * eleven results, and three measurements that each changed a decision.
 *
 * ⚠ IT IS NOT A GATE, AND THAT IS THE WHOLE DESIGN CONSTRAINT.
 *   - it runs 1.6 seconds and lifts
 *   - any key, click or scroll skips it immediately
 *   - `prefers-reduced-motion` skips it entirely
 *   - it runs ONCE PER TAB (sessionStorage), so a visitor moving between pages
 *     and coming back never sees it twice
 *   - the homepage underneath is fully rendered and interactive the whole time
 * A recruiter with fifteen seconds must not spend two of them watching a
 * loader. If any future change makes this block the work, delete it.
 *
 * ⚠ THE CALLBACK IS HELD IN A REF and the effect depends on nothing but
 * `reduced`. The parent passes an inline arrow, so with `onDone` in the
 * dependency array the timers tore down and re-armed on every re-render and
 * the sequence never finished. That exact bug shipped once already.
 * ======================================================================== */

const MANIFEST: [string, string][] = [
  ["Projects", "6"],
  ["Competitions and results", "11"],
  ["Measured before it was fixed", "36 contacts / 0.843 AUC / 106 assertions"],
  ["Manila", "2025 – 2026"],
];

/* ⚠ MODULE SCOPE, NOT sessionStorage. The flag lives for the life of the
 * document, so the card plays once and never again while the visitor moves
 * between pages, and a genuine reload plays it again. sessionStorage was tried
 * and interacted badly with React's development strict mode, which mounts,
 * unmounts and remounts: the second mount read the flag its own first mount had
 * just written and skipped the sequence a third of a second in. */
let played = false;

export default function Boot() {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(-1);
  const [gone, setGone] = useState(played);

  useEffect(() => {
    if (played) return;

    /* ⚠ Reduced motion exits through a ZERO-DELAY TIMER rather than a
     * synchronous setState. The React Compiler lint in this repo rejects
     * setState in an effect body, and a 0ms timer is a tick later, which is
     * both allowed and visually identical. */
    const finish = () => {
      played = true;
      setGone(true);
    };

    if (reduced) {
      const t = setTimeout(finish, 0);
      return () => clearTimeout(t);
    }

    const timers = MANIFEST.map((_, i) =>
      setTimeout(() => setStep(i), 200 + i * 150),
    );
    timers.push(setTimeout(finish, 1600));

    const skip = () => {
      timers.forEach(clearTimeout);
      finish();
    };
    window.addEventListener("keydown", skip, { once: true });
    window.addEventListener("pointerdown", skip, { once: true });
    window.addEventListener("wheel", skip, { once: true, passive: true });

    return () => {
      timers.forEach(clearTimeout);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
      window.removeEventListener("wheel", skip);
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {!gone ? (
        <motion.div
          key="boot"
          aria-hidden
          className="m-grain bg-ground fixed inset-0 z-[70] flex flex-col justify-between px-[max(1.25rem,4.5vw)] py-8"
          /* ⚠ Never a flat card either. The ambience layer sits at z-0 and this
             is at z-70, so it paints its own light and its own ruling rather
             than opening the site on a rectangle of black. */
          style={{
            backgroundImage:
              "radial-gradient(60% 55% at 12% 8%, color-mix(in srgb, var(--w-accent) 22%, transparent) 0%, transparent 70%), radial-gradient(50% 45% at 88% 92%, color-mix(in srgb, var(--w-accent-2) 12%, transparent) 0%, transparent 72%), linear-gradient(var(--w-rule-2) 1px, transparent 1px), linear-gradient(90deg, var(--w-rule-2) 1px, transparent 1px)",
            backgroundSize: "auto, auto, 2rem 2rem, 2rem 2rem",
          }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.66, ease: [0.76, 0, 0.24, 1] }}
        >
          <p className="u-meta text-accent">Matthew Labrador</p>

          <div className="grid gap-9">
            <h2 className="u-display max-w-[16ch] text-[clamp(2.5rem,8vw,7rem)]">
              {"An index of things that were built".split(" ").map((w, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.045, duration: 0.45 }}
                  className="mr-[0.25em] inline-block"
                >
                  {w}
                </motion.span>
              ))}
            </h2>

            <ul className="grid max-w-[42rem] gap-2">
              {MANIFEST.map(([k, v], i) => (
                <motion.li
                  key={k}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: step >= i ? 1 : 0.14 }}
                  transition={{ duration: 0.2 }}
                  className="u-meta text-ink-3 flex items-baseline gap-3 tracking-[0.08em] normal-case"
                >
                  <span className="text-ink">{k}</span>
                  <span
                    aria-hidden
                    className="bg-rule h-px flex-1 translate-y-[-3px]"
                  />
                  <span className={step >= i ? "text-accent-2" : ""}>{v}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.span
            className="bg-accent block h-px origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
