---
pcx_content_type: faq
title: Devices
weight: 6
meta:
    description: Review frequently asked questions about devices in Cloudflare Zero Trust.
---

[❮ Back to FAQ](/cloudflare-one/faq/)

# Devices

## Why does my Windows device appear to switch from Wi-Fi to Ethernet when I enable WARP?

As the WARP client has replaced WinDivert with WinTun architecture, all Windows machines using WinTun will show as being connected using a virtual adapter. Windows, by default, shows virtual adapter connections with a wired Ethernet connection icon, even if the device is connected over wireless. This is by design and should have no impact on connectivity.

## Why is my device not connecting to a closer Cloudflare data center?

As our [Network Map](https://www.cloudflare.com/en-gb/network/) shows, we have locations all over the globe. However, in the Advanced Connection stats of our application, you may notice that the data center (colo) you are connecting to isn't necessarily the one physically closest to your location. This can be due to a number of reasons:

- Sometimes your nearest colo might be having problems, although we work hard to prevent it. Check [here](https://www.cloudflarestatus.com/?_ga=2.155811579.1117044671.1600983837-1079355427.1599074097) for system status.
- Your Internet provider may choose to route traffic along an alternate path for reasons such as cost savings, reliability, or other infrastructure concerns.
- Not all Cloudflare data centers are WARP-enabled. We are constantly evaluating performance and how users are connecting, bringing more colos online with WARP all the time.

## Why is my public IP address sometimes visible?

Cloudflare WARP Client in WARP mode was meant to ensure all your traffic is kept private between you and the origin (the site you are connecting to), but not from the origin itself. In a number of cases, if the origin site you are communicating with can't determine who you are and where you're from, they can't serve locale relevant content to you.
Sites inside Cloudflare network are able to see this information. If a site is showing you your IP address, chances are they are in our network. Most sites outside our network (orange clouded sites) however are unable to see this information and instead see the nearest egress colo to their server. We are working to see if in the future we can't find a way to more easily share this information with a limited number of gray clouded sites where it is relevant to both parties.

## Why has my throughput dropped while using WARP?

Cloudflare WARP is in part powered by 1.1.1.1. When visiting sites or going to a new location on the Internet, you should see blazing fast DNS lookups. However, WARP is built to trade some throughput for enhanced privacy, because it encrypts all traffic both to and from your device. While this isn't noticeable at most mobile speeds, on desktop systems in countries where high speed broadband is available, you may notice a drop. We think the tradeoff is worth it though and continue to work on improving performance all over the system.

## Why is my device not connecting to a public Wi-Fi?

The Wi-Fi network may have a captive portal that is blocking WARP from establishing a secure connection. In order to access the portal, and therefore the Internet, you will need to temporarily disable WARP. After you login to the captive portal through your browser, you can re-enable WARP to access corporate resources.

To allow end users to connect through a captive portal, administrators can do the following:

1. Enable [Lock WARP switch](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#lock-warp-switch).
2. Enable [Captive portal detection](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#captive-portal-detection).
3. Set an [Auto connect](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#auto-connect) time period.
4. If WARP fails to automatically detect a portal, provide an [admin override code](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-settings/#admin-override) to your end users. This will allow users to manually turn off WARP and connect to the portal. WARP will automatically turn back on after the auto connect period.

## Why is my device not connecting to the Internet after I deploy WARP?

A third-party service or ISP may be blocking WARP, or Zero Trust settings may be misconfigured. For a list of common issues and steps to resolve, refer to our [troubleshooting guide](/cloudflare-one/connections/connect-devices/warp/troubleshooting/common-issues/).

## Why is my device not connecting to my private network?

If your private network is [exposed via Cloudflare Tunnel](/cloudflare-one/connections/connect-networks/private-net/connect-private-networks/):

- Verify that the WARP client is [properly configured](/cloudflare-one/connections/connect-networks/private-net/connect-private-networks/#device-configuration) on the device.
- Verify that the user is allowed through by your Access and Gateway policies.
- Verify that the [local LAN settings](/cloudflare-one/connections/connect-networks/private-net/connect-private-networks/#router-configuration) for the device do not overlap with the CIDR range of your private network.

When contacting Cloudflare support, ensure that you include [WARP debug logs](/cloudflare-one/connections/connect-devices/warp/troubleshooting/warp-logs/) for your device. These logs will help Cloudflare support understand the overall architecture of your machine and networks.
