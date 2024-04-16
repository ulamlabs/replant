/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
    colors: {
      white: colors.white,
      black: colors.black,
      transparent: colors.transparent,
      teal: {
        900: '#1b3233',
        800: '#1C2F28',
        700: '#2a4546',
        650: '#6E8683',
        600: '#3C7A64',
        500: '#499A7D',
        400: '#97B6AB',
        300: '#daece6',
        200: '#E2EDDC',
        100: '#E8F3E1',
      },
      green: {
        900: '#1D3E32',
        600: '#499A7D',
        400: '#4C5E41',
        300: '#C5D8D9',
        100: '#F7FAF4',
      },
      gray: {
        200: '#ECECEC',
      },
      neutral: {
        900: '#151515',
        850: '#191919',
        800: '#151D0C',
        750: '#212121',
        700: '#363636',
        400: '#A5A6A6',
        100: '#F7F7F7',
        50: '#FAFAFA',
      },
      zinc: {
        100: '#F3F3F3',
        400: '#AEAEAE',
        500: '#7F7F7F',
        600: '#626262',
        800: '#2A2A2A',
      },
      stone: {
        50: '#F9F9F9',
        100: '#EEF2EB',
        300: '#C9C9C9',
        400: '#9CA7A3',
        900: '#1E1E1E',
      },
      emerald: {
        500: '#04A46A',
        600: '#218D66',
      },
      red: {
        800: '#9F3737',
        400: '#EC7B7B',
        50: '#FFF8F8',
      },
      yellow: {
        800: '#745C2D',
        50: '#FFF7E7',
      },
      sky: {
        600: '#3C4868',
        100: '#E5F6FF',
      },
    },
  },
  plugins: [],
};
