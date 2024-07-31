---
type: example
summary: Respond with information about the incoming request provided by Cloudflare’s global network.
goal:
  - Logging
operation:
  - Response modification
product:
  - Snippets
pcx_content_type: example
title: Return information about the incoming request
layout: example
---

```js
export default {
    async fetch(request) {
        // For any request, respond with JSON object containing all incoming request properties provided by Cloudflare network
        return Response.json(request.cf, {
            // Add new header to identify request was served by Snippets
            headers: {
                "x-snippets-hello": "Hello from Cloudflare Snippets",
            },
        });
    },
};
```