/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: "#0F2027",
        secondaryDark: "#6c757d",
        secondaryWhite: "#fafafa",
        error: "#d90429",
        green: "#57cc99",
        blue: "#0066ff",
        rating: "#FF9529",
        footerText: "#adb5bd"
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
