---
pcx_content_type: concept
title: Monitors
weight: 5
layout: single
---

# Monitors

{{<glossary-definition term_id="monitor">}}

{{<render file="_health-check-diagram.md">}}

Health monitor requests that result in a status change for an origin server are recorded as events in the Load Balancing event logs.

{{<Aside type="note">}}

Health monitors associated with load balancers are different from standalone [Health Checks](/health-checks/). For an overview of how the Cloudflare Load Balancing solution works, refer to [Load Balancing components](/load-balancing/understand-basics/load-balancing-components/).

{{</Aside>}}

---

## Properties

For an up-to-date list of monitor properties, refer to [Monitor properties](/api/operations/account-load-balancer-monitors-list-monitors) in our API documentation.

---

## Create monitors

For step-by-step guidance, refer to [Create monitors](/load-balancing/monitors/create-monitor/).

---

## Health monitor regions

When you [attach a monitor to a pool](/load-balancing/monitors/create-monitor/#create-a-monitor), you can select multiple regions to increase reporting accuracy.

{{<render file="_health-check-regions.md">}}

### Configurations

{{<render file="_monitor-health-check-regions-options.md">}}

---

## Host header prioritization

The host headers to be use on the health monitor request can be configured either on a monitor or on the origin pool. When a host header is configured on both the origin pool and the monitor, then the host header configured on the origin pool takes precedence over the host header configured on the monitor. When no host header is configured on either the monitor or the origin pool then Cloudflare uses the Origin Address configured on the origin pool as the host header for the health monitor request.
For more details, refer to [Override HTTP Host headers](/load-balancing/additional-options/override-http-host-headers/).

---

## API commands

The Cloudflare API supports the following commands for monitors. Examples are given for user-level endpoint but apply to the account-level endpoint as well.

| Command | Method | Endpoint |
| --- | --- | --- |
| [Create Monitor](/api/operations/account-load-balancer-monitors-create-monitor) | `POST` | `accounts/:account_id/load_balancers/monitors`|
| [Delete Monitor](/api/operations/account-load-balancer-monitors-delete-monitor) | `DELETE` | `accounts/:account_id/load_balancers/monitors/:id` |
| [List Monitors](/api/operations/account-load-balancer-monitors-list-monitors) | `GET` |  `accounts/:account_id/load_balancers/monitors` |
| [Monitor Details](/api/operations/account-load-balancer-monitors-monitor-details) | `GET` |`accounts/:account_id/load_balancers/monitors/:id` |
| [Overwrite specific properties](/api/operations/account-load-balancer-monitors-patch-monitor) | `PATCH` | `accounts/:account_id/load_balancers/monitors/:id` |
| [Overwrite existing monitor](/api/operations/account-load-balancer-monitors-update-monitor) | `PUT` | `accounts/:account_id/load_balancers/monitors/:id` |
| [Preview Monitor](/api/operations/account-load-balancer-monitors-preview-monitor) | `POST` | `accounts/:account_id/load_balancers/monitors/:id/preview` |

## Supported protocols

Cloudflare Load Balancing supports public monitoring for HTTP, HTTPS, TCP, UDP, ICMP, ICMP ping, and SMTP. 

Load Balancing also supports private monitoring for HTTP, HTTPS, and TCP.
