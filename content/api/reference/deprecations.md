---
title: API deprecations
pcx_content_type: reference
weight: 22
---

# API v4 deprecations

Cloudflare occassionally makes updates to our APIs that result in behavior changes or deprecations. When this happens, we will communicate when the API will no longer be available and whether there will be a replacement.

## Argo Tunnel
**End of life Date: February 4, 2024**

This endpoint and its related APIs are deprecated in favor of the Cloudflare Tunnels equivalent APIs.

Deprecated API:
- GET accounts/:account_identifier/tunnels
- POST accounts/:account_identifier/tunnels
- GET accounts/:account_identifier/tunnels/:tunnel_id
- DELETE accounts/:account_identifier/tunnels/:tunnel_id

Replacement:
Cloudflare Tunnel API


## Access Bookmark applications
**End of life date: March 19, 2023**

This endpoint is deprecated in favor of using a specialized Access Application App Type API.

Deprecated API:
- GET accounts/:identifier/access/bookmarks
- GET accounts/:identifier/access/bookmarks/:uuid
- POST accounts/:identifier/access/bookmarks/:uuid
- PUT accounts/:identifier/access/bookmarks/:uuid
- DELETE accounts/:identifier/access/bookmarks/:uuid

Replacement:
Access applications app type API


## Page Shield
**End of life date: October 11, 2022**

Replace `script_monitor` in Page Shield API routes with `page_shield`.


## Cloudflare Images - Create authenticated direct upload URL v1
**End of life date: July 1, 2022**

This endpoint is deprecated in favor of using v2, which allows you to control metadata, define an access policy, and get the image ID.

Deprecated API:
POST accounts/:account_identifier/images/v1/direct_upload

Replacement:
POST accounts/:account_identifier/images/v2/direct_upload


## DNS Firewall Analytics - virtual_dns
**End of life date: July 1, 2022**

Replace `virtual_dns` in DNS Firewall Analytics routes with `dns_firewall`.


## DNS Firewall - virtual_dns
**End of life date: July 1, 2022**

Replace `virtual_dns` in DNS Firewall routes with `dns_firewall`.

The following changes were made in the new routes:

- `virtual_dns_ips` has been renamed to `dns_firewall_ips`.
- A disabled ratelimit is now represented by `null` instead of `0`.
- The `PATCH` method must be used instead of `PUT` to update clusters.

## Zone Analytics API
**End of life date: March 1, 2021**

This API is deprecated in favor of the [GraphQL Analytics AP](https://developers.cloudflare.com/analytics/graphql-api/), which provides equivalent data and more features, including the ability to select only the metrics that you need. For more information, refer to the [Zone analytics to GraphQL analytics migration guide](https://developers.cloudflare.com/analytics/graphql-api/migration-guides/zone-analytics/).

Deprecated API:
- GET zones/:zone_identifier/analytics/dashboard
- GET zones/:zone_identifier/analytics/colos

Replacement:
GraphQL Analytics API

## Zone settings - __cfduid
**End of life date: May 10, 2021**

The `__cfduid` cookie was set on Cloudflare HTTP responses and used for providing critical performance and security services on behalf of our customers. For more information on why we transitioned away from this cookie, refer to [Deprecating the `__cfduid` cookie](https://blog.cloudflare.com/deprecating-cfduid-cookie/).

Cloudflare permanently stopped adding a `Set-Cookie` header on all HTTP responses on May 10, 2021. The last `__cfduid` cookies expired 30 days after that.

## `cf-request-id`
**End of life date: July 1, 2021**

In mid-2020, Cloudflare introduced `cf-request-id`, an experimental HTTP header. This header was present on requests sent to origins and returned in responses to eyeballs (users). After careful evaluation, we decided to remove the `cf-request-id` header.

If you require an identifier for requests, Cloudflare recommends using the CF-RAY header.

## Organizations
**End of life date: February 4, 2020**

This endpoint and its related APIs are deprecated in favor of the `/accounts` equivalent API, which has a broader range of features and is backwards compatible with the `/organizations` API.

Deprecated API:
- GET organizations/:identifier
- PATCH organizations/:identifier
- GET organizations/:organization_identifier/invites
- POST organizations/:organization_identifier/invites
- GET organizations/:organization_identifier/invites/:identifier
- PATCH organizations/:organization_identifier/invites/:identifier
- DELETE organizations/:organization_identifier/invites/:identifier
- GET organizations/:organization_identifier/members
- GET organizations/:organization_identifier/members/:identifier
- PATCH organizations/:organization_identifier/members/:identifier
- DELETE organizations/:organization_identifier/members/:identifier
- GET organizations/:organization_identifier/roles
- GET organizations/:organization_identifier/roles/:identifier
- GET organizations/:organization_identifier/audit_logs
- GET organizations/:organization_identifier/railguns
- POST organizations/:organization_identifier/railguns
- GET organizations/:organization_identifier/railguns/:identifier
- PATCH organizations/:organization_identifier/railguns/:identifier
- DELETE organizations/:organization_identifier/railguns/:identifier
- GET organizations/:organization_identifier/railguns/:identifier/zones

Replacement:
Accounts API