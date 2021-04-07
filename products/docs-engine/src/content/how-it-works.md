---
order: 1
---

# How it works

In short, docs sites built with the Cloudflare Docs Engine are [Gatsby](https://www.gatsbyjs.com) sites with a bunch of [custom MDX components](/reference/markdown) and a shell UI you that’s consistent across products, all deployed as a [Workers Sites project](https://workers.cloudflare.com/sites) via the [Wrangler GitHub Action](https://github.com/cloudflare/wrangler-action).

--------------------------------

## Requirements

The instructions below assume you already have a paid [Cloudflare Workers](https://workers.cloudflare.com) account so you can deploy your docs site using [Workers Sites](https://workers.cloudflare.com/sites). You can theoretically use any static site deploy tool; however, only Workers Sites has been tested at this time.

--------------------------------

## Minimal setup

Each docs site built with the engine needs the following structure:

1. A `package.json` with the engine dependency and some custom scripts configured.
2. A `docs-config.js` config which exports a JavaScript object.
3. A `wrangler.toml` with the correct `[site]` configured.
4. A `.gitignore` which ignores at least `.docs`, `dist/worker.js`, and `node_modules`.
5. Content in `src/content/` — A single `index.md` will do.

For a repo holding a single docs site, everything but the content should be in the root, as is the case with the [Docs Engine minimal example](https://github.com/adamschwartz/docs-engine-example/tree/c45fa9f0a8affc68baf5d3517f8b890ba0522531).

However, these files can also be placed inside any sub-folder of your project. When doing this, you’ll need to then customize the `contentRepoFolder` property in `docs-config.js`, which is how the [products inside @cloudflare/cloudflare-docs](https://github.com/cloudflare/cloudflare-docs/tree/production/products) are all set up, e.g. the [Workers product](https://github.com/cloudflare/cloudflare-docs/blob/1efd366c25bc1bdd1a40f7bc4737310c6b00d15e/products/workers/docs-config.js#L6).

### 1. package.json

Your `package.json` needs to depend on the Docs Engine, and it needs to include scripts for bootstrapping the engine, building the project, local development, and deployment.

```json
---
filename: package.json
---
{
  "private": true,
  "dependencies": {
    "cloudflare-docs-engine": "git+https://github.com/cloudflare/cloudflare-docs-engine.git"
  },
  "scripts": {
    "bootstrap": "node_modules/cloudflare-docs-engine/bin/commands.sh bootstrap",
    "build": "node_modules/cloudflare-docs-engine/bin/commands.sh build",
    "develop": "node_modules/cloudflare-docs-engine/bin/commands.sh develop",
    "ghactionsbootstrap": "node_modules/cloudflare-docs-engine/bin/commands.sh ghactionsbootstrap",
    "savechanges": "node_modules/cloudflare-docs-engine/bin/commands.sh savechanges",
    "serve": "node_modules/cloudflare-docs-engine/bin/commands.sh serve"
  }
}
```

### 2. docs-config.js

You’ll also need a `docs-config.js` file, which is used to customize the project’s title, logo, external links menu, and site metadata, which are used to populate fields inside the project’s underlying [`gatsby-config.js`](https://www.gatsbyjs.com/docs/api-files-gatsby-config/):

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
      title: "Docs Engine on GitHub",
      url: "https://github.com/cloudflare/cloudflare-docs-engine"
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
    description: "These docs are an example of of a docs site built with the Cloudflare Docs Engine.",
    author: "@adamschwartz",
    url: "https://docs-engine-example.adam.workers.dev/",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII=",
  },
}
```

The `search` field is used to add a search to the site, powered by Algolia DocSearch. To hide search, set `search.indexName` and `search.apiKey` to the empty string, as in the example above. For an example of a project using search, see the [Workers config](https://github.com/cloudflare/cloudflare-docs/blob/e72247549d20f649786251d0368de19560d1bbb2/products/workers/docs-config.js#L21-L24).

Many of the other fields are self-explanatory. See [Configuration](/reference/configuration) for details.

### 3. wrangler.toml

Each docs site is deployed as a [Workers Sites project](https://workers.cloudflare.com/sites) via a [Wrangler GitHub Action](https://github.com/cloudflare/wrangler-action).

To set this up, you’ll need to [configure your `wrangler.toml`](https://developers.cloudflare.com/workers/cli-wrangler/configuration#keys) file just as you would any other [Workers Sites project](https://developers.cloudflare.com/workers/platform/sites/).

Since the Docs Engine builds your site inside a hidden `.docs` folder, you’ll need to set your `bucket` and `entry-point` appropriately with the `.docs/` prefix.

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

Learn more about the [content framework](/contributing/content/content-framework) used by new Cloudflare docs sites and how to use the [built-in MDX components](/reference/markdown).

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

__[Open demo](https://docs-engine-example.adam.workers.dev)__ · ([GitHub](https://github.com/adamschwartz/docs-engine-example))

--------------------------------

## See also

- [Markdown reference](/reference/markdown)
- [Configuration reference](/reference/configuration)
