module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
      },
      colors: {
        sportblack: "#0D0D0D",
        sportgreen: "#04D9B2",
        sportbrown: "#BF5656",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
