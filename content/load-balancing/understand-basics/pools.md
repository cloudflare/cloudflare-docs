---
pcx_content_type: concept
title: Pools
weight: 1
---

# Pools

{{<render file="_pool-definition.md">}}

{{<Aside type="note">}}

For more details about how origins and pools become unhealthy, refer to [Origin and pool health](/load-balancing/understand-basics/health-details/).

{{</Aside>}}

---

## Properties

For an up-to-date list of pool properties, refer to [Pool properties](/api/operations/account-load-balancer-pools-list-pools) in our API documentation.

---

## Create pools

For step-by-step guidance, refer to [Create pools](/load-balancing/how-to/create-pool/).

---

## Per origin Host header override

When your application needs specialized routing (`CNAME` setup or custom hosts like Heroku), change the `Host` header used in health monitor requests. For more details, refer to [Override HTTP Host headers](/load-balancing/additional-options/override-http-host-headers/).

---

## API commands

The Cloudflare API supports the following commands for pools. Examples are given for user-level endpoint but apply to the account-level endpoint as well.

| Command | Method | Endpoint |
| --- | --- | --- |
|  [Create Pool](/api/operations/account-load-balancer-pools-create-pool) | `POST` | `accounts/:account_id/load_balancers/pools` |
| [Delete Pool](/api/operations/account-load-balancer-pools-delete-pool) | `DELETE` | `accounts/:account_id/load_balancers/pools/:id` | 
| [List Pools](/api/operations/account-load-balancer-pools-list-pools) | `GET` | `accounts/:account_id/load_balancers/pools` |
| [Pool Details](/api/operations/account-load-balancer-pools-pool-details) | `GET` | `accounts/:account_id/load_balancers/pools/:id` |
| [Pool Health Details](/api/operations/account-load-balancer-pools-pool-health-details) | `GET` | `account/:account_id/load_balancers/pools/:id/health` |
| [Overwrite specific properties](/api/operations/account-load-balancer-pools-patch-pool) | `PATCH` | `accounts/:account_id/load_balancers/pools/:id` |
| [Overwrite existing pool](/api/operations/account-load-balancer-pools-update-pool) | `PUT` | `accounts/:account_id/load_balancers/pools/:id` |
| [Preview Pool](/api/operations/account-load-balancer-pools-preview-pool) | `POST` | `account/:account_id/load_balancers/pools/:id/preview` |
| [List Pool References](/api/operations/account-load-balancer-pools-list-pool-references) | `GET` | `accounts/:account_id/load_balancers/pools/:id/references` |

## Least Outstanding Request Steering

{{<render file="_least-outstanding-request-steering-definition.md">}}

### Configure via the API

{{<render file="_least-outstanding-request-steering-configuration.md">}}

### Limitations

{{<render file="_least-outstanding-request-steering-limitations.md">}}