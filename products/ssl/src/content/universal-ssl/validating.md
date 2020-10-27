---
order: 2
---

# Validating

## Authoritative zones

DCV is automatically handled for authoritative (“full”) zones by adding the requisite DNS challenge records to the zone.

## Non-Authoritative zones

Non-authoritative (“partial”) zones must manually add DNS CNAME records as provided in the Cloudflare Dashboard.