---
title: Nameserver assignment
pcx_content_type: reference
---

# Nameserver assignment

When you add a domain on a [primary (full)](/dns/zone-setups/full-setup/) or [secondary](/dns/zone-setups/zone-transfers/cloudflare-as-secondary/) DNS setup, Cloudflare automatically assigns your nameservers. You should then add the assigned nameservers to your registrar and, once Cloudflare can detect they have been placed, your zone is activated.

Each domain's assigned nameservers may be different than other domains, even if those domains are within the same account.

These nameserver assignments cannot be changed unless you set up [custom or vanity nameservers](/dns/nameservers/custom-nameservers/).

{{<Aside type="warning">}}

To prevent domain hijacking, you can no longer preset Cloudflare nameservers at your registrar before creating the respective zone in Cloudflare. If you preset your nameservers and then add the domain, your domain will be assigned a new pair of nameservers.

To keep the same nameservers across your domains, use [Account custom nameservers](/dns/nameservers/custom-nameservers/account-custom-nameservers/).

{{</Aside>}}

For more background on nameserver assignments, refer to [our blog](https://blog.cloudflare.com/whats-the-story-behind-the-names-of-cloudflares-name-servers/).
