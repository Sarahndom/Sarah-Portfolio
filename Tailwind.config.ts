import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        dm: ["var(--font-dm)", "sans-serif"],
      },
      colors: {
        bg:      "#050a14",
        bg2:     "#080f1e",
        blue:    "#2563eb",
        bluemid: "#3b82f6",
        cyan:    "#06b6d4",
        snow:    "#f0f4ff",
        muted:   "#7b90b8",
      },
      keyframes: {
        spinRing: { to: { transform: "rotate(360deg)" } },
        pulse2:   {
          "0%,100%": { boxShadow: "0 0 0 0 rgba(34,197,94,0.5)" },
          "50%":     { boxShadow: "0 0 0 6px rgba(34,197,94,0)" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(32px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "spin-ring":  "spinRing 8s linear infinite",
        "spin-ring-r":"spinRing 8s linear infinite reverse",
        pulse2:       "pulse2 2s infinite",
        "fade-up":    "fadeUp 0.7s ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;