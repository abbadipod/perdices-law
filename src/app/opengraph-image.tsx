import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Perdices Law — Philippine Lawyer in Dumaguete City";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GOLD = "#C7A05E";

/**
 * An L-shaped corner accent instead of a full border. A full frame gets
 * cropped unevenly when a platform re-crops the 1.91:1 image to its own
 * ratio (Twitter, WhatsApp); a corner mark degrades more gracefully since
 * losing part of it still reads as an accent rather than a broken box.
 */
function CornerAccent({ corner }: { corner: "top-left" | "bottom-right" }) {
  const isTopLeft = corner === "top-left";
  const boxEdge = isTopLeft ? { top: 28, left: 28 } : { bottom: 28, right: 28 };
  const lineEdge = isTopLeft ? { top: 0, left: 0 } : { bottom: 0, right: 0 };

  return (
    <div style={{ position: "absolute", width: 44, height: 44, ...boxEdge, display: "flex" }}>
      <div
        style={{
          position: "absolute",
          width: 44,
          height: 2,
          backgroundColor: GOLD,
          ...lineEdge,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 2,
          height: 44,
          backgroundColor: GOLD,
          ...lineEdge,
        }}
      />
    </div>
  );
}

/** Inlined as a data URI rather than fetched over HTTP from the site's own
 * domain — fetching `${getSiteUrl()}/whatever.png` during THIS build would
 * hit whichever deployment is *currently* live, not the one being built.
 * A brand-new file (this route's own hero-og.jpg, the first time it was
 * added) doesn't exist there yet, so the fetch 404s and Satori silently
 * drops the image — no build error, just a missing layer in the output.
 * Reading straight off disk has no such timing dependency. */
function assetDataUri(publicPath: string, mimeType: string): string {
  const bytes = readFileSync(join(process.cwd(), "public", publicPath));
  return `data:${mimeType};base64,${bytes.toString("base64")}`;
}

// Generated at build time rather than shipped as a binary, so the card stays
// in step with the brand colours. Uses the runtime's default font — Oswald
// would need the font file fetched at build, which is a needless failure point.
export default function OpengraphImage() {
  const crestUrl = assetDataUri("crest.png", "image/png");
  // A JPEG copy, not the site's own hero.webp — Satori's image decoder
  // (used to prerender this route) doesn't support WebP. Pre-cropped to
  // this route's exact 1200x630 via `npm run og:hero` (see package.json)
  // whenever public/hero.webp changes.
  const heroUrl = assetDataUri("hero-og.jpg", "image/jpeg");

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#1A1F26",
        }}
      >
        {/* Faint hero-photo texture, not a flat fill — kept subtle (low
            opacity, then darkened further by the gradient layer above it)
            so it reads as depth, not a competing image. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og
            renders with Satori, not the DOM; next/image doesn't apply here. */}
        <img
          src={heroUrl}
          width={size.width}
          height={size.height}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.22,
          }}
        />

        {/* Same dark-gradient treatment as the live hero, so the card looks
            like it belongs to the same site rather than a separate asset. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(180deg, rgba(26,31,38,0.88) 0%, rgba(26,31,38,0.8) 50%, rgba(26,31,38,0.92) 100%)",
          }}
        />

        {/* Warm gold glow, on its own layer — Satori renders each
            background-image/gradient more reliably one per element than
            stacked in a single background-image list. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 88% 18%, rgba(199,160,94,0.18) 0%, rgba(199,160,94,0) 55%)",
          }}
        />

        <CornerAccent corner="top-left" />
        <CornerAccent corner="bottom-right" />

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "80px 90px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- next/og
                renders with Satori, not the DOM; next/image doesn't apply
                here. No circular badge wrapper (unlike CrestMark's ink
                disc) — the background here is already ink, same as how it
                reads in the footer, where CrestMark's disc is equally
                invisible against it. */}
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
              backgroundColor: GOLD,
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
              color: GOLD,
            }}
          >
            Philippine Lawyer — Dumaguete City
          </div>
        </div>
      </div>
    ),
    size
  );
}
