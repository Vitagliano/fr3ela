const talwindNesting = require("tailwindcss/nesting");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        card: {
          light: colors.white,
          DEFAULT: colors.gray[500],
          dark: colors.gray[800],
          darker: colors.gray[900]
        }
      }
    }
  },
  plugins: [talwindNesting]
};
