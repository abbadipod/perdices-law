# Perdices Law — handoff

Single-page marketing site for the Law Office of Atty. Jose Mari V. Perdices,
a Philippine lawyer in Dumaguete City who is also admitted in Washington State.

- Repo: `https://github.com/abbadipod/perdices-law` (branch `master`)
- Deploys automatically to Vercel on push to `master`
- Next.js 16 · React 19 · Tailwind · Vitest · TypeScript strict
- Every route is statically prerendered. No API routes, no database, no auth.

## Running it

Node lives at `C:\Program Files\nodejs` but is **not on PATH** in this
environment. Prefix commands that need it:

```bash
export PATH="$PATH:/c/Program Files/nodejs"
```

```bash
npm run dev      # next dev (Turbopack, default in 16)
npm test         # 56 tests
npm run lint     # eslint . — `next lint` was removed in Next 16
npm run build
```

`.claude/launch.json` scopes the Browser-preview tool's `preview_start` to
this project. Without it, `preview_start` was resolving "perdices-law" to an
unrelated sibling project's dev server via the parent directory's own
launch.json — if that happens again, just run `npm run dev` directly in the
background and `navigate` the browser pane to `http://localhost:3000`
rather than fighting the name lookup.

## Layout

```
src/app/           layout, page, robots.ts, sitemap.ts, icon.svg, opengraph-image.tsx
src/components/    Nav Hero About Credentials PracticeAreas FAQ Contact Footer
                   + Reveal Eyebrow CrestMark PracticeIcons StructuredData
src/content/site.ts   ALL copy and data. Components read from here; nothing is
                      hardcoded in JSX except section headings.
src/lib/site-url.ts   base URL resolution for metadata/robots/sitemap
public/            crest.png  hero.webp  portrait.jpg
docs/design-handoff-homepage-redesign/   the original design brief + prototype
```

Page order: Hero → About → Credentials → PracticeAreas → FAQ → Contact →
Footer.

## Decisions that look arbitrary but are not

Please read before "fixing" any of these — each was measured, and several
have tests guarding them.

**Content is real, not placeholder.** Bar numbers, admission years, degrees,
address, phone, email all come from his résumé and a `Content for Website.docx`
he supplied. Earlier drafts contained invented credentials; those are gone.
Do not reintroduce plausible-sounding detail — if a fact is not in his
documents, it does not belong on the site.

**"6+ Years, Philippine practice," not "15+ Years in practice."** A reviewer
checked the site against his actual employment dates and flagged that the
site conflated three different things: his 2006 Philippine bar admission,
his roughly six years of *active* Philippine practice, and his separate
years of US paralegal (not attorney) work — the combination read as if he'd
practised as an attorney for 15+ years. `credentialStats` in `site.ts` feeds
both the hero and Credentials from one array, so fixing the figure there
fixed both places it appeared. Also corrected: the "close to five years"
Court of Appeals claim in the Appellate Litigation detail (his actual dates
are 2008–2010, about 21 months); "non-attorney roles" reworded to "paralegal
and legal-support roles" in About and the footer, since it's more specific
about what he actually did rather than reading as a disclaimer; the page
title, meta description, and OG card dropped "Dual-Qualified Attorney — US &
Philippines" for the same reason the hero headline changed — it centred US
practice the firm doesn't offer. The reviewer tied this to the Code of
Professional Responsibility and Accountability's requirement that
statements about a lawyer's services and qualifications be truthful and not
misleading — treat this class of correction as accuracy, not a copy
preference, if it comes up again.

**About's second column has no heading, and its top edge sits 34px above
the "About" column next to it.** Per the client: dropped the "Approach"
subheading and the "He is fluent in English, Tagalog, and Cebuano." line
(the fact stays — it's still in the Credentials "Languages" entry, just not
duplicated in prose). Nothing rebalances the column now that it has no
heading pushing its first paragraph down — measured, not eyeballed, at
1280px. Flagged to the client rather than fixed unasked; if it needs fixing,
either drop "About" too or pad the second column to match.

