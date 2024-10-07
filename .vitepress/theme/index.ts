import type { Theme } from 'vitepress'
import {
  NolebaseInlineLinkPreviewPlugin,
} from '@nolebase/vitepress-plugin-inline-link-preview/client'
import DefaultTheme from 'vitepress/theme'
// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import './style.css'
import './callout.scss'

import '@nolebase/vitepress-plugin-inline-link-preview/client/style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app /* , router, siteData */ }) {
    app.use(NolebaseInlineLinkPreviewPlugin)
  },
} satisfies Theme
