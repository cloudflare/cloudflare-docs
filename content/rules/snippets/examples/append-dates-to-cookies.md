---
type: example
summary: Dynamically set a cookie expiration and test group.
goal:
  - A/B testing
operation:
  - Cookies manipulation
product:
  - Snippets
pcx_content_type: example
title: Append dates to cookies to use with A/B testing
layout: example
---

```js
export default {
    async fetch(request) {
        const response = await fetch(request);

        // Clone the response so that it's no longer immutable
        const newResponse = new Response(response.body, response);

        // Define the expiry and group variables
        const expiry = new Date(Date.now() + 7 * 86400000).toUTCString();
        const group = request.headers.get("userGroup") == "premium" ? "A" : "B";

        // Append the custom header with the values
        newResponse.headers.append(
            'Set-Cookie', `testGroup=${group}; Expires=${expiry}; Path=/`
        );

        return newResponse;
    },
};
```