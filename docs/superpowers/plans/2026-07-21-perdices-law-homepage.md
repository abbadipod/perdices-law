# Perdices Law Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Perdices Law single-page marketing site (Next.js/TypeScript/Tailwind) per the approved design spec.

**Architecture:** A single Next.js App Router page (`/`) composed of independent, individually-tested section components (`Nav`, `Hero`, `PracticeAreas`, `Credentials`, `About`, `FAQ`, `Contact`, `Footer`), driven by one shared content-data module and a shared `Reveal` scroll-fade wrapper. Static/SSG output, no backend.

**Tech Stack:** Next.js 14 (App Router) + TypeScript, Tailwind CSS, Framer Motion, Vitest + React Testing Library for component tests.

**Design spec:** `docs/superpowers/specs/2026-07-21-perdices-law-homepage-design.md`

## Global Constraints

- Node.js 18.18+ required (Next.js 14 floor).
- Color tokens must match these hex values exactly: `sidewalk` `#CBCED0`, `comet` `#97A2AE`, `hudson-bay` `#3F5266`, `gold` `#C7A05E`, `ink` `#1A1F26`, `paper` `#F7F6F3`. (The gold accent is brightened slightly from the `#B8955A` first shown during brainstorming — `#B8955A` measures below WCAG AA's 3:1 non-text contrast threshold against both `hudson-bay` and `paper`; `#C7A05E` clears 3:1 against `hudson-bay`, which is where the gold-bordered CTA button lives.)
- **Gold contrast rule:** `gold` may only be used for borders/outlines, decorative non-text elements (`aria-hidden` icons/flourishes), and fills paired with `ink` text on top (e.g. a button's hover-filled state). It must never be the color of static, readable body/label text — use `hudson-bay` for that text on light (`paper`/`sidewalk`) backgrounds and `sidewalk` on dark (`hudson-bay`) backgrounds. A `hover:text-gold` accent on top of an already-AA-compliant resting color (e.g. a nav link) is fine, since it's a transient supplementary state, not the default reading color.
- Fonts: display/headings = Fraunces, body/UI = Public Sans, loaded via `next/font/google`. No other typefaces.
- English copy only — no language toggle (v1 scope per spec).
- No working contact form and no backend/API routes — contact section is static info only.
- No additional routed pages beyond `/` (out of scope per spec).
- All placeholder content must be realistic and specific — no lorem ipsum, no bracketed `[TBD]`-style placeholders in shipped copy.
- Logo asset already exists at `public/logo.jpg` — do not re-fetch or regenerate it.
- Every task must leave `npm run build`, `npm run lint`, and `npm test` passing before it is committed.
- Before the final task is considered complete, the site must be manually verified running in an actual browser (desktop and mobile viewport) — a passing build/test suite alone is not sufficient evidence.

---

## Task 1: Project Scaffold & Tooling

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next-env.d.ts`
- Create: `next.config.mjs`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `.eslintrc.json`
- Create: `vitest.config.ts`
- Create: `vitest.setup.tsx`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.tsx`
- Test: `src/app/page.test.tsx`

**Interfaces:**
- Produces: `Home` — default export function component from `src/app/page.tsx`, no props. Later tasks (Task 13) replace its body but keep this export signature.
- Produces: path alias `@/*` → `./src/*` (used by every later task's imports).

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "perdices-law",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "framer-motion": "^11.3.19",
    "next": "^14.2.5",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.8",
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/node": "^20.14.13",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.5",
    "jsdom": "^24.1.1",
    "postcss": "^8.4.40",
    "tailwindcss": "^3.4.7",
    "typescript": "^5.5.4",
    "vitest": "^2.0.5"
  }
}
```

- [ ] **Step 2: Create TypeScript, Next.js, and Tailwind config files**

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`next-env.d.ts`:

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

`next.config.mjs`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {};

export default nextConfig;
```

`postcss.config.js`:

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

`tailwind.config.ts` (minimal for now — color/font tokens added in Task 2):

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

`.eslintrc.json`:

```json
{
  "extends": "next/core-web-vitals"
}
```

- [ ] **Step 3: Create the Vitest config and test setup file**

`vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.tsx"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

`vitest.setup.tsx`:

```tsx
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();
});

class IntersectionObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt ?? ""} />;
  },
}));
```

- [ ] **Step 4: Create the root layout and global stylesheet**

`src/app/layout.tsx`:

```tsx
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

`src/app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  min-height: 100vh;
}
```

- [ ] **Step 5: Install dependencies**

Run: `npm install`
Expected: installs succeed, `node_modules/` and `package-lock.json` are created, no error output.

- [ ] **Step 6: Write the failing smoke test**

`src/app/page.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders the firm name", () => {
    render(<Home />);
    expect(screen.getByText("Perdices Law")).toBeInTheDocument();
  });
});
```

- [ ] **Step 7: Run the test to verify it fails**

Run: `npx vitest run src/app/page.test.tsx`
Expected: FAIL — `Cannot find module './page'` (or similar), because `src/app/page.tsx` does not exist yet.

- [ ] **Step 8: Create the minimal page**

`src/app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main>
      <h1>Perdices Law</h1>
    </main>
  );
}
```

