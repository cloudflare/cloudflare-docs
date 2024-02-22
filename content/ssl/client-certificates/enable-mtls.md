---
pcx_content_type: how-to
title: Enable mTLS
weight: 5
---

# Enable mTLS

You can enable mutual Transport Layer Security (mTLS) for any hostname.

## Enable mTLS

To enable mutual Transport Layer Security (mTLS) for a host from the Cloudflare dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and application.
2.  Go to **SSL** > **Client Certificates**.
3.  To enable mTLS for a host, select **Edit** in the **Hosts** section of the **Client Certificates** card.
4.  Enter the name of a host in your current application and press `Enter`.
5.  Select **Save**.

Now that you have enabled mTLS for your host, you can enforce mTLS with [API Shield™](/api-shield/security/mtls/configure/).

{{<Aside type="note">}}
API Shield is not required to configure mTLS.
{{</Aside>}}

{{<render file="_cloudflare-managed-client-cert.md">}}

## Create an mTLS rule

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Go to **SSL/TLS** > **Client Certificates**.
3. Select **Create a mTLS rule**.
4. In **Custom rules**, several rule parameters have already been filled in. Enter the URI path you want to protect in **Value**.
5. (Optional) Add a `Hostname` field and enter the mTLS-enabled hostnames you wish to protect in **Value**.
6. In **Choose action**, select `Block`.
7. Select **Deploy** to make the rule active.

Once you have deployed your mTLS rule, any requests without a [valid client certificate](/ssl/client-certificates/) will be blocked.

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
This check only applies to client certificates issued by the Cloudflare managed CA. Cloudflare currently does not check certificate revocation lists (CRL) for [CAs that have been uploaded](/ssl/client-certificates/byo-ca-api-shield/).
{{</Aside>}}

{{<render file="_forward-client-certificate.md">}}