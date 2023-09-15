---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/articles/115000350252
title: Using Cloudflare with Wix
---

# Using Cloudflare with Wix

You can use Cloudflare with [Wix websites](https://www.wix.com/), though your setup needs to be different than with most website builders.

This is because Wix [does not support](https://support.wix.com/en/article/request-cloudflare-support) using Cloudflare nameservers (which is the normal part of a [full setup](/dns/zone-setups/full-setup/) or with domains bought through [Cloudflare Registrar](/registrar/)).

## Using domain pointing

If you want to manage your DNS through Cloudflare or you bought a domain through [Cloudflare Registrar](/registrar/), you can connect that domain to Wix through [domain pointing](https://support.wix.com/en/article/connecting-a-domain-to-wix-using-the-pointing-method).

This method means your website is using Cloudflare for DNS only, so all your DNS records should be [DNS-only (unproxied)](/dns/manage-dns-records/reference/proxied-dns-records/#dns-only-records).