- [ ] **Step 9: Run the test to verify it passes**

Run: `npx vitest run src/app/page.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 10: Verify the production build succeeds**

Run: `npm run build`
Expected: `Compiled successfully`, no type errors.

- [ ] **Step 11: Commit**

```bash
git add package.json tsconfig.json next-env.d.ts next.config.mjs postcss.config.js tailwind.config.ts .eslintrc.json vitest.config.ts vitest.setup.tsx src/app/layout.tsx src/app/globals.css src/app/page.tsx src/app/page.test.tsx package-lock.json
git commit -m "Scaffold Next.js + TypeScript + Tailwind + Vitest project"
```

---

## Task 2: Design Tokens & Global Layout

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/layout.tsx`
- Test: `tailwind.config.test.ts`

**Interfaces:**
- Consumes: nothing new.
- Produces: Tailwind color utilities `bg-sidewalk`/`text-sidewalk`, `bg-comet`/`text-comet`, `bg-hudson-bay`/`text-hudson-bay`, `bg-gold`/`text-gold`/`border-gold`, `bg-ink`/`text-ink`, `bg-paper`/`text-paper`; font utilities `font-display` (Fraunces) and `font-sans` (Public Sans). Every later component task relies on these exact class names.

- [ ] **Step 1: Write the failing color-token test**

`tailwind.config.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import config from "./tailwind.config";

describe("tailwind color tokens", () => {
  it("matches the approved brand palette exactly", () => {
    const colors = (config.theme?.extend as { colors?: Record<string, string> })
      ?.colors;

    expect(colors).toEqual({
      sidewalk: "#CBCED0",
      comet: "#97A2AE",
      "hudson-bay": "#3F5266",
      gold: "#C7A05E",
      ink: "#1A1F26",
      paper: "#F7F6F3",
    });
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run tailwind.config.test.ts`
Expected: FAIL — `colors` is `undefined`, `undefined` does not equal the expected object.

- [ ] **Step 3: Add the color and font tokens to the Tailwind config**

`tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sidewalk: "#CBCED0",
        comet: "#97A2AE",
        "hudson-bay": "#3F5266",
        gold: "#C7A05E",
        ink: "#1A1F26",
        paper: "#F7F6F3",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-public-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run tailwind.config.test.ts`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Wire the fonts and base page styling into the root layout**

`src/app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Perdices Law | Dual-Qualified Attorney — US & Philippines",
  description:
    "The Law Office of Atty. Jose Mari Perdices — practical legal solutions in US and Philippine immigration, real estate, criminal, family, and business law.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${publicSans.variable} font-sans bg-paper text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 6: Verify the production build still succeeds**

Run: `npm run build`
Expected: `Compiled successfully`. (This step requires internet access — `next/font/google` fetches font files at build time.)

- [ ] **Step 7: Commit**

```bash
git add tailwind.config.ts tailwind.config.test.ts src/app/layout.tsx
git commit -m "Add brand color/font design tokens and wire fonts into root layout"
```

---

## Task 3: Site Content Data Module

**Files:**
- Create: `src/content/site.ts`
- Test: `src/content/site.test.ts`

**Interfaces:**
- Produces:
  - `navLinks: { href: string; label: string }[]`
  - `practiceAreas: { title: string; description: string }[]` (7 items, immigration first)
  - `credentials: { label: string; detail: string }[]` (4 items)
  - `faqItems: { question: string; answer: string }[]` (6 items)
  - `contactInfo: { email: string; phones: { label: string; number: string }[]; offices: { city: string; address: string; hours: string }[] }`
- Consumed by: `Nav` (Task 5), `PracticeAreas` (Task 7), `Credentials` (Task 8), `FAQ` (Task 10), `Contact` (Task 11), `Footer` (Task 12).

- [ ] **Step 1: Write the failing content test**

`src/content/site.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { navLinks, practiceAreas, credentials, faqItems, contactInfo } from "./site";

