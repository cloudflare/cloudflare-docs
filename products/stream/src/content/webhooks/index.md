---
order: 10
---

# Webhooks

A tool to notify your service when videos successfully finish processing and are ready to stream.

## A few things to note

- At this time, webhooks will only be sent after the processing of a video is complete,
  and the body will indicate whether the processing of the video succeeded or failed.
- Only one webhook subscription is allowed per-account.

## Subscriptions

### Create or modify the webhook subscription

To subscribe to receive webhook notifications on your service, or modify an
existing subscription, you will need your
[Cloudflare API key](https://www.cloudflare.com/a/account/my-account)
and your email address.

```bash
curl -X PUT --header 'X-Auth-Key:$APIKEY' --header 'X-Auth-Email:$EMAIL'
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/webhook
--data '{"notificationUrl":"{WEBHOOK-NOTIFICATION-URL"}'
```

The `{webhook-notification-url}` must include the protocol. Only `http://`
or `https://` is supported.

#### Example response to create or modify the webhook subscription

```bash
{
  "result": {
    "notificationUrl": "http://www.your-service-webhook-handler.com",
    "modified": "2019-01-01T01:02:21.076571Z"
    "secret": "85011ed3a913c6ad5f9cf6c5573cc0a7"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

If a subscription is created, the `modified` timestamp will equal
"0001-01-01T00:00:00.0000000Z"

## Get the webhook subscription

To view a webhook subscription associated with your account:

```bash
curl --header 'X-Auth-Key:$APIKEY' --header 'X-Auth-Email:$EMAIL'
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/webhook
```

### Example response to get the webhook subscription

```bash
{
  "result": {
    "notificationUrl": "http://www.your-service-webhook-handler.com",
    "modified": "0001-01-01T00:00:00.0000000Z",
  }
  "success": true,
  "errors": [],
  "messages": []
}
```

## Delete the webhook subscription

To delete a webhook subscription associated with your account:

```bash
curl -X DELETE --header 'X-Auth-Key:$APIKEY' --header 'X-Auth-Email:$EMAIL'
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/webhook
```

If there is an entry in `errors` response field, the webhook has not been
deleted, and the request should be re-tried.

### Example response to delete the webhook subscription

```bash
{
  "result": "",
  "success": true,
  "errors": [],
  "messages": []
}
```

## Notifications

When a video on your account finishes processing, you will receive a `POST`
request notification with information about the video.

Note the `status` field indicates whether the video processing finished successfully.

### Example POST request body sent in response to successful encoding

```bash
{
    "uid": "dd5d531a12de0c724bd1275a3b2bc9c6",
    "thumbnail": "https://cloudflarestream.com/dd5d531a12de0c724bd1275a3b2bc9c6/thumbnails/thumb.png",
    "readyToStream": true,
    "status": {
      "state": "ready"
    },
    "meta": {},
    "labels": [],
    "created": "2019-01-01T01:00:00.474936Z",
    "modified": "2019-01-01T01:02:21.076571Z",
    "size": 62335189,
    "preview": "https://watch.cloudflarestream.com/dd5d531a12de0c724bd1275a3b2bc9c6"
  }
```

### Example POST request body sent in response to failed encoding

```bash
{
    "uid": "dd5d531a12de0c724bd1275a3b2bc9c6",
    "thumbnail": "https://cloudflarestream.com/dd5d531a12de0c724bd1275a3b2bc9c6/thumbnails/thumb.png",
    "readyToStream": false,
    "status": {
      "state": "error"
    },
    "meta": {},
    "labels": [],
    "created": "2019-01-01T01:00:00.474936Z",
    "modified": "2019-01-01T01:02:21.076571Z",
    "size": 62335189,
    "preview": "https://watch.cloudflarestream.com/dd5d531a12de0c724bd1275a3b2bc9c6"
  }
```

## Verify webhook authenticity

Cloudflare Stream will sign the webhook requests it sends to your notification URLs and include the signature of each requrest in the `Webhook-Signature` HTTP header. This allows your application to verify that the webhook requests are sent by Stream.

To verify a signature, you need to retrieve your webhook signing secret. This value is returned in the API response when you create or retrieve the webhook.

To verify the signature, get the value of the `Webhook-Signature` header. It will look like this:

```
Webhook-Signature: time=1230811200,sig1=60493ec9388b44585a29543bcf0de62e377d4da393246a8b1c901d0e3e672404
```

### Step 1: Parse the signature

Retrieve the `Webhook-Signature` header from the webhook request and split the string using the `,` character.

Split each value again using the `=` character

The value for `time` is the current [UNIX time](https://en.wikipedia.org/wiki/Unix_time) when the server sent the request. `sig1` is the signature of the request body.

At this step, you should discard requests with timestamps that are too old for your application.

### Step 2: Create signature source string

Prepare the signature source string:
You should concatenate these three strings:

- Value of the `time` field e.g. `1230811200`
- Character `.`
- Webhook request body (complete with newline characters, if applicable)

It is important for every byte in the request body to remain unaltered for successful signature verification.

### Step 3: Create the expected signature

Compute an HMAC with the SHA256 function (HMAC-SHA256), using your webhook secret and the source string from step 2.
This step will depend on what programming language your application is written in.

Cloudflare's signature will be encoded to hex.

### Step 4: Compare the expected and the actual signatures

Compare the signature in the request header to the expected signature. Preferably, use a constant-time comparison function to compare the signatures.

If the signatures match, you can trust that the webhook was sent by Cloudflare.

#### Examples

For golang using [crypto/hmac](https://golang.org/pkg/crypto/hmac/#pkg-overview):

```
package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"log"
)

func main() {
	secret := []byte("secret from the cloudflare API")
	message := []byte("string from step 2")

	hash := hmac.New(sha256.New, secret)
	hash.Write(message)

	hashToCheck := hex.EncodeToString(hash.Sum(nil))

	log.Println(hashToCheck)
}

```

In Node.js:

```
var crypto = require('crypto');

var key = 'secret from the cloudflare API';
var message = 'string from step 2';

var hash = crypto.createHmac('sha256', key).update(message);

hash.digest('hex');
```

In Ruby:

```
require 'openssl'

key = 'secret from the cloudflare API'
message = 'string from step 2'

OpenSSL::HMAC.hexdigest('sha256', key, message)
```

In JavaScript (for example, to use in Cloudflare Workers):

```
const key = 'secret from the cloudflare API';
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
