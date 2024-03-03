---
pcx_content_type: concept
title: Bindings
meta:
  description: Worker Bindings that allow for interaction with other Cloudflare Resources.
---

# Bindings

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

## Why bindings?

<TODO>