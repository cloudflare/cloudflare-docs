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
updated: 2024-01-11
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

{{<render file="_return-json-example-js.md">}}

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
