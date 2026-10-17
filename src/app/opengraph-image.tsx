import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "Matthew Labrador — software developer, UP Manila. Games, education, healthcare and AI.";
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
        background: "#111110",
        color: "#f3f0e7",
        padding: "45px 55px",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 18,
          color: "#c1beb5",
          borderBottom: "1px solid #66665c",
          paddingBottom: 20,
        }}
      >
        <span>SOFTWARE DEVELOPER / UP MANILA</span>
        <span>MANILA, PH</span>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Barlow",
            fontSize: 145,
            lineHeight: 0.86,
            letterSpacing: -3,
          }}
        >
          <span>MATTHEW</span>
          <span>
            LABRADOR<span style={{ color: "#ff563d" }}>.</span>
          </span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "30px 34px",
            background: "#ff563d",
            color: "#111110",
            fontFamily: "Barlow",
            fontSize: 66,
            lineHeight: 0.9,
            transform: "rotate(3deg)",
          }}
        >
          <span>A LITTLE</span>
          <span>OBSESSED</span>
          <span>WITH BUILDING.</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 17,
          color: "#c1beb5",
          paddingTop: 20,
          borderTop: "1px solid #66665c",
        }}
      >
        <span>GAMES / EDUCATION / HEALTHCARE / AI</span>
        <span>matthewlabrador.vercel.app</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [{ name: "Barlow", data: font, weight: 600, style: "normal" }],
    },
  );
}
