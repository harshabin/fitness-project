/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#070A0E',
        surface: {
          DEFAULT: '#0E131C',
          muted: '#131B27',
          border: '#1E293B',
          hover: '#1B2433'
        },
        crimson: {
          DEFAULT: '#FF2A4B',
          glow: 'rgba(255, 42, 75, 0.35)',
          dark: '#B8132C'
        },
        cyan: {
          DEFAULT: '#00F0FF',
          glow: 'rgba(0, 240, 255, 0.35)',
          dark: '#009099'
        },
        emerald: {
          DEFAULT: '#00E676',
          glow: 'rgba(0, 230, 118, 0.35)'
        },
        amber: {
          DEFAULT: '#FFB800',
          glow: 'rgba(255, 184, 0, 0.35)'
        }
      },
      boxShadow: {
        'glow-crimson': '0 0 25px -3px rgba(255, 42, 75, 0.4)',
        'glow-cyan': '0 0 25px -3px rgba(0, 240, 255, 0.4)',
        'glow-emerald': '0 0 25px -3px rgba(0, 230, 118, 0.4)',
        'card-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' }
        }
      }
    },
  },
  plugins: [],
}
