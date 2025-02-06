import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  
  ],
  theme: {
    extend: {
      colors: {
        //Example
        black: {
          DEFAULT: '#141115',
          100: '#181318',
          200: '#1B151A',
          300: '#22181E',
          400: '#301E26',
          500: '#4C2B36',
          600: '#2c272c',
          700: '#302b30',
          800: '#342f34',
          900: '#383338',
        },

        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
