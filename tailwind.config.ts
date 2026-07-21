import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sidewalk: "#CBCED0",
        comet: "#97A2AE",
        "hudson-bay": "#3F5266",
        gold: "#C7A05E",
        ink: "#1A1F26",
        paper: "#F7F6F3",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-public-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
