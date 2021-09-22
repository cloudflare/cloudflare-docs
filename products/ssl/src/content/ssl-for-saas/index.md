---
order: 8
pcx-content-type: landing-page
---

import SSLforSaaSDefinition from "../_partials/_ssl-for-saas-definition.md"

# SSL for SaaS

<SSLforSaaSDefinition/>

For example, a customer may want to use their vanity domain `app.customer.com` to point to an application hosted on your Cloudflare zone `service.saas.com`. Issuing certificates requires minimal interaction from your customer to add a CNAME from their custom hostname to your domain.
Once the CNAME is added, a single API call to issue an SSL for SaaS certificate initiates domain validation with a Certificate Authority (CA) and issuance of two SSL certificates:

- an SHA-2/ECDSA
- an SHA-2/RSA

Cloudflare manages the entire certificate lifecycle including initial issuance and renewal.  Additionally, SSL for SaaS supports certificates acquired elsewhere.
