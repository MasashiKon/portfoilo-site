import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "english-violet": "#442B48",
        "dim-gray": "#726E60",
        "olivine": "#98B06F",
        "yellow-green": "#B6DC76",
        "mindaro": "#DBFF76",
        "yellow-green-con": "#9C76DC",
      },
    },
  },
  plugins: [],
};
export default config;
