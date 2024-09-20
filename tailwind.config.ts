import animate from 'tailwindcss-animate'
import { withTV } from "tailwind-variants/transformer"

export default withTV({
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue'],
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontSize: {
        "2xs": ["0.625rem", "0.75rem"],
      },
      spacing: {
        'screen': '100vh'
      },
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
        error: {
          DEFAULT: "hsl(var(--error))",
          foreground: "hsl(var(--error-foreground))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },
        info: {
          DEFAULT: "hsl(var(--info))",
          foreground: "hsl(var(--info-foreground))",
        },
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
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
      backgroundColor: {
        background: "hsl(var(--background) / var(--tw-bg-opacity, 1))",
        foreground: "hsl(var(--foreground) / var(--tw-bg-opacity, 1))",
        primary: {
          DEFAULT: "hsl(var(--primary) / var(--tw-bg-opacity, 1))",
          foreground: "hsl(var(--primary-foreground) / var(--tw-bg-opacity, 1))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / var(--tw-bg-opacity, 1))",
          foreground: "hsl(var(--secondary-foreground)  / var(--tw-bg-opacity, 1))",
        },
        error: {
          DEFAULT: "hsl(var(--error)  / var(--tw-bg-opacity, 1))",
          foreground: "hsl(var(--error-foreground)  / var(--tw-bg-opacity, 1))",
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / var(--tw-bg-opacity, 1))",
          foreground: "hsl(var(--warning-foreground) / var(--tw-bg-opacity, 1))",
        },
        info: {
          DEFAULT: "hsl(var(--info) / var(--tw-bg-opacity, 1))",
          foreground: "hsl(var(--info-foreground) / var(--tw-bg-opacity, 1))",
        },
        success: {
          DEFAULT: "hsl(var(--success) / var(--tw-bg-opacity, 1))",
          foreground: "hsl(var(--success-foreground) / var(--tw-bg-opacity, 1))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / var(--tw-bg-opacity, 1))",
          foreground: "hsl(var(--muted-foreground) / var(--tw-bg-opacity, 1))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / var(--tw-bg-opacity, 1))",
          foreground: "hsl(var(--accent-foreground) / var(--tw-bg-opacity, 1))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / var(--tw-bg-opacity, 1))",
          foreground: "hsl(var(--popover-foreground) / var(--tw-bg-opacity, 1))",
        },
        card: {
          DEFAULT: "hsl(var(--card) / var(--tw-bg-opacity, 1))",
          foreground: "hsl(var(--card-foreground) / var(--tw-bg-opacity, 1))",
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "collapsible-down": {
          from: { height: "0" },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        "collapsible-up": {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: "0" },
        },
        "marquee": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
        "marquee": "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
    },
  },
  plugins: [animate],
})