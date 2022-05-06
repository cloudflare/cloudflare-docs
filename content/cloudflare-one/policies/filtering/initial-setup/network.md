---
title: Network filtering
pcx-content-type: how-to
weight: 2
meta:
  title: Set up Network filtering
---

# Set up Network filtering

Secure Web Gateway allows you to inspect Network traffic and control which websites and non-HTTP applications users can access.

## 1. Connect to Gateway

### Connect devices

To filter network traffic from a device such as a laptop or phone:

1. [Install the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) on your device.
2. In the WARP client Settings, log in to your organization’s [Zero Trust instance](/cloudflare-one/glossary/#team-name).
3. (Optional) If you want to display a [custom block page](/cloudflare-one/policies/filtering/configuring-block-page/), [install the Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/install-cloudflare-cert/) on your device .
4. Enable the Gateway proxy:
    1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Settings** > **Network**.
    2. Enable **Proxy** for TCP.
    3. (Optional) Enable **Proxy** for UDP.  All port 443 UDP traffic will be inspected by Gateway except when using QUIC. QUIC traffic will only be proxied.

### Connect private networks

To filter traffic from private networks, refer to the [Cloudflare Tunnel guide](/cloudflare-one/connections/connect-apps/).

## 2. Verify device connectivity

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com), navigate to **Settings** > **Network**.
2. Under **Gateway logging**, enable activity logging for all Network logs.
3. On your WARP-enabled device, open a browser and visit any website.
4. Determine the **Source IP** for your device:
    1. Open the WARP client settings.
    2. Navigate to **Preferences** > **General**.
    3. Note the **Public IP**.
5. In the Zero Trust dashboard, navigate to **Logs** > **Gateway** > **Network**.  Before building Network policies,  make sure you see Network logs from the Source IP assigned to your device.

## 3. Add recommended policies

To create a new DNS policy, navigate to **Gateway** > **Policies** > **DNS** in the Zero Trust dashboard. We recommend adding the following policy:

  {{<render file="_policies-recommended.md">}}

## 4. Add optional policies

Refer to our list of [common Network policies](/cloudflare-one/policies/filtering/network-policies/common-policies) for other policies you may want to create.
