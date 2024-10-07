import type { DefaultTheme } from 'vitepress'
import { getNavItems, noteRootDir } from '../composables/files'

// TODO: come up with alternative ways to sort files

/**
 * Sidebar option for vitepress defineConfig
 */
export const sidebar: DefaultTheme.Sidebar = [
  {
    text: 'Development Notes',
    link: '/pages/devnotes/info',
    items: [
      {
        text: 'Web Stuff, etc.',
        items: await getNavItems('/devnotes/typescript/'),
      }
    ]
  },
  {
    text: 'Computer Science & Software Engineering',
    items: [
      {
        text: 'CS61A: Structure and Interpretation of Computer Programs',
        link: '/pages/coding/cs61a/info',
        collapsed: true,
        items: [
          {
            text: 'Python',
            collapsed: true,
            items: await getNavItems('/coding/cs61a/src/python'),
          },
          {
            text: 'Programming Ideas',
            collapsed: true,
            items: await getNavItems('/coding/cs61a/src/programming'),
          },
          {
            text: 'Object Oriented Programming',
            collapsed: true,
            items: await getNavItems('/coding/cs61a/src/oop'),
          },
          {
            text: 'Data Structures',
            collapsed: true,
            items: await getNavItems('/coding/cs61a/src/ds'),
          },
          {
            text: 'Scheme',
            collapsed: true,
            items: await getNavItems('/coding/cs61a/src/scheme'),
          },
          {
            text: 'Labs and HW Reflection',
            collapsed: true,
            items: await getNavItems('/coding/cs61a/src/labs'),
          },
        ]
      },
      {
        text: 'CS106B: Programming Abstractions in C++',
        link: '/pages/coding/cs106b/info',
        collapsed: true,
        items: await getNavItems('/coding/cs106b/src/'),
      },
      {
        text: 'CS61B: Data Structures and Algorightm',
        link: '/pages/coding/cs61b/info',
        collapsed: true,
        items: [
          {
            text: 'Java',
            collapsed: true,
            items: await getNavItems('/coding/cs61b/src/java/'),
          },
          {
            text: 'OOP',
            collapsed: true,
            items: await getNavItems('/coding/cs61b/src/oop/'),
          },
          {
            text: 'Data Structures',
            collapsed: true,
            items: await getNavItems('/coding/cs61b/src/ds/'),
          },
          {
            text: 'Project Reflection',
            collapsed: true,
            items: await getNavItems('/coding/cs61b/src/review/'),
          },
        ]
      },
      {
        text: 'CS61C: Machine Structure in C and RISC-V',
        link: '/pages/coding/cs61c/info',
        collapsed: true,
        items: [
          {
            text: 'C',
            collapsed: true,
            items: [
              { text: 'Intro to C', link: '/pages/coding/cs61c/src/c/Intro to C' },
              { text: 'Generics', link: '/pages/coding/cs61c/src/c/Generics' },
              { text: 'Memory Management', link: '/pages/coding/cs61c/src/c/Memory Management' },
              { text: 'GDB Cheetsheet', link: '/pages/coding/cs61c/src/c/GDB Cheetsheet' },
            ],
          },
          {
            text: 'RISC-V',
            collapsed: true,
            items: [
              { text: 'Intro to RISC-V', link: '/pages/coding/cs61c/src/riscv/Intro to RISC-V' },
              { text: 'RISC-V Instructions', link: '/pages/coding/cs61c/src/riscv/RISC-V Instructions' },
              { text: 'RISC-V Instruction Format', link: '/pages/coding/cs61c/src/riscv/RISC-V Instruction Format' },
              { text: 'RISC-V Procedures', link: '/pages/coding/cs61c/src/riscv/RISC-V Procedures' },
              { text: 'CALL', link: '/pages/coding/cs61c/src/riscv/CALL' },
            ],
          },
          {
            text: 'CPU',
            collapsed: true,
            items: [
              { text: 'Design Hierarchy', link: '/pages/coding/cs61c/src/cpu/Design Hierarchy' },
              { text: 'Combinational Logic', link: '/pages/coding/cs61c/src/cpu/Combinational Logic' },
              { text: 'Combinational Logic Blocks', link: '/pages/coding/cs61c/src/cpu/Combinational Logic Blocks' },
              { text: 'State', link: '/pages/coding/cs61c/src/cpu/State' },
              { text: 'Synchronous Digital System', link: '/pages/coding/cs61c/src/cpu/Synchronous Digital System' },
              { text: 'Single-Cycle Datapath', link: '/pages/coding/cs61c/src/cpu/Single-Cycle Datapath' },
              { text: 'Single-Cycle Control', link: '/pages/coding/cs61c/src/cpu/Single-Cycle Control' },
              { text: 'Pipelining', link: '/pages/coding/cs61c/src/cpu/Pipelining' },
              { text: 'Performance', link: '/pages/coding/cs61c/src/cpu/Performance' },
            ],
          },
          {
            text: 'Performance',
            collapsed: true,
            items: [
              { text: 'Caches', link: '/pages/coding/cs61c/src/performance/Caches' },
              { text: 'Data-Level Parallelism (DLP)', link: '/pages/coding/cs61c/src/performance/Data-Level Parallelism (DLP)' },
              { text: 'Measuring Performance', link: '/pages/coding/cs61c/src/performance/Measuring Performance' },
              { text: 'Parallelism', link: '/pages/coding/cs61c/src/performance/Parallelism' },
              { text: 'Virtual Memory and OS', link: '/pages/coding/cs61c/src/performance/Virtual Memory and OS' },
            ],
          }
        ]
      },
      {
        text: 'C',
        collapsed: true,
        items: await getNavItems('/coding/c'),
      },
      // {
      //   text: 'Nand to Tetris',
      //   collapsed: true,
      //   link: '/pages/coding/nand2tetris/info',
      //   items: await getNavItems('/coding/nand2tetris/src/')
      // },
    ]
  },
  {
    text: 'Math',
    items: [
      {
        text: 'Calculus I',
        link: '/pages/math/calculus1/info',
        collapsed: true,
        items: await getNavItems('/math/calculus1/src/')
      },
      {
        text: 'Calculus II',
        link: '/pages/math/calculus2/info',
        collapsed: true,
        items: await getNavItems('/math/calculus2/src/')
      },
      {
        text: 'Probability and Statistics',
        link: '/pages/math/probability/info',
        collapsed: true,
        items: await getNavItems('/math/probability/src/')
      },
    ],
  },
  {
    text: 'Examples',
    items: [
      { text: 'Markdown Examples', link: '/pages/markdown-examples' },
      { text: 'Runtime API Examples', link: '/pages/api-examples' }
    ]
  },
]
