---
title: Secure your first application
pcx_content_type: overview
weight: 3
layout: learning-unit
---

To ensure holistic security precautions, we recommend securing each distinct private application with at least two policies:

- A [Gateway DNS policy](/cloudflare-one/policies/gateway/dns-policies/) with the appropriate identity and device posture values, targeting the domain list that defines your application. Policy enforcement happens at the request resolution event, before the user’s device makes a connection request to the application itself; if denied here, no traffic will reach your private network.

- A [Gateway network policy](/cloudflare-one/policies/gateway/network-policies/) with the same identity and device posture values as the DNS policy, targeting the IP list that defines your application.  You can optionally include the domain list by matching the SNI header. Then, you can include any combinations of ports or protocols that are relevant for application access. Network policy enforcement happens after the user passes the DNS policy, when the user's device attempts to connect to the target application.

## Create a Gateway policy

To create a new policy, open [Zero Trust](https://one.dash.cloudflare.com/) and go to **Gateway** > **Firewall Policies**.

## Example DNS policy

| Traffic Selector | Operator | Value                  |
| -------- | -------- | ---------------------- |
| Domain   | in list  | `Company Wiki domains` |

| Identity Selector | Operator | Value                  |
| -------- | -------- | ---------------------- |
| User email  | Matches regex  | `.*@example.com` |

| Action |
| ------ |
| Allow  |

## Example network policy

| Traffic Selector | Operator | Value                  |
| -------- | -------- | ---------------------- |
| Destination IP   | in list  | `Company Wiki IPs` |

| Identity Selector | Operator | Value                  |
| -------- | -------- | ---------------------- |
| User email  | Matches regex  | `.*@example.com` |

| Action |
| ------ |
| Allow  |

### Catch-all policy

We recommend adding a catch-all policy to the bottom of your network policy list. An effective Zero Trust model should prioritize default-deny actions to avoid any overly permissive policy building. For example,

| Traffic Selector | Operator | Value          | Logic |
| -------- | -------- | ---------------------- | ----- |
| Destination IP   | in list  | `All private network ranges` | Or  |
| SNI Hostname   | in list | `All private apex domains` | |

| Action |
| ------ |
| Block  |

Network policies are evaluated in [top-down order](/cloudflare-one/policies/gateway/order-of-enforcement/#order-of-precedence), so if a user does not match an explicitly defined policy for an application, they will be blocked.
To learn how multiple policies interact, refer to [Order of enforcement](/cloudflare-one/policies/gateway/order-of-enforcement/).

{{<Aside type="note">}}
It is not recommended to employ a default-deny model while testing. Instead, build your explicit application policies and [monitor your logs](/cloudflare-one/insights/logs/gateway-logs/) to determine if your policies are working as expected. If you do not see the policies triggering in your logs, you may need to tune your policies and review what kind of information (identity groups, device posture values, etc.) is being sent with your traffic.
{{</Aside>}}