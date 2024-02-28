---
pcx_content_type: navigation
title: API
weight: 3
---

# API

All of the actions available in the Javascript API:

{{<directory-listing>}}

To use the API, you need to use the {{<glossary-tooltip term_id="KV namespace">}}KV namespace{{</glossary-tooltip>}} like this:

```js
export default {
  async fetch(request, env, ctx) {
    const value = await env.NAMESPACE.list();
    // ...
  },
};
```

Read the [Get Started](https://developers.cloudflare.com/kv/get-started/) guide to know how ot set up the KV namespace.
