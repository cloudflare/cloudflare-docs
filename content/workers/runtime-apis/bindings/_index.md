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

As a result, you must be careful when "polluting" global scope with derivatives of your bindings. Anything you create there might continue to exist despite making changes to any underlying bindings. Consider an external client instance which uses a secret API key accessed from `env`: if you put this client instance in a global scope and then make changes to the secret, a client instance using the original value might continue to exist. The correct approach would be to create a new client instance for each request. If you have more advanced needs, explore the [AsyncLocalStorage API](/workers/runtime-apis/nodejs/asynclocalstorage/), which provides a mechanism for exposing values down to child execution handlers.
