---
order: 1
pcx-content-type: how-to
---

# Enable Universal SSL

## Authoritative (Full) domains

For an authoritative or full domain — domains that changed their [domain nameservers](https://support.cloudflare.com/hc/articles/205195708) – Universal SSL requires two steps:
1. Once you change your domain nameservers, your domain should receive its Universal SSL certificate within **24 hours**. For more technical details, see [Validating](../validating).
1. Your SSL/TLS mode defaults to [Flexible](/origin-configuration/ssl-modes#flexible), which encrypts traffic between a site visitor and Cloudflare (but not Cloudflare and your origin server). To encrypt traffic between Cloudflare and your origin server, see [SSL modes](/origin-configuration/ssl-modes) and [Origin CA certificates](/origin-configuration/origin-ca).

## Non-authoritative (Partial) domains

For non-authoritative or partial domains (domains on a CNAME setup), see our [support article](https://support.cloudflare.com/hc/articles/360020348832#h_989980109291544055191509).

For additional info about changing your Domain Control Validation method, see [Change DCV method](../changing-dcv-method).