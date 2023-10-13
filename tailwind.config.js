module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
    },
    extend: {
      fontFamily: {
        'round-gothic': ['var(--font-round-gothic)'],
      },
      colors: {
        primary: {
          light: '#884bdd',
          regular: '#5d10c9',
          dark: '#3d167f',
          DEFAULT: '#8224FE',
        },
        secondary: {
          black: '#000000',
          dark: '#545454',
          regular: '#707070',
          light: '#ABABAB',
          DEFAULT: '#707070',
        },
        accent: {
          light: '#FF6FA9',
          regular: '#ff3869',
          DEFAULT: '#FF4878',
        },
      },
      lineHeight: {
        hero: '4.5rem',
      },
    },
  },
  variants: {},
  plugins: ['tailwindcss-animated'],
};
