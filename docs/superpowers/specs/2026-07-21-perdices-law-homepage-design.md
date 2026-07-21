# Perdices Law — Homepage Design

**Date:** 2026-07-21
**Status:** Approved for implementation

## Overview

A single-page marketing website for Perdices Law, the law office of Atty. Jose
Mari Perdices — a dual-qualified attorney (US and Philippines) whose practice
centers on cross-border immigration (US↔PH) alongside general Philippine legal
services (criminal, real estate, family, business, civil litigation).

Goal: a homepage that reads as deliberately designed and trustworthy for a
legal audience, explicitly avoiding the generic "AI-generated law firm
template" look (Playfair Display + Inter, gradient blobs, glassmorphism cards,
stock-photo handshake heroes, rounded-pill buttons everywhere).

## Tech Architecture

- **Next.js 14 (App Router) + TypeScript**
- Single route (`/`), composed of section components: `Hero`, `PracticeAreas`,
  `Credentials`, `About`, `FAQ`, `Contact`, `Footer`, plus a persistent `Nav`.
- **Tailwind CSS**, with the palette wired in as design tokens (see below)
  rather than hardcoded hex values scattered through components.
- **Framer Motion** for restrained scroll-reveal and hover interactions —
  subtle fades/slides, not gimmicky.
- Static/SSG output. No backend/API routes needed for v1 (contact section is
  static info, not a working form).
- Structure should make it straightforward to later add routed pages (e.g.
  `/practice-areas/immigration`) without a rewrite — but that is explicitly
  out of scope for this spec.

## Visual System

### Color tokens

Sourced from the Benjamin Moore palette the client specified by name — all
three are from the same manufacturer, so they're designed to work together.

| Token | Hex | Role |
|---|---|---|
| `sidewalk` | `#CBCED0` | Light neutral — backgrounds, cards on dark sections |
| `comet` | `#97A2AE` | Mid tone — secondary text on dark, borders, muted UI |
| `hudson-bay` | `#3F5266` | Deep navy — primary brand color, header/footer, hero |
| `gold` (accent) | `#C7A05E` | Pulled from the logo — borders, dividers, button fills, decorative/`aria-hidden` motifs, and hover accents only. Never the color of static readable text. Used sparingly, never as a fill for large areas |
| `ink` | `#1A1F26` | Near-black for body text on light backgrounds |
| `paper` | `#F7F6F3` | Warm off-white for light-section backgrounds (avoids stark `#FFFFFF`) |

The gold value was brightened slightly from the `#B8955A` shown during
brainstorming (`#C7A05E`) after a contrast check during implementation
planning showed `#B8955A` fell short of WCAG AA's 3:1 non-text threshold
against both `hudson-bay` and `paper`. Static eyebrow labels and links use
`hudson-bay` (on light backgrounds) or `sidewalk` (on dark backgrounds)
instead of gold text; gold itself is reserved for borders, button fills
(paired with `ink` text), decorative motifs, and hover accents. See the
implementation plan's Global Constraints for the exact rule.

The gold accent was a deliberate addition beyond the client's original three
colors, approved during design review — three cool grays alone read flat for
interactive elements (buttons, links, highlights).

### Typography

Deliberately avoiding the Playfair Display + Inter combination that has
become the default "AI-generated law firm site" look:

