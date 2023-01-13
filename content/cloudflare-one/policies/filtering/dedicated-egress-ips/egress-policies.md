---
pcx_content_type: configuration
title: Egress policies
layout: single
weight: 2
---

# Egress policies

Egress policies allow you to control which [dedicated egress IP](/cloudflare-one/policies/filtering/dedicated-egress-ips/) is used and when, based on attributes such as identity, application, IP address, and geolocation. Traffic that does not match an egress policy will default to using the most performant dedicated egress IP.

To configure an egress policy, login to the [Zero Trust dashboard](https://dash.teams.cloudflare.com) and go to **Gateway** > **Egress policies**.

## Example

The following egress policy configures all traffic to `example.com` to use a static source IP:

| Policy name | Selector | Operator | Value   | Egress method |
| ------------| -------- |--------- |---------|  --------------------------- |
| Access third-party provider | SNI Domain | is     |   `example.com` | Dedicated Cloudflare egress IPs |

For the best performance, we recommend creating a catch-all policy to route all other users through the default Zero Trust IP range:

| Policy name | Selector | Operator | Value   | Egress method |
| ----------- | ------- | ----------| ----------------- | ------------------------------------- |
| Default egress policy | Destination IP | is not | `0.0.0.0`     | Cloudflare default egress method |

Since Gateway policies evaluate from [top to bottom](/cloudflare-one/policies/filtering/order-of-enforcement/#order-of-precedence) in the UI, be sure to place the catch-all policy at the bottom of the list. If you do not include a catch-all policy, all other traffic will use the closest dedicated egress IP location.

## Egress methods

Choose one of the following options for your egress policy:

- **Default Cloudflare egress**: uses the default source IP range shared across all Zero Trust accounts. Ensures the most performant Internet experience as user traffic egresses from the nearest Cloudflare data center.

- **Dedicated Cloudflare egress IPs** uses the primary IPv4 address and IPv6 range selected in the dropdown menus. You can optionally specify a secondary IPv4 address in case the primary data center goes down. There is no need for a secondary IPv6 because IPv6 traffic can egress from any Cloudflare data center. To learn more about IPv4 and IPv6 egress behavior, refer to [Egress locations](/cloudflare-one/policies/filtering/dedicated-egress-ips/#egress-location).

## Selectors

Gateway matches egress traffic against the following selectors, or criteria:

### Application

{{<render file="gateway/_application.md" withParameters="egress">}}

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

### SNI

{{<render file="gateway/_sni.md">}}

### SNI Domain

{{<render file="gateway/_sni-domain.md">}}

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

## Operators

{{<render file="gateway/_operators.md">}}

## Value

{{<render file="gateway/_value.md">}}
