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

const title = "Perdices Law | Dual-Qualified Attorney — US & Philippines";
const description =
  "The Law Office of Atty. Jose Mari Perdices — a dual-qualified attorney practising Philippine immigration, real estate, criminal, family, and business law.";

export const metadata: Metadata = {
  // Makes the OG/Twitter image URLs absolute, which scrapers require.
  metadataBase: new URL(getSiteUrl()),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Perdices Law",
    locale: "en_US",
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
