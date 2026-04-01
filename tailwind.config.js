/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",  
    "./src/**/*.{js,jsx,ts,tsx}",  
  ],
  theme: {
    extend: {
      colors: {
        rosa: {
          DEFAULT: '#fe2374',
          dark: '#7a0d35',
        },
        roxo: {
          100: '#6b0e47',
          200: '#fe2374',
          300: '#933370',
          400: '#a94784',
          500: '#490634', // base
          600: '#40042d',
          700: '#320229',
          800: '#23011f',
          900: '#130013',
        },
        dourado: {
          100: '#f6c45c',
          200: '#f7b62d',
          300: '#f7a21f',
          400: '#f78d1a',
          500: '#ffffff', 
          600: '#f2ab1a',// base
          700: '#d77a16',
          800: '#c76814',
          900: '#b45b12',
        },
      },
    },
  },
  plugins: [],
}
