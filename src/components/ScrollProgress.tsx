"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A thin accent bar across the top showing how far down the page you are,
 * plus a back-to-top button once you're past the first screen.
 */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${(pct / 100).toFixed(4)})`;
      }
      setShowTop(doc.scrollTop > doc.clientHeight * 0.9);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="from-accent to-accent-2 fixed inset-x-0 top-0 z-60 h-0.5 origin-left bg-linear-to-r"
        ref={barRef}
        style={{ transform: "scaleX(0)" }}
      />

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className={`border-border bg-background/80 text-muted hover:border-accent hover:text-accent fixed right-5 bottom-5 z-50 grid h-11 w-11 place-items-center rounded-full border backdrop-blur transition-all duration-300 sm:right-8 sm:bottom-8 ${
          showTop
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </button>
    </>
  );
}
