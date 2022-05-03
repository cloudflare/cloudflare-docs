---
pcx-content-type: reference
weight: 7
title: Load balancing with DNS records
---

# Load balancing with DNS records

To randomly distribute traffic across multiple servers, set up multiple DNS `A` or `AAAA` records for the same hostname.

Use this setup for simple, [round-robin load balancing](https://www.cloudflare.com/learning/dns/glossary/round-robin-dns/). If you need more fine-grained control over traffic distribution — including automatic failover, intelligent routing, and more — set up our [add-on load balancing service](/load-balancing/).

## Example scenario

The following example illustrates how you would distribute traffic intended for `www.example.com`. Though the example uses `A` records, you could also use `AAAA` records.

After [creating an account](https://support.cloudflare.com/hc/articles/201720164) and [updating your nameservers](/dns/zone-setups/full-setup/setup/) for `example.com`, you might [create multiple DNS records](/dns/manage-dns-records/how-to/create-dns-records/) for your `www` subdomain:

| Type | Name  | IPv4 address |
| ---- | ----- | ------------ |
| A    | `www` | `192.0.1.1`  |
| A    | `www` | `192.0.1.2`  |
| A    | `www` | `192.0.1.3`  |

The exact behavior of your DNS routing would depend on the [proxy status](/dns/manage-dns-records/reference/proxied-dns-records/) of each record.

### All records unproxied

If all associated records were unproxied, any request to Cloudflare's nameservers would return the three `A` records you previously added. 

Each client (oftentimes a browser), would decide which IP address to send the request to. If one IP address fails, the client would choose another option. All requests would be sent directly to the origin server (to `192.0.1.X`).

### All records proxied (recommended)

If all associated records were proxied, any request to Cloudflare's nameservers would return two `A` records from Cloudflare's list of edge IP addresses.

Each client (oftentimes a browser) would decide which Cloudflare IP address to send the request to. Cloudflare would then receive that request and — if Cloudflare needed to contact your origin server — we would pick one of the three IP addresses specified in your DNS records (`192.0.1.X`).

Beyond reducing requests to your origin server, this setup allows your application to take advantage of Cloudflare's **Zero downtime failover**. When a request to one IP address fails, Cloudflare automatically retries the request to other IP addresses associated with the same hostname. This behavior prevents end users from experiencing downtime.

### Unproxied and proxied records

If you have a mix of proxied and unproxied records associated with the same hostname, requests happen as if you had [all proxied records](#all-records-proxied-recommended).

This approach is not typically recommended because it can lead to unexpected behavior. For example, if you had two unproxied records and one proxied record, Cloudflare would treat all records as proxied. However, if you deleted the single proxied record, your remaining two unproxied records would immediately be treated as unproxied.

We recommend either using all proxied or all unproxied records to avoid surprises when you make changes to your DNS records.