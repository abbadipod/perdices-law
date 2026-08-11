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
        cream: "#ECE3D2",
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
