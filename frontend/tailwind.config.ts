import type { Config } from 'tailwindcss'

const { colors: defaultColors } = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')
  

const colors = {
  ...defaultColors,
  ...{
      "main": {
          "100": "#7D5CB5",
          "200" : "#D5C4F1",
      },
  },
}
 
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        ...colors,
        'custom-purple': '#7D5CB5',
        'custom-grey' : '#EFEFEF',
      },
      fontFamily: {
        'kanit': ['Kanit', 'sans-serif'],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }: { addUtilities: any }) {
      addUtilities({
        '.scrollbar-none': {
          '&::-webkit-scrollbar': {
            'display': 'none'
          }
        }
      })
    })
  ],
}
export default config
