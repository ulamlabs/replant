/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      green: {
        900: '#1B3233',
        700: '#2E5B55',
      },
      gray: {
        800: '#808080',
        500: '#4C4C4C',
        100: '#EAEAEA',
      },
    },
  },
  plugins: [],
};
