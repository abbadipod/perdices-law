import { ImageResponse } from "next/og";
import { getSiteUrl } from "@/lib/site-url";

export const alt = "Perdices Law — Philippine Lawyer in Dumaguete City";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time rather than shipped as a binary, so the card stays
// in step with the brand colours. Uses the runtime's default font — Oswald
// would need the font file fetched at build, which is a needless failure point.
export default function OpengraphImage() {
  const crestUrl = `${getSiteUrl()}/crest.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // A flat fill read as a slide, not a brand card. The radial glow
          // (warm gold, low opacity) picks up the accent colour used
          // everywhere else on the site without competing with the text —
          // Satori doesn't support CSS gradients on backgroundImage with
          // multiple stops well, so this is two layered backgrounds instead
          // of one gradient string.
          backgroundColor: "#1A1F26",
          backgroundImage:
            "radial-gradient(circle at 88% 18%, rgba(199,160,94,0.16) 0%, rgba(199,160,94,0) 55%)",
          padding: "80px 90px",
          border: "1px solid rgba(199,160,94,0.35)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og
              renders with Satori, not the DOM; next/image doesn't apply here.
              No circular badge wrapper (unlike CrestMark's ink disc) — the
              background here is already ink, same as how it reads in the
              footer, where CrestMark's disc is equally invisible against it. */}
          <img src={crestUrl} width={56} height={56} alt="" />
          <div
            style={{
              marginLeft: 20,
              fontSize: 26,
              letterSpacing: 10,
              textTransform: "uppercase",
              color: "#CBCED0",
            }}
          >
            Perdices Law
          </div>
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
          Practical legal solutions from a dual-qualified attorney.
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
          Philippine Lawyer — Dumaguete City
        </div>
      </div>
    ),
    size
  );
}
