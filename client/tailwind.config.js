/** @type {import('tailwindcss').Config} */
const tailwind = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    // add "./app/**/*.{js,jsx,ts,tsx}" if you later use the App Router
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A", // deep blue
        accent: "#FBBF24",  // golden yellow
      },
    },
  },
  plugins: [],
};

export default tailwind;