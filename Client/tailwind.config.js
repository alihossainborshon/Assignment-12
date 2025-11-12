/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        dancing: ['"Dancing Script"', "cursive"],
        oleo: ['"Oleo Script"', "system-ui"],
        marcellus: ['"Marcellus"', "serif"],
      },
    },
  },
  plugins: [daisyui],
};
