---
title: Overview
type: overview
pcx-content-type: overview
weight: 1
layout: list
meta:
  title: Cloudflare Workers documentation
---

{{<content-column>}}

# Cloudflare Workers documentation

Cloudflare Workers provides a [serverless](https://www.cloudflare.com/learning/serverless/what-is-serverless/) execution environment that allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure.

{{<button-group>}}
  {{<button type="primary" href="/get-started/guide">}}Get started{{</button>}}
  {{<button type="secondary" href="/tutorials">}}View the tutorials{{</button>}}
{{</button-group>}}

***

## Installing the Workers CLI

To install [`wrangler`](https://github.com/cloudflare/wrangler), ensure you have [`npm` installed](https://www.npmjs.com/get-npm), preferably using a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm) to avoid permission issues or to easily change Node.js versions, then run:

```sh
$ npm install -g @cloudflare/wrangler
```

or install with yarn:

```sh
$ yarn global add @cloudflare/wrangler
```

Read more about [installing `wrangler`](/workers/cli-wrangler/install-update/).

***

## Playground

View this Hello World example in the Workers playground:

```javascript
addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  return new Response("Hello world")
}
```

{{<button-group>}}
  {{<button type="primary" href="https://cloudflareworkers.com/#36ebe026bf3510a2e5acace89c09829f:about:blank">}}Launch playground{{</button>}}
  {{<button type="secondary" href="/learning/playground">}}Learn more{{</button>}}
{{</button-group>}}

***

## Popular pages

*   [Learning: How Workers works](/workers/learning/how-workers-works/) – learn how Cloudflare’s global network powers Workers
*   [Pricing](/workers/platform/pricing/) – learn about the Free and Bundled plans
*   [Reference: HTMLRewriter](/workers/runtime-apis/html-rewriter/) – parse and transform HTML from inside a Worker
*   [Limits](/workers/platform/limits/) – learn about plan limits (Free plans get 100,000 req/day)

***

## Community

[Explore third-party packages](https://workers.cloudflare.com/works) that work on Workers, submitted by Cloudflare users.

[Connect with the Workers community on Discord](https://discord.gg/cloudflaredev) to ask questions, show off what you are building, and discuss the platform with other developers.

[Follow @CloudflareDev on Twitter](https://twitter.com/cloudflaredev) to learn about product announcements, new tutorials, and what is new in Cloudflare Workers.

***

These docs are built with the [Cloudflare Docs Engine](/docs-engine/).

{{</content-column>}}
