/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0a0d14',
        foreground: '#f1f5f9',
        card: '#101522',
        'card-hover': '#161d2e',
        border: '#1e293b',
        muted: '#1e293b',
        'muted-foreground': '#94a3b8',
        accent: '#1e293b',
        'accent-foreground': '#f8fafc',
        primary: {
          DEFAULT: '#38bdf8', // Solana Cyan
          foreground: '#090d16',
        },
        brand: {
          DEFAULT: '#818cf8', // Raydium Indigo / Violet
          foreground: '#ffffff',
        },
        magenta: {
          DEFAULT: '#f43f5e',
          foreground: '#ffffff',
        },
        ember: {
          DEFAULT: '#fb923c',
          foreground: '#ffffff',
        },
        highlight: '#10b981', // green pulse
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'spin-reverse': 'spin-reverse 25s linear infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        }
      }
    },
  },
  plugins: [],
}
