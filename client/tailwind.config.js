/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ebony': '#17181f',
        'madison': '#0b3460',
        'downRiver': '#283046',
        'lavenderBlush': '#F5E6E8',
        'maastrichtBlue': '#001f3f',
        'hoverMaastrichtBlue': '#02305f',
      },
      spacing: {
        '450': '450px',
        '100': '100px',
        '20': '20px',
        '15': '15px',
        '30': '30px',
      },
      borderRadius: {
        'lg': '0.5rem', // Default large border radius
      },
      boxShadow: {
        'lg': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
};
