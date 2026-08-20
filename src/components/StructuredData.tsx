import { contactInfo, credentials, practiceAreas } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

const ATTORNEY_NAME = "Atty. Jose Mari V. Perdices";
const FIRM_NAME = "Perdices Law";

function countryCode(city: string): string {
  if (city.includes("Philippines")) return "PH";
  if (city.includes("United States")) return "US";
  return "";
}

/**
 * LegalService schema for local search.
 *
 * Every value is read from `site.ts`, so replacing the placeholder contact
 * and credential data there updates the markup too — the two can't drift.
 *
 * The office address is emitted as a single `streetAddress` line because
 * that is how it is authored. If real addresses land, splitting them into
 * discrete locality/region/postalCode fields would be worth doing.
 */
export default function StructuredData() {
  const siteUrl = getSiteUrl();

  const data = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: FIRM_NAME,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    email: contactInfo.email,
    description:
      "Philippine immigration, real estate, criminal, family, business, and civil litigation counsel from a dual-qualified US and Philippine attorney.",
    areaServed: [
      { "@type": "Country", name: "Philippines" },
      { "@type": "Country", name: "United States" },
    ],
    founder: {
      "@type": "Person",
      name: ATTORNEY_NAME,
      jobTitle: "Attorney at Law",
      alumniOf: credentials
        .filter((item) => item.label === "Education")
        .map((item) => ({ "@type": "EducationalOrganization", name: item.detail })),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Practice areas",
      itemListElement: practiceAreas.map((area) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: area.title },
      })),
    },
    location: contactInfo.offices.map((office) => ({
      "@type": "Place",
      name: office.city,
      telephone: office.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: office.address,
        addressCountry: countryCode(office.city),
      },
      // Omitted rather than emitted empty when hours are unknown.
      ...(office.hours ? { openingHours: office.hours } : {}),
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Escape `<` so a stray closing tag in content can never break out.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
