---
pcx-content-type: reference
weight: 6
title: Load balancing with DNS records
---

# Load balancing with DNS records

To distribute traffic across multiple servers, set up multiple DNS records for the same hostname.

Use this setup for simple load balancing. If you need more fine-grained control over traffic distribution — including automatic failover, intelligent routing, and more — set up our [add-on load balancing service](/load-balancing/).

## Example scenario

The following example illustrates how you would distribute traffic intended for `www.example.com`.

After [creating an account](https://support.cloudflare.com/hc/articles/201720164) and [updating your nameservers](/dns/zone-setups/full-setup/setup/) for `example.com`, you would create the following DNS records for your `www` subdomain ([how-to instructions](/dns/manage-dns-records/how-to/create-dns-records/)):

| Type | Name  | IPv4 address |
| ---- | ----- | ------------ |
| A    | `www` | `192.0.1.1`  |
| A    | `www` | `192.0.1.2`  |
| A    | `www` | `192.0.1.3`  |

The exact behavior of your DNS routing would depend on the [proxy status](/dns/manage-dns-records/reference/proxied-dns-records) of each record.

### All unproxied records

If all associated records were unproxied, any request to Cloudflare's nameservers would return the three **A** records you previously added. 

Each client (oftentimes a browser), would decide which IP address to send the request to. If one IP address fails, the client would choose another option. All requests would be sent directly to the origin server (to `192.0.1.X`).

### All proxied records (recommended)

If all associated records were proxied, any request to Cloudflare's nameservers would return two **A** records from Cloudflare's list of edge IP addresses.

Each client (oftentimes a browser) would decide which Cloudflare IP address to send the request to. Cloudflare would then receive that request and — if Cloudflare needed to contact your origin server — we would pick one of the three IP addresses specified in your DNS records (`192.0.1.X`).

Beyond reducing requests to your origin server, this setup allows your application to take advantage of Cloudflare's **Zero downtime failover**. When a request to IP address fails, Cloudflare automatically retries the request to other IP addresses associated with the same hostname. This behavior prevents end users from experiencing downtime.

### Unproxied and proxied records

If you have a mix of proxied and unproxied records, requests happen as if you had [all proxied records](#all-proxied-records-recommended).

This approach is not typically recommended because it might lead to unexpected behavior.