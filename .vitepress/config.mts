import { defineConfig } from 'vitepress'
import { BiDirectionalLinks } from '@nolebase/markdown-it-bi-directional-links'
import {
  InlineLinkPreviewElementTransform
} from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'
import Mark from 'markdown-it-mark'
import Callout from 'markdown-it-obsidian-callouts'
import { withMermaid } from 'vitepress-plugin-mermaid'
import { sidebar } from '../constants/nav'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Kurage Notes",
  description: "A static site to showcase my notes.",
  base: '/notes/',
  markdown: {
    math: true,
    config: (md) => {
      md.use(BiDirectionalLinks())
      md.use(InlineLinkPreviewElementTransform)
      md.use(Mark)
      md.use(Callout)
    },
  },
  vite: {
    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-inline-link-preview/client',
      ],
    },
    ssr: {
      noExternal: [
        // If there are other packages that need to be processed by Vite, you can add them here.
        '@nolebase/vitepress-plugin-inline-link-preview',
      ],
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Table of Contents', link: '/pages/toc' },
      { text: 'Examples', link: '/pages/markdown-examples' }
    ],

    // TODO: Consider adding script to compose sidebar items
    sidebar: sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mdrkrg' }
    ]
  }
})
