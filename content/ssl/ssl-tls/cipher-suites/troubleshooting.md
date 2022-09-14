---
title: Troubleshooting
pcx_content_type: troubleshooting
weight: 9
meta:
  title: Troubleshooting - Cipher suites — Edge certificates
---

# Cipher suites - Troubleshooting

If you encounter issues with edge certificate cipher suites, refer to the following scenarios.

## Compatability with Minimum TLS Version

When you adjust the setting used for your domain's [Minimum TLS Version](/ssl/edge-certificates/additional-options/minimum-tls/), your domain only allows HTTPS connections using that TLS protocol version.

This setting can cause issues if you are not supporting TLS 1.2 ciphers on your domain. If you experience issues, review your domain's [Minimum TLS Version](/ssl/edge-certificates/additional-options/minimum-tls/) setting and Cloudflare's [supported cipher list](/ssl/ssl-tls/cipher-suites/supported-cipher-suites/).

## Compatability with certificate type

If you [upload a custom certificate](/ssl/edge-certificates/custom-certificates/uploading/), make sure the certificate matches your chosen cipher suites.

For example, if you have upload an RSA certificate, your cipher suite selection cannot only support ECDSA certificates.

## TLS 1.3 settings

Based on current Cloudflare functionality, you cannot [set](/ssl/ssl-tls/cipher-suites/disable-cipher-suites/) specific 1.3 ciphers through the API.

Instead, you will need to enable [TLS 1.3](/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13) for your entire domain and Cloudflare will use [all applicable TLS 1.3 cipher suites](/ssl/ssl-tls/cipher-suites/supported-cipher-suites/).
