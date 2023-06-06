---
title: Troubleshooting
pcx_content_type: troubleshooting
weight: 9
meta:
  title: Troubleshooting - Cipher suites — Edge certificates
---

# Cipher suites - Troubleshooting

If you encounter issues with edge certificate cipher suites, refer to the following scenarios.

## Compatibility with Minimum TLS Version

When you adjust the setting used for your domain's [Minimum TLS Version](/ssl/edge-certificates/additional-options/minimum-tls/), your domain only allows HTTPS connections using that TLS protocol version.

This setting can cause issues if you are not supporting TLS 1.2 ciphers on your domain. If you experience issues, review your domain's [Minimum TLS Version](/ssl/edge-certificates/additional-options/minimum-tls/) setting and Cloudflare's [supported ciphers list](/ssl/reference/cipher-suites/supported-cipher-suites/).

## Compatibility with certificate type

If you [upload a custom certificate](/ssl/edge-certificates/custom-certificates/uploading/), make sure the certificate matches your chosen cipher suites.

For example, if you have uploaded an RSA certificate, your cipher suite selection cannot only support ECDSA certificates.

## TLS 1.3 settings

{{<render file="_tls-1.3-cipher-limitations.md">}}
