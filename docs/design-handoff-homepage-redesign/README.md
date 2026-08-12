# Handoff: Perdices Law homepage redesign

## Overview
An editorial redesign of the Perdices Law homepage (repo `abbadipod/perdices-law`, branch `master`).
Same content and same palette as the existing Next.js app — new layout, new display typeface, real crest
artwork, a contact form, and scroll motion. Sections, in order: sticky nav, full-bleed hero, crest badge,
About, Practice Areas, Credentials, FAQ, Contact, Footer.

## About the Design Files
`Perdices Law Condensed.dc.html` is a **design reference written in HTML** — a prototype of the intended
look and behavior, not production code to paste in. The task is to recreate it inside the existing Next.js
+ Tailwind app, using its established component structure (`src/components/*`), content module
(`src/content/site.ts`), and Tailwind theme. Content is already correct in `site.ts`; this is a
presentation change plus two new pieces (a contact form, and the crest asset).

## Fidelity
**High-fidelity.** Colors, type sizes, spacing, and motion timings below are final. Recreate closely.

## Screens / Views

### Nav (`src/components/Nav.tsx`)
- Fixed, full width, z-50. Background transparent at the top of the hero; `#1A1F26` with a
  `rgba(151,162,174,0.28)` bottom hairline once scrolled past 40px. Transition 300ms ease on both.
- Inner row: max-width 1200px, padding 14px 28px, flex, space-between, gap 24px.
- Left: crest image 38×38 (`object-fit:contain`) + wordmark "PERDICES LAW" — Oswald, 13px,
  letter-spacing 0.18em, uppercase, `#fff`. Gap 10px.
- Center: links Practice / Credentials / About / FAQ / Contact — 11px, letter-spacing 0.2em, uppercase,
  `#CBCED0`, hover `#C7A05E`. Gap 34px. (Hrefs unchanged from `navLinks`.)
- Right: "Book a consultation" — 1px `#C7A05E` border, padding 9px 18px, 10px, letter-spacing 0.22em,
  uppercase, `#CBCED0`; hover fills `#C7A05E` with `#1A1F26` text (200ms).
- Mobile menu: keep the existing disclosure behavior from the current Nav.

### Hero (`src/components/Hero.tsx`)
- `min-height: 88vh` (NOT a fixed height — content must be able to grow past it), `overflow:hidden`,
  background `#3F5266`.
- Background layer: absolutely positioned, `inset:-8% 0`, holds a full-bleed photo (`object-fit:cover`).
  The prototype uses a striped SVG placeholder labelled "portrait of Atty. Perdices at his desk" — replace
  with the real photograph.
- Scrim over the photo: `linear-gradient(180deg, rgba(26,31,38,0.72) 0%, rgba(26,31,38,0.5) 45%, rgba(26,31,38,0.82) 100%)`.
- Content column: relative, `min-height:88vh`, flex column, centered both axes, text-align center,
  padding `120px 28px 150px`. The 150px bottom padding is load-bearing — it keeps the CTA clear of the
  crest badge that overlaps up from the next section.
  - Eyebrow: "Dual-Qualified Attorney — US & Philippines", 11px, letter-spacing 0.34em, uppercase, `#CBCED0`.
  - H1: "Practical legal solutions, across two countries." — Oswald 500, uppercase, letter-spacing 0.01em,
    `clamp(40px, 5.6vw, 82px)`, line-height 1.06, `#F7F6F3`, max-width 15ch, `text-wrap:balance`.
  - Sub: 17px/1.7, `#CBCED0`, max-width 46ch, margin-top 28px.
  - CTA: same treatment as the nav button but padding 15px 34px, 11px, letter-spacing 0.26em, margin-top 40px.
- Scroll cue: 1px × 52px vertical gradient rule (`transparent → #C7A05E`), centered, 34px from the bottom.

### Crest badge (between Hero and About)
- 104px circle, background `#1A1F26`, containing the crest at 82×82. Centered, `transform:translateY(-52px)`
  so it straddles the boundary. Sits at the top of the About section.

### About (`src/components/About.tsx`)
- Background `#ECE3D2` ("sand" — gold `#C7A05E` at ~22% over paper). Padding `0 28px 110px`.
- Max-width 1120px. Grid `minmax(0,300px) minmax(0,1fr)`, gap 56px, items start,
  padding-bottom 56px, bottom border `1px solid rgba(26,31,38,0.18)`.
  - Left: portrait, `aspect-ratio:4/5`, `object-fit:cover`, `object-position:50% 30%`,
    filter `grayscale(0.35) sepia(0.12) contrast(1.02)`. Caption below, margin-top 14px: name in Oswald
    uppercase 13px letter-spacing 0.12em `#1A1F26`, role on a second line at `rgba(26,31,38,0.6)`.
    *The photo currently in the prototype is a placeholder — swap for a professional portrait.*
  - Right: two columns, gap 44px. Column headings "ABOUT" / "APPROACH": 12px, letter-spacing 0.28em,
    uppercase, weight 600, `#3F5266`. Body copy 15px/1.75, `#1A1F26` then `rgba(26,31,38,0.85)`.
