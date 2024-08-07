---
_build:
  publishResources: false
  render: never
  list: never
---

- The CA certificate can be from a publicly trusted CA or self-signed.
- In the certificate `Basic Constraints`, the attribute `CA` must be set to `TRUE`.
- The certificate must use one of the signature algorithms listed below:

{{<details header="Allowed signature algorithms">}}

`x509.SHA1WithRSA`

`x509.SHA256WithRSA`

`x509.SHA384WithRSA`

`x509.SHA512WithRSA`

`x509.ECDSAWithSHA1`

`x509.ECDSAWithSHA256`

`x509.ECDSAWithSHA384`

`x509.ECDSAWithSHA512`

{{</details>}}