---
pcx_content_type: concept
title: APIs
---

# APIs

To integrate with third party APIs from Cloudflare Workers, use the [fetch API](/workers/runtime-apis/fetch/) to make HTTP requests to the API endpoint. Then use the response data to modify or manipulate your content as needed.

For example, if you want to integrate with a weather API, make a fetch request to the API endpoint and retrieve the current weather data. Then use this data to display the current weather conditions on your website.

To make the `fetch()` request,  add the following code to your project's `src/index.js` file:

```js
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

## Authentication

If your API requires authentication, use Wrangler secrets to securely store your credentials. To do this, create a secret in your Cloudflare Workers project using the following [`wrangler secret`](/workers/wrangler/commands/#secret) command:

```sh
wrangler secret put SECRET_NAME
```

Then, retrieve the secret value in your code using the following code snippet:

```js
const secretValue = env.SECRET_NAME;
```

Then use the secret value to authenticate with the external service. For example, if the external service requires an API key for authentication, include it in your request headers.

For services that require mTLS authentication, use [mTLS certificates](/workers/runtime-apis/mtls) to present a client certificate.

## Tips

* Use the Cache API to cache data from the third party API. This allows you to optimize cacheable requests made to the API. Integrating with third party APIs from Cloudflare Workers adds additional functionality and features to your application.

* Use [Custom Domains](/workers/platform/triggers/custom-domains/) when communicating with external APIs, which treat your Worker as your core application.
