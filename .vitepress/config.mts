import { defineConfig } from 'vitepress'
import { BiDirectionalLinks } from '@nolebase/markdown-it-bi-directional-links'
import {
  InlineLinkPreviewElementTransform
} from '@nolebase/vitepress-plugin-inline-link-preview/markdown-it'
import Mark from 'markdown-it-mark'
import { withMermaid } from 'vitepress-plugin-mermaid'

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
      { text: 'Table of Contents', link: '/toc' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    // TODO: Consider adding script to compose sidebar items
    sidebar: [
      {
        text: 'CS61C',
        link: '/coding/cs61c/info',
        collapsed: true,
        items: [
          {
            text: 'C',
            items: [
              { text: 'Intro to C', link: '/coding/cs61c/src/c/Intro to C' },
              { text: 'Generics', link: '/coding/cs61c/src/c/Generics' },
              { text: 'Memory Management', link: '/coding/cs61c/src/c/Memory Management' },
              { text: 'GDB Cheetsheet', link: '/coding/cs61c/src/c/GDB Cheetsheet' },
            ],
          },
          {
            text: 'RISC-V',
            items: [
              { text: 'Intro to RISC-V', link: '/coding/cs61c/src/riscv/Intro to RISC-V' },
              { text: 'RISC-V Instructions', link: '/coding/cs61c/src/riscv/RISC-V Instructions' },
              { text: 'RISC-V Instruction Format', link: '/coding/cs61c/src/riscv/RISC-V Instruction Format' },
              { text: 'RISC-V Procedures', link: '/coding/cs61c/src/riscv/RISC-V Procedures' },
              { text: 'CALL', link: '/coding/cs61c/src/riscv/CALL' },
            ],
          },
          {
            text: 'CPU',
            items: [
              { text: 'Design Hierarchy', link: '/coding/cs61c/src/cpu/Design Hierarchy' },
              { text: 'Combinational Logic', link: '/coding/cs61c/src/cpu/Combinational Logic' },
              { text: 'Combinational Logic Blocks', link: '/coding/cs61c/src/cpu/Combinational Logic Blocks' },
              { text: 'State', link: '/coding/cs61c/src/cpu/State' },
              { text: 'Synchronous Digital System', link: '/coding/cs61c/src/cpu/Synchronous Digital System' },
              { text: 'Single-Cycle Datapath', link: '/coding/cs61c/src/cpu/Single-Cycle Datapath' },
              { text: 'Single-Cycle Control', link: '/coding/cs61c/src/cpu/Single-Cycle Control' },
              { text: 'Pipelining', link: '/coding/cs61c/src/cpu/Pipelining' },
              { text: 'Performance', link: '/coding/cs61c/src/cpu/Performance' },
            ],
          },
          {
            text: 'Performance',
            items: [
              { text: 'Caches', link: '/coding/cs61c/src/performance/Caches' },
              { text: 'Data-Level Parallelism (DLP)', link: '/coding/cs61c/src/performance/Data-Level Parallelism (DLP)' },
              { text: 'Measuring Performance', link: '/coding/cs61c/src/performance/Measuring Performance' },
              { text: 'Parallelism', link: '/coding/cs61c/src/performance/Parallelism' },
              { text: 'Virtual Memory and OS', link: '/coding/cs61c/src/performance/Virtual Memory and OS' },
            ],
          }
        ]
      },
      {
        text: 'Nand to Tetris',
        link: '/coding/nand2tetris/info',
        items: [
          { text: 'Boolean Logic', link: '/coding/nand2tetris/src/1.1 Boolean Logic' },
          { text: 'Logic Gates', link: '/coding/nand2tetris/src/1.3 Logic Gates' },
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/mdrkrg' }
    ]
  }
})
