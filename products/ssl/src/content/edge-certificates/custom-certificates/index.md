---
order: 4
pcx-content-type: concept
---

# Custom certificates

Customers wishing to utilize their own SSL certificates may upload the certificate to Cloudflare for use terminating SSL/TLS at the edge. Because these certificates are not managed by Cloudflare, they must be manually renewed and uploaded in advance of expiration otherwise your visitors will be unable to browse your site.

Currently the Business and Enterprise plan each include one Custom Certificate, and Enterprise customers may purchase additional slots as needed by speaking with their Customer Success Manager.

## Keyless SSL

Typically, customers will upload both the SSL certificate and the private key. Those that wish to [retain their private keys on their own infrastructure may wish to use Keyless SSL](/keyless-ssl).

## Geo Key Manager (private key restriction)

By default, private keys will be encrypted and securely distributed to each data center, where they can be utilized for local SSL/TLS termination. Customers that wish to restrict where these keys may be used can elect to specify a ‘Private Key Restriction’ during upload.

## Certificate packs

Certificates uploaded to Cloudflare will be automatically grouped together into a Certificate Pack before being deployed to the global edge. 

A Certificate Pack is a group of certificates that share the same set of hostnames — for example, `example.com` and `*.example.com` — but use different signature algorithms. Each pack can include up to three certificates, with one from each of the following signature algorithms: `SHA-2/RSA`, `SHA-2/ECDSA`, and `SHA-1/RSA`. Each pack only counts as one SSL certificate against your custom certificate quota.

<Aside type="note">

You cannot delete the primary certificate if secondary certificates are present in the pack.

</Aside>

--------
