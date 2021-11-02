---
order: 3
pcx-content-type: how-to
---

# Securing your Stream

## Signed URLs / Tokens

By default, videos on  Stream can be viewed by anyone with just a video id. If you want to make your video private by default and only give access to certain users, you can use the signed URL feature. When you mark a video to require signed URL, it can no longer be accessed publicly with only the video id. Instead, the user will need a signed url token to watch or download the video.

Here are some common use cases for using signed URLs:

* Restricting access so only logged in members can watch a particular video
* Let users watch your video for a limited time period (ie. 24 hours)
* Restricting access based on geolocation 

### Making a video require signed URLs

Since video ids are effectively public within signed URLs, you will need to turn on `requireSignedURLs` on for your videos. This option will prevent any public links, such as `watch.cloudflarestream.com/$VIDEOID`, from working.

Restricting viewing can be done by updating the video's metadata.

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/$VIDEOID" -H "Content-Type: application/json" -d "{\"uid\": \"$VIDEOID\", \"requireSignedURLs\": true }"
```

Response:
```json
---
highlight: [8]
---


{
  "result": {
    "uid": "$VIDEOID",
    ...
    "requireSignedURLS": true
  },
  "success": true,
  "errors": [],
  "messages": []
}

```

## Two Ways to Generate Signed Tokens

You can program your app to generate token in two ways:

* **Using the /token endpoint to generate signed tokens:** The simplest way to create a signed url token is by calling the /token endpoint. This is recommended for testing purposes or if you are generating less than 10,000 tokens per day.

* **Using an open-source library:** If you have tens of thousands of daily users and need to generate a high-volume of tokens without calling the /token endpoint *each time*, you can create tokens yourself. This way, you do not need to call a Stream endpoint each time you need to generate a token.

## Option 1: Using the /token endpoint

You can call the `/token` endpoint for any video that is marked private to get a signed url token which expires in one hour:

```bash
curl \
-X POST \
-H "Authorization: Bearer $TOKEN" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/$VIDEOID/token
```

You will see a response similar to this if the request succeeds:

```json
{
  "result": {
    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImNkYzkzNTk4MmY4MDc1ZjJlZjk2MTA2ZDg1ZmNkODM4In0.eyJraWQiOiJjZGM5MzU5ODJmODA3NWYyZWY5NjEwNmQ4NWZjZDgzOCIsImV4cCI6IjE2MjE4ODk2NTciLCJuYmYiOiIxNjIxODgyNDU3In0.iHGMvwOh2-SuqUG7kp2GeLXyKvMavP-I2rYCni9odNwms7imW429bM2tKs3G9INms8gSc7fzm8hNEYWOhGHWRBaaCs3U9H4DRWaFOvn0sJWLBitGuF_YaZM5O6fqJPTAwhgFKdikyk9zVzHrIJ0PfBL0NsTgwDxLkJjEAEULQJpiQU1DNm0w5ctasdbw77YtDwdZ01g924Dm6jIsWolW0Ic0AevCLyVdg501Ki9hSF7kYST0egcll47jmoMMni7ujQCJI1XEAOas32DdjnMvU8vXrYbaHk1m1oXlm319rDYghOHed9kr293KM7ivtZNlhYceSzOpyAmqNFS7mearyQ"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

To render the video, insert the `token` value in place of the `video id`:

```HTML

<iframe src="https://iframe.videodelivery.net/eyJhbGciOiJSUzI1NiIsImtpZCI6ImNkYzkzNTk4MmY4MDc1ZjJlZjk2MTA2ZDg1ZmNkODM4In0.eyJraWQiOiJjZGM5MzU5ODJmODA3NWYyZWY5NjEwNmQ4NWZjZDgzOCIsImV4cCI6IjE2MjE4ODk2NTciLCJuYmYiOiIxNjIxODgyNDU3In0.iHGMvwOh2-SuqUG7kp2GeLXyKvMavP-I2rYCni9odNwms7imW429bM2tKs3G9INms8gSc7fzm8hNEYWOhGHWRBaaCs3U9H4DRWaFOvn0sJWLBitGuF_YaZM5O6fqJPTAwhgFKdikyk9zVzHrIJ0PfBL0NsTgwDxLkJjEAEULQJpiQU1DNm0w5ctasdbw77YtDwdZ01g924Dm6jIsWolW0Ic0AevCLyVdg501Ki9hSF7kYST0egcll47jmoMMni7ujQCJI1XEAOas32DdjnMvU8vXrYbaHk1m1oXlm319rDYghOHed9kr293KM7ivtZNlhYceSzOpyAmqNFS7mearyQ" style="border: none;" height="720" width="1280" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe>

```

If you are using your own player, replace the video id in the manifest url with the `token` value:

`https://videodelivery.net/eyJhbGciOiJSUzI1NiIsImtpZCI6ImNkYzkzNTk4MmY4MDc1ZjJlZjk2MTA2ZDg1ZmNkODM4In0.eyJraWQiOiJjZGM5MzU5ODJmODA3NWYyZWY5NjEwNmQ4NWZjZDgzOCIsImV4cCI6IjE2MjE4ODk2NTciLCJuYmYiOiIxNjIxODgyNDU3In0.iHGMvwOh2-SuqUG7kp2GeLXyKvMavP-I2rYCni9odNwms7imW429bM2tKs3G9INms8gSc7fzm8hNEYWOhGHWRBaaCs3U9H4DRWaFOvn0sJWLBitGuF_YaZM5O6fqJPTAwhgFKdikyk9zVzHrIJ0PfBL0NsTgwDxLkJjEAEULQJpiQU1DNm0w5ctasdbw77YtDwdZ01g924Dm6jIsWolW0Ic0AevCLyVdg501Ki9hSF7kYST0egcll47jmoMMni7ujQCJI1XEAOas32DdjnMvU8vXrYbaHk1m1oXlm319rDYghOHed9kr293KM7ivtZNlhYceSzOpyAmqNFS7mearyQ/manifest/video.m3u8`

### Customizing default restrictions

If you call the `/token` endpoint without any body, it will return a token that expires in one hour. Let's say you want to let a user watch a particular video for the next 12 hours. Here's how you'd do it with a Cloudflare Worker:

```JavaScript
addEventListener('fetch', event => {
    event.respondWith(handleRequest(event))
})

async function handleRequest(request) {

    var signed_url_restrictions = {
        //limit viewing for the next 12 hours
        exp: Math.floor(Date.now() / 1000) + (12*60*60) 
    };

    const init = {
    method: 'POST',
    headers: {
              "X-Auth-Email": "{ACCOUNT_EMAIL}",
              "X-Auth-Key": "{ACCOUNT_KEY}",
              "content-type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify(signed_url_restrictions)
  }
  const signedurl_service_response = await fetch("https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/stream/{VIDEO_ID}/token", init)
  return new Response(JSON.stringify(await signedurl_service_response.json()), {status: 200})
}
```

The returned token will expire after 12 hours. 

Let's take this a step further and add 2 additional restrictions:

* Allow the signed URL token to be used for MP4 downloads (assuming the video has downloads enabled)
* Block users from US and Mexico from viewing or downloading the video

To achieve this, we can specify additional restrictions in the `signed_url_restrictions` object in our sample code:

```JavaScript

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event))
})

async function handleRequest(request) {

    var signed_url_restrictions = {
        //limit viewing for the next 2 hours
        exp: Math.floor(Date.now() / 1000) + (12*60*60),
        downloadable: true,
        accessRules:[{"type":"ip.geoip.country","country":["US","MX"],"action":"block"}]
    };

    const init = {
    method: 'POST',
    headers: {
              "X-Auth-Email": "{ACCOUNT_EMAIL}",
              "X-Auth-Key": "{ACCOUNT_KEY}",
              "content-type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify(signed_url_restrictions)
  }
  const signedurl_service_response = await fetch("https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/stream/{VIDEO_ID}/token", init)
  return new Response(JSON.stringify(await signedurl_service_response.json()), {status: 200})
}
```

## Option 2: Generating signed tokens without calling the `/token` endpoint 

If you are generating a high-volume of tokens, it is best to generate new tokens without needing to call the Stream API each time. 

### Step 1: Call the `/stream/key` endpoint *once* to obtain a key

```bash
curl -X POST -H "Authorization: Bearer $TOKEN"  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/keys
```

The response will return `pem` and `jwk` values.

```json
{
  "result": {
    "id": "8f926b2b01f383510025a78a4dcbf6a",
    "pem": "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBemtHbXhCekFGMnBIMURiWmgyVGoyS3ZudlBVTkZmUWtNeXNCbzJlZzVqemRKTmRhCmtwMEphUHhoNkZxOTYveTBVd0lBNjdYeFdHb3kxcW1CRGhpdTVqekdtYW13NVgrYkR3TEdTVldGMEx3QnloMDYKN01Rb0xySHA3MDEycXBVNCtLODUyT1hMRVVlWVBrOHYzRlpTQ2VnMVdLRW5URC9oSmhVUTFsTmNKTWN3MXZUbQpHa2o0empBUTRBSFAvdHFERHFaZ3lMc1Vma2NsRDY3SVRkZktVZGtFU3lvVDVTcnFibHNFelBYcm9qaFlLWGk3CjFjak1yVDlFS0JCenhZSVEyOVRaZitnZU5ya0t4a2xMZTJzTUFML0VWZkFjdGkrc2ZqMkkyeEZKZmQ4aklmL2UKdHBCSVJZVDEza2FLdHUyYmk0R2IrV1BLK0toQjdTNnFGODlmTHdJREFRQUJBb0lCQUYzeXFuNytwNEtpM3ZmcgpTZmN4ZmRVV0xGYTEraEZyWk1mSHlaWEFJSnB1MDc0eHQ2ZzdqbXM3Tm0rTFVhSDV0N3R0bUxURTZacy91RXR0CjV3SmdQTjVUaFpTOXBmMUxPL3BBNWNmR2hFN1pMQ2wvV2ZVNXZpSFMyVDh1dGlRcUYwcXpLZkxCYk5kQW1MaWQKQWl4blJ6UUxDSzJIcmlvOW1KVHJtSUUvZENPdG80RUhYdHpZWjByOVordHRxMkZrd3pzZUdaK0tvd09JaWtvTgp2NWFOMVpmRGhEVG0wdG1Vd0tLbjBWcmZqalhRdFdjbFYxTWdRejhwM2xScWhISmJSK29PL1NMSXZqUE16dGxOCm5GV1ZEdTRmRHZsSjMyazJzSllNL2tRVUltT3V5alY3RTBBcm5vR2lBREdGZXFxK1UwajluNUFpNTJ6aTBmNloKdFdvwdju39xOFJWQkwxL2tvWFVmYk00S04ydVFadUdjaUdGNjlCRDJ1S3o1eGdvTwowVTBZNmlFNG9Cek5GUW5hWS9kayt5U1dsQWp2MkgraFBrTGpvZlRGSGlNTmUycUVNaUFaeTZ5cmRkSDY4VjdIClRNRllUQlZQaHIxT0dxZlRmc00vRktmZVhWY1FvMTI1RjBJQm5iWjNSYzRua1pNS0hzczUyWE1DZ1lFQTFQRVkKbGIybDU4blVianRZOFl6Uk1vQVo5aHJXMlhwM3JaZjE0Q0VUQ1dsVXFZdCtRN0NyN3dMQUVjbjdrbFk1RGF3QgpuTXJsZXl3S0crTUEvU0hlN3dQQkpNeDlVUGV4Q3YyRW8xT1loMTk3SGQzSk9zUythWWljemJsYmJqU0RqWXVjCkdSNzIrb1FlMzJjTXhjczJNRlBWcHVibjhjalBQbnZKd0k5aUpGVUNnWUVBMjM3UmNKSEdCTjVFM2FXLzd3ekcKbVBuUm1JSUczeW9UU0U3OFBtbHo2bXE5eTVvcSs5aFpaNE1Fdy9RbWFPMDF5U0xRdEY4QmY2TFN2RFh4QWtkdwpWMm5ra0svWWNhWDd3RHo0eWxwS0cxWTg3TzIwWWtkUXlxdjMybG1lN1JuVDhwcVBDQTRUWDloOWFVaXh6THNoCkplcGkvZFhRWFBWeFoxYXV4YldGL3VzQ2dZRUFxWnhVVWNsYVlYS2dzeUN3YXM0WVAxcEwwM3h6VDR5OTBOYXUKY05USFhnSzQvY2J2VHFsbGVaNCtNSzBxcGRmcDM5cjIrZFdlemVvNUx4YzBUV3Z5TDMxVkZhT1AyYk5CSUpqbwpVbE9ldFkwMitvWVM1NjJZWVdVQVNOandXNnFXY21NV2RlZjFIM3VuUDVqTVVxdlhRTTAxNjVnV2ZiN09YRjJyClNLYXNySFVDZ1lCYmRvL1orN1M3dEZSaDZlamJib2h3WGNDRVd4eXhXT2ZMcHdXNXdXT3dlWWZwWTh4cm5pNzQKdGRObHRoRXM4SHhTaTJudEh3TklLSEVlYmJ4eUh1UG5pQjhaWHBwNEJRNTYxczhjR1Z1ZSszbmVFUzBOTDcxZApQL1ZxUWpySFJrd3V5ckRFV2VCeEhUL0FvVEtEeSt3OTQ2SFM5V1dPTGJvbXQrd3g0NytNdWc9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo=",
    "jwk": "eyJ1c2UiOiJzaWciLCJrdHkiOiJSU0EiLCJraWQiOiI4ZjkyNmIyYjAxZjM4MzUxNzAwMjVhNzhhNGRjYmY2YSIsImFsZyI6IlJTMjU2IiwibiI6InprR214QnpBRjJwSDFEYlpoMlRqMkt2bnZQVU5GZlFrTXlzQm8yZWc1anpkSk5kYWtwMEphUHhoNkZxOTZfeTBVd0lBNjdYeFdHb3kxcW1CRGhpdTVqekdtYW13NVgtYkR3TEdTVldGMEx3QnloMDY3TVFvTHJIcDcwMTJxcFU0LUs4NTJPWExFVWVZUGs4djNGWlNDZWcxV0tFblREX2hKaFVRMWxOY0pNY3cxdlRtR2tqNHpqQVE0QUhQX3RxRERxWmd5THNVZmtjbEQ2N0lUZGZLVWRrRVN5b1Q1U3JxYmxzRXpQWHJvamhZS1hpNzFjak1yVDlFS0JCenhZSVEyOVRaZi1nZU5ya0t4a2xMZTJzTUFMX0VWZkFjdGktc2ZqMkkyeEZKZmQ4aklmX2V0cEJJUllUMTNrYUt0dTJiaTRHYi1XUEstS2hCN1M2cUY4OWZMdyIsImUiOiJBUUFCIiwiZCI6IlhmS3FmdjZuZ3FMZTktdEo5ekY5MVJZc1ZyWDZFV3RreDhmSmxjQWdtbTdUdmpHM3FEdU9henMyYjR0Um9mbTN1MjJZdE1UcG16LTRTMjNuQW1BODNsT0ZsTDJsX1VzNy1rRGx4OGFFVHRrc0tYOVo5VG0tSWRMWlB5NjJKQ29YU3JNcDhzRnMxMENZdUowQ0xHZEhOQXNJcllldUtqMllsT3VZZ1Q5MEk2MmpnUWRlM05oblN2MW42MjJyWVdURE94NFpuNHFqQTRpS1NnMl9sbzNWbDhPRU5PYlMyWlRBb3FmUld0LU9OZEMxWnlWWFV5QkRQeW5lVkdxRWNsdEg2Zzc5SXNpLU04ek8yVTJjVlpVTzdoOE8tVW5mYVRhd2xnei1SQlFpWTY3S05Yc1RRQ3VlZ2FJQU1ZVjZxcjVUU1Ai2odx5iT0xSX3BtMWFpdktyUSIsInAiOiI5X1o5ZUpGTWI5X3E4UlZCTDFfa29YVWZiTTRLTjJ1UVp1R2NpR0Y2OUJEMnVLejV4Z29PMFUwWTZpRTRvQnpORlFuYVlfZGsteVNXbEFqdjJILWhQa0xqb2ZURkhpTU5lMnFFTWlBWnk2eXJkZEg2OFY3SFRNRllUQlZQaHIxT0dxZlRmc01fRktmZVhWY1FvMTI1RjBJQm5iWjNSYzRua1pNS0hzczUyWE0iLCJxIjoiMVBFWWxiMmw1OG5VYmp0WThZelJNb0FaOWhyVzJYcDNyWmYxNENFVENXbFVxWXQtUTdDcjd3TEFFY243a2xZNURhd0JuTXJsZXl3S0ctTUFfU0hlN3dQQkpNeDlVUGV4Q3YyRW8xT1loMTk3SGQzSk9zUy1hWWljemJsYmJqU0RqWXVjR1I3Mi1vUWUzMmNNeGNzMk1GUFZwdWJuOGNqUFBudkp3STlpSkZVIiwiZHAiOiIyMzdSY0pIR0JONUUzYVdfN3d6R21QblJtSUlHM3lvVFNFNzhQbWx6Nm1xOXk1b3EtOWhaWjRNRXdfUW1hTzAxeVNMUXRGOEJmNkxTdkRYeEFrZHdWMm5ra0tfWWNhWDd3RHo0eWxwS0cxWTg3TzIwWWtkUXlxdjMybG1lN1JuVDhwcVBDQTRUWDloOWFVaXh6THNoSmVwaV9kWFFYUFZ4WjFhdXhiV0ZfdXMiLCJkcSI6InFaeFVVY2xhWVhLZ3N5Q3dhczRZUDFwTDAzeHpUNHk5ME5hdWNOVEhYZ0s0X2NidlRxbGxlWjQtTUswcXBkZnAzOXIyLWRXZXplbzVMeGMwVFd2eUwzMVZGYU9QMmJOQklKam9VbE9ldFkwMi1vWVM1NjJZWVdVQVNOandXNnFXY21NV2RlZjFIM3VuUDVqTVVxdlhRTTAxNjVnV2ZiN09YRjJyU0thc3JIVSIsInFpIjoiVzNhUDJmdTB1N1JVWWVubzIyNkljRjNBaEZzY3NWam55NmNGdWNGanNIbUg2V1BNYTU0dS1MWFRaYllSTFBCOFVvdHA3UjhEU0NoeEhtMjhjaDdqNTRnZkdWNmFlQVVPZXRiUEhCbGJudnQ1M2hFdERTLTlYVF8xYWtJNngwWk1Mc3F3eEZuZ2NSMF93S0V5Zzh2c1BlT2gwdlZsamkyNkpyZnNNZU9fakxvIn0=",
    "created": "2021-06-15T21:06:54.763937286Z"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```
 
 Save these values as they won't be shown again. You will use these values later to generate the tokens. The pem and jwk fields are base64-encoded, you must decode them before using them (an example of this is shown in step 2). 
 
 ### Step 2: Generate tokens using the key
 
Once you generate the key in step 1, you can use the `pem` or `jwk` values to generate self-signing URLs on your own. Using this method, you do not need to call the Stream API each time you are creating a new token.

Here's an example Cloudflare Worker script which generates tokens that expire in 60 minutes and only work for users accessing the video from UK. In lines 2 and 3, you will configure the `id` and `jwk` values from step 1:

```JavaScript
// Global variables
const jwkKey = '{PRIVATE-KEY-IN-JWK-FORMAT}'
const keyID = '$KEYID'
const videoID = '$VIDEOID'
// expiresTimeInS is the expired time in second of the video
const expiresTimeInS = 3600

// Main function
async function streamSignedUrl () {
  const encoder = new TextEncoder()
  const expiresIn = Math.floor(Date.now() / 1000) + expiresTimeInS
  const headers = {
    "alg": "RS256",
    "kid": keyID
  }
  const data = {
    "sub": videoID,
    "kid": keyID,
    "exp": expiresIn,
    "accessRules": [
      {
        "type": "ip.geoip.country",
        "action": "allow",
        "country": [
          "GB"
        ]
      },
      {
        "type": "any",
        "action": "block"
      }
    ]
  }

  const token = `${objectToBase64url(headers)}.${objectToBase64url(data)}`

  const jwk = JSON.parse(atob(jwkKey))

  const key = await crypto.subtle.importKey(
    "jwk", jwk,
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false, [ "sign" ]
  )

  const signature = await crypto.subtle.sign(
    { name: 'RSASSA-PKCS1-v1_5' }, key,
    encoder.encode(token)
  )

  const signedToken = `${token}.${arrayBufferToBase64Url(signature)}`

  return signedToken
}

// Utilities functions
function arrayBufferToBase64Url(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function objectToBase64url(payload) {
  return arrayBufferToBase64Url(
    new TextEncoder().encode(JSON.stringify(payload)),
  )
}
```

### Step 3: Rendering the video 

If you are using the Stream Player, insert the token returned by the Worker in Step 2 in place of the video id:

```HTML

<iframe src="https://iframe.videodelivery.net/eyJhbGciOiJSUzI1NiIsImtpZCI6ImNkYzkzNTk4MmY4MDc1ZjJlZjk2MTA2ZDg1ZmNkODM4In0.eyJraWQiOiJjZGM5MzU5ODJmODA3NWYyZWY5NjEwNmQ4NWZjZDgzOCIsImV4cCI6IjE2MjE4ODk2NTciLCJuYmYiOiIxNjIxODgyNDU3In0.iHGMvwOh2-SuqUG7kp2GeLXyKvMavP-I2rYCni9odNwms7imW429bM2tKs3G9INms8gSc7fzm8hNEYWOhGHWRBaaCs3U9H4DRWaFOvn0sJWLBitGuF_YaZM5O6fqJPTAwhgFKdikyk9zVzHrIJ0PfBL0NsTgwDxLkJjEAEULQJpiQU1DNm0w5ctasdbw77YtDwdZ01g924Dm6jIsWolW0Ic0AevCLyVdg501Ki9hSF7kYST0egcll47jmoMMni7ujQCJI1XEAOas32DdjnMvU8vXrYbaHk1m1oXlm319rDYghOHed9kr293KM7ivtZNlhYceSzOpyAmqNFS7mearyQ" style="border: none;" height="720" width="1280" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe>

```

If you are using your own player, replace the video id in the manifest url with the `token` value:

`https://videodelivery.net/eyJhbGciOiJSUzI1NiIsImtpZCI6ImNkYzkzNTk4MmY4MDc1ZjJlZjk2MTA2ZDg1ZmNkODM4In0.eyJraWQiOiJjZGM5MzU5ODJmODA3NWYyZWY5NjEwNmQ4NWZjZDgzOCIsImV4cCI6IjE2MjE4ODk2NTciLCJuYmYiOiIxNjIxODgyNDU3In0.iHGMvwOh2-SuqUG7kp2GeLXyKvMavP-I2rYCni9odNwms7imW429bM2tKs3G9INms8gSc7fzm8hNEYWOhGHWRBaaCs3U9H4DRWaFOvn0sJWLBitGuF_YaZM5O6fqJPTAwhgFKdikyk9zVzHrIJ0PfBL0NsTgwDxLkJjEAEULQJpiQU1DNm0w5ctasdbw77YtDwdZ01g924Dm6jIsWolW0Ic0AevCLyVdg501Ki9hSF7kYST0egcll47jmoMMni7ujQCJI1XEAOas32DdjnMvU8vXrYbaHk1m1oXlm319rDYghOHed9kr293KM7ivtZNlhYceSzOpyAmqNFS7mearyQ/manifest/video.m3u8`

### Revoking keys

You can create up to 1,000 keys and rotate them at your convenience.
Once revoked all tokens created with that key will be invalidated.

```javascript
// curl -X DELETE -H "Authorization: Bearer $TOKEN"  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/keys/$KEYID"

{
  "result": "Revoked",
  "success": true,
  "errors": [],
  "messages": []
}
```
## Supported Restrictions

<TableWrap>

| Property Name | Description |
|------------------|-------------|
| exp | Expiration. A unix epoch timestamp after which the token will stop working. Cannot be greater than 24 hours in the future from when the token is signed|
| nbf | *Not Before* value. A unix epoch timestamp before which the token will not work |
| downloadable | if true, the token can be used to download the mp4 (assuming the video has downloads enabled) |
| accessRules | An array that specifies one or more ip and geo restrictions. accessRules are evaluated first-to-last. If a Rule matches, the associated action is applied and no further rules are evaluated. A token may have at most 5 members in the accessRules array. |
</TableWrap>

### accessRules Schema

Each accessRule must include 2 required properties:

* `type`: supported values are `any`, `ip.src` and `ip.geoip.country`
* `action`: support values are `allow` and `block`

Depending on the rule type, accessRules support 2 additional properties:

* `country`: an array of 2-letter country codes in [ISO 3166-1 Alpha 2](https://www.iso.org/obp/ui/#search) format.
* `ip`: an array of ip ranges. It is recommended to include both IPv4 and IPv6 variants in a rule if possible. Having only a single variant in a rule means that rule will ignore the other variant. For example, an IPv4-based rule will never be applicable to a viewer connecting from an IPv6 address. CIDRs should be preferred over specific IP addresses. Some devices, such as mobile, may change their IP over the course of a view. Video Access Control are evaluated continuously while a video is being viewed. As a result, overly strict IP rules may disrupt playback.


***Example 1: Block views from a specific country***
```
...
"accessRules": [
	{
		"type": "ip.geoip.country",
		"action": "block",
		"country": ["US", "DE", "MX"],
	},
]
```

The first rule matches on country, US, DE, and MX here. When that rule matches, the block action will have the token considered invalid. If the first rule doesn't match, there are no further rules to evaluate. The behavior in this situation is to consider the token valid.

***Example 2: Allow only views from specific country or IPs***

```...
"accessRules": [
	{
		"type": "ip.geoip.country",
		"country": ["US", "MX"],
		"action": "allow",
	},
	{
		"type": "ip.src",
		"ip": ["93.184.216.0/24", "2400:cb00::/32"],
		"action": "allow",
	},
	{
		"type": "any",
		"action": "block",
	},
]
````

The first rule matches on country, US and MX here. When that rule matches, the allow action will have the token considered valid. If it doesn't match we continue evaluating rules

The second rule is an IP rule matching on CIDRs, 93.184.216.0/24 and 2400:cb00::/32. When that rule matches, the allow action will consider the rule valid.

If the first two rules don't match, the final rule of any will match all remaining requests and block those views.

## Security considerations

### Hotlinking Protection

By default, Stream embed codes can be used on any domain. If needed, you can limit the domains a video can be embedded on from the Stream dashboard.

In the dashboard, you will see a text box by each video labeled `Enter allowed origin domains separated by commas`. If you click on it, you can list the domains that the Stream embed code should be able to be used on.

  * `*.badtortilla.com` covers a.badtortilla.com, a.b.badtortilla.com and badtortilla.com
  * `example.com` does not cover www.example.com or any subdomain of example.com
  * `localhost` requires a port if it is not being served over https on port 80 or over https on port 443
  * There's no path support - `example.com` covers example.com/*

You can also control embed limitation programmatically using the Stream API. `uid` in the example below refers to the video id.

```sh
curl -X POST \
-H "Authorization: Bearer $TOKEN" \
-d "{\"uid\": \"$VIDEOID\", \"allowedOrigins\": [\"example.com\"]}" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/$VIDEOID

```

### Signed URLs

Combining signed URLs with embedding restrictions allows you to strongly control how your videos are viewed. This lets you serve only trusted users while preventing the signed URL from being hosted on an unknown site.

