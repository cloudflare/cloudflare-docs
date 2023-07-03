---
pcx_content_type: concept
title: KV bindings
weight: 7
---

# KV bindings

## Reference KV from Workers

A KV namespace is a key-value database that is replicated to Cloudflare's global network. To connect to a KV namespace from within a Worker, you must define a binding that points to the namespace's ID.

The name of your binding does not need to match the KV namespace's name. Instead, the binding should be a valid JavaScript identifier because it will exist as a global variable within your Worker.

When you create a namespace, it will have a name you choose (for example, `My tasks`), and an assigned ID (for example, `06779da6940b431db6e566b4846d64db`).

To execute your Worker, define the binding. In the followig example, the binding is called `TODO`. In the `kv_namespaces` portion of your `wrangler.toml` file, add:

```toml
name = "worker"

# ...

kv_namespaces = [
  { binding = "TODO", id = "06779da6940b431db6e566b4846d64db" }
]
```

With this, the deployed Worker will have a `TODO` global variable. Any methods on the `TODO` binding will map to the KV namespace with an ID of `06779da6940b431db6e566b4846d64db` – which you called `My Tasks` earlier.

{{<tabs labels="js/esm | js/sw">}}
{{<tab label="js/esm" default="true">}}

```js
export default {
  async fetch(request, env, ctx) {
    // Get the value for the "to-do:123" key
    // NOTE: Relies on the `TODO` KV binding that maps to the "My Tasks" namespace.
    let value = await env.TODO.get("to-do:123");

    // Return the value, as is, for the Response
    return new Response(value);
  },
};
```
{{</tab>}}
{{<tab label="js/sw">}}

```js
addEventListener("fetch", async (event) => {
  // Get the value for the "to-do:123" key
  // NOTE: Relies on the `TODO` KV binding that maps to the "My Tasks" namespace.
  let value = await TODO.get("to-do:123");

  // Return the value, as is, for the Response
  event.respondWith(new Response(value));
});
```
{{</tab>}}
{{</tabs>}}

## Reference KV from Durable Objects and Workers using Modules Syntax

The documentation above assumes you are using the original Service Worker syntax, where binding a KV namespace makes it available as a global variable with the name you chose, for example, `NAMESPACE`. Durable Objects use Modules syntax. Instead of a global variable, bindings are available as properties of the `env` parameter [passed to the constructor](/durable-objects/get-started/#1-write-a-class-to-define-a-durable-object). A typical example might look like:

```js
export class DurableObject {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    const valueFromKV = await this.env.NAMESPACE.get("someKey");
    return new Response(valueFromKV);
  }
}
```