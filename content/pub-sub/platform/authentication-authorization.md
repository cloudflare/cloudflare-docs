---
title: Authentication and authorization
pcx-content-type: concept
weight: 1
---

# Authentication and authorization

Pub/Sub supports two authentication modes. A broker may allow one or both, but never none as authentication is always required.

| Mode <img width=235/>|     Details                    |
|----------------------|--------------------------------|
| TOKEN           | Accepts a Client ID and a password (represented by a signed JSON Web Token) in the CONNECT packet. <br/><br/> The MQTT User Name field is optional. If provided, it must match the Client ID.|
| MTLS            | **Not yet supported.** <br/> Accepts an mTLS keypair (TLS client credentials) scoped to that broker. <br/> Keypairs are issued from a Cloudflare root CA unless otherwise configured.|
| MTLS_AND_TOKEN   | **Not yet supported.** <br/> Allows clients to use both MTLS and/or Token auth for a broker.|


To generate credentials scoped to a specific broker, you have two options:
- Allow Pub/Sub to generate Client IDs for you.
- Supply a list of Client IDs that Pub/Sub will use to generate tokens.

The recommended and simplest approach if you are starting from scratch is to have Pub/Sub generate Client IDs for you, which ensures they are sufficiently random and that there are not conflicting Client IDs. Duplicate Client IDs can cause issues with clients because only one instance of a Client ID is allowed to connect to a broker. 

## Generate credentials

{{<Aside type="note">}}

Ensure you do not commit your credentials to source control, such as GitHub. A valid token allows anyone to connect to your broker and publish or subscribe to messages. Treat credentials as secrets.

{{</Aside>}}

To generate a single token for a broker named `example-broker` in `your-namespace`, issue a request to the Pub/Sub API.

- By default, the API returns one  valid` <Client ID, Token>` pair but can return up to 100 per API call to simplify issuance for larger deployments.
- You must specify a Topic ACL (Access Control List) for the tokens. This defines what topics clients authenticating with these tokens can PUBLISH or SUBSCRIBE to. Currently, the Topic ACL must be `#` all topics — finer-grained ACLs are not yet supported.

For example, to generate five valid tokens with an automatically generated Client ID for each token:

```bash
# GET /accounts/:account_id/brokers/namespaces/:namespace_name/brokers/:broker_name/credentials
curl https://api.cloudflare.com/client/v4/accounts/<abcdef>/brokers/namespaces/your-namespace/brokers/example-broker/credentials?number=5&type=TOKEN&topicAcl="#"
```

This will return an array of Client IDs and signed JSON Web Tokens. Each Client ID has the name of the broker it is associated with prepended to the token to simplify debugging and troubleshooting:

```bash
[
   "01G18XKFVJ53DVBNK3KFPH9CX9": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJicm9rZXIiOiJicm9rZXIubmFtZXNwYWNlIiwiZXhwIjoxNTE2MjQyNjIyLCJpYXQiOjE1MTYyMzkwMjIsImNsaWVudElkIjoiMDFHMThXWEdTRkFOU0VGSEdOQ1E4SFc5QjMiLCJqdGkiOiIwMUcxOFhLRlZKNTNEVkJOSzNLRlBIOUNYOSJ9.qw_GcI5gxvqTabnhYYpvEW_WqSs48IjBSSAp2NAdDkE
   // four other tokens
]
```

## Token claims and metadata

An JSON Web Token (JWT) issued by Pub/Sub will include the following claims.

| Claims <img width=235/>| Details |
|-----------|---------|
| iat       | A Unix timestamp representing the token's creation time. |
| exp       | A Unix timestamp representing the token's expiry time. <br/> Only included when the JWT has an optional expiry timestamp. |
| sub       | The "subject" - the MQTT Client Identifier associated with this token. <br/> This is the source of truth for the Client ID. If a Client ID is provided in the CONNECT packet, it must match this ID. Clients that do not specify a Client ID in the CONNECT packet will see this Client ID as the "Assigned Client Identifier" in the CONNACK packet when connecting.|
| jti	      | JWT ID. An identifier that uniquely identifies this JWT. <br/> Used to distinguish multiple JWTs for the same (broker, clientId) apart, and allows revocation of specific tokens.|
| topicAcl	| Must be `#` (matches all topics). <br/> In the future, ACLs will allow you to express what topics the client can PUBLISH to, SUBSCRIBE to, or both. |

## Revoking Credentials

To revoke a credential, which immediately invalidates it and prevents any clients from connecting with it, issue a POST request to the `/revocations` endpoint of the Pub/Sub API with the `jti` (unique token identifier) as a query parameter.

This will add the token to a revocation list. When using JWTs, you can revoke the JWT based on its unique `jti` claim. To revoke multiple tokens at once, provide a list of token identifiers.

```bash
# POST /accounts/:account_id/brokers/namespaces/:namespace_name/brokers/:broker_name/revocations
curl -X POST https://api.cloudflare.com/client/v4/accounts/<abcdef>/brokers/namespaces/your-namespace/brokers/example-broker/revocations?jti=01G18XX6VC9ZEYZQ7AYD5D5TVP,01G18XXDR6JG9VTB605VQKPQZ2
# Will return a HTTP 200 - OK
```

You can also list all currently revoked tokens by making a GET request to the `/revocations` endpoint, or unrevoke a token by issuing a DELETE request to the `/revocations` endpoint with the `jti` as a query parameter.

## Credential Lifetime and Expiration

By default, per-broker credentials do not expire, in order to simplify credential management.

We strongly recommend setting a per-broker expiration configuration via the **Expiration** field, which will implicitly set an expiration timestamp for all credentials generated for that broker via the `exp` JWT claim. Using short-lived credentials – for example, 7 to 30 days – with an automatic rotation policy can reduce the risk of credential compromise and the need to actively revoke credentials after-the-fact.

You can use Pub/Sub itself to issue fresh credentials to clients using [Cron Triggers](/workers/platform/cron-triggers/) or a separate HTTP endpoint that clients can use to refresh their local token store.

## Authorization and Access Control

{{<Aside type="note">}}

Pub/Sub currently supports `#` (all topics) as an ACL. Finer-grained ACL support is on the roadmap.

{{</Aside>}}

In order to limit what topics a client can PUBLISH or SUBSCRIBE to, you can define an ACL (Access Control List). Topic ACLs are defined in the signed credentials issued to a client and determined when the client connects.
