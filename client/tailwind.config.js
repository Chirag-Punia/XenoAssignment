/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        Doto: ['Doto', 'sans-serif'],
      },
      colors: {
        customPurple: '#dfdbff',
      },
      height: {
        '10p': '10%',
        '90p': '90%',
      }
    },
  },

  darkMode: "class",
  plugins: [nextui()]
}