- **Headings/display:** [Fraunces](https://fonts.google.com/specimen/Fraunces)
  — expressive serif with real character (ink-trap detailing), reads
  distinguished without being a cliché choice.
- **Body/UI:** [Public Sans](https://fonts.google.com/specimen/Public+Sans) —
  clean, professional, unfussy.
- **Eyebrow/labels:** Public Sans, small-caps treatment, letter-spaced, set in
  gold.
- Loaded via `next/font` (self-hosted, no layout shift, no external font-CDN
  request).

### Motion & texture principles

- No stock-photo hero, no gradient blobs, no glassmorphism cards, no
  rounded-pill buttons everywhere.
- Sharp/minimal corner radii (2–4px); thin 1px hairline borders instead of
  drop shadows for separation.
- A subtle version of the crest's linework (thin gold rule, corner flourish)
  reused as a recurring motif across sections, tying back to the logo.
- Generous whitespace/padding — the approved "Heritage Editorial" direction
  depends on restraint, not density.

## Approved Visual Direction: "Heritage Editorial"

Chosen over two alternatives (a modern split-panel layout, and a bold
oversized-type minimal layout) during design review. Full-bleed Hudson Bay
navy hero, serif headline, restrained gold outline CTA (not a filled pill),
minimal top nav. Echoes the crest/shield logo directly rather than
contrasting with it.

## Page Structure & Content Plan

Single scrolling page, in this order:

1. **Header/Nav** — fixed; transparent over the hero, becomes solid Hudson Bay
   on scroll. Small logo mark + wordmark, links to each section below, gold
   outline "Book a Consultation" button anchored to Contact.
2. **Hero** — eyebrow text ("Dual-Qualified Attorney — US & Philippines"),
   large Fraunces headline, one supporting line, outline CTA. Full-bleed
   Hudson Bay background with the crest linework motif in a corner.
3. **Practice Areas** — 7 cards in a responsive grid, in this order:
   1. US Immigration (Philippines → US)
   2. Philippine Immigration (US → Philippines, incl. dual citizenship /
      balikbayan)
   3. Real Estate Law
   4. Criminal Law
   5. Family Law
   6. Business & Corporate Law
   7. Civil Litigation

   Each card: simple line-icon, title, one-sentence description.
4. **Credentials / Bar Admissions** — visually distinct band (Sidewalk Gray /
   paper background) presented as a short honors-style list (not a generic
   "why choose us" icon grid): dual-bar admission (US state bar + Integrated
   Bar of the Philippines, placeholder names), education, years of practice.
5. **About** — bio placeholder copy plus a monogram/crest treatment in place
   of a photo (no headshot available yet), with a short pull-quote-style
   philosophy line.
6. **FAQ** — accordion, 5–6 placeholder questions covering: the cross-border
   immigration process, what a consultation involves, which country's law
   applies to a given matter, consultation cost expectations, and typical
   case timelines.
7. **Contact** — static info cards only, no form: phone (PH + US
   placeholders), email (mailto link), two office locations (PH + US
   placeholder addresses) with hours.
8. **Footer** — logo mark, condensed nav repeat, standard bar-admission
   disclaimer line, copyright.

All copy is realistic, clearly-structured placeholder text (not lorem ipsum),
written so real content can be swapped in later via straightforward
find-and-replace.

## Explicitly Out of Scope (v1)

- Additional routed pages (practice-area detail pages, attorney bio page,
  blog) — structure should not preclude these later, but none are built now.
- English/Filipino language toggle — English only for v1.
- Working contact form / email delivery (Formspree, Resend, etc.) — static
  contact info only.
- Real attorney headshot photo — placeholder/monogram treatment instead.

## Accessibility, Responsiveness & QA

- Semantic HTML landmarks (`nav`, `main`, `section` with `aria-label`s),
  keyboard-navigable mobile nav and FAQ accordion.
- WCAG AA contrast checked for text-on-Hudson-Bay and text-on-paper
  combinations. Gold accent reserved for large/bold text or non-text UI
  (never small body text) to avoid AA contrast failures.
- Mobile-first responsive layout: hero stacks vertically, practice-area grid
  collapses to 1–2 columns, nav collapses to a simple menu.
- Verify the live site in an actual browser (desktop + mobile viewport) via
  the preview tool before calling implementation complete — a passing build
  is not sufficient evidence of a working feature.

## Source Material

- Logo: dual-qualified-attorney crest (shield, quail/partridge bird, scales
  of justice, banner ribbons) on navy, provided by client. Saved at
  `public/logo.jpg`.
- Reference sites (style inspiration, not to be copied): cditlaw.com,
  liganuylaw.com, ndvlaw.com, divinalaw.com.
