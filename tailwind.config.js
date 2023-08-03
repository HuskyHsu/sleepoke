/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/types/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        type: {
          bug: '#A2A329',
          dark: '#4E4646',
          dragon: '#5871BD',
          electric: '#E2BE2A',
          fairy: '#E28EE3',
          fighting: '#E39423',
          fire: '#E5633F',
          flying: '#77AFD4',
          ghost: '#6C456E',
          grass: '#49983A',
          ground: '#A6753B',
          ice: '#4CCBC8',
          normal: '#848383',
          poison: '#9556CB',
          psychic: '#EA708A',
          rock: '#AFA781',
          steel: '#6EB0C7',
          water: '#339DDF',
        },
      },
      gridTemplateColumns: {
        list: 'repeat(auto-fill, 8rem)',
        'list-mobile': 'repeat(auto-fill, 30%)',
      },
    },
  },
  plugins: [],
};
