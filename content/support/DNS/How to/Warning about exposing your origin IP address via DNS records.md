---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115003687931-Warning-about-exposing-your-origin-IP-address-via-DNS-records
title: Warning about exposing your origin IP address via DNS records
---

# Warning about exposing your origin IP address via DNS records



## Overview

When your DNS records are orange-clouded, Cloudflare speeds up and protects your site.

A _dig_ query against your orange-clouded root domain returns a Cloudflare IP address. This way, your origin server’s IP address remains concealed from the public. Remember that orange cloud benefits only apply to HTTP traffic.

Under certain circumstances, the **DNS Records** panel in the Cloudflare dashboard **DNS** app displays a warning whenever you have grey-clouded DNS records that may expose your origin server’s IP address. This warning does not block, or in any way affect, traffic destined to your site.

When your server’s IP address is exposed, your server is more vulnerable to direct attacks.  It is still possible (but more difficult) for attackers to determine your origin server IP address when proxying traffic to Cloudflare.

Below are two cases where you might receive an IP exposure warning from Cloudflare.

___

## Case 1 - DNS records that should be orange-clouded

If you receive the following warning:

_`This record is exposing your origin server’s IP address. To hide your origin IP address, and increase your server security, click on the grey cloud to change it to orange.`_

Cloudflare recommends orange-clouding the record so that any dig query against that record returns a Cloudflare IP address and your origin server IP address remains concealed from the public.

To take advantage of Cloudflare’s performance and security benefits, we recommend you orange-cloud DNS records that handle HTTP traffic, including A, AAAA, and CNAME.

___

## Case 2 - DNS records that need to be grey-clouded

When you have a grey-clouded _A_, _AAAA_, _CNAME_, or _MX_ record pointing to the same origin server hosting your site, Cloudflare displays one of the following warnings:

_`An A, AAAA, CNAME, or MX record is pointed to your origin server exposing your origin IP.`_

_`This record is exposing your origin server’s IP address, potentially exposing it to denial of service.`_

{{<Aside type="info">}}
Cloudflare now supports proxying wildcard \'\*\' record for DNS
management in all customer plans. This used to only be offered to
Enterprise plans.
{{</Aside>}}

A _dig_ query against these records reveals your origin server’s IP address. This information makes it easier for potential attackers to target your origin server directly.

However, there are times when some of your DNS records need to remain grey-clouded. For example:

-   When you have to host multiple services (for example, a website and email) on the same physical server

To mitigate this risk, we recommend that you:

-   Analyze the impact of hosting multiple services on the same origin server in cases when having grey-clouded DNS records can’t be avoided
-   Orange-cloud all records that share the same origin IP address as your root domain and can be safely proxied through Cloudflare
