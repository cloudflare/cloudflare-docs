---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115003687931-Warning-about-exposing-your-origin-IP-address-via-DNS-records
title: Exposed IP addresses
weight: 12
---

# Exposed IP addresses

When your DNS records are [proxied](/dns/manage-dns-records/reference/proxied-dns-records/), Cloudflare speeds up and protects your site.

A `dig` query against your proxied apex domain returns a Cloudflare IP address. This way, your origin server’s IP address remains concealed from the public. Remember that orange cloud benefits only apply to HTTP traffic.

Under certain circumstances, the **DNS Records** panel in the Cloudflare dashboard **DNS** app displays a warning whenever you have DNS-only records that may expose your origin server’s IP address. This warning does not block, or in any way affect, traffic destined to your site.

When your server’s IP address is exposed, your server is more vulnerable to direct attacks. It is still possible (but more difficult) for attackers to determine your origin server IP address when proxying traffic to Cloudflare.

Below are two cases where you might receive an IP exposure warning from Cloudflare.

___

## DNS records that should be proxied

If you receive the following warning:

`This record is exposing your origin server’s IP address. To hide your origin IP address, and increase your server security, click on the grey cloud to change it to orange.`

Cloudflare recommends [proxying](/dns/manage-dns-records/reference/proxied-dns-records/) the record so that any `dig` query against that record returns a Cloudflare IP address and your origin server IP address remains concealed from the public.

To take advantage of Cloudflare’s performance and security benefits, we recommend you proxy DNS records that handle HTTP traffic, including `A`, `AAAA`, and `CNAME` records.

___

## DNS records that should be DNS-only

When you have a DNS-only `A`,`AAAA`, `CNAME`, or `MX` record pointing to the same origin server hosting your site, Cloudflare displays one of the following warnings:

`An A, AAAA, CNAME, or MX record is pointed to your origin server exposing your origin IP.`

`This record is exposing your origin server’s IP address, potentially exposing it to denial of service.`

A `dig` query against these records reveals your origin server’s IP address. This information makes it easier for potential attackers to target your origin server directly.

However, there are times when some of your DNS records need to remain DNS-only. For example, you may have to host multiple services (for example, a website and email) on the same physical server.

To mitigate this risk, we recommend that you:

-   Analyze the impact of hosting multiple services on the same origin server in cases when you cannot avoid having DNS-only records.
-   Proxy all records that share the same origin IP address as your apex domain and can be safely proxied through Cloudflare.
