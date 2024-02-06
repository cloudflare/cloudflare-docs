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

## Compatibility with certificate encryption

If you [upload a custom certificate](/ssl/edge-certificates/custom-certificates/uploading/), make sure the certificate is compatible with the chosen cipher suites for your zone or hostname.

For example, if you upload an RSA certificate, your cipher suite selection cannot only support ECDSA certificates.

## API requirements for custom hostname certificate

{{<render file="_edit-custom-hostname-api.md" productFolder="cloudflare-for-platforms" withParameters="When using the [Edit Custom Hostname endpoint](/api/operations/custom-hostname-for-a-zone-edit-custom-hostname)," >}} <br />

Including the `settings` only will result in the error message `The SSL attribute is invalid. Please refer to the API documentation, check your input and try again`.

## TLS 1.3 settings

{{<render file="_tls-1.3-cipher-limitations.md">}}

## SSL Labs weak ciphers report

If you try to [disable](/ssl/reference/cipher-suites/customize-cipher-suites/) all of the `WEAK` cipher suites according to what is listed on a [Qualys SSL Labs](https://www.ssllabs.com/ssltest/) report, you might notice that the naming conventions are not the same.

This is because SSL Labs follows RFC cipher naming convention while Cloudflare follows OpenSSL cipher naming convention. The cipher suite names list in the [OpenSSL documentation](https://www.openssl.org/docs/man1.0.2/man1/ciphers.html) may help you map the names.

## Warnings related to CVE-2019-1559

Even though applications on Cloudflare are not vulnerable to [CVE-2019-1559](/ssl/reference/cloudflare-and-cve-2019-1559/), some security scanners may flag your application erroneously.

To remove these warnings, refer to [Customize cipher suites](/ssl/reference/cipher-suites/customize-cipher-suites/) and exclude the following ciphers:

- `ECDHE-ECDSA-AES256-SHA384`
- `ECDHE-ECDSA-AES128-SHA256`
- `ECDHE-RSA-AES256-SHA384`