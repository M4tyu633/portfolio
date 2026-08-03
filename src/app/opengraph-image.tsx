import { ImageResponse } from "next/og";
import { hero, site } from "@/content/data";

/* The card people see when the site is pasted into LinkedIn, Discord, X, etc.
 * Generated at build time — nothing to design in Figma, it just follows data.ts. */

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${hero.name} · portfolio`;

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        background: "#08090c",
        padding: "80px",
        position: "relative",
      }}
    >
      {/* accent glows */}
      <div
        style={{
          position: "absolute",
          top: -160,
          left: -120,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "#5eead4",
          opacity: 0.18,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -200,
          right: -100,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "#a78bfa",
          opacity: 0.18,
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 32,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "linear-gradient(135deg, #5eead4, #a78bfa)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#08090c",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          ML
        </div>
        <div style={{ color: "#99a1b3", fontSize: 26 }}>
          {site.url.replace(/^https?:\/\//, "")}
        </div>
      </div>

      <div
        style={{
          color: "#f2f4f8",
          fontSize: 84,
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: -2,
        }}
      >
        {hero.name}
      </div>

      <div
        style={{
          color: "#5eead4",
          fontSize: 36,
          marginTop: 20,
          fontWeight: 500,
        }}
      >
        {site.ogTagline}
      </div>

      <div
        style={{
          color: "#99a1b3",
          fontSize: 26,
          marginTop: 28,
          maxWidth: 900,
          lineHeight: 1.4,
        }}
      >
        BS Computer Science, University of the Philippines Manila
      </div>
    </div>,
    size,
  );
}
