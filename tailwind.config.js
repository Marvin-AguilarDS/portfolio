/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Expedition 33 — Belle Époque, candlelit, painterly palette
        obscur: {
          void: '#05060a', // deepest background
          night: '#0a0d16', // panel background
          ink: '#12151f', // raised surface
          slate: '#1b2030',
          mist: '#2a3145',
        },
        gilt: {
          DEFAULT: '#e9c46a', // primary gold
          bright: '#f6e2a8',
          deep: '#c9a24a',
          ember: '#d98d4a', // warm amber
        },
        lumiere: {
          rose: '#c97b8e', // faded rose (the Paintress)
          teal: '#4f7d78', // muted expedition teal
          bone: '#e8e2d4', // parchment text
          ash: '#9aa0ad', // muted text
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['"EB Garamond"', 'Georgia', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '48%': { opacity: '0.92' },
          '50%': { opacity: '0.78' },
          '52%': { opacity: '0.95' },
          '70%': { opacity: '0.85' },
        },
        drift: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.5' },
          '100%': { transform: 'translateY(-110vh) translateX(40px)', opacity: '0' },
        },
        emberRise: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '15%': { opacity: '1' },
          '100%': { transform: 'translateY(-140px) scale(0.2)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.55' },
          '50%': { transform: 'scale(1.08)', opacity: '0.85' },
        },
        strokeReveal: {
          from: { strokeDashoffset: '1' },
          to: { strokeDashoffset: '0' },
        },
        eq: {
          '0%, 100%': { height: '3px' },
          '50%': { height: '12px' },
        },
      },
      animation: {
        flicker: 'flicker 6s ease-in-out infinite',
        drift: 'drift linear infinite',
        emberRise: 'emberRise ease-out infinite',
        shimmer: 'shimmer 5s linear infinite',
        breathe: 'breathe 7s ease-in-out infinite',
        eq: 'eq 0.9s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
