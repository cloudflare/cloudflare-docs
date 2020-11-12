---
order: 2
---

# Markdown

The Cloudflare Docs Engine renders pages with [MDX](https://mdxjs.com/), and includes a number of custom MDX components in the global context, allowing authors to use them on any page without requiring them to be explicitly imported.

--------------------------------

## Links

For links that you want to display as regular paragraph-style text links, use the regular Markdown syntax `[link text](url)`.

<Example>

Visit [example.com](https://example.com).

</Example>

```md
Visit [example.com](https://example.com).

View the [How it Works](/how-it-works) page.

Learn how to use [`<Asides/>`](/reference/markdown#asides).
```

- __Internal links__ will use [Gatsby’s `<Link/>` component](https://www.gatsbyjs.org/docs/gatsby-link/), which means they will be routed through `@reach/router` using `pushState`.
- __External links__ (matching `/^https?:/`) and __hash links__ (`.indexOf("#") === 0`), will be rendered as regular `<a/>` elements.

<Aside>

__Tip:__ If you’d like to take advantage of Gatsby’s routing, but you want more control over the presentation of the link, use `<Link/>` directly. For example, this could be used to implement a custom link button.

</Aside>

--------------------------------

## Buttons

The `<Button/>` can be used to render links (`<a/>`) stylized as buttons, or as literal HTML `<button/>` elements. This behavior is automatically determined based on whether an `href` attribute prop is passed.

```md
<Button type="primary" href="/how-it-works">How it Works</Button>
```

<Example>
<Button type="primary" href="/how-it-works">How it Works</Button>
</Example>

```jsx
<Button type="secondary" onClick={()=>alert("Clicked")}>Click me</Button>
```

<Example>
<Button type="secondary" onClick={()=>alert("Clicked")}>Click me</Button>
</Example>

<Definitions>

- `type`
  - Currently only `"primary"` and `"secondary"` are supported.

- `href`
  - If set, the element will be rendered as `<a/>` and the `href` HTML attribute will be set to its value. If unset, the element will be rendered as `<button/>`.

</Definitions>

--------------------------------

## ButtonGroup

Button groups allow you to display a few buttons in a row, while allowing them to wrap nicely on smaller displays.

```jsx
<ButtonGroup>
  <Button type="primary">Primary</Button>
  <Button type="secondary">Secondary</Button>
</ButtonGroup>
```

<Example>
<ButtonGroup>
  <Button type="primary">Primary</Button>
  <Button type="secondary">Secondary</Button>
</ButtonGroup>
</Example>

--------------------------------

## Images

Images are added by simply using the Markdown syntax.

```md
![Wall of entropy](./wall-of-entropy.jpg)
```

![Wall of entropy](./wall-of-entropy.jpg)

--------------------------------

## Asides

Asides are used for displaying notes and warnings. They render as an `<aside/>` element with `aria-role="note"`. To use one, simply use the `<Aside/>` component.

<Aside>

__Note:__ This is a note.

</Aside>

```md
<Aside>

__Note:__ This is a note.

</Aside>
```

You can use any MDX inside the component.

By default, an `Aside` will be of type `"note"`, meaning it will show in the friendly color of blue. However, if you’d like to show a warning stylization, simply add `type="warning"`.

You can also optionally specify a `header`.

<Aside type="warning" header="Warning">

This is a warning.

</Aside>

```md
<Aside type="warning" header="Warning">

This is a warning.

</Aside>
```

--------------------------------

## Example (MDX component)

The `<Example/>` component is used to simply add a box around some content. This can be useful when simply trying to demonstrate something that could otherwise be mistaken as the explanation of the same thing.

<Example>

Here’s an example:

<Example>

This is an example _of an example_.

</Example>

</Example>

```md
<Example>

This is an example _of an example_.

</Example>
```

--------------------------------

## Definitions, Code, Type, ... PropMeta

When writing reference documentation, there are four MDX components that you use `Definitions`, `Code`, `Type`, `ParamType`, and `PropMeta`, in conjunction with each other. All of these components are added to the global scope, so you do not need to import them.

<Aside>

__Note:__ You may also use `<Definitions/>` for definition lists that are not specifically for code (read: defining properties or methods), however depending on your use case, it may be more appropriate to simply use `<dl/>`, `<dt/>` and `<dd/>`.

</Aside>

Here are some self-exemplifying definitions:

<Definitions>

- `<Definitions/>` <Type>MDXComponent</Type>

  - This defines the boundary of the reference definitions.

- `<Code/>` <Type>MDXComponent</Type>

  - An alternative way of describing an inline code block (like you would with two backticks) that allows you to render `<ParamType/>` within it.

- `<Type/>` <Type>MDXComponent</Type>

  - Displays a type, meant to be optionally used after a `<Code/>` inside a definition.

- `<TypeLink href/>` <TypeLink href="https://mdxjs.com/advanced/typescript">MDXComponent</TypeLink>

  - Same as `Type`, but wrapped in a link.

- <Code>{"<"}ParamType{" {children"}<ParamType>JSX | Markdown</ParamType>{"}"}/></Code> <Type>MDXComponent</Type>

  - How you describe the types inside `<Code/>` blocks.

- `<PropMeta/>` <Type>MDXComponent</Type> <PropMeta>optional</PropMeta>

  - Used for displaying “optional” or “required” or other meta-information related to a prop inside a definition.

</Definitions>

Here’s the code for this set of definitions.

```md
<Definitions>

- `<Definitions/>` <Type>MDXComponent</Type>

  - This defines the boundary of the reference definitions.

- `<Code/>` <Type>MDXComponent</Type>

  - An alternative way of describing an inline code block (like you would with two backticks) that allows you to render `<ParamType/>` within it.

- `<Type/>` <Type>MDXComponent</Type>

  - Displays a type, meant to be optionally used after a `<Code/>` inside a definition.

- `<TypeLink href/>` <TypeLink href="https://mdxjs.com/advanced/typescript">MDXComponent</TypeLink>

  - Same as `Type`, but wrapped in a link.

- <Code>{"<"}ParamType{" {children"}<ParamType>JSX | Markdown</ParamType>{"}"}/></Code> <Type>MDXComponent</Type>

  - How you describe the types inside `<Code/>` blocks.

- `<PropMeta/>` <Type>MDXComponent</Type> <PropMeta>optional</PropMeta>

  - Used for displaying “optional” or “required” or other meta-information related to a prop inside a definition.

</Definitions>
```

Instructions for composing reference documentation:

1. First wrap everything inside of `<Definitions>`. Note that MDX requires that you include a new line before and after each block-style MDX tag.

  ```html
  ---
  highlight: [1,3]
  ---

  <Definitions>

  ...
  ```

2. Within the definitions block, include an unordered list, with the following structure:

    - Each term is specified in an inline code element inside each list item.

      - For property definitions, you can use two backticks.

        ```md
          - `property`
            - ...
        ```

      - For method definitions in which you need to specify a param type inside the inline code block, use the `<Code/>` component with child `<ParamType/>` components.

        ```md
          - <Code>method(param<ParamType>type</ParamType>)</Code>
            - ...
        ```

    - After the code block, optionally include a `<Type/>`.
      - For properties, this represents the type of the property.
      - For methods, this represents the type of the return value.
      - For style, you may optionally leave these off if the types are clear from context or `null`ish for the entire set of methods.

      ```md
        - `property` <Type>type</Type>
          - ...
      ```

    - After an optional `<Type/>`, optionally include a `<PropMeta/>`.
      - Used for displaying “optional” or “required” when describing constructor parameters.
      - Can also be used for displaying other single-word meta-information about a property, e.g. “read-only”.

    - After the term, indent and add an unordered list, containing only one list item which contains the definition of the term.

Here’s an actual example from the HTMLRewriter docs which puts this all together:

> <Definitions>
>
> - <Code>getAttribute(name<ParamType>string</ParamType>)</Code> <Type>string | null</Type>
>
>   - Returns the value for a given attribute name on the element, or `null` if it isn’t found.
>
> - <Code>hasAttribute(name<ParamType>string</ParamType>)</Code> <Type>boolean</Type>
>
>   - Returns a boolean indicating whether an attribute exists on the element.
>
> - <Code>removeAttribute(name<ParamType>string</ParamType>)</Code> <Type>Element</Type>
>
>   - Removes the attribute.
>
> </Definitions>

--------------------------------

## Blockquotes

Use blockquotes when quoting someone. For example, here’s a translation of a quote commonly attributed to Antoine de Saint-Exupéry:

> A goal without a plan is just a wish.

```md
> A goal without a plan is just a wish.
```

> If you want to get fancy with it you can use
> [links](https://example.com) and `<code/>`, and
> really just about any another inline Markdown.
>
> Multiple paragraphs can be added as well. And of
> course you can use **bold** or _italics_. And
> don’t forget to `<cite/>`.
>
> <cite>Adam Schwartz</cite>

```md
> If you want to get fancy with it you can use
> [links](https://example.com) and `<code/>`, and
> really just about any another inline Markdown.
>
> Multiple paragraphs can be added as well. And of
> course you can use **bold** or _italics_. And
> don’t forget to `<cite/>`.
>
> <cite>Adam Schwartz</cite>
```

--------------------------------

## Code blocks

Code blocks are implemented on top of [prism-react-renderer](https://github.com/FormidableLabs/prism-react-renderer), with a few customizations.

Custom presentation options like [row highlights](#highlight) and [filename headers](#filenames) can be added by writing frontmatter inside the code fences (\`\`\`).

### Highlight

You can highlight rows by specifying `highlight: [...]` with an array of row numbers.

For example, here we’re specifying `highlight: [5,6,7]` in order to highlight the `hello()` function:

```js
---
highlight: [5,6,7]
---
async function lazy() {
  // ...
}

function hello() {
  Math.random() > .5 ? "Hello" : "Bonjour"
}

const ITEMS = 12345
for (let i = 0; i <= ITEMS; i += 1) {
  console.log(`${ hello() } world!`)
}
```

Here’s what that example looks like in Markdown... with the relevant row highlighted. ;)

``````txt
---
highlight: [3]
---
```
---
highlight: [5,6,7]
---
async function lazy() {
  // ...
}

function hello() {
  Math.random() > .5 ? "Hello" : "Bonjour"
}

const ITEMS = 12345
for (let i = 0; i <= ITEMS; i += 1) {
  console.log(`${ hello() } world!`)
}
```
``````

### Filenames

Filenames are applied by setting `filename: ______` in the code frontmatter.

```js
---
filename: hello-worker.js
---
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response(`Hello worker!`, { status: 200 })
}
```

Here’s what that example looks like:

``````txt
```
---
filename: hello-worker.js
---
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response(`Hello worker!`, { status: 200 })
}
```
``````

### Headers

Header content other than [filenames](#filenames) can be specified with `header: ______`.

```sh
---
header: Install the Workers CLI
---
$ npm install -g @cloudflare/workers-cli
```

```sh
---
header: Configure the Workers CLI
---
$ workers config
```

### Theme

By default, code blocks use a light theme when the page uses a light theme, and a dark theme when the page uses a dark theme. To force a dark theme all the time, you can do this by setting `theme: dark` in the frontmatter.

Currently, we only recommend doing this for `sh`-type code blocks, and only when doing so helps differentiate it from neighboring `js` (other other non-`sh`) code blocks.

```sh
---
theme: dark
---
~/my-worker $ wrangler publish
```

``````txt
```sh
---
theme: dark
---
~/my-worker $ wrangler publish
```
``````

### Workers-JavaScript

Workers-specific APIs are automatically highlighted in true Cloudflare spirit—in [orange](https://cloudflare.com).

```js
const instance = new RegularClass()

const rewriter = new HTMLRewriter()
```

### Terminals

To display an interactive shell (or “terminal”-style code block), use the standard Markdown code fences (\`\`\`) with the `sh` hint. For example:

``````md
```sh
$ npm install -g @cloudflare/wrangler
$ wrangler config
```
``````

```sh
$ npm install -g @cloudflare/wrangler
$ wrangler config
```

When the commands shown are directory-independent, all lines of entered text should start with a `$`.

When commands require a specific working directory, add that directory before the line. For example:

``````md
```sh
~/ $ cd my-repo
~/my-repo $ npm install
```
``````

```sh
~/ $ cd my-repo
~/my-repo $ npm install
```

#### Advanced usage

<Aside type="warning">

__Warning:__ This usage is experimental and should be avoided.

</Aside>

Custom tokenization can also be achieved by manually applying tokens. For example:

```html
<pre class="CodeBlock CodeBlock-scrolls-horizontally CodeBlock--language-sh" language="sh"><code><u><b class="CodeBlock--token-comment"># Install Wrangler, and tell it who you are</b><br/><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>npm install -g @cloudflare/wrangler<br/><u><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler config<br/><u><br/><b class="CodeBlock--token-comment"># Create and publish a “Hello World” Worker</b><br/><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler generate hello<br/><u><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>cd hello<br/><u><b class="CodeBlock--token-directory">~/hello</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler subdomain world<br/><u><b class="CodeBlock--token-directory">~/hello</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler publish<u><br/><b class="CodeBlock--token-success">Published</b><b class="CodeBlock--token-success"> </b><b class="CodeBlock--token-value">https://hello.world.workers.dev</b></u></code></pre>
```

<pre class="CodeBlock CodeBlock-scrolls-horizontally CodeBlock--language-sh" language="sh"><code><u><b class="CodeBlock--token-comment"># Install Wrangler, and tell it who you are</b><br/><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>npm install -g @cloudflare/wrangler<br/><u><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler config<br/><u><br/><b class="CodeBlock--token-comment"># Create and publish a “Hello World” Worker</b><br/><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler generate hello<br/><u><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>cd hello<br/><u><b class="CodeBlock--token-directory">~/hello</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler subdomain world<br/><u><b class="CodeBlock--token-directory">~/hello</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler publish<u><br/><b class="CodeBlock--token-success">Published</b><b class="CodeBlock--token-success"> </b><b class="CodeBlock--token-value">https://hello.world.workers.dev</b></u></code></pre>

### Examples

Check out the dedicated [code block examples](/examples/code-block-examples) page for more.

--------------------------------

## ContentColumn

By default, all Markdown/MDX files are categorized as the `“document”` [type](#type). If you specify any other [frontmatter](#frontmatter) `type`, the page contents will flow to the maximum width of the docs page excluding the left sidebar—in other words, without the right sidebar normally reserved for the table of contents (visible on this page on desktop, e.g.).

This is particularly useful on so-called “overview” pages, the top level pages in the nav.

If within one of these pages, you need some portion of that page’s content to be constrained to the column width normally reserved for “document”-type pages, use the `<ContentColumn/>` MDX component.

```md
<ContentColumn>

This content will wrap to the column width of a standard “document”-type docs page.

</ContentColumn>
```

--------------------------------

## TableWrap

To make a table responsive, wrap it with the `<TableWrap/>` component.

```md
<TableWrap>

Column 1 | Column 2
---------|----------
Row 1    | This text is used for illustrative purposes. It’s meant to demonstrate how a large string of text is treated inside of a table wrapped with the `<TableWrap/>` component.

</TableWrap>
```

<TableWrap>

Column 1 | Column 2
---------|----------
Row 1    | This text is used for illustrative purposes. It’s meant to demonstrate how a large string of text is treated inside of a table wrapped with the `<TableWrap/>` component.

</TableWrap>

--------------------------------

## Subscript, superscript, variables

Just use `<sub/>`, `<sup/>`, and `<var/>` as expected.

Use `<sub/>` for mathematical bases or in chemical formulas.

<Example>

<center>1111 = 10001010111<sub>2</sub></center>

</Example>

```md
<center>1111 = 10001010111<sub>2</sub></center>
```

<Example>

Don’t consume too much C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>.

</Example>

```md
Don’t consume too much C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>.
```

You can use `<var/>` and `<sup/>` to construct an equations.

<Example>

<center><var>a</var><sup>2</sup> + <var>b</var><sup>2</sup> = <var>c</var><sup>2</sup></center>

</Example>

```html
<center><var>a</var><sup>2</sup> + <var>b</var><sup>2</sup> = <var>c</var><sup>2</sup></center>
```

Use `<sup/>` with links to manually construct footnotes.

<Example>

It’s almost always<sup><a href="#footnote-1">1</a></sup> the case that things work out.

----------------

__Footnotes:__

1. <a name="footnote-1"></a> Well, not always.

</Example>

--------------------------------

## Keyboard commands

When you want to display a keyboard command, use a `<kbd/>` element. For example:

<Example>

Press <kbd>⌘</kbd> <kbd>F</kbd> (Command-F) to
search for text within this document.

</Example>

```md
Press <kbd>⌘</kbd> <kbd>F</kbd> (Command-F) to
search for text within this document.
```

--------------------------------

## Details and summary

When you want to provide additional information in context, but you don’t want it to clutter up the more important content, use `<details/>` and `<summary/>`.

To ensure proper layout and styling, wrap all contains of the `<details/>` element, except the `<summary/>` element, in a single `<div/>`:

``````md
<details>
<summary>Details</summary>
<div>

Here are the details.

</div>
</details>
``````

<details>
<summary>Details</summary>
<div>

Here are the details.

</div>
</details>

--------------------------------

## Directory

You can display a page listing of any depth by simply including the `<DirectoryListing/>` component.

For example, here’s a directory listing for the docs engine part of the site.

<Example>
<DirectoryListing path="/docs-engine"/>
</Example>

```md
<DirectoryListing path="/docs-engine"/>
```

--------------------------------

## YouTube

To add a responsive YouTube video player to the page, include the `<YouTube/>` component.

<YouTube id="kdwfIrRJ4DE"/>

```md
<YouTube id="kdwfIrRJ4DE"/>
```
