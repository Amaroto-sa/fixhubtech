import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./features/**/*.{ts,tsx}",
        "./lib/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                // Brand colors
                brand: {
                    indigo: "#6366f1",
                    cyan: "#06b6d4",
                    violet: "#8b5cf6",
                    navy: "#0f172a",
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-outfit)", "system-ui", "sans-serif"],
            },
            keyframes: {
                "fade-in": {
                    "0%": { opacity: "0", transform: "translateY(16px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "slide-up": {
                    "0%": { opacity: "0", transform: "translateY(24px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "glow-pulse": {
                    "0%, 100%": { opacity: "0.4" },
                    "50%": { opacity: "0.8" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
            },
            animation: {
                "fade-in": "fade-in 0.6s ease-out forwards",
                "slide-up": "slide-up 0.8s ease-out forwards",
                "glow-pulse": "glow-pulse 3s ease-in-out infinite",
                shimmer: "shimmer 2s ease-in-out infinite",
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "hero-glow":
                    "radial-gradient(ellipse at center top, rgba(99,102,241,0.15), transparent 60%)",
                "card-glow":
                    "radial-gradient(ellipse at center, rgba(99,102,241,0.08), transparent 70%)",
            },
            maxWidth: {
                container: "1400px",
            },
        },
    },
    plugins: [],
};

export default config;
