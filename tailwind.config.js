module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        pblue: "#3C4A87",
        pred: "#DB371C",
        pwhite: "#0D0B0A",
        pyellow: "#F2B277",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
