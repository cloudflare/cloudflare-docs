---
title: Server-side validation
pcx_content_type: get-started
weight: 5
layout: single
---

# Server-side validation

Customers must call the siteverify endpoint to validate the Turnstile widget response from their website’s backend. The widget response must only be considered valid once it has been verified by the siteverify endpoint. The presence of a response alone is not enough to verify it as it does not protect from replay or forgery attacks. In some cases, Turnstile may purposely create invalid responses that are rejected by the siteverify API.

Tokens issued to Turnstile using the success callbacks, via explicit or implicit rendering, must be validated using the siteverify endpoint.

The siteverify endpoint needs to be passed a secret key that is associated with the sitekey. The secret key will be provisioned alongside the sitekey when you create a widget.

Furthermore, the response needs to be passed to the siteverify endpoint.

A response may only be validated once. If the same response is presented twice, the second and each subsequent request will generate an error stating that the response has already been consumed. If an application requires to retry failed requests, it must utilize the idempotency functionality. You can do so by providing a UUID as the `idempotency_key` parameter of your `POST` request when initially validating the response and the same UUID with any subsequent request for that response.

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

<div>

```javascript
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
</div>

<div>

```javascript
---
header: Example using indempotency functionality
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

	const subsequentOutcome = await firstResult.json();
	if (subsequentOutcome.success) {
		// ...
	}

}
```
</div>

Refer to the [full demo on GitHub](https://github.com/cloudflare/turnstile-demo-workers/blob/main/src/index.mjs).

## Accepted parameters

| POST Parameter | Required/Optional | Description |
| --- | --- | --- |
| `secret` | Required | The site's secret key. |
| `response` | Required | The response provided by the Turnstile client-side render on your site. |
| `remoteip` | Optional | The user's IP address. |
| `idempotency_key` | Optional | The UUID to be associated with the response. |

{{<Aside type="note">}}

Remote IP helps prevent abuses by ensuring that the current visitor is the one who received the token.

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

| Error code | Description |
| --- | --- |
| `missing-input-secret` | The secret parameter was not passed. |
| `invalid-input-secret` | The secret parameter was invalid or did not exist.|
| `missing-input-response` | The response parameter was not passed. |
| `invalid-input-response` | The response parameter is invalid or has expired. |
| `invalid-widget-id` | The widget ID extracted from the parsed site secret key was invalid or did not exist. |
| `invalid-parsed-secret` | The secret extracted from the parsed site secret key was invalid. |
| `bad-request` | The request was rejected because it was malformed. |
| `timeout-or-duplicate` | The response parameter has already been validated before. |
| `internal-error` | An internal error happened while validating the response. The request can be retried. |