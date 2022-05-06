---
pcx-content-type: concept
title: Pools
weight: 1
---

# Pools

{{<render file="_pool-definition.md">}}

If you are familiar with DNS terminology, think of a pool as a “record set,” except Cloudflare only returns addresses that are considered healthy. You can attach health checks to individual pools for customized monitoring.

{{<Aside>}}

For more details about how origins and pools become unhealthy, refer to [Origin and pool health](/load-balancing/understand-basics/health-details/).

{{</Aside>}}

---

## Properties

For an up-to-date list of pool properties, refer to [Pool properties](https://api.cloudflare.com/#load-balancer-pools-properties) in our API documentation.

---

## Create pools

For step-by-step guidance, refer to [Create pools](/load-balancing/how-to/create-pool/).

---

## Per origin Host header override

When your application needs specialized routing (`CNAME` setup or custom hosts like Heroku), change the `Host` header used in health checks. For more details, refer to [Override HTTP Host headers](/load-balancing/additional-options/override-http-host-headers/).

---

## API commands

The Cloudflare API supports the following commands for pools. Examples are given for user-level endpoint but apply to the account-level endpoint as well.

| Command | Method | Endpoint |
| --- | --- | --- |
|  [Create Pool](https://api.cloudflare.com/#account-load-balancer-pools-create-pool) | `POST` | `accounts/:account_id/load_balancers/pools` |
| [Delete Pool](https://api.cloudflare.com/#account-load-balancer-pools-delete-pool) | `DELETE` | `accounts/:account_id/load_balancers/pools/:id` | 
| [List Pools](https://api.cloudflare.com/#account-load-balancer-pools-list-pools) | `GET` | `accounts/:account_id/load_balancers/pools` |
| [Pool Details](https://api.cloudflare.com/#account-load-balancer-pools-pool-details) | `GET` | `accounts/:account_id/load_balancers/pools/:id` |
| [Pool Health Details](https://api.cloudflare.com/#account-load-balancer-pools-pool-health-details) | `GET` | `account/:account_id/load_balancers/pools/:id/health` |
| [Overwrite specific properties](https://api.cloudflare.com/#account-load-balancer-pools-patch-pool) | `PATCH` | `accounts/:account_id/load_balancers/pools/:id` |
| [Overwrite existing pool](https://api.cloudflare.com/#account-load-balancer-pools-update-pool) | `PUT` | `accounts/:account_id/load_balancers/pools/:id` |
| [Preview Pool](https://api.cloudflare.com/#account-load-balancer-pools-preview-pool) | `POST` | `account/:account_id/load_balancers/pools/:id/preview` |
| [List Pool References](https://api.cloudflare.com/#account-load-balancer-pools-list-pool-references) | `GET` | `accounts/:account_id/load_balancers/pools/:id/references` |