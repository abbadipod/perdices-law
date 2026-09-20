// Regenerates public/hero-og.jpg from public/hero.webp — run this whenever
// the hero photo changes. Exists because Satori (used to prerender
// src/app/opengraph-image.tsx) can't decode WebP, so the OG card needs its
// own JPEG copy, pre-cropped to the route's exact 1200x630 output size.
import sharp from "sharp";

await sharp("public/hero.webp")
  .resize(1200, 630, { fit: "cover", position: "right" })
  .jpeg({ quality: 70 })
  .toFile("public/hero-og.jpg");

console.log("Wrote public/hero-og.jpg");
