const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {

      // Fonts
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        serif: ['"Cormorant Garamond"', ...defaultTheme.fontFamily.serif],
      },

      // Colors
      colors: {
        pyellow: "#F2B277",
        pblue: "#3C4A87",

        pred: "#9C3D36",
        pwhite: "#F4F0E6",
        plightmaroon: "#BBA477",
        pmaroon: "#513F33",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
