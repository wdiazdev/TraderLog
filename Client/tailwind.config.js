/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          1: "rgb(var(--color-accent1) / <alpha-value>)",
          2: "rgb(var(--color-accent2) / <alpha-value>)",
        },
        bkg: {
          1: "rgb(var(--primary-bkg) / <alpha-value>)",
          2: "rgb(var(--secondary-bkg) / <alpha-value>)",
        },
        content: "rgb(var(--color-content) / <alpha-value>)",
        container: "rgb(var(--container-bkg) / <alpha-value>)",
        containerText: "rgb(var(--container-text) / <alpha-value>)",
      },
    },
  },
  plugins: [],
}
