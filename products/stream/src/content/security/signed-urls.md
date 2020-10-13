# Signed URLs

By default, videos on Cloudflare Stream can be viewed by anyone anytime until you delete the video. Users can view the source of the embed code in their browser and get a URL to the video that could be shared with others. To prevent this, use signed URLs.

Signed URLs are controlled by you and can be set to expire after a set time period. This allows you to control the time window you allow your users to watch videos. [Other viewing constraints can also be applied.](#signing-unique-tokens)

To implement signed URLs

1. Create a key
1. Make a video require signed URLS
1. Sign tokens to use in embed code

These steps are detailed below.

You can [revoke a key](#revoking-keys) anytime for any reason.

## Creating a signing key

Upon creation you will get a RSA private key in PEM and JWK formats. Keys are created, used and deleted independently of videos. Every key can sign any of your videos.

```javascript
// curl -X POST -H "X-Auth-Email: $EMAIL" -H "X-Auth-Key: $APIKEY"  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/keys"

{
  "result": {
    "id": "$KEYID",
    "pem": "$PRIVATE_KEY_IN_PEM_FORMAT",
    "jwk": "{PRIVATE-KEY-IN-JWK-FORMAT}",
    "created": "{TIMESTAMP}"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

## Making a video require signed URLs

Since video ids are effectively public within signed URLs, you will need to turn on `requireSignedURLs` on for your videos. This option will prevent any public links, such as `watch.cloudflarestream.com/$VIDEOID`, from working.

Restricting viewing can be done by updating the video's metadata.

```javascript

// curl -X POST -H "X-Auth-Email: $EMAIL" -H "X-Auth-Key: $APIKEY"  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/$VIDEOID" -H "Content-Type: application/json" -d '{"uid": "$VIDEOID", "requireSignedURLs": true }'

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

## Signing unique tokens

After creating a key, you can use it to sign unique signed tokens. These tokens can be used in place of video ids in the stream embed code.

You can sign to assert these optional constraints on the token:

- `exp` - expiration; a unix epoch timestamp **after** which the token will not be accepted.
- `nbf` - notBefore; a unix epoch timestamp **before** which the token will not be accepted.
- `accessRules` - Video Access Control; these allow making the token conditionally accepted on a variety of factors. For more details, see <a href="../access-rules/">their documentation</a>

## Using signed tokens

Embed codes can be modified to accept signed tokens. A signed token may be substituted for the videoID in the `<stream>` element's `src` attribute.

An example `<stream>` element using a signed token looks like this

    <stream src="<{SIGNED-TOKEN}>" controls></stream>

Note that the `<script>` tag present in other documentation examples must be present at least once on your page. It does not need to be modified.

### Get started with a signing utility

*Using this signing utility in production is not recommended.*

We offer a utility at `https://util.cloudflarestream.com/sign` to generate tokens when getting familiar with signed URLs.

```javascript
curl -X POST "https://util.cloudflarestream.com/sign/$VIDEOID" -d '{"id": "$KEYID", "pem": "$PRIVATE_KEY_IN_PEM_FORMAT","nbf":1537453165,"exp":1537460365}'
```

This endpoint accepts JSON bodies with the output from [Creating a signing key](#creating-a-signing-key) or any object with `pem` and `kid` attributes. To add a constraint, include it as a property of the body.

### Signing tokens in production

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

### Debugging signed tokens

If your token is not behaving as expected when tested against our server, some information is surfaced which is a good place to start.

For requests rejected using signed tokens, the response body typically includes the reason for the rejection.

To view these failures, the network view in your browser's developer tools will work. Select a 401 or 403 response from `videodelivery.net` and check the `Response`. You could also open the URL in your browser or `curl` it.

For example, the message for a rule blocking a view will look like:

		401 unauthorized blocked by rule on 'ip.src'

A malformed token will contain the top-level field that is malformed:

		401 unauthorized malformed token: check fields ["accessRules"]

### Revoking keys

You can create up to 1,000 keys and rotate them at your convenience.
Once revoked all tokens created with that key will be invalidated.

```javascript
// curl -X DELETE -H "X-Auth-Email: $EMAIL" -H "X-Auth-Key: $APIKEY"  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT/stream/keys/$KEYID"

{
  "result": "Revoked",
  "success": true,
  "errors": [],
  "messages": []
}
```


### Other offline signing examples

#### Sign in go using go-jose

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

#### Sign with Cloudflare Workers

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
