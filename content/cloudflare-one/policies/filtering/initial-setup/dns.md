---
title: DNS filtering
pcx_content_type: how-to
weight: 1
meta:
  title: Set up DNS filtering
---

# Set up DNS filtering

Secure Web Gateway allows you to inspect DNS traffic and control which websites users can visit.

## 1. Connect to Gateway

### Connect devices

To filter DNS requests from an individual device such as a laptop or phone:

1. [Install the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) on your device.
2. In the WARP client Settings, log in to your organization’s [Zero Trust instance](/cloudflare-one/glossary/#team-name).
3. (Optional) If you want to display a [custom block page](/cloudflare-one/policies/filtering/configuring-block-page/), [install the Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/) on your device .

### Connect DNS locations

To filter DNS requests from a location such as an office or data center:

1. [Add the location](/cloudflare-one/connections/connect-devices/agentless/dns/locations/) to your Zero Trust settings.
2. On your router, browser, or OS, forward DNS queries to the address shown in the location setup UI.

{{<Aside type="note">}}
Gateway identifies locations differently depending on the DNS query protocol:

- **IPv4 queries** match to the source IP address. Under **Gateway** > **DNS Locations**, ensure that the **Source IPv4 Address** parameter is correct for the location you want to apply policies to.
- **IPv6, DOT, or DOH queries** match to the unique DNS forwarding address assigned to the DNS location. Ensure that your DNS resolver is configured for the location you want to apply policies to.
  {{</Aside>}}

## 2. Verify device connectivity

1. In [Zero Trust](https://one.dash.cloudflare.com), navigate to **Settings** > **Network**.
2. Under **Gateway logging**, enable activity logging for all DNS logs.
3. On your WARP-enabled device, open a browser and visit any website.
4. In Zero Trust, navigate to **Logs** > **Gateway** > **DNS**. Before building DNS policies, make sure you see DNS queries from the email associated with your device.

## 3. Add recommended policies

To create a new DNS policy, navigate to **Gateway** > **Firewall Policies** > **DNS** in Zero Trust. We recommend adding the following policy:

{{<render file="gateway/_policies-recommended.md">}}

## 4. Add optional policies

Refer to our list of [common DNS policies](/cloudflare-one/policies/filtering/dns-policies/common-policies) for other policies you may want to create.
