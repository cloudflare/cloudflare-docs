---
_build:
  publishResources: false
  render: never
  list: never
---

For domains on a [full setup](/dns/zone-setups/full-setup/)[^1], your domain should **automatically** receive its Universal SSL certificate within **15 minutes to 24 hours** of domain activation[^2]. 

This certificate will cover your zone apex (`example.com`) and all first-level subdomains (`subdomain.example.com`), as long as your domain or subdomains have [proxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/) within Cloudflare DNS.

[^1]: The most common Cloudflare setup that involves changing your authoritative nameservers.
[^2]: Provisioning time depends on certain security checks and other requirements mandated by Certificate Authorities (CA).