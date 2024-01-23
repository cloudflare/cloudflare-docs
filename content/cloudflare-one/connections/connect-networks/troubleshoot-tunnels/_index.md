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

## 4. Is the user matching the correct Gateway policy?

1. To determine the policy that was matched:
    1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Logs** > **Gateway**.
    2. Select the **DNS**, **Network**, or **HTTP** tab.
    3. Apply the following filters:
        - **Email**: User’s email address
        - **Date Time Range**: Time period when the user accessed the application
    4. In the search box, filter by the destination IP or FQDN.
    5. In the results, select a log and note its **Policy Name** value.
2. In **Gateway** > **Firewall Policies**, compare the [order of enforcement](/cloudflare-one/policies/gateway/order-of-enforcement/) of the matched policy and the intended policy.
3. Cross-reference the log fields with the policy that should have matched.

### Verify user identity values

If the mismatched log field is related to user identity, check the identity registry and verify OIDC groups used on the Policy are being reported for the user generating the traffic

If the information is not updated with the new OIDC groups, ask the user to Re-authenticate WARP locally on the WARP endpoint (Preferences - Account - ‘Re-Authenticate Session’)

### Verify device posture values

If device posture related, check the device details and confirm Device Posture Checks used on the policy are passed for the users’ endpoint
Go to My Team - Devices - Click on the device - View Details - Posture Checks

## 5. Is the Gateway proxy enabled?

Go to **Settings** > **Network** and ensure that **Proxy** is enabled for TCP, UDP, and ICMP traffic.

## 6. Is the user's traffic reaching the tunnel?

## 7. Is the tunnel forwarding requests to the origin service?

## 8. How is the origin service handling requests?

## 9. Is TLS inspection affecting the connection to the origin service?