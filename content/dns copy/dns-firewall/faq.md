---
title: FAQ
pcx_content_type: faq
weight: 4
meta:
  title: FAQs — DNS Firewall
---

# FAQs — DNS Firewall

<details>
<summary>How does DNS Firewall choose a backend nameserver to query upstream?</summary>
<div>

DNS Firewall alternates between a customer's nameservers, using an algorithm is more likely to send queries to the faster upstream nameservers than slower nameservers.

</div>
</details>

<details>
<summary>How long does DNS Firewall cache a stale object?</summary>
<div>

DNS Firewall sets cache longevity according to allocated memory.

As long as there is enough allocated memory, Cloudflare does not clear items from the cache forcefully, even when the TTL expires. This feature allows Cloudflare to serve stale objects from cache if your nameservers are offline.

</div>
</details>

<details>
<summary>Does the DNS Firewall cache SERVFAIL?</summary>
<div>

No. If the customer's nameservers respond with a SERVFAIL, the DNS Firewall will try again on the next request.

</div>
</details>

<details>
<summary>Does DNS Firewall support EDNS-Client-Subnet?</summary>
<div>

Yes. Often, DNS providers want to see a client's IP via [EDNS](https://datatracker.ietf.org/doc/html/rfc7871)-Client-Subnet because they serve geographically specific DNS answers based on the client's IP. With EDNS-Client-Subnet enabled, the DNS Firewall will forward the client's IP subnet along with the DNS query to the upstream nameserver.

When EDNS is enabled, the DNS Firewall gives out the geographically correct answer in cache based on the client IP subnet. To do this, the DNS Firewall segments its cache. For example:

1.  A resolver says it is looking for an answer for client `192.0.2.0/24`.
2.  The DNS Firewall will proxy the request to the upstream nameserver for the answer.
3.  The DNS Firewall will cache the answer from the upstream nameserver, but only for that `/24`.
4.  `203.0.113.0/24` now asks the same DNS question and the answer is again returned from the upstream nameserver instead of the cache.

{{<Aside type="note">}}

EDNS limits the effectiveness of the DNS cache.

{{</Aside>}}

Some resolvers might not be sending any EDNS data. When you set the `ecs_fallback` parameter to `true` via the [API](/api/operations/dns-firewall-update-dns-firewall-cluster), DNS Firewall will forward the IP subnet of the resolver instead only if there is no EDNS data present in incoming the DNS query.

</div>
</details>

<details>
<summary>Does DNS Firewall cache negative answers?</summary>
<div>

Not by default, but you can set `negative_cache_ttl` via the [API](/api/operations/dns-firewall-update-dns-firewall-cluster). This will affect the TTL of responses with status `REFUSED` or `NXDOMAIN`.

</div>
</details>

<details>
<summary>How can I set PTR records for nameserver hostnames?</summary>
<div>

If you want PTR records on the assigned DNS Firewall cluster IPs that point to your nameserver hostnames, please reach out to your Cloudflare account team.

</div>
</details>
