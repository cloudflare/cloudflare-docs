---
title: Dynamic advertisement
pcx_content_type: concept
weight: 1
---

# Dynamic advertisement

You can use the [Cloudflare API](/byoip/concepts/dynamic-advertisement/best-practices/#via-the-api) or [the IP Prefixes page](/byoip/concepts/dynamic-advertisement/best-practices/#via-the-cloudflare-dashboard) in the Cloudflare dashboard to configure the {{<glossary-tooltip term_id="Border Gateway Protocol (BGP)">}}Border Gateway Protocol{{</glossary-tooltip>}} advertisement at the Cloudflare edge.

When using the API, you can authorize an {{<glossary-tooltip term_id="API call">}}API call{{</glossary-tooltip>}} with your email and API key or create a service token for this purpose. A successful API response indicates the service registered the request. Enabling advertising typically takes two to seven minutes and disabling advertising takes approximately 15 minutes.

Both the API and the [Cloudflare dashboard](https://dash.cloudflare.com/) support prefix delegations, which allow other Cloudflare accounts to interact with your prefix. The effect of a delegation is service specific. For more information, refer to [prefix delegations](/byoip/concepts/prefix-delegations/).