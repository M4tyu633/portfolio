import { Fragment, type ReactNode } from "react";

/* ===========================================================================
 * The smallest possible inline markup, so body copy in `src/content/` can carry
 * emphasis without carrying JSX.
 *
 *   **bold**     the claim inside a sentence
 *   *italic*     a quoted phrase, a term being introduced
 *   `code`       an identifier, a field name, an address
 *
 * This is the whole reason the content modules are plain TypeScript rather than
 * MDX. Three delimiters cover every piece of emphasis on the site, and they
 * cost one regex instead of a compiler.
 * ======================================================================== */

const PATTERN = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;

export function Rich({ text }: { text: string }): ReactNode {
  const parts = text.split(PATTERN).filter((p) => p !== "");

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="bg-ground-2 border-rule-2 rounded-[2px] border px-1 py-px font-mono text-[0.86em]"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("*") && part.endsWith("*")) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
