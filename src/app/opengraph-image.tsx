import { ImageResponse } from "next/og";

export const alt =
  "Perdices Law — Dual-Qualified Attorney, US & Philippines";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time rather than shipped as a binary, so the card stays
// in step with the brand colours. Uses the runtime's default font — Oswald
// would need the font file fetched at build, which is a needless failure point.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#1A1F26",
          padding: "80px 90px",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: "#CBCED0",
          }}
        >
          Perdices Law
        </div>

        <div
          style={{
            width: 96,
            height: 3,
            backgroundColor: "#C7A05E",
            margin: "36px 0",
          }}
        />

        <div
          style={{
            fontSize: 68,
            lineHeight: 1.12,
            letterSpacing: -1,
            color: "#F7F6F3",
            maxWidth: 900,
          }}
        >
          Practical legal solutions, across two countries.
        </div>

        <div
          style={{
            marginTop: 40,
            fontSize: 24,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#C7A05E",
          }}
        >
          Dual-Qualified Attorney — US &amp; Philippines
        </div>
      </div>
    ),
    size
  );
}
