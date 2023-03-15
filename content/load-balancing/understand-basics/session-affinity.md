---
pcx_content_type: concept
title: Session affinity
weight: 17
---

# Session affinity

{{<render file="_session-affinity-definition.md">}}

## Process

{{<render file="_session-affinity-process.md">}}

---

## Enabling Session Affinity from the Cloudflare dashboard

Enable Session Affinity when you [create or edit a load balancer](/load-balancing/how-to/create-load-balancer/), during the **Hostname** step.

If you enable Session Affinity, choose one of the following options:

- **By Cloudflare cookie only**: Sets a `CFLib` cookie to track the associated origin web server
- **By Cloudflare cookie and Client IP fallback**: Sets a `CFLib` cookie, but also uses the client IP address when no session affinity cookie is provided

{{<Aside type="warning" header="Important">}}

Session Affinity with Client IP fallback is not supported for load balancers in [DNS-only mode (gray cloud)](/load-balancing/understand-basics/proxy-modes/).

{{</Aside>}}

### Origin Drain

Drain or remove all traffic from an origin without affecting any active customers using Origin Drain. For more details on origin drain, refer to [Performing planned maintenance](/load-balancing/additional-options/planned-maintenance/#gradual-rotation).

{{<Aside type="warning" header="Important">}}

Origin drain is not supported for load balancers in [DNS-only mode (gray cloud)](/load-balancing/understand-basics/proxy-modes/).

{{</Aside>}}

### Zero-Downtime Failover

Zero-Downtime Failover automatically sends traffic to origin servers within a pool during transient network issues. This helps reduce errors shown to your users when issues occur in between active health monitors. 

You can enable one of three options:

- **None**: No failover will take place and errors may show to your users.
- **Temporary**: Traffic will be sent to other origin(s) until the originally pinned origin is available.
- **Sticky**: The session affinity cookie is updated and subsequent requests are sent to the new origin moving forward as needed.

---

## Enabling Session Affinity via the Cloudflare API

Session affinity is a property of load balancers, which you can set with the following endpoints:

- [Create a load balancer](https://developers.cloudflare.com/api/operations/load-balancers-create-load-balancer)
- [Edit a load balancer](https://developers.cloudflare.com/api/operations/load-balancers-update-load-balancer)

Customize the behavior of session affinity by using the `session_affinity`, `session_affinity_ttl`, and `session_affinity_attributes` parameters.

For more details on API commands in context, refer to [Create a load balancer with the API](/load-balancing/how-to/create-load-balancer/).
