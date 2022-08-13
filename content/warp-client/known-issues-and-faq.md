---
title: FAQ
pcx_content_type: faq
weight: 5
---

# FAQ

Below you will find answers to our most commonly asked questions regarding the WARP client. If you cannot find the answer you are looking for, refer to the [community page](https://community.cloudflare.com/) to explore more resources.

## Why am I not connecting to a closer Cloudflare data center?

As our [Network Map](https://www.cloudflare.com/network/) shows, we have locations all over the globe. However, in the Advanced Connection stats of our application, you may notice that the server you are connecting to is not necessarily the one physically closest to your location. This can be due to a number of reasons:

- We work hard to prevent it, but sometimes your nearest server might be having problems. [Check the system status](https://www.cloudflarestatus.com/?_ga=2.155811579.1117044671.1600983837-1079355427.1599074097) for more information.
- Your Internet provider may choose to route traffic along an alternate path for reasons such as cost savings, reliability, or other infrastructure concerns.
- Not all Cloudflare locations are WARP enabled. We are constantly evaluating performance and how users are connecting, bringing more servers online with WARP all the time.

## Why is my public IP address sometimes visible?

Cloudflare WARP Client in WARP mode was meant to ensure all your traffic is kept private between you and the [origin server](https://www.cloudflare.com/learning/cdn/glossary/origin-server/) (that is, the site you are connecting to), but not from the origin itself. In a number of cases, if the origin site you are communicating with cannot determine who you are and where you are from, it cannot serve locale-relevant content to you (that is, anything related to a customized user experience, such as language or regional configurations).

Sites inside Cloudflare's network are able to see this information. If a site is showing you your IP address, chances are they are in our network. Most sites outside our network, however, are unable to see this information and instead see the nearest egress server to their server. We are working to see if in the future we can find a way to more easily share this information with a limited number of sites outside Cloudflare's network, where it is relevant to both parties.

## Why has my throughput dropped while using WARP?

Cloudflare WARP is in part powered by 1.1.1.1, the world's fastest DNS resolver. When visiting sites or going to a new location on the Internet, you should see fast DNS lookups. WARP, however, is built to trade some throughput for enhanced privacy, by encrypting all traffic both to and from your device. While this is not noticeable at most mobile speeds, on desktop systems in countries where high-speed broadband is available, you may notice a drop. We think the tradeoff is worth it and continue to work on improving performance all over the system.

## What about the performance of the WARP app?

Cloudflare WARP and the 1.1.1.1 with WARP applications go through performance testing that includes battery, network and CPU on a regular basis. In addition, both applications are used by millions of users worldwide that help us stay on top of issues across a wide variety of devices, networks, sites and applications.

## What is the version of .NET Framework required for the Windows client?

The WARP client for Windows requires .NET Framework version 4.7.2 or later to be installed on your computer.

---

## Known issues

Applications or sites that rely on location information to enforce content licensing agreements (for example, certain games, video streaming, music streaming, or radio streaming) may not function properly. We are working on a product update that will allow these clients to work, by not sending their traffic through WARP.
