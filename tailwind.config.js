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
        // Linear & VS Code inspired palette
        brand: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#ced9fd',
          300: '#a3b9fb',
          400: '#7291f7',
          500: '#4f6bf0', // Linear blue
          600: '#394ce4',
          700: '#2b38cb',
          800: '#262fa4',
          900: '#232b82',
          950: '#14184c',
        },
        dark: {
          bg: '#0c0e14',        // Deep obsidian background
          surface: '#12151f',   // VS code / Linear surface
          card: '#161a26',      // Card elevated surface
          cardHover: '#1c2233', // Hover state
          border: '#23293d',    // Subtle border
          borderLight: '#2f3752',
          text: '#f1f5f9',
          muted: '#94a3b8',
          subtle: '#64748b',
        },
        light: {
          bg: '#f8fafc',
          surface: '#ffffff',
          card: '#ffffff',
          cardHover: '#f1f5f9',
          border: '#e2e8f0',
          borderLight: '#cbd5e1',
          text: '#0f172a',
          muted: '#475569',
          subtle: '#94a3b8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(79, 107, 240, 0.25)',
        'glow-md': '0 0 25px -4px rgba(79, 107, 240, 0.35)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
