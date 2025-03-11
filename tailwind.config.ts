
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
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
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#6366F1", // Indigo
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#A855F7", // Purple
          foreground: "#FFFFFF",
        },
        success: {
          DEFAULT: "#10B981", // Emerald
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#F5F7FA",
          foreground: "#64748B",
        },
        accent: {
          DEFAULT: "#F59E0B", // Amber
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
      },
      boxShadow: {
        card: "0px 4px 20px rgba(0, 0, 0, 0.05)",
        dropdown: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      },
      keyframes: {
        slideIn: {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        }
      },
      animation: {
        slideIn: "slideIn 0.3s ease-out",
        fadeIn: "fadeIn 0.4s ease-out",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
