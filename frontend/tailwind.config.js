/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom-max': {'max': '500px'},
        'custom-min': '501px'
      }
    },
  },
  plugins: [],
}

