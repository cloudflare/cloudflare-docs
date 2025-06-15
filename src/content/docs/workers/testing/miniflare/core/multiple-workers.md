---
order: 9
title: "🔌 Multiple Workers"
---

Miniflare allows you to run multiple workers in the same instance. All Workers can be defined at the same level, using the `workers` option.

Here's an example that uses a service binding to increment a value in a shared KV namespace:

```js
import { Miniflare, Response } from "miniflare";

const message = "The count is ";
const mf = new Miniflare({
	// Options shared between workers such as HTTP and persistence configuration
	// should always be defined at the top level.
	host: "0.0.0.0",
	port: 8787,
	kvPersist: true,

	workers: [
		{
			name: "worker",
			kvNamespaces: { COUNTS: "counts" },
			serviceBindings: {
				INCREMENTER: "incrementer",
				// Service bindings can also be defined as custom functions, with access
				// to anything defined outside Miniflare.
				async CUSTOM(request) {
					// `request` is the incoming `Request` object.
					return new Response(message);
				},
			},
			modules: true,
			script: `export default {
        async fetch(request, env, ctx) {
          // Get the message defined outside
          const response = await env.CUSTOM.fetch("http://host/");
          const message = await response.text();

          // Increment the count 3 times
          await env.INCREMENTER.fetch("http://host/");
          await env.INCREMENTER.fetch("http://host/");
          await env.INCREMENTER.fetch("http://host/");
          const count = await env.COUNTS.get("count");

          return new Response(message + count);
        }
      }`,
		},
		{
			name: "incrementer",
			// Note we're using the same `COUNTS` namespace as before, but binding it
			// to `NUMBERS` instead.
			kvNamespaces: { NUMBERS: "counts" },
			// Worker formats can be mixed-and-matched
			script: `addEventListener("fetch", (event) => {
        event.respondWith(handleRequest());
      })
      async function handleRequest() {
        const count = parseInt((await NUMBERS.get("count")) ?? "0") + 1;
        await NUMBERS.put("count", count.toString());
        return new Response(count.toString());
      }`,
		},
	],
});
const res = await mf.dispatchFetch("http://localhost");
console.log(await res.text()); // "The count is 3"
await mf.dispose();
```

## Routing

You can enable routing by specifying `routes` via the API,
using the
[standard route syntax](/workers/configuration/routing/routes/#matching-behavior).
Note port numbers are ignored:

```js
const mf = new Miniflare({
	workers: [
		{
			scriptPath: "./api/worker.js",
			routes: ["http://127.0.0.1/api*", "api.mf/*"],
		},
	],
});
```

When using hostnames that aren't `localhost` or `127.0.0.1`, you
may need to edit your computer's `hosts` file, so those hostnames resolve to
`localhost`. On Linux and macOS, this is usually at `/etc/hosts`. On Windows,
it's at `C:\Windows\System32\drivers\etc\hosts`. For the routes above, we would
need to append the following entries to the file:

```
127.0.0.1 miniflare.test
127.0.0.1 api.mf
```

Alternatively, you can customise the `Host` header when sending the request:

```sh
# Dispatches to the "api" worker
$ curl "http://localhost:8787/todos/update/1" -H "Host: api.mf"
```

When using the API, Miniflare will use the request's URL to determine which
Worker to dispatch to.

```js
// Dispatches to the "api" worker
const res = await mf.dispatchFetch("http://api.mf/todos/update/1", { ... });
```

## Durable Objects

Miniflare supports the `script_name` option for accessing Durable Objects
exported by other scripts. See
[📌 Durable Objects](/workers/testing/miniflare/storage/durable-objects#using-a-class-exported-by-another-script)
for more details.
