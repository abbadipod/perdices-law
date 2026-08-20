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
        // Deeper gold for marks that must carry contrast on light
        // backgrounds: #C7A05E measures 2.25:1 on paper, under the 3:1
        // WCAG 1.4.11 asks of a control that conveys state.
        "gold-deep": "#A67C2E",
        ink: "#1A1F26",
        paper: "#F7F6F3",
        sand: "#ECE3D2",
      },
      fontFamily: {
        display: ["var(--font-oswald)", "ui-sans-serif", "sans-serif"],
        sans: ["var(--font-public-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        "hero-in": {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "hero-in": "hero-in 700ms ease both",
      },
    },
  },
  plugins: [],
};

export default config;
