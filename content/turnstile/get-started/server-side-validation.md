---
title: Server-side validation
weight: 2
pcx_content_type: get-started
---

# Server-side validation

Turnstile needs to be verified using siteverify because it is a front-end widget that creates a token which is cryptographically secured. To ensure that a token is not forged by an attacker or has not been consumed yet, it is necessary to check the validity of a token using Cloudflare's siteverify API.

You must call the siteverify endpoint to validate the Turnstile widget response from your website’s backend. The widget response must only be considered valid once it has been verified by the siteverify endpoint. The presence of a response alone is not enough to verify it as it does not protect from replay or forgery attacks. In some cases, Turnstile may purposely create invalid responses that are rejected by the siteverify API.

Tokens issued to Turnstile using the success callbacks, via explicit or implicit rendering, must be validated using the siteverify endpoint. The siteverify API will only validate a token once. If a token has already been checked, the siteverify API will yield an error on subsequent verification attempts indicating that a token has already been consumed.

{{<Aside type="note">}}
A Turnstile token can have up to 2048 characters.

It is also valid for 300 seconds before it is rejected by siteverify.
{{</Aside>}}

The siteverify endpoint needs to be passed a {{<glossary-tooltip term_id="secret key">}}secret key{{</glossary-tooltip>}} that is associated with the {{<glossary-tooltip term_id="sitekey">}}sitekey{{</glossary-tooltip>}}. The secret key will be provisioned alongside the sitekey when you create a widget. Furthermore, the response needs to be passed to the siteverify endpoint.

A response may only be validated once. If the same response is presented twice, the second and each subsequent request will generate an error stating that the response has already been consumed. If an application requires to retry failed requests, it must utilize the idempotency functionality. You can do so by providing a UUID as the `idempotency_key` parameter of your `POST` request when initially validating the response and the same UUID with any subsequent request for that response.

