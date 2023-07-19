---
title: Network filtering
pcx_content_type: how-to
weight: 2
---

# Set up network filtering

Secure Web Gateway allows you to apply policies at the network level (Layers 3 and 4) to control which websites and non-HTTP applications users can access.

## 1. Connect to Gateway

### Connect devices

To filter network traffic from a device such as a laptop or phone:

1. [Install the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) on your device.
2. In the WARP client Settings, log in to your organization’s [Zero Trust instance](/cloudflare-one/glossary/#team-name).
3. (Optional) If you want to display a [custom block page](/cloudflare-one/policies/filtering/configuring-block-page/), [install the Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/) on your device .
4. Enable the Gateway proxy:
   1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Network**.
   2. Enable **Proxy** for TCP.
   3. (Optional) Enable **Proxy** for UDP. All port 443 UDP traffic will be inspected by Gateway.

### Connect private networks

To filter traffic from private networks, refer to the [Cloudflare Tunnel guide](/cloudflare-one/connections/connect-networks/).

## 2. Verify device connectivity

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **Network**.
2. Under **Gateway logging**, enable activity logging for all Network logs.
3. On your WARP-enabled device, open a browser and visit any website.
4. Determine the **Source IP** for your device:
   1. Open the WARP client settings.
   2. Go to **Preferences** > **General**.
   3. Note the **Public IP**.
5. In Zero Trust, go to **Logs** > **Gateway** > **Network**. Before building Network policies, make sure you see Network logs from the Source IP assigned to your device.

## 3. Add policies

To create a new network policy, go to **Gateway** > **Firewall Policies** > **Network** in Zero Trust. Refer to our list of [common network policies](/cloudflare-one/policies/filtering/network-policies/common-policies) for policies you may want to create.
