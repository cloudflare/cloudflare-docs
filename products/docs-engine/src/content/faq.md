---
type: overview
order: 6
---

# FAQ

<ContentColumn>

--------------------------------

## Why a Docs Engine?

__tl:dr;__ You write good [Markdown (MDX)](/reference/markdown), and the rest is taken care of.

__Details:__ Cloudflare has a large number of teams shipping product updates often. Most of these products have [their own documentation](https://developers.cloudflare.com/docs/). Over time we’ve found that it’s especially difficult to balance two important goals:

1. Content is easily managed by the product team that owns it.
2. Docs are consistent across products, providing the _best experience for our customers_, who commonly use more than one Cloudflare product together.

The Docs Engine strives to solve these problems by providing smart defaults with minimal [configuration](/reference/configuration) and a wide variety of [composable MDX components](/reference/markdown).

--------------------------------

## How does the main navigation work?

The sidebar tree is automatically generated from the file structure inside the content directory (`src/content` by default, configurable with [`contentRepoFolder`](/reference/configuration#properties)).

The link text is automatically determined by [the `title` of the page](/reference/pages#title), which by default comes from the first `h1` inside the document.

--------------------------------

## How does the table of contents work?

For pages with the [`"document"` type](/reference/pages#title) (the default), their table of contents is automatically generated from the header hierarchy. For this reason it’s critical that each document begin with an `h1` and that for all `N > 1`, all `h{N}` immediately follow an `h{N-1}`. For example an `h3` should never succeed an `h1`.

--------------------------------

## How does the search work?

Search is powered by Algolia DocSearch and [must be configured](/reference/configuration) in `docs-config.js`. Make a PR on [@algolia/docsearch-configs](https://github.com/algolia/docsearch-configs/pull/2300) to obtain an `indexName` and `apiKey` (e.g. see the [Workers PR](https://github.com/algolia/docsearch-configs/pull/2300)). Then simply set those values as `search.indexName` and `search.apiKey` (e.g. see the [Workers config](https://github.com/cloudflare/cloudflare-docs/blob/e72247549d20f649786251d0368de19560d1bbb2/products/workers/docs-config.js#L21-L24)). To disable search, set those values to the empty string (e.g. [Docs Engine example site](https://github.com/adamschwartz/docs-engine-example/blob/6d725ffa554454e1daa4c0d2a8a7e44408056e6b/docs-config.js#L21-L24)).

</ContentColumn>