**Practice areas deliberately exclude immigration and family law.** Neither
appears anywhere in his Philippine practice; his immigration/family exposure
was US paralegal work in a *non-attorney* role. Two tests fail if either
reappears: one in `site.test.ts` over `practiceAreas`, and one in
`StructuredData.test.tsx` over the whole JSON-LD payload. The second exists
because the first was not enough — the JSON-LD description was authored
separately and still advertised both to crawlers long after they were dropped
from the site. It is now derived from `practiceAreas`, so it cannot drift
again. Anything else that restates the practice list should be derived too.
Appellate leads because it is his strongest credential — Court Attorney IV
at the Court of Appeals from 2008–2010, drafting decisions.

**The hero previews Credentials' three stat figures, not new content.**
A trust strip sits under the “Book a consultation” button, using
`credentialStats` from `site.ts` directly — the identical array Credentials
renders lower on the page, not a re-authored copy. `Hero.test.tsx` asserts
every figure and label from `credentialStats` renders, so the two cannot
drift the way the JSON-LD description once did. Laid out as
`grid-cols-1 sm:grid-cols-3`, matching Credentials' own stack-below-`sm`
breakpoint, rather than a divided flex row: a flex-wrap row with
`divide-x` leaves a stray border on whichever stat wraps onto its own line
once three items no longer fit one row — measured at 320–414px, fixed by
switching to grid before it shipped.

**Nav order matches page order.** `navLinks` in `site.ts` used to read
Practice, Credentials, About, FAQ, Contact — Credentials sat between two
items it doesn't sit between on the page (Hero → About → Credentials →
Practice Areas → FAQ → Contact). Reordered to About, Credentials, Practice,
FAQ, Contact. `Nav.test.tsx` and `Footer.test.tsx` were already order-agnostic
(`.forEach`, not a literal array); only the exact-array assertion in
`site.test.ts` needed updating.

