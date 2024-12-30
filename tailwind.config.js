import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "$mantine-breakpoint-xs",
      md: "$mantine-breakpoint-sm",
      lg: "$mantine-breakpoint-md",
      xl: "$mantine-breakpoint-lg",
      "2xl": "$mantine-breakpoint-xl",
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "deep-red": {
          50: "var(--mantine-color-deep-red-0)",
          100: "var(--mantine-color-deep-red-1)",
          200: "var(--mantine-color-deep-red-2)",
          300: "var(--mantine-color-deep-red-3)",
          400: "var(--mantine-color-deep-red-4)",
          500: "var(--mantine-color-deep-red-5)",
          600: "var(--mantine-color-deep-red-6)",
          700: "var(--mantine-color-deep-red-7)",
          800: "var(--mantine-color-deep-red-8)",
          900: "var(--mantine-color-deep-red-9)",
        },
      },
    },
  },
  plugins: [],
}

export default tailwindConfig
