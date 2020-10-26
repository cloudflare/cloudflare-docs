---
order: 15
---

# Proxy modes

## Overview

Load Balancing supports DNS-only and HTTP proxy modes, outlined below.

---

## HTTP Proxy mode

In HTTP Proxy mode, load balancers have an [automatic TTL](https://support.cloudflare.com/hc/articles/360017421192#whatdoestheautomaticttlvaluemean). Cloudflare will announce Cloudflare IP addresses externally, but will protect (mask) your origin server IP addresses. Any changes to your load balancer will propagate within seconds inside Cloudflare, including any failover events.

In the **Load Balancing** dashboard, an orange cloud icon indicates HTTP Proxy mode.

Setting the load balancer to HTTP Proxy mode offers the following benefits:

- Failover will be faster, as external DNS caches that don't respect short DNS TTLs will not impact failover performance.
- Customers on our Free, Pro, and Business plans who have a Load Balancing subscription may see reduced usage on their bill. The "automatic" TTL (five minutes) reduces the number of authoritative queries made against Cloudflare without impacting failover performance.

---

## DNS-only mode

In DNS-Only mode, you can configure load balancers to set a TTL from 30 seconds to 10 minutes. Cloudflare will serve the addresses of the (healthy) origin servers directly but relies on DNS resolvers respecting the short TTL to re-query Cloudflare's DNS for an updated list of healthy addresses.

In the **Load Balancing** dashboard, a gray cloud icon indicates DNS-Only mode.

---

## Important notes

You can have HTTP Proxy (orange cloud icon) and DNS-Only (gray cloud icon) domains in the same Load Balancing region, but the traffic routing behavior differs as follows:

- Traffic for domains using HTTP Proxy mode is routed based on the data center associated with the user making the request.
- Traffic for domains using DNS-Only mode is routed based on the data center associated with the user’s recursive resolver (DNS recursor).
