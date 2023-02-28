---
pcx_content_type: concept
title: Monitors
weight: 2
---

# Monitors

{{<render file="_monitor-definition.md">}}
<br/>
{{<render file="_health-check-diagram.md">}}

Health checks that result in a status change for an origin server are recorded as events in the Load Balancing event logs.

{{<Aside type="note">}}

Health checks associated with load balancers are different from [**Standalone health checks**](/health-checks/).

{{</Aside>}}

---

## Properties

For an up-to-date list of monitor properties, refer to [Monitor properties](https://developers.cloudflare.com/api/operations/account-load-balancer-monitors-list-monitors) in our API documentation.

---

## Create monitors

For step-by-step guidance, refer to [Create monitors](/load-balancing/how-to/create-monitor/).

---

## Health check regions

When you [attach a monitor to a pool](/load-balancing/how-to/create-monitor/#attach-the-monitor-to-a-pool), you can select multiple regions to increase reporting accuracy.

{{<render file="_health-check-regions.md">}}

### Configurations

{{<render file="_monitor-health-check-regions-options.md">}}

---

## Host header prioritization

When a load balancer runs health checks, headers set on an origin override headers set on a monitor. For more details, refer to [Override HTTP Host headers](/load-balancing/additional-options/override-http-host-headers/).

---

## API commands

The Cloudflare API supports the following commands for monitors. Examples are given for user-level endpoint but apply to the account-level endpoint as well.

| Command | Method | Endpoint |
| --- | --- | --- |
| [Create Monitor](https://developers.cloudflare.com/api/operations/account-load-balancer-monitors-create-monitor) | `POST` | `accounts/:account_id/load_balancers/monitors`|
| [Delete Monitor](https://developers.cloudflare.com/api/operations/account-load-balancer-monitors-delete-monitor) | `DELETE` | `accounts/:account_id/load_balancers/monitors/:id` |
| [List Monitors](https://developers.cloudflare.com/api/operations/account-load-balancer-monitors-list-monitors) | `GET` |  `accounts/:account_id/load_balancers/monitors` |
| [Monitor Details](https://developers.cloudflare.com/api/operations/account-load-balancer-monitors-monitor-details) | `GET` |`accounts/:account_id/load_balancers/monitors/:id` |
| [Overwrite specific properties](https://developers.cloudflare.com/api/operations/account-load-balancer-monitors-patch-monitor) | `PATCH` | `accounts/:account_id/load_balancers/monitors/:id` |
| [Overwrite existing monitor](https://developers.cloudflare.com/api/operations/account-load-balancer-monitors-update-monitor) | `PUT` | `accounts/:account_id/load_balancers/monitors/:id` |
| [Preview Monitor](https://developers.cloudflare.com/api/operations/account-load-balancer-monitors-preview-monitor) | `POST` | `accounts/:account_id/load_balancers/monitors/:id/preview` |
