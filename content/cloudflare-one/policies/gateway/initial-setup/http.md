---
title: HTTP filtering
pcx_content_type: how-to
weight: 3
meta:
  title: Set up HTTP filtering
---

# Set up HTTP filtering

Secure Web Gateway allows you to inspect HTTP traffic and control which websites users can visit.

## 1. Connect to Gateway

To filter HTTP requests from a device:

1. [Install the Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/) on your device.
2. [Install the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) on your device.
3. In the WARP client Settings, log in to your organization’s [Zero Trust instance](/cloudflare-one/glossary/#team-name).
4. [Enable the Gateway proxy](/cloudflare-one/policies/gateway/proxy/#enable-the-gateway-proxy) for TCP. Optionally, you can enable the UDP proxy to inspect all port 443 UDP traffic.
5. To inspect HTTPS traffic, [enable TLS decryption](/cloudflare-one/policies/gateway/http-policies/tls-decryption/#enable-tls-decryption).

## 2. Verify device connectivity

{{<render file="gateway/_verify-connectivity.md" withParameters="HTTP">}}

## 3. Add recommended policies

To create a new HTTP policy, go to **Gateway** > **Firewall Policies** > **HTTP** in Zero Trust.
We recommend adding the following policies:

### Bypass inspection for incompatible applications

Bypass HTTP inspection for applications which use [embedded certificates](/cloudflare-one/policies/gateway/http-policies/tls-decryption/#limitations).
This will help avoid any certificate pinning errors that may arise from an initial rollout.

| Selector    | Operator | Value          | Action         |
| ----------- | -------- | -------------- | -------------- |
| Application | in       | Do Not Inspect | Do Not Inspect |

### Block all security categories

Block [known threats](/cloudflare-one/policies/gateway/domain-categories/#security-categories) such as Command & Control, Botnet and Malware based on Cloudflare’s threat intelligence.

{{<render file="gateway/_block-security-categories.md">}}

## 4. Add optional policies

Refer to our list of [common HTTP policies](/cloudflare-one/policies/gateway/http-policies/common-policies) for other policies you may want to create.
