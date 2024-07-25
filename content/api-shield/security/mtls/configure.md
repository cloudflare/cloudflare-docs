---
title: Configure
pcx_content_type: how-to
weight: 2
meta:
  title: Configure mTLS
---

# Configure mTLS

When you specify API hosts in [mTLS authentication](/api-shield/security/mtls/), Cloudflare will block all requests that do not have a [client certificate](/ssl/client-certificates/) for mTLS authentication.

## Prerequisites

Before you can protect your API or web application with mTLS rules, you need to:

- Check that the certificate installed on your origin server matches the hostname of the client certificate, for example `api.example.com`. Origin server wildcard certificates such as `*.example.com` are not supported.
- [Create a client certificate](/ssl/client-certificates/create-a-client-certificate/).
- [Configure your mobile app or IoT device](/ssl/client-certificates/configure-your-mobile-app-or-iot-device/) to use your Cloudflare-issued client certificate.
- [Enable mutual Transport Layer Security (mTLS) for a host](/ssl/client-certificates/enable-mtls/) in your zone.

{{<render file="_mtls-api-shield-support.md">}}

{{<render file="_cloudflare-managed-client-cert.md" productFolder="ssl" >}}

## Create an mTLS rule

{{<render file="_mtls-create-rule.md" productFolder="api-shield" >}}

### Expression Builder

To review your mTLS rule in the Expression Builder, select the **wrench icon** associated with your rule.

In the **Expression Preview**, your mTLS rule includes a [compound expression](/ruleset-engine/rules-language/expressions/#compound-expressions) formed from two [simple expressions](/ruleset-engine/rules-language/expressions/#simple-expressions) joined by the `and` operator.

The first expression — `not cf.tls_client_auth.cert_verified` — returns `true` when a request to access your API or web application does not present a valid client certificate.

The second expression uses the `http.request.uri.path` field, combined with the `in` operator, to capture the URI paths your mTLS rule applies to.

Because the [action](/ruleset-engine/rules-language/actions/) for your rule is _Block_, only requests that present a valid client certificate can access the specified hosts.

### Check for revoked certificates

To check for [revoked client certificates](/ssl/client-certificates/revoke-client-certificate/), you can either add a new mTLS rule or add a new expression to the [default rule](#expression-builder). To check for revoked certificates, you must use the Expression Builder.

When a request includes a revoked certificate, the `cf.tls_client_auth.cert_revoked` field is set to `true`. If you combined this with the [default mTLS rule](#expression-builder), it would look similar to the following:

```sql
((not cf.tls_client_auth.cert_verified or cf.tls_client_auth.cert_revoked) and http.request.uri.path in {"/admin"})
```

{{<Aside type="warning">}}
This check only applies to client certificates issued by the Cloudflare managed CA. Cloudflare currently does not check certificate revocation lists (CRL) for [CAs that have been uploaded](/ssl/client-certificates/byo-ca/).
{{</Aside>}}