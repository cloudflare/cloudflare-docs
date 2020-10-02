---
order: 1
---

# Getting started

<Aside type="warning">

__Warning:__ The process for building a docs site using the Cloudflare Docs Engine is currently in flux. Please hold off on using the Docs Engine until this notice is removed.

</Aside>

<Aside>

__Note:__ The instructions below assume that you already have a paid [Cloudflare Workers](https://workers.cloudflare.com) account, so you can deploy your docs site using [Workers Sites](https://workers.cloudflare.com/sites). You can theoretically use any static site deploy tool; however only Workers Sites has been tested at this time.

</Aside>

In short, docs sites built with the Cloudflare Docs Engine are [Gatsby](https://www.gatsbyjs.com) sites with a bunch of [custom MDX components](/markdown) and a shell UI you that’s consistent across products, all deployed as a [Workers Sites project](https://workers.cloudflare.com/sites) via the [Wrangler Github Action](https://github.com/cloudflare/wrangler-action).

--------------------------------

## Minimal setup

To create a new docs site built with the Cloudflare Docs Engine, you’ll need the following:

1. A `package.json` with one dependency and some custom scripts configured.
2. A `docs-config.js` which exports a JavaScript object for configuring a number of strings and a few settings.
3. A `wrangler.toml` with the correct `[site]` configured.
4. A `.gitignore` file which ignores at least `.docs`, `dist/worker.js`, and `node_modules`.
5. Content — An `index.md` file in `src/content/` will do.

### 1. package.json

Your `package.json` needs to depend on the Docs Engine (located at @adamschwartz/cloudflare-docs-engine for now), and it needs to include three scripts:

```json
---
filename: package.json
highlight: [4, 7, 8, 9]
---
{
  "private": true,
  "dependencies": {
    "cloudflare-docs-engine": "git+https://github.com/adamschwartz/cloudflare-docs-engine.git"
  },
  "scripts": {
    "bootstrap": "node_modules/cloudflare-docs-engine/bin/commands.sh bootstrap",
    "build": "node_modules/cloudflare-docs-engine/bin/commands.sh build",
    "develop": "node_modules/cloudflare-docs-engine/bin/commands.sh develop"
  }
}
```

More on this later.

### 2. docs-config.js

In the root, you’ll also need a `docs-config.js` file, similar to [`gatsby-config.js`](https://www.gatsbyjs.com/docs/api-files-gatsby-config/):

```js
---
filename: docs-config.js
---
module.exports = {
  product: "Example",
  pathPrefix: "",
  productLogoPathD: "M8 8v32h32V26H22V8zm18-2h16v16H26z",
  contentRepo: "adamschwartz/docs-engine-example",
  externalLinks: [
    {
      title: "Adam Schwartz website",
      url: "https://adamschwartz.co"
    },
    {
      title: "Docs Engine on GitHub",
      url: "https://github.com/adamschwartz/cloudflare-docs-engine"
    },
    {
      title: "example.com",
      url: "https://example.com"
    },
  ],
  search: {
    indexName: "",
    apiKey: "",
  },
  siteMetadata: {
    title: "Example docs",
    description: "These docs are an example of of a docs site built with https://github.com/cloudflare/workers-docs-engine.",
    author: "@adamschwartz",
    url: "http://adamschwartz.co/docs-engine-example",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=",
  },
}
```

Many of these fields are self-explanatory. View the [site configuration docs](/site-configuration) for more information.

### 3. wrangler.toml

Configure the Workers Sites `bucket` and `entry-point` with a `.docs` prefix.

```toml
---
filename: wrangler.toml
---
# ...

[site]
bucket = ".docs/public/" # Add pathPrefix here if necessary
entry-point = ".docs/workers-site"
```

### 4. gitignore

You’ll want to at least ignore these:

```txt
---
filename: .gitignore
---
.docs
node_modules
dist/worker.js
```

### 5. Content

Last but not least, _content_.

Inside of `src/content/` you must have at least an `index.md`. However outside of that, you can structure it more or less however you want.

Some helpful things to know:

- The sidebar navigation tree and page paths are automatically generated from the file structure and naming in `src/content/`.

  - Page title is automatically pulled from the first `h1` (`#` in Markdown) in the document if no front matter `title` is specified.

  - `index.md` files inside sub-folders of `src/content/` will take the pathname of their parent directory.

- You can include custom MDX components in `src/content/` as `.js` files right alongside your `.md` files. Import them relatively.

- You can also include media the same way. For pages which reference several image files, [a common pattern](https://github.com/cloudflare/workers-docs-engine/tree/9cd282f3384bb07a98498816954408001149f348/src/content/tutorials/build-a-qr-code-generator) is group them in a `media/` directory which is a sibling of the `index.md` file. So `src/content/some-page/index.md` and `src/content/some-page/media/*.png`.

- If you want to create reusable “partials” that don’t generate pages, start the file names with `_`. See [an example in the Workers docs](https://github.com/cloudflare/workers-docs-engine/blob/9cd282f3384bb07a98498816954408001149f348/src/content/_partials/_tutorials-before-you-start.md). Then you can [import them](https://github.com/cloudflare/workers-docs-engine/blob/9cd282f3384bb07a98498816954408001149f348/src/content/tutorials/build-a-slackbot/index.md#L6-L10) as you would any other MDX component.

--------------------------------

## Example site

Here’s a minimal example site built with Docs Engine:

<div className="docs-engine-example-demo"><div><div>
<Demo src="https://docs-engine-example.adam.workers.dev" title="Docs Engine example site" aspectRatio={16/9}/>
<style dangerouslySetInnerHTML={{__html:`
  .docs-engine-example-demo { position: relative; pointer-events: none; overflow: hidden }
  @media (max-width: 1430px) { .docs-engine-example-demo {display: none } /* Fix MDX parsing */ }
  .docs-engine-example-demo > div {width: 200%; height: 400px; }
  .docs-engine-example-demo > div > div {transform: scale(.5); transform-origin: 0 0; }
`}}/>
</div></div></div>

__[Open demo](https://docs-engine-example.adam.workers.dev)__ · ([Github](https://github.com/adamschwartz/docs-engine-example))

--------------------------------

## See also

- [Docs Engine Markdown](/markdown)
- [Site configuration](/site-configuration)
