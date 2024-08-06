---
pcx_content_type: concept
title: Handlers
meta:
  description: Methods, such as `fetch()`, on Workers that can receive and process external inputs.
---

# Handlers

Handlers are methods on Workers that can receive and process external inputs, and can be invoked from outside your Worker. For example, the `fetch()` handler receives an HTTP request, and can return a response:

```js
export default {
	async fetch(request, env, ctx) {
		return new Response('Hello World!');
	},
};
```

The following handlers are available within Workers:

{{<directory-listing>}}

## Handlers in Python Workers

When you [write Workers in Python](/workers/languages/python/), handlers are prefixed with `on_`. For example, `on_fetch` or `on_scheduled`.
