import { describe, expect, it } from "vitest";
import { navLinks, practiceAreas, credentials, faqItems, contactInfo } from "./site";

describe("site content", () => {
  it("orders the primary nav links to match the page", () => {
    expect(navLinks).toEqual([
      { href: "#about", label: "About" },
      { href: "#credentials", label: "Credentials" },
      { href: "#practice-areas", label: "Practice" },
      { href: "#faq", label: "FAQ" },
      { href: "#contact", label: "Contact" },
    ]);
  });

  it("leads with appellate work, his strongest credential", () => {
    expect(practiceAreas).toHaveLength(6);
    expect(practiceAreas[0].title).toBe("Appellate Litigation");
    practiceAreas.forEach((area) => {
      expect(area.title.length).toBeGreaterThan(0);
      expect(area.description.length).toBeGreaterThan(0);
      expect(area.detail.length).toBeGreaterThan(0);
    });
  });

  it("advertises no service his own documents do not evidence", () => {
    // Immigration and family law appear nowhere in his Philippine practice;
    // the US immigration exposure was in a non-attorney paralegal role.
    const titles = practiceAreas.map((a) => a.title).join(" ");
    expect(titles).not.toMatch(/immigration/i);
    expect(titles).not.toMatch(/family law/i);
  });

  it("lists the bar admissions and credentials", () => {
    expect(credentials).toHaveLength(6);
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

  it("defines contact info with the Dumaguete office and a phone number", () => {
    expect(contactInfo.email).toBe("chemaperdices@gmail.com");
    expect(contactInfo.offices).toHaveLength(1);
    contactInfo.offices.forEach((office) => {
      expect(office.phone.length).toBeGreaterThan(0);
    });
  });
});
