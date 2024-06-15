/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: [],
  content: [
    "./index.{js,jsx,ts,tsx}",
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        "app-black": {
          200: "#0B0D10",
          300: "#141414",
        },
        "app-white": {
          100: "#FFFFFF",
          200: "#EFEFF0",
        },
        "app-copper": {
          100: "#CCA373",
          200: "#B08451",
          300: "#9A6B36",
        },
        "app-blue": {
          100: "#1D68E3",
          200: "#337AFF",
          300: "#80AFFF",
          400: "#BAD3F",
          500: "#EBF2FF",
          1337: "#1E90FF",
        },
        "app-gris": {
          200: "#808080",
          300: "#D1D5DB",
          400: "#F5F5F5",
        },
      },
    },
  },
  plugins: [],
};
