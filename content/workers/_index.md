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

Cloudflare Workers runs on Cloudflare’s global [cloud network](https://www.cloudflare.com/learning/serverless/glossary/what-is-edge-computing/) in over 200 cities around the world, offering both [free and paid plans](/workers/platform/pricing/).

Learn more about [how Workers works](/workers/learning/how-workers-works/).

{{<button-group>}}
{{<button type="primary" href="/workers/get-started/guide">}}Get started{{</button>}}
{{<button type="secondary" href="/workers/tutorials">}}View the tutorials{{</button>}}
{{<button type="secondary" href="/workers/platform/betas">}}Explore betas{{</button>}}
{{</button-group>}}

---

## Installing the Workers CLI

To install [`wrangler`](https://github.com/cloudflare/wrangler2), ensure you have [`npm` installed](https://www.npmjs.com/get-npm), preferably using a Node version manager like [Volta](https://volta.sh/) or [nvm](https://github.com/nvm-sh/nvm). Using a version manager helps avoid permission issues and allows you to easily change Node.js versions. Then run:

```sh
$ npm install -g wrangler
```

or install with `yarn`:

```sh
$ yarn global add wrangler
```

Read more about [installing Wrangler](/workers/wrangler/get-started/).

---

## Playground

View this Hello World example in the Workers playground:

```js
---
header: Service Worker syntax
---
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  return new Response("Hello world");
}
```

{{<button-group>}}
{{<button type="primary" href="https://cloudflareworkers.com/#36ebe026bf3510a2e5acace89c09829f:about:blank">}}Launch playground{{</button>}}
{{<button type="secondary" href="/workers/learning/playground">}}Learn more{{</button>}}
{{</button-group>}}

Or try inputting the JavaScript modules syntax example:

```js
---
header: Module syntax
---
export default {
  async fetch(request) {
    return new Response("Hello World!");
  },
};
```

---

## Related resources

- [How Workers works](/workers/learning/how-workers-works/) – Learn how Cloudflare’s global network powers Workers
- [Pricing](/workers/platform/pricing/) – Learn about the Free and Bundled plans
- [HTMLRewriter](/workers/runtime-apis/html-rewriter/) – Parse and transform HTML from inside a Worker
- [Limits](/workers/platform/limits/) – Learn about plan limits (Free plans get 100,000 req/day)

---

## Community

[Explore third-party packages](https://workers.cloudflare.com/works) that work on Workers, submitted by Cloudflare users.

[Connect with the Workers community on Discord](https://discord.gg/cloudflaredev) to ask questions, show off what you are building, and discuss the platform with other developers.

[Follow @CloudflareDev on Twitter](https://twitter.com/cloudflaredev) to learn about product announcements, new tutorials, and what is new in Cloudflare Workers.

{{</content-column>}}
