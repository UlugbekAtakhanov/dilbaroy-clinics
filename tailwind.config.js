/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cblue: "#05D3E4",
        cred: "#FD3D57",
        black: "#2B2D42",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}