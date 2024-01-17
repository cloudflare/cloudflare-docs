---
type: example
summary: Send a request to a remote server, read HTML from the response, and
  serve that HTML.
tags:
  - Originless
pcx_content_type: configuration
title: Fetch HTML
weight: 3
layout: example
updated: 2024-01-11
---

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

{{<render file="_fetch-html-example-js.md">}}

{{</tab>}}
{{<tab label="ts">}}

```ts
export default <ExportedHandler>{
  async fetch(request) {
    /**
     * Replace `remote` with the host you wish to send requests to
     */
    const remote = "https://example.com";

    return await fetch(remote, request);
  },
};
```

{{</tab>}}
{{</tabs>}}
