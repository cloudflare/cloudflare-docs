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

This mode is best suited for organizations that only want to enforce [WARP client device posture checks](/cloudflare-one/identity/devices/warp-client-checks/) for zones in your account. DNS, Network and HTTP traffic is handled by the default mechanisms on your devices. To setup Device Information Only mode, refer to the [dedicated page](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/device-information-only/).

| DNS filtering | HTTP filtering | Features enabled |
| ------------- | -------------- | ---------------- |
| No | No | Device posture rules in [Access policies](/cloudflare-one/policies/access/)|
