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

1. [Install the Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/install-cloudflare-cert/) on your device .
2. [Install the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) on your device.
3. In the WARP client Settings, log in to your organization’s [Zero Trust instance](/cloudflare-one/glossary/#team-name).
4. Enable the Gateway proxy:
    1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Settings** > **Network**.
    2. Enable **Proxy** for TCP.
    3. (Optional) Enable **Proxy** for UDP. All port 443 UDP traffic will be inspected by Gateway except when using QUIC. QUIC traffic will only be proxied.
    4. Enable **TLS decryption**.

## 2. Verify device connectivity

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Settings** > **Network**.
2. Under **Gateway logging**, enable activity logging for all HTTP logs.
3. On your WARP-enabled device, open a browser and visit any website.
4. In the Zero Trust dashboard, navigate to **Logs** > **Gateway** > **HTTP**. Before building HTTP policies, make sure you see HTTP queries from the email associated with your device.

## 3. Add recommended policies

To create a new HTTP policy, navigate to **Gateway** > **Policies** > **HTTP** in the Zero Trust dashboard. 
We recommend adding the following policies:

### Bypass inspection for incompatible applications

Bypass HTTP inspection for applications which use [embedded certificates](/cloudflare-one/policies/filtering/http-policies/tls-decryption/#limitations).
This will help avoid any certificate pinning errors that may arise from an initial rollout.

| Selector      | Operator | Value           | Action         |
| --------------| ---------| ----------------| -------------- |
| Application   | in       | Do Not Inspect | Do Not Inspect |

  {{<render file="_policies-recommended.md">}}

## 4. Add optional policies

Refer to our list of [common HTTP policies](/cloudflare-one/policies/filtering/http-policies/common-policies) for other policies you may want to create.
