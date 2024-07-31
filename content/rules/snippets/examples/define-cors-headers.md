---
type: example
summary: Adjust [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) headers and handle preflight requests.
goal:
  - Manage headers
operation:
  - Request modification
  - Response modification
product:
  - Snippets
pcx_content_type: example
title: Define CORS headers
layout: example
---

```js
// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Replace * with your allowed origin(s)
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Adjust allowed methods as needed
  "Access-Control-Allow-Headers": "Content-Type, Authorization", // Adjust allowed headers as needed
  "Access-Control-Max-Age": "86400", // Adjust max age (in seconds) as needed
};

export default {
  async fetch(request) {
    // Make a copy of the request to modify its headers
    const modifiedRequest = new Request(request);

    // Handle preflight requests (OPTIONS)
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          ...corsHeaders,
        },
        status: 200, // Respond with OK status for preflight requests
      });
    }

    // Pass the modified request through to the origin
    const response = await fetch(modifiedRequest);

    // Make a copy of the response to modify its headers
    const modifiedResponse = new Response(response.body, response);

    // Set CORS headers on the response
    Object.keys(corsHeaders).forEach(header => {
      modifiedResponse.headers.set(header, corsHeaders[header]);
    });

    return modifiedResponse;
  },
};
```