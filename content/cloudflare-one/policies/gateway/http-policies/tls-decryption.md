---
pcx_content_type: concept
title: TLS decryption
weight: 6
---

# TLS decryption

Cloudflare Gateway can perform [SSL/TLS decryption](https://www.cloudflare.com/learning/security/what-is-https-inspection/) in order to inspect HTTPS traffic for malware and other security risks. When you enable TLS decryption, Gateway will decrypt all traffic sent over HTTPS, apply your HTTP policies, and then re-encrypt the request with a [user-side certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/).

## Enable TLS decryption

{{<render file="gateway/_enable-tls-decryption.md" productFolder="cloudflare-one">}}

## Inspection limitations

Gateway does not support TLS decryption for applications which use:

- [Certificate pinning](#incompatible-certificates)
- [Self-signed certificates](#incompatible-certificates)
- [Mutual TLS (mTLS) authentication](#incompatible-certificates)
- [ESNI and ECH handshake encryption](#esni-and-ech)
- [Automatic HTTPS upgrades](#google-chrome-automatic-https-upgrades)

### Incompatible certificates

Applications that use certificate pinning and mTLS authentication do not trust the Cloudflare certificate. For example, most mobile applications use {{<glossary-tooltip term_id="certificate pinning" link="/ssl/reference/certificate-pinning/">}}certificate pinning{{</glossary-tooltip>}}. Cloudflare does not trust applications that use self-signed certificates instead of certificates signed by a public CA.

If you try to perform TLS decryption, these applications may not load or may return an error. To resolve this issue, you can:

- Add the [Cloudflare certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/#add-the-certificate-to-applications) to supported applications.
- Create a [Do Not Inspect policy](/cloudflare-one/policies/gateway/http-policies/#do-not-inspect) to exempt applications from TLS decryption. The [Application selector](/cloudflare-one/policies/gateway/http-policies/#application) provides a list of trusted applications that are known to use embedded certificates.
- Configure a [Split Tunnel](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) in Include mode to ensure Gateway will only inspect traffic destined for your IPs or domains. This is useful for organizations that deploy Zero Trust on users' personal devices or otherwise expect personal applications to be used.

Alternatively, to allow HTTP filtering while accessing a site with an insecure certificate, set your [Untrusted certificate action](/cloudflare-one/policies/gateway/http-policies/#untrusted-certificates) to _Pass through_.

### Google Chrome automatic HTTPS upgrades

Google Chrome can automatically upgrade HTTP requests to HTTPS requests, even when you select a link that explicitly declares `http://`. When you use Gateway to proxy and filter your traffic, this upgrade can interrupt the connection between your Zero Trust users and Gateway.

You can turn off automatic HTTPS upgrades via a Gateway pass through policy, a Chrome browser flag, or a Chrome Enterprise policy.

{{<tabs labels="Pass through policy | Chrome browser flag | Chrome Enterprise policy">}}
{{<tab label="pass through policy" no-code="true">}}

To disable automatic HTTPS upgrades for a URL across your Zero Trust organization, create a Gateway pass through policy.

1. Deploy a [custom root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/custom-certificate/).
2. Create an [HTTP policy](/cloudflare-one/policies/gateway/http-policies/) to match the domain of the URL being automatically upgraded. For example:

    | Selector | Operator | Value         | Action |
    | -------- | -------- | ------------- | ------ |
    | URL      | in       | `example.com` | Allow  |

3. In **Untrusted certificate action**, choose _Pass through_.
4. Select **Create policy**.

The pass through policy will bypass insecure connection upgrades for any device connected to your Zero Trust organization. For more information, refer to [Untrusted certificates](/cloudflare-one/policies/gateway/http-policies/#untrusted-certificates).

{{</tab>}}
{{<tab label="chrome browser flag" no-code="true">}}

To disable automatic HTTPS upgrades on a per-browser basis, go to [Chrome flags](chrome://flags/#https-upgrades) and turn off **HTTPS Upgrades**.

{{</tab>}}
{{<tab label="chrome enterprise policy" no-code="true">}}

Chrome Enterprise users can turn off automatic HTTPS upgrades for all URLs with a [`HttpsUpgradesEnabled` management policy](https://chromeenterprise.google/policies/#HttpsUpgradesEnabled).

{{</tab>}}
{{</tabs>}}

### ESNI and ECH

Websites that adhere to [ESNI or ECH standards](https://blog.cloudflare.com/encrypted-client-hello/) encrypt the Server Name Indicator (SNI) during the TLS handshake and are therefore incompatible with HTTP inspection. This is because Gateway relies on the SNI to match an HTTP request to a policy.

You can still apply all [network policy filters](/cloudflare-one/policies/gateway/network-policies/#selectors) except for SNI and SNI Domain. To restrict ESNI and ECH traffic, an option is to filter out all port `80` and `443` traffic that does not include an SNI header.

## FIPS compliance

By default, TLS decryption can use both TLS version 1.2 and 1.3. However, some environments such as FedRAMP may require cipher suites and TLS versions compliant with FIPS 140-2. FIPS compliance currently requires TLS version 1.2.

### Enable FIPS compliance

{{<render file="gateway/_enable-tls-decryption.md" productFolder="cloudflare-one">}}

3. Select **Enable only cipher suites and TLS versions compliant with FIPS 140-2**.

### Limitations

When FIPS compliance is enabled, Gateway will only choose [FIPS-compliant cipher suites](#cipher-suites) when connecting to the origin. If the origin does not support FIPS-compliant ciphers, the request will fail.

FIPS-compliant traffic defaults to HTTP/3. Gateway does not inspect HTTP/3 traffic from most browsers, including Chrome, Firefox, and Safari. To enforce your HTTP policies for this HTTP/3 traffic, you must [disable QUIC](/cloudflare-one/policies/gateway/http-policies/http3/#prevent-inspection-bypass) in your users' browsers.

### Cipher suites

{{<glossary-definition term_id="cipher suite" prepend="A cipher suite is ">}}

The following table lists the default cipher suites Gateway uses for TLS decryption.

| Name (OpenSSL)                | Name (IANA)                             | FIPS-compliant |
| ----------------------------- | --------------------------------------- | -------------- |
| ECDHE-ECDSA-AES128-GCM-SHA256 | TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256 | ✅             |
| ECDHE-ECDSA-AES256-GCM-SHA384 | TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384 | ✅             |
| ECDHE-RSA-AES128-GCM-SHA256   | TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256   | ✅             |
| ECDHE-RSA-AES256-GCM-SHA384   | TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384   | ✅             |
| ECDHE-RSA-AES128-SHA          | TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256   | ❌             |
| ECDHE-RSA-AES256-SHA384       | TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384   | ✅             |
| AES128-GCM-SHA256             | TLS_RSA_WITH_AES_128_GCM_SHA256         | ✅             |
| AES256-GCM-SHA384             | TLS_RSA_WITH_AES_256_GCM_SHA384         | ✅             |
| AES128-SHA                    | TLS_RSA_WITH_AES_128_CBC_SHA            | ❌             |
| AES256-SHA                    | TLS_RSA_WITH_AES_256_CBC_SHA            | ❌             |

For more information on cipher suites, refer to [Cipher suites](/ssl/reference/cipher-suites/).
