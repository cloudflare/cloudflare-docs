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

- Embedded certificates
- Self-signed certificates
- Mutual TLS (mTLS) authentication

Applications that use embedded certificates and mTLS authentication do not trust the Cloudflare certificate. For example, the vast majority of mobile applications use embedded certificates. Conversely, Cloudflare does not trust applications that use self-signed certificates instead of certificates signed by a public CA.

If you try to perform TLS decryption, these applications may not load or may return an error. You can resolve the issue by exempting unsupported applications from TLS decryption. To bypass TLS decryption, you must add a [Do Not Inspect](/cloudflare-one/policies/filtering/http-policies/#do-not-inspect) HTTP policy for the application or domain. The HTTP policy builder provides a [list of trusted applications](/cloudflare-one/policies/filtering/initial-setup/http/#bypass-inspection-for-incompatible-applications) that are known to use embedded certificates. When accessing a Do Not Inspect site in the browser, you will see a **Your connection is not private** warning which you can proceed through to connect.

HTTPS traffic from `Do Not Inspect` applications will not be intercepted by Gateway or subject to your HTTP policies. You can, however, still apply [network policies](/cloudflare-one/policies/filtering/network-policies/) to these applications.

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