{{<Aside type="note">}}
Refer to the [full demo on GitHub](https://github.com/cloudflare/turnstile-demo-workers/blob/main/src/index.mjs).
{{</Aside>}}

<div>

```sh
---
header: Example using cURL
---
$ curl 'https://challenges.cloudflare.com/turnstile/v0/siteverify' --data 'secret=verysecret&response=<RESPONSE>'
{
  "success": true,
  "error-codes": [],
  "challenge_ts": "2022-10-06T00:07:23.274Z",
  "hostname": "example.com"
}
```
</div>


{{<tabs labels="URL encoded | JSON">}}
{{<tab label="url encoded" default="true">}}

```js
---
header: Example using fetch from Cloudflare Workers
---
// This is the demo secret key. In production, we recommend
// you store your secret key(s) safely.
const SECRET_KEY = '1x0000000000000000000000000000000AA';

async function handlePost(request) {
	const body = await request.formData();
	// Turnstile injects a token in "cf-turnstile-response".
	const token = body.get('cf-turnstile-response');
	const ip = request.headers.get('CF-Connecting-IP');

	// Validate the token by calling the
	// "/siteverify" API endpoint.
	let formData = new FormData();
	formData.append('secret', SECRET_KEY);
	formData.append('response', token);
	formData.append('remoteip', ip);

	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: formData,
		method: 'POST',
	});

	const outcome = await result.json();
	if (outcome.success) {
		// ...
	}
}
```
{{</tab>}}

{{<tab label="JSON">}}

```js
---
header: Example using fetch from Cloudflare Workers
---
// This is the demo secret key. In production, we recommend
// you store your secret key(s) safely.
const SECRET_KEY = '1x0000000000000000000000000000000AA';
​
async function handlePost(request) {
	const body = await request.formData();
	// Turnstile injects a token in "cf-turnstile-response".
	const token = body.get('cf-turnstile-response');
	const ip = request.headers.get('CF-Connecting-IP');
​
	// Validate the token by calling the
	// "/siteverify" API endpoint.
	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const result = await fetch(url, {
		body: JSON.stringify({
			secret: SECRET_KEY,
			response: token,
			remoteip: ip
		}),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});
​
	const outcome = await result.json();
	if (outcome.success) {
		// ...
	}
}
```

{{</tab>}}
{{</tabs>}}


{{<tabs labels="URL encoded | JSON">}}
{{<tab label="url encoded" default="true">}}

```js
---
header: Example using idempotency functionality
---
// This is the demo secret key. In production, we recommend
// you store your secret key(s) safely.
const SECRET_KEY = '1x0000000000000000000000000000000AA';

async function handlePost(request) {
	const body = await request.formData();
	// Turnstile injects a token in "cf-turnstile-response".
	const token = body.get('cf-turnstile-response');
	const ip = request.headers.get('CF-Connecting-IP');

	// Validate the token by calling the
	// "/siteverify" API endpoint.
	let formData = new FormData();
	formData.append('secret', SECRET_KEY);
	formData.append('response', token);
	formData.append('remoteip', ip);
	const idempotencyKey = crypto.randomUUID();
	formData.append('idempotency_key', idempotencyKey);

	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const firstResult = await fetch(url, {
		body: formData,
		method: 'POST',
	});
	const firstOutcome = await firstResult.json();
	if (firstOutcome.success) {
		// ...
	}

	// A subsequent validation request to the "/siteverify"
	// API endpoint for the same token as before, providing
	// the associated idempotency key as well.
	const subsequentResult = await fetch(url, {
		body: formData,
		method: 'POST',
	});

	const subsequentOutcome = await subsequentResult.json();
	if (subsequentOutcome.success) {
		// ...
	}

}
```
{{</tab>}}

{{<tab label="JSON">}}

```js
---
header: Example using idempotency functionality
---
// This is the demo secret key. In production, we recommend
// you store your secret key(s) safely.
const SECRET_KEY = '1x0000000000000000000000000000000AA';
​
async function handlePost(request) {
	const body = await request.formData();
	// Turnstile injects a token in "cf-turnstile-response".
	const token = body.get('cf-turnstile-response');
	const ip = request.headers.get('CF-Connecting-IP');
​
	// Validate the token by calling the
	// "/siteverify" API endpoint.
	const idempotencyKey = crypto.randomUUID();
	const url = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
	const firstResult = await fetch(url, {
		body: JSON.stringify({
			secret: SECRET_KEY,
			response: token,
			remoteip: ip,
			idempotency_key: idempotencyKey
		}),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});
​
	const firstOutcome = await firstResult.json();
	if (firstOutcome.success) {
		// ...
	}
​
	// A subsequent validation request to the "/siteverify" 
	// API endpoint for the same token as before, providing 
	// the associated idempotency key as well.
	const subsequentResult = await fetch(url, {
		body: JSON.stringify({
			secret: SECRET_KEY,
			response: token,
			remoteip: ip,
			idempotency_key: idempotencyKey
		}),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		}
	});
​
	const subsequentOutcome = await subsequentResult.json();
	if (subsequentOutcome.success) {
		// ...
	}
​
}
```

{{</tab>}}
{{</tabs>}}

## Accepted parameters

| POST Parameter | Required/Optional | Description |
| --- | --- | --- |
| `secret` | Required | The widget's secret key. The secret key can be found under widget settings in the Cloudflare dashboard under Turnstile. |
| `response` | Required | The response provided by the Turnstile client-side render on your site. |
| `remoteip` | Optional | The visitor's IP address. |
| `idempotency_key` | Optional | The UUID to be associated with the response. |

{{<Aside type="note">}}

The `remoteip` parameter helps to prevent abuse by ensuring the current visitor is the one who received the token. This is currently not strictly validated.

{{</Aside>}}

The siteverify endpoint behaves similar to reCAPTCHA’s or hCaptcha's siteverify endpoint.
The API accepts `application/x-www-form-urlencoded` and `application/json` requests, but the response type will always be `application/json`.

It always contains a `success` property, either true or false, indicating whether the operation was successful or not.

<div>

```json
---
header: Successful validation response
highlight: [2]
---

{
  "success": true,
  "challenge_ts": "2022-02-28T15:14:30.096Z",
  "hostname": "example.com",
  "error-codes": [],
  "action": "login",
  "cdata": "sessionid-123456789"
}
```
</div>

* `challenge_ts` is the ISO timestamp for the time the challenge was solved.
* `hostname` is the hostname for which the challenge was served.
* `action` is the customer widget identifier passed to the widget on the client side. This is used to differentiate widgets using the same sitekey in analytics. Its integrity is protected by modifications from an attacker. It is recommended to validate that the action matches an expected value.
* `cdata` is the customer data passed to the widget on the client side. This can be used by the customer to convey state. It is integrity protected by modifications from an attacker.
* `error-codes` is a list of errors that occurred.

In case of a validation failure, the response should be similar to the following:

<div>

```json
---
header: Failed validation response
highlight: [2]
---

{
  "success": false,
  "error-codes": [
    "invalid-input-response"
  ]
}
```
</div>

A validation error is indicated by having the `success` property set to `false`. A list of error codes is provided to indicate why a response has failed to verify. The response may also contain additional fields based on whether Turnstile siteverify was able to parse the response successfully or unsuccessfully.

## Error codes

| <div style="width:200px">Error code</div> | Description |
| --- | --- |
| `missing-input-secret` | The secret parameter was not passed. |
| `invalid-input-secret` | The secret parameter was invalid or did not exist.|
| `missing-input-response` | The response parameter (token) was not passed. |
| `invalid-input-response` | The response parameter (token) is invalid or has expired. Most of the time, this means a fake token has been used. If the error persists, contact customer support. |
| `bad-request` | The request was rejected because it was malformed. |
| `timeout-or-duplicate` | The response parameter (token) has already been validated before. This means that the token was issued five minutes ago and is no longer valid, or it was already redeemed. |
| `internal-error` | An internal error happened while validating the response. The request can be retried. |