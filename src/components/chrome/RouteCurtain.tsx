"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/content/projects";
import type { WorldId } from "@/content/types";
import { usePrefersReducedMotion } from "@/lib/prefs";
import { useSound } from "@/lib/sound";

/* ===========================================================================
 * THE DOOR.
 *
 * Moving between rooms in this building should feel like moving between rooms.
 * Client-side navigation on its own does not: the paper page is replaced by a
 * near-black debugger in one paint, with no sense that you went anywhere.
 *
 * So a curtain in the DESTINATION world's own ground colour wipes up over the
 * page when an internal link is pressed, carries that project's catalogue
 * number and name, and wipes away once the new route has painted. The number is
 * the through-line: it is on the archive row you pressed, it is on the curtain,
 * and it is in the navigation bar when you arrive.
 *
 * ⚠ It never blocks navigation and it never calls preventDefault. It is a
 * decoration over a link that is already working, and it clears on three
 * independent triggers so it can never strand the page under an opaque layer:
 *
 *   1. the pathname changing, which is the normal case
 *   2. a hard timeout, for a navigation that was cancelled or refused
 *   3. `pagehide`, for a link that turned out to leave the site
 *
 * ⚠ Under prefers-reduced-motion it does nothing at all. A full-screen wipe is
 * exactly the kind of motion that setting exists to refuse.
 * ======================================================================== */

/** Ground colours by world, so the curtain is the colour of the room you are
 *  walking into. Kept here rather than read from CSS because the destination's
 *  variables are not on the page yet at the moment the curtain opens. */
const GROUND: Record<WorldId, string> = {
  index: "#f0ede6",
  tumbang: "#feebd4",
  egov: "#f4f6fb",
  glyco: "#080d12",
  chip8: "#06090a",
  reading: "#0b0b0c",
  cardio: "#08080b",
};

const INK: Record<WorldId, string> = {
  index: "#16130f",
  tumbang: "#55290f",
  egov: "#10203a",
  glyco: "#dfe5e8",
  chip8: "#d5e3de",
  reading: "#f2ece4",
  cardio: "#eceaf2",
};

type Target = { world: WorldId; n?: string; title?: string };

/** What lies behind a href. Only the project routes get a number and a name;
 *  everything else is the building, and the building is paper. */
function resolve(href: string): Target | null {
  if (!href.startsWith("/")) return null;
  const path = href.split(/[?#]/)[0].replace(/\/$/, "");
  if (path === "" || path === "/") return { world: "index" };

  const slug = path.startsWith("/work/") ? path.slice("/work/".length) : null;
  if (slug) {
    const p = projects.find((x) => x.slug === slug);
    if (p) return { world: p.world, n: p.n, title: p.title };
  }
  if (path === "/lab/chip-8") {
    return { world: "chip8", n: "04", title: "CHIP-8" };
  }
  return { world: "index" };
}

export default function RouteCurtain() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const { play } = useSound();
  const [target, setTarget] = useState<Target | null>(null);
  const openedAt = useRef(0);

  /* Opening. A single capture-phase listener on the document rather than a
   * wrapper around every Link: the curtain has to work for links inside content
   * blocks, figures and the footer, and none of those know it exists. */
  useEffect(() => {
    if (reduced) return;

    const onClick = (e: MouseEvent) => {
      // Anything that is not a plain left click is the browser's business:
      // modifier clicks open tabs, and a curtain over a tab you did not leave
      // is a bug.
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link = (e.target as HTMLElement | null)?.closest?.("a");
      if (!link) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;

      const href = link.getAttribute("href") ?? "";
      // In-page anchors are not a room change.
      if (href.startsWith("#")) return;

      const next = resolve(href);
      if (!next) return;
      const dest = href.split(/[?#]/)[0].replace(/\/$/, "");
      if (dest === pathname.replace(/\/$/, "")) return;

      openedAt.current = performance.now();
      setTarget(next);
      play("enter");
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, reduced, play]);

  /* Closing, trigger 1: the route changed. */
  useEffect(() => {
    if (!target) return;
    // One frame of the new page painted underneath before the wipe out, so the
    // curtain never lifts on a blank document.
    const id = window.setTimeout(() => setTarget(null), 90);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- pathname is the signal
  }, [pathname]);

  /* Closing, triggers 2 and 3: a navigation that never happened, and a link
   * that left the site. */
  useEffect(() => {
    if (!target) return;
    const id = window.setTimeout(() => setTarget(null), 1400);
    const onHide = () => setTarget(null);
    window.addEventListener("pagehide", onHide);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("pagehide", onHide);
    };
  }, [target]);

  const open = target !== null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[80]"
      style={{
        // clip-path rather than transform: a wipe that reveals from the bottom
        // edge reads as a panel sliding over the page, and it composites on the
        // GPU exactly like a transform does.
        clipPath: open ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
        transition: open
          ? "clip-path 380ms cubic-bezier(0.7, 0, 0.24, 1)"
          : "clip-path 520ms cubic-bezier(0.22, 1, 0.36, 1) 40ms",
        background: GROUND[target?.world ?? "index"],
      }}
    >
      <div
        className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[92rem] items-baseline gap-5 px-5 pb-10 sm:px-8 sm:pb-14"
        style={{
          color: INK[target?.world ?? "index"],
          opacity: open ? 1 : 0,
          transition: "opacity 220ms",
        }}
      >
        {target?.n ? (
          <>
            <span className="u-meta tabular-nums opacity-60">{target.n}</span>
            <span className="u-meta">{target.title}</span>
          </>
        ) : null}
      </div>
    </div>
  );
}
