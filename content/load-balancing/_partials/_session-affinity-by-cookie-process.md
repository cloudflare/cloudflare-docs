---
_build:
  publishResources: false
  render: never
  list: never
---

Session affinity automatically directs requests from the same client to the same endpoint:

1.  When a client makes its first request, Cloudflare sets a `__cflb` cookie on the client (to track the associated endpoint).
2.  Subsequent requests by the same client are forwarded to that endpoint for the duration of the cookie and as long as the endpoint remains healthy.
3.  If the cookie expires or the endpoint becomes unhealthy, Cloudflare sets a new cookie tracking the new failover endpoint.

```mermaid
    flowchart LR
      accTitle: Session affinity process
      accDescr: Session affinity directs requests from the same client to the same server.
     A[Client] --Request--> B{<code>__cflb</code> cookie set?}
     B -->|Yes| C[Route to previous endpoint]
     C --> O2
     B ---->|No| E[Follow normal routing]
     E --> O2
     E --Set <code>__cflb</code> cookie--> A
     subgraph P1 [Pool 1]
        O1[Endpoint 1]
        O2[Endpoint 2]
     end
```
<br/>

All cookie-based sessions default to 23 hours unless you set a custom session _Time to live_ (TTL).

The session cookie is secure when [Always Use HTTPS](/ssl/edge-certificates/additional-options/always-use-https/) is enabled. Additionally, HttpOnly is always enabled for the cookie to prevent cross-site scripting attacks.
