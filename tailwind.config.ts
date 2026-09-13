import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        brand: {
          red: "#E3262E",
          cream: "#F9F7F5",
          dark: "#1A1A1A",
          yellow: "#FFF4A3",
        },
        background: "#F9F7F5",
        foreground: "#1A1A1A",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderWidth: {
        3: "3px",
      },
      borderRadius: {
        xl: "12px",
      },
      boxShadow: {
        brand: "6px 6px 0 0 #1A1A1A",
        "brand-sm": "4px 4px 0 0 #1A1A1A",
        "brand-lg": "8px 8px 0 0 #1A1A1A",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
