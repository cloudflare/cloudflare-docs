---
pcx-content-type: reference
title: JWT contents
weight: 2
---
# JWT contents

Cloudflare Access includes the JWT with all authenticated requests. A typical JWT looks like this:

`eyJhbGciOiJSUzI1NiIsImtpZCI6IjkzMzhhYmUxYmFmMmZlNDkyZjY0.eyJhdWQiOlsiOTdlMmFhZ TEyMDEyMWY5MDJkZjhiYzk5ZmMzNDU5MTNh.zLYsHmLEginAQUXdygQo08gLTExWNXsN4jBc6PKdB`

As shown above, the JWT contains three Base64-URL values separated by dots:

* [Header](#header)
* [Payload](#payload)
* [Signature](#signature)

Unless your application is connected to Access through Cloudflare Tunnel, your application must validate the token to ensure the security of your origin. Validation of the header alone is not sufficient — the JWT and signature must be confirmed to avoid identity spoofing.

## Header

```json
{
  "alg": "RS256",
  "kid": "9338abe1baf2fe492f646a736f25afbf7b025e35c627be4f60c414d4c73069b8",
  "typ": "JWT"
}
```

* `alg` identifies the encoding algorithm.
* `kid` identifies the key used to sign the token.
* `typ` designates the token format.

## Payload

```json
{
  "aud": [
    "97e2aae120121f902df8bc99fc345913ab186d174f3079ea729236766b2e7c4a"
  ],
  "email": "admin@example.com",
  "account_id": "699d98642c564d2e855e9661899b7252",
  "exp": 1659036985,
  "iat": 1659036975,
  "nbf": 1659036975,
  "iss": "https://example.cloudflareaccess.com",
  "sub": "ca639bb9-26ab-42e5-b9bf-3aea27b331fd",
  "identity": {
    "email": "user@example.com",
    "idp": {
      "id": "a5bc3a60-e11f-4aae-a109-c3d7404953ca",
      "type": "onetimepin",
      "name": "",
      "config": {
        "redirect_url": "https://example.cloudflareaccess.com/cdn-cgi/access/callback"
      },
      "metadata": {},
      "version": "57c1fa1534ac94ed9949b39db2d1d297"
    },
    "geo": {
      "country": "US"
    },
    "user_uuid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "account_id": "699d98642c564d2e855e9661899b7252",
    "iat": 1659036975,
    "ip": "123.123.12.123",
    "auth_status": "NONE",
    "common_name": "",
    "service_token_id": "",
    "service_token_status": false,
    "is_warp": false,
    "is_gateway": false,
    "device_id": "",
    "version": 2
  },
  "type": "org",
  "identity_nonce": "Ab12G3z456mABkDe"
}
```

The payload contains the actual claim and user information to pass to the application.

| Field           | Description                               |
|-----------------|-------------------------------------------|
| aud             | The AUD tag for the application to which the token is issued. |
| email           | The email address of the authenticated user. |
| account_id      | The account ID for your organization. |
| exp             | The expiration timestamp for the token.. |
| iat             | The issuance timestamp for the token. |
| nbf             | |
| iss             | The Cloudflare Access domain URL for the application.|
| sub             | |
| identity        | A data structure containing the [user's identity](#user-identity). |
| type            | |
| identity_nonce  | |
| custom          | The SAML attributes specified in your identity provider configuration. Only available in the application token. |

### User identity

The JWT created by Cloudflare Access contains the user's identity, which is useful for checking application permissions. For example, your application can validate that a given user is a member of an Okta or AzureAD group such as `Finance-Team`.

To get the user's identity from an Access JWT, send the `CF_Authorization` cookie to `https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/get-identity`. Your request should be structured as follows:

```sh
curl -H 'cookie: CF_Authorization=<user-token>' https://<your-team-name>.cloudflareaccess.com/cdn-cgi/access/get-identity
```

The response will be structured as JSON. The exact contents will vary depending on the authentication method but may include the following data:

| Field           | Description                               |
|-----------------|-------------------------------------------|
| id              |  |
| name            | The name of the user. |
| email           | The email address of the user. |
| groups          | The IdP groups the user belongs to. |
| idp             | The authentication method. |
| geo             | The country where the user authenticated from. |
| user_uuid       | The ID of the user. |
| devicePosture   | The device posture attributes |
| account_id      | The account ID for your organization. |
| iat             | The timestamp indicating when the user logged in. |
| ip              | The IP address of the user. |
| auth_status     | |
| common_name     | |
| service_token_id | The ID of the service token used for authentication. |
| service_token_status | True if authentication was through a service token instead of an IdP. |
| is_warp         | True if the user authenticated with WARP. |
| is_gateway      | |
| device_id       | The ID of the device used for authentication. |
| version         | |
| device_sessions | A list of all sessions initiated by the user. |

### OIDC claims

Access allows you to add additional OIDC claims (if supported by your IdP) to your JWT for enhanced verification. When you configure an [OpenID Connect](/cloudflare-one/identity/idp-integration/generic-oidc/) provider, enter your OIDC claims under **Optional configurations**.

## Signature

Cloudflare generates the signature by signing the encoded header and payload using the SHA-256 algorithm (RS256). In RS256, a private key signs the JWTs and a separate [public key](/cloudflare-one/identity/users/access-jwt/validating-json/#access-signing-key) verifies the signature.

For more information on JWTs, refer to [jwt.io](https://jwt.io/).
