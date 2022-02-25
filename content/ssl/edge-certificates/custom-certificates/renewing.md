---
order: 2
pcx-content-type: reference
---

# Renewing

Uploaded Certificates cannot be renewed by Cloudflare. You must ensure that you replace an expiring certificate before it expires, otherwise your visitors may not be able to connect.

Cloudflare automatically sends email notification 30 and 14 days before your custom certificate expires. Email is sent to users who have the SSL/TLS, Administrator, or Super Administrator roles.

## Expired certificates and Legacy Client Support

For **Modern** custom certificates, Cloudflare removes expired certificates at expiration. Affected domains and subdomains will fall back to [Universal SSL](/edge-certificates/universal-ssl) (if enabled).

For **Legacy** custom certificates, Cloudflare removes expired certificates every day at 0245UTC. Affected domains and subdomains will fall back to [Universal SSL](/edge-certificates/universal-ssl) (if enabled).