describe("site content", () => {
  it("defines the primary nav links", () => {
    expect(navLinks).toEqual([
      { href: "#practice-areas", label: "Practice" },
      { href: "#credentials", label: "Credentials" },
      { href: "#about", label: "About" },
      { href: "#faq", label: "FAQ" },
      { href: "#contact", label: "Contact" },
    ]);
  });

  it("lists 7 practice areas with immigration first", () => {
    expect(practiceAreas).toHaveLength(7);
    expect(practiceAreas[0].title).toBe("US Immigration (Philippines → US)");
    expect(practiceAreas[1].title).toBe("Philippine Immigration (US → Philippines)");
    practiceAreas.forEach((area) => {
      expect(area.title.length).toBeGreaterThan(0);
      expect(area.description.length).toBeGreaterThan(0);
    });
  });

  it("lists 4 credentials entries", () => {
    expect(credentials).toHaveLength(4);
    credentials.forEach((item) => {
      expect(item.label.length).toBeGreaterThan(0);
      expect(item.detail.length).toBeGreaterThan(0);
    });
  });

  it("lists 6 FAQ items", () => {
    expect(faqItems).toHaveLength(6);
    faqItems.forEach((item) => {
      expect(item.question.length).toBeGreaterThan(0);
      expect(item.answer.length).toBeGreaterThan(0);
    });
  });

  it("defines contact info with 2 phones and 2 offices", () => {
    expect(contactInfo.email).toBe("info@perdiceslaw.com");
    expect(contactInfo.phones).toHaveLength(2);
    expect(contactInfo.offices).toHaveLength(2);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/content/site.test.ts`
Expected: FAIL — `Cannot find module './site'`.

- [ ] **Step 3: Create the content module**

`src/content/site.ts`:

```ts
export const navLinks = [
  { href: "#practice-areas", label: "Practice" },
  { href: "#credentials", label: "Credentials" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export const practiceAreas = [
  {
    title: "US Immigration (Philippines → US)",
    description:
      "Family- and employment-based petitions, visa applications, and adjustment of status for Filipino nationals seeking to live or work in the United States.",
  },
  {
    title: "Philippine Immigration (US → Philippines)",
    description:
      "Dual citizenship (RA 9225), balikbayan and long-term visas, and residency matters for US citizens and Filipino-Americans relocating to the Philippines.",
  },
  {
    title: "Real Estate Law",
    description:
      "Property due diligence, land title verification, and sale or lease agreements for real property located in the Philippines.",
  },
  {
    title: "Criminal Law",
    description:
      "Representation and counsel in criminal proceedings before Philippine courts, from arraignment through trial.",
  },
  {
    title: "Family Law",
    description:
      "Annulment, legal separation, custody, and support matters under Philippine family law.",
  },
  {
    title: "Business & Corporate Law",
    description:
      "Business registration, contracts, and corporate compliance for entities operating in the Philippines.",
  },
  {
    title: "Civil Litigation",
    description:
      "Representation in civil disputes, including contract, property, and collection cases, before Philippine courts.",
  },
];

export const credentials = [
  { label: "United States Bar Admission", detail: "State Bar of California, admitted 2015" },
  { label: "Philippine Bar Admission", detail: "Integrated Bar of the Philippines, admitted 2012" },
  {
    label: "Education",
    detail: "J.D., University of California, Hastings College of the Law; LL.B., University of the Philippines",
  },
  { label: "Years of Practice", detail: "12+ years across both jurisdictions" },
];

export const faqItems = [
  {
    question: "I live in the US but need help with a matter in the Philippines — can you still represent me?",
    answer:
      "Yes. As a dual-qualified attorney, I can advise on and handle Philippine legal matters directly, and coordinate with US counsel when a matter touches both jurisdictions — you don't need to manage two separate lawyers yourself.",
  },
  {
    question: "What does a consultation involve?",
    answer:
      "An initial consultation is a focused conversation about your situation — what's happened, what you're trying to accomplish, and which country's laws and courts are involved — followed by a plain-language explanation of your options and likely next steps.",
  },
  {
    question: "How do you determine which country's law applies to my case?",
    answer:
      "It depends on the subject matter and where the relevant facts, property, or parties are located. Immigration matters are generally governed by the receiving country's law; property, family, and criminal matters are generally governed by Philippine law if the matter arises there. This is one of the first things we sort out together.",
  },
  {
    question: "How much does a consultation cost?",
    answer:
      "Consultation fees are discussed and agreed upon before we begin, based on the nature and complexity of your matter. There are no hidden charges — you'll know the cost before any work starts.",
  },
  {
    question: "How long does a typical case take?",
    answer:
      "Timelines vary widely: immigration petitions can take months to years depending on the visa category and government processing times, while real estate or contract matters often resolve in weeks. You'll get a realistic estimate specific to your case during the consultation.",
  },
  {
    question: "Can I retain you without visiting the office in person?",
    answer:
      "In most cases, yes. Consultations, document review, and case updates can be handled remotely by phone or video call, with in-person appearances arranged only where a court or agency specifically requires it.",
  },
];

export const contactInfo = {
  email: "info@perdiceslaw.com",
  phones: [
    { label: "Philippines Office", number: "+63 917 000 0000" },
    { label: "United States Office", number: "+1 415 000 0000" },
  ],
  offices: [
    {
      city: "Makati City, Philippines",
      address: "Unit 1500, 6750 Ayala Avenue, Makati City, 1226 Metro Manila",
      hours: "Monday–Friday, 9:00 AM–6:00 PM (PHT)",
    },
    {
      city: "San Francisco, United States",
      address: "100 Market Street, Suite 300, San Francisco, CA 94105",
      hours: "Monday–Friday, 9:00 AM–5:00 PM (PT)",
    },
  ],
};
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/content/site.test.ts`
Expected: PASS — 5 tests passed.

- [ ] **Step 5: Commit**

```bash
git add src/content/site.ts src/content/site.test.ts
git commit -m "Add shared site content data module"
```

---

## Task 4: Reveal Scroll-Fade Wrapper

**Files:**
- Create: `src/components/Reveal.tsx`
- Test: `src/components/Reveal.test.tsx`

**Interfaces:**
- Produces: `Reveal({ children, delay? }: { children: React.ReactNode; delay?: number })` — default export from `src/components/Reveal.tsx`. Consumed by `PracticeAreas`, `Credentials`, `About`, `FAQ`, `Contact` (Tasks 7–11) to wrap section content in a scroll-triggered fade/slide-in.

- [ ] **Step 1: Write the failing test**

`src/components/Reveal.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Reveal from "./Reveal";

describe("Reveal", () => {
  it("renders its children", () => {
    render(
      <Reveal>
        <p>Hello world</p>
      </Reveal>
    );
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/Reveal.test.tsx`
Expected: FAIL — `Cannot find module './Reveal'`.

- [ ] **Step 3: Create the component**

`src/components/Reveal.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
}: {
  children: ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/Reveal.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/Reveal.tsx src/components/Reveal.test.tsx
git commit -m "Add Reveal scroll-fade wrapper component"
```

---

## Task 5: Nav Component

**Files:**
- Create: `src/components/Nav.tsx`
- Test: `src/components/Nav.test.tsx`

**Interfaces:**
- Consumes: `navLinks` from `@/content/site`.
- Produces: `Nav()` — default export from `src/components/Nav.tsx`, no props. Renders a `<header role="banner">` fixed nav with logo (linking to `#top`), desktop links, a "BOOK A CONSULTATION" CTA linking to `#contact`, and a mobile menu toggle button. The mobile menu list has `data-testid="mobile-menu"` and is only present in the DOM while open.

- [ ] **Step 1: Write the failing tests**

`src/components/Nav.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { fireEvent } from "@testing-library/react";
import Nav from "./Nav";
import { navLinks } from "@/content/site";

describe("Nav", () => {
  it("renders the brand name and logo", () => {
    render(<Nav />);
    expect(screen.getByText("PERDICES LAW")).toBeInTheDocument();
    expect(screen.getByAltText("Perdices Law crest")).toBeInTheDocument();
  });

  it("renders every nav link", () => {
    render(<Nav />);
    navLinks.forEach((link) => {
      expect(screen.getAllByText(link.label).length).toBeGreaterThan(0);
    });
  });

  it("keeps the mobile menu closed by default", () => {
    render(<Nav />);
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /open menu/i })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  it("opens the mobile menu on click and closes it when a link is chosen", async () => {
    const user = userEvent.setup();
    render(<Nav />);

    await user.click(screen.getByRole("button", { name: /open menu/i }));
    const menu = screen.getByTestId("mobile-menu");
    expect(menu).toBeInTheDocument();

    await user.click(within(menu).getByText(navLinks[0].label));
    expect(screen.queryByTestId("mobile-menu")).not.toBeInTheDocument();
  });

  it("switches to a solid background once the page is scrolled", () => {
    render(<Nav />);
    const header = screen.getByRole("banner");
    expect(header.className).not.toContain("bg-hudson-bay");

    Object.defineProperty(window, "scrollY", { value: 100, writable: true });
    fireEvent.scroll(window);

    expect(header.className).toContain("bg-hudson-bay");
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/components/Nav.test.tsx`
Expected: FAIL — `Cannot find module './Nav'`.

- [ ] **Step 3: Create the component**

`src/components/Nav.tsx`:

```tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { navLinks } from "@/content/site";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-hudson-bay" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
      >
        <a href="#top" className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="Perdices Law crest"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="font-display text-sm tracking-wide text-white">
            PERDICES LAW
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm tracking-wide text-sidewalk hover:text-gold"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="hidden border border-gold px-5 py-2 text-xs tracking-wide text-sidewalk transition-colors hover:bg-gold hover:text-ink md:inline-block"
        >
          BOOK A CONSULTATION
        </a>

        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          className="text-white md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </nav>

      {menuOpen && (
        <ul
          data-testid="mobile-menu"
          className="flex flex-col gap-1 bg-hudson-bay px-6 pb-6 md:hidden"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block py-2 text-sm text-sidewalk hover:text-gold"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="block py-2 text-sm font-semibold text-sidewalk"
              onClick={() => setMenuOpen(false)}
            >
              Book a Consultation
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/Nav.test.tsx`
Expected: PASS — 5 tests passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.tsx src/components/Nav.test.tsx
git commit -m "Add Nav component with mobile menu and scroll-solid background"
```

---

## Task 6: Crest Flourish Motif & Hero Component

**Files:**
- Create: `src/components/CrestFlourish.tsx`
- Test: `src/components/CrestFlourish.test.tsx`
- Create: `src/components/Hero.tsx`
- Test: `src/components/Hero.test.tsx`

**Interfaces:**
- Produces: `CrestFlourish({ className? }: { className?: string })` — default export from `src/components/CrestFlourish.tsx`, a purely decorative (`aria-hidden`) thin-line SVG corner ornament that reuses the crest's linework, colored via `currentColor`. Consumed by `Hero` (this task) and `Contact` (Task 11) to satisfy the spec's "recurring crest motif" requirement.
- Produces: `Hero()` — default export from `src/components/Hero.tsx`, no props. Renders a `<section id="top">` with the approved "Heritage Editorial" hero copy, two `CrestFlourish` corner ornaments, and a CTA link to `#contact`.

- [ ] **Step 1: Write the failing CrestFlourish test**

`src/components/CrestFlourish.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import CrestFlourish from "./CrestFlourish";

describe("CrestFlourish", () => {
  it("renders a decorative, screen-reader-hidden SVG", () => {
    const { container } = render(<CrestFlourish />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("accepts a className for positioning and color", () => {
    const { container } = render(<CrestFlourish className="text-gold" />);
    expect(container.querySelector("svg")).toHaveClass("text-gold");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/CrestFlourish.test.tsx`
Expected: FAIL — `Cannot find module './CrestFlourish'`.

- [ ] **Step 3: Create the CrestFlourish component**

`src/components/CrestFlourish.tsx`:

```tsx
export default function CrestFlourish({
  className = "",
}: {
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={className}
    >
      <path d="M4 44 V12 H36" />
      <path d="M4 26 Q4 4 26 4" />
      <circle cx="4" cy="44" r="2" fill="currentColor" stroke="none" />
    </svg>
  );
}
```

- [ ] **Step 4: Run the CrestFlourish test to verify it passes**

Run: `npx vitest run src/components/CrestFlourish.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Write the failing Hero test**

`src/components/Hero.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "./Hero";

describe("Hero", () => {
  it("renders the headline and CTA", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", {
        name: "Practical legal solutions, across two countries.",
      })
    ).toBeInTheDocument();

    const cta = screen.getByRole("link", { name: /book a consultation/i });
    expect(cta).toHaveAttribute("href", "#contact");
  });

  it("renders the crest flourish motif in both corners", () => {
    const { container } = render(<Hero />);
    expect(container.querySelectorAll("svg").length).toBe(2);
  });
});
```

- [ ] **Step 6: Run the test to verify it fails**

Run: `npx vitest run src/components/Hero.test.tsx`
Expected: FAIL — `Cannot find module './Hero'`.

- [ ] **Step 7: Create the Hero component**

`src/components/Hero.tsx`:

```tsx
import CrestFlourish from "@/components/CrestFlourish";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden bg-hudson-bay px-6 pt-24"
    >
      <CrestFlourish className="pointer-events-none absolute left-6 top-24 h-16 w-16 text-gold/50" />
      <CrestFlourish className="pointer-events-none absolute bottom-6 right-6 h-16 w-16 rotate-180 text-gold/50" />

      <div className="relative mx-auto max-w-3xl">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-sidewalk">
          Dual-Qualified Attorney — US &amp; Philippines
        </p>
        <h1 className="font-display text-4xl font-normal leading-tight text-white sm:text-5xl md:text-6xl">
          Practical legal solutions, across two countries.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-sidewalk sm:text-lg">
          Immigration, real estate, and litigation counsel for clients moving
          between the United States and the Philippines.
        </p>
        <a
          href="#contact"
          className="mt-10 inline-block border border-gold px-7 py-3 text-sm tracking-wide text-sidewalk transition-colors hover:bg-gold hover:text-ink"
        >
          BOOK A CONSULTATION
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Run the test to verify it passes**

Run: `npx vitest run src/components/Hero.test.tsx`
Expected: PASS — 2 tests passed.

- [ ] **Step 9: Commit**

```bash
git add src/components/CrestFlourish.tsx src/components/CrestFlourish.test.tsx src/components/Hero.tsx src/components/Hero.test.tsx
git commit -m "Add crest flourish motif and Hero section"
```

---

## Task 7: Practice Areas Component

**Files:**
- Create: `src/components/PracticeAreas.tsx`
- Test: `src/components/PracticeAreas.test.tsx`

**Interfaces:**
- Consumes: `practiceAreas` from `@/content/site`; `Reveal` from `@/components/Reveal`.
- Produces: `PracticeAreas()` — default export, no props. Renders `<section id="practice-areas">` with one card per entry in `practiceAreas`, in array order.

- [ ] **Step 1: Write the failing test**

`src/components/PracticeAreas.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import PracticeAreas from "./PracticeAreas";
import { practiceAreas } from "@/content/site";

describe("PracticeAreas", () => {
  it("renders a heading for every practice area in order", () => {
    render(<PracticeAreas />);
    const headings = screen.getAllByRole("heading", { level: 3 });
    expect(headings).toHaveLength(practiceAreas.length);
    headings.forEach((heading, index) => {
      expect(heading).toHaveTextContent(practiceAreas[index].title);
    });
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/PracticeAreas.test.tsx`
Expected: FAIL — `Cannot find module './PracticeAreas'`.

- [ ] **Step 3: Create the component**

`src/components/PracticeAreas.tsx`:

```tsx
import { practiceAreas } from "@/content/site";
import Reveal from "@/components/Reveal";

export default function PracticeAreas() {
  return (
    <section
      id="practice-areas"
      aria-label="Practice areas"
      className="bg-paper px-6 py-24"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-hudson-bay">
            What We Handle
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Practice Areas
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, index) => (
            <Reveal key={area.title} delay={index * 0.05}>
              <article className="h-full border border-comet/40 p-6">
                <h3 className="font-display text-xl text-hudson-bay">
                  {area.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/80">
                  {area.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/PracticeAreas.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/PracticeAreas.tsx src/components/PracticeAreas.test.tsx
git commit -m "Add Practice Areas section"
```

---

## Task 8: Credentials Component

**Files:**
- Create: `src/components/Credentials.tsx`
- Test: `src/components/Credentials.test.tsx`

**Interfaces:**
- Consumes: `credentials` from `@/content/site`; `Reveal` from `@/components/Reveal`.
- Produces: `Credentials()` — default export, no props. Renders `<section id="credentials">` as an honors-style list.

- [ ] **Step 1: Write the failing test**

`src/components/Credentials.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Credentials from "./Credentials";
import { credentials } from "@/content/site";

describe("Credentials", () => {
  it("renders every credential's label and detail", () => {
    render(<Credentials />);
    credentials.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getByText(item.detail)).toBeInTheDocument();
    });
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/Credentials.test.tsx`
Expected: FAIL — `Cannot find module './Credentials'`.

- [ ] **Step 3: Create the component**

`src/components/Credentials.tsx`:

```tsx
import { credentials } from "@/content/site";
import Reveal from "@/components/Reveal";

export default function Credentials() {
  return (
    <section
      id="credentials"
      aria-label="Credentials and bar admissions"
      className="bg-sidewalk/40 px-6 py-24"
    >
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-hudson-bay">
            Credentials
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            Bar Admissions &amp; Standing
          </h2>
        </Reveal>
        <dl className="mt-12 divide-y divide-comet/40 border-y border-comet/40">
          {credentials.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.05}>
              <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between">
                <dt className="font-display text-lg text-hudson-bay">
                  {item.label}
                </dt>
                <dd className="text-sm text-ink/80 sm:text-right">
                  {item.detail}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/Credentials.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/Credentials.tsx src/components/Credentials.test.tsx
git commit -m "Add Credentials / bar admissions section"
```

---

## Task 9: About Component

**Files:**
- Create: `src/components/About.tsx`
- Test: `src/components/About.test.tsx`

**Interfaces:**
- Consumes: `Reveal` from `@/components/Reveal`.
- Produces: `About()` — default export, no props. Renders `<section id="about">` with bio copy, a pull-quote, and a monogram placeholder in place of a photo.

- [ ] **Step 1: Write the failing test**

`src/components/About.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About", () => {
  it("renders the bio, pull-quote, and monogram placeholder", () => {
    render(<About />);
    expect(
      screen.getByRole("heading", { name: /about atty\. perdices/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/dual-qualified attorney/i)).toBeInTheDocument();
    expect(
      screen.getByText("Two legal systems. One point of contact.")
    ).toBeInTheDocument();
    expect(screen.getByText("JP")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/About.test.tsx`
Expected: FAIL — `Cannot find module './About'`.

- [ ] **Step 3: Create the component**

`src/components/About.tsx`:

```tsx
import Reveal from "@/components/Reveal";

export default function About() {
  return (
    <section id="about" aria-label="About" className="bg-paper px-6 py-24">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-12 md:grid-cols-[200px_1fr]">
        <Reveal>
          <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-full border border-gold text-3xl font-display text-hudson-bay md:mx-0">
            JP
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xs uppercase tracking-[0.25em] text-hudson-bay">
            About
          </p>
          <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            About Atty. Perdices
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink/80">
            Atty. Jose Mari Perdices is a dual-qualified attorney admitted to
            practice law in the United States and the Philippines. His
            practice is built around a simple idea: clients whose lives span
            both countries need one lawyer who understands both legal systems
            — not a referral chain between separate firms on each side of the
            Pacific. Over more than a decade of practice, he has guided
            individuals, families, and small businesses through immigration
            petitions, property transactions, and disputes that cross
            borders, combining US and Philippine legal training into a
            single, practical point of contact.
          </p>
          <p className="mt-6 border-l-2 border-gold pl-4 font-display text-xl text-hudson-bay">
            Two legal systems. One point of contact.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/About.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/About.tsx src/components/About.test.tsx
git commit -m "Add About section"
```

---

## Task 10: FAQ Accordion Component

**Files:**
- Create: `src/components/FAQ.tsx`
- Test: `src/components/FAQ.test.tsx`

**Interfaces:**
- Consumes: `faqItems` from `@/content/site`.
- Produces: `FAQ()` — default export, no props. Renders `<section id="faq">` as a single-open accordion: each question is a `<button aria-expanded>` controlling an answer `<div id="faq-answer-{index}">` toggled via the `hidden` attribute.

- [ ] **Step 1: Write the failing tests**

`src/components/FAQ.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FAQ from "./FAQ";
import { faqItems } from "@/content/site";

describe("FAQ", () => {
  it("renders every question, all closed by default", () => {
    render(<FAQ />);
    faqItems.forEach((item) => {
      const button = screen.getByRole("button", { name: item.question });
      expect(button).toHaveAttribute("aria-expanded", "false");
      expect(screen.getByText(item.answer)).not.toBeVisible();
    });
  });

  it("opens a question on click and closes it on a second click", async () => {
    const user = userEvent.setup();
    render(<FAQ />);

    const firstButton = screen.getByRole("button", {
      name: faqItems[0].question,
    });

    await user.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(faqItems[0].answer)).toBeVisible();

    await user.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText(faqItems[0].answer)).not.toBeVisible();
  });

  it("closes the previously open question when a different one is opened", async () => {
    const user = userEvent.setup();
    render(<FAQ />);

    const firstButton = screen.getByRole("button", {
      name: faqItems[0].question,
    });
    const secondButton = screen.getByRole("button", {
      name: faqItems[1].question,
    });

    await user.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "true");

    await user.click(secondButton);
    expect(secondButton).toHaveAttribute("aria-expanded", "true");
    expect(firstButton).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByText(faqItems[0].answer)).not.toBeVisible();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npx vitest run src/components/FAQ.test.tsx`
Expected: FAIL — `Cannot find module './FAQ'`.

- [ ] **Step 3: Create the component**

`src/components/FAQ.tsx`:

```tsx
"use client";

import { useState } from "react";
import { faqItems } from "@/content/site";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      aria-label="Frequently asked questions"
      className="bg-paper px-6 py-24"
    >
      <div className="mx-auto max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-hudson-bay">
          Common Questions
        </p>
        <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
          Frequently Asked Questions
        </h2>
        <dl className="mt-10 divide-y divide-comet/30 border-y border-comet/30">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.question}>
                <dt>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    <span className="font-display text-lg text-hudson-bay">
                      {item.question}
                    </span>
                    <span aria-hidden="true" className="shrink-0 text-gold">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </dt>
                <dd
                  id={`faq-answer-${index}`}
                  hidden={!isOpen}
                  className="pb-5 text-sm leading-relaxed text-ink/80"
                >
                  {item.answer}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npx vitest run src/components/FAQ.test.tsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/FAQ.tsx src/components/FAQ.test.tsx
git commit -m "Add FAQ accordion section"
```

---

## Task 11: Contact Component

**Files:**
- Create: `src/components/Contact.tsx`
- Test: `src/components/Contact.test.tsx`

**Interfaces:**
- Consumes: `contactInfo` from `@/content/site`; `Reveal` from `@/components/Reveal`; `CrestFlourish` from `@/components/CrestFlourish`.
- Produces: `Contact()` — default export, no props. Renders `<section id="contact">` with a `mailto:` link, `tel:` links (digits + leading `+` only), a crest flourish corner ornament, and office cards.

- [ ] **Step 1: Write the failing test**

`src/components/Contact.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "./Contact";
import { contactInfo } from "@/content/site";

describe("Contact", () => {
  it("renders a mailto link", () => {
    render(<Contact />);
    const emailLink = screen.getByRole("link", { name: contactInfo.email });
    expect(emailLink).toHaveAttribute("href", `mailto:${contactInfo.email}`);
  });

  it("renders a tel link for every phone number", () => {
    render(<Contact />);
    contactInfo.phones.forEach((phone) => {
      const telLink = screen.getByRole("link", { name: phone.number });
      const digitsOnly = phone.number.replace(/[^\d+]/g, "");
      expect(telLink).toHaveAttribute("href", `tel:${digitsOnly}`);
    });
  });

  it("renders every office's address and hours", () => {
    render(<Contact />);
    contactInfo.offices.forEach((office) => {
      expect(screen.getByText(office.city)).toBeInTheDocument();
      expect(screen.getByText(office.address)).toBeInTheDocument();
      expect(screen.getByText(office.hours)).toBeInTheDocument();
    });
  });

  it("renders the crest flourish motif", () => {
    const { container } = render(<Contact />);
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/Contact.test.tsx`
Expected: FAIL — `Cannot find module './Contact'`.

- [ ] **Step 3: Create the component**

`src/components/Contact.tsx`:

```tsx
import { contactInfo } from "@/content/site";
import Reveal from "@/components/Reveal";
import CrestFlourish from "@/components/CrestFlourish";

export default function Contact() {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative overflow-hidden bg-hudson-bay px-6 py-24"
    >
      <CrestFlourish className="pointer-events-none absolute right-6 top-6 h-16 w-16 rotate-90 text-gold/50" />
      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.25em] text-sidewalk">
            Get In Touch
          </p>
          <h2 className="mt-3 font-display text-3xl text-white sm:text-4xl">
            Contact
          </h2>
          <a
            href={`mailto:${contactInfo.email}`}
            className="mt-4 inline-block text-sidewalk hover:text-gold"
          >
            {contactInfo.email}
          </a>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {contactInfo.offices.map((office, index) => {
            const phone = contactInfo.phones[index];
            const digitsOnly = phone.number.replace(/[^\d+]/g, "");
            return (
              <Reveal key={office.city} delay={index * 0.05}>
                <div className="border border-comet/40 p-6">
                  <h3 className="font-display text-lg text-white">
                    {office.city}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-sidewalk">
                    {office.address}
                  </p>
                  <p className="mt-2 text-sm text-sidewalk">{office.hours}</p>
                  <a
                    href={`tel:${digitsOnly}`}
                    className="mt-3 inline-block text-sm text-sidewalk hover:text-gold hover:underline"
                  >
                    {phone.number}
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/Contact.test.tsx`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/Contact.tsx src/components/Contact.test.tsx
git commit -m "Add Contact section"
```

---

## Task 12: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`
- Test: `src/components/Footer.test.tsx`

**Interfaces:**
- Consumes: `navLinks` from `@/content/site`.
- Produces: `Footer()` — default export, no props. Renders `<footer>` with logo, condensed nav, bar-admission disclaimer, and copyright line.

- [ ] **Step 1: Write the failing test**

`src/components/Footer.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";
import { navLinks } from "@/content/site";

describe("Footer", () => {
  it("renders the brand, nav links, disclaimer, and copyright", () => {
    render(<Footer />);
    expect(screen.getByText("PERDICES LAW")).toBeInTheDocument();

    navLinks.forEach((link) => {
      expect(screen.getByText(link.label)).toBeInTheDocument();
    });

    expect(
      screen.getByText(/does not constitute legal advice/i)
    ).toBeInTheDocument();

    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/components/Footer.test.tsx`
Expected: FAIL — `Cannot find module './Footer'`.

- [ ] **Step 3: Create the component**

`src/components/Footer.tsx`:

```tsx
import Image from "next/image";
import { navLinks } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-hudson-bay px-6 py-12 text-sidewalk">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.jpg"
            alt="Perdices Law crest"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="font-display text-sm tracking-wide text-white">
            PERDICES LAW
          </span>
        </div>
        <ul className="flex flex-wrap gap-6 text-xs tracking-wide">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-gold">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs leading-relaxed text-comet">
        Atty. Jose Mari Perdices is admitted to practice law in California,
        United States, and is a member of the Integrated Bar of the
        Philippines. This website is for informational purposes only and does
        not constitute legal advice. Prior results do not guarantee a similar
        outcome.
      </p>
      <p className="mx-auto mt-4 max-w-6xl text-xs text-comet">
        © {new Date().getFullYear()} Perdices Law. All rights reserved.
      </p>
    </footer>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/components/Footer.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Commit**

```bash
git add src/components/Footer.tsx src/components/Footer.test.tsx
git commit -m "Add Footer section"
```

---

## Task 13: Assemble the Homepage

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: `Nav`, `Hero`, `PracticeAreas`, `Credentials`, `About`, `FAQ`, `Contact`, `Footer` (all default exports from `@/components/*`).
- Produces: final `Home()` composition — no change to its own exported signature.

- [ ] **Step 1: Replace the smoke test with the full integration test**

`src/app/page.test.tsx`:

```tsx
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

describe("Home", () => {
  it("renders every major section", () => {
    render(<Home />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Practical legal solutions, across two countries.",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Practice Areas" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Bar Admissions & Standing" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /about atty\. perdices/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Frequently Asked Questions" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Contact" })
    ).toBeInTheDocument();

    const consultationLinks = screen.getAllByRole("link", {
      name: /book a consultation/i,
    });
    expect(consultationLinks.length).toBeGreaterThanOrEqual(2);
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npx vitest run src/app/page.test.tsx`
Expected: FAIL — the current minimal `Home` only renders an `<h1>Perdices Law</h1>`, so none of the section headings are found.

- [ ] **Step 3: Assemble the full page**

`src/app/page.tsx`:

```tsx
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PracticeAreas from "@/components/PracticeAreas";
import Credentials from "@/components/Credentials";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <PracticeAreas />
        <Credentials />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npx vitest run src/app/page.test.tsx`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Verify the full suite and the production build**

Run: `npm test`
Expected: all test files pass.

Run: `npm run build`
Expected: `Compiled successfully`.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/app/page.test.tsx
git commit -m "Assemble the full homepage from all sections"
```

---

## Task 14: Final QA Pass

**Files:** none (verification only; fix forward in the relevant component file if an issue is found).

- [ ] **Step 1: Run the full automated check**

Run: `npm run lint`
Expected: no errors.

Run: `npm test`
Expected: all test files pass.

Run: `npm run build`
Expected: `Compiled successfully`.

- [ ] **Step 2: Start the dev server and open it in a real browser**

Run: `npm run dev` (leave running)

Using the browser preview tool, navigate to `http://localhost:3000` and verify:
- The hero renders full-bleed navy with the crest-echoing style approved in brainstorming, the headline is legible, and the CTA is visible.
- Clicking each nav link scrolls smoothly to the matching section (`#practice-areas`, `#credentials`, `#about`, `#faq`, `#contact`).
- All 7 practice-area cards render in the approved order.
- The FAQ accordion opens/closes correctly and only one item is open at a time.
- The Contact section's email and phone links have correct `mailto:`/`tel:` hrefs (hover to confirm in the status bar, or inspect the DOM).
- The footer disclaimer and current-year copyright render.

- [ ] **Step 3: Verify the mobile layout**

Resize the browser preview to a 375×812 mobile viewport and verify:
- The desktop nav links are hidden and the hamburger menu opens/closes the mobile menu.
- The hero, practice-area grid, and all other sections stack into a single readable column with no horizontal overflow.
- Tap targets (nav links, FAQ questions, CTA buttons) are large enough to tap comfortably.

- [ ] **Step 4: Fix any issues found**

If any visual or functional issue is found in Steps 2–3, fix it in the relevant component file, re-run `npm test` and `npm run build` to confirm nothing broke, and commit the fix with a message describing what was wrong (e.g. `git commit -m "Fix mobile nav overflow on small viewports"`). Repeat Steps 2–3 after any fix.

- [ ] **Step 5: Stop the dev server**

Stop the `npm run dev` process once verification is complete.
