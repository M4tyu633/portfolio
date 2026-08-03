"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { contact, gmailCompose, navLinks, projects } from "@/content/data";

/* ---------------------------------------------------------------------------
 * ⌘K / Ctrl-K palette: jump to a section, open a project's repo, grab the
 * resume, copy the email, flip the theme. Keyboard-first, no dependencies.
 * ------------------------------------------------------------------------ */

type Item = {
  id: string;
  label: string;
  hint: string;
  group: "Go to" | "Projects" | "Links" | "Actions";
  run: () => void;
  keywords?: string;
};

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const flash = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  }, []);

  const go = useCallback((hash: string) => {
    document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const items: Item[] = useMemo(() => {
    const out: Item[] = navLinks.map((l) => ({
      id: `nav-${l.href}`,
      label: l.label,
      hint: "Section",
      group: "Go to",
      run: () => go(l.href),
    }));

    for (const p of projects) {
      const url = p.links?.demo || p.links?.github;
      out.push({
        id: `proj-${p.title}`,
        label: p.title,
        hint: url ? "Open repo" : "Jump to projects",
        group: "Projects",
        keywords: p.tags.join(" "),
        run: () =>
          url ? window.open(url, "_blank", "noopener") : go("#projects"),
      });
    }

    if (contact.github)
      out.push({
        id: "gh",
        label: "GitHub",
        hint: "External",
        group: "Links",
        run: () => window.open(contact.github, "_blank", "noopener"),
      });
    if (contact.linkedin)
      out.push({
        id: "li",
        label: "LinkedIn",
        hint: "External",
        group: "Links",
        run: () => window.open(contact.linkedin, "_blank", "noopener"),
      });
    if (contact.facebook)
      out.push({
        id: "fb",
        label: "Facebook",
        hint: "External",
        group: "Links",
        run: () => window.open(contact.facebook, "_blank", "noopener"),
      });
    if (contact.resume)
      out.push({
        id: "cv",
        label: "Resume (PDF)",
        hint: "Download",
        group: "Links",
        keywords: "cv curriculum vitae",
        run: () => window.open(contact.resume, "_blank", "noopener"),
      });

    out.push(
      {
        id: "mail",
        label: "Email me",
        hint: contact.email,
        group: "Actions",
        keywords: "contact gmail message",
        run: () => window.open(gmailCompose, "_blank", "noopener"),
      },
      {
        id: "copy",
        label: "Copy email address",
        hint: contact.email,
        group: "Actions",
        keywords: "clipboard",
        run: () => {
          navigator.clipboard
            ?.writeText(contact.email)
            .then(() => flash("Email copied"))
            .catch(() => flash("Couldn't copy — select it on the page"));
        },
      },
      {
        id: "theme",
        label: "Toggle light / dark",
        hint: "Theme",
        group: "Actions",
        keywords: "dark mode appearance",
        run: () => {
          const dark = document.documentElement.classList.toggle("dark");
          try {
            localStorage.setItem("theme", dark ? "dark" : "light");
          } catch {
            /* private mode — still applies for this session */
          }
          flash(dark ? "Dark mode" : "Light mode");
        },
      },
    );

    return out;
  }, [go, flash]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matched = !q
      ? items
      : items.filter((i) =>
          `${i.label} ${i.hint} ${i.keywords ?? ""}`.toLowerCase().includes(q),
        );
    // A row shows its group heading when it's the first of that group. Derived
    // by looking back at the previous item, so nothing is mutated mid-map.
    return matched.map((item, i) => ({
      item,
      header:
        i === 0 || matched[i - 1].group !== item.group ? item.group : null,
    }));
  }, [items, query]);

  /* Reset in the handlers rather than in an effect keyed on `open` — setting
   * state from an effect costs an extra render pass and the compiler warns. */
  const openPalette = useCallback(() => {
    setQuery("");
    setActive(0);
    setOpen(true);
  }, []);

  /* Open with ⌘K / Ctrl-K from anywhere. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) {
            setQuery("");
            setActive(0);
          }
          return !o;
        });
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    // Focus is handled by autoFocus on the input; doing it from rAF would tie a
    // keyboard-first feature to the frame loop, which is paused in a
    // background tab.
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Keep the highlighted row in view when arrowing past the fold.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-idx="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (results.length ? (a + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) =>
        results.length ? (a - 1 + results.length) % results.length : 0,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const row = results[active];
      if (row) {
        setOpen(false);
        row.item.run();
      }
    }
  };

  return (
    <>
      {/* Trigger — also tells people the shortcut exists. */}
      <button
        onClick={openPalette}
        aria-label="Open command palette"
        className="border-border bg-surface/60 text-muted hover:border-accent hover:text-accent fixed bottom-5 left-5 z-40 hidden items-center gap-2 rounded-full border px-4 py-2 text-xs backdrop-blur transition-colors sm:bottom-8 sm:left-8 sm:inline-flex"
      >
        <kbd className="font-sans">⌘</kbd>
        <kbd className="font-sans">K</kbd>
        <span className="ml-1">Jump to…</span>
      </button>

      {toast && (
        <div
          role="status"
          className="bg-foreground text-background fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-full px-4 py-2 text-xs font-medium shadow-lg"
        >
          {toast}
        </div>
      )}

      {open && (
        <div
          className="fixed inset-0 z-[65] flex items-start justify-center px-4 pt-[12vh]"
          onClick={() => setOpen(false)}
        >
          <div className="bg-background/70 absolute inset-0 backdrop-blur-sm" />

          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(e) => e.stopPropagation()}
            className="border-border bg-surface relative w-full max-w-lg overflow-hidden rounded-2xl border shadow-2xl shadow-black/40"
          >
            <div className="border-border flex items-center gap-3 border-b px-4">
              <span className="text-muted text-sm">/</span>
              <input
                autoFocus
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder="Search sections, projects, links…"
                aria-label="Search"
                className="text-foreground placeholder:text-muted w-full bg-transparent py-4 text-sm outline-none"
              />
              <kbd className="border-border text-muted rounded border px-1.5 py-0.5 text-[10px]">
                esc
              </kbd>
            </div>

            <ul ref={listRef} className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="text-muted px-3 py-6 text-center text-sm">
                  Nothing matches “{query}”.
                </li>
              )}

              {results.map(({ item, header }, i) => (
                <li key={item.id}>
                  {header && (
                    <p className="text-muted px-3 pt-3 pb-1 text-[10px] tracking-[0.16em] uppercase">
                      {header}
                    </p>
                  )}
                  <button
                    data-idx={i}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => {
                      setOpen(false);
                      item.run();
                    }}
                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      i === active
                        ? "bg-accent/10 text-accent"
                        : "text-foreground hover:bg-background/60"
                    }`}
                  >
                    <span className="truncate">{item.label}</span>
                    <span className="text-muted shrink-0 truncate text-xs">
                      {item.hint}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="border-border text-muted flex items-center gap-4 border-t px-4 py-2.5 text-[10px]">
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
