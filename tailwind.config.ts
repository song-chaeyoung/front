import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeOut: "fadeOut 0.5s ease-in-out 2.5s forwards",
        spin: "spin 0.5s cubic-bezier(0.42, 0, 0.58, 1)",
      },
    },
  },
} satisfies Config;