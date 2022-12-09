---
pcx_content_type: concept
title: APIs
---

# APIs

To integrate with third party APIs from Cloudflare Workers, you can use the [fetch API](/workers/runtime-apis/fetch/) to make HTTP requests to the API endpoint. You can then use the response data to modify or manipulate your content as needed.

For example, if you want to integrate with a weather API, you can make a fetch request to the API endpoint and retrieve the current weather data. You can then use this data to display the current weather conditions on your website.

To make the fetch request, you can use the following code snippet:

```
async function handleRequest(request) {
  // Make the fetch request to the third party API endpoint
  const response = await fetch('https://weather-api.com/endpoint', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  // Retrieve the data from the response
  const data = await response.json();

  // Use the data to modify or manipulate your content as needed
  return new Response(data);
}
```

Many APIs require authentication. You can store the necessary auth keys and secrets using encrypted environment variables in dashboard and API, or use [`wrangler secret put <KEY>`](/workers/wrangler/commands/#secret) from the wrangler CLI. Then, you can reference these secrets from your Worker.

You can also use the Cache API to cache data from the third party API, allowing you to optimize cacheable requests made to the API. Integrating with third party APIs from Cloudflare Workers is a simple and efficient way to add additional functionality and features to your application.

We recommend using [Custom Domains](/workers/platform/triggers/custom-domains/) when communicating with external APIs, which treat your Worker as your core application.
