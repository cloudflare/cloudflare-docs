---
order: 3
pcx-content-type: faq
---

# FAQs

<details>
<summary>How does DNS Firewall choose a backend nameserver to query upstream?</summary>
<div>

DNS Firewall alternates between a customer's nameservers. Additionally, the DNS Firewall determines the fastest server from the group of nameservers and factors in this information via an algorithm.

</div>
</details>

<details>
<summary>How long does the DNS Firewall cache a stale object?</summary>
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
<summary>Does the DNS Firewall support EDNS-Client-Subnet?</summary>
<div>

Yes. Often, DNS providers want to see a client's IP via EDNS-Client-Subnet because they serve geographically specific DNS answers based on the client's IP. With EDNS-Client-Subnet enabled, the DNS Firewall will forward the client's IP subnet along with the DNS query to the origin nameserver. 

When EDNS is enabled, the DNS Firewall gives out the geographically correct answer in cache based on the client IP subnet. To do this, the DNS Firewall segments its cache. For example:

1. A resolver says it is looking for an answer for client `1.2.3.0/24`.
1. The DNS Firewall will proxy the request to the origin for the answer.
1. The DNS Firewall  will cache the answer from the origin, but only for that `/24`.
1. `1.2.9.0/24` now asks the same DNS question and the answer is again returned from the origin instead of the cache.

<Aside type="note">

EDNS limits the effectiveness of the DNS cache.

</Aside>
</div>
</details>
