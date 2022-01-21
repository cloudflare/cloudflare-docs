---
title: Secure your Stream
pcx-content-type: tutorial
---

# Secure your Stream

By default, videos on Stream can be viewed by anyone with using video ID. To make your video private by default and only give access to certain users, you can use the signed URL feature. When you require signed URL for a video, the video is not publicly available and will require a signed URL token to watch or download the video.

Common use cases for using signed URLs include:

* Restricting access so only logged in members can watch a particular video
* Letting users watch your video for a limited time period, for example, 24 hours
* Restricting access based on geolocation 

## Require signed URLs

When `requireSignedURLs` is enabled for your videos, any public links, such as `watch.cloudflarestream.com/$VIDEOID`, will not work.

Restricting viewing can be done by updating the video's metadata.

```bash
curl -X POST -H "Authorization: Bearer $TOKEN" "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/$VIDEOID" 
-H "Content-Type: application/json" 
-d "{\"uid\": \"$VIDEOID\", \"requireSignedURLs\": true }"
```

Response

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

## Generate Signed Tokens

You can program your app to generate token in two ways:

- **[Use the `/token` endpoint:](#use-the-token-endpoint)** This option is the simplest and recommended for testing purposes or if you are generating less than 10,000 tokens per day.

- **[Create tokens on your own:](#create-tokens-on-your-own)** If you have tens of thousands of daily users and need to generate a high-volume of tokens without calling the `/token` endpoint each time, you can create tokens yourself to avoid calling the Stream endpoint each time.

## Use the `/token` endpoint

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
   <td><a href="https://api.cloudflare.com/#stream-videos-create-a-signed-url-token-for-a-video">Create signed URL token</a>
   </td>
   <td><Code>POST</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/:identifier/token</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>

You can call the `/token` endpoint for any video that is marked private to get a signed url token which expires in one hour:

To render the video, insert the `token` value in place of the `video id` in your iframe.

```html
<iframe src="https://iframe.videodelivery.net/eyJhbGciOiJSUzI1NiIsImtpZCI6ImNkYzkzNTk4MmY4MDc1ZjJlZjk2MTA2ZDg1ZmNkODM4In0.eyJraWQiOiJjZGM5MzU5ODJmODA3NWYyZWY5NjEwNmQ4NWZjZDgzOCIsImV4cCI6IjE2MjE4ODk2NTciLCJuYmYiOiIxNjIxODgyNDU3In0.iHGMvwOh2-SuqUG7kp2GeLXyKvMavP-I2rYCni9odNwms7imW429bM2tKs3G9INms8gSc7fzm8hNEYWOhGHWRBaaCs3U9H4DRWaFOvn0sJWLBitGuF_YaZM5O6fqJPTAwhgFKdikyk9zVzHrIJ0PfBL0NsTgwDxLkJjEAEULQJpiQU1DNm0w5ctasdbw77YtDwdZ01g924Dm6jIsWolW0Ic0AevCLyVdg501Ki9hSF7kYST0egcll47jmoMMni7ujQCJI1XEAOas32DdjnMvU8vXrYbaHk1m1oXlm319rDYghOHed9kr293KM7ivtZNlhYceSzOpyAmqNFS7mearyQ" style="border: none;" height="720" width="1280" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe>
```


If you are using your own player, replace the `video id `in the manifest URL with the `token` value.

```
https://videodelivery.net/eyJhbGciOiJSUzI1NiIsImtpZCI6ImNkYzkzNTk4MmY4MDc1ZjJlZjk2MTA2ZDg1ZmNkODM4In0.eyJraWQiOiJjZGM5MzU5ODJmODA3NWYyZWY5NjEwNmQ4NWZjZDgzOCIsImV4cCI6IjE2MjE4ODk2NTciLCJuYmYiOiIxNjIxODgyNDU3In0.iHGMvwOh2-SuqUG7kp2GeLXyKvMavP-I2rYCni9odNwms7imW429bM2tKs3G9INms8gSc7fzm8hNEYWOhGHWRBaaCs3U9H4DRWaFOvn0sJWLBitGuF_YaZM5O6fqJPTAwhgFKdikyk9zVzHrIJ0PfBL0NsTgwDxLkJjEAEULQJpiQU1DNm0w5ctasdbw77YtDwdZ01g924Dm6jIsWolW0Ic0AevCLyVdg501Ki9hSF7kYST0egcll47jmoMMni7ujQCJI1XEAOas32DdjnMvU8vXrYbaHk1m1oXlm319rDYghOHed9kr293KM7ivtZNlhYceSzOpyAmqNFS7mearyQ/manifest/video.m3u8
```

### Customize default restrictions

If you call the `/token` endpoint without a body, it will return a token that expires in one hour. If you want to let a user watch a particular video for the next 12 hours, you can do that with a Cloudflare Worker.

```javascript
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

The returned token will expire after 12 hours, but let's add two additional restrictions:

* Allow the signed URL token to be used for MP4 downloads, assuming the video has downloads enabled.
* Block users from the US and Mexico from viewing or downloading the video.

To achieve this, specify additional restrictions in the `signed_url_restrictions` object in the sample code.

```javascript

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

## Create tokens on your own

If you are generating a high-volume of tokens, we recommend generating new tokens to avoid calling the Stream API each time. 

###  1. Call the `/stream/key` endpoint

Call the `/stream/key` endpoint once to obtain a key.

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
   <td><a href="https://api.cloudflare.com/#stream-signing-keys-create-a-signing-key">Create a signing key</a>
   </td>
   <td><Code>POST</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/keys
</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>


The response will return `pem` and `jwk` values that you must save because they will not be shown again. The `pem` and `jwk` fields are base64-encoded, and you must decode them before using them to generate the tokens in the next step.

### 2. Generate tokens using the key
 
With the `pem` or `jwk` values you obtained in the previous step, you can generate self-signing URLs on your own. With this method, you do not need to call the Stream API each time you create a new token.

Below is an example of Cloudflare Worker script that generates tokens that expire after 60 minutes and only work for users accessing the video from the UK. In lines 2 and 3, configure the `id` and `jwk` values from step 1.

```javascript
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

### 3. Render the video 

If you are using the Stream Player, insert the token returned by the Worker in Step 2 in place of the `video id`.

```html
<iframe src="https://iframe.videodelivery.net/eyJhbGciOiJSUzI1NiIsImtpZCI6ImNkYzkzNTk4MmY4MDc1ZjJlZjk2MTA2ZDg1ZmNkODM4In0.eyJraWQiOiJjZGM5MzU5ODJmODA3NWYyZWY5NjEwNmQ4NWZjZDgzOCIsImV4cCI6IjE2MjE4ODk2NTciLCJuYmYiOiIxNjIxODgyNDU3In0.iHGMvwOh2-SuqUG7kp2GeLXyKvMavP-I2rYCni9odNwms7imW429bM2tKs3G9INms8gSc7fzm8hNEYWOhGHWRBaaCs3U9H4DRWaFOvn0sJWLBitGuF_YaZM5O6fqJPTAwhgFKdikyk9zVzHrIJ0PfBL0NsTgwDxLkJjEAEULQJpiQU1DNm0w5ctasdbw77YtDwdZ01g924Dm6jIsWolW0Ic0AevCLyVdg501Ki9hSF7kYST0egcll47jmoMMni7ujQCJI1XEAOas32DdjnMvU8vXrYbaHk1m1oXlm319rDYghOHed9kr293KM7ivtZNlhYceSzOpyAmqNFS7mearyQ" style="border: none;" height="720" width="1280" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen="true"></iframe>
```

If you are using your own player, replace the `video id` in the manifest URL with the `token` value.

```
https://videodelivery.net/eyJhbGciOiJSUzI1NiIsImtpZCI6ImNkYzkzNTk4MmY4MDc1ZjJlZjk2MTA2ZDg1ZmNkODM4In0.eyJraWQiOiJjZGM5MzU5ODJmODA3NWYyZWY5NjEwNmQ4NWZjZDgzOCIsImV4cCI6IjE2MjE4ODk2NTciLCJuYmYiOiIxNjIxODgyNDU3In0.iHGMvwOh2-SuqUG7kp2GeLXyKvMavP-I2rYCni9odNwms7imW429bM2tKs3G9INms8gSc7fzm8hNEYWOhGHWRBaaCs3U9H4DRWaFOvn0sJWLBitGuF_YaZM5O6fqJPTAwhgFKdikyk9zVzHrIJ0PfBL0NsTgwDxLkJjEAEULQJpiQU1DNm0w5ctasdbw77YtDwdZ01g924Dm6jIsWolW0Ic0AevCLyVdg501Ki9hSF7kYST0egcll47jmoMMni7ujQCJI1XEAOas32DdjnMvU8vXrYbaHk1m1oXlm319rDYghOHed9kr293KM7ivtZNlhYceSzOpyAmqNFS7mearyQ/manifest/video.m3u8
```

## Revoke keys

You can create up to 1,000 keys and rotate them at your convenience. After the keys are revoked, all tokens created with that key will be invalid.

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

Supported restrictions include `exp`, `nbf`, `downloadable`, and `accessRules` which you can learn about from the [Optional parameters](https://api.cloudflare.com/#stream-videos-create-a-signed-url-token-for-a-video) under Create a signed URL token for a video.

### `accessRules` Schema

Each `accessRule` must include two required properties, `type` and `action`. Depending on the rule type, `accessRules` supports two additional properties, `country` and `ip`. For more information on these values, expand the definition for the [`accessRules` array]([Optional parameters](https://api.cloudflare.com/#stream-videos-create-a-signed-url-token-for-a-video)).

- `type`: Supported values include `any`, `ip.src` and `ip.geoip.country`.
- `action`: Supported values include `allow` and `block`.

<Aside>

We recommend including both IPv4 and IPv6 variants in a rule if possible to prevent a single variant in a rule ignoring the other variant. For example, an IPv4-based rule will never be applicable to a viewer connecting from an IPv6 address. 

Additionally, CIDRs are preferred over specific IP addresses as some devices, such as mobile, may change their IP over the course of a view. Video Access Control is evaluated continuously while a video is being viewed, and as a result, overly strict IP rules may disrupt playback.

</Aside>

**Example: Block views from a specific country**

The first rule matches on country, specifically US, DE, and MX. When the rule matches, the block action will consider the token invalid. If the first rule does not match, there are no further rules to evaluate. The behavior in this situation is to consider the token valid.

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

**Example: Only allow views from a specific country or IPs**

The first rule matches on country, specifically US and MX. When the rule matches, the allow action will have the token considered valid. If the rule does not match, we continue evaluating rules. 

The second rule is an IP rule matching on CIDRs 93.184.216.0/24 and 2400:cb00::/32. When the rule matches, the allow action will consider the rule valid. If the first two rules do not match, the final rule will match all remaining requests and block those views.

```
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
```

## Security considerations

### Hotlinking Protection

By default, Stream embed codes can be used on any domain, including domains not on Cloudflare. If needed, you can limit the domains a video can be embedded on from the Stream dashboard.

1. Log in to your Cloudflare account.
1. From **Menu**, under **Products** click **Stream**.
1. On the **Videos** tab, click one of the videos in your list to select it.
1. On the **Settings** tab under **Allowed Origins**, enter the domains that can use the Stream embed code.

**Guidelines**

  * `*.example.com` covers `a.example.com`, `a.b.example.com`, and `example.com`
  * `example.com` does not cover `www.example.com` or any subdomain of `example.com`
  * `localhost` requires a port if it is not being served over HHTPS on port 80 or over HTTPS on port 443
  * There's no path support - `example.com` covers `example.com/*`

You can also control embed limitation programmatically using the Stream API. `uid` in the example below refers to the `video id`.

```sh
curl -X POST \
-H "Authorization: Bearer $TOKEN" \
-d "{\"uid\": \"$VIDEOID\", \"allowedOrigins\": [\"example.com\"]}" \
https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/$VIDEOID
```

### Signed URLs

Combining signed URLs with embedding restrictions provides greater control of how your videos are viewed. Combining the two lets you serve only trusted users while preventing the signed URL from being hosted on an unknown site.
