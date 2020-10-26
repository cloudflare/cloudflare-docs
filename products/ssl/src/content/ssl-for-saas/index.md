---
order: 8
---

# SSL for SaaS

Cloudflare [SSL for SaaS](https://www.cloudflare.com/saas/) extends the security and performance benefits of Cloudflare’s network to your customers via their own custom or “vanity” domains.  Issuing certificates requires minimal interaction from your customer to add a CNAME from their custom hostname to your domain.
Once the CNAME is added, a single API call to issue a SSL for SaaS certificate initiates domain validation with a Certificate Authority (CA) and issuance of two SSL certificates:

- an SHA-2/ECDSA
- an SHA-2/RSA

Cloudflare manages the entire certificate lifecycle including initial issuance and renewal.  Additionally, SSL for SaaS supports certificates acquired elsewhere.
