---
type: example
summary: Define a delay to be used when incoming requests match a rule you consider suspicious.
goal:
  - Other
operation:
  - Request modification
product:
  - Snippets
pcx_content_type: example
title: Slow down suspicious requests
layout: example
---

```js
export default {
    async fetch(request) {
        // Define delay
        const delay_in_seconds = 5;
        // Introduce a delay
        await new Promise(resolve => setTimeout(resolve, delay_in_seconds * 1000)); // Set delay in milliseconds

        // Pass the request to the origin
        const response = await fetch(request);
        return response;
    },
};
```