/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#3B82F6',
          cyan: '#06B6D4',
          indigo: '#6366F1',
          slate: '#0F172A',
        },
        surface: {
          DEFAULT: '#F8FAFC',
          subtle: '#E2E8F0',
          dark: '#020617',
          accent: '#1E293B',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 15px 35px -15px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
}

