---
pcx_content_type: reference
title: Roles
weight: 3
meta:
    title: Account roles
---

# Roles

Whenever you [add a new member](/fundamentals/setup/manage-members/manage/) to your account, you can assign specific roles to these users.

## Account-scoped Roles

If you are adding members whose [role scope](/fundamentals/setup/manage-members/scope/) includes **All domains** and has no other limitations, you can assign **Account Scoped Roles** that apply to every domain across your account.

| Role | Description |
| --- | --- |
| Administrator | Can access the full account and edit subscriptions. Cannot manage memberships nor billing profile. |
| Super Administrator - All Privileges | Can edit any Cloudflare setting, make purchases, update billing, and manage memberships. Super Administrators can revoke the access of other Super Administrators. |
| Administrator Read Only | Can access the full account in read-only mode. |
| Analytics | Can read Analytics. |
| API Gateway | Grants full access to [API Gateway (including API Shield)](/api-shield/) for all domains in an account. |
| API Gateway Read | Grants read access to [API Gateway (including API Shield)](/api-shield/) for all domains in an account. |
| Audit Logs Viewer | Can view [Audit Logs](/fundamentals/setup/account/account-security/review-audit-logs/). |
| Bot Management (Account-wide) | Can edit [Bot Management](/bots/plans/bm-subscription/) (including [Super Bot Fight Mode](/bots/get-started/pro/)) configurations for all domains in account. |
| Billing | Can edit the account’s [billing profile](/fundamentals/subscriptions-and-billing/create-billing-profile/) and subscriptions |
| Cloudflare Access | Can edit [Cloudflare Access](/cloudflare-one/policies/access/) policies. |
| Cache Purge | Can purge the edge cache. |
| Cloudflare DEX | Can edit [Cloudflare DEX](/cloudflare-one/insights/dex/). |
| Cloudflare Gateway | Can edit [Cloudflare Gateway](/cloudflare-one/policies/gateway/) and read [Access](/cloudflare-one/identity/). |
| Cloudflare Images | Can access [Cloudflare Images](/images/) data. |
| Cloudflare R2 Admin | Can edit Cloudflare [R2](/r2/) buckets, objects, and associated configurations. |
| Cloudflare R2 Read | Can read Cloudflare [R2](/r2/) buckets, objects, and associated configurations. |
| Cloudflare Stream | Can edit [Cloudflare Stream](/stream/) media. |
| Cloudflare Workers Admin | Can edit Cloudflare [Workers](/workers/), [Pages](/pages/), [Durable Objects](/durable-objects/), [KV](/kv/) and [R2](/r2/). Also provides read access to Zones, [Zone Analytics](/analytics/account-and-zone-analytics/zone-analytics/) and [Page Rules](/rules/) |
| Cloudflare Zero Trust | Can edit [Cloudflare for Zero Trust](/cloudflare-one/). |
| Cloudflare Zero Trust PII | Can access [Cloudflare for Zero Trust](/cloudflare-one/) PII. |
| Cloudflare Zero Trust Read Only | Can access [Cloudflare for Zero Trust](/cloudflare-one/) read only mode. |
| Cloudflare Zero Trust Reporting | Can access [Cloudflare for Zero Trust](/cloudflare-one/) reporting data. |
| DNS | Can edit [DNS records](/dns/manage-dns-records/). |
| Firewall | Can edit [WAF](/waf/), [IP Access rules](/waf/tools/ip-access-rules/), [Zone Lockdown](/waf/tools/zone-lockdown/) settings, and [Cache Rules](/cache/how-to/cache-rules/). |
| Load Balancer | Can edit [Load Balancers](/load-balancing/), Pools, Origins, and Health Checks. |
| Log Share | Can edit [Log Share](/logs/) configuration. |
| Log Share Reader | Can read Enterprise [Log Share](/logs/). |
| Magic Network Monitoring | Can view and edit [MNM configuration](/magic-network-monitoring/). |
| Magic Network Monitoring Admin | Can view, edit, create, and delete [MNM configuration](/magic-network-monitoring/). |
| Magic Network Monitoring Read-Only | Can view [MNM configuration](/magic-network-monitoring/). |
| Network Services Write (Magic) | Grants write access to network configurations for Magic services. |
| Network Services Read (Magic) | Grants read access to network configurations for Magic services. |
| Minimal Account Access | Can view account, and nothing else. |
| Page Shield | Grants write access to [Page Shield](/page-shield/) across the whole account. |
| Page Shield Read | Grants read access to [Page Shield](/page-shield/) across the whole account. |
| Hyperdrive Read | Grants read access to [Hyperdrive](/hyperdrive/) database configuration. |
| Hyperdrive Admin | Grants write access to [Hyperdrive](/hyperdrive/) database configuration. |
| SSL/TLS, Caching, Performance, Page Rules, and Customization | Can edit most Cloudflare settings except for [DNS](/dns/) and [Firewall](/waf/). |
| Trust & Safety | Can access trust and safety related services. |
| Turnstile | Grants full access to [Turnstile](/turnstile/). |
| Turnstile Read | Grants read access to [Turnstile](/turnstile/). |
| Vectorize Admin | Can edit [Vectorize](/vectorize/) configurations. |
| Vectorize Read only | Can read [Vectorize](/vectorize/) configurations. |
| Waiting Room Admin | Can edit [Waiting Room](/waiting-room/) configuration. |
| Waiting Room Read  | Can read [Waiting Room](/waiting-room/) configuration. |
| Zaraz Admin | Can edit and publish [Zaraz](/zaraz/) configuration.
| Zaraz Edit | Can edit [Zaraz](/zaraz/) configuration. |
| Zaraz Read | Can read [Zaraz](/zaraz/) configuration. |
| Zone Versioning (Account-Wide) | Can view and edit [Zone Versioning](/version-management/) for all domains in account. |
| Zone Versioning Read (Account-Wide) | Can view [Zone Versioning](/version-management/) for all domains in account. |

