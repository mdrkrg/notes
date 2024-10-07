# Markdown Extension Examples

This page demonstrates some of the built-in markdown extensions provided by VitePress.

## Syntax Highlighting

VitePress provides Syntax Highlighting powered by [Shiki](https://github.com/shikijs/shiki), with additional features like line-highlighting:

**Input**

````md
```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```
````

**Output**

```js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```

## Desmos Graphs

[My project](https://github.com/mdrkrg/vite-plugin-desmos)

```desmos-graph
left=-0.1;right=0.1
top=0.1;bottom=-0.1
---
f(x)=\abs(x)*{\sin(1/x)}
```

## Custom Containers

**Input**

```md
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::
```

**Output**

::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger
This is a dangerous warning.
:::

::: details
This is a details block.
:::

The following uses `markdown-it-obsidian-callout`, and I have [my own contributions](https://github.com/ebullient/markdown-it-obsidian-callouts/pull/62)

> [!example]+ **This is an example**
> I'm hidden!

> [!summary]- ***This is a summary***
> Oh now you see me
> > [!info]- This is an info
> > I'm even more hidden

> [!example] ==With `markdown-it-mark` (plugin aware)==

> [!NOTE]+
> Hello World!
> ~~~ad-warning
> title: a warning
> This is a nested warning callout
> ~~~

> [!summary] This is a summary without details
> I'm a plain callout

## More

Check out the documentation for the [full list of markdown extensions](https://vitepress.dev/guide/markdown).
