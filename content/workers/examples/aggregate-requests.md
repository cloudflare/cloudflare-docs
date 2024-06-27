---
type: example
summary: Send two GET request to two urls and aggregates the responses into one
  response.
languages:
  - JavaScript
  - TypeScript
  - Python
pcx_content_type: example
title: Aggregate requests
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    // someHost is set up to return JSON responses
    const someHost = "https://jsonplaceholder.typicode.com";
    const url1 = someHost + "/todos/1";
    const url2 = someHost + "/todos/2";

    const responses = await Promise.all([fetch(url1), fetch(url2)]);
    const results = await Promise.all(responses.map((r) => r.json()));

    const options = {
      headers: { "content-type": "application/json;charset=UTF-8" },
    };
    return new Response(JSON.stringify(results), options);
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request) {
    // someHost is set up to return JSON responses
    const someHost = "https://jsonplaceholder.typicode.com";
    const url1 = someHost + "/todos/1";
    const url2 = someHost + "/todos/2";

    const responses = await Promise.all([fetch(url1), fetch(url2)]);
    const results = await Promise.all(responses.map(r => r.json()));

	const options = {headers: {"content-type": "application/json;charset=UTF-8"}};
    return new Response(JSON.stringify(results), options);
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
from js import Response, fetch, Headers, JSON, Promise

async def on_fetch(request):
    # some_host is set up to return JSON responses
    some_host = "https://jsonplaceholder.typicode.com"
    url1 = some_host + "/todos/1"
    url2 = some_host + "/todos/2"

    responses = await Promise.all([fetch(url1), fetch(url2)])
    results = await Promise.all(map(lambda r: r.json(), responses))

    headers = Headers.new({"content-type": "application/json;charset=UTF-8"}.items())
    return Response.new(JSON.stringify(results), headers=headers)
```

{{</tab>}}
{{</tabs>}}
