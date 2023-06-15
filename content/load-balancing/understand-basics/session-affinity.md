---
pcx_content_type: concept
title: Session affinity
weight: 17
---

# Session affinity

{{<render file="_session-affinity-definition.md">}}

## Cookie-based session affinity

{{<render file="_session-affinity-process.md">}}

## Session affinity by type

Session affinity specifies the type of session affinity the load balancer should use unless specified as `"none"` or `"" (default)`.

### "cookie"

On the first request to a proxied load balancer, a cookie is generated, encoding information of which origin the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the origin server the cookie encodes for the duration of the cookie and as long as the origin server remains healthy. If the cookie has expired or the origin server is unhealthy, a new origin server is calculated and used.

### "ip_cookie"

This behaves similar to `"cookie"` except the initial origin selection is stable and based on the client's IP address.

### "header"

The initial origin selection is stable and based on specific HTTP headers found in the first request. Subsequent requests, by clients with the same HTTP headers to the same load balancer, will be sent to the same origin server for the duration of the session and as long as the origin server remains healthy. If the origin server becomes unhealthy, a different stable origin server will be used until the original origin server recovers. A new origin server is calculated and used only after the session has not been used for `session_affinity_ttl` seconds.

---

## Enabling Session Affinity from the Cloudflare dashboard

Enable Session Affinity when you [create or edit a load balancer](/load-balancing/how-to/create-load-balancer/), during the **Hostname** step.

If you enable Session Affinity, choose one of the following options:

- **By Cloudflare cookie only**: Sets a `CFLib` cookie to track the associated origin web server
- **By Cloudflare cookie and Client IP fallback**: Sets a `CFLib` cookie, but also uses the client IP address when no session affinity cookie is provided

{{<Aside type="warning" header="Important">}}

Session Affinity with Client IP fallback is not supported for load balancers in [DNS-only mode (gray cloud)](/load-balancing/understand-basics/proxy-modes/).

{{</Aside>}}

---

## Enabling Session Affinity via the Cloudflare API

Session affinity is a property of load balancers, which you can set with the following endpoints:

- [Create a load balancer](/api/operations/load-balancers-create-load-balancer)
- [Edit a load balancer](/api/operations/load-balancers-update-load-balancer)

Customize the behavior of session affinity by using the `session_affinity`, `session_affinity_ttl`, and `session_affinity_attributes` parameters.

To enable session affinity by HTTP header, set the `session_affinity` value to `header` and `session_affinity_attributes.headers` must have at least one HTTP header name.

For more details on API commands in context, refer to [Create a load balancer with the API](/load-balancing/how-to/create-load-balancer/).

---

## Origin Drain

Drain or remove all traffic from an origin without affecting any active customers using Origin Drain. For more details on origin drain, refer to [Performing planned maintenance](/load-balancing/additional-options/planned-maintenance/#gradual-rotation).

{{<Aside type="warning" header="Important">}}

Origin drain is not supported for load balancers in [DNS-only mode (gray cloud)](/load-balancing/understand-basics/proxy-modes/).

{{</Aside>}}

## Zero-Downtime Failover

Zero-Downtime Failover automatically sends traffic to origin servers within a pool during transient network issues. This helps reduce errors shown to your users when issues occur in between active health monitors. 

You can enable one of three options:

- **None**: No failover will take place and errors may show to your users.
- **Temporary**: Traffic will be sent to other origin(s) until the originally pinned origin is available.
- **Sticky**: The session affinity cookie is updated and subsequent requests are sent to the new origin moving forward as needed.