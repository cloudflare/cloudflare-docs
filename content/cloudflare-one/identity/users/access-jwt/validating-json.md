---
pcx-content-type: how-to
title: Validate JWTs
weight: 1
---

# Validate JWTs

Requests to your application will include the Access JWT as a `CF_Authorization` cookie. Cloudflare signs the Access JWT with a key pair unique to your account. To verify the JWT, you will need to provide the public key located at the following URL: `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/certs`.

## Access signing keys

By default, the Access signing key rotates every 6 weeks. This means you will need to programmatically or manually update keys as they rotate. Previous keys are valid for 7 days after rotation to allow time for you to make the update.

Keys can also be manually rotated using the [API](https://api.cloudflare.com/#access-keys-configuration-rotate-access-keys). This can be done for testing or security purposes.

{{<Aside type="note">}}
Because the token rotates, validate tokens using the external endpoint rather than saving the public key as a hard-coded value.  
{{</Aside>}}

As shown in the example below, `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/certs` contains two public keys: the current key and the previous key.

* `keys`: both keys in JWK format
* `public_cert`: current key in PEM format
* `public_certs`: both keys in PEM format.

```txt
{
  "keys": [
    {
      "kid": "1a1c3986a44ce6390be42ec772b031df8f433fdc71716db821dc0c39af3bce49",
      "kty": "RSA",
      "alg": "RS256",
      "use": "sig",
      "e": "AQAB",
      "n": "5PKw-...-AG7MyQ"
    },
    {
      "kid": "6c3bffef71bb0a90c9cbef3b7c0d4a1c7b4b8b76b80292a623afd9dac45d1c65",
      "kty": "RSA",
      "alg": "RS256",
      "use": "sig",
      "e": "AQAB",
      "n": "pwVn...AA6Hw"
    }
  ],
  "public_cert": {
    "kid": "6c3bffef71bb0a90c9cbef3b7c0d4a1c7b4b8b76b80292a623afd9dac45d1c65",
    "cert": "-----BEGIN CERTIFICATE----- ... -----END CERTIFICATE----- "
  },
  "public_certs": [
    {
      "kid": "1a1c3986a44ce6390be42ec772b031df8f433fdc71716db821dc0c39af3bce49",
      "cert": "-----BEGIN CERTIFICATE----- ... -----END CERTIFICATE----- "
    },
    {
      "kid": "6c3bffef71bb0a90c9cbef3b7c0d4a1c7b4b8b76b80292a623afd9dac45d1c65",
      "cert": "-----BEGIN CERTIFICATE----- ... -----END CERTIFICATE----- "
    }
  ]
}
```

## Verify the JWT manually

To verify the token manually:

1. Go to [jwt.io](https://jwt.io/).

2. Select the RS256 algorithm.

3. Paste the JWT into the **Encoded** box.

4. Get the `kid` value located in the **Header** box.

5. Get your public key:

    1. Go to `https://<your-team-name>/cdn-cgi/access/certs`.
    2. Under `public_certs`, locate the entry with the `kid` value you found in Step 4.
    3. Copy the `cert` value.

6. In the **Verify Signature** box, paste the `cert` value into the **Public Key** field.

7. Ensure that the signature says **verified**.

You can now trust that this request to your application was sent by Access.

## Programmatic verification

### Get your AUD tag

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com/), go to **Access** > **Applications**.
2. Select **Edit** for your application.
3. On the **Overview** tab, copy the **Application Audience (AUD) Tag**.

You can now paste the AUD tag into your token validation script.

### Golang example

```go
package main

import (
    "context"
    "fmt"
    "net/http"

    "github.com/coreos/go-oidc/v3/oidc"
)

var (
    ctx        = context.TODO()
    teamDomain = "https://test.cloudflareaccess.com"
    certsURL   = fmt.Sprintf("%s/cdn-cgi/access/certs", teamDomain)

    // The Application Audience (AUD) tag for your application
    policyAUD = "4714c1358e65fe4b408ad6d432a5f878f08194bdb4752441fd56faefa9b2b6f2"

    config = &oidc.Config{
        ClientID: policyAUD,
    }
    keySet   = oidc.NewRemoteKeySet(ctx, certsURL)
    verifier = oidc.NewVerifier(teamDomain, keySet, config)
)

// VerifyToken is a middleware to verify a CF Access token
func VerifyToken(next http.Handler) http.Handler {
    fn := func(w http.ResponseWriter, r *http.Request) {
        headers := r.Header

        // Make sure that the incoming request has our token header
        //  Could also look in the cookies for CF_AUTHORIZATION
        accessJWT := headers.Get("Cf-Access-Jwt-Assertion")
        if accessJWT == "" {
            w.WriteHeader(http.StatusUnauthorized)
            w.Write([]byte("No token on the request"))
            return
        }

        // Verify the access token
        ctx := r.Context()
        _, err := verifier.Verify(ctx, accessJWT)
        if err != nil {
            w.WriteHeader(http.StatusUnauthorized)
            w.Write([]byte(fmt.Sprintf("Invalid token: %s", err.Error())))
            return
        }
        next.ServeHTTP(w, r)
    }
    return http.HandlerFunc(fn)
}

func MainHandler() http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        w.Write([]byte("welcome"))
    })
}

func main() {
    http.Handle("/", VerifyToken(MainHandler()))
    http.ListenAndServe(":3000", nil)
}
```

### Python example

`pip` install the following:

- flask
- requests
- PyJWT
- cryptography

```python
from flask import Flask, request
import requests
import jwt
import json
import os
app = Flask(__name__)


# The Application Audience (AUD) tag for your application
POLICY_AUD = os.getenv("POLICY_AUD")

# Your CF Access team domain
TEAM_DOMAIN = os.getenv("TEAM_DOMAIN")
CERTS_URL = "{}/cdn-cgi/access/certs".format(TEAM_DOMAIN)

def _get_public_keys():
    """
    Returns:
        List of RSA public keys usable by PyJWT.
    """
    r = requests.get(CERTS_URL)
    public_keys = []
    jwk_set = r.json()
    for key_dict in jwk_set['keys']:
        public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(key_dict))
        public_keys.append(public_key)
    return public_keys

def verify_token(f):
    """
    Decorator that wraps a Flask API call to verify the CF Access JWT
    """
    def wrapper():
        token = ''
        if 'CF_Authorization' in request.cookies:
            token = request.cookies['CF_Authorization']
        else:
            return "missing required cf authorization token", 403
        keys = _get_public_keys()

        # Loop through the keys since we can't pass the key set to the decoder
        valid_token = False
        for key in keys:
            try:
                # decode returns the claims that has the email when needed
                jwt.decode(token, key=key, audience=POLICY_AUD, algorithms=['RS256'])
                valid_token = True
                break
            except:
                pass
        if not valid_token:
            return "invalid token", 403

        return f()
    return wrapper


@app.route('/')
@verify_token
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run()
```

