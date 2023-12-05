---
type: example
summary: Shows how to restrict access using the HTTP Basic schema.
tags:
  - Security
  - Originless
  - Authentication
pcx_content_type: configuration
title: HTTP Basic Authentication
playground: https://workers.cloudflare.com/playground#LYVwNgLglgDghgJwgegGYHsHALQBM4RwDcABAEbogB2+CAngLzbPYDqApmQNJQQBimYACFKNRHQCqAKwDiAGQAsCgB4A1MgFkEAZQCMCKUIBcLFh268BWEdVqTZileq16DQgLAAoAMLoqEdn9sABEoAGcYdDDeKD8jEgwsPAJiEio4YHYGACJ8QgA6KTDs0lQoMECMrNyUwuKvX39AiGwAFToYdni4GBgwKABjAliqZCk4ADc4MIGEWAgAamB0XHB2Ly92ZUikElx2VDhwCBIAb08ASHTM+OyAUWUMvvYSAEEABQBJbIAaS8IAOZheIAbWyWyeFV+JGyPSg0OyCHYET8YXY2QAun8AL5ETxeUzMcw8fiCGxiejSeRKNSaHT6QwNPwBIKhFHRaBxBKCZKEUjXapQGhbOolBLlSqZHJC-bKUVMppBdqdbq9fpDTmjcZTGZzGCLZarCobTzIABUZs8JDNJG0AAt0AB3MIkB2OkgQdAkJFhCBzAYnOADAbIl0gaJUAEeu0vAASrVa7xIQmmgxIMxjwDg+StNoAAmiXnaIBAYMDkMh9hN2GB0J0EPllgAvcpgbOYAHIQLYCTaSvoAZhZDmZDxxPIV4gCAx-yDYZ+XMkAvsIslstGCue9BgML5KDsCCofId5DF4BgZAIVADADsADZdDfc7nkJ5PFBgDsTqdkyBUKh2AQEhsQSBB0GAEgAHIqBWLoyD-ACEEgvFPAGVETkCND9iAhg0nYd1Wi2CA7ioLDAIACgAShQ81LWtEh3jAgIAxIOAATgIVfQ9D8hSjAhCAGABrF0yDodM4AAsAxLQz9EF4kgpjAEBkRIcN5IAA2gYBeO0CT2DuABHEA4DAdSc3ogAlA5AI9L1i1LctK3Yata3rXcBlrEBcFQNskXyGTkEdTBBMAocEGoLT2GwOEh0dThsFmDpPWQABiLTeLCPT2CMkzuSA5YkT2A8OJ3Rc83gBAMjOX05kjEC4BIMqKqq04at4kCyEa+i8yRCAQAQKgXVOCht3YOAqGxF9PFQagAxGbjtMjXSAMM4ywHIuAfnISizkuNDBsDIQ6ACF1cMw2CG3O-YNuovb0PII6TpIM7SIu-IrvYciyFuy4oFQEgNse5F8lEgI5ECAFpxIABCBhcLIIHd1B9hwcjacdvOC4LgrW0-QykhQC4sgXmnF5MsyEgKjRu0SCFEhMGw2ySBkir2EubHkBIR1eBpxL9XQfIwhAMgIAqfJ0qWvTVpM9nev6qgEhMtE8QuSbLjlgbmfofnBeF0X2HFnjJZWnL1rgRGtoR47kVutWti-IrDmOXbsYtS56Pd-Nmog04rKM5EIBApF-a4z2l29s5TneV5tG0VgAHkLOCeI2rqkDAgmRqLm6jXBqz61XwuaY6FIhIDwGO1yOD5TfS2jOMfZ-auKEGPPm8AB9Xs7gs56oLgXBFuQt8sZxgBNSgudbPD2FwViFf7xaSHgMIwiChBcHyEhWjtcJ0wdcBZ+J9mcf4oMY1nz0SDoSggNYYKbOmOeSEw7WAlntFZgPHMR85qzEKZ+y64KxVhrHWUK-lPLeV8gbAKa8QoICHPtMoAJ+rzlGB-XqQ5G73RbtoNu7do6x17hnfIhC46J2CCQAA-FQqCy9V4MyHtgg6qkEBgF7lQfCJAJAWTkFXbKNcID5H6mAH6WNV68ArgDER+R4DTgFA3LGFwhhoigsgSCRh2ZY1znhd0VkUSDU+pBV4VBr6cOZuNViwZQzRiLOBdg8AAQG0gmIrGKiXiQWQLWAElAIAaK0RzEgnwqCKSgHkEmMYYSTmnJgKATY0HZFdGNRmolvQHnlvJBqY4kwKAAAy6G-konGHA9hehgicNENBWIwlYLU7A0SZzQA1OiJJ-dAJbUftOXeQUD4ejmACJxCAAknyXnWEAMBaYK1JuQMCzp2m02AJkXAUACA1jEtMQS8lEhaxns0FZO5WLsSFIU7R6TNacL0ciSIhjyKQTkOgAZM96ZTnyJBLaP5fQEHDPEPJuhgKuOUdMDxyAF5Cg0S7IpnNt4vGyA02J8TNSJJjG0oCu9KknEdDOViU5Glzjfic5R90jgxLmAi+auFq4B3yMi7Cu4nEQFuXC0laCXEqyUX9AG0NiUOmZZqRRSiLg6IuSQfR1y0S3PHiAaeF8vTeOOW8iFArPl9WBCQX5fwBVYxpaFeImNNWBMYuBfULppnhhstsz++xZxKwJUoyCtTWD1JxXs5p4LIIpmiAMNJJlgA5GAGJGYYDoQV0QGiCAOQJCtD4NgAAHNkN5ASsbYg1QK7Et1U0BKbicEEGZ2CZDrq9fYuAMS925fCtBgs+i8FuVBAFgToVvBxeWzUrTGaEwqYQXY3MoYesGFtDAYBaxxUPus9M8AQwEo5eRaGH1Z4AB853pgrnml4sNcLutTAMFxirTl9XOVw0VqIjEaBMokJZ2KSVxLQa2wCrz3npkICqn5uTcn-LZUm4eSis07KtdAJWvchAIVvagMCwByKzq2pBMgQK7wKBceLdA2g8aRioihAVOMG1moGlUEgAAyJe0wGHr1YoVCI-QTipOmWUBBJw0K1ioASisDAAB8z9HifgqLcLDAojD0LXrgbImb7oyi2L3S1eybUieUPHVAtyjCsqEywrDYmkS-v2buIWZBU4AnIrkraUn01fvuvQlTuzrU7l1lp5DOmpMkAWCQXQdap3QwlgCZa+lTbkVwfgruFktpYZ2gumGrn3PS3Wt5juZCtr0MovypRQqD1XKPRKienCnmXzlQxhVeqlWPu+Wq-JKaBXaoQbqxNP8GKgeNbY1SaIgIWtUxJiz5WLj2rqQ0l1qy3W9q9UiH1fqA1oU6MGu0oaDwRqjbG+NRWlHJsTWm99qtP27vlrokVSWbmQUADwbgBI-ZIJK10kwXgwDmFMAIViQwr2htlxNyr8sACYX0zYuCV1VOW7XeDPlFRofptxupgtgX0mB2AJs1XN1NhmlsftlmchWwrD2bYAHLoBOAIWwd6zgPq+aqvJCg32XDm7iAkhJiSWDJKIOwVJHC0hcAyDwPhmTNBCOESIHIRjxDPbyVIAochxTADJA2Z4wBijKFTKovOawC+pRAc82QFQshaMqLoHoiLID6BxKgJoAA80Ngjx28K0Ue7w7iuhl2AZjngtdC8puNAEORAjZAtxcK3ySnfO8yIQZmo2EHjeyJG6NcaSDIDd1rj3DVAHYAEVACYOQAAaPZXjYF8LJaAZAoTM0Z-4HInw7gMBnk4xJwf2ah+KmkcX2QJj7kdF+RJ+0Fe87CdOBgVZBhRW5rgac+mqAxBMoDoYFQGAFNyYXkP0B9bMe8JAnyiAXh3wQPAl07w2x0ABGBWwWvkBj4qCH-oVBBJaKRGAHIvo6AVDCDGA8gmlF2iRKgHIgDHLq5X2vmg+QqwnZWBAygUCZ9v+coFSXexQHCAU-GBFeK-bGJ3DfGlC3S4LXCgXAOgEPZZTODyQjHIafH0R3LRLXD8KMMIBAAYe-NcR-ZfVfCnP-CYD-DeDyb-TAg2KsNAaBXcGASMEfYvSsaPEPLMIUN3Z3FA5mNsFeXne+BBbAbxdAR3DfFAvgrXGAPgi4DgfnexaGbhVRLpRfMgl-GVFXLiXAU7F4BqOfeBLaT+VZapfYZYWyAJc-GfemKgXfdgDpKpTFQIb1RAoqPodAMSZZJEAMKSJmaZfPF4VJMNaASMVSCZOAAJSfOg6BC7UQIRHAtXWQu0XQZjVgUbE4XeIw0QqhaA9InA+QgJV4EgWIryegkgYwmyXeAAKUmDgG0FmHmAz32CvgnkdDmHO2nAIEOxoDP3aP6i5k4BsN4BBxdGyT6QkjKC9V8PYH8LEjpnKJ-yREghdGCMpgHDQRdEQAp1sQCTXjAFwA6UHSdHkmvilQyy2POzIkEKiBJi9AuKAkCFniwxdDpgZhsk9ACR9GuR0NJgggKheCMkGEEikmSOKKUSt3SNaHoFphOCeLRDAFQAKNkMhKUXjgVieMpgOGyJ2PEg41n1EOjF6N3nCioG7wiL8GjDRTGM3gOyGCoACRnl4HhMpmj0MKqULBqx9GOBdBjD8hIDuGWROGmTkRpjgAoGrCZhBRgCgGsKVRXFdCdBqwhEJKqOJNG36JUmWX-EAmaG9F8WBn2wnkZNYh3C9BZIgACWmVuMvm5MxQIDWNGRXigDT05MPlqijGxM4WUGyP2Aagyz+gNghJD2QB4KoCgOQAQKQMt1PDNwt2J1MFJ1JGsAp3ECpxpGcHpDcHlyZzZFZxiC5E5zyG53LzD1LJFwlB52yDT3QDIDlwZ0VEVw6GVx6CrQ1BGDGDCD8BNFOGyAjPbkNDWGyCMGyCk1FGxCTLME4BJCsGEHTMpAcCzLpFcEMGYC8CAA
weight: 1001
layout: example
---

