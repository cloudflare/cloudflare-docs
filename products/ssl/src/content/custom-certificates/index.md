---
order: 4
---

# Custom certificates

Customers wishing to utilize their own SSL certificates may upload the certificate to Cloudflare for use terminating SSL/TLS at the edge. Because these certificates are not managed by Cloudflare, they must be manually renewed and uploaded in advance of expiration otherwise your visitors will be unable to browse your site.

Currently the Business and Enterprise plan each include one Custom Certificate, and Enterprise customers may purchase additional slots as needed by speaking with their Customer Success Manager.

## Keyless SSL

Typically, customers will upload both the SSL certificate and the private key. Those that wish to [retain their private keys on their own infrastructure may wish to use Keyless SSL](/keyless-ssl).

## Geo Key Manager (private key restriction)

By default, private keys will be encrypted and securely distributed to each data center, where they can be utilized for local SSL/TLS termination. Customers that wish to restrict where these keys may be used can elect to specify a ‘Private Key Restriction’ during upload.
