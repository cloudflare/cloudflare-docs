---
title: Configure
pcx-content-type: how-to
meta:
  title: Configure mTLS
---

# Configure mTLS

When you specify API hosts in [mTLS authentication](/api-shield/products/mtls/), Cloudflare will block all requests that do not have a certificate for mTLS authentication.

## Prerequisites

Before you can protect your your API or web application with mTLS rules, you need to:

*   [Create a client certificate](/ssl/client-certificates/create-a-client-certificate).
*   [Configure your mobile app or IoT device](/ssl/client-certificates/configure-your-mobile-app-or-iot-device) to use your Cloudflare-issued client certificate.
*   [Enable mutual Transport Layer Security (mTLS) for a host](/ssl/client-certificates/enable-mtls) in your zone.

<Aside type='warning' header='Important'>

You can only use mTLS with a certificate authority (CA) that is fully managed by Cloudflare. Cloudflare generates a unique CA for each zone.

If you need to use certificates issued by another CA, use [Cloudflare Access](/cloudflare-one/identity/devices/mutual-tls-authentication) to upload your own CA.

</Aside>

## Create an mTLS rule

To create an mTLS rule in the Cloudflare dashboard, follow these steps:

1.  Log into your [Cloudflare account](https://dash.cloudflare.com) and select your application.

2.  Go to **Firewall** > **Firewall Rules**.

3.  Click **Create a mTLS rule**.

4.  Enter the following information:

    *   **Rule name**: A descriptive identifier for your mTLS rule.
    *   **Hostname**: The mTLS-enabled hostnames to protect, only showing hosts in your application with [mTLS enabled](/ssl/client-certificates/enable-mtls).

5.  By default, your rule will have a [configuration](#expression-builder) similar to the following:

    | **Expression** | **Action** |
    | --- | ------ |
    | `(http.host in {"api.example.com"} and not cf.tls_client_auth.cert_verified)` | *Block* |

    To make this rule active, click **Deploy**. To add additional firewall logic — such as checking for [revoked certificates](#check-for-revoked-certificates) — click **Use firewall rule builder**.

6.  Once you have deployed your mTLS rule, any requests without a [Cloudflare-issued client certificate](/ssl/client-certificates/configure-your-mobile-app-or-iot-device) will be blocked.

### Expression Builder

To review your mTLS rule in the Firewall Rules Expression Builder, click the **wrench icon** associated with your rule.

In the **Expression Preview**, your mTLS rule includes a [compound expression](/ruleset-engine/rules-language/expressions/#compound-expressions) formed from two [simple expressions](/ruleset-engine/rules-language/expressions/#simple-expressions) joined by the `and` operator.

The first expression uses the `http.host` field, combined with the `in` operator, to capture the hosts your mTLS rule applies to.

The second expression — `not cf.tls_client_auth.cert_verified` — returns `true` when a request to access your API or web application does not present a valid client certificate.

Because the [action](/firewall/cf-firewall-rules/actions) for your rule is *Block*, only requests that present a valid client certificate can access the specified hosts.

### Check for revoked certificates

To check for [revoked client certificates](/ssl/client-certificates/revoke-client-certificate), you can either add a new mTLS rule or add a new expression to the [default rule](#expression-builder).

When a request includes a revoked certificate, the `cf.tls_client_auth.cert_revoked` field is set to `true`. If you combined this with the [default mTLS rule](#expression-builder), it would look similar to the following:

```sql
(http.host in {"api.theburritobot.com"}) and (not cf.tls_client_auth.cert_verified or cf.tls_client_auth.cert_revoked)
```

<Aside type="note">

To check for revoked certificates, you must use the [**Expression Builder**](#expression-builder).

</Aside>