**`gold` (#C7A05E) fails contrast as small text on light surfaces** (2.25–2.44
on paper/white). So:
- eyebrow labels are `hudson-bay`, not gold — gold lives in the *rule* beneath
- practice card index numerals are `hudson-bay/80` (4.75:1)
- the `+` state markers use `gold-deep` (#A67C2E), which clears 3:1
- the focus ring is a two-tone light-inside-dark ring, because no single brand
  colour clears 3:1 on all five surfaces (see `globals.css`)

**`Credentials` sits between About and PracticeAreas as the page’s dark
beat.** Those two are both `bg-sand`; adjacent they ran 1723px unbroken — a
third of the page reading as one block. A `PullQuote` section (“Two legal
systems. One point of contact.”) used to do the splitting, but the firm does
not practise US law, so the claim was dropped and the existing dark section
took over the job. No new surface was introduced, so none of the measured
contrast work above needed re-auditing. Verified at 1440: no two adjacent
sections share a background, longest single-surface run 1119px. It also reads
better here — the bio flows into the admissions that back it.

**`Reveal` renders visible and hides itself on mount.** Required by the design
brief so a JS failure cannot blank the page. Framer's `whileInView` cannot do
this — it puts `opacity:0` in the server HTML — which is why `Reveal` is plain
React + CSS transitions and framer-motion is not a dependency.

**Practice grid: `items-start` always, `md:min-h-[286px]` per card, no
`auto-rows-fr`.** Used to swap `md:auto-rows-fr` (closed) for `items-start`
(any card open) — `auto-rows-fr` equalises every row in the *whole* grid
to the tallest one, not just the row a card sits in, so removing it the
moment anything opened reset every other row's height too. Measured:
opening card one shrank cards four, five, and six as well, though nothing
about them had changed. `md:min-h-[286px]` (the natural height of the
tallest closed card, Criminal Law & Preliminary Investigation) gets the
same "every closed card matches" look without the grid needing to
coordinate row heights across cards that aren't related to whichever one
is open — so `items-start` can just stay on permanently and there's
nothing left to toggle. `PracticeAreas.test.tsx` asserts the grid's
`className` is identical whether a card is open or closed, so the old
conditional class can't come back silently.
`minmax(min(300px,100%),1fr)` — a bare `300px` overflows the page below ~356px.

**Practice card detail panel animates via a JS-measured `max-height`, not
the `hidden` attribute.** `hidden` maps to `display:none`, which can't be
transitioned — opening used to be an instant snap with no animation at
all. Each card's real content height is measured off its own
`scrollHeight` (`useLayoutEffect`, re-measured on `ResizeObserver` so a
card left open while its text rewraps to more or fewer lines doesn't end
up clipped), and that pixel value is what `max-height` transitions
between — so short and long detail text both animate at a speed
proportional to their own length rather than a guessed max-height every
card shares. `aria-hidden` on the panel carries the accessibility state
`hidden` used to.

A `grid-template-rows: 0fr → 1fr` version was tried first, since it
needs no JS measurement at all. It looked broken in the Browser preview
pane — the row stayed stuck at `0px` even after the class correctly
switched to `grid-rows-[1fr]` — so it shipped as a JS-measured
`max-height` instead. Turned out the pane itself was the problem, not
the technique: `document.hidden` reads `true` there even when fronted,
and a plain non-transitioned style change resolves instantly and
correctly while *any* transitioned one (grid-rows, max-height, even a
bare `opacity` fade tested in isolation) reads stuck at its starting
value forever, confirming the pane doesn't run the paint/compositor
loop transitions depend on rather than either CSS approach being
broken. Kept the `max-height` version anyway — the pane's unreliability
here means the original `grid-rows` approach was never actually
disproven either, but the measured version needs no fr-on-intrinsic-
height resolution and is what most production accordion libraries do
regardless, so there was no reason to go back and re-risk it. If you're
verifying an animation and the Browser pane's `document.hidden` is
`true`, don't trust a stuck `getComputedStyle` reading as a bug — check
in a real, foregrounded browser instead.

`jsdom` never loads the compiled Tailwind stylesheet, so
`PracticeAreas.test.tsx` asserts `aria-hidden` directly rather than
`toBeVisible()` — the old test only worked because `hidden` is a native
HTML attribute jsdom understands intrinsically, not because of anything
Tailwind-generated. `ResizeObserver` needed a mock added to
`vitest.setup.tsx`, matching the existing `IntersectionObserverMock`.

**Hero `object-position` is a responsive pair** (`66%` below `lg`, `100%`
above). The photo is composed right of centre — detail centroid at 62.9% —
and crop headroom is ~25% at desktop but 78% on a phone, so one value cannot
centre it at both.

**ESLint is pinned to 9.x, not latest.** `eslint-config-next@16` needs `>=9`,
but ESLint 10 breaks its bundled parser (`scopeManager.addGlobals is not a
function`).

**The contact form hands off to `mailto:` on purpose.** There is no backend. A
route handler without an email provider would report success and drop
inquiries, which is worse than the handoff.

## Outstanding

Blocked on the client:

1. **Office hours** — not in any source document. Deliberately omitted rather
   than invented; `Contact` and the JSON-LD skip them when absent.
2. **Contact form delivery — implemented, blocked on domain + env vars.**
   `Contact` now POSTs to `src/app/api/contact/route.ts`, which sends via
   Resend to `contactInfo.email` (`atty.josemari.perdices@gmail.com`), with a
   honeypot field and a per-IP rate limit (5/hour, in-memory — resets per
   serverless instance, which is a known limitation of not having a database,
   but still stops a single abusive client) rather than a CAPTCHA. `replyTo`
   is set to the inquirer's address, and only `error.message` is ever logged
   on failure — never the message body. This ends the "every route is
   statically prerendered, no API routes" property claimed at the top of this
   file; `/api/contact` is server-rendered on demand.

   Formspree/Basin were considered and ruled out despite being faster to wire
   up: storing submissions in a third-party dashboard is their product, and a
   prospective client's inquiry can carry privileged facts before any
   conflicts check has happened. Do not reverse this on speed grounds.

   The client bought `perdiceslaw.com` on Cloudflare (2026-09-20), which
   unblocks the piece this was waiting on. Still needed before this actually
   sends mail:
   - Attach the domain in Vercel (Project Settings → Domains) and point its
     DNS at Vercel from Cloudflare (Vercel's domain page gives the exact
     A/CNAME records once added — set them to DNS-only in Cloudflare, not
     proxied, so Vercel's own TLS/edge handles the domain instead of
     Cloudflare's proxy fighting it).
   - Verify `perdiceslaw.com` as a sending domain in Resend (the client
     already has a Resend account from another project) — this adds its own
     SPF/DKIM/DMARC records in Cloudflare, separate from the Vercel ones.
   - Set `RESEND_API_KEY` (required) and `RESEND_FROM_EMAIL` (optional,
     defaults to `Perdices Law Website <intake@perdiceslaw.com>` — must be
     `@perdiceslaw.com` once verified) as Vercel env vars, and set
     `NEXT_PUBLIC_SITE_URL=https://perdiceslaw.com` per (5) below.
   Until the domain is verified with Resend, the route fails closed (500,
   "This form is temporarily unavailable") rather than silently dropping
   submissions — confirmed locally with no `RESEND_API_KEY` set. Keep the
   visible address as a fallback regardless.
3. **Practice-area detail copy needs Atty. Perdices's review before it's used
   anywhere.** `practiceAreas[].detail` in `site.ts` describes Philippine
   procedure — filings, sequence, what needs a personal appearance — and is a
   careful draft, not verified law. It used to power an expandable "what this
   covers" panel on each practice card; that UI was removed at the client's
   request, so the field is currently unused dead data, kept only because a
   future routed practice-area page (see Optional, below) would want it. One
   factual error a reviewer caught while it was still live (the Appellate
   Litigation entry's Court of Appeals tenure) is already fixed — see the
   "6+ Years" decision above — but that pass covered years-in-practice
   framing specifically, not the procedural accuracy of the other five
   entries.
4. **Hero photograph is low-resolution and probably stock.** 1240px wide,
   upscaled 1.68× on a 1440 screen, so it will look soft on a large monitor.
   Wants a ~2400px original, and a commercial licence if it came from a stock
   site or an image search.
5. **`NEXT_PUBLIC_SITE_URL`** should be set to `https://perdiceslaw.com` on
   Vercel once the domain in (2) is attached. It currently falls back to the
   Vercel production URL, which is correct until then.

Optional, unstarted: analytics, routed practice-area pages, a Filipino
language toggle.

## Verification habits that worked

The browser preview pane frequently refuses to composite, so screenshots fail.
Measuring the DOM is more reliable anyway and caught several things a
screenshot would have hidden:

- contrast: composite `rgba` colours over their real backdrop before measuring;
  a naive DOM walk reports the fixed nav as failing when it sits over the hero
- tap targets: hit-test with `elementFromPoint`, since `::after` overlays
  enlarge targets invisibly to `getBoundingClientRect`
- content accuracy: diff the rendered HTML against a list of required facts and
  banned former-placeholders
- responsive: sweep 320 / 375 / 414 / 768 / 1024 / 1440 / 1920 and assert
  `scrollWidth - clientWidth === 0`

DOM measurement has one gap of its own: the pane's `document.hidden` reads
`true` even when fronted, which appears to stop the paint/compositor loop
CSS *transitions* depend on. A non-transitioned style change resolves
correctly and instantly regardless; a transitioned one (tested: max-height,
grid-template-rows, even a bare opacity fade in isolation) reads stuck at
its starting value via `getComputedStyle` no matter how long you wait.
Static end states are still trustworthy — only the animated middle of a
transition is affected. Don't diagnose an animation as broken from a
stuck reading here; confirm in a real, foregrounded browser first. This
cost real time once already: see the practice-card detail panel entry
above.

`git log` messages carry the reasoning for most changes and are worth reading
before reversing something.
