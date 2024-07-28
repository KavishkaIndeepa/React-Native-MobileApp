/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ 
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    colors: {
      // Create a custom color that uses a CSS custom value
      primary: "rgb(var(--color-primary) / <alpha-value>)",
    },
  },
  plugins: [
    ({ addBase }) => addBase({ ":root": { "--color-primary": "255 0 0" } }),
  ],
}

