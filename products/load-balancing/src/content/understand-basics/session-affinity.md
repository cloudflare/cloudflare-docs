---
order: 16
pcx-content-type: concept
---

# Session affinity

When you enable session affinity, your load balancer directs all requests from a particular end user to a specific origin server. This continuity preserves information about the user session — such as items in their shopping cart — that might otherwise be lost if requests were spread out among multiple servers.

Session affinity can also help reduce network requests, leading to savings for customers with usage-based billing.

<Aside type='warning' header='Important'>

Cloudflare only supports cookie-based session affinity. Other methods, such as TCP session affinity, are not supported.

</Aside>

## Process

Session Affinity automatically directs requests from the same client to the same origin web server:

1. When a client makes its first request, Cloudflare sets a `CFLib` cookie on the client (to track the associated origin web server).
1. Subsequent requests by the same client are forwarded to that origin for the duration of the cookie and as long as the origin server remains healthy.
1. If the cookie expires or the origin server becomes unhealthy, Cloudflare sets a new cookie tracking the new failover origin.

All sessions default to 23 hours unless you set a custom session *Time to live* (TTL).

The session cookie is secure when [Always Use HTTPS](https://developers.cloudflare.com/ssl/edge-certificates/additional-options/always-use-https) is enabled. Additionally, HttpOnly is always enabled for the cookie to prevent cross-site scripting attacks.

---

## Enabling Session Affinity from the Cloudflare dashboard

Enable Session Affinity when you [create  or edit a load balancer](/create-load-balancer-ui), during the **Hostname** step.

If you enable Session Affinity, choose one of the following options:
- **By Cloudflare cookie only**: Sets a `CFLib` cookie to track the associated origin web server
- **By Cloudflare cookie and Client IP fallback**: Sets a `CFLib` cookie, but also uses the client IP address when no session affinity cookie is provided

<Aside type='warning' header='Important'>

Session Affinity with Client IP fallback is not supported for load balancers in [DNS-only mode (gray cloud)](/understand-basics/proxy-modes).

</Aside>

### Origin Drain

Drain or remove all traffic from an origin without affecting any active customers using Origin Drain. For more details on origin drain, refer to [Performing planned maintenance](/additional-options/planned-maintenance#gradual-rotation).

<Aside type='warning' header='Important'>

Origin drain is not supported for load balancers in [DNS-only mode (gray cloud)](/understand-basics/proxy-modes).

</Aside>

---

## Enabling Session Affinity via the Cloudflare API

Session affinity is a property of load balancers, which you can set with the following endpoints:

- [Create a load balancer](https://api.cloudflare.com/#load-balancers-create-load-balancer)
- [Edit a load balancer](https://api.cloudflare.com/#load-balancers-update-load-balancer)

Customize the behavior of session affinity by using the `session_affinity`, `session_affinity_ttl`, and `session_affinity_attributes` parameters.

For more details on API commands in context, refer to [Create a load balancer with the API](/create-load-balancer-api/).
