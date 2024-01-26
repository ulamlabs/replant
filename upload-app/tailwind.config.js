/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      white: colors.white,
      black: colors.black,
      transparent: colors.transparent,
      green: {
        400: '#2DE48C',
      },
      teal: {
        900: '#1B3233',
        700: '#2E5B55',
        600: '#7B9C93',
      },
      red: { 400: '#FC5A5C' },
      blue: { 400: '#3683D2' },
      bisque: { 400: '#C7AA94' },
      gray: {
        500: '#808080',
        200: '#DCDCDC',
        100: '#EAEAEA',
        50: '#F6F6F6',
      },
    },
  },
  plugins: [],
};
