---
pcx_content_type: reference
title: WARP with legacy VPN
weight: 10
---

# WARP with legacy VPN

The Cloudflare WARP client can run alongside most legacy third-party VPNs. Because the WARP client and third-party VPN client both enforce firewall, routing, and DNS rules on your local device, the two products will compete with each other for control over IP and DNS traffic. To ensure compatibility make sure that:

- IP traffic is split tunneled between WARP and the VPN. All VPN traffic must bypass WARP and vice versa.
- The VPN bypasses/allows/excludes all domains, IPs, and ports listed in [WARP with firewall](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/).
- DNS resolution is handled by either WARP or the VPN. You must disable DNS filtering in one of the two products.

For the most stable and consistent connection, we recommend connecting your [private network or individual applications](/cloudflare-one/connections/connect-networks/private-net/) to Cloudflare instead of using a legacy VPN. However, until you can migrate, the following guidelines will help get your Zero Trust deployment up and running.

## Gateway with WARP

In [Gateway with WARP](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/#gateway-with-warp-default) mode, WARP must be allowed to capture and route all DNS traffic on the device. You can use [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/) to send DNS requests to a server behind your third-party VPN or firewall, but the request must first go through WARP's local DNS proxy. Refer to [WARP architecture](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/warp-architecture/) for more information about this requirement.

If you cannot disable DNS on your VPN, switch to [Secure Web Gateway without DNS filtering](#secure-web-gateway-without-dns-filtering) mode to disable DNS in WARP.

### 1. Configure the VPN

Perform these steps in your third-party VPN software. Refer to your VPN's documentation for specific instructions on how to configure these settings.

1. Enable split tunneling in the third-party VPN.

2. Disable DNS configuration in the third-party VPN.

### 2. Configure WARP

{{<render file="warp/_vpn-ip-traffic.md">}}

3. (Optional) In [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/), add the domains that you want to resolve using your VPN's private DNS servers. For example,
    | Domain | DNS Servers |
    | -------- | ----- |
    | `internal.wiki.intranet`  | `172.31.26.130`, `172.31.23.120` |

You can now [test](#test-the-configuration) if WARP runs alongside the VPN.

## Secure Web Gateway without DNS filtering

In [Secure Web Gateway without DNS filtering](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/#secure-web-gateway-without-dns-filtering) mode, WARP does not perform any DNS functions on the device. Therefore, all you need to do is split tunnel your IP traffic.

### 1. Configure the VPN

Enable split tunneling in your third-party VPN software. Refer to your VPN's documentation for specific instructions on how to configure this setting.

### 2. Configure WARP

{{<render file="warp/_vpn-ip-traffic.md">}}

3. In your device profile, verify that **Service mode** is set to **Secure Web Gateway without DNS filtering**.

## Test the configuration

We recommend enabling the WARP client before enabling your third-party VPN. Some third-party VPNs must be the last to edit a network's configuration or they will fail.

1. Connect the WARP client.
2. Connect the third-party VPN client.
3. To test your Split Tunnel configuration, connect to a private IP address that is behind the VPN. For example, you can open a terminal and run `ping <SERVER-IP>`.
4. To test your DNS configuration, connect to an internal domain that is behind the VPN. For example, you can open a browser and go to `internal.wiki.intranet`.

{{<Aside type="warning" header="Test before updates">}}

Once you have a configuration in place and working, make sure to thoroughly test compatibility before updating your VPN software. Compatibility testing with what are essentially competing software will need to be done with each new version.

{{</Aside>}}
