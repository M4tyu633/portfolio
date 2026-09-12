import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Matthew Labrador — Software developer. From idea to working software.";
const font = await readFile(
  join(process.cwd(), "public/fonts/BarlowCondensed-SemiBold.ttf"),
);
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "48px 58px",
        background: "linear-gradient(120deg,#10131a,#172b48)",
        color: "#efede7",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 18,
          letterSpacing: 2,
          color: "#b5c4d8",
        }}
      >
        SOFTWARE DEVELOPER / UP MANILA
      </div>
      <div
        style={{
          position: "absolute",
          right: 65,
          top: 148,
          width: 350,
          height: 350,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          border: "38px solid #74869d",
          transform: "rotate(-24deg)",
          boxShadow: "0 0 0 18px #34465f",
        }}
      >
        <div
          style={{
            width: 230,
            height: 230,
            borderRadius: "50%",
            border: "34px solid #bac3cd",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#111823",
          }}
        >
          <div
            style={{
              width: 95,
              height: 95,
              display: "flex",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#ffa079,#d6582d)",
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontFamily: "Barlow",
          fontSize: 132,
          lineHeight: 0.86,
          letterSpacing: -3,
          marginTop: 70,
        }}
      >
        <span>MATTHEW</span>
        <span style={{ display: "flex" }}>
          LABRADOR<span style={{ color: "#f17852" }}>.</span>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 24,
          marginTop: 32,
          color: "#becbdd",
        }}
      >
        From idea to working software.
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "auto",
          paddingTop: 22,
          borderTop: "1px solid #8194af55",
          fontSize: 16,
          color: "#a9bad1",
        }}
      >
        <span>Selected work · Games, systems & machine learning</span>
        <span>matthewlabrador.vercel.app ↗</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Barlow", data: font, weight: 600, style: "normal" }],
    },
  );
}
