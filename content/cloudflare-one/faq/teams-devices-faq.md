---
pcx_content_type: faq
title: Devices
weight: 6
meta:
    description: Review frequently asked questions about devices in Cloudflare Zero Trust.
---

[❮ Back to FAQ](/cloudflare-one/faq/)

# Devices

## Why is my device not connecting to a closer Cloudflare data center?

As our [Network Map](https://www.cloudflare.com/en-gb/network/) shows, we have locations all over the globe. However, in the Advanced Connection stats of our application, you may notice that the data center (colo) you are connecting to isn't necessarily the one physically closest to your location. This can be due to a number of reasons:

- Sometimes your nearest colo might be having problems, although we work hard to prevent it. Check [here](https://www.cloudflarestatus.com/?_ga=2.155811579.1117044671.1600983837-1079355427.1599074097) for system status.
- Your Internet provider may choose to route traffic along an alternate path for reasons such as cost savings, reliability, or other infrastructure concerns.
- Not all Cloudflare data centers are WARP-enabled. We are constantly evaluating performance and how users are connecting, bringing more colos online with WARP all the time.

## Why is my public IP address sometimes visible?

Cloudflare WARP Client in WARP mode was meant to ensure all your traffic is kept private between you and the origin (the site you are connecting to), but not from the origin itself. In a number of cases, if the origin site you are communicating with can't determine who you are and where you're from, they can't serve locale relevant content to you.
Sites inside Cloudflare network are able to see this information. If a site is showing you your IP address, chances are they are in our network. Most sites outside our network (orange clouded sites) however are unable to see this information and instead see the nearest egress colo to their server. We are working to see if in the future we can't find a way to more easily share this information with a limited number of gray clouded sites where it is relevant to both parties.

## Why has my throughput dropped while using WARP?

Cloudflare WARP is in part powered by 1.1.1.1. When visiting sites or going to a new location on the Internet, you should see blazing fast DNS lookups. However, WARP is built to trade some throughput for enhanced privacy, because it encryps all traffic both to and from your device. While this isn't noticeable at most mobile speeds, on desktop systems in countries where high speed broadband is available, you may notice a drop. We think the tradeoff is worth it though and continue to work on improving performance all over the system.

## Why is my device not connecting to my private network?

If your private network is [exposed via Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/private-net/connect-private-networks/):

- Verify that the WARP client is [properly configured](/cloudflare-one/connections/connect-apps/private-net/connect-private-networks/#device-configuration) on the device.
- Verify that the user is allowed through by your Access and Gateway policies.
- Verify that the [local LAN settings](/cloudflare-one/connections/connect-apps/private-net/connect-private-networks/#router-configuration) for the device do not overlap with the CIDR range of your private network.

When contacting Cloudflare support, ensure that you include [WARP Client logs](/cloudflare-one/connections/connect-devices/warp/warp-logs/) for your device. These logs will help Cloudflare support understand the overall architecture of your machine and networks.
