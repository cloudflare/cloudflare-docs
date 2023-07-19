---
_build:
  publishResources: false
  render: never
  list: never
---

Session Affinity automatically directs requests from the same client to the same origin web server:

1.  When a client makes its first request, Cloudflare sets a `CFLib` cookie on the client (to track the associated origin web server).
2.  Subsequent requests by the same client are forwarded to that origin for the duration of the cookie and as long as the origin server remains healthy.
3.  If the cookie expires or the origin server becomes unhealthy, Cloudflare sets a new cookie tracking the new failover origin.

```mermaid
    flowchart LR
      accTitle: Session affinity process
      accDescr: Session affinity directs requests from the same client to the same server.
     A[Client] --Request--> B{<code>CFLib</code> cookie set?}
     B -->|Yes| C[Route to previous server]
     C --> O2
     B ---->|No| E[Follow normal routing]
     E --> O2
     E --Set <code>CFLib</code> cookie--> A
     subgraph P1 [Pool 1]
        O1[Origin 1]
        O2[Origin 2]
     end
```
<br/>

All sessions default to 23 hours unless you set a custom session _Time to live_ (TTL).

The session cookie is secure when [Always Use HTTPS](/ssl/edge-certificates/additional-options/always-use-https/) is enabled. Additionally, HttpOnly is always enabled for the cookie to prevent cross-site scripting attacks.