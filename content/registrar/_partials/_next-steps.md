---
_build:
  publishResources: false
  render: never
  list: never
---

## Next steps

After transferring your domain to Cloudflare, you might need to [configure your DNS](/dns/zone-setups/) to correctly point traffic to your web host. Refer to your web host's documentation to learn what type of records you need to configure and where they should point, to avoid downtime.

In the following example, Netlify asks customers to add a `CNAME` record pointing `<YOUR-DOMAIN.COM>` to `apex-loadbalancer.netlify.com`, and the `www` record to `<YOUR-DOMAIN.netlify.app>`.

![An example of DNS management in Cloudflare's DNS dashboard](/registrar/static/dns-management.png)