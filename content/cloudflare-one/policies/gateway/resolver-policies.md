---
pcx_content_type: configuration
title: Custom resolver policies
layout: single
weight: 6
---

# Custom resolver policies

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

By default, Gateway sends DNS requests to [1.1.1.1](/1.1.1.1/), Cloudflare's public DNS resolver, for resolution. Enterprise users can instead create Gateway policies to route DNS requests to custom resolvers.

You may use custom resolver policies if you require access to non-publicly routed domains, need to use a protected DNS service, or want to simplify DNS management for multiple locations.
