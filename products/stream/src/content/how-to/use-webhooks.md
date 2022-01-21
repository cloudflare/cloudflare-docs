---
title: Webhooks for notifications
pcx-content-type: how-to
---

# Webhooks for process notifications

Use webhooks to notify your service when videos successfully finish processing and are ready to stream.

## Create a webhook subscription

Refer to the API information below for help creating or modifying a webhook subscriptionand for an example response. The webhook notification URL must include the protocol, and only `http://` or `https://` are supported.

<TableWrap>

<table>
  <thead>
  <tr>
   <th><strong>Command</strong>
   </th>
   <th><strong>Method</strong>
   </th>
   <th><strong>Endpoint</strong>
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-webhook-create-a-webhook">Create webhooks</a>
   </td>
   <td><Code>PUT</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/webhook
</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>

## Notifications

When a video on your account finishes processing, you will receive a `POST` request notification with information about the video as seen in the example below.

Note the `status` field indicates whether the video processing finished successfully.

```javascript
{
    "uid": "dd5d531a12de0c724bd1275a3b2bc9c6",
    "readyToStream": true,
    "status": {
      "state": "ready"
    },
    "meta": {},
    "created": "2019-01-01T01:00:00.474936Z",
    "modified": "2019-01-01T01:02:21.076571Z",
    // ...
  }
```

## Verify webhook authenticity

Cloudflare Stream will sign the webhook requests it sends to your notification URLs and include the signature of each request in the `Webhook-Signature` HTTP header. This allows your application to verify that the webhook requests are sent by Stream.

To verify a signature, you need to retrieve your webhook signing secret. This value is returned in the API response when you create or retrieve the webhook.

To verify the signature, get the value of the `Webhook-Signature` header. It will look like this:

```
Webhook-Signature: time=1230811200,sig1=60493ec9388b44585a29543bcf0de62e377d4da393246a8b1c901d0e3e672404
```

### 1. Parse the signature

1. Retrieve the `Webhook-Signature` header from the webhook request and split the string using the `,` character.
1. Split each value again using the `=` character. The value for `time` is the current [UNIX time](https://en.wikipedia.org/wiki/Unix_time) when the server sent the request. `sig1` is the signature of the request body.
1. Additionally, discard requests with timestamps that are too old for your application.

### 2. Create signature source string

Prepare the signature source string:
You should concatenate these three strings:

- Value of the `time` field e.g. `1230811200`
- The `.` character
- Webhook request body (complete with newline characters, if applicable)

Every byte in the request body must remain unaltered for successful signature verification.

### 3. Create the expected signature

Compute an HMAC with the SHA256 function (HMAC-SHA256), using your webhook secret and the source string from step 2.

This step depends on the programming language for your application. Cloudflare's signature will be encoded to hex.

### 4. Compare signatures

Compare the signature in the request header to the expected signature. Preferably, use a constant-time comparison function to compare the signatures.

If the signatures match, you can trust that the webhook was sent by Cloudflare.

## Limitations

- Webhooks will only be sent after the video processing is complete, and the body will indicate whether the video processing succeeded or failed.
- Only one webhook subscription is allowed per account.

## Examples

### Golang

Using [crypto/hmac](https://golang.org/pkg/crypto/hmac/#pkg-overview):

```
package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"log"
)

func main() {
	secret := []byte("secret from the Cloudflare API")
	message := []byte("string from step 2")

	hash := hmac.New(sha256.New, secret)
	hash.Write(message)

	hashToCheck := hex.EncodeToString(hash.Sum(nil))

	log.Println(hashToCheck)
}

```

### Node.js

```
var crypto = require('crypto');

var key = 'secret from the Cloudflare API';
var message = 'string from step 2';

var hash = crypto.createHmac('sha256', key).update(message);

hash.digest('hex');
```

### Ruby

```
require 'openssl'

key = 'secret from the Cloudflare API'
message = 'string from step 2'

OpenSSL::HMAC.hexdigest('sha256', key, message)
```

In JavaScript (for example, to use in Cloudflare Workers):

```
const key = 'secret from the Cloudflare API';
const message = 'string from step 2';

const getUtf8Bytes = str =>
  new Uint8Array(
    [...unescape(encodeURIComponent(str))].map(c => c.charCodeAt(0))
  );

const keyBytes = getUtf8Bytes(key);
const messageBytes = getUtf8Bytes(message);

const cryptoKey = await crypto.subtle.importKey(
  'raw', keyBytes, { name: 'HMAC', hash: 'SHA-256' },
  true, ['sign']
);
const sig = await crypto.subtle.sign('HMAC', cryptoKey, messageBytes);

[...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
```
