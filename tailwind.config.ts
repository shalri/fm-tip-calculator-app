import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "tc-strong-cyan": "hsl(172, 67%, 45%)",
        "tc-cyan": "hsl(173, 61%, 76%)",
        "tc-very-dark-cyan": "hsl(183, 100%, 15%)",
        "tc-dark-grayish": "hsl(186, 14%, 43%)",
        "tc-grayish-cyan": "hsl(184, 14%, 56%)",
        "tc-light-grayish": "hsl(185, 41%, 84%)",
        "tc-very-light-grayish": "hsl(189, 41%, 97%)",
        "tc-white": "hsl(0, 0%, 100%)",
      },
      fontSize: {
        base: "24px",
      },
      fontFamily: {
        spacemono: ["Space Mono", "monospace"],
      },
      fontWeight: {
        normal: "700",
      },
      backgroundImage: {
        // "sample-bg": "/tsugini" // basepath of github pages
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
