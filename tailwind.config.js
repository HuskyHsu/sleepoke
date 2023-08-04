/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
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
        18: 'repeat(18, minmax(0, 1fr))',
        15: 'repeat(15, minmax(0, 1fr))',
        list: 'repeat(auto-fill, 8rem)',
        'list-mobile': 'repeat(auto-fill, 30%)',
      },
      boxShadow: {
        'list-items':
          'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
        'list-items--hover':
          'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 5px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px 0px 0px inset',
      },
    },
  },
  plugins: [],
};
