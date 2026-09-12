import { ImageResponse } from "next/og";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#10131a",
        color: "#efede7",
        fontSize: 29,
        fontWeight: 700,
        letterSpacing: -2,
      }}
    >
      ML<span style={{ color: "#f17852" }}>·</span>
    </div>,
    size,
  );
}
