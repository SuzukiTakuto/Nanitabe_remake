/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FAF3F3",
        secondary: "#6750A4",
      },
      fontFamily: {
        mplus: ["M-PLUS-1", "sans-serif"],
        mpbold: ["MPLUS1-Bold", "sans-serif"],
        mpregular: ["MPLUS1-Regular", "sans-serif"],
        yatra: ["Yatra-One", "sans-serif"],
      },
    },
  },
  plugins: [],
};
