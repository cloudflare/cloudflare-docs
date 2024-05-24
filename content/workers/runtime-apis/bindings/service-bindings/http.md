---
pcx_content_type: configuration
title: HTTP
meta:
  title: Service bindings - HTTP
  description: Facilitate Worker-to-Worker communication by forwarding Request objects.
---

# Service bindings — HTTP

Worker A that declares a Service binding to Worker B can forward a [`Request`](/workers/runtime-apis/request/) object to Worker B, by calling the `fetch()` method that is exposed on the binding object.

For example, consider the following Worker that implements a [`fetch()` handler](/workers/runtime-apis/handlers/fetch/):

```toml
---
filename: wrangler.toml
---
name = "worker_b"
main = "./src/workerB.js"
```

```js
---
filename: src/workerB.js
---
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World!");
  }
}
```

The following Worker declares a binding to the Worker above:

```toml
---
filename: wrangler.toml
---
name = "worker_a"
main = "./src/workerA.js"
services = [
  { binding = "WORKER_B", service = "worker_b" }
]
```

And then can forward a request to it:

```js
---
filename: src/workerA.js
---
export default {
	async fetch(request, env) {
		return await env.WORKER_B.fetch(request);
	},
};
```
