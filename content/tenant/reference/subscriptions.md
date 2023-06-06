---
title: Available subscriptions
pcx_content_type: reference
weight: 1
---

# Available subscriptions

When [provisioning services for an account](/tenant/how-to/manage-subscriptions/), you need to include certain values with each API call to specify a particular service.

The subscriptions available to you will vary depending on your current partner program ([Self-Service Partner Program](https://www.cloudflare.com/cloudflare-partners-self-serve-program-closed-beta/) or [Enterprise Resellers and MSP Program](https://portal.cloudflarepartners.com)).

The following values are samples and not exhaustive. For the complete list of subscription values available to you, make an API call to the [zone subscriptions](/api/operations/zone-rate-plan-list-available-rate-plans) or [account subscriptions](/api/operations/account-subscriptions-list-subscriptions) endpoints.

## Zone plans

When creating or updating a [zone plan](/api/operations/zone-subscription-zone-subscription-details), Partners can use one of the following values for the `id` of the `rate_plan` field (which controls the zone-level plan subscription).

| Partner program | Available subscriptions |
| --- | --- |
| Enterprise and self-serve resellers | `PARTNERS_FREE`, `PARTNERS_PRO`, `PARTNERS_BIZ`, `PARTNERS_ENT` |
| PAYGO partners | `CF_FREE`, `CF_PRO_20_20`, `CF_BIZ` |
| MSP partners | `msp_biz` |

## Other subscriptions

When you [create an account subscription](/tenant/how-to/manage-subscriptions/#account-subscriptions), it provisions an add-on service for that account.

### Zero Trust subscriptions

The following table lists sample values for various Zero Trust subscriptions.

| Feature | Subscription IDs |
| --- | --- |
| [Access](/cloudflare-one/identity/) | `PARTNERS_ACCESS_BASIC`, `PARTNERS_ACCESS_ENT`, `PARTNERS_ACCESS_PREMIUM`, `TEAMS_ACCESS_ENT`, `TEAMS_ACCESS` |
| [Gateway](/cloudflare-one/connections/) | `TEAMS_GATEWAY_ENT`, `TEAMS_GATEWAY` |
| [Cloudflare Zero Trust](/cloudflare-one/) | `TEAMS_ENT`, `TEAMS_FREE`, `TEAMS_STANDARD` |

### Developer subscriptions

The following table lists sample values for various Developer platform subscriptions.

| Feature | Subscription IDs |
| --- | --- |
| [Images](/images/cloudflare-images/) | `IMAGES_ENT`,`IMAGES_BASIC`|
| [Image resizing](/images/image-resizing/) | `IMAGE_RESIZING_ENT`, `IMAGE_RESIZING_BASIC` |
| [Stream](/stream/) | `PARTNERS_STREAM_ENT`, `PARTNERS_STREAM_BASIC`, `STREAM_BASIC` |
| [Workers](/workers) | `PARTNERS_WORKERS_ENT`, `WORKERS_PAID`, `PARTNERS_WORKERS_SS`, `PARTNERS_WORKERS_BASIC` |

### Application performance and security

The following table lists sample values for various application performance and security subscriptions.

| Feature | Subscription IDs |
| --- | --- |
| [API Shield](/api-shield/) | `API_SHIELD_ZONE` |
| [Advanced certificate manager](/ssl/edge-certificates/advanced-certificate-manager/) | `ADVANCED_CERT_MANAGER_FREE`, `ADVANCED_CERT_MANAGER` |
| [Argo smart routing](/argo-smart-routing/) | `PARTNERS_ZONE_ARGO`, `ARGO_ZONE_BASIC` |
| [Ethereum gateway](/web3/ethereum-gateway/) | `WEB3_ETHEREUM_ENT`, `WEB3_ETHEREUM_ENT_CONTRACT`, `WEB3_ETHEREUM_ENT_PAYGO` |
| [IPFS gateway](/web3/ipfs-gateway/) | `WEB3_IPFS_ENT`, `WEB3_IPFS_ENT_CONTRACT`, `WEB3_IPFS_ENT_PAYGO` |
| [Load balancing](/load-balancing/) | `PARTNERS_LOAD_BALANCING`, `PARTNERS_LOAD_BALANCING_ENT`, `LOAD_BALANCING_BASIC_PLUS` |
| [Rate limiting](/waf/rate-limiting-rules/) | `PARTNERS_RATE_LIMITING` |
| [Spectrum](/spectrum/) | `PARTNERS_SPECTRUM` |
| [Waiting Room](/waiting-room/) | `WAITING_ROOMS_BASIC`, `WAITING_ROOMS_ADV` |

### Network services

The following table lists sample values for various network services subscriptions.

| Feature | Subscription IDs |
| --- | --- |
| [Magic Firewall](/magic-firewall/) | `MAGIC_FIREWALL_BASIC`, `MAGIC_FIREWALL_ADVANCED` |
| [Magic WAN](/magic-wan/) | `MAGIC_WAN` |

## Getting new subscriptions

If your reseller plan does not have access to a specific subscription, you will receive the following error when making an API call:

```json
"errors": [
        {
            "code": 1225,
            "message": "Your account does not have access to this product. Contact billing@cloudflare.com for assistance."
        }
]
```

To change your program or - in some cases - get a specific subscription added to your reseller plan, contact `partners@cloudflare.com`.