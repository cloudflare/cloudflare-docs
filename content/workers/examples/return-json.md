---
type: example
summary: Return JSON directly from a Worker script, useful for building APIs and
  middleware.
demo: https://returning-json.workers-sites-examples.workers.dev
tags:
  - JSON
  - Originless
pcx_content_type: configuration
title: Return JSON
weight: 2
layout: example
playground: true
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    const data = {
      hello: "world",
    };

    return Response.json(data);
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default <ExportedHandler>{
  async fetch(request: Request) {
    const data = {
      hello: "world",
    };

    return Response.json(data);
  },
};
```

{{</tab>}}
{{</tabs>}}
