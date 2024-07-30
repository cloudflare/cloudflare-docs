---
title: Compliance standards
pcx_content_type: reference
weight: 6
meta:
  title: Cipher suites compliance standards
---

# Compliance standards

Consider the following recommendations on custom [cipher suites](/ssl/edge-certificates/additional-options/cipher-suites/) for when your organization needs to comply with regulatory standards.

Refer to [Customize cipher suites](/ssl/edge-certificates/additional-options/cipher-suites/customize-cipher-suites/) to learn how to specify cipher suites at zone level or per hostname.

Also [enable TLS 1.3](/ssl/edge-certificates/additional-options/tls-13/#enable-tls-13) on your zone and, when opting for [PCI DSS](#pci-dss), make sure to up your [Minimum TLS version](/ssl/edge-certificates/additional-options/minimum-tls/) to `1.2`. Refer to [Cipher suites](/ssl/edge-certificates/additional-options/cipher-suites/) and [TLS protocols](/ssl/reference/protocols/) to learn more.

## PCI DSS

Recommended cipher suites for compliance with the [Payment Card Industry Data Security Standard (PCI DSS)](https://www.pcisecuritystandards.org/standards/pci-dss/). Enhances payment card data security.

* Cipher suites:

`AEAD-AES128-GCM-SHA256`, `AEAD-AES256-GCM-SHA384`, `AEAD-CHACHA20-POLY1305-SHA256`, `ECDHE-ECDSA-AES128-GCM-SHA256`, `ECDHE-RSA-AES128-GCM-SHA256`, `ECDHE-ECDSA-AES256-GCM-SHA384`, `ECDHE-RSA-AES256-GCM-SHA384`, `ECDHE-ECDSA-CHACHA20-POLY1305`, `ECDHE-RSA-CHACHA20-POLY1305`

* Formatted array to copy:

```txt
["AEAD-AES128-GCM-SHA256", "AEAD-AES256-GCM-SHA384", "AEAD-CHACHA20-POLY1305-SHA256", "ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-GCM-SHA384", "ECDHE-ECDSA-CHACHA20-POLY1305", "ECDHE-RSA-CHACHA20-POLY1305"]
```

## FIPS-140-2

Recommended cipher suites for compliance with the [Federal Information Processing Standard (140-2)](https://csrc.nist.gov/pubs/fips/140-2/upd2/final). Used to approve cryptographic modules.

* Cipher suites:

`AES128-GCM-SHA256`, `AES128-SHA`, `AES128-SHA256`, `AES256-SHA`, `AES256-SHA256`, `DES-CBC3-SHA`, `ECDHE-ECDSA-AES128-GCM-SHA256`, `ECDHE-ECDSA-AES128-SHA`, `ECDHE-ECDSA-AES128-SHA256`, `ECDHE-ECDSA-AES256-GCM-SHA384`, `ECDHE-ECDSA-AES256-SHA384`, `ECDHE-RSA-AES128-GCM-SHA256`, `ECDHE-RSA-AES128-SHA`, `ECDHE-RSA-AES128-SHA256`, `ECDHE-RSA-AES256-GCM-SHA384`, `ECDHE-RSA-AES256-SHA`, `ECDHE-RSA-AES256-SHA384`

* Formatted array to copy:

```txt
["AES128-GCM-SHA256", "AES128-SHA", "AES128-SHA256", "AES256-SHA", "AES256-SHA256", "DES-CBC3-SHA", "ECDHE-ECDSA-AES128-GCM-SHA256", "ECDHE-ECDSA-AES128-SHA", "ECDHE-ECDSA-AES128-SHA256", "ECDHE-ECDSA-AES256-GCM-SHA384", "ECDHE-ECDSA-AES256-SHA384", "ECDHE-RSA-AES128-GCM-SHA256", "ECDHE-RSA-AES128-SHA", "ECDHE-RSA-AES128-SHA256", "ECDHE-RSA-AES256-GCM-SHA384", "ECDHE-RSA-AES256-SHA", "ECDHE-RSA-AES256-SHA384"]
```