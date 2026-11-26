/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#151515",
        mute: "#777777",
        paper: "#F7F7F5",
        line: "#E8E8E8",
        nav: "#101010",
        leaf: "#16A34A",
        mist: "#EAF7EE",
      },
      fontFamily: {
        sans: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        none: "none",
      },
    },
  },
  plugins: [],
};
