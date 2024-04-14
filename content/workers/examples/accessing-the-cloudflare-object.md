---
type: example
summary: Access custom Cloudflare properties and control how Cloudflare features
  are applied to every request.
demo: https://accessing-the-cloudflare-object.workers-sites-examples.workers.dev
tags:
  - Originless
pcx_content_type: configuration
title: Accessing the Cloudflare Object
weight: 11
layout: example
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
---
playground: true
---
export default {
  async fetch(req) {
    const data =
      req.cf !== undefined
        ? req.cf
        : { error: "The `cf` object is not available inside the preview." };

    return new Response(JSON.stringify(data, null, 2), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(req: Request) {
    const data =
      req.cf !== undefined
        ? req.cf
        : { error: "The `cf` object is not available inside the preview." };

    return new Response(JSON.stringify(data, null, 2), {
      headers: {
        "content-type": "application/json;charset=UTF-8",
      },
    });
  },
};
```

{{</tab>}}
{{</tabs>}}
