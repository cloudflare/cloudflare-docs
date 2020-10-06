---
order: 2
---

# Set up a new repo

To set up a new docs site powered by the Cloudflare Docs Engine, first read through [how the Docs Engine works](/how-it-works). Then check out the example below as a starting point.

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

__[Open demo](https://docs-engine-example.adam.workers.dev)__

To try it yourself, fork the [example repo on GitHub](https://github.com/adamschwartz/docs-engine-example), and then [set up a dev environment](/contributing/development-setup).

--------------------------------

## Stay tuned...

These docs are in active development.

--------------------------------

## See also

- [Markdown reference](/reference/markdown)
- [Configuration reference](/reference/configuration)
