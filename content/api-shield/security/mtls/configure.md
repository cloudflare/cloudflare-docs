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

{{<render file="_cloudflare-managed-client-cert.md" productFolder="ssl" >}}

## Create an mTLS rule

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.

2. Go to **SSL/TLS** > **Client Certificates**.

3. Select **Create a mTLS rule**.

With the [migration of Firewall Rules to WAF Custom Rules](/waf/reference/migration-guides/firewall-rules-to-custom-rules/), the following steps vary depending on your zone status in the migration.

{{<tabs labels="Custom Rules | Firewall Rules">}}
{{<tab label="custom rules" no-code="true">}}
 
4. In **Custom rules**, select **Create rule**

5. Enter the following information:

    - **Rule name**: A descriptive identifier for your mTLS rule.
    - **Field**: `Hostname`
    - **Operator**: `is in`
    - **Value**: The mTLS-enabled hostnames to protect.

6. Select **And** and enter the following:

    - **Field**: `Client Certificate Verified`

7. Make sure the second expression **Value** is negative, resulting in an **Expression Preview** as the following.

    ```sql
    (http.host in {"api.example.com"} and not cf.tls_client_auth.cert_verified)
    ```

8. In **Choose action**, select `Block`.

9. Select **Deploy** to make the rule active.

{{</tab>}}
{{<tab label="firewall rules" no-code="true">}}
 
4. Enter the following information:

    - **Rule name**: A descriptive identifier for your mTLS rule.
    - **Hostname**: The mTLS-enabled hostnames to protect, only showing hosts in your application with [mTLS enabled](/ssl/client-certificates/enable-mtls/).

5. By default, your rule will have a [configuration](#expression-builder) similar to the following:

    | **Expression**                                                                | **Action** |
    | ----------------------------------------------------------------------------- | ---------- |
    | `(http.host in {"api.example.com"} and not cf.tls_client_auth.cert_verified)` | _Block_    |

6. To make this rule active, select **Deploy**. To add additional firewall logic — such as checking for [revoked certificates](#check-for-revoked-certificates) — select **Use firewall rule builder**.

{{</tab>}}
{{</tabs>}}

Once you have deployed your mTLS rule, any requests without a [valid client certificate](/ssl/client-certificates/) will be blocked.

### Expression Builder

To review your mTLS rule in the firewall rules Expression Builder, click the **wrench icon** associated with your rule.

In the **Expression Preview**, your mTLS rule includes a [compound expression](/ruleset-engine/rules-language/expressions/#compound-expressions) formed from two [simple expressions](/ruleset-engine/rules-language/expressions/#simple-expressions) joined by the `and` operator.

The first expression uses the `http.host` field, combined with the `is in` operator, to capture the hosts your mTLS rule applies to.

The second expression — `not cf.tls_client_auth.cert_verified` — returns `true` when a request to access your API or web application does not present a valid client certificate.

Because the [action](/firewall/cf-firewall-rules/actions/) for your rule is _Block_, only requests that present a valid client certificate can access the specified hosts.

### Check for revoked certificates

To check for [revoked client certificates](/ssl/client-certificates/revoke-client-certificate/), you can either add a new mTLS rule or add a new expression to the [default rule](#expression-builder).

When a request includes a revoked certificate, the `cf.tls_client_auth.cert_revoked` field is set to `true`. If you combined this with the [default mTLS rule](#expression-builder), it would look similar to the following:

```sql
(http.host in {"api.theburritobot.com"}) and (not cf.tls_client_auth.cert_verified or cf.tls_client_auth.cert_revoked)
```

{{<Aside type="note">}}
To check for revoked certificates, you must use the [Expression Builder](#expression-builder).
{{</Aside>}}
