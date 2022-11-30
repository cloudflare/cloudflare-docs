---
pcx_content_type: how-to
title: Use webhooks
weight: 7
---

# Use webhooks

Webhooks notify your service when videos successfully finish processing and are ready to stream or if your video enters an error state.

## Subscribe to webhook notifications

To subscribe to receive webhook notifications on your service or modify an existing subscription, you will need a [Cloudflare API token](https://dash.cloudflare.com/profile/api-tokens).


The webhook notification URL must include the protocol. Only `http://` or `https://` is supported.

```bash
curl -X PUT --header 'Authorization: Bearer <API_TOKEN>' \
https://api.cloudflare.com/client/v4/accounts/<ACCOUNT_ID>/stream/webhook \
--data '{"notificationUrl":"<WEBHOOK_NOTIFICATION_URL>"}'
```

```json
---
header: Example response
---
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

## Notifications

When a video on your account finishes processing, you will receive a `POST` request notification with information about the video.

Note the `status` field indicates whether the video processing finished successfully.

```javascript
---
header: Example POST request body sent in response to successful encoding
---
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

When a video is done processing, the `state` field returns a `ready` state. Videos may sometimes return the `state` field as `ready` and an additional `pctComplete` state that is not 100, which means higher quality renditions are still processing. When `pctComplete` reaches 100, all quality resolutions are available for the video.

## Error codes

If a video could not process successfully, the `state` field returns `error`, and the `errReasonCode` returns one of the values listed below. 

- `ERR_NON_VIDEO` – The upload is not a video. 
- `ERR_DURATION_EXCEED_CONSTRAINT` – The video duration exceeds the constraints defined in the direct creator upload.
- `ERR_FETCH_ORIGIN_ERROR` – The video failed to download from the URL.
- `ERR_MALFORMED_VIDEO` – The video is a valid file but contains corrupt data that cannot be recovered.
- `ERR_DURATION_TOO_SHORT` – The video's duration is shorter than 0.1 seconds.
- `ERR_UNKNOWN` – If Stream cannot automatically determine why the video returned an error, the `ERR_UNKNOWN` code will be used.

In addition to the `state` field, a video's `readyToStream` field must also be `true` for a video to play.

```bash
---
header: Example error response
highlight: [2, 4, 7]
---
{
  "readyToStream": true,
  "status": {
    "state": "error",
    "step": "encoding",
    "pctComplete": "39",
    "errReasonCode": "ERR_MALFORMED_VIDEO",
    "errReasonText": "The video was deemed to be corrupted or malformed.",
  }
}
```

<details>
<summary>
Example: POST body for successful video encoding
</summary>
 <div class="special-class" markdown="1">

 ```json
{
  "uid": "b236bde30eb07b9d01318940e5fc3eda",
  "creator": null,
  "thumbnail": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/thumbnails/thumbnail.jpg",
  "thumbnailTimestampPct": 0,
  "readyToStream": true,
  "status": {
    "state": "ready",
    "pctComplete": "39.000000",
    "errorReasonCode": "",
    "errorReasonText": ""
  },
  "meta": {
    "filename": "small.mp4",
    "filetype": "video/mp4",
    "name": "small.mp4",
    "relativePath": "null",
    "type": "video/mp4"
  },
  "created": "2022-06-30T17:53:12.512033Z",
  "modified": "2022-06-30T17:53:21.774299Z",
  "size": 383631,
  "preview": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/watch",
  "allowedOrigins": [],
  "requireSignedURLs": false,
  "uploaded": "2022-06-30T17:53:12.511981Z",
  "uploadExpiry": "2022-07-01T17:53:12.511973Z",
  "maxSizeBytes": null,
  "maxDurationSeconds": null,
  "duration": 5.5,
  "input": {
    "width": 560,
    "height": 320
  },
  "playback": {
    "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.m3u8",
    "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3eda/manifest/video.mpd"
  },
  "watermark": null
}
```
</div> 
</details>

## Verify webhook authenticity

Cloudflare Stream will sign the webhook requests sent to your notification URLs and include the signature of each request in the `Webhook-Signature` HTTP header. This allows your application to verify the webhook requests are sent by Stream.

To verify a signature, you need to retrieve your webhook signing secret. This value is returned in the API response when you create or retrieve the webhook.

To verify the signature, get the value of the `Webhook-Signature` header, which will look similar to the example below.

`
Webhook-Signature: time=1230811200,sig1=60493ec9388b44585a29543bcf0de62e377d4da393246a8b1c901d0e3e672404
`

### 1. Parse the signature

Retrieve the `Webhook-Signature` header from the webhook request and split the string using the `,` character.

Split each value again using the `=` character.

The value for `time` is the current [UNIX time](https://en.wikipedia.org/wiki/Unix_time) when the server sent the request. `sig1` is the signature of the request body.

At this point, you should discard requests with timestamps that are too old for your application.

### 2. Create the signature source string

Prepare the signature source string and concatenate the following strings:

*   Value of the `time` field e.g. `1230811200`
*   Character `.`
*   Webhook request body (complete with newline characters, if applicable)

Every byte in the request body must remain unaltered for successful signature verification.

### 3. Create the expected signature

Compute an HMAC with the SHA256 function (HMAC-SHA256) using your webhook secret and the source string from step 2.
This step depends on the programming language used by your application.

Cloudflare's signature will be encoded to hex.

### 4. Compare expected and actual signatures

Compare the signature in the request header to the expected signature. Preferably, use a constant-time comparison function to compare the signatures.

If the signatures match, you can trust that Cloudflare sent the webhook.

## Limitations

*   Webhooks will only be sent after video processing is complete, and the body will indicate whether the video processing succeeded or failed.
*   Only one webhook subscription is allowed per-account.

## Examples

**Golang**

Using [crypto/hmac](https://golang.org/pkg/crypto/hmac/#pkg-overview):

```go
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

**Node.js**
```js

    var crypto = require('crypto');

    var key = 'secret from the Cloudflare API';
    var message = 'string from step 2';

    var hash = crypto.createHmac('sha256', key).update(message);

    hash.digest('hex');
```    

**Ruby**
```ruby
    require 'openssl'

    key = 'secret from the Cloudflare API'
    message = 'string from step 2'

    OpenSSL::HMAC.hexdigest('sha256', key, message)
```

**In JavaScript (for example, to use in Cloudflare Workers)**
```javascript
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
