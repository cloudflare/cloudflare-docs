---
pcx_content_type: reference
title: WARP with legacy VPN
weight: 10
---

# WARP with legacy VPN

The Cloudflare WARP client can run alongside most legacy third-party VPNs. Because the WARP client and third-party VPN client both enforce firewall, routing, and DNS rules on your local device, the two products will compete with each other for control over IP and DNS traffic. To ensure compatibility:

- IP traffic is split tunneled between WARP and the VPN. All VPN traffic must bypass WARP (and vice versa).
- DNS resolution is handled by either WARP or the VPN. You must disable DNS filtering in one of the two products.

For the most stable and consistent connection, we recommend connecting your [private network or individual applications](/cloudflare-one/connections/connect-networks/private-net/) to Cloudflare.  However, until you can migrate, the following guidelines will help get your Zero Trust deployment up and running.

## Gateway with WARP

In [Gateway with WARP](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/#gateway-with-warp-default) mode, WARP must be allowed to capture and route all DNS traffic on the device. You can use [Local Domain Fallback](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/local-domains/) to send DNS requests to a server behind your third-party VPN or firewall, but the request must first go through WARP's local DNS proxy. Refer to [WARP architecture](/connections/connect-devices/warp/configure-warp/route-traffic/warp-architecture/) for more information about this requirement.

If you cannot disable DNS on your VPN, switch to [Secure Web Gateway without DNS filtering](#secure-web-gateway-without-dns-filtering) mode to disable DNS in WARP.

### 1. Configure the VPN

Perform these steps in your third-party VPN software. Refer to your VPN's documentation for specific instructions on how to configure these settings.

1. Enable split tunneling in the third-party VPN.

2. Disable DNS configuration in the third-party VPN.

### 2. Configure WARP

Perform these steps in [Zero Trust](https://one.dash.cloudflare.com/).

1. Set your [Split Tunnels mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/#change-split-tunnels-mode) to **Exclude IPs and domains**.
2. [Add the following entries](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/split-tunnels/#add-a-route) to your Split Tunnel Exclude list:

    - Private IP address range exposed by your third-party VPN client. For example,
    | Selector | Value |
    | -------- | ----- |
    | IP Address   | `172.16.0.0/12` |
    |
    - Server that your third-party VPN client connects to. For example,
    | Selector | Value |
    | -------- | ----- |
    | Domain   | `*.cvpn-endpoint-xxxxx.prod.clientvpn.us-west-2.amazonaws.com` |

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

## Test the configuration

We recommend enabling the WARP client before enabling your third-party VPN. Some third-party VPNs must be the last to edit a network's configuration or they will fail.



{{<Aside type="note" header="Test before updates">}}

Once you have a configuration in place and working, we recommend thoroughly testing compatibility before updating your VPN software. Compatibility testing with what are essentially competing software will need to be done with each new version.

{{</Aside>}}