- Pull line, centered below the rule (margin-top 56px): "Two legal systems. / One point of contact." —
  Oswald 500 uppercase, `clamp(26px, 3.2vw, 40px)`, line-height 1.22, `#3F5266`, max-width 24ch.

### Practice Areas (`src/components/PracticeAreas.tsx`)
- Continues the same `#ECE3D2` band. Padding `20px 28px 110px`, max-width 1200px.
- Header row: flex, space-between, align-end, gap 32px, padding-bottom 26px, bottom border
  `1px solid rgba(26,31,38,0.22)`.
  - Eyebrow "What we handle" 11px/0.28em uppercase `#3F5266`; H2 "Practice Areas" Oswald 500 uppercase
    `clamp(28px, 3.4vw, 44px)` `#1A1F26`; right-hand lede 14px/1.7 `rgba(26,31,38,0.7)` max-width 34ch.
- Grid: `repeat(auto-fit, minmax(300px, 1fr))`, gap 22px, margin-top 44px. Seven cards from
  `practiceAreas` in `site.ts`.
- Card: background `#fff`, border `1px solid rgba(151,162,174,0.5)`, padding `30px 28px 34px`, full height.
  - Top row: existing icon from `PracticeIcons.tsx` at 26px stroked `#C7A05E`, and the index
    (`01`–`07`) right-aligned in Oswald 13px letter-spacing 0.1em `rgba(199,160,94,0.95)`.
  - Title: Oswald 500 uppercase 19px/1.3 `#3F5266`, margin `22px 0 12px`.
  - Body: 14px/1.7 `rgba(26,31,38,0.78)`, `text-wrap:pretty`.
  - Hover: border `#C7A05E` and `translateY(-4px)`, 300ms ease.

### Credentials (`src/components/Credentials.tsx`)
- Background `#1A1F26`, padding `104px 28px`, max-width 1000px.
- Eyebrow "Credentials" 11px/0.28em uppercase `#C7A05E`; H2 Oswald 500 uppercase
  `clamp(28px, 3.4vw, 44px)` `#F7F6F3`.
- Definition rows (margin-top 46px, top border `rgba(151,162,174,0.32)`): grid
  `minmax(0,1fr) minmax(0,1.3fr)`, gap 28px, baseline aligned, padding `26px 0`, bottom border same color.
  - `dt`: Oswald 17px uppercase letter-spacing 0.04em `#F7F6F3`. `dd`: 14px/1.7 `#CBCED0`.

### FAQ (`src/components/FAQ.tsx`)
- Background `#F7F6F3`, padding `104px 28px`, max-width 840px.
- Eyebrow "Common questions" `#3F5266`; H2 Oswald 500 uppercase, `#1A1F26`.
- Rows: top border and per-row bottom border `rgba(151,162,174,0.4)`. Question row: flex, space-between,
  gap 24px, padding `22px 0`, cursor pointer; question Oswald 400, 17px/1.4, `#3F5266`; marker "+"
  `#C7A05E` 20px, rotates to 45° over 300ms when open. Answer: 15px/1.75 `rgba(26,31,38,0.8)`,
  max-width 66ch, padding-bottom 24px.
- The prototype uses native `<details>`; the existing React accordion (single-open `openIndex` state) is
  fine to keep — match the visuals.

### Contact (`src/components/Contact.tsx`) — includes a NEW form
- Background `#3F5266`, padding `104px 28px`, max-width 1120px.
- Eyebrow "Get in touch" `#CBCED0`; H2 "Request a consultation" Oswald 500 uppercase `#F7F6F3`.
- Grid `minmax(0,1.1fr) minmax(0,0.9fr)`, gap 56px, items start, margin-top 46px.
- Left — form, grid gap 22px. Fields: Name (text), Email (email), "How can I help?" (textarea, 5 rows).
  All required.
  - Labels: 10px, letter-spacing 0.24em, uppercase, `#CBCED0`, 8px above the control.
  - Text inputs: transparent, no border except a 1px bottom rule `rgba(203,206,208,0.45)`,
    padding `10px 2px`, 16px, color `#F7F6F3`; focus turns the rule `#C7A05E`.
  - Textarea: full 1px border, same colors, padding 12px, `resize:vertical`; focus border `#C7A05E`.
  - Submit "Send inquiry": 1px `#C7A05E`, transparent, padding 15px 32px, 11px/0.24em uppercase
    `#F7F6F3`; hover fills gold with `#1A1F26` text. On submit the prototype prevents default and shows
    "Thank you — I'll reply within one business day." beside the button (13px `#CBCED0`).
    **No backend exists** — wire to a route handler / form service.
  - Disclaimer under the form: 12px/1.6 `rgba(203,206,208,0.75)` — "Submitting this form does not create
    an attorney-client relationship."
