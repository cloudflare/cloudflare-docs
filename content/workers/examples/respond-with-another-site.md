---
type: example
summary: Respond to the Worker request with the response from another website
  (example.com in this example).
demo: https://respond-with-another-site.workers-sites-examples.workers.dev
tags:
  - Middleware
pcx_content_type: configuration
title: Respond with another site
weight: 12
layout: example
---

{{<tabs labels="js/esm | js/sw">}}
{{<tab label="js/esm" default="true">}}

```js
export default {
	async fetch(request) {
		async function MethodNotAllowed(request) {
			return new Response(`Method ${request.method} not allowed.`, {
				status: 405,
				headers: {
					Allow: 'GET',
				},
			});
		}
		// Only GET requests work with this proxy.
		if (request.method !== 'GET') return MethodNotAllowed(request);
		return fetch(`https://example.com`);
  },
};
```
{{</tab>}}
{{<tab label="js/sw">}}

```js
addEventListener('fetch', function (event) {
  event.respondWith(handleRequest(event.request));
});
async function handleRequest(request) {
  // Only GET requests work with this proxy.
  if (request.method !== 'GET') return MethodNotAllowed(request);
  return fetch(`https://example.com`);
}
function MethodNotAllowed(request) {
  return new Response(`Method ${request.method} not allowed.`, {
    status: 405,
    headers: {
      Allow: 'GET',
    },
  });
}
```
{{</tab>}}
{{</tabs>}}