const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        dark: 'rgba(var(--dark) / <alpha-value>)',
        secondary: 'rgba(var(--secondary) / <alpha-value>)',
        primary: 'rgba(var(--primary) / <alpha-value>)',
        "base-clr": 'rgba(var(--base-clr) / <alpha-value>)',
      },
      spacing: {
        'drawer-width': 'var(--drawer-width)',
        "navbar-height": 'var(--navbar-height)'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
