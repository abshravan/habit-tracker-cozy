/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cozy: {
          cream: '#FFF8F0',
          peach: '#FFE5D9',
          sage: '#B8C5B3',
          terracotta: '#D4A59A',
          sand: '#E8DCC4',
          brown: '#8B6F47',
          darkBrown: '#5C4033',
          warmGray: '#AFA8A0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
