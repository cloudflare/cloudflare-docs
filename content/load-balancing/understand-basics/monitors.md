---
pcx_content_type: concept
title: Monitors
weight: 2
---

# Monitors

{{<render file="_monitor-definition.md">}}

{{<render file="_health-check-diagram.md">}}

Health checks that result in a status change for an origin server are recorded as events in the Load Balancing event logs.

{{<Aside type="note">}}

Health checks associated with load balancers are different from **Standalone health checks**. For more details about Standalone health checks, refer to our [Support documentation](https://support.cloudflare.com/hc/articles/4404867308429).

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

**All Data Centers**

Health check probes are sent from every single data center in Cloudflare’s network to the origins within the associated pool. This allows probes to hit each origin during intervals set by the customer. 

**All Regions**

Three health check probes per region are sent to each origin in the associated pool. There are a total of 13 regions, resulting in 39 probes.

**Regional**

Three health check probes are sent from each specified region within the pool configuration.

### Increased origin strain

Because of how Cloudflare checks health from [multiple regions](#health-check-regions), adding multiple regions — or choosing to check health from **All Data Centers** — can send a lot of traffic to your origin.

The same problem can occur when setting low values for a monitor's **Interval**.

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
