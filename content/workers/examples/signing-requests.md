---
type: example
summary: Verify a signed request using the HMAC and SHA-256 algorithms or
  return a 403.
tags:
  - Security
  - WebCrypto
pcx_content_type: configuration
playground: https://workers.cloudflare.com/playground#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-e+lGdf2A2-Ru2e+7V6b0cIAve7HGHF1STtLl9MwOM5keQ2kfG9y9J6CAuCLBjkvMNRG2zbsG9UauBxHiVwhIeesGJOYMkFJrDUjsHSBkTgFRVcCCEMIHJgHckwLyRIpABSZGcWALzjltLADAGKEoZRVcZHV5rydEAdcZEl40FobQOgYSTMgKeQojQAB5G0BHae4ZoIE3i3C0mbsAX3XDO+19Bey25Mh+AyIH84wfhW4GjzHki-VXyIElZkemzQABi2AtAZBNgn53Se-e6WwGzXDmQAAa2B6bw08N56AZBITR0VBATIHxbgMFgmbPPyAC9F8N2MVrsYzR56UY0NXUBcCTQYIZfoPhsCQSn3l3TBbqtgGwFMF26ROA5EED3gv0AVlffcB8uyDkJb-MvG8eydB-gumoLgZ3yBD9lAL+Z8ipDERgEyBuOgZR34+BPgZCkIviIioCZBU6PJTy37340A5CGQwAui4DvKUCfIOTwE+BjAuTGSa4b4QB-4M5lrAE8zR5P45xwDx4PrO4UC4B0AF64C4anT2RlqZBn6IiFAJ4x4mjILBB+oQE6TU5ATQF36UBwEIFIEoE2RsGOSGRoBfJIiVzbj77sRP4MFjB95CacHO5qFMGTDBBq6X7YAmT-DoBR6qG4ZaEwCcHnBCQ4GISNoMy4RGZX434iEP6aS+BhS4AzC5r9T4r2jfgoSawETCxYSYSkLnDvzn5xxCjpJeLZy5zOy0H5g9DoBlQMHYa3RlQGy4Jd7PAmbhQ6ToogAwB4QREn6oHSF4Q6yiEcykJP5WH1EvicBfZCQvy6Z9QX5Sz2gFRkEtH1GNE7b5QVFSHyFdHSz0QtLaiTi6hyTRx7AkDZqxgzCWyGKQw0D-6LGCQQQ+BkAREcg+A4yybNDNBvAYRNi2hkQZERRZEr4DSn7yFHF5EkAmQajAJ9SwFwRqwRGuQCq4DhYKzoCQQ7rZoGyvHBFphMG-yaSdQOh+BwSRzmR3GYCRh8QRHsFrpfFhE5xujwrPCdj9DkTxz1EO5aHNFfbND7onSwmohgCoB9GWHWHtJSSwkvH7DHCCzwQQjPD+EOhrH0RApUAFo7qpb8zwSRB3xgTGIDBUARGwQnQnS9C+GLSojPzPDsFHCXg5zfIkC3AMFmKZL4JwAUC5oGzICwhok7aqk5Lxi5GYJPDjG3KywbFIi7BEz+iNB6KUCeE0RSmnSSTywIQ-j6kRG4KQkGzWnZwEBHGy4RCN7PAObkBRasm0wbAcl7D9RglEyOQkmDEx7IABxCikHIA0F0FB7IAh6B74i868786kiWCUg2A0j2D0iOAuAeDMhW5siy6RDy6xCK4JCEAq4VCZBJ58h64SiG6N7oBkAW4dkt7W4qh4RqgezAIjBxZGgnAZCFlUALiLDLCQh6AZAygigFAZBYjVk1mEh1kWDkhWBUi2C0gOC6DMBuBAA
title: Sign requests
weight: 1001
layout: example
---

You can both verify and generate signed requests from within a Worker using the [Web Crypto APIs](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/subtle).

The following worker will:
* For request URLs beginning with `/generate/`, replace `/generate/` with `/verify/`, sign the resulting path with its timestamp, and return the full, signed URL in the response body.

* For request URLs beginning with `/verify/`, verify the signed URL and allow the request through.

It makes use of the [Node.JS Buffer API](/workers/runtime-apis/nodejs/buffer/), which is available as part of the Worker's runtime [Node.js compatibility mode](/workers/runtime-apis/nodejs/)

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
import { Buffer } from 'node:buffer';

const encoder = new TextEncoder();

