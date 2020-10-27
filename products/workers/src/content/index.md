---
title: Welcome
order: 0
type: overview
---

<ContentColumn>

# Cloudflare Workers documentation

Cloudflare Workers provides a serverless execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.

<Link to="/learning/getting-started" className="Button Button-is-docs-primary">Get started</Link> &nbsp;&nbsp; <Link to="/tutorials" className="Button Button-is-docs-secondary">View the tutorials</Link>

--------------------------------

## Installing the Workers CLI

To install [`wrangler`](https://github.com/cloudflare/wrangler), the Workers CLI, ensure you have [`npm` installed](https://www.npmjs.com/get-npm). Typically, you _must_ also use a Node version manager like [`nvm`](https://github.com/nvm-sh/nvm#installing-and-updating). Then, run:

```sh
$ npm install -g @cloudflare/wrangler
```

--------------------------------

## Playground

View this __Hello World__ example in the Workers playground:

```javascript
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response("Hello world")
}
```

<a href="https://cloudflareworkers.com/#36ebe026bf3510a2e5acace89c09829f:about:blank" className="Button Button-is-docs-primary">Launch playground</a> &nbsp;&nbsp; <Link to="/learning/playground" className="Button Button-is-docs-secondary">Learn more</Link>

--------------------------------

## Popular pages

- [Learning: How Workers works](/learning/how-workers-works) – learn how Cloudflare’s global network powers Workers
- [Pricing](/platform/pricing) – learn about the Free and Bundled plans
- [Reference: HTMLRewriter](/runtime-apis/html-rewriter) – parse and transform HTML from inside a Worker
- [Limits](/platform/limits) – learn about plan limits (e.g. free plans get 100,000 req/day)

--------------------------------

These docs are built with the [Cloudflare Docs Engine](https://developers.cloudflare.com/docs-engine/).

</ContentColumn>
