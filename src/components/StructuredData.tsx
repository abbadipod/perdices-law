import { contactInfo, education, practiceAreas } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

const ATTORNEY_NAME = "Atty. Jose Mari V. Perdices";
const FIRM_NAME = "Perdices Law";

/** Oxford-comma list, so the description reads as a sentence. */
function sentenceList(items: string[]): string {
  if (items.length < 3) return items.join(" and ");
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

function countryCode(city: string): string {
  if (city.includes("Philippines")) return "PH";
  if (city.includes("United States")) return "US";
  return "";
}

/**
 * `office.address` is authored as one free-text line ending in
 * "..., City, Region" (see site.ts). Splitting it lets the JSON-LD carry
 * `addressLocality`/`addressRegion` instead of one opaque `streetAddress`
 * string — the fields Google's local-business results actually key off.
 */
function parseAddress(address: string) {
  const parts = address.split(",").map((part) => part.trim());
  return {
    streetAddress: parts.slice(0, -2).join(", "),
    addressLocality: parts[parts.length - 2],
    addressRegion: parts[parts.length - 1],
  };
}

/**
 * LegalService schema for local search.
 *
 * Every value is read from `site.ts`, so replacing the placeholder contact
 * and credential data there updates the markup too — the two can't drift.
 *
 * `address` is set from the primary (first) office, since that's what
 * Google's local-business results key off — `location` below still lists
 * every office in full for anything that reads structured data more
 * literally.
 */
export default function StructuredData() {
  const siteUrl = getSiteUrl();
  const primaryOffice = contactInfo.offices[0];
  const primaryAddress = parseAddress(primaryOffice.address);

  const data = {
    "@context": "https://schema.org",
    "@type": ["LegalService", "Attorney"],
    name: FIRM_NAME,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    email: contactInfo.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: primaryAddress.streetAddress,
      addressLocality: primaryAddress.addressLocality,
      addressRegion: primaryAddress.addressRegion,
      addressCountry: countryCode(primaryOffice.city),
    },
    // Derived, not authored. This was a hardcoded string that still listed
    // immigration and family law — neither of which is offered — long after
    // they were removed from the practice areas. The guard in site.test.ts
    // only inspected `practiceAreas`, so the drift went unnoticed. Building
    // it from the same source makes that class of drift impossible.
    description: `Philippine legal counsel from ${ATTORNEY_NAME}: ${sentenceList(
      practiceAreas.map((area) => area.title)
    )}.`,
    // Where the *service* applies — Philippine law — not everywhere a
    // client might live. Listing "United States" here would repeat the
    // same overstatement already corrected in the hero and page metadata:
    // the firm doesn't practise US law, it just also serves clients who
    // live abroad. Dumaguete City and Negros Oriental are named explicitly
    // since that's the actual local search target.
    areaServed: [
      { "@type": "Country", name: "Philippines" },
      { "@type": "AdministrativeArea", name: "Negros Oriental" },
      { "@type": "City", name: "Dumaguete City" },
    ],
    founder: {
      "@type": "Person",
      name: ATTORNEY_NAME,
      jobTitle: "Attorney at Law",
      // One entry per institution, from the structured education list —
      // schema wants the bare institution name, not the display line.
      alumniOf: education.map((e) => ({
        "@type": "EducationalOrganization",
        name: e.school,
      })),
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Practice areas",
      itemListElement: practiceAreas.map((area) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: area.title },
      })),
    },
    location: contactInfo.offices.map((office) => {
      const parsed = parseAddress(office.address);
      return {
        "@type": "Place",
        name: office.city,
        telephone: office.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: parsed.streetAddress,
          addressLocality: parsed.addressLocality,
          addressRegion: parsed.addressRegion,
          addressCountry: countryCode(office.city),
        },
        // Omitted rather than emitted empty when hours are unknown.
        ...(office.hours ? { openingHours: office.hours } : {}),
      };
    }),
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
