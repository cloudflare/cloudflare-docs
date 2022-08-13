---
type: example
summary: Redirect requests from one URL to another or from one set of URLs to
  another set.
tags:
  - Middleware
pcx_content_type: configuration
title: Redirect
weight: 6
layout: example
---

## Redirect all requests to one URL

```js
const destinationURL = 'https://example.com';
const statusCode = 301;

async function handleRequest(request) {
	return Response.redirect(destinationURL, statusCode);
}

addEventListener('fetch', async event => {
	event.respondWith(handleRequest(event.request));
});
```

## Redirect requests from one domain to another

```js
const base = 'https://example.com';
const statusCode = 301;

async function handleRequest(request) {
	const url = new URL(request.url);
	const { pathname, search } = url;

	const destinationURL = base + pathname + search;

	return Response.redirect(destinationURL, statusCode);
}

addEventListener('fetch', async event => {
	event.respondWith(handleRequest(event.request));
});
```
