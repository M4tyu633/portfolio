import { ImageResponse } from "next/og";
import { opening, site, stamp } from "@/content/site";
import { entrances } from "@/content/worlds";

/* The card people see when the site is pasted into a chat: the homepage's
 * opening, reset for 1200x630.
 *
 * ⚠ No custom font is loaded on purpose. Satori would need the WOFF fetched at
 * build time, and a build that reaches the network to render a share image is a
 * build that can fail for a reason nobody will connect to this file. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}: ${opening.statement}`;

const GROUND = "#08080a";
const INK = "#f4f2ee";
const RULE = "rgba(244,242,238,0.16)";
const MUTED = "rgba(244,242,238,0.55)";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: GROUND,
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
            fontSize: 19,
            letterSpacing: 1.2,
            color: MUTED,
          }}
        >
          {entrances.map((w) => (
            <div key={w.n} style={{ display: "flex", gap: 10 }}>
              <span>{w.n}</span>
              <span style={{ color: INK }}>{w.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>,
    size,
  );
}
