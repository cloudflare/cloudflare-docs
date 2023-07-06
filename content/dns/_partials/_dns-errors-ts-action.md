---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: errorName
---

If you experience `$1` errors with a newly activated domain, review your DNS settings in the Cloudflare dashboard.

Check your expected root domain (`example.com`) and any active subdomains (`www.example.com` or `blog.example.com`). If they do not resolve correctly, you may need to add a [root domain record](/dns/manage-dns-records/how-to/create-root-domain/) or a [subdomain record](/dns/manage-dns-records/how-to/create-subdomain/) in Cloudflare DNS.

If you have the correct records set up, make sure those records are also pointing to the correct origin IP address.

After making changes to your DNS records, you may need to wait a few minutes for those changes to take effect.