import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        purple: "#633CFF",
        "purple-hover": "#BEADFF",
        "light-purple": "#EFEBFF",
        dark: "#333333",
        gray: "#737373",
        "light-gray": "#D9D9D9",
        "dark-white": "#FAFAFA",
        red: "#FF3939",
      },
      backgroundColor: {
        github: "#1A1A1A",
        "dev.to": "#333",
        frontendmentor: "#D9D9D9",
        codewars: "#8A1A50",
        twitter: "#43B7E9",
        freecodecamp: "#302267",
        linkedin: "#2D68FF",
        gitlab: "#EB4925",
        youtube: "#EE3939",
        hashnode: "#0330D1",
        facebook: "#2442AC",
        stackoverflow: "#EC7100",
        twitch: "#EE3FC8",
      },
    },
  },
  safelist: [
    "github",
    "dev.to",
    "frontendmentor",
    "codewars",
    "twitter",
    "freecodecamp",
    "linkedin",
    "gitlab",
    "youtube",
    "hashnode",
    "facebook",
    "stackoverflow",
    "twitch",
  ],
};
export default config;
