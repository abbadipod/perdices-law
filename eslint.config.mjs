// Flat config. Next 16 removed `next lint`, and eslint-config-next now ships
// a native flat-config array, so no FlatCompat shim is needed.
import coreWebVitals from "eslint-config-next/core-web-vitals";

const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "public/**",
      "docs/**",
    ],
  },
  ...coreWebVitals,
];

export default config;
