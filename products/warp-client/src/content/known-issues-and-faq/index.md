---
title: FAQ
order: 6
---

# FAQ

## Known issues

Applications or sites that rely on location information to enforce content licensing agreements (certain games, video streaming, music streaming, radio streaming, etc.) may not function properly. We are working on a product update that will allow these clients to work, by not sending their traffic through WARP.

---------------------

## Frequently asked questions

### Why am I not connecting to a closer Cloudflare point of presence?

As our [Network Map](https://www.cloudflare.com/network/) shows, we have locations all over the globe. However, in the Advanced Connection stats of our application, you may notice that the point of presence (colo) you are connecting to isn't necessarily the one physically closest to your location. This can be due to a number of reasons:
* We work hard to prevent it, but sometimes your nearest colo might be having problems; [check here](https://www.cloudflarestatus.com/?_ga=2.155811579.1117044671.1600983837-1079355427.1599074097) for system status.
* Your Internet provider may choose to route traffic along an alternate path for reasons such as cost savings, reliability, or other infrastructure concerns.
* Not all Cloudflare locations are WARP enabled. We are constantly evaluating performance and how users are connecting, bringing more colos online with WARP all the time.

### Why is my public IP address sometimes visible?

Cloudflare WARP Client in WARP mode was meant to ensure all your traffic is kept private between you and the [origin](https://www.cloudflare.com/learning/cdn/glossary/origin-server/) (the site you are connecting to), but not <i>from</i> the origin itself. In a number of cases, if the origin site you are communicating with can't determine who you are and where you're from, they can't serve locale relevant content to you.

Sites inside Cloudflare network are able to see this information. If a site is showing you your IP address, chances are they are in our network. Most sites outside our network (orange clouded sites) however are unable to see this information and instead see the nearest egress colo to their server. We are working to see if in the future we can't find a way to more easily share this information with a limited number of gray clouded sites where it is relevant to both parties.

### My throughput has dropped while using WARP

Cloudflare WARP is in part powered by 1.1.1.1, the world's fastest DNS resolver. When visiting sites or going to a new location on the Internet, you should see blazing fast DNS lookups. WARP however is built to trade some throughput for enhanced privacy by encrypting all traffic both to and from your device. While this isn't noticeable at most mobile speeds, on desktop systems in countries where high speed broadband is available, you may notice a drop. We think the tradeoff is worth it though and continue to work on improving performance all over the system.
