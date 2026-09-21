# Perdices Law — handoff

Single-page marketing site for the Law Office of Atty. Jose Mari V. Perdices,
a Philippine lawyer in Dumaguete City who is also admitted in Washington State.

- Repo: `https://github.com/abbadipod/perdices-law` (branch `master`)
- Live at `https://perdiceslaw.com` (custom domain, Cloudflare DNS → Vercel).
  `perdices-law.vercel.app` still works too.
- Deploys automatically to Vercel on push to `master`
- Next.js 16 · React 19 · Tailwind · Vitest · TypeScript strict
- **Not** every route is static anymore: `/api/contact` and
  `/.well-known/security.txt` are server-rendered on demand. Everything else
  (including `/opengraph-image`) is still prerendered at build time.

## Running it

Node lives at `C:\Program Files\nodejs` but is **not on PATH** in this
environment. Prefix commands that need it:

```bash
export PATH="$PATH:/c/Program Files/nodejs"
```

```bash
npm run dev      # next dev (Turbopack, default in 16)
npm test         # 62 tests
npm run lint     # eslint . — `next lint` was removed in Next 16
npm run build
npm run og:hero  # regenerate public/hero-og.jpg after public/hero.webp changes
```

`.claude/launch.json` scopes the Browser-preview tool's `preview_start` to
this project. Without it, `preview_start` was resolving "perdices-law" to an
unrelated sibling project's dev server via the parent directory's own
launch.json — if that happens again, just run `npm run dev` directly in the
background and `navigate` the browser pane to `http://localhost:3000`
rather than fighting the name lookup. The dev server has also just died
silently mid-session more than once (no crash log, `curl localhost:3000`
starts failing) — if the browser pane can't reach it, check with `curl` and
restart it rather than assuming the code broke.

## Layout

```
src/app/           layout, page, robots.ts, sitemap.ts, icon.svg, opengraph-image.tsx
src/app/api/contact/route.ts          POST handler, sends via Resend
src/app/.well-known/security.txt/     RFC 9116 vulnerability-disclosure file
src/components/    Nav Hero About Credentials PracticeAreas FAQ Contact Footer
                   + Reveal Eyebrow CrestMark PracticeIcons StructuredData
src/content/site.ts   ALL copy and data. Components read from here; nothing is
                      hardcoded in JSX except section headings.
src/lib/site-url.ts   base URL resolution for metadata/robots/sitemap — resolves
                      to https://perdiceslaw.com in production via
                      NEXT_PUBLIC_SITE_URL (set on Vercel)
public/            crest.png  hero.webp  hero-og.jpg  portrait.jpg
scripts/generate-og-hero.mjs   regenerates hero-og.jpg (npm run og:hero)
docs/design-handoff-homepage-redesign/   the original design brief + prototype
```

Page order: Hero → About → Credentials → PracticeAreas → FAQ → Contact →
Footer.

## Live infrastructure (all set up, working)

- **Domain**: `perdiceslaw.com` registered on Cloudflare. Two CNAME records
  (`@` and `www`, both **DNS only** — not proxied, so Vercel's own TLS/edge
  handles it) point at Vercel. `perdiceslaw.com` 308-redirects to
  `www.perdiceslaw.com`, which is the canonical host.
- **Email sending**: contact form POSTs to `/api/contact`, which sends via
  Resend from `send.perdiceslaw.com` — a **subdomain**, not the apex, chosen
  deliberately (see decisions below). `RESEND_API_KEY` and
  `NEXT_PUBLIC_SITE_URL=https://perdiceslaw.com` are set as Vercel env vars.
  Resend has its own SPF/DKIM/DMARC TXT + CNAME records in Cloudflare for
  `send.perdiceslaw.com`, separate from the two Vercel records above.
