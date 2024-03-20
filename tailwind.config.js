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
        'suisse-intl': ['var(--font-suisse-intl)'],
        'halyard-display': ['var(--font-halyard-display)'],
        linotype: ['var(--font-linotype)'],
        'suisse-mono': ['var(--font-suisse-mono)'],
        'sb-sans': ['var(--font-sb-sans-display)'],
        'source-code-pro': ['var(--font-source-code-pro)'],
        'untitled-sans': ['var(--font-untitled-sans)'],
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
        rebrand: {
          blue: '#6052FF',
          indigo: '#4F46E5',
          purple: '#A638DA',
          secondary: '#7e1dac',
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
