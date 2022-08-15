---
pcx_content_type: concept
title: IP Lists
weight: 2
---

# IP Lists

Use IP Lists to refer to a group of IP addresses collectively, by name, in your firewall rule expression. You can create your own custom lists of IP addresses or [use lists managed by Cloudflare](#managed-ip-lists).

For example, use a list of known office IP addresses in a firewall rule that allows requests from the addresses on the list to bypass security features. Or you may want to block requests that do not come from the known office addresses.

When you update the content of a list, any rules that use the list are automatically updated, so you can make a single change to your firewall rules list rather than modify rules individually.

Cloudflare stores your lists at the account level and sends to the edge, so you can view, manage, and incorporate them into firewall rules for any of your zones.

## Advantages of IP Lists

Using IP Lists has these advantages:

- When creating a firewall rule, using an IP List is easier and less error-prone than adding a long list of IP addresses to a firewall rules expression.
- When updating a set of firewall rules that target the same group of IP addresses, using an IP List is easier and less error prone than editing multiple firewall rules.
- IP Lists are easier to read and more informative, particularly when you use descriptive names for your lists.

## Managed IP Lists

Use Managed IP Lists to access Cloudflare's IP threat intelligence. The available Managed IP Lists depend on your Cloudflare plan.

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

## Availability

The number of IP Lists you can create depends on the Cloudflare plans associated with the zones in your account. You can store up to a total of 10,000 items across all your lists, regardless of your plan.

The available Managed IP Lists depend on your Cloudflare plan.

Feature                                   | Free | Pro | Business | Enterprise | Enterprise Advanced
------------------------------------------|------|-----|----------|------------|--------------------
Number of IP Lists                        | 1    | 10  | 10       | 10         | 10
Cloudflare Open Proxies Managed IP List   | –    | –   | –        | Yes        | Yes
All [Managed IP Lists](#managed-ip-lists) | –    | –   | –        | –          | Yes

## User role requirements

The following user roles have access to the list management functionality:

- Super Administrator
- Administrator
- Firewall

## Managing lists

To manage and edit IP Lists from your Cloudflare account interface, refer to [Use IP Lists](/firewall/cf-dashboard/rules-lists/).

To manage and edit IP Lists using the Cloudflare API, refer to [Lists API](/firewall/api/cf-lists/).

## Using lists in expressions

Both the Cloudflare dashboard and the Cloudflare API support IP Lists.

To use IP Lists in an expression from the Cloudflare dashboard, refer to [Use lists in expressions](/firewall/cf-dashboard/rules-lists/use-lists-in-expressions/).

To refer to an IP List in a Cloudflare Filters API expression, refer to [Values: Lists](/ruleset-engine/rules-language/values/#lists) in the Rules language reference.
