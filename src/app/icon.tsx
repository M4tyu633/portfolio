import { ImageResponse } from "next/og";

/* The favicon. Generated so it always matches the site's accent colours. */

export const size = { width: 32, height: 32 };
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
        background: "linear-gradient(135deg, #5eead4, #a78bfa)",
        color: "#08090c",
        fontSize: 14,
        fontWeight: 700,
        letterSpacing: -0.5,
        borderRadius: 7,
      }}
    >
      ML
    </div>,
    size,
  );
}
