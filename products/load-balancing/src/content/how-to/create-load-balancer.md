---
order: 3
pcx-content-type: how-to
---

import LBDefinition from "../_partials/_load-balancer-definition.md"
import LBCreate from "../_partials/_load-balancer-create.md"
import LBCreateAPI from "../_partials/_load-balancer-create-api.md"

# Create a load balancer

<LBDefinition/>

For more details about load balancers, refer to [Load balancers](/understand-basics/load-balancers).

## Via the dashboard

<LBCreate/>

---

## Via the API

<LBCreateAPI/>

## Sharing your load balancer with other sites

You can share your load balancer with other sites in your account by [creating a canonical name (CNAME) record](https://support.cloudflare.com/hc/articles/360019093151). This is useful for sharing configurations with multiple other domains so you do not have to create new load balancers for each site.

You can also configure separate load balancers for each domain and reuse monitors and pools. This is especially useful for changing the failover order for different domains, such as when your `example.co.uk` server has a different failover priority from `example.com` or `example.com.au`.