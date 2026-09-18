import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        charcoal: "#36454F", // Primary Dark Text & Headings
        glaucous: "#6082B6", // Primary Accent & Main Buttons
        bluegray: "#7393B3", // Secondary Accent & Muted UI
        ash: "#B2BEB5", // Light Subtle Borders/Bags
        darkgray: "#A9A9A9", // Muted Body Text & Icons
        softbg: "#F4F6F8", // Ultra-light Slate Background
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
