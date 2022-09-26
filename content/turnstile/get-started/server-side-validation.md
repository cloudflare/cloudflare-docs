---
title: Server-side Validation
pcx_content_type: get-started
weight: 4
layout: single
---

# Server-side Validation

Customers must call the siteverify endpoint to validate the Turnstile widget response from their website’s backend. The widget response must only be considered valid once it has been verified by the siteverify endpoint. The presence of a response alone is not enough to verify it as it does not protect from replay or forgery attacks. In some cases, Turnstile may purposely create invalid responses that are rejected by the siteverify API.

Tokens issued to Turnstile using the success callbacks, via explicit or implicit rendering, must be validated using the siteverify endpoint.

The siteverify endpoint needs to be passed a secret key that is associated with the sitekey. The secret key will be provisioned alongside the sitekey upon widget creation.

Furthermore, the response needs to be passed to the siteverify endpoint.

{{<Aside type="note">}}

A response may only be validated once. If the same response is presented twice, the second and each subsequent request will yield an error that the response has been spent.

{{</Aside>}}

Example using cURL:

<div>

```bash

curl -L -X POST 'https://challenges.cloudflare.com/turnstile/v0/siteverify' --data 'secret=verysecret&response=<response>'

```
</div>

Example using fetch from Cloudflare Worker's:

<div>

```javascript

async function handleRequest() {
    // ... receive response
    let formData = new FormData();
    formData.append('secret', 'verysecret');
    formData.append('response', 'receivedResponse);
    await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
            body: formData,
            method: 'post'
        }
    );
    // ...
}

```
</div>

## Accepted Parameters

| POST Parameter | Required/Optional | Description |
| --- | --- | --- |
| `secret` | Required | The site's secret key. |
|`response` | Required | The response provided by the Turnstile client-side render on your site. |
| `remoteip` | Optional | The user's IP address. |

The siteverify endpoint behaves similar to reCaptcha’s siteverify endpoint. The response type of the siteverify is application/json.

It always contains a "success" property, either true or false, indicating whether the operation was successful or not. 

In case of a successful validation, the response should look like this:

<div>

```json

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
* `action` is the customer widget identifier that got passed to the widget on the client side. This is used to differentiate widgets using the same sitekey in analytics. It is integrity protected by modifications from an attacker. It is recommended to validate that the action matches an expected value.
* `cdata` is customer data that got passed to the widget on the client side. This can be used by the customer to convey state. It is integrity protected by modifications from an attacker.
* `error-codes` is a list of errors that occurred.

In case of a validation failure, the response should look like this:

<div>

```json

{
  "success": false,
  "hostname": "",
  "error-codes": [
    "invalid-input-response"
  ]
}

```
</div>

A validation error is indicated by having the `success` as `false`. A list of error codes is provided to indicate why a response has failed to verify. The response may also contain additional fields based on whether Turnstile siteverify was able to parse the response successfully or unsuccessfully.

## Error codes

| error-code | Description |
| --- | --- |
| `missing-input-secret` | The secret parameter was not passed. |
| `invalid-input-secret` | The secret parameter was invalid or did not exist.|
| `missing-input-response` | The response parameter was not passed. |
| `invalid-input-response` | The response parameter is invalid or has expired. |
| `bad-request` | The request was rejected because it was malformed. |
| `timeout-or-duplicate` | The response parameter has already been validated before. |
| `internal-error` | An internal error happened while validating the response. The request can be retried. |