const plugin = require('tailwindcss/plugin');
import { twComponents } from './src/ui/styles/components';
import { twUtilities } from './src/ui/styles/utilities';


/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{tsx,ts}', './src/*.{tsx,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          1: 'hsl(var(--primary_color) / 1)',
          DEFAULT: 'hsl(var(--primary_color) / <alpha-value>)',
        },
        secondary: {
          1: 'hsl(var(--secondary_color) / 1)',
          DEFAULT: 'hsl(var(--secondary_color) / <alpha-value>)',
        },
        txtColor: {
          main: 'hsl(var(--text_color) / <alpha-value>)',
        },
        accent: {
          1: 'hsl(var(--accent) / 1)',
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
        },
      },
      backgroundImage: {
        'loading': 'url("/loading.svg")'
      },
      fontFamily: {
        main: 'var(--main_font)',
        secondary: 'var(--secondary_font)',
      },
    },
  },
  plugins: [plugin(twComponents), plugin(twUtilities), require('tailwindcss-animate'), require('tailwind-scrollbar')({ nocompatible: true })],
};
