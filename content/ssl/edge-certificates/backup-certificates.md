---
pcx_content_type: concept
title: Backup certificates
weight: 8
---

# Backup certificates

If Cloudflare is providing [authoritative DNS](/dns/zone-setups/full-setup/) for your domain, Cloudflare will issue a backup [Universal SSL certificate](/ssl/edge-certificates/universal-ssl/) for every standard Universal certificate issued.

Backup certificates are wrapped with a different private key and issued from a different Certificate Authority — either Google Trust Services or Sectigo — than your domain's primary Universal SSL certificate.

These backup certificates are not normally deployed, but they will be deployed automatically by Cloudflare in the event of a certificate revocation or key compromise.

For additional details, refer to the [introductory blog post](https://blog.cloudflare.com/introducing-backup-certificates/).

## Availability

{{<feature-table id="ssl.backup_certificates">}}