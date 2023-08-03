/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        list: 'repeat(auto-fill, 8rem)',
        'list-mobile': 'repeat(auto-fill, 25%)',
      },
    },
  },
  plugins: [],
};
