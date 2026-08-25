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

**Practice areas deliberately exclude immigration and family law.** Neither
appears anywhere in his Philippine practice; his immigration/family exposure
was US paralegal work in a *non-attorney* role. Two tests fail if either
reappears: one in `site.test.ts` over `practiceAreas`, and one in
`StructuredData.test.tsx` over the whole JSON-LD payload. The second exists
because the first was not enough — the JSON-LD description was authored
separately and still advertised both to crawlers long after they were dropped
from the site. It is now derived from `practiceAreas`, so it cannot drift
again. Anything else that restates the practice list should be derived too.
Appellate leads because it is his strongest credential — close to five years
inside the Court of Appeals drafting decisions.

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

**US roles were non-attorney.** He is admitted in Washington State but worked
there as a paralegal. The footer disclaimer says so explicitly. Keep that
distinction; his own document is careful about it.

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
2. **Contact form delivery — decided, blocked on (5).** `mailto:` silently
   does nothing for visitors with no mail client bound, which is common on
   desktop. `Contact` does render the address as selectable text alongside
   the button, so it is a poor experience rather than a dead end.

   The approach is a route handler + Resend. Formspree/Basin were considered
   and ruled out despite being faster to wire up: storing submissions in a
   third-party dashboard is their product, and a prospective client's inquiry
   can carry privileged facts before any conflicts check has happened. Do not
   reverse this on speed grounds.

   Waiting on the custom domain in (5), because Resend needs a verified
   sending domain and `onboarding@resend.dev` lands in spam. Once it exists:
   verify the domain (SPF/DKIM/DMARC), add the route handler, use a honeypot
   plus a per-IP rate limit rather than a CAPTCHA, set `reply_to` to the
   inquirer, and keep the message body out of every log — Vercel function
   logs included, which is where "do not store submissions" usually gets
   broken by accident. Keep the visible address as a fallback. Note this ends
   the "every route is statically prerendered, no API routes" property
   claimed at the top of this file.
3. **Practice-area detail copy needs Atty. Perdices's review.** The expandable
   text describes Philippine procedure — filings, sequence, what needs a
   personal appearance. It is a careful draft, not verified law.
4. **Hero photograph is low-resolution and probably stock.** 1240px wide,
   upscaled 1.68× on a 1440 screen, so it will look soft on a large monitor.
   Wants a ~2400px original, and a commercial licence if it came from a stock
   site or an image search.
5. **`NEXT_PUBLIC_SITE_URL`** should be set on Vercel once a custom domain
   exists. It currently falls back to the Vercel production URL, which is
   correct for now.

Decided but not yet done: the JSON-LD `description` in `StructuredData.tsx`
no longer mentions the Washington admission — the phrase went with the
immigration/family fix when the description became derived. The dual-qualified
framing in the tab title, hero and OG card is confirmed deliberate and stays,
so the schema should match it: add an admission clause as separate copy,
keeping the practice list derived. Deferred to avoid a deploy of its own;
fold it in with the next change.

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
