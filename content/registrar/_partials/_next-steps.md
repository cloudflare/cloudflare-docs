---
_build:
  publishResources: false
  render: never
  list: never
---

## Next steps

As mentioned in [Review DNS records in Cloudflare](/dns/zone-setups/full-setup/setup/#review-dns-records-in-cloudflare), when moving your domain to Cloudflare Registrar you might need to configure your DNS records to correctly point traffic to your web host. Cloudflare automatically scans for common records and adds them to your account's DNS page, but the scan is not guaranteed to find all existing DNS records.

Refer to your web host's documentation to learn what type of records you need to configure and where they should point, to avoid downtime.

For example, Netlify asks customers that host websites with them to add a `CNAME` record pointing `<YOUR-DOMAIN.COM>` to `apex-loadbalancer.netlify.com`, and the `www` record to `<YOUR-DOMAIN>.netlify.app`.

![An example of DNS management in Cloudflare's DNS dashboard](/registrar/static/dns-management.png)