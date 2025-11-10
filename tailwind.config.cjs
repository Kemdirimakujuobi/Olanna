/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          surface: '#fafafa',
          primary: '#ffffff',
        },
        text: {
          primary: '#0a0a0a',
          secondary: '#737373',
          muted: '#a3a3a3',
        },
        border: {
          DEFAULT: 'rgba(5,5,5,0.07)',
          subtle: '#f1f1f1',
        },
        alpha: {
          soft: 'rgba(5,5,5,0.04)',
          ring: 'rgba(20,20,20,0.11)',
        },
        accent: {
          blue: '#1a88f8',
          red: '#ff1c1c',
          orange: '#f5a524',
          green: '#32d583',
        },
        grayscale: {
          200: '#e5e5e5',
          400: '#a3a3a3',
          500: '#737373',
          950: '#0a0a0a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter Display', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0px 0px 0px 1px rgba(0,0,0,0.06), 0px 3px 3px 0px rgba(0,0,0,0.04), 0px 8px 16px 0px rgba(0,0,0,0.04)',
      },
      borderRadius: {
        'lg-plus': '16px',
      },
      spacing: {
        xs: '8px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0px' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
};
