import type { Metadata } from "next";
import { Oswald, Public_Sans } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import StructuredData from "@/components/StructuredData";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-oswald",
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-public-sans",
  display: "swap",
});

const title = "Perdices Law | Philippine Lawyer in Dumaguete City";
// Kept under ~160 characters and leads with the city so it doesn't get
// truncated in search results before the local-targeting keywords land.
const description =
  "Philippine lawyer based in Dumaguete City, Negros Oriental — litigation, property, estate, and corporate law for clients in the Philippines and abroad.";

export const metadata: Metadata = {
  // Makes the OG/Twitter image URLs absolute, which scrapers require.
  metadataBase: new URL(getSiteUrl()),
  title,
  description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Perdices Law",
    // en_PH, not en_US — this is a Philippine practice, not a US one.
    locale: "en_PH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${publicSans.variable} font-sans bg-paper text-ink antialiased`}
      >
        {children}
        <StructuredData />
      </body>
    </html>
  );
}
