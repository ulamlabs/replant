/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      white: colors.white,
      black: colors.black,
      green: {
        900: '#1B3233',
        700: '#2E5B55',
      },
      gray: {
        500: '#808080',
        300: '#4C4C4C',
        100: '#EAEAEA',
      },
    },
  },
  plugins: [],
};
