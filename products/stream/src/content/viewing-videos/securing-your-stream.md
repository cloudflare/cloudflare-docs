---
order: 3
---

# Securing your Stream

## Signed URLs / Tokens

By default, videos on Cloudflare Stream can be viewed by anyone anytime until you delete the video. Users can view the source of the embed code in their browser and get a URL to the video that could be shared with others. To prevent this, use signed URLs.

Signed URLs are controlled by you and can be set to expire after a set time period. This allows you to control the time window you allow your users to watch videos. [Other viewing constraints can also be applied.](#signing-unique-tokens)

To implement signed URLs

1. Create a key
1. Make a video require signed URLS
1. Sign tokens to use in embed code

These steps are detailed below.

You can [revoke a key](#revoking-keys) anytime for any reason.

### Creating a signing key

Upon creation you will get a RSA private key in PEM and JWK formats. Keys are created, used and deleted independently of videos. Every key can sign any of your videos.

```javascript
// curl -X POST -H "Authorization: Bearer $TOKEN"  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/keys"

{
  "result": {
    "id": "$KEYID",
    "pem": "$PRIVATE_KEY_IN_PEM_FORMAT",
    "jwk": "$PRIVATE-KEY-IN-JWK-FORMAT",
    "created": "$TIMESTAMP"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

The `pem` and `jwk` fields are base64-encoded, you must decode them before using them.

### Making a video require signed URLs

Since video ids are effectively public within signed URLs, you will need to turn on `requireSignedURLs` on for your videos. This option will prevent any public links, such as `watch.cloudflarestream.com/$VIDEOID`, from working.

Restricting viewing can be done by updating the video's metadata.

```javascript

// curl -X POST -H "Authorization: Bearer $TOKEN"  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/$VIDEOID" -H "Content-Type: application/json" -d "{\"uid\": \"$VIDEOID\", \"requireSignedURLs\": true }"

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

### Signing unique tokens

After creating a key, you can use it to sign unique signed tokens. These tokens can be used in place of video ids in the stream embed code.

For security reasons, the key signing a token to view a video **must** be associated with the same account the video was uploaded to. For example, if you have a key owned by account A attempting to sign a token for a video owned by account B, that token will not be accepted.

You can sign to assert these optional constraints on the token:

- `exp` - expiration; a unix epoch timestamp **after** which the token will not be accepted.
- `nbf` - notBefore; a unix epoch timestamp **before** which the token will not be accepted.
- `downloadable` - a boolean, mp4 downloads requiring signed URLs will not accept this token unless this value is true. For more details, see the [download documentation](../download-videos)
- `accessRules` - Video Access Control; these allow making the token conditionally accepted on a variety of factors. For more details, see [their documentation](#video-access-control)

### Playback using signed tokens

Replace the video ID with the signed token to use it.

```html
<iframe
  src="https://iframe.videodelivery.net/$SIGNEDTOKEN"
  style="border: none;"
  height="720"
  width="1280"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true"
></iframe>
```

#### Get started with a signing utility

*Using this signing utility in production is not recommended.*

We offer a utility at `https://util.cloudflarestream.com/sign` to generate tokens when getting familiar with signed URLs.

- `exp` - If not set, defaults to one hour after issuing.
- `nbf` - If not set, defaults to one hour before issuing.

```sh
curl -X POST "https://util.cloudflarestream.com/sign/$VIDEOID" -d "{\"id\": \"$KEYID\", \"pem\": \"$PRIVATE_KEY_IN_PEM_FORMAT\",\"nbf\":1537453165,\"exp\":1537460365}"
```

This endpoint accepts JSON bodies with the output from [Creating a signing key](#creating-a-signing-key) or any object with `pem` and `kid` attributes. To add a constraint, include it as a property of the body.

#### Signing tokens in production

Other offline signing examples are included [below](#other-offline-signing-examples)

This is an example of signing a token in nodejs using the `jsonwebtoken` package.

```javascript
var jwt = require('jsonwebtoken');

var token = jwt.sign(

  { kid: "$KEYID",
    sub: "$VIDEOID",
  },
  Buffer.from("$PRIVATE_KEY_IN_PEM_FORMAT",'base64'),
  {
    expiresIn: '1h', // or preferred expiry time. Note that this should be longer than the duration of the video
    algorithm: 'RS256',
  }
);


// you can now use the token instead of the video id when viewing videos
console.log(token)
```

#### Debugging signed tokens

If your token is not behaving as expected when tested against our server, some information is surfaced which is a good place to start.

For requests rejected using signed tokens, the response body typically includes the reason for the rejection.

To view these failures, the network view in your browser's developer tools will work. Select a 401 or 403 response from `videodelivery.net` and check the `Response`. You could also open the URL in your browser or `curl` it.

For example, the message for a rule blocking a view will look like:

		401 unauthorized blocked by rule on 'ip.src'

A malformed token will contain the top-level field that is malformed:

		401 unauthorized malformed token: check fields ["accessRules"]

#### Revoking keys

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

#### Other offline signing examples

##### Sign in go using go-jose

Use: `go run sign.go`

```go

package main

import (
	"crypto/x509"
	"encoding/base64"
	"encoding/pem"
	"fmt"
	"os"
	"time"

	jose "gopkg.in/square/go-jose.v2"
	jwt "gopkg.in/square/go-jose.v2/jwt"
)

type claims struct {
	KeyID     string          `json:"kid,omitempty"`
	VideoID   string          `json:"sub,omitempty"`
	Expiry    jwt.NumericDate `json:"exp,omitempty"`
	NotBefore jwt.NumericDate `json:"nbf,omitempty"`
}

const videoID = "$VIDEOID"
const keyID = "$KEYID"
const privateKey = "$PRIVATE_KEY_IN_PEM_FORMAT"
const expiresIn = time.Hour

func main() {
	// Decode privateKey
	keyBytes, err := base64.StdEncoding.DecodeString(privateKey)
	if err != nil {
		fmt.Printf("failed to generate key: %s\n", err)
		os.Exit(1)
	}
	block, _ := pem.Decode(keyBytes)
	if err != nil {
		fmt.Printf("failed to decode pem: %s\n", err)
		os.Exit(1)
	}
	rsaPrivateKey, err := x509.ParsePKCS1PrivateKey(block.Bytes)
	if err != nil {
		fmt.Printf("failed to parse key: %s\n", err)
		os.Exit(1)
	}

	// Prepare to sign
	var options jose.SignerOptions
	options.WithType("JWT").WithHeader("kid", keyID)
	signer, err := jose.NewSigner(jose.SigningKey{Algorithm: jose.RS256, Key: rsaPrivateKey},
		&options)
	if err != nil {
		fmt.Printf("failed to initialize signer: %s\n", err)
		os.Exit(1)
	}

	// Sign a JWT
	builder := jwt.Signed(signer)
	builder = builder.Claims(claims{
		KeyID:   keyID,
		VideoID: videoID,
		Expiry:  *jwt.NewNumericDate(time.Now().Add(expiresIn)),
	})
	token, err := builder.CompactSerialize()
	if err != nil {
		fmt.Printf("failed to get token: %s\n", err)
		os.Exit(1)
	}

	fmt.Println(token)
}


```

##### Sign with Cloudflare Workers

The following code snippet does not include the function `addEventListener` on `fetch`. The goal of that snippet is to give you a function that return the JWT.
To be noted, the code snippet contain an `accessRules` that allow only UK user to watch the video.

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

## Security considerations

### Limiting where videos can be embedded

By default, Stream embed codes can be used on any domain. If needed, you can limit the domains a video can be embedded on from the Stream dashboard.

In the dashboard, you will see a text box by each video labeled `Enter allowed origin domains separated by commas`. If you click on it, you can list the domains that the Stream embed code should be able to be used on.

  * `*.badtortilla.com` covers a.badtortilla.com, a.b.badtortilla.com and badtortilla.com
  * `example.com` does not cover www.example.com or any subdomain of example.com
  * `localhost` covers localhost at any port
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

To do so

1. Sign a token and use it in an embed code on your site
1. Make the video private
1. Restrict the viewing domains to your site

### Content Security Policy (CSP) considerations

Content Security Policy (CSP) is a layer of security that helps to detect and prevent certain types of cross site scripting and data injection attacks. Most common way servers set CSP information is through headers at your origin server.

If you are using CSP, you will need to add all subdomains of `cloudflarestream.com` and `videodelivery.net` to your CSP policy in order for Stream to work.

    Content-Security-Policy: default-src 'self' *.cloudflarestream.com *.videodelivery.net

If CSP is misconfigured your videos might not play or you might see an error similar to the one below in your browser's JavaScript console.

    Refused to load the script 'https://embed.cloudflarestream.com/embed/r4xu.fla9.latest.js' because it violates the following Content Security Policy directive: ...

Read more about Content Security Policy at [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

## Video access control

Video Access Control allow you to define Rules to have finer-grained control over your content than signed URL tokens alone. They are primarily aimed at making tokens conditionally valid based on user information. Access Rules are specified on token payloads as the `accessRules` property containing an array of `Rule` objects.

If you're not already familiar with signed URLs, <a href="#signed-urls--tokens">start here.</a>

### Rules

A Rule has two components. The `action` is taken if the conditions associated with the `type` matches. Each `type` has an associated field that should be filled, see the <a href="#schema">schema</a> or <a href="#examples">examples</a> for details.

These Rule types are available

- `any` - Match all requests. May be used as a wildcard to apply a default action after other rules.
- `ip.src` - Match specific IPv4 or IPV6 addresses or CIDRs.
- `ip.geoip.country` - Match specific 2-letter country codes in [ISO 3166-1 Alpha 2](https://www.iso.org/obp/ui/#search) format.

These Rule actions are available

- `allow` - View is considered valid.
- `block` - View is considered invalid and a 401 or 403 is returned.

Access Rules are evaluated first-to-last. If a Rule matches, the associated `action` is applied and no further rules are evaluated.

### Schema

A valid Rule object conforms to this type signature:

```
{
	action: "allow" | "block";
	type: "any";
} | {
	action: "allow" | "block";
	type: "ip.src";
	ip: (IPv4CidrRange | IPv6CidrRange | IPv4 | IPv6)[];
} | {
	action: "allow" | "block";
	type: "ip.geoip.country";
	country: string[];
}
```

In the future, Rule types or actions may be added. If you have other types of rules or actions you need for your video application, please contact Cloudflare support.

#### Examples

##### Allow only views from specific CIDRs

```
...
"accessRules": [
	{
		"type": "ip.src",
		"action": "allow",
		"ip": ["93.184.216.0/24", "2400:cb00::/32"],
	},
	{
		"type": "any",
		"action": "block",
	}
]
```

The first rule is an IP rule matching on CIDRs, `93.184.216.0/24` and `2400:cb00::/32`. When that rule matches, the `allow` action will abort rule evaluation and consider the view valid.

If the first rule doesn't match, the second rule of `any` will match all remaining requests and block those views.

##### Block views from a specific country

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

The first rule matches on country, `US`, `DE`, and `MX` here. When that rule matches, the `block` action will have the token considered invalid.

If the first rule doesn't match, there are no further rules to evaluate. The behavior in this situation is to consider the token valid.

##### Allow only views from specific country or IPs

```
...
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

The first rule matches on country, `US` and `MX` here. When that rule matches, the `allow` action will have the token considered valid. If it doesn't match we continue evaluating rules

The second rule is an IP rule matching on CIDRs, `93.184.216.0/24` and `2400:cb00::/32`. When that rule matches, the `allow` action will consider the rule valid.

If the first two rules don't match, the final rule of `any` will match all remaining requests and block those views.

### Usage Notes

#### Maximum Rule Count

A token may have at most 5 members in the `accessRules` array.

Note that most Rule types take arrays as arguments. For example, a rule of type `ip.src` can specify multiple IP addresses or CIDRs.

If you require more than 5 rules, please contact Cloudflare support.

#### ip.src

It is recommended to include both IPv4 and IPv6 variants in a rule if possible. Having only a single variant in a rule means that rule will ignore the other variant. For example, an IPv4-based rule will never be applicable to a viewer connecting from an IPv6 address.

CIDRs should be preferred over specific IP addresses. Some devices, such as mobile, may change their IP over the course of a view. Video Access Control are evaluated continuously while a video is being viewed. As a result, overly strict IP rules may disrupt playback.
