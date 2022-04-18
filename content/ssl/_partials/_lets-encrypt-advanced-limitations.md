---
_build:
  publishResources: false
  render: never
  list: never
---

Selecting **Let’s Encrypt** as a CA limits a certificate to a TXT **Certificate validation method**, 90 days for the **Certificate Validity Period**, two host entries (one for the zone name and one for the subdomain wildcard of the zone name, such as `example.com` and `*.example.com`).

If using the API to order your certificate, this action also defaults `cloudflare_branding` to `false`.