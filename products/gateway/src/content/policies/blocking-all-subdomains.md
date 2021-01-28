---
order: 5
---

# Blocking All Subdomains

<Aside type='warning' header='⚠️ THIS PAGE IS OUTDATED'>

We're no longer maintaining this page. **It will be deleted on Feb 8, 2021**. Please visit the new [Cloudflare for Teams documentation](https://developers.cloudflare.com/cloudflare-one/teams-docs-changes) instead.

</Aside>

When you manually block a domain, you automatically block all of its subdomains. For example, if you are blocking `example.com`, our policy engine will also block a.example.com, a.b.example.com.

If you only want to block a subdomain `a.example.com`, then instead of adding `example.com` to the list, you will add `a.example.com`. Note that once you add `a.example.com` to the block list, Cloudflare Gateway will also block all subdomains of `a.example.com`.