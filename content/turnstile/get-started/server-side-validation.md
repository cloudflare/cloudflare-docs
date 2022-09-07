---
pcx_content_type: get-started
title: Server-side Validation
weight: 4
layout: single
---

# Server-side Validation

Customers can validate the Turnstile widget response from your website's backend.

Tokens issued to Turnstile using the success callbacks, via explicit or implicit rendering, can be validated using the siteverify endpoint.

The siteverify endpoint needs to be passed a secret key that is associated with the sitekey. The secret key will be provisioned alongside the sitekey.

Furthermore, the token needs to be passed to the siteverify endpoint

{{<Aside type="note">}}

A token may only be validated once. If the same token is validated twice, the second and each subsequent request will yield an error that the token has been spent.

{{</Aside>}}

Example using cURL:

<div>

```bash

curl -L -X POST 'https://challenges.cloudflare.com/turnstile/v0/siteverify' --data "secret=verysecret&response=<token>"

```
</div>

Example using fetch from Workers:

<div>

```bash

async function handleRequest() {
//... receive token
let formData = new FormData();
formData.append('secret', 'verysecret');
formData.append('response', 'receivedToken');
 
await fetch("https://challenges.cloudflare.com/turnstoile/v0/siteverify",
    {
        body: formData,
        method: "post"
    });
...
}

```
</div>


The siteverify endpoint behaves similar to reCaptcha’s siteverify endpoint. The response type of the siteverify is application/json.

It always contains a "success" property indicating whether the operation was successful or not. 

In case of a successful validation, the response should look like this:

<div>

```bash

{
  "success": true,
  "challenge_ts": "2022-02-28T15:14:30.096Z",
  "hostname": "127.0.0.1",
  "error-codes": [],
  "action": "non-interactive-box-action",
  "cdata": "non-interactive-box-cData"
}  

```
</div>

* `challenge_ts` is the ISO timestamp for the time the challenge was solved.
* `hostname` is the hostname for which the challenge was served.
* `action` is the customer widget identifier that got passed to the widget on the client side. This is used to differentiate widgets using the same sitekey in analytics. It is integrity protected by modifications from an attacker.
* `cdata` is customer data that got passed to the widget on the client side. This can be used by the customer to convey state. It is integrity protected by modifications from an attacker.
* `error-codes` is a list of errors that occured, 

In case of a validation failure, the response should look like this:

<div>

```bash

{
  "success": false,
  "hostname": "",
  "error-codes": [
    "invalid-input-response"
  ]
}

```
</div>

## Error codes

| error-code | Description |
| --- | --- |
| ` missing-input-secret` | the secret parameter was not passed. |
| `invalid-input-secret` | the secret parameter was invalid or did not exist.|
| `missing-input-response` | the response parameter was not passed. |
| `invalid-input-response` | the response parameter is invalid or has expired. |
| `bad-request` | the request was rejected because it was malformed. |
| `timeout-or-duplicate` | the response parameter has already been validated before. |