- Right — `info@perdiceslaw.com` as a gold-underlined link, then the two office cards from
  `contactInfo.offices`: 1px `rgba(151,162,174,0.45)` border, padding 26px; city in Oswald 400 uppercase
  16px letter-spacing 0.06em `#F7F6F3`; address 14px/1.7 `#CBCED0`; hours `rgba(203,206,208,0.8)`;
  phone `tel:` link `#CBCED0` → `#C7A05E` on hover.

### Footer (`src/components/Footer.tsx`)
- Background `#1A1F26`, padding `56px 28px 44px`, max-width 1120px.
- Top row: crest 30×30 + "PERDICES LAW" (Oswald 12px/0.18em uppercase `#F7F6F3`) on the left, nav links
  (10px/0.2em uppercase `#CBCED0`, gap 28px) on the right; padding-bottom 26px, bottom border
  `rgba(151,162,174,0.28)`.
- Disclaimer 12px/1.7 `#97A2AE` max-width 80ch, then the copyright line. Copy unchanged from the repo.

## Interactions & Behavior
- **Sticky nav**: background/border swap once the hero has scrolled 40px past the top.
- **Hero parallax**: the hero background layer translates at 0.3× scroll distance and is scaled 1.05.
- **Reveal on scroll**: elements marked `data-reveal` fade up 18px over 700ms ease, staggered 0/60/120/180ms
  within a group, triggered when their top crosses 90% of the viewport height.
  Important: author them **visible by default** and only hide what is still below the fold, so a JS failure
  can never blank the page. Wrap in `prefers-reduced-motion` and skip the motion when set.
- Measure scroll from `getBoundingClientRect()` rather than `window.scrollY`, and throttle with
  `requestAnimationFrame`. In Next.js this is a `"use client"` effect; the existing `Reveal.tsx`
  component is the natural home for it.
- **FAQ**: single row open at a time; "+" rotates 45°.
- **Cards**: hover lifts 4px and the border turns gold.

## State Management
- `scrolled: boolean` (nav) — already present in `Nav.tsx`.
- `openIndex: number | null` (FAQ) — already present.
- `menuOpen: boolean` (mobile nav) — already present.
- Contact form: controlled or uncontrolled inputs plus a `status: "idle" | "sending" | "sent" | "error"`.
  Needs a POST endpoint; nothing else fetches data.

## Design Tokens
Unchanged from `tailwind.config.ts` — do not introduce new colors.

| Token | Hex |
| --- | --- |
| ink | `#1A1F26` |
| hudson-bay | `#3F5266` |
| gold | `#C7A05E` |
| paper | `#F7F6F3` |
| sidewalk | `#CBCED0` |
| comet | `#97A2AE` |
| sand (NEW — add as `sand`) | `#ECE3D2` (gold at 22% over paper) |

Typography: display = **Oswald** 400/500, uppercase, letter-spacing 0.01em (replaces Fraunces — update
`layout.tsx` and `fontFamily.display`). Body = **Public Sans** 300–600, unchanged.
Type scale: hero `clamp(40px,5.6vw,82px)`; section H2 `clamp(28px,3.4vw,44px)`; card title 19px;
body 14–17px; eyebrow 11px/0.28em; micro label 10px/0.24em.
Spacing: section padding 104–110px vertical, 28px horizontal; content max-widths 840 / 1000 / 1120 / 1200px;
grid gaps 22px (cards), 44–56px (columns).
Radius: 0 everywhere except the circular crest badge. Shadows: none.
Motion: 700ms ease reveals, 300ms ease hovers/nav, 200ms ease button fills.

## Assets
- `crest.png` — the crest lifted from the supplied logo lockup: cropped square, navy background keyed out
  by luminance, circular mask. Drop into `public/`. Preferably re-export from the original vector artwork
  at 2× for production.
- `logo.jpg` — the full logo lockup already in `public/`, no longer used in the nav.
- Hero photograph — **still needed**. Full-bleed, landscape, dark enough to hold white type under the scrim.
- Portrait of Atty. Perdices — **still needed**. 4:5, professional.
- Icons: reuse `src/components/PracticeIcons.tsx` as-is.

## Files
- `Perdices Law Condensed.dc.html` — the full design reference (all sections, all motion).
- `crest.png` — the extracted crest asset.
