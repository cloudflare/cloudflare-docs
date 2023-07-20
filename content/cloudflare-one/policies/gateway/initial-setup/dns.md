---
title: DNS filtering
pcx_content_type: how-to
weight: 1
meta:
  title: Set up DNS filtering
---

# Set up DNS filtering

Secure Web Gateway allows you to inspect DNS traffic and control which websites users can visit.

{{<Aside type="note">}}
For a more detailed guide to filtering DNS queries, refer to [Get started with DNS filtering](/learning-paths/dns-filtering/).
{{</Aside>}}

## 1. Connect to Gateway

### Connect devices

To filter DNS requests from an individual device such as a laptop or phone:

1. [Install the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) on your device.
2. In the WARP client Settings, log in to your organization’s [Zero Trust instance](/cloudflare-one/glossary/#team-name).
3. (Optional) If you want to display a [custom block page](/cloudflare-one/policies/gateway/configuring-block-page/), [install the Cloudflare root certificate](/cloudflare-one/connections/connect-devices/warp/user-side-certificates/) on your device .

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

{{<render file="gateway/_verify-connectivity.md" withParameters="DNS">}}

## 3. Add recommended policies

To create a new DNS policy, go to **Gateway** > **Firewall Policies** > **DNS** in Zero Trust. We recommend adding the following policy:

### Block all security categories

Block [known threats](/cloudflare-one/policies/gateway/domain-categories/#security-categories) such as Command & Control, Botnet and Malware based on Cloudflare’s threat intelligence.

{{<render file="gateway/_block-security-categories.md">}}

## 4. Add optional policies

Refer to our list of [common DNS policies](/cloudflare-one/policies/gateway/dns-policies/common-policies) for other policies you may want to create.
