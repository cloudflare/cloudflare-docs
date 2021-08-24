---
order: 1
pcx-content-type: how-to
---

# Enable Universal SSL

## Authoritative (Full) domains

For an authoritative or full domain — domains that changed their [domain nameservers](https://support.cloudflare.com/hc/articles/205195708) – Universal SSL requires two steps:
1. Once you change your domain nameservers, your domain should receive its Universal SSL certificate within **24 hours**.
1. Your SSL/TLS mode defaults to [Flexible](/origin-configuration/ssl-modes#flexible), which encrypts traffic between a site visitor and Cloudflare (but not Cloudflare and your origin server). To encrypt traffic between Cloudflare and your origin server, see [SSL modes](/origin-configuration/ssl-modes) and [Origin CA certificates](/origin-configuration/origin-ca).

## Non-authoritative (Partial) domains

For non-authoritative or partial domains (domains on a CNAME setup), Universal SSL will be:
- Provisioned once the DNS record is [proxied through Cloudflare](https://support.cloudflare.com/hc/articles/360020348832#h_836723523521544131668686) (orange-clouded).
- Validated:
    - Immediately if you add [Domain Control Validation (DCV)](../changing-dcv-method) records to your authoritative DNS.
    - After a brief period of downtime if you **do not** add DCV records (once your traffic is proxied).