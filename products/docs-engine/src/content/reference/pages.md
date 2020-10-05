---
order: 1
---

# Pages

By default, Markdown (MDX) files placed inside the `src/content` directory (or `src/content` [prefixed by `contentRepoFolder`](/reference/configuration#properties)) will automatically be turned into a page (a built HTML file) and added to the main navigation (sidebar on desktop, overlayed menu on mobile).

The Cloudflare Docs Engine renders pages with [MDX](https://mdxjs.com/).

Pages can specify YAML frontmatter to configure a number of options.

--------------------------------

## URL paths

Page URL paths are automatically derived from the file path inside the content directory. For example, the file `src/content/folder/page.md` will result in the URL `https://example.com/folder/page` being accessible.

The special filename `index.md` is equivalent to `(empty string).md`. Therefore, you can think of `folder/page/index.md` as equivalent to `folder/page.md`; the only difference is that within each file, relative imports (of images, or of custom MDX components, as examples) will start from a different position in the file structure.

<Aside type="tip">

__Tip:__ It’s common to use a folder to group a page with its media, e.g.:

```txt
---
highlight: [4,5,6,7,8]
---
src/content
├── page-1.md
├── page-2.md
└── page-3
   ├── index.md
   ├── image-1.png
   ├── image-2.png
   └── image-3.png
```

In this example, all three pages will be served at the same depth:

```txt
https://example.com/page-1
https://example.com/page-2
https://example.com/page-3
```

</Aside>

--------------------------------

## Partials

Sometimes you may want to create a piece of reusable content that can be imported into multiple pages but not generate a page itself. This is commonly referred to as a “partial”.

To create a partial, simple prefix the name your file with an underscore (`_`).

### Example

In the [Workers docs](https://developers.cloudflare.com/workers), there’s a partial used in the intro of all of the [Tutorials](https://developers.cloudflare.com/workers/tutorials), called “Before you start” which makes sure folks have the appropriate pre-requisites before starting a Workers tutorial ([source](https://github.com/cloudflare/cloudflare-docs/blob/4ba1e70d2a535c93ef6de42b0fc5178dabdb942b/products/workers/src/content/_partials/_tutorials-before-you-start.md)):

<!-- TODO: we unfortunately cannot use the `markdown` syntax for this code block since it’s currently incompatible with code block frontmatter -->
```txt
---
filename: src/content/_partials/_tutorials-before-you-start.md
---
## Before you start

All of the tutorials assume you’ve already gone through [Getting started](/learning/getting-started), which gets you set up with a Cloudflare Workers account, and the Workers CLI tool, [Wrangler](https://github.com/cloudflare/wrangler).
```

Inside the tutorial it’s imported as you would any other MDX component ([source](https://github.com/cloudflare/cloudflare-docs/blob/4ba1e70d2a535c93ef6de42b0fc5178dabdb942b/products/workers/src/content/tutorials/build-a-qr-code-generator/index.md)):

<!-- TODO: we unfortunately cannot use the `markdown` syntax for this code block since it’s currently incompatible with code block frontmatter -->
```markup
---
filename: src/content/tutorials/build-a-qr-code-generator/index.md
highlight: [1,5]
---
import TutorialsBeforeYouStart from "../../_partials/_tutorials-before-you-start.md"

# Build a QR code generator

<TutorialsBeforeYouStart/>

## Overview

In this tutorial, you’ll build and publish a serverless function that generates QR codes, using Cloudflare Workers.

<!-- ... -->
```

--------------------------------

## Frontmatter

While the Docs Engine strives to have defaults that work well outside of the box, there are a number of optional frontmatter properties you can set that the engine is aware of.

```txt
frontmatter {
  title
  type
  order
  hidden
  hideChildren
  breadcrumbs
}
```

You can additional set your own frontmatter props in order to use them as variables inside of your pages. This is how the [Workers “Example” pages](https://github.com/cloudflare/cloudflare-docs/blob/4ba1e70d2a535c93ef6de42b0fc5178dabdb942b/products/workers/src/content/examples/alter-headers.md#L12) are constructed.

### Title

By default the title used in the sidebar and for the document title will automatically be generated from the page’s `h1` (set with `# Title` in Markdown).

If you would like to use a different title in these places—for example, if you want to use a shortened title in the sidebar for space reasons—you may do so by setting the optional `title` frontmatter property, and it will override the `h1`.

### Type

All pages you write will by default have the `"document"` type. This is used mainly by the layout engine to determine if the page needs a sidebar and should have a table of contents automatically generated.

For the docs homepage and top-level category pages, it’s common to use the type `"overview"`, although currently, any specified type other than `"document"` will have the same effect. Overview pages will not have the table of contents and will not be constrained to the normal content column—instead they’ll fill up all of the space inside the content column and sidebar.

If within a non-document-type page you’d like to have some content constrained by the normal content column, use the [`<ContentColumn/>` component](/reference/markdown#contentcolumn). The Workers Example pages use this component to [constrain the width](https://github.com/cloudflare/cloudflare-docs/blob/4ba1e70d2a535c93ef6de42b0fc5178dabdb942b/products/workers/src/content/examples/respond-with-another-site.md#L10-L22) of descriptive text while allowing the code example to be showcased.

### Order

By default, all pages will be ordered in the sidebar alphabetically within their depth.

If you’d like to modify that order, set the `order` property to an integer on any pages you’d like. Lower integers will display visually higher. It is recommended that you order them starting at `0`.

If you only set `order` on some of your pages, all of the additional pages will end up below it, sorted alphabetically. If you set more than one page to the same value, they’ll also be sorted alphabetically.

### Hidden and hideChildren

Setting the `hidden` property to `true` will hide the page from the sidebar.

Setting `hideChildren` to `true` will hide all children of a page from the sidebar. This is useful for customizing the navigation and design of a section of content within a docs site. The [Tutorials section](https://developers.cloudflare.com/workers/tutorials) of the Workers docs set this.

### Breadcrumbs

By default, all pages (not at the top level of nav tree) will have breadcrumbs generated. But stylistically, breadcrumbs are currently only shown on mobile—the rationale being that they’re somewhat redundant when you can see the sidebar. This is a design decision we may revisit at some point.

### Additional properties for tutorials

[Tutorials](https://developers.cloudflare.com/workers/tutorials) in the Workers docs support some additional properties.

<Definitions>

- `updated` <Type>date</Type>
  - Sets the updated date. This is currently used to sort the table.

- `difficulty` <Type>string</Type>
  - One of `"Beginner"`, `"Advanced"`, or `"Expert"`.

</Definitions>

### Additional properties for examples

[Examples](https://developers.cloudflare.com/workers/examples) in the Workers docs support some additional properties.

<Definitions>

- `summary` <Type>string</Type>
  - A summary of the example, no longer than \~100 characters in length.

- `demo` <Type>string</Type> <PropMeta>(URL)</PropMeta>
  - A URL to a working demo of the example.

- `tags` <Type>array</Type>
  - A list of tags to use for filtering on the Examples overview page.

</Definitions>