{{<Aside type="warning" header="Caution when using in production">}}

This code is provided as a sample, and is not suitable for production use. Basic Authentication sends credentials unencrypted, and must be used with an HTTPS connection to be considered secure. For a production-ready authentication system, consider using [Cloudflare Access](https://developers.cloudflare.com/cloudflare-one/applications/configure-apps/self-hosted-apps/)

{{</Aside>}}

{{<tabs labels="js | ts">}}
{{<tab label="js" default="true">}}

```js
/**
 * Shows how to restrict access using the HTTP Basic schema.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
 * @see https://tools.ietf.org/html/rfc7617
 *
 */

import { Buffer } from 'node:buffer';

const encoder = new TextEncoder();

/**
 * Protect against timing attacks by safely comparing values using `timingSafeEqual`.
 * Refer to https://developers.cloudflare.com/workers/runtime-apis/web-crypto/#timingsafeequal for more details
 * @param {string} a 
 * @param {string} b 
 * @returns {boolean}
 */
function timingSafeEqual(a, b) {
	const aBytes = encoder.encode(a);
	const bBytes = encoder.encode(b);

	if (aBytes.byteLength !== bBytes.byteLength) {
		// Strings must be the same length in order to compare
		// with crypto.subtle.timingSafeEqual
		return false;
	}

	return crypto.subtle.timingSafeEqual(aBytes, bBytes);
}

export default {
	/**
	 * 
	 * @param {Request} request 
	 * @param {{PASSWORD: string}} env 
	 * @returns 
	 */
	async fetch(request, env) {
		const BASIC_USER = 'admin';

		// You will need an admin password. This should be
		// attached to your Worker as an encrypted secret.
		// Refer to https://developers.cloudflare.com/workers/configuration/secrets/
		const BASIC_PASS = env.PASSWORD ?? 'password';

		const url = new URL(request.url);

		switch (url.pathname) {
			case '/':
				return new Response('Anyone can access the homepage.');

			case '/logout':
				// Invalidate the "Authorization" header by returning a HTTP 401.
				// We do not send a "WWW-Authenticate" header, as this would trigger
				// a popup in the browser, immediately asking for credentials again.
				return new Response('Logged out.', { status: 401 });

			case '/admin': {
				// The "Authorization" header is sent when authenticated.
				const authorization = request.headers.get('Authorization');
				if (!authorization) {
					return new Response('You need to login.', {
						status: 401,
						headers: {
							// Prompts the user for credentials.
							'WWW-Authenticate': 'Basic realm="my scope", charset="UTF-8"',
						},
					});
				}
				const [scheme, encoded] = authorization.split(' ');

				// The Authorization header must start with Basic, followed by a space.
				if (!encoded || scheme !== 'Basic') {
					return new Response('Malformed authorization header.', { status: 400 });
				}

				const credentials = Buffer.from(encoded, 'base64').toString();

				// The username & password are split by the first colon.
				//=> example: "username:password"
				const index = credentials.indexOf(':');
				const user = credentials.substring(0, index);
				const pass = credentials.substring(index + 1);

				if (!timingSafeEqual(BASIC_USER, user) || !timingSafeEqual(BASIC_PASS, pass)) {
					return new Response('You need to login.', {
						status: 401,
						headers: {
							// Prompts the user for credentials.
							'WWW-Authenticate': 'Basic realm="my scope", charset="UTF-8"',
						},
					});
				}

				return new Response('🎉 You have private access!', {
					status: 200,
					headers: {
						'Cache-Control': 'no-store',
					},
				});
			}
		}

		return new Response('Not Found.', { status: 404 });
	},
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
/**
 * Shows how to restrict access using the HTTP Basic schema.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication
 * @see https://tools.ietf.org/html/rfc7617
 *
 */

import { Buffer } from 'node:buffer';

const encoder = new TextEncoder();

/**
 * Protect against timing attacks by safely comparing values using `timingSafeEqual`.
 * Refer to https://developers.cloudflare.com/workers/runtime-apis/web-crypto/#timingsafeequal for more details
 */
function timingSafeEqual(a: string, b: string) {
	const aBytes = encoder.encode(a);
	const bBytes = encoder.encode(b);

	if (aBytes.byteLength !== bBytes.byteLength) {
		// Strings must be the same length in order to compare
		// with crypto.subtle.timingSafeEqual
		return false;
	}

	return crypto.subtle.timingSafeEqual(aBytes, bBytes);
}

export default <ExportedHandler<{ PASSWORD: string }>>{
	async fetch(request, env) {
		const BASIC_USER = 'admin';

		// You will need an admin password. This should be
		// attached to your Worker as an encrypted secret.
		// Refer to https://developers.cloudflare.com/workers/configuration/secrets/
		const BASIC_PASS = env.PASSWORD ?? 'password';

		const url = new URL(request.url);

		switch (url.pathname) {
			case '/':
				return new Response('Anyone can access the homepage.');

			case '/logout':
				// Invalidate the "Authorization" header by returning a HTTP 401.
				// We do not send a "WWW-Authenticate" header, as this would trigger
				// a popup in the browser, immediately asking for credentials again.
				return new Response('Logged out.', { status: 401 });

			case '/admin': {
				// The "Authorization" header is sent when authenticated.
				const authorization = request.headers.get('Authorization');
				if (!authorization) {
					return new Response('You need to login.', {
						status: 401,
						headers: {
							// Prompts the user for credentials.
							'WWW-Authenticate': 'Basic realm="my scope", charset="UTF-8"',
						},
					});
				}
				const [scheme, encoded] = authorization.split(' ');

				// The Authorization header must start with Basic, followed by a space.
				if (!encoded || scheme !== 'Basic') {
					return new Response('Malformed authorization header.', { status: 400 });
				}

				const credentials = Buffer.from(encoded, 'base64').toString();

				// The username and password are split by the first colon.
				//=> example: "username:password"
				const index = credentials.indexOf(':');
				const user = credentials.substring(0, index);
				const pass = credentials.substring(index + 1);

				if (!timingSafeEqual(BASIC_USER, user) || !timingSafeEqual(BASIC_PASS, pass)) {
					return new Response('You need to login.', {
						status: 401,
						headers: {
							// Prompts the user for credentials.
							'WWW-Authenticate': 'Basic realm="my scope", charset="UTF-8"',
						},
					});
				}

				return new Response('🎉 You have private access!', {
					status: 200,
					headers: {
						'Cache-Control': 'no-store',
					},
				});
			}
		}

		return new Response('Not Found.', { status: 404 });
	},
};
```

{{</tab>}}
{{</tabs>}}
