---
type: example
summary: Return JSON directly from a Worker script, useful for building APIs and
  middleware.
demo: https://returning-json.workers-sites-examples.workers.dev
tags:
  - JSON
languages:
  - JavaScript
  - TypeScript
  - Python
  - Rust
preview:
  - true
pcx_content_type: example
title: Return JSON
weight: 2
layout: example
updated: 2024-01-11
---

{{<tabs labels="js | ts | py | rs">}}
{{<tab label="js" default="true">}}

{{<render file="_return-json-example-js.md">}}

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request): Promise<Response> {
    const data = {
      hello: "world",
    };

    return Response.json(data);
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from js import Response, Headers
import json

def on_fetch(request):
    data = json.dumps({"hello": "world"})
    headers = Headers.new({"content-type": "application/json"}.items())
    return Response.new(data, headers=headers)
```

{{</tab>}}
{{<tab label="rs">}}

```rs
use serde::{Deserialize, Serialize};
use worker::*;

#[derive(Deserialize, Serialize, Debug)]
struct Json {
    hello: String,
}

#[event(fetch)]
async fn fetch(_req: Request, _env: Env, _ctx: Context) -> Result<Response> {
    let data = Json {
        hello: String::from("world"),
    };
    Response::from_json(&data)
}
```

{{</tab>}}
{{</tabs>}}
