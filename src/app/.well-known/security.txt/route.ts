import { NextResponse } from "next/server";
import { contactInfo } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

/**
 * RFC 9116 vulnerability-disclosure file. `Contact` is derived from
 * `contactInfo.email` rather than duplicated here, so it can't drift from
 * the address shown on the site. `Expires` is required by the RFC — a
 * security.txt with no expiry is meant to be treated as untrustworthy —
 * and is set a year out; bump it if this file is ever revisited without
 * other changes prompting a redeploy.
 */
export function GET() {
  const siteUrl = getSiteUrl();
  const body = [
    `Contact: mailto:${contactInfo.email}`,
    `Expires: 2027-09-21T00:00:00.000Z`,
    `Canonical: ${siteUrl}/.well-known/security.txt`,
    `Preferred-Languages: en`,
  ].join("\n");

  return new NextResponse(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
