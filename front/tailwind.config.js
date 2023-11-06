/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      green: {
        buttonBg : '#248046',
        circleIcon: '#23a559',
        onlineCircle: '#23a55a'
      },
      white: {
        100: '#80848e',
        200: '#949ba4',
        300: '#b5bac1',
        400: '#dbdee1',
        500: '#f2f3f5',
        600: '#ffffff'
      },
      grey: {
        100: '#1e1f22',
        200: '#232428',
        300: '#2b2d31',
        400: '#313338',
        500: '#41434a',
        600: '#4e505899',
        700: '#4e50587a'
      },
      'red': '#f23f42',
      'black': '#000000',
      'blue': '#5865f2',
    },
    extend: {},
  },
  plugins: [],
}

