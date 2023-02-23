---
pcx_content_type: reference
title: WARP modes
weight: 2
layout: single
---

# WARP modes

You can deploy the WARP client in different modes to control the types of traffic sent to Cloudflare Gateway. The WARP mode determines which Zero Trust features are available on the device.

### Gateway with WARP (default)

This mode is best suited for organizations that want to use advanced firewall/proxy functionalities and enforce device posture rules.

| DNS filtering | HTTP filtering | Features enabled |
| ------------- | -------------- | ---------------- |
| Yes | Yes | DNS policies, HTTP policies, Browser Isolation, identity-based policies, device posture checks, AV scanning, and Data Loss Prevention |

### Gateway with DoH

This mode is best suited for organizations that only want to apply DNS filtering to outbound traffic from their company devices. Network and HTTP traffic is handled by the default mechanisms on your devices.

| DNS filtering | HTTP filtering | Features enabled |
| ------------- | -------------- | ---------------- |
| Yes | No | DNS policies |

### Proxy mode

This mode is best suited for organizations that want to filter traffic directed to specific applications.

| DNS filtering | HTTP filtering | Features enabled |
| ------------- | -------------- | ---------------- |
| No | Yes | HTTP policies, Browser Isolation, identity-based policies, AV scanning, and Data Loss Prevention for traffic sent through localhost proxy|

{{<Aside type="note">}}

 * Proxy mode can only be used by applications/operating systems that support SOCKS5/HTTPS proxy communication.
 * This mode is only available on Windows, Linux, and macOS.

{{</Aside>}}

### Device Information Only

This mode is best suited for organizations that only want to enforce device posture for Access applications. DNS, Network and HTTP traffic is handled by the default mechanisms on your devices.

| DNS filtering | HTTP filtering | Features enabled |
| ------------- | -------------- | ---------------- |
| No | No | Device posture rules in [Access policies](/cloudflare-one/policies/access/) |

When you enroll a device in Device Information Only mode, the WARP client will automatically create and install a client certificate on the device (unless you have previously installed the [Cloudflare certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/install-cloudflare-cert/)). The client certificate is necessary to confirm the source of outgoing traffic. You can view the certificate on the [Cloudflare dashboard](https://dash.cloudflare.com/) by selecting your domain and going to **SSL/TLS** > **Client Certificates**.
