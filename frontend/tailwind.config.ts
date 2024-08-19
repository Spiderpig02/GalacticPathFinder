import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        "ss-navy-blue": "#05445e",
        "ss-blue-green": "#75e6da",
        "wt-midnight-blue": "#41729f",
        "ss-baby-blue": "#d4f1f4",
        "t-white": "#f7f8f9",
        "ss-blue-grotto": "#189ab4",
        black: "#000000",
        "ml-dark-blue": "#0c2d48",
        "ss-blue-grotto-hover": "#0f7e9b",
      },
    },
  },
  plugins: [],
} satisfies Config;
