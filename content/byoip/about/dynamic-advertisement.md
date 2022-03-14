---
title: Dynamic advertisement
pcx-content-type: concept
---

# Dynamic advertisement

{{<Aside>}}

To ensure smooth operation in general and simplify the advertisement process during an attack scenario, refer to [dynamic advertisement best practices](/byoip/best-practices/dynamic-advertisement/).

{{</Aside>}}

To configure BGP advertisement at the Cloudflare edge, [use the Cloudflare API](/byoip/how-to/configure-dynamic-advertisement/#configure-dynamic-advertisement-via-the-api) or [use the IP Prefixes page](/byoip/how-to/configure-dynamic-advertisement/#configure-dynamic-advertisement-via-the-dashboard) from your Cloudflare Account Home.

When using the API, you can authorize a call with your email and API key or create a service token for this purpose. A successful API response indicates the service registered the request. Enabling advertising typically takes 2 to 7 minutes and disabling advertising takes approximately 15 minutes.

Both the API and Cloudflare UI support prefix delegations, which allow other Cloudflare accounts to interact with your prefix. The effect of a delegation is service specific. For more information, refer to [prefix delegations](/byoip/about/prefix-delegations/).
