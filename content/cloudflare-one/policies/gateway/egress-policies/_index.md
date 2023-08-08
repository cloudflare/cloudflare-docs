---
pcx_content_type: configuration
title: Egress policies
layout: single
weight: 5
---

# Egress policies

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

When your users connect to the Internet through Cloudflare Gateway, by default their traffic is assigned a source IP address that is shared across all Cloudflare WARP users. Enterprise customers can purchase [dedicated egress IPs](/cloudflare-one/policies/gateway/egress-policies/dedicated-egress-ips/) to ensure that egress traffic from your organization is assigned a unique, static IP. These source IPs are dedicated to your account and can be used within allowlists on upstream services.

Egress policies allow you to control which dedicated egress IP is used and when, based on attributes such as identity, IP address, and geolocation. Traffic that does not match an egress policy will default to using the most performant dedicated egress IP.

To control whether only IPv4 or IPv6 is used to egress, you can use a DNS policy to [block AAAA or A records](/cloudflare-one/policies/gateway/dns-policies/common-policies/#control-ip-version).

## Example

The following egress policy configures all traffic destined for a third-party network to use a static source IP:

| Policy name                 | Selector       | Operator | Value            | Egress method                   |
| --------------------------- | -------------- | -------- | ---------------- | ------------------------------- |
| Access third-party provider | Destination IP | is       | `203.0.113.0/24` | Dedicated Cloudflare egress IPs |

For the best performance, we recommend creating a catch-all policy to route all other users through the default Zero Trust IP range:

| Policy name           | Selector       | Operator | Value     | Egress method                    |
| --------------------- | -------------- | -------- | --------- | -------------------------------- |
| Default egress policy | Destination IP | is not   | `0.0.0.0` | Cloudflare default egress method |

Since Gateway policies evaluate from [top to bottom](/cloudflare-one/policies/gateway/order-of-enforcement/#order-of-precedence) in the UI, be sure to place the catch-all policy at the bottom of the list. If you do not include a catch-all policy, all other traffic will use the closest dedicated egress IP location.

## Egress methods

Choose one of the following options for your egress policy:

- **Default Cloudflare egress**: uses the default source IP range shared across all Zero Trust accounts. Ensures the most performant Internet experience as user traffic egresses from the nearest Cloudflare data center.

- **Dedicated Cloudflare egress IPs** uses the primary IPv4 address and IPv6 range selected in the dropdown menus. You can optionally specify a secondary IPv4 address in case the primary data center goes down. There is no need for a secondary IPv6 because IPv6 traffic can egress from any Cloudflare data center. To learn more about IPv4 and IPv6 egress behavior, refer to [Egress locations](/cloudflare-one/policies/gateway/egress-policies/dedicated-egress-ips/#egress-location).

## Selectors

Gateway matches egress traffic against the following selectors, or criteria:

### Destination Continent

{{<render file="gateway/_destination-continent.md" withParameters="net.dst">}}

### Destination Country

{{<render file="gateway/_destination-country.md" withParameters="net.dst">}}

### Destination IP

{{<render file="gateway/_destination-ip.md">}}

### Destination Port

{{<render file="gateway/_destination-port.md">}}

### Device Posture

{{<render file="gateway/_device-posture.md">}}

### Protocol

{{<render file="gateway/_protocol.md">}}

### Proxy Endpoint

{{<render file="gateway/_proxy-endpoint.md">}}

### Source Continent

The continent of the user making the request.
{{<render file="gateway/_source-continent.md" withParameters="net.src">}}

### Source Country

The country of the user making the request.
{{<render file="gateway/_source-country.md" withParameters="net.src">}}

### Source IP

{{<render file="gateway/_source-ip-net.md">}}

### Source Port

{{<render file="gateway/_source-port.md">}}

### Users

{{<render file="gateway/_users.md">}}

### Virtual Network

{{<render file="gateway/_virtual-network.md">}}

## Comparison operators

{{<render file="gateway/_comparison-operators.md">}}

## Value

You can input a single value or use regular expressions to specify a range of values.

Gateway uses Rust to evaluate regular expressions. The Rust implementation is slightly different than regex libraries used elsewhere. To evaluate if your regex matches, you can use [Rustexp](https://rustexp.lpil.uk/).

## Logical operators

{{<render file="gateway/_logical-operators.md" withParameters="**Identity** or **Device Posture**">}}
