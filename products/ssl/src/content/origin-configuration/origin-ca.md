---
order: 3
---

# Origin CA

Cloudflare Origin Certificates are free SSL certificates issued by Cloudflare for installation on your origin server to facilitate end-to-end encryption for your visitors using HTTPS. Once deployed, they are [compatible with the Strict SSL mode](/origin-configuration/ssl-modes#strict).

Some origin web servers require upload of the Cloudflare Origin CA root certificate. Click on a link below to download either an RSA and ECC version of the Cloudflare Origin CA root certificate:

- [Cloudflare Origin ECC PEM](../static/origin_ca_ecc_root.pem)
- [Cloudflare Origin RSA PEM](../static/origin_ca_rsa_root.pem)

## Hostname/wildcard coverage
Certificates may be generated with up to 100 individual Subject Alternative Names (SANs). A SAN can take the form of a fully-qualified domain name (`www.example.com`) or a wildcard (`*.example.com`); IP addresses are not permitted as SANs on Cloudflare Origin Certificates.

Wildcards may only cover one level, but can be used multiple times on the same certificate for broader coverage (e.g., `*.example.com` and `*.secure.example.com` may co-exist).

## Expiration
By default, newly generated certificates are valid for 15 years. If you wish to generate shorter-lived certificates (e.g., as short as 7 days), you should use the API.

## Revocation
If you misplace your key material or wish to indicate that a certificate should otherwise no longer be trusted, you can click the “x” icon to the far-right of the Origin Certificate and click “OK”. This process cannot be undone.

## Automated issuance
Our API allows you to [automate the issuance of Origin Certificates](https://api.cloudflare.com/#origin-ca).In the future, an ACME endpoint will be provided.
