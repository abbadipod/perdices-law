/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // No legitimate reason to frame this site — closes the
          // clickjacking gap left open by having no header here at all.
          { key: "X-Frame-Options", value: "DENY" },
          // Stops browsers from MIME-sniffing a response into executing as
          // a different type than declared.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Sends the full referrer to same-origin, only the origin (no
          // path/query) cross-origin — avoids leaking a visitor's page
          // path/query to third parties on outbound links.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // The site uses none of these APIs anywhere; deny them outright
          // rather than leaving the default (often permissive) policy.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          // `preload` deliberately omitted — that's a one-way submission to
          // browsers' built-in preload lists, not something to opt into
          // without a separate, explicit decision.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
