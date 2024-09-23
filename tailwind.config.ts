import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        grassTeal: "#88ccca",
      },
      fontFamily: {
        heading: ["M PLUS Rounded 1c", "sans-serif"],
      },
    },
  },
  darkMode: "class", // Enable dark mode support
  plugins: [],
};
export default config;
