# Making Plugins for Markdown-It

I'm recently trying making my initial contributions to Markdown-It plugins, as I discovered some of the extensions and utilities from Obsidian are not supported when I'm building my own note site.

Some useful notes:
- Documentation: https://markdown-it.github.io/markdown-it/
- Dev info: https://github.com/markdown-it/markdown-it/tree/master/docs
- Architecture: https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md

## Making *Plugin-Aware* Plugins

This took place when I'm trying to make Callout titles rendered inline as Markdown syntax.

Initially I wrote inside `getTitle`:
```ts
// This is part of plugin 'markdown-it-obsidian-callout'
function getTitle(token: Token) {
  const title = token.attrGet('data-callout-title');
  const md = MarkdownIt();
  if (title) {
    return md.renderInline(title.trim());
  }
  // ...
}
```

However, obviously this `md` instance won't inherit any of the plugins I've installed in the configuration of the client side (my site).

The solution is simple:
```ts
function getTitle(token: Token, md: MarkdownIt) {
  const title = token.attrGet('data-callout-title');
  if (title) {
    return md.renderInline(title.trim());
  }
  // ...
}
```

Here's why:

The instance of `MarkdownIt` will be passed to module's `index.ts`'s `export default` function, when `md.use(Plugin)` is being called (at least I think it is implemented with such callback hook), which can then be passed to internal functions.

```ts hl:10,22-24
// in src/index.ts
import MarkdownIt from 'markdown-it';

export default mdItPlugin(
  md: MarkdownIt,
  options: MdItPluginOptions = {}
) {
  md.renderer.custom_open = function(tokens, idx) {
      const token = tokens[idx];
      return customRenderer(token, md, options);
  }
}

// in src/renderer.ts
import MarkdownIt, { Token } from 'markdown-it';

export function customRenderer(
  token: Token,
  md: MarkdownIt,
  options: MdItPluginOptions = {}
): string {
  // This instance of md will have
  // the context of all registered plugins!
  return md.renderInline(token.content);
}
```

This enables the plugin to be **plugin aware**, that is, any plugins installed with this plugin concurrently, can be applied to the `md` instance. Instead of the plugin performing all rendering independently, it leverages the `MarkdownIt` instance passed to it during the `md.use()` call.

Example
```ts hl:7-10
// In client side
import MarkdownIt from 'markdown-it';
import MyPlugin from 'markdown-it-my-plugin';
import Mark from 'markdown-it-mark';

const md = MarkdownIt();
// This md instance will be the same as
// in the implementation of 'markdown-it-my-plugin'
md.use(MyPlugin);
md.use(Mark);
```

This approach promotes modularity and avoids redundant plugin registration.

## Parsing and Rendering

Markdown-It is a markdown rendering engine. It simply parse md files into a stream of tokens according to some rules in the parsing staged, and render the tokens as HTML strings in the rendering stage.

All parsing and rendering are done in node enviroment. before any browser global variables enter their life cycle, so adding elements by `document.createElement` and other DOM operations are not possible.

Rendering is synchronous, so async rendering or else should be considered done after the rendering is completed. For more details, check [here](https://github.com/markdown-it/markdown-it/blob/master/docs/development.md#i-need-async-rule-how-to-do-it).

### Custom Parsing Rules

Parser construct tokens, determine their types and apply attributes to the tokens.

You can add your own rules and apply custom attributes.

```ts
// add rules after the rule 'block'
md.core.ruler.after('block', 'foo_rule', (state) => {
    const tokens = state.tokens;
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
		// custom rules for code blocks
        if (token.type === 'fence' && token.info.trim() === 'hello-world') {
			// apply custom type
            token.type = 'hello_world';
			// add custom attribute
            token.attrPush(['message', 'hello']);
        }
    }
});
```

Later in rendering stage, you can apply rendering rules for the custom types you've set and get these custom attributes for rendering.


```ts
// rules for custom type 'hello_world'
md.renderer.rules.hello_world= function(tokens, idx, options, env, self) {
    const token = tokens[idx];
	const messsage = token.attrGet('message')
	return `<div id="hello-${idx}">${self.renderInlineAsText(message)}</div>`
}
```
- Potential XSS attack, protected by `renderInlineAsText`
- All return values are in plain **HTML strings**