## Domain-scoped Roles

If you are adding members whose [role scope](/fundamentals/setup/manage-members/scope/) has some limitations (specific domains allowed or excluded, limited to a domain group), you can assign **Domain Scoped Roles** that apply to all relevant domains.

| Role | Description |
| --- | --- |
| Bot Management | Can edit [Bot Management](/bots/plans/bm-subscription/) (including [Super Bot Fight Mode](/bots/get-started/pro/)) configurations. |
| Domain Administrator | Grants full access to domains in an account, and read-only access to account-wide [Firewall](/waf/managed-rules/deploy-account-dashboard/), [Access](/cloudflare-one/policies/access/), and [Worker](/workers/) resources. |
| Domain Administrator Read Only | Grants read-only access to domains in an account, as well as account-wide [Firewall](/waf/managed-rules/deploy-account-dashboard/), [Access](/cloudflare-one/policies/access/), and [Worker](/workers/) resources. |
| Domain API Gateway | Grants full access to API Gateway (including [API Shield](/api-shield/)). |
| Domain API Gateway Read | Grants read access to API Gateway (including [API Shield](/api-shield/)). |
| Domain DNS | Grants access to edit [DNS settings](/dns/) for domains in an account. |
| Domain Page Shield | Grants write access to [Page Shield](/page-shield/) for domains in an account. |
| Domain Page Shield Read | Grants read access to [Page Shield](/page-shield/) for domains in an account. |
| Domain Waiting Room Admin | Can edit [waiting rooms](/waiting-room/) configuration. |
| Domain Waiting Room Read | Can read [waiting rooms](/waiting-room/) configuration. |
| Zone Versioning | Grants full access to [Zone Versioning](/version-management/). |
| Zone Versioning Read | Grants read-only access to [Zone Versioning](/version-management/). |
