---
pcx_content_type: concept
title: Handlers
layout: single
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