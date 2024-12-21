/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: {
          lightest: '#F3E8FF',
          light: '#E9D5FF',
          DEFAULT: '#A855F7',
          dark: '#9333EA',
        },
        white: {
          pure: '#FFFFFF',
          soft: '#F8FAFC',
          muted: '#F1F5F9',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};