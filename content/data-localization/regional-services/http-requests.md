---
pcx_content_type: reference
title: Default HTTP Privacy
weight: 2
---

# Cloudflare's default HTTP privacy

Cloudflare runs one of the largest global anycast networks in the world, with all current data center locations accessible on the [network map](https://www.cloudflare.com/network/).

Within the Cloudflare data centers, and between the Cloudflare network and a customer's origin, traffic is encrypted during transit. Customers have the flexibility to select which [encryption mode](/ssl/origin-configuration/ssl-modes/) and which [Cipher Suites](/ssl/edge-certificates/additional-options/cipher-suites/) they want to use.

Additionally, all request and response processing within a Cloudflare data center occurs in memory, with machine inspection used to prevent human access. Nothing is written to disk except for eligible content for caching or Cache Rules configured by the customer. Moreover, all cache disks are encrypted at rest.

![HTTP requests flow](/images/data-localization/http-requests-flow.png)

At a high level, when an end user's device connects to any Cloudflare data center, the request is processed in the following way:

1. Certain types of requests that can be used for cyber attacks are immediately dropped based on the addressing information (layer 3 / network layer).

2. Next, the encrypted request is decrypted and inspected using the customer's chosen business logic, for example, the products Configuration Rules, WAF Custom Rules, Rate Limiting Rules, following the [traffic sequence](https://blog.cloudflare.com/traffic-sequence-which-product-runs-first/) and phases. This process enables the detection and prevention of a variety of different types of cyber attacks and malicious traffic, including layer 7 / application layer DDoS attacks, automated bot traffic, credential stuffing, and SQL injection, among others.

3. The inspected request is then passed to the cache module. If the cache can fulfill the request with a cached copy of the content, it does so; if not, it forwards the request to the customer's origin server. Traffic between the Cloudflare data center and the origin server is encrypted, unless the customer decides to use a different encryption mode.

4. When the response comes from the customer's origin server, any static and eligible content is cached onto encrypted disks. The response then goes back through the business logic to the user across the Internet.

By default, Cloudflare performs TLS termination globally in every data center, where the Internet end user connects to a website or application behind Cloudflare. However, customers can configure Regional Services to specify in which regions the processing and TLS termination occurs.