export default {
	/**
	 * 
	 * @param {Request} request 
	 * @param {{SECRET_DATA: string}} env 
	 * @returns 
	 */
	async fetch(request, env) {
		// You will need some secret data to use as a symmetric key. This should be
		// attached to your Worker as an encrypted secret.
		// Refer to https://developers.cloudflare.com/workers/configuration/secrets/
		const secretKeyData = encoder.encode(env.SECRET_DATA ?? 'my secret symmetric key');

		// Import your secret as a CryptoKey for both 'sign' and 'verify' operations
		const key = await crypto.subtle.importKey('raw', secretKeyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);

		const url = new URL(request.url);

		// This is a demonstration Worker that allows unauthenticated access to both
		// /generate and /verify. In a real application you'd want to make sure that
		// users could only generate signed URLs when authenticated
		if (url.pathname.startsWith('/generate/')) {
			url.pathname = url.pathname.replace('/generate/', '/verify/');
			// Signed requests expire after one minute. Note that you should choose
			// expiration durations dynamically, depending on, for example, the path or a query
			// parameter.
			const expirationMs = 60000;
			const expiry = Date.now() + expirationMs;

			// This array contains all the data about the request that you want to be able to verify
			// Here we only sign the expiry and the pathname, but often you'll want to
			// include more data (for instance, the URL hostname or query parameters)
			const dataToAuthenticate = JSON.stringify([url.pathname, expiry]);

			const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(dataToAuthenticate));

			// Refer to https://developers.cloudflare.com/workers/runtime-apis/nodejs/
			// for more details on using NodeJS APIs in Workers
			const base64Mac = Buffer.from(mac).toString('base64');

			url.searchParams.set('mac', base64Mac);
			url.searchParams.set('expiry', expiry.toString());

			return new Response(`${url.pathname}${url.search}`);
		} else if (url.pathname.startsWith('/verify/')) {
			// Make sure you have the minimum necessary query parameters.
			if (!url.searchParams.has('mac') || !url.searchParams.has('expiry')) {
				return new Response('Missing query parameter', { status: 403 });
			}

			const expiry = Number(url.searchParams.get('expiry'));

			const dataToAuthenticate = JSON.stringify([url.pathname, expiry]);

			const receivedMac = Buffer.from(url.searchParams.get('mac'), 'base64');

			// Use crypto.subtle.verify() to guard against timing attacks. Since HMACs use
			// symmetric keys, you could implement this by calling crypto.subtle.sign() and
			// then doing a string comparison -- this is insecure, as string comparisons
			// bail out on the first mismatch, which leaks information to potential
			// attackers.
			const verified = await crypto.subtle.verify('HMAC', key, receivedMac, encoder.encode(dataToAuthenticate));

			if (!verified) {
				return new Response('Invalid MAC', { status: 403 });
			}

			if (Date.now() > expiry) {
				return new Response(`URL expired at ${new Date(expiry)}`, { status: 403 });
			}
		}

		return fetch(new URL(url.pathname, 'https://example.com'), request);
	},
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
import { Buffer } from 'node:buffer';

const encoder = new TextEncoder();

export default <ExportedHandler<{ SECRET_DATA: string }>>{
	async fetch(request, env) {
		// You will need some secret data to use as a symmetric key. This should be
		// attached to your Worker as an encrypted secret.
		// Refer to https://developers.cloudflare.com/workers/configuration/secrets/
		const secretKeyData = encoder.encode(env.SECRET_DATA ?? 'my secret symmetric key');

		// Import your secret as a CryptoKey for both 'sign' and 'verify' operations
		const key = await crypto.subtle.importKey('raw', secretKeyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);

		const url = new URL(request.url);

		// This is a demonstration Worker that allows unauthenticated access to both
		// /generate and /verify. In a real application you'd want to make sure that
		// users could only generate signed URLs when authenticated
		if (url.pathname.startsWith('/generate/')) {
			url.pathname = url.pathname.replace('/generate/', '/verify/');
			// Signed requests expire after one minute. Note that you should choose
			// expiration durations dynamically, depending on, for example, the path or a query
			// parameter.
			const expirationMs = 60000;
			const expiry = Date.now() + expirationMs;

			// This array contains all the data about the request that you want to be able to verify
			// Here we only sign the expiry and the pathname, but often you'll want to
			// include more data (for instance, the URL hostname or query parameters)
			const dataToAuthenticate = JSON.stringify([url.pathname, expiry]);

			const mac = await crypto.subtle.sign('HMAC', key, encoder.encode(dataToAuthenticate));

			// Refer to https://developers.cloudflare.com/workers/runtime-apis/nodejs/
			// for more details on using NodeJS APIs in Workers
			const base64Mac = Buffer.from(mac).toString('base64');

			url.searchParams.set('mac', base64Mac);
			url.searchParams.set('expiry', expiry.toString());

			return new Response(`${url.pathname}${url.search}`);
		} else if (url.pathname.startsWith('/verify/')) {
			// Make sure you have the minimum necessary query parameters.
			if (!url.searchParams.has('mac') || !url.searchParams.has('expiry')) {
				return new Response('Missing query parameter', { status: 403 });
			}

			const expiry = Number(url.searchParams.get('expiry'));

			const dataToAuthenticate = JSON.stringify([url.pathname, expiry]);

			const receivedMac = Buffer.from(url.searchParams.get('mac'), 'base64');

			// Use crypto.subtle.verify() to guard against timing attacks. Since HMACs use
			// symmetric keys, you could implement this by calling crypto.subtle.sign() and
			// then doing a string comparison -- this is insecure, as string comparisons
			// bail out on the first mismatch, which leaks information to potential
			// attackers.
			const verified = await crypto.subtle.verify('HMAC', key, receivedMac, encoder.encode(dataToAuthenticate));

			if (!verified) {
				return new Response('Invalid MAC', { status: 403 });
			}

			if (Date.now() > expiry) {
				return new Response(`URL expired at ${new Date(expiry)}`, { status: 403 });
			}
		}

		return fetch(new URL(url.pathname, 'https://example.com'), request);
	},
};

```

{{</tab>}}
{{</tabs>}}
