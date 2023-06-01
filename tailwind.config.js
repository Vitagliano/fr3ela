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
          light: colors.zinc[200],
          DEFAULT: colors.zinc[300],
          dark: colors.zinc[700],
          darker: colors.zinc[800]
        }
      }
    }
  },
  plugins: [talwindNesting]
};
