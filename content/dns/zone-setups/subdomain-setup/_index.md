---
pcx_content_type: concept
title: Subdomain setup
weight: 3
---

# Subdomain setup

When you use a subdomain setup, you can manage the [Cloudflare configurations](/fundamentals/concepts/how-cloudflare-works/) for one or more subdomains separately from those associated with your {{<glossary-tooltip term_id="apex domain">}}apex domain{{</glossary-tooltip>}}.

{{<Aside>}}
This is different from simply creating a subdomain for a site you already have in Cloudflare. If you do not need separate Cloudflare configuration for your subdomain, refer to [Create a subdomain record](/dns/manage-dns-records/how-to/create-subdomain/).
{{</Aside>}}

![Screenshot showing a zone with a parent domain and a child subdomain](/images/dns/subdomain-zone.png)

You might use this setup when you want to share access to a specific subdomain's settings with different teams, but have stricter controls on your apex domain. For example, a subdomain setup could allow your documentation team to manage the Cloudflare configuration for `docs.example.com`, while preventing them from adjusting any settings on `example.com`.

Subdomain setups are also useful when different subdomains require entirely different settings. For example, you may have different requirements for `docs.example.com`, `blog.example.com`, and `community.example.com`.

## Availability

{{<feature-table id="dns.subdomain_setup">}}

## Resources

{{<directory-listing>}}