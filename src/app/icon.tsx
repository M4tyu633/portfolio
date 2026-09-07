import { ImageResponse } from "next/og";

/* Ink on paper, square, no radius. The building's own two colours and nothing
 * else: there is no gradient anywhere on this site and the favicon is not going
 * to be the exception. */

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#16130f",
          color: "#f0ede6",
          fontSize: 15,
          fontWeight: 600,
          letterSpacing: -0.8,
        }}
      >
        ML
      </div>
    ),
    size,
  );
}
