---
pcx_content_type: concept
title: IP Lists
weight: 2
---

# IP Lists

Use an IP List to reference a group of IP addresses collectively, by name, in rule expressions. You can create your own custom lists of IP addresses or use the [Managed IP Lists](#managed-ip-lists) provided by Cloudflare.

## Create an IP List

Refer to [Create a list in the dashboard](/fundamentals/global-configurations/lists/create-dashboard/) or to the [Lists API](/fundamentals/global-configurations/lists/lists-api/) page.

## Managed IP Lists

{{<Aside type="note">}}
The available Managed IP Lists depend on your Cloudflare plan and product subscriptions. Refer to [Availability](/fundamentals/global-configurations/lists/#availability) for details.
{{</Aside>}}

Use Managed IP Lists to access Cloudflare's IP threat intelligence.

Cloudflare provides the following Managed IP Lists:

<table>
  <thead>
    <tr>
      <th>Display name</th>
      <th style="width: 30%">Name in expressions</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cloudflare Open Proxies</td>
      <td><code>cf.open_proxies</code></td>
      <td>IP addresses of known open HTTP and SOCKS proxy endpoints, which are frequently used to launch attacks and hide attackers identity.</td>
    </tr>
    <tr>
      <td>Cloudflare Anonymizers</td>
      <td><code>cf.anonymizer</code></td>
      <td>IP addresses of known anonymizers (Open SOCKS Proxies, VPNs, and TOR nodes).</td>
    </tr>
    <tr>
      <td>Cloudflare VPNs</td>
      <td><code>cf.vpn</code></td>
      <td>IP addresses of known VPN servers.</td>
    </tr>
    <tr>
      <td>Cloudflare Malware</td>
      <td><code>cf.malware</code></td>
      <td>IP addresses of known sources of malware.</td>
    </tr>
    <tr>
      <td>Cloudflare Botnets, Command and Control Servers</td>
      <td><code>cf.botnetcc</code></td>
      <td>IP addresses of known botnet command-and-control servers.</td>
    </tr>
  </tbody>
</table>

---

## IP address and range formats

IP Lists support:

- Individual IPv4 addresses
- IPv4 CIDR ranges with a prefix from `/8` to `/32`
- IPv6 CIDR ranges with a prefix from `/4` to `/64`

You can combine individual addresses and CIDR ranges in the same list.

{{<Aside type="note" header="Note">}}

To specify an IPv6 address, enter it as a CIDR range with a `/64` prefix, the largest supported prefix for IPv6 CIDR ranges.

For example, instead of `2001:db8:6a0b:1a01:d423:43b9:13c5:2e8f`, enter one of the following:

- `2001:db8:6a0b:1a01:0000:0000:0000:0000/64`
- `2001:db8:6a0b:1a01::/64` (using the [double colon notation](https://tools.ietf.org/html/rfc5952#section-4.2))

The IPv6 address topology describes the last 64 bits as the host identifier. Matching on a `/128` prefix would identify a specific IPv6 address, but not the host in general. It would be possible for an attacker to change their specific IPv6 address from a single machine.

{{</Aside>}}

You can use uppercase or lowercase characters for IPv6 addresses in lists. However, when you save the list, uppercase characters are converted to lowercase.

## CSV file format

When uploading a CSV file containing a list of IP addresses and optional descriptions, use the following format for each item (enter one item per line):

```txt
<IP_ADDRESS_1>,<DESCRIPTION_1>
<IP_ADDRESS_2>
```