---
title: Available subscriptions
pcx_content_type: reference
weight: 1
---

# Available subscriptions

When [provisioning services for an account](/tenant/how-to/manage-subscriptions/), you need to include certain values with each API call to specify a particular service.

## Zone plans

When creating or updating a [zone plan](https://api.cloudflare.com/#zone-subscription-properties), Partners can use one of the following values for the `id` of the `rate_plan` field (which controls the zone-level plan subscription).

- `"PARTNERS_FREE"`
- `"PARTNERS_PRO"`
- `"PARTNERS_BIZ"`
- `"PARTNERS_ENT"`

The values available to Partners are based on their reseller agreement.

## Other subscriptions

When you [create an account subscription](/tenant/how-to/manage-subscriptions/#account-subscriptions), it provisions an add-on service for that account.

### Zero Trust subscriptions

The following tables list sample values for various Zero Trust subscriptions.

#### Enterprise partners

{{<render file="_subscription-values-preamble.md">}}

| Feature | Subscription IDs |
| --- | --- |
| [Access](/cloudflare-one/identity/) | `PARTNERS_ACCESS_BASIC`, `PARTNERS_ACCESS_ENT`, `PARTNERS_ACCESS_PREMIUM`, `TEAMS_ACCESS_ENT` |
| [Gateway](/cloudflare-one/connections/) | `TEAMS_GATEWAY_ENT` |
| [Cloudflare Zero Trust](/cloudflare-one/) | `TEAMS_ENT` |

#### Self-service partners

{{<render file="_subscription-values-preamble.md">}}

| Feature | Subscription IDs |
| --- | --- |
| [Access](/cloudflare-one/identity/) | `PARTNERS_ACCESS_BASIC` |
| [Gateway](/cloudflare-one/connections/) | `TEAMS_GATEWAY` |
| [Cloudflare Zero Trust](/cloudflare-one/) | `TEAMS_FREE`, `TEAMS_STANDARD` |

### Developer subscriptions

The following tables list sample values for various Developer platform subscriptions.

#### Enterprise partners

{{<render file="_subscription-values-preamble.md">}}

| Feature | Subscription IDs |
| --- | --- |
| [Images](/images/) | `IMAGES_ENT` |
| [Image resizing](/images/image-resizing/) | `IMAGE_RESIZING_ENT` |
| [Stream](/stream/) | `PARTNERS_STREAM_ENT`, `PARTNERS_STREAM_BASIC` |
| [Workers](/workers) | `PARTNERS_WORKERS_ENT`, `PARTNERS_WORKERS_SS`, `PARTNERS_WORKERS_BASIC` |

#### Self-service partners

{{<render file="_subscription-values-preamble.md">}}

| Feature | Subscription IDs |
| --- | --- |
| [Images](/images/) | `IMAGES_BASIC`|
| [Image resizing](/images/image-resizing/) | `IMAGE_RESIZING_BASIC` |
| [Stream](/stream/) | `PARTNERS_STREAM_BASIC`, `STREAM_BASIC` |
| [Workers](/workers) | `WORKERS_PAID`, `PARTNERS_WORKERS_SS`, `PARTNERS_WORKERS_BASIC` |

### Application performance and security

The following tables list sample values for various application performance and security subscriptions.

#### Enterprise partners

{{<render file="_subscription-values-preamble.md">}}

| Feature | Subscription IDs |
| --- | --- |
| [Advanced certificate manager](/ssl/edge-certificates/advanced-certificate-manager/) | `ADVANCED_CERT_MANAGER_FREE` |
| [Argo smart routing](/argo-smart-routing/) | `PARTNERS_ZONE_ARGO` |
| [Ethereum gateway](/web3/ethereum-gateway/) | `WEB3_ETHEREUM_ENT`, `WEB3_ETHEREUM_ENT_CONTRACT`, `WEB3_ETHEREUM_ENT_PAYGO` |
| [IPFS gateway](/web3/ipfs-gateway/) | `WEB3_IPFS_ENT`, `WEB3_IPFS_ENT_CONTRACT`, `WEB3_IPFS_ENT_PAYGO` |
| [Load balancing](/load-balancing/) | `PARTNERS_LOAD_BALANCING`, `PARTNERS_LOAD_BALANCING_ENT` |
| [Rate limiting](/waf/rate-limiting-rules/) | `PARTNERS_RATE_LIMITING` |
| [Spectrum](/spectrum/) | `PARTNERS_SPECTRUM` |


#### Self-service partners

{{<render file="_subscription-values-preamble.md">}}

| Feature | Subscription IDs |
| --- | --- |
| [Advanced certificate manager](/ssl/edge-certificates/advanced-certificate-manager/) | `ADVANCED_CERT_MANAGER_FREE`, `ADVANCED_CERT_MANAGER` |
| [Argo smart routing](/argo-smart-routing/) | `PARTNERS_ZONE_ARGO`, `ARGO_ZONE_BASIC` |
| [Ethereum gateway](/web3/ethereum-gateway/) | `WEB3_ETHEREUM_ENT`, `WEB3_ETHEREUM_ENT_CONTRACT`, `WEB3_ETHEREUM_ENT_PAYGO` |
| [IPFS gateway](/web3/ipfs-gateway/) | `WEB3_IPFS_ENT`, `WEB3_IPFS_ENT_CONTRACT`, `WEB3_IPFS_ENT_PAYGO` |
| [Load balancing](/load-balancing/) | `PARTNERS_LOAD_BALANCING`, `LOAD_BALANCING_BASIC_PLUS` |
| [Rate limiting](/waf/rate-limiting-rules/) | `PARTNERS_RATE_LIMITING` |
| [Spectrum](/spectrum/) | `PARTNERS_SPECTRUM` |
| [Waiting room](/waiting-room/) | `WAITING_ROOMS_BASIC` |