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
