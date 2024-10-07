// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    formatters: true,
    typescript: true,
    rules: {
      'style/eol-last': ['error', 'always'],
    },
  },
  {
    files: ['**/nav.ts'],
    rules: {
      'antfu/no-top-level-await': ['off'],
    },
  },
  {
    ignores: ['.vitepress/dist/*', '.vitepress/cache/*', '**/*.md'],
  },
)
