import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0c111d",
        steel: "#1f2a37",
        accent: "#ff4d30",
        accentSoft: "#ffa48f"
      },
      fontFamily: {
        sans: ["Montserrat", "system-ui", "sans-serif"],
        display: ["Orbitron", "Montserrat", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
