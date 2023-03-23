---
_build:
  publishResources: false
  render: never
  list: never
---

For wildcard hostname certificates, certificate issuance and renewal varies based on the type of certificate you are using:

- **Universal**: Perform DCV using one of the available [methods](/ssl/edge-certificates/changing-dcv-method/methods/).
- **Advanced**: In most cases, you can opt for [Delegated DCV](/ssl/edge-certificates/changing-dcv-method/methods/delegated-dcv/), which greatly simplifies certificate management.

If you cannot use Delegated DCV, you need to use [TXT based DCV](/ssl/edge-certificates/changing-dcv-method/methods/txt/) for certificate issuance and renewal. This means you will need to place one TXT DCV token for every hostname on the certificate. If one or more of the hostnames on the certificate fails to validate, the certificate will not be issued or renewed.

This means that a wildcard certificate covering `example.com` and `*.example.com` will require two DCV tokens to be placed at the authoritative DNS provider. Similarly, a certificate with five hostnames in the SAN (including a wildcard) will require five DCV tokens to be placed at the authoritative DNS provider.