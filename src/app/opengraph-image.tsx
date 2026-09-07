import { ImageResponse } from "next/og";
import { opening, site, stamp, worldIndex } from "@/content/site";

/* ===========================================================================
 * The card people see when the site is pasted into a chat.
 *
 * It is the homepage's opening, reset for 1200x630: the stamp line, the
 * statement, and the four-room index. Ink on paper, hairlines, no glow, no
 * gradient, no accent blob.
 *
 * ⚠ No custom font is loaded on purpose. Satori would need the WOFF fetched at
 * build time, and a build that reaches the network to render a share image is a
 * build that can fail for a reason nobody will connect to this file. The
 * composition is doing the work here rather than the typeface.
 * ======================================================================== */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}: ${opening.statement}`;

const PAPER = "#f0ede6";
const INK = "#16130f";
const RULE = "rgba(22,19,15,0.18)";
const MUTED = "rgba(22,19,15,0.5)";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: "56px 64px",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 18,
            fontSize: 19,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          {stamp.map((s, i) => (
            <div key={s} style={{ display: "flex", gap: 18 }}>
              {i > 0 ? <span>/</span> : null}
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 74,
            lineHeight: 1.06,
            letterSpacing: -2.4,
            maxWidth: 940,
          }}
        >
          {opening.statement}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", height: 1, background: RULE }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 20,
              fontSize: 21,
              letterSpacing: 1.4,
              color: MUTED,
            }}
          >
            {worldIndex.map((w) => (
              <div key={w.n} style={{ display: "flex", gap: 12 }}>
                <span>{w.n}</span>
                <span style={{ color: INK }}>{w.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
