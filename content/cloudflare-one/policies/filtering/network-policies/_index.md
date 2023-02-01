---
pcx_content_type: configuration
title: Network policies
weight: 3
layout: single
---

# Network policies

{{<Aside type="note">}}

To enable this feature, download and deploy the [WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) on your devices.

{{</Aside>}}

With Cloudflare Zero Trust, you can configure policies to control network-level traffic leaving your endpoints. Using network selectors like IP addresses and ports, your policies will control access to any network origin. Because Cloudflare Zero Trust [integrates with your identity provider](/cloudflare-one/identity/idp-integration/), it also gives you the ability to create identity-based network policies. This means you can now control access to non-HTTP resources on a per-user basis regardless of where they are or what device they access that resource from.

A network policy consists of an **Action** as well as a logical expression that determines the scope of the action. To build an expression, you need to choose a **Selector** and an **Operator**, and enter a value or range of values in the **Value** field.

- [Actions](#actions)
- [Selectors](#selectors)
- [Operators](#operators)
- [Value](#value)

## Actions

Just like actions in DNS and HTTP policies, actions in network policies define which decision you want to apply to a given set of elements. You can assign one action per policy.

### Allow

Policies with Allow actions allow network traffic to reach certain IPs or ports. For example, the following configuration allows specific users to reach a given IP address:

| Selector       | Operator | Value           | Action |
| -------------- | -------- | --------------- | ------ |
| Destination IP | In       | `92.100.02.102` | Allow  |
| Email          | In       | `*@example.com` |        |

### Block

Policies with Block actions block network traffic from reaching certain IPs or ports. For example, the following configuration blocks all traffic directed to port 443:

| Selector         | Operator | Value | Action |
| ---------------- | -------- | ----- | ------ |
| Destination Port | In       | `443` | Block  |

### Network Override

Policies with Network Override actions do not inspect traffic directed to, or coming from, certain IPs or ports. For example, the following configuration overrides traffic to a public IP to a Private IP based on a user’s identity:

| Selector       | Operator | Value           | Action           |
| -------------- | -------- | --------------- | ---------------- |
| Destination IP | In       | `95.92.143.151` | Network Override |
| User Email     | In       | `*@example.com` |                  |
| Override IP    |          | 10.0.0.1        |                  |

## Selectors

Gateway matches network traffic against the following selectors, or criteria.

### Application

{{<render file="gateway/_application.md" withParameters="network">}}

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

{{<Aside type="note">}}

To enable Gateway filtering on TCP and UDP, navigate to **Settings** > **Network** > **Proxy**. Network policies apply to all enabled protocols unless you use the **Protocol** selector within a policy.

{{</Aside>}}

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

{{<Aside type="note">}}

The _In_ operator allows you to specify IP addresses or networks using CIDR notation.

{{</Aside>}}

## Value

{{<render file="gateway/_value.md">}}