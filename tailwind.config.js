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
        brand: {
          50: "var(--mantine-color-brand-0)",
          100: "var(--mantine-color-brand-1)",
          200: "var(--mantine-color-brand-2)",
          300: "var(--mantine-color-brand-3)",
          400: "var(--mantine-color-brand-4)",
          500: "var(--mantine-color-brand-5)",
          600: "var(--mantine-color-brand-6)",
          DEFAULT: "var(--mantine-color-brand-6)",
          700: "var(--mantine-color-brand-7)",
          800: "var(--mantine-color-brand-8)",
          900: "var(--mantine-color-brand-9)",
        },
        canvas: {
          50: "var(--mantine-color-canvas-0)",
          DEFAULT: "var(--mantine-color-canvas-0)",
          100: "var(--mantine-color-canvas-1)",
          200: "var(--mantine-color-canvas-2)",
          300: "var(--mantine-color-canvas-3)",
          400: "var(--mantine-color-canvas-4)",
          500: "var(--mantine-color-canvas-5)",
          600: "var(--mantine-color-canvas-6)",
          700: "var(--mantine-color-canvas-7)",
          800: "var(--mantine-color-canvas-8)",
          900: "var(--mantine-color-canvas-9)",
        },
      },
    },
  },
  plugins: [],
}

export default tailwindConfig
