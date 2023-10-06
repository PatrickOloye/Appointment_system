/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
     
    },
    extend: {
      colors: {
        teal: "#2F6C6D",
        hummidBirl: "#d1f1ee",
        yellownew: "#e4d63b",
        solitudy: "#e9e9ea",
        gray: "#4B4B4c"
      },
      animation: {
        slide: "slider 25s linear infinite"
      }, 
      keyframes: {
        slide: {
          "0%, 100%": {transform: "translateX(5%)"},
          "50%": {transform: "translateX(-120%)"}
        }
      }
      },
      // screens: {
      //   xs: "480x",
      //   sm: "768px",
      //   md: "1060px"
      // }
    },

  plugins: [],
}