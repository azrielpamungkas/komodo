<<<<<<< HEAD
<<<<<<< HEAD
const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
=======
=======
>>>>>>> 24d294d8680d4fb6f8e04b85973df0daef54c8b8
//<<<<<<< sindu/ui-admin
import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
//=======
import type { Config } from "tailwindcss";
const config: Config = {
//>>>>>>> master
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
<<<<<<< HEAD
>>>>>>> 26bfa669244240e50331d915ff4ce68c4abd0c62
=======
>>>>>>> 24d294d8680d4fb6f8e04b85973df0daef54c8b8
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
<<<<<<< HEAD
<<<<<<< HEAD
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        xl: `calc(var(--radius) + 4px)`,
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        // mono: ["var(--font-mono)", ...fontFamily.mono],
      },
=======
      },
    },
    extend: {
=======
      },
    },
    extend: {
>>>>>>> 24d294d8680d4fb6f8e04b85973df0daef54c8b8
//<<<<<<< sindu/ui-admin
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
//=======
      
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.10)",
          "0 0px 65px rgba(255, 255,255, 0.15)",
        ],
//>>>>>>> master
      },
<<<<<<< HEAD
>>>>>>> 26bfa669244240e50331d915ff4ce68c4abd0c62
=======
>>>>>>> 24d294d8680d4fb6f8e04b85973df0daef54c8b8
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
<<<<<<< HEAD
<<<<<<< HEAD
  plugins: [require("tailwindcss-animate")],
}
=======
=======
>>>>>>> 24d294d8680d4fb6f8e04b85973df0daef54c8b8
//<<<<<<< sindu/ui-admin
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
//=======
  plugins: [],
};
export default config;
//>>>>>>> master
<<<<<<< HEAD
>>>>>>> 26bfa669244240e50331d915ff4ce68c4abd0c62
=======
>>>>>>> 24d294d8680d4fb6f8e04b85973df0daef54c8b8
