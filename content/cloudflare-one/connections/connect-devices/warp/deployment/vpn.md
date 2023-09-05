---
pcx_content_type: reference
title: WARP with legacy VPN
weight: 10
---

# WARP with legacy VPN

We understand that you may be required to run a legacy third-party VPN alongside the Cloudflare WARP client. Because the WARP client and third-party VPN both enforce firewall, routing, and DNS rules on your local device, the two products will compete with each other for control over network traffic.

For the most stable and consistent connection, we recommend using Cloudflare Tunnel to [connect your private network or individual applications](/cloudflare-one/connections/connect-networks/private-net/) to our global edge network. However, until you can migrate, the following guidelines will help get your Zero Trust deployment up and running.

## Requirements

The Cloudflare WARP client is compatible with most third-party VPN configurations assuming the following requirements are met:

* **WARP must be responsible for resolving all DNS traffic on your device.** The WARP client captures all DNS traffic and sends it to Gateway for policy enforcement. For WARP to function, DNS configuration settings must be disabled on your VPN. You can use features like [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/) to route DNS requests to a server behind your third-party VPN or firewall, but the WARP client must still proxy that traffic.

* **All traffic relating to the third-party VPN must bypass the WARP client.** You can configure [Split Tunnels mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) to exclude your VPN server from WARP.

## Configuring for compatibility

We recommend the following workflow when configuring WARP alongside a third-party VPN service.

1. Disable DNS configuration in your third-party VPN.
2. Ensure that your [Split Tunnels mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/) is set to **Exclude IPs and domains**.
3. In your Split Tunnels configuration, [add the following IP addresses](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/#add-a-route) to your Exclude list:

    * The IP address of the server your third-party VPN connects to.
    * The private IP address space your third-party VPN exposes.

4. (Optional) If your company uses fully qualified domain names such as `example.local`, [exclude your local domains](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/) from Gateway processing.

{{<Aside type="note" header="Start WARP first">}}

We recommend enabling the WARP client before enabling your third-party VPN. Some third-party VPNs must be the last to edit a network's configuration or they will fail.

{{</Aside>}}

{{<Aside type="note" header="Test before updates">}}

Once you have a configuration in place and working, we recommend thoroughly testing compatibility before updating your VPN software. Compatibility testing with what are essentially competing software will need to be done with each new version.

{{</Aside>}}
