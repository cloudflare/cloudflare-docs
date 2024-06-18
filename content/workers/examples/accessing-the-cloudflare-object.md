---
type: example
summary: Access custom Cloudflare properties and control how Cloudflare features
  are applied to every request.
languages:
  - JavaScript
  - TypeScript
  - Python
preview:
  - true
pcx_content_type: example
title: Accessing the Cloudflare Object
weight: 11
layout: example
---

{{<tabs labels="js | ts | py">}}
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
  async fetch(req): Promise<Response> {
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
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
import json
from js import Response, Headers, JSON

def on_fetch(request):
    error = json.dumps({ "error": "The `cf` object is not available inside the preview." })
    data = request.cf if request.cf is not None else error
    headers = Headers.new({"content-type":"application/json"}.items())
    return Response.new(JSON.stringify(data, None, 2), headers=headers)
```

{{</tab>}}
{{</tabs>}}
