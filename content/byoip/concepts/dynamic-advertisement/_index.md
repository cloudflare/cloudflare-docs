---
title: Dynamic advertisement
pcx_content_type: concept
weight: 1
---

# Dynamic advertisement

{{<Aside>}}

To ensure smooth operation in general and simplify the advertisement process during an attack scenario, refer to [dynamic advertisement best practices](/byoip/concepts/dynamic-advertisement/best-practices).

{{</Aside>}}

To configure the {{<glossary-tooltip term_id="Border Gateway Protocol (BGP)">}}Border Gateway Protocol{{</glossary-tooltip>}} advertisement at the Cloudflare edge, [use the Cloudflare API](/byoip/how-to/configure-dynamic-advertisement/#configure-dynamic-advertisement-via-the-api) or [use the IP Prefixes page](/byoip/how-to/configure-dynamic-advertisement/#configure-dynamic-advertisement-via-the-dashboard) in the Cloudflare dashboard.

When using the API, you can authorize an {{<glossary-tooltip term_id="API call">}}API call{{</glossary-tooltip>}} with your email and API key or create a service token for this purpose. A successful API response indicates the service registered the request. Enabling advertising typically takes two to seven minutes and disabling advertising takes approximately 15 minutes.

Both the API and [Cloudflare dashboard](https://dash.cloudflare.com/) support prefix delegations, which allow other Cloudflare accounts to interact with your prefix. The effect of a delegation is service specific. For more information, refer to [prefix delegations](/byoip/concepts/prefix-delegations/).
