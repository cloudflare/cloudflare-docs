---
order: 5
pcx-content-type: concept
---

# Proxy status

You can load balance your traffic at different levels of the networking stack, including:
- [Layer 7 or HTTP/HTTPS traffic](#layer-7-load-balancing-orange-clouded) (most common)
- [DNS-only](#dns-only-load-balancing-gray-clouded)
- [Layer 4 or TCP traffic](#layer-4-load-balancing)

---

## Orange-clouded (layer 7 load balancing)

Layer 7 load balancers direct traffic to specific servers based on information present in each HTTP/HTTPS request (HTTP headers, URI, cookies, type of data, etc.).

When a client visits your application, Cloudflare directs their request to a healthy origin server (determined by your [steering policy](/understand-basics/traffic-steering) and [origin weights](/understand-basics/weighted-load-balancing)).

Cloudflare performs layer 7 load balancing when traffic to your hostname is **proxied** through Cloudflare. In the **Load Balancing** dashboard, these load balancers are marked with an orange cloud.

### Benefits

In comparison to [DNS-only load balancing](#dns-only-load-balancing-gray-clouded), layer 7 load balancing:
- Protects origin servers from DDoS attacks by hiding their IP addresses.
- Offers faster failover and more accurate routing, which can otherwise be affected by DNS caching.
- Integrates with other Cloudflare features such as caching, Workers, WAF, etc.
- Reduces authoritative queries against Cloudflare, which can potentially save money for customers with usage-based billing.
- Supports customized [session affinity](/understand-basics/session-affinity) and [origin drain](/understand-basics/session-affinity#origin-drain).
- More accurately geo-locates traffic, using data center associated with the user making the request instead of the data center associated with a user's recursive resolver.

---

## Gray-clouded (DNS-only load balancing)

DNS-only load balancers route traffic by returning specific IP addresses in response to a client's DNS query.

When a client visits your application, Cloudflare provides the address for a healthy origin server (determined by your [steering policy](/understand-basics/traffic-steering) and [origin weights](/understand-basics/weighted-load-balancing)). However, Cloudflare relies on DNS resolvers respecting the short TTL to re-query Cloudflare's DNS for an updated list of healthy addresses. If a client has a cached DNS response, they will go to their previous destination, potentially ignoring your load balancer.

Cloudflare performs DNS-only load balancing when traffic to your hostname is **not proxied** through Cloudflare. In the **Load Balancing** dashboard, these load balancers are marked with a gray cloud.

### Limitations

In comparison to [layer 7 load balancing](#layer-7-load-balancing-orange-clouded), DNS-only load balancing:
- Does not hide the IP addresses of your origin servers, leaving them vulnerable to DDoS attacks.
- Performs slower failover and less accurate routing, because it has to rely on DNS resolvers and cache settings.
- Cannot integrate with other Cloudflare features such as caching, Workers, WAF, etc.
- Increases authoritative queries against Cloudflare, which can potentially cost more for customers with usage-based billing.
- Supports standard [session affinity](/understand-basics/session-affinity).
- Geo-locates traffic based on the data center associated with a user's recursive resolver, which can sometimes cause issues with [latency-based steering](/understand-basics/traffic-steering#dynamic-steering).

---

## Layer 4 load balancing

Layer 4 load balancers route traffic by forwarding traffic to certain ports or IP addresses.

Cloudflare currently only supports layer 4 load balancing as part of [Cloudflare Spectrum](https://developers.cloudflare.com/spectrum/about/load-balancer).

<Aside type="note">

Since Spectrum operates at the TCP level, it does not have the information to support features like [session affinity](/understand-basics/session-affinity), [custom rules](/understand-basics/load-balancing-rules), or caching.

</Aside>