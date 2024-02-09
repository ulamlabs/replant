/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      aspectRatio: {
        '3/4': '3 / 4',
      },
      fontFamily: { sans: ['Inter', ...defaultTheme.fontFamily.sans] },
      fontSize: {
        xxs: '0.625rem',
      },
    },
    colors: {
      white: colors.white,
      black: colors.black,
      transparent: colors.transparent,
      green: {
        400: '#2DE48C',
        200: '#D6FEA3',
      },
      teal: {
        900: '#1B3233',
        700: '#2E5B55',
        600: '#7B9C93',
      },
      red: { 400: '#FC5A5C', 200: '#FEA3A3', 100: '#FFE2E2' },
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
