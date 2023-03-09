---
type: example
summary: Inject Turnstile into HTML elements using the HTMLRewriter runtime API
tags:
  - Originless
pcx_content_type: configuration
title: Turnstile with Workers
weight: 1001
layout: example
---

{{<tabs labels="js/esm | js/sw">}}
{{<tab label="js/esm" default="true">}}
```js
export default {
	async fetch(request, env) {
		const SITE_KEY = env.SITE_KEY
		let res = await fetch(request)

		// Instantiate the API to run on specific elements, e.g. head, div etc.
		let newRes = new HTMLRewriter()

			// .on attaches the element handler and this allows you to match on element/attributes or to use the specific methods per the API
			.on('head', {
				element(element) {

					// In this case, we're using append to add a new script to the head element
					element.append(`<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>`, { html: true });
				},
			})
			.on('div', {
				element(element) {

					// Here we're using the getAttribute method to retrieve the id or class of an element
					if (element.getAttribute('id') === <NAME_OF_ATTRIBUTE>) {
						element.append(`<div class="cf-turnstile" data-sitekey="${SITE_KEY}" data-theme="light"></div>`, { html: true });
					}
				},
			})
			.transform(res);
		return newRes
	}
}
```
{{</tab>}}
{{<tab label="js/sw">}}
```js
addEventListener('fetch', event => {
    return event.respondWith(handleRequest(event.request));
})

	async function handleRequest (request) {
		// Service  Workers secrets are globab variables
		const SITE_KEY = SITE_KEY
		let res = await fetch(request)

		// Instantiate the API to run on specific elements, e.g. head, div etc.
		let newRes = new HTMLRewriter()

			// .on attaches the element handler and this allows you to match on element/attributes or to use the specific methods per the API
			.on('head', {
				element(element) {

					// In this case, we're using append to add a new script to the head element
					element.append(`<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>`, { html: true });
				},
			})
			.on('div', {
				element(element) {

					// Here we're using the getAttribute method to retrieve the id or class of an element
					if (element.getAttribute('id') === <NAME_OF_ATTRIBUTE>) {
						element.append(`<div class="cf-turnstile" data-sitekey="${SITE_KEY}" data-theme="light"></div>`, { html: true });
					}
				},
			})
			.transform(res);
		return newRes
	}
}
```
{{</tab>}}
{{</tabs>}}