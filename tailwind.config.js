/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ios: {
          background: '#000000',
          secondary: '#1C1C1E',
          tertiary: '#2C2C2E',
          blue: '#0A84FF',
          purple: '#5E5CE6',
          pink: '#FF2D55',
          green: '#30D158',
        }
      },
      backdropBlur: {
        'ios': '20px'
      }
    },
  },
  plugins: [],
};
