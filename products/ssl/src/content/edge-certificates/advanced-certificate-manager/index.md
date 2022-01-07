---
order: 1
pcx-content-type: concept
---

import ACMDefinition from "../../_partials/_acm-definition.md"

# Advanced certificates

Advanced certificates offers a flexible and customizable way to issue and manage certificates.

<ACMDefinition/>

<Aside type="note" header="Note">

Advanced certificates supersede legacy [Dedicated SSL certificates](https://support.cloudflare.com/hc/articles/228009108).

</Aside>

## Features

Advanced certificates allow you multiple customization options:

- Include the zone apex and less than 50 hosts as covered hostnames.
- Cover more than one level of subdomain.
- Select the preferred validation method (HTTP, TXT, or Email).
- Choose the certificate validity period (14, 30, 90, or 365 days).
- Choose the Certificate Authority to issue the certificate (Let’s Encrypt or Digicert).
- Remove Cloudflare branding that are normally present on Universal certificates.
- Select a custom trust store for origin authentication.
- Control [cipher suites used for TLS](/ssl-tls/cipher-suites#disable-cipher-suites).

<Aside type="note">

Enterprise customers can also purchase a subscription for Advanced Certificate Manager, which allows them to add up to 100 edge certificates per zone.

</Aside>

## Related resources

- [Manage certificates](manage-certificates)
- [Common API commands](api-commands)