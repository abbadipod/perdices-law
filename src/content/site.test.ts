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

  it("defines contact info with 2 offices, each with a phone number", () => {
    expect(contactInfo.email).toBe("info@perdiceslaw.com");
    expect(contactInfo.offices).toHaveLength(2);
    contactInfo.offices.forEach((office) => {
      expect(office.phone.length).toBeGreaterThan(0);
    });
  });
});
