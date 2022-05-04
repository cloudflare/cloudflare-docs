---
pcx-content-type: configuration
title: Network policies
weight: 4
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

You can apply Network policies to a growing list of popular web applications. Refer to the [Application and app types](/cloudflare-one/policies/filtering/application-app-types) page for more information.

| UI name | API example |
| -- | -- |
| Application | `any(app.ids[*] in {505}` |

A list of supported applications and their ID numbers is available through the [Gateway API endpoint](https://api.cloudflare.com/#zero-trust-gateway-application-and-application-type-mappings-properties).

### Destination IP

The IP address of the request’s target.

| UI name        | API example                  |
| -------------- | ---------------------------- |
| Destination IP | `net.dst.ip == "10.0.0.0/8"` |

### Destination Port

The port number of the request’s target.

| UI name          | API example              |
| ---------------- | ------------------------ |
| Destination Port | `net.dst.port == "2222"` |

### Device Posture

With the Device Posture selector, admins can use signals from end-user devices to secure access to their internal and external resources. For example, a security admin can choose to limit all access to internal applications based on whether specific software is installed on a device, and/or if the device or software are configured in a particular way.

| UI name        | API example                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Device Posture | `any(device_posture.checks.failed[*] in {"1308749e-fcfb-4ebc-b051-fe022b632644"})`, `any(device_posture.checks.passed[*] in {"1308749e-fcfb-4ebc-b051-fe022b632644"})"` |

### Protocol

The protocol used to send the packet.

| UI name  | API example             |
| -------- | ----------------------- |
| Protocol | `net.protocol == "tcp"` |

{{<Aside type="note">}}

To enable Gateway filtering on TCP and UDP, navigate to **Settings** > **Network** > **Proxy**. Network policies apply to all enabled protocols unless you use the **Protocol** selector within a policy.

{{</Aside>}}

### SNI

The host whose Server Name Indication (SNI) header Gateway will filter traffic against. This will allow for an exact match.

| UI name | API example                         |
| ------- | ----------------------------------- |
| SNI     | `net.sni.host == "www.example.com"` |

### SNI Domain

The domain whose Server Name Indication (SNI) header Gateway will filter traffic against. This will match against the hostname and sub-domains.

| UI name    | API example                       |
| ---------- | --------------------------------- |
| SNI Domain | `net.sni.host == "a.example.com"` |

### Source IP

The IP address of the user making the request.

| UI name   | API example                  |
| --------- | ---------------------------- |
| Source IP | `net.src.ip == "10.0.0.0/8"` |

### Source Port

The IP address of the user making the request.

| UI name     | API example              |
| ----------- | ------------------------ |
| Source Port | `net.src.port == "2222"` |

### Users

The **User**, **User Group**, and **SAML Attributes** selectors require Gateway with WARP mode to be enabled in the Zero Trust WARP client, and the user to be enrolled in the organization via the WARP client. For more information on identity-based selectors, refer to the [Identity-based policies](/cloudflare-one/policies/filtering/identity-selectors/) page.

## Operators

{{<render file="_policies-operators.md">}}

{{<Aside type="note">}}

The _In_ operator allows you to specify IP addresses or networks using CIDR notation.

{{</Aside>}}

## Value

{{<render file="_policies-value.md">}}
