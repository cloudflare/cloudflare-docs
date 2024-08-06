---
pcx_content_type: concept
title: Session affinity
weight: 17
---

# Session affinity

{{<render file="_session-affinity-definition.md">}}

## Types

Session affinity specifies the type of session affinity the load balancer should use unless specified as `"none"` or `""` (default).

### cookie

On the first request to a proxied load balancer, a cookie is generated, encoding information of which endpoint the request will be forwarded to. Subsequent requests, by the same client to the same load balancer, will be sent to the endpoint the cookie encodes for the duration of the cookie and as long as the endpoint remains healthy. If the cookie has expired or the endpoint is unhealthy, a new endpoint is calculated and used.

#### How does it work?

{{<render file="_session-affinity-by-cookie-process.md">}}

### ip_cookie

This behaves similar to `cookie` except the initial endpoint selection is stable and based on the client's IP address.

### header

On the first request to a proxied load balancer, a session key based on the configured HTTP headers is generated. The session key encodes the request headers used for storing which endpoint the request will be forwarded to during the load balancer session state. Subsequent requests to the load balancer with the same headers will be sent to the same endpoint, for the duration of the session and as long as the endpoint remains healthy. If the session has been idle for the duration of session affinity TTL seconds or the endpoint is unhealthy, then a new endpoint is calculated and used.

{{<Aside type="note">}}

[Sticky Zero-Downtime Failover](/load-balancing/understand-basics/session-affinity/#zero-downtime-failover) is not supported for session affinity by HTTP header.

{{</Aside>}}

#### Control how headers are used

By default, at least one of the HTTP headers that you configure for session affinity by HTTP header must be present on requests sent to your load balancer in order for header-based sessions to be created. If a client adds or removes HTTP headers on their requests and they have already established a session, a new session will be created based on the new HTTP headers found in subsequent requests as long as they are specified in your configuration.

If you would like to require all of your configured HTTP headers to be present on requests in order for sessions to be created, then set `session_affinity_attributes.require_all_headers` to `true` via the Cloudflare API or toggle `Require all headers` to `enabled` in the Cloudflare dashboard when editing your load balancer.

---

## Enabling Session Affinity from the Cloudflare dashboard

Enable Session Affinity when you [create or edit a load balancer](/load-balancing/load-balancers/create-load-balancer/), during the **Hostname** step.

If you enable Session Affinity, choose one of the following options:

- **By Cloudflare cookie only**: Sets a `__cflb` cookie to track the associated endpoint.
- **By Cloudflare cookie and Client IP fallback**: Sets a `__cflb` cookie, but also uses the client IP address when no session affinity cookie is provided.
- **By HTTP header**.

{{<Aside type="warning" header="Important">}}

Session Affinity by Cloudflare cookie and Client IP fallback is not supported for load balancers in [DNS-only mode (gray cloud)](/load-balancing/understand-basics/proxy-modes/).

{{</Aside>}}

---

## Enabling Session Affinity via the Cloudflare API

Session affinity is a property of load balancers, which you can set with the following endpoints:

- [Create a load balancer](/api/operations/load-balancers-create-load-balancer)
- [Edit a load balancer](/api/operations/load-balancers-update-load-balancer)

Customize the behavior of session affinity by using the `session_affinity`, `session_affinity_ttl`, and `session_affinity_attributes` parameters.

To enable session affinity by HTTP header, set the `session_affinity` value to `header` and add your
HTTP header names to `session_affinity_attributes.headers`.

For more details on API commands in context, refer to [Create a load balancer with the API](/load-balancing/load-balancers/create-load-balancer/).

---

## Endpoint Drain

Drain or remove all traffic from an endpoint without affecting any active customers using endpoint drain. For more details on endpoint drain, refer to [Performing planned maintenance](/load-balancing/additional-options/planned-maintenance/#gradual-rotation).

{{<Aside type="warning" header="Important">}}

Endpoint drain is not supported for load balancers in [DNS-only mode (gray cloud)](/load-balancing/understand-basics/proxy-modes/).

{{</Aside>}}

## Zero-Downtime Failover

Zero-Downtime Failover automatically sends traffic to endpoints within a pool during transient network issues. This helps reduce errors shown to your users when issues occur in between active health monitors.

You can enable one of three options:

- **None**: No failover will take place and errors may show to your users.
- **Temporary**: Traffic will be sent to other endpoint(s) until the originally pinned endpoint is available.
- **Sticky**: The session affinity cookie is updated and subsequent requests are sent to the new endpoint moving forward as needed.

{{<Aside type="note">}}

[Sticky Zero-Downtime Failover](/load-balancing/understand-basics/session-affinity/#zero-downtime-failover) is not supported for session affinity by HTTP header.

{{</Aside>}}
