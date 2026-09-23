/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FBF7F2",
        beige: "#E8DCC8",
        lavender: {
          50: "#F7F1FB",
          100: "#EDE0F7",
          200: "#E8D5F2",
          300: "#C9A8E0",
          400: "#B388D4",
          500: "#9D4EDD",
        },
        rose: {
          100: "#F6E4E6",
          200: "#E8B4B8",
          300: "#D4A5A5",
          400: "#C98B90",
        },
        mint: {
          100: "#E8F6F1",
          200: "#B8E0D2",
          300: "#8FCBB8",
        },
        neon: {
          pink: "#FF6B9D",
          purple: "#C77DFF",
        },
        ink: "#2A2230",
        mute: "#6B5F70",
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        sans: ["Outfit", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 18px 50px -20px rgba(157, 78, 221, 0.28)",
        card: "0 12px 40px -16px rgba(42, 34, 48, 0.18)",
      },
      backgroundImage: {
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
