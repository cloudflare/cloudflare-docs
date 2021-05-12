---
title: Welcome
order: 0
type: overview
---

<ContentColumn>

# Cloudflare Workers documentation

Cloudflare Workers provides a serverless execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.

<ButtonGroup>
  <Button type="primary" href="/get-started/guide">Get started</Button>
  <Button type="secondary" href="/tutorials">View the tutorials</Button>
</ButtonGroup>

--------------------------------

## Installing the Workers CLI

To install [`wrangler`](https://github.com/cloudflare/wrangler), the Workers CLI, ensure you have [`npm` installed](https://www.npmjs.com/get-npm), preferably using a Node version manager like [`nvm`](https://github.com/nvm-sh/nvm#installing-and-updating). Then, run:

```sh
$ npm install -g @cloudflare/wrangler
```

Read more about [installing `wrangler`](/cli-wrangler/install-update).

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

<ButtonGroup>
  <Button type="primary" href="https://cloudflareworkers.com/#36ebe026bf3510a2e5acace89c09829f:about:blank">Launch playground</Button>
  <Button type="secondary" href="/learning/playground">Learn more</Button>
</ButtonGroup>

--------------------------------

## Popular pages

- [Learning: How Workers works](/learning/how-workers-works) – learn how Cloudflare’s global network powers Workers
- [Pricing](/platform/pricing) – learn about the Free and Bundled plans
- [Reference: HTMLRewriter](/runtime-apis/html-rewriter) – parse and transform HTML from inside a Worker
- [Limits](/platform/limits) – learn about plan limits (e.g. free plans get 100,000 req/day)

--------------------------------

## Community
[Explore third-party packages](https://workers.cloudflare.com/works) that work on Workers, submitted by our users!

[Connect with the Workers community on Discord](https://discord.gg/cloudflaredev) to ask questions, show off what you’re building, and discuss the platform with other developers. 

[Follow @CloudflareDev on Twitter](https://twitter.com/cloudflaredev) to learn about product announcements, new tutorials, and what's new in Cloudflare Workers.

--------------------------------

These docs are built with the [Cloudflare Docs Engine](https://developers.cloudflare.com/docs-engine/).

</ContentColumn>
