---
pcx-content-type: concept
title: Monitors
weight: 2
---

# Monitors

{{<render file="_monitor-definition.md">}}

![Dynamic load balancing involves pools, origins, monitors, and health checks](/load-balancing/static/images/load-balancer-components.png)

Health checks that result in a status change for an origin server are recorded as events in the Load Balancing event logs.

{{<Aside type="note">}}

Health checks associated with load balancers are different from **Standalone health checks**. For more details about Standalone health checks, refer to our [Support documentation](https://support.cloudflare.com/hc/articles/4404867308429).

{{</Aside>}}

---

## Properties

For an up-to-date list of monitor properties, refer to [Monitor properties](https://api.cloudflare.com/#load-balancer-monitors-properties) in our API documentation.

---

## Create monitors

For step-by-step guidance, refer to [Create monitors](/load-balancing/how-to/create-monitor/).

---

## Health check regions

When you [attach a monitor to a pool](/load-balancing/how-to/create-monitor/#attach-the-monitor-to-a-pool), you can select multiple regions to increase reporting accuracy.

{{<render file="_health-check-regions.md">}}

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
| [Create Monitor](https://api.cloudflare.com/#account-load-balancer-monitors-create-monitor) | `POST` | `accounts/:account_id/load_balancers/monitors`|
| [Delete Monitor](https://api.cloudflare.com/#account-load-balancer-monitors-delete-monitor) | `DELETE` | `accounts/:account_id/load_balancers/monitors/:id` |
| [List Monitors](https://api.cloudflare.com/#account-load-balancer-monitors-list-monitors) | `GET` |  `accounts/:account_id/load_balancers/monitors` |
| [Monitor Details](https://api.cloudflare.com/#account-load-balancer-monitors-monitor-details) | `GET` |`accounts/"account_id/load_balancers/monitors/:id` |
| [Overwrite specific properties](https://api.cloudflare.com/#account-load-balancer-monitors-patch-monitor) | `PATCH` | `accounts/:account_id/load_balancers/monitors/:id` |
| [Overwrite existing monitor](https://api.cloudflare.com/#account-load-balancer-monitors-update-monitor) | `PUT` | `accounts/:account_id/load_balancers/monitors/:id` |
| [Preview Monitor](https://api.cloudflare.com/#account-load-balancer-monitors-preview-monitor) | `POST` | `accounts/:account_id/load_balancers/monitors/:id/preview` |
