# Code block examples

Code blocks inside [Docs Engine Markdown](/reference/markdown) offer a variety of custom presentation mechanisms. This page contains practical examples for inspiration.

Learn more about [using code blocks inside Markdown](/reference/markdown#code-blocks).

--------------------------------

## JavaScript with filename and highlight

```js
---
filename: hello-worker.js
highlight: [6,7,8]
---
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response(`Hello worker!`, {
    status: 200
  })
}
```

## Terminal commands/output

<pre class="CodeBlock CodeBlock-scrolls-horizontally CodeBlock--language-sh" language="sh"><code><u><b class="CodeBlock--token-comment"># Install Wrangler, and tell it who you are</b><br/><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>npm install -g @cloudflare/wrangler<br/><u><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler config<br/><u><br/><b class="CodeBlock--token-comment"># Create and publish a “Hello World” Worker</b><br/><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler generate hello<br/><u><b class="CodeBlock--token-directory">~/</b> <b class="CodeBlock--token-prompt">$</b> </u>cd hello<br/><u><b class="CodeBlock--token-directory">~/hello</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler subdomain world<br/><u><b class="CodeBlock--token-directory">~/hello</b> <b class="CodeBlock--token-prompt">$</b> </u>wrangler publish<u><br/><b class="CodeBlock--token-success">Published</b><b class="CodeBlock--token-success"> </b><b class="CodeBlock--token-value">https://hello.world.workers.dev</b></u></code></pre>

## CSS code with highlighted lines

```css
---
highlight: [12, 13, 18]
---
:root {
  --color-rgb: 8, 10, 60;
  --color: rgb(var(--color-rgb));
}

.Class {
  box-sizing: border-box;
  width: calc(80vw - 2em);
  padding: 1em;
  color: var(--color);

  --bg-alpha: .5;
  background-color: rgba(var(--color-rgb), var(--bg-alpha));
}

@supports (backdrop-filter: blur(1em)) {
  .Class {
    --bg-alpha: .1;
    backdrop-filter: saturate(200%) blur(1.25em);
  }
}
```

## Markdown code

```markdown
# Markdown header

This is a paragraph with __bold__ and _italics_ contained within it.

- This is a list item.
- This is another list item with a [link](https://example.com) in it.

This is the end.
```

## HTML with embedded JS/CSS

```html
<!DOCTYPE html>
<html theme="light">
  <head>
    <meta charSet="utf-8"/>
    <meta httpEquiv="x-ua-compatible" content="ie=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <script>
      (() => {
        getThemeFromStorage = () => {
          let storedTheme

          const query = window.matchMedia("(prefers-color-scheme: dark)")
          const queryTheme = query.matches ? "dark" : "light"

          try {
            const theme = JSON.parse(localStorage.theme)
            const themeIsValid = ["dark", "light"].includes(theme.theme)
            const themeWasRecentlySet = theme.updated > +new Date - (30 * 60 * 1000)

            if (themeIsValid && themeWasRecentlySet) {
              storedTheme = theme.theme
            }
          } catch (error) {}

          return storedTheme || queryTheme
        }

        document.documentElement.setAttribute("theme", getThemeFromStorage())
      })()
    </script>

    <style>
      html {
        -webkit-font-smoothing: antialiased;
        background: #fff;
        color: #000;
      }

      html[theme="dark"] {
        background: #000;
        color: #fff;
      }

      :root {
        --color-rgb: 8, 10, 60;
        --color: rgb(var(--color-rgb));
      }

      .Class {
        box-sizing: border-box;
        width: calc(80vw - 2em);
        padding: 1em;
        color: var(--color);

        --bg-alpha: .5;
        background-color: rgba(var(--color-rgb), var(--bg-alpha));
      }

      @supports (backdrop-filter: blur(1em)) {
        .Class {
          --bg-alpha: .1;
          backdrop-filter: saturate(200%) blur(1.25em);
        }
      }
    </style>
  </head>

  <body>
    <!-- ... -->
  </body>
</html>
```
