/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0099A8",
        primaryLight: "#00B7C7",
        surface: "#F1F1F1",
        muted: "#CCCCCC",
        dark: "#333333",
        success: "#3AB795",
        danger: "#D64550",
        white: "#FFFFFF",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
