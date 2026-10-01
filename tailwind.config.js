/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#e9fbf3', 100: '#c8f4e0', 200: '#96e8c3', 300: '#5fd6a4',
          400: '#2fc086', 500: '#16a672', 600: '#0f8a5f', 700: '#0d6e4d',
          800: '#0c5840', 900: '#0a4534', 950: '#052a20',
        },
        ink: {
          50: '#f5f6f7', 100: '#e6e8ea', 200: '#c7ccd1', 300: '#9aa2ab',
          400: '#6b7480', 500: '#4d5560', 600: '#3a404a', 700: '#2c313a',
          800: '#1a1f26', 900: '#12161b', 950: '#0a0d11',
        },
      },
      boxShadow: {
        soft: '0 1px 2px rgba(10,20,15,0.06), 0 10px 28px -14px rgba(10,20,15,0.25)',
      },
    },
  },
  plugins: [],
}
