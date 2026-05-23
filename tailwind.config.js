/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 20px 60px rgba(42, 31, 9, 0.10)",
      },
      colors: {
        party: {
          ink: "#211B12",
          amber: "#FFB12A",
          coral: "#FF6B4A",
          grape: "#7C3AED",
          mint: "#12B886",
        },
      },
    },
  },
  plugins: [],
};
