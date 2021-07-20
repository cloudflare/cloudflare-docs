---
order: 1
pcx-content-type: concept
---

# About

<Aside type="note">

Client IP Geolocation is currently in closed Beta testing.

</Aside>

Cloudflare Client IP Geolocation helps you understand where in the world a given client is located, even if their true client IP address is obscured by Cloudflare's proxy systems. We offer this service to ensure customers have high-quality experiences interacting with origins that rely on geolocation — such as mapping providers — and origin operators can deliver the right content to the right users. Ensuring origins know where clients are located avoids problems associated with traditional VPNs that obscure a consumer’s geolocation and allow circumvention of geographic restrictions on content.

**Users cannot opt out of this geolocation support and Cloudflare will always make a best effort to convey geolocation.**

## Simple explanation

When Cloudflare connects to your origin over **IPv4**, we geolocate our VPN users to 1 of 1,000 egress locations (a `cell`). The list of cells is a super set of all the countries in the world and all US Designated Market Areas and includes multiple cells for large metropolitan areas. For all supported cell locations, download [our list](https://api.cloudflare.com/local-ip-ranges.csv).

When Cloudflare connects to your origin over **IPv6**, we geolocate our VPN users to one of thousands of locations distributed across the globe.

If a VPN user tries to use an interposed VPN or proxy system that attempts to hide their location, we share that information with downstream entities.

## Technical explanation

We map our egress IP addresses for our forward-proxy offerings to specific geolocations and continuously share this information with major geolocation database providers like *MaxMind*, *IP 2 Location*, and *Neustar*. 

When Cloudflare receives an inbound request from a WARP or 1.1.1.1 user, we first geolocate the IP address that made the connection to Cloudflare. Then, we select an egress IP that maps to the client geolocation. We then discard Client IP information to preserve user privacy but return their true geographic location. 

If the Client IP is a known proxy or VPN service without strong commitments to preserving client location, we return an unmapped/unknown location.

Because our cell list includes Designated Market Areas in the United States, you can use the returned geolocation information — or lack of it — to enforce content restrictions when delivering linear or on-demand video content subject to common licensing requirements.

## Example scenario

Jane is a Cloudflare WARP user in Glendive, Montana, USA. She is interested in the privacy benefits of using a VPN. Her client IP address is `108.59.112.0`, which is owned by [Mid-Rivers Telephone Cooperative](https://bgp.he.net/AS11961) and geolocates to 47.0984,-104.7275 (with a location accuracy of 50km using MaxMind’s GeoIP service).

![Cloudflare reports accurate location information, even over VPN](../static/client-ip-geolocation-example.png)

Jane connects to Cloudflare’s edge using a secure tunnel. Cloudflare operates an anycast network and dictates VPN ingress by anycast. Jane’s VPN traffic lands in the Cloudflare Minneapolis data center, [930km from Glendive](http://www.gcmap.com/mapui?P=GDV-MSP).

A naive geolocation implementation would provide unacceptably inaccurate information. It would have Jane geolocated to Minneapolis, which is in a totally different state — Minnesota instead of Montana — and Designated Marketing Area — Glendive, MT, the [country’s smallest DMA](https://mediatracks.com/resources/nielsen-dma-rankings-2020/), instead of Minneapolis, MN — from her true location. From a content distribution perspective, this level of geolocation is **not acceptable**.

Instead, Cloudflare uses its [own geolocation mapping](#how-it-works-detailed) to provide much more accurate information. Cloudflare’s edge would geolocate Jane’s client IP (`108.59.112.0`) to Glendive and select an egress IP address of `a.b.c.d` from its list of available egress IP addresses based on this geolocation result.

Jane attempts to watch live television via an over-the-top (OTT) video provider. The video provider’s origin sees a connection from `a.b.c.d`. A geolocation lookup on `a.b.c.d` returns Glendale, MT, and Jane is able to access the linear video content because the OTT provider is able to geolocate the VPN traffic to the true client location.