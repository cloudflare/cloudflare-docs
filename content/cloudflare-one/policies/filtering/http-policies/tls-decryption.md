---
pcx_content_type: concept
title: TLS decryption
weight: 6
---

# TLS decryption

Cloudflare Gateway can perform [SSL/TLS decryption](https://www.cloudflare.com/learning/security/what-is-https-inspection/) in order to inspect HTTPS traffic for malware and other security risks. When you enable TLS decryption, Gateway will decrypt all traffic sent over HTTPS, apply your HTTP policies, and then re-encrypt the request with the Cloudflare certificate.

## Enable TLS decryption

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com/), go to **Settings** > **Network**.
2. Scroll down to **Firewall**.
3. Turn on **TLS decryption**.
4. (Optional) Select [**Enable only cipher suites and TLS versions compliant with FIPS 140-2**](#fips-compliance).

## Limitations

Gateway does not support TLS decryption for applications which use:

- [Embedded certificates](#incompatible-certificates)
- [Self-signed certificates](#incompatible-certificates)
- [Mutual TLS (mTLS) authentication](#incompatible-certificates)
- [ESNI and ECH handshake encryption](#esni-and-ech)

### Incompatible certificates

Applications that use embedded certificates and mTLS authentication do not trust the Cloudflare certificate. For example, the vast majority of mobile applications use embedded certificates. Conversely, Cloudflare does not trust applications that use self-signed certificates instead of certificates signed by a public CA.

If you try to perform TLS decryption, these applications may not load or may return an error. You can resolve the issue by [adding the Cloudflare certificate to the application](/cloudflare-one/connections/connect-devices/warp/install-cloudflare-cert/#add-the-certificate-to-applications)(if supported by the application) or by [exempting] the application from TLS decryption.

To bypass TLS decryption, add a [Do Not Inspect](/cloudflare-one/policies/filtering/http-policies/#do-not-inspect) HTTP policy for the application or domain. The HTTP policy builder provides a [list of trusted applications](/cloudflare-one/policies/filtering/initial-setup/http/#bypass-inspection-for-incompatible-applications) that are known to use embedded certificates. When accessing a Do Not Inspect site in the browser, you will see a **Your connection is not private** warning which you can proceed through to connect.

HTTPS traffic from `Do Not Inspect` applications will not be intercepted by Gateway or subject to your HTTP policies. You can, however, still apply [network policies](/cloudflare-one/policies/filtering/network-policies/) to these applications.

### ESNI and ECH

Websites that adhere to [ESNI or ECH standards](https://blog.cloudflare.com/encrypted-client-hello/) encrypt the Server Name Indicator (SNI) during the TLS handshake. Since Gateway relies on the SNI to match an HTTP request to a policy, ESNI and ECH traffic is incompatible with HTTP inspection.

You can still apply all [network policy filters](/cloudflare-one/policies/filtering/network-policies/#selectors) expect for SNI and SNI Domain. To restrict ENSI and ECH traffic, an option is to filter out all port `80` and `443` traffic that does not include an SNI header.

## FIPS compliance

By default, TLS decryption can use both TLS version 1.2 and 1.3. However, some environments such as FedRAMP may require cipher suites and TLS versions compliant with FIPS 140-2. FIPS compliance currently requires TLS version 1.2.

When [FIPS compliance is enabled](#enable-tls-decryption), Gateway will only choose [FIPS-compliant cipher suites](#cipher-suites) when connecting to the origin. If the origin does not support FIPS-compliant ciphers, the request will fail.

### Cipher suites

The following table lists the cipher suites Gateway uses for TLS decryption.

| Cipher suite                | Default | FIPS-compliant |
| ----------------------------|-------- | -------------- |
|CHACHA20-POLY1305-SHA256     | ✅      | ✅      |
|ECDHE-ECDSA-AES128-GCM-SHA256| ✅      | ✅      |
|ECDHE-ECDSA-AES256-GCM-SHA384| ✅      | ✅      |
|ECDHE-RSA-AES128-GCM-SHA256  | ✅      | ✅      |
|ECDHE-RSA-AES256-GCM-SHA384  | ✅      | ✅      |
|ECDHE-RSA-AES128-SHA         | ✅      | ❌      |
|ECDHE-RSA-AES256-SHA384      | ✅      | ✅      |
|AES128-GCM-SHA256            | ✅      | ✅      |
|AES256-GCM-SHA384            | ✅      | ✅      |
|AES128-SHA                   | ✅      | ❌      |
|AES256-SHA                   | ✅      | ❌      |