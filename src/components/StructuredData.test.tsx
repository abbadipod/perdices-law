import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import StructuredData from "./StructuredData";
import { contactInfo, education, practiceAreas } from "@/content/site";

function parsed(container: HTMLElement) {
  const script = container.querySelector(
    'script[type="application/ld+json"]'
  ) as HTMLScriptElement;
  expect(script).not.toBeNull();
  // Malformed JSON-LD is ignored silently by crawlers, so parse it for real.
  return JSON.parse(script.innerHTML.replace(/\\u003c/g, "<"));
}

describe("StructuredData", () => {
  it("emits valid LegalService JSON-LD", () => {
    const { container } = render(<StructuredData />);
    const data = parsed(container);

    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@type"]).toBe("LegalService");
    expect(data.name).toBe("Perdices Law");
  });

  it("stays in step with the content module", () => {
    const { container } = render(<StructuredData />);
    const data = parsed(container);

    expect(data.email).toBe(contactInfo.email);
    expect(data.location).toHaveLength(contactInfo.offices.length);
    expect(data.hasOfferCatalog.itemListElement).toHaveLength(
      practiceAreas.length
    );
    expect(data.hasOfferCatalog.itemListElement[0].itemOffered.name).toBe(
      practiceAreas[0].title
    );
  });

  it("advertises no service his own documents do not evidence", () => {
    // The sibling guard in site.test.ts only inspects `practiceAreas`. The
    // JSON-LD description used to be authored separately and still named
    // immigration and family law; crawlers read it, so the whole payload —
    // not just the offer catalogue — has to be clean.
    const { container } = render(<StructuredData />);
    const payload = JSON.stringify(parsed(container));

    expect(payload).not.toMatch(/immigration/i);
    expect(payload).not.toMatch(/family/i);
  });

  it("describes the practice from the practice areas, not a parallel string", () => {
    const { container } = render(<StructuredData />);
    const data = parsed(container);

    practiceAreas.forEach((area) => {
      expect(data.description).toContain(area.title);
    });
  });

  it("lists every school he attended as a separate alumniOf entry", () => {
    const { container } = render(<StructuredData />);
    const data = parsed(container);

    const schools = data.founder.alumniOf.map((a: { name: string }) => a.name);
    expect(schools).toHaveLength(education.length);
    expect(schools).toContain("University of Washington");
    expect(schools).toContain("Xavier University – Ateneo de Cagayan");
    // Bare institution names — not the display line with degree and year.
    schools.forEach((name: string) => {
      expect(name).not.toMatch(/—|\d{4}/);
    });
  });

  it("tags each office with a country code", () => {
    const { container } = render(<StructuredData />);
    const data = parsed(container);

    const countries = data.location.map(
      (l: { address: { addressCountry: string } }) => l.address.addressCountry
    );
    expect(countries).toContain("PH");
    // Every office must resolve to a code; an unmatched city would emit "".
    expect(countries).not.toContain("");
  });

  it("escapes angle brackets so the script tag cannot be broken out of", () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector(
      'script[type="application/ld+json"]'
    ) as HTMLScriptElement;
    expect(script.innerHTML).not.toContain("<");
  });
});
