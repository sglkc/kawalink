import { defineConfig, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        mci: () => import('@iconify-json/mingcute/icons.json').then(i => i.default)
      },
      warn: true,
    })
  ],
  shortcuts: {
    'bg-base': 'bg-white dark:bg-black',
    'text-base': 'text-gray-900 dark:text-gray-300',
    'b-base': 'b-black dark:border-white',
    'colors-primary': 'bg-black text-white dark:bg-white dark:text-black',
    'colors-secondary': 'bg-white text-black dark:bg-black dark:text-white',
    'color-primary': 'bg-primary text-fg',
    'color-secondary': 'bg-secondary text-fg',
    'color-accent': 'bg-accent text-fg'
  },
  theme: {
    fontFamily: {
      body: '"Sora Variable", sans-serif',
    },
    boxShadow: {
      base: '4px 4px',
      sm: '8px 8px',
      md: '16px 16px'
    },
    colors: {
      primary: '#759893',
      secondary: '#c7b4bd',
      accent: '#b0a094',
      bg: '#fcfdfc',
      fg: '#0e1312',
      success: '',
      info: '',
      warn: '',
      error: ''
    }
  },
  variants: [
    (matcher) => {
      if (!matcher.startsWith('on:')) return matcher
      return {
        matcher: matcher.slice(3),
        selector: s => `${s}:hover, ${s}:focus`,
      }
    },
  ],
})
