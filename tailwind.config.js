/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html", "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js", // Flowbite React uchun
    "./node_modules/flowbite/**/*.js", // Flowbite uchun
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
