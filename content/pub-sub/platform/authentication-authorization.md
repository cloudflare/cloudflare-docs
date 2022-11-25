---
title: Authentication and authorization
pcx_content_type: concept
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

```sh
$ wrangler pubsub broker issue example-broker --number=5 --expiration=48h
```

You should receive a scucess response that resembles the example below, which is a map of Client IDs and their associated tokens.

```json
{
  "01G3A5GBJE5P3GPXJZ72X4X8SA": "eyJhbGciOiJFZERTQSIsImtpZCI6IkpEUHVZSnFIT3Zxemxha2tORlE5a2ZON1dzWXM1dUhuZHBfemlSZG1PQ1UifQ.
  not-a-real-token.ZZL7PNittVwJOeMpFMn2CnVTgIz4AcaWXP9NqMQK0D_iavcRv_p2DVshg6FPe5xCdlhIzbatT6gMyjMrOA2wBg",
  "01G3A5GBJECX5DX47P9RV1C5TV": "eyJhbGciOiJFZERTQSIsImtpZCI6IkpEUHVZSnFIT3Zxemxha2tORlE5a2ZON1dzWXM1dUhuZHBfemlSZG1PQ1UifQ.also-not-a-real-token.WrhK-VTs_IzOEALB-T958OojHK5AjYBC5ZT9xiI_6ekdQrKz2kSPGnvZdUXUsTVFDf9Kce1Smh-mw1sF2rSQAQ",
}
```

## Configuring Clients

To configure an MQTT client to connect to Pub/Sub, you need:

* Your Broker hostname - e.g. `your-broker.your-namespace.cloudflarepubsub.com` and port (`8883` for MQTT)
* A Client ID - this must be either the Client ID associated with your token, or left empty. Some clients require a Client ID, and others generate a random Client ID. **You will not be able to connect if the Client ID is mismatched**.
* A username - Pub/Sub does not require you to specify a username. You can leave this empty, or for clients that require one to be set, the text `PubSub` is typically sufficient.
* A "password" - this is a valid JSON Web Token (JWT) received from the API, _specific to the Broker you are trying to connect to_.

The most common failure case is supplying a Client ID that does not match your token. Ensure you are setting this correctly in your client, or (recommended) leaving it empty if your client supports auto-assigning the Client ID when it connects to Pub/Sub. 

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

To revoke a credential, which immediately invalidates it and prevents any clients from connecting with it, you can use `wrangler pubsub broker revoke [...]` or issue a POST request to the `/revocations` endpoint of the Pub/Sub API with the `jti` (unique token identifier).

This will add the token to a revocation list. When using JWTs, you can revoke the JWT based on its unique `jti` claim. To revoke multiple tokens at once, provide a list of token identifiers.

```sh
$ wrangler pubsub broker revoke example-broker --namespace=NAMESPACE_NAME --jti=JTI_ONE --jti=JTI_TWO
```

You can also list all currently revoked tokens by using `wrangler pubsub broker show-revocations [...]` or by making a GET request to the `/revocations` endpoint.

You can _unrevoke_ a token by using `wrangler pubsub broker unrevoke [...]` or by issuing a DELETE request to the `/revocations` endpoint with the `jti` as a query parameter.

## Credential Lifetime and Expiration

Credentials can be set to expire at a Broker-level that applies to all credentials, and/or at a per-credential level.

* By default, credentials do not expire, in order to simplify credential management.
* Credentials will inherit the shortest of the expirations set, if both the Broker and the issued credential have an expiration set.

To set an expiry for each set of credentials issued by setting the `expiration` value when requesting credentials: in this case, we specify 1 day (`1d`):

```sh
$ wrangler pubsub broker issue example-broker --namespace=NAMESPACE_NAME --expiration=1d
```

This will return a token that expires 1 day (24 hours) from issuance:

```json
{
  "01G3A5GBJE5P3GPXJZ72X4X8SA": "eyJhbGciOiJFZERTQSIsImtpZCI6IkpEUHVZSnFIT3Zxemxha2tORlE5a2ZON1dzWXM1dUhuZHBfemlSZG1PQ1UifQ.
  not-a-real-token.ZZL7PNittVwJOeMpFMn2CnVTgIz4AcaWXP9NqMQK0D_iavcRv_p2DVshg6FPe5xCdlhIzbatT6gMyjMrOA2wBg"
}
```

To set a Broker-level global expiration on an existing Pub/Sub Broker, set the `expiration` field on the Broker to the seconds any credentials issued should inherit:

```sh
$ wrangler pubsub broker update YOUR_BROKER --namespace=NAMESPACE_NAME --expiration=7d
```

This will cause any token issued by the Broker to have a default expiration of 7 days. You can make this _shorter_ by passing the `--expiration` flag to `wrangler pubsub broker issue [...]`. For example:
* If you set a longer `--expiration` than the Broker itself has, the Broker's expiration will be used instead (shortest wins).
* Using `wrangler pubsub broker issue [...] --expiration -1` will remove the `exp` claim from the token - essentially returning a non-expiring token - even if a Broker-level expiration has been set.

### Best Practices

* We strongly recommend setting a per-broker expiration configuration via the **expiration** (integer seconds) field, which will implicitly set an expiration timestamp for all credentials generated for that broker via the `exp` JWT claim.
* Using short-lived credentials – for example, 7 to 30 days – with an automatic rotation policy can reduce the risk of credential compromise and the need to actively revoke credentials after-the-fact.
* You can use Pub/Sub itself to issue fresh credentials to clients using [Cron Triggers](/workers/platform/triggers/cron-triggers/) or a separate HTTP endpoint that clients can use to refresh their local token store.

## Authorization and Access Control

{{<Aside type="note">}}

Pub/Sub currently supports `#` (all topics) as an ACL. Finer-grained ACL support is on the roadmap.

{{</Aside>}}

In order to limit what topics a client can PUBLISH or SUBSCRIBE to, you can define an ACL (Access Control List). Topic ACLs are defined in the signed credentials issued to a client and determined when the client connects.
