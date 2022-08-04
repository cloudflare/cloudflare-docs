---
pcx_content_type: concept
title: Bypass WARP
weight: 6
---

# Excluding traffic from WARP

When the WARP client is deployed, all DNS requests and/or network traffic on the device are processed by Cloudflare by default. However, under certain circumstances, you may need to exclude DNS requests and/or explicitly exclude or include network traffic.

To do that, there are three settings you can configure:

*   **Use [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/exclude-traffic/local-domains/)** to instruct the WARP client to send DNS requests for a specified domain to a resolver that is not Cloudflare Gateway. This is useful when you have private hostnames that would not otherwise resolve on the public Internet.

{{<Aside type="warning">}}

DNS requests to domain names entered here will not be encrypted, monitored or subject to DNS policies by Cloudflare Gateway.

{{</Aside>}}

*   **Use the [Split Tunnels](/cloudflare-one/connections/connect-devices/warp/exclude-traffic/split-tunnels/) Exclude mode** to instruct the WARP client to ignore traffic to a specified set of IP addresses or domains. Any traffic that is destined to an IP address or domain defined in the Split Tunnels Exclude configuration will be ignored by the WARP client and handled by the local machine. Use this mode when you want the majority of your traffic encrypted and processed by Gateway, but need to exclude certain routes due to app compatibility, or if you need WARP to run alongside a VPN.

*   **Use the [Split Tunnels](/cloudflare-one/connections/connect-devices/warp/exclude-traffic/split-tunnels/) Include mode** mode to instruct the WARP client to only handle traffic to a specified set of IP addresses or domains. Any traffic that is not included by IP address or domains defined in the Split Tunnel Include configuration will be ignored by the WARP client and handled by the local machine. Use this mode when you only want specific traffic processed by Gateway, such as when using Tunnels for a specific resource.

{{<Aside type="warning">}}

Traffic excluded from WARP by Split Tunnel configuration will not be encrypted, managed or monitored by Cloudflare Gateway.

{{</Aside>}}