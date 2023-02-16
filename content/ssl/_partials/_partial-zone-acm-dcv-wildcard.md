---
_build:
  publishResources: false
  render: never
  list: never
---

Wildcard hostname certificates will be required to use [TXT based DCV](/ssl/edge-certificates/changing-dcv-method/methods/txt/) for certificate issuance and renewal. You will need to place one TXT DCV token for every hostname on the certificate. If one or more of the hostnames on the certificate fail to validate, the certificate will not be issued or renewed.

This means that a wildcard certificate covering `example.com` and `*.example.com` will require two DCV tokens to be placed at the authoritative DNS provider. Similarly, a certificate with five hostnames in the SAN (including a wildcard) will require five DCV tokens to be placed at the authoritative DNS provider. 