- **Cloudflare security**: Bot Fight Mode and AI Labyrinth are both enabled
  (per the client, from Cloudflare's own configuration suggestions). Bot
  Fight Mode occasionally challenges legitimate automated traffic (link
  crawlers, uptime monitors) alongside bad bots — if something odd shows up
  fetching the site, check Security → Settings → Bot traffic before assuming
  a code bug.
- **Google Business Profile / Search Console**: explicitly **not** set up
  yet — client said "those will be updated later." Both need the client's
  own Google login; walk through it with them in the browser (same pattern
  used for the Vercel/Cloudflare/Resend setup) rather than trying to do it
  headless.

## Decisions that look arbitrary but are not

Please read before "fixing" any of these — each was measured, and several
have tests guarding them.

**Content is real, not placeholder.** Bar numbers, admission years, degrees,
address, email all come from his résumé and a `Content for Website.docx` he
supplied, or from direct client instruction in this chat. Earlier drafts
contained invented credentials; those are gone. Do not reintroduce
plausible-sounding detail — if a fact isn't sourced from his documents or a
direct instruction, it does not belong on the site. The office phone number
was removed at the client's request (contact is email + the form only now);
don't re-add one because "a law firm should have a phone number" — ask first.
The address is "Unit 202, Bricktown Center, corner National Highway, Aldecoa
Drive, Daro, Dumaguete City, Negros Oriental" — it went through two rounds of
correction, so if it looks incomplete or oddly phrased, confirm with the
client before "tidying" it.

**Hero headline says "dual-qualified attorney" — this is a deliberate
reversal, not drift.** An earlier pass (see the "6+ Years" entry below, from
before this file's last refresh) explicitly *removed* "Dual-Qualified
Attorney — US & Philippines" framing because a reviewer tied it to the Code
of Professional Responsibility and Accountability's truthful-advertising
requirement — it read as if the firm practises US law, which it doesn't. The
client was shown that exact history and explicitly asked to reinstate
"dual-qualified" anyway ("Just go with dual-qualified attorney"). The
current headline, OG image, and structured data all say some version of
"Practical legal solutions from a dual-qualified attorney" as a result. If
this surfaces again as a concern, it's an informed, client-confirmed choice —
don't silently revert it, but do mention the history if asked. What's still
true from the original correction: `areaServed` in `StructuredData.tsx`
still deliberately excludes "United States" (areaServed means where the
*service* — Philippine law — applies, not where clients happen to live), and
the About/footer copy about his US experience being paralegal work, not
attorney practice, is unchanged. Keep that distinction intact even though
the headline itself now leans into "dual-qualified."

**"6+ Years, Philippine practice," not "15+ Years in practice."** A reviewer
checked the site against his actual employment dates and flagged that the
site conflated three different things: his 2006 Philippine bar admission,
his roughly six years of *active* Philippine practice, and his separate
years of US paralegal (not attorney) work. `credentialStats` in `site.ts`
feeds both the hero and Credentials from one array. Also corrected at the
time: the Court of Appeals tenure in the Appellate Litigation detail (his
actual dates are 2008–2010); "non-attorney roles" reworded to "paralegal and
legal-support roles."

**Practice areas deliberately exclude immigration and family law.** Neither
appears anywhere in his Philippine practice; his immigration/family exposure
was US paralegal work in a *non-attorney* role. Two tests fail if either
reappears: one in `site.test.ts` over `practiceAreas`, and one in
`StructuredData.test.tsx` over the whole JSON-LD payload, which is derived
from `practiceAreas` so it can't drift independently. Appellate leads
because it's his strongest credential — Court Attorney IV at the Court of
Appeals from 2008–2010, drafting decisions.

**Practice cards have no expandable detail anymore.** They used to open to
show `practiceAreas[].detail` (a longer procedural writeup); the client
asked for that removed entirely — cards are now just icon, number, title,
description. `practiceAreas[].detail` is still in `site.ts` and still
validated by `site.test.ts`, but it's unused dead data, kept only in case a
future routed practice-area page wants it (see Outstanding, #2 below — it
still needs Atty. Perdices's review before it's used anywhere).

**FAQ has 4 questions, not 6.** "How do you determine which country's law
applies" and "How long does a typical case take" were removed at the
client's request. If re-adding FAQ items, update the count assertion in
`site.test.ts`.

**Footer has no legal disclaimer paragraph.** It used to carry a
practicing-capacity/legal-advice disclaimer; the client asked for it removed
entirely. Don't re-add one unasked — if a lawyer-advertising disclaimer is
needed again, that's the client's or a legal reviewer's call, not a default
to restore.

**Contact form architecture (Resend, not `mailto:`, not Formspree/Basin).**
`Contact.tsx` POSTs JSON to `src/app/api/contact/route.ts`, which sends via
Resend, with a hidden honeypot field and a 5/hour per-IP rate limit
(in-memory — resets per serverless instance, a known limitation of not
having a database, but still stops a single abusive client) instead of a
CAPTCHA. `replyTo` is the inquirer's own address; only `error.message` is
ever logged on failure, never the message body. Formspree/Basin were
considered and ruled out: storing submissions in a third-party dashboard is
their product, and a prospective client's inquiry can carry privileged facts
before any conflicts check has happened.

**Resend sends from `send.perdiceslaw.com`, a subdomain — not
`perdiceslaw.com` itself.** This was a deliberate default, not a limitation:
isolating the transactional-sending domain means a deliverability problem
(spam complaints, a leaked API key) can't taint the domain the whole site's
credibility rides on, and it means Resend's SPF record never has to be
merged with a future real mailbox provider's (Google Workspace, etc.) SPF on
the same apex domain — those can only coexist by careful merging, not by
just adding a second TXT record. `RESEND_FROM_EMAIL` env var can override
the default `intake@send.perdiceslaw.com` if the client wants a different
mailbox name later, but any override must stay on a domain actually verified
in Resend.

**OG image assets are inlined as base64 data URIs, not fetched over HTTP —
this bit us once already.** `opengraph-image.tsx` originally fetched
`crest.png`/`hero-og.jpg` via `${getSiteUrl()}/...`. That worked for
`crest.png` (it already existed in a prior, already-live deployment) but
silently failed for `hero-og.jpg` the moment it was added: fetching your own
domain *during a build* hits whichever deployment is *currently* live, not
the one being built, so a brand-new file 404s against the old deployment.
Satori drops a failed image with no build error — it shipped to production
missing a whole visual layer before anyone noticed, and only checking the
*live* site (not just the local build) caught it. `assetDataUri()` reads
both files straight off disk instead, which has no such timing dependency.
Lesson for any future OG/social-image asset: read from disk, don't fetch
your own domain during a build. `hero-og.jpg` is a JPEG, not the site's own
`hero.webp` — Satori's image decoder can't handle WebP at all; regenerate it
with `npm run og:hero` if `hero.webp` ever changes.

**Nav logo/crest/links scale up on wide screens via `clamp()`, not a fixed
size.** The hero headline grows with viewport width
(`clamp(40px,5.6vw,82px)`), but the nav was flat pixel sizes in a
`max-w-[1200px]` container — on a wide monitor the nav read as shrinking
next to an increasingly large hero. Nav container widened to
`max-w-[1440px]`; logo text, crest icon (`CrestMark`'s `size` prop now
accepts a CSS length string, not just a number), and links use `clamp()` so
they scale between `lg` and very wide screens, bottoming out at their
original fixed values below `lg` — laptop/tablet is visually unchanged.

**About's two-column text split moved from `md` to `lg`.** The outer
photo/text grid switched to side-by-side at `md` (768px), but the inner
two-column text split was independently set to `sm` (640px) — both active
at once at exactly 768px squeezed the text (already narrowed by the 300px
photo column) into two ~156px sub-columns that wrapped almost every word.
Found via a full breakpoint audit (320–1920px), not reported by the client.
Moved the inner split to `lg` (1024px) so text stays one column until
there's enough width per column.

**Hero CTA is a solid filled gold button, not an outline.** Was
`border-gold` with transparent fill and small (11px) text; client found it
underwhelming. Now filled `bg-gold` by default, darkening to `gold-deep` on
hover (the same colour pairing the button already used in reverse), bigger
padding, and a drop shadow to lift it off the photo. The nav's own "Book a
consultation" stays an outline button on purpose, so the hero one still
reads as the page's primary action.

**Hero subheading is `text-paper` with a text-shadow, not `text-sidewalk`.**
The muted light-gray lost contrast against busier parts of the hero photo
(wood grain, brass chain) with no shadow to lift it. Client flagged it
directly from a photo of the live site.

**The hero previews Credentials' three stat figures, not new content.**
Uses `credentialStats` from `site.ts` directly — the identical array
Credentials renders lower on the page. `Hero.test.tsx` asserts every figure
and label renders, so the two can't drift. Laid out as
`grid-cols-1 sm:grid-cols-3`, matching Credentials' own breakpoint, rather
than a divided flex row (a flex-wrap row with `divide-x` leaves a stray
border on whichever stat wraps alone once three no longer fit one row).

**`gold` (#C7A05E) fails contrast as small text on light surfaces** (2.25–2.44
on paper/white). So:
- eyebrow labels are `hudson-bay`, not gold — gold lives in the *rule* beneath
- practice card index numerals are `hudson-bay/80` (4.75:1)
- the focus ring is a two-tone light-inside-dark ring, because no single brand
  colour clears 3:1 on all five surfaces (see `globals.css`)
- the hero CTA's gold *fill* is fine (it's not gold-on-light text; it's dark
  ink text on a gold background, the reverse pairing, which passes)

**`Credentials` sits between About and PracticeAreas as the page's dark
beat.** Those two are both `bg-sand`; adjacent they ran unbroken — a third of
the page reading as one block. No new surface was introduced when this was
fixed, so the contrast work above didn't need re-auditing.

**`Reveal` renders visible and hides itself on mount.** Required so a JS
failure can't blank the page. Framer's `whileInView` puts `opacity:0` in the
server HTML, which is why `Reveal` is plain React + CSS transitions and
framer-motion is not a dependency.

**Practice grid: `items-start` always, `md:min-h-[286px]` per card, no
`auto-rows-fr`.** `auto-rows-fr` equalises every row in the whole grid, not
just the row a card sits in — this predates the cards losing their expand
behavior entirely, but the fixed-height approach is still why the grid looks
uniform without needing `auto-rows-fr`. `minmax(min(300px,100%),1fr)` — a
bare `300px` overflows the page below ~356px.

**`jsdom` never loads the compiled Tailwind stylesheet** — tests that care
about visual state assert `aria-hidden`/attributes directly rather than
`toBeVisible()`. `ResizeObserver` and `IntersectionObserver` both need mocks
in `vitest.setup.tsx`.

**Hero `object-position` is a responsive pair** (`66%` below `lg`, `100%`
above). The photo is composed right of centre — detail centroid at 62.9% —
and crop headroom is ~25% at desktop but 78% on a phone, so one value can't
centre it at both.

**ESLint is pinned to 9.x, not latest.** `eslint-config-next@16` needs `>=9`,
but ESLint 10 breaks its bundled parser (`scopeManager.addGlobals is not a
function`).

## Outstanding

Blocked on the client:

1. **Google Business Profile / Search Console** — not set up. This matters
   more for "Dumaguete lawyer"-type search ranking than any on-page SEO;
   client said it'll happen later. Needs the client's own Google login.
2. **Practice-area detail copy needs Atty. Perdices's review before it's
   used anywhere.** `practiceAreas[].detail` in `site.ts` describes
   Philippine procedure — filings, sequence, what needs a personal
   appearance — and is a careful draft, not verified law. Currently unused
   (the expandable UI it powered was removed), kept for a possible future
   routed practice-area page.
3. **Hero photograph is low-resolution and probably stock.** 1240px wide,
   upscaled on a large screen, so it looks soft on a big monitor. Wants a
   ~2400px original, and a commercial licence if it came from a stock site.
   Remember to run `npm run og:hero` to regenerate `hero-og.jpg` if this is
   ever replaced.
4. **Office hours** — not in any source document. Deliberately omitted
   rather than invented; `Contact` and the JSON-LD skip them when absent.

Resolved since the last version of this file (kept here so nobody re-opens
them as if they were still open): custom domain, contact form email
delivery, `NEXT_PUBLIC_SITE_URL`, and security.txt/Bot Fight Mode/AI
Labyrinth are all live — see "Live infrastructure" above.

Optional, unstarted: analytics, routed practice-area pages, a Filipino
language toggle.

## Verification habits that worked

The browser preview pane frequently refuses to composite, so screenshots
fail or show stale/cropped content — this happened again this session (a
mobile-menu screenshot showed content cropped at the wrong width while DOM
measurements confirmed the page was actually fine). Measuring the DOM is
more reliable, and checking the *live* site (not just a local build) is not
optional for anything involving the site's own domain — see the OG-image
data-URI entry above, where the local build and even a production `next
build` both looked correct and it still shipped broken.

- contrast: composite `rgba` colours over their real backdrop before measuring;
  a naive DOM walk reports the fixed nav as failing when it sits over the hero
- tap targets: hit-test with `elementFromPoint`, since `::after` overlays
  enlarge targets invisibly to `getBoundingClientRect`
- content accuracy: diff the rendered HTML against a list of required facts and
  banned former-placeholders
- responsive: sweep 320 / 375 / 414 / 640 / 768 / 1024 / 1280 / 1440 / 1920
  and assert `scrollWidth - clientWidth === 0` — the About two-column bug was
  only visible in a narrow band around 768px, not at the usual round numbers
- self-referential builds: anything that fetches the site's own domain during
  its own build (OG images, anything using `getSiteUrl()` for a fetch rather
  than just a string) should read from disk instead — verify on the *live*
  domain after deploying, not just a local `next build`
- CSS `:hover` can get stuck "on" in the browser pane's automation session
  after a synthetic hover — if a computed style looks wrong, reload the page
  before concluding it's a real bug

DOM measurement has one gap of its own: the pane's `document.hidden` reads
`true` even when fronted, which appears to stop the paint/compositor loop CSS
*transitions* depend on. A non-transitioned style change resolves correctly
and instantly regardless; a transitioned one reads stuck at its starting
value via `getComputedStyle` no matter how long you wait. Static end states
are still trustworthy — only the animated middle of a transition is
affected.

`git log` messages carry the reasoning for most changes and are worth reading
before reversing something.
