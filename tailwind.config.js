/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        DEFAULT: "0px 2px 8px 0px rgba(0, 0, 0, 0.25)",
      },
      colors: {
        background: "#fff",
        highlight: "#EF7A39",
      },
      fontFamily: {
        seymour: ["var(--font-seymour)"],
        roboto: ["var(--font-roboto)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
