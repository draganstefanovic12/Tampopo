/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./features/**/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        btn: "var(--btn-color)",
        fontMain: "var(--font-main)",
        fontGrey: "var(--font-secondary)",
      },
      backgroundImage: {
        anilist: "url(`/public/anilist.svg`)",
        mangadex: "url(`/public/mangadex.jpg`)",
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
  ],
};
