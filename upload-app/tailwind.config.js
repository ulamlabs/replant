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
        600: '#7B9C93',
        400: '#2DE48C',
      },
      red: { 400: '#FC5A5C' },
      blue: { 400: '#3683D2' },
      brown: { 400: '#C7AA94' },
      gray: {
        500: '#808080',
        150: '#DCDCDC',
        100: '#EAEAEA',
        50: '#F6F6F6',
      },
    },
  },
  plugins: [],
};
