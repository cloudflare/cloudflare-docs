---
pcx_content_type: how-to
title: Troubleshoot tunnels
weight: 6
---

# Troubleshoot Cloudflare Tunnel

Follow this troubleshooting procedure when users have issues connecting to your Cloudflare Tunnel applications.

## 1. Is WARP connected to Cloudflare?

1. Check that your firewall allows the [WARP IPs and domains](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/).
2. Check if there are other proxies or VPN client on the device. If so, review our [WARP with legacy VPN](/cloudflare-one/connections/connect-devices/warp/deployment/vpn/) guide to ensure compatibility.
3. Use [WARP debug logs](/cloudflare-one/connections/connect-devices/warp/troubleshooting/common-issues/#unable-to-connect-warp) to identify the root cause of connectivity issues.

## 2. Is the user's traffic going through WARP?

[Check the system routing table](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/warp-architecture/#routing-table) for the destination endpoint you are trying to reach. Make sure that traffic to your destination routes through the Cloudflare WARP interface.

## 3. Is the user blocked by a Gateway policy?

To check if a Gateway block event occurred:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Logs** > **Gateway**.
2. Select the **DNS**, **Network**, or **HTTP** tab.
3. Apply the following filters:
    - **Email**: User’s email address
    - **Event**: _Blocked_
    - **Date Time Range**: Time period when the user accessed the application

### Verify user identity values

### Verify device posture values

## 4. Is the Gateway proxy enabled?

Go to **Settings** > **Network** and ensure that **Proxy** is enabled for TCP, UDP, and ICMP traffic.

## 5. Is the user's traffic reaching the tunnel?

## 6. Is the tunnel forwarding requests to the origin service?

## 7. How is the origin service handling requests?

## 8. Is TLS inspection affecting the connection to the origin service?