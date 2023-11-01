---
pcx_content_type: reference
title: WARP with legacy VPN
weight: 10
---

# WARP with legacy VPN

The Cloudflare WARP client can run alongside most legacy third-party VPNs. Because the WARP client and third-party VPN both enforce firewall, routing, and DNS rules on your local device, the two products will compete with each other for control over network traffic. You must therefore configure both products such that traffic on the device either routes through WARP or the VPN.

For the most stable and consistent connection, we recommend connecting your [private network or individual applications](/cloudflare-one/connections/connect-networks/private-net/) to Cloudflare.  However, until you can migrate, the following guidelines will help get your Zero Trust deployment up and running. The configuration guidelines vary depending on your [WARP mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/).

## Gateway with WARP

To run a third-party VPN alongside WARP in [Gateway with WARP](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/#gateway-with-warp-default) mode:

### 1. Configure the VPN

Perform these steps in your third-party VPN software. Refer to your VPN's documentation for specific instructions on how to configure these settings.

1. Enable split tunneling in the third-party VPN.

2. Disable DNS configuration in the third-party VPN.

WARP must be allowed to capture and route all DNS traffic on the device. You can configure WARP to send DNS requests to a server behind your third-party VPN or firewall, but all DNS traffic must first go through WARP's local DNS proxy. Refer to the [WARP architecture guide](/connections/connect-devices/warp/configure-warp/route-traffic/warp-architecture/) for more information about this requirement. If you cannot disable DNS on your VPN, consider switching to [Secure Web Gateway without DNS filtering](#secure-web-gateway-without-dns-filtering) mode.

### 2. Configure WARP

Perform these steps in [Zero Trust](https://one.dash.cloudflare.com/).

1. Ensure that your [Split Tunnels mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/#change-split-tunnels-mode) is set to **Exclude IPs and domains**.
2. All VPN traffic must bypass the WARP client. [Add the following IP addresses](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/#add-a-route) to your Split Tunnel Exclude list:

    * The IP address of the server your third-party VPN connects to.
    * The private IP address space your third-party VPN exposes.

3. (Optional) If your company uses fully qualified domain names such as `example.local`, [exclude your local domains](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/) from Gateway processing.

## Secure Web Gateway without DNS filtering

To run a third-party VPN alongside WARP in [Secure Web Gateway without DNS filtering](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/#secure-web-gateway-without-dns-filtering) mode:

### 1. Configure the VPN

### 2. Configure WARP

## Test the configuration

We recommend enabling the WARP client before enabling your third-party VPN. Some third-party VPNs must be the last to edit a network's configuration or they will fail.



{{<Aside type="note" header="Test before updates">}}

Once you have a configuration in place and working, we recommend thoroughly testing compatibility before updating your VPN software. Compatibility testing with what are essentially competing software will need to be done with each new version.

{{</Aside>}}
