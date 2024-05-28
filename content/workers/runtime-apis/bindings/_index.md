---
pcx_content_type: concept
title: Bindings (env)
meta:
  description: Worker Bindings that allow for interaction with other Cloudflare Resources.
---

# Bindings (`env`)

Bindings allow your Worker to interact with resources on the Cloudflare Developer Platform.

The following bindings available today:

{{<directory-listing showDescriptions="true">}}

## What is a binding?

When you declare a binding on your Worker, you grant it a specific capability, such as being able to read and write files to an [R2](/r2/) bucket. For example:

```toml
---
filename: wrangler.toml
---
main = "./src/index.js"
r2_buckets = [
  { binding = "MY_BUCKET", bucket_name = "<MY_BUCKET_NAME>" }
]
```

```js
---
filename: index.js
---
export default {
  async fetch(request, env) {
    const key = url.pathname.slice(1);
    await env.MY_BUCKET.put(key, request.body);
    return new Response(`Put ${key} successfully!`);
  }
}
```

You can think of a binding as a permission and an API in one piece. With bindings, you never have to add secret keys or tokens to your Worker in order to access resources on your Cloudflare account — the permission is embedded within the API itself. The underlying secret is never exposed to your Worker's code, and therefore can't be accidentally leaked.

## Making changes to bindings

When you deploy a change to your Worker, and only change its bindings (i.e. you don't change the Worker's code), Cloudflare may reuse existing isolates that are already running your Worker. This improves performance — you can change an environment variable or other binding without unnecessarily reloading your code.

However, this does mean that you must be careful when "polluting" global scope with derivatives of your bindings. For example, if you create an external client instance which uses a secret API key on `env`, you must ensure that you don't place this client instance in a global scope. If you do, the client instance might continue to exist despite making changes to the secret which is likely undesirable. Instead of polluting global scope, you should create a new client instance for each request, or, if you have more advanced needs, you may want to explore the [AsyncLocalStorage API](/workers/runtime-apis/nodejs/asynclocalstorage/) which provides another mechanism for exposing values down to child execution handlers.
