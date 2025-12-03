/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'ar-bg': '#0A2239',
        'ar-accent': '#00C8FF',
        'ar-card': '#122F4F',
      },
      boxShadow: {
        chat: '0 12px 40px rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

