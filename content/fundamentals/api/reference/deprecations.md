---
title: API deprecations
pcx_content_type: reference
weight: 5
---

# API v4 deprecations

Cloudflare occasionally makes updates to our APIs that result in behavior changes or deprecations. When this happens, we will communicate when the API will no longer be available and whether there will be a replacement.

## Mobile Redirect 
**End of life date: June 30th, 2024**

This endpoint and its related APIs are deprecated in favor of [Single Redirects](/rules/url-forwarding/single-redirects/). Refer to [Perform mobile redirects](/rules/url-forwarding/single-redirects/examples/#perform-mobile-redirects) to migrate Mobile Redirect to Redirect Rules.

Deprecated API:
 - GET /zones/:zone_identifier/settings/mobile_redirect
 - PATCH /zones/:zone_identifier/settings/mobile_redirect

Replacement: [Single Redirects](/rules/url-forwarding/single-redirects/)

## Privacy Pass API Removal
**End of life date: March 31st, 2024**

In 2017 Cloudflare [announced support](https://blog.cloudflare.com/cloudflare-supports-privacy-pass/) for Privacy Pass, a recent protocol to let users prove their identity across multiple sites anonymously without enabling tracking. The initial use case was to
provide untraceable tokens to sites to vouch for users who might otherwise have been presented with a CAPTCHA challenge. In the time
since this release, Privacy Pass has evolved both at the [IETF](https://datatracker.ietf.org/wg/privacypass/documents/) and within Cloudflare. The version announced in 2017 is now considered legacy, and these legacy Privacy Pass tokens are no 
longer supported as an alternative to Cloudflare challenges. As has been discussed on our blog [The end road for CAPTCHA](https://blog.cloudflare.com/end-cloudflare-captcha/), Cloudflare uses a variety of signals to infer if incoming traffic is likely automated. The (legacy) Privacy Pass zone setting
is no longer meaningful to Cloudflare customers as Cloudflare now operates [CAPTCHA free](https://blog.cloudflare.com/turnstile-ga/), and supports the latest [Privacy Pass draft](https://blog.cloudflare.com/eliminating-captchas-on-iphones-and-macs-using-new-standard/).
In September 2023 support for legacy Privacy Pass tokens as an alternative to Cloudflare Managed Challenge was removed. By the end of March 2024, the current public-facing API will be removed as well.

Deprecated API:
 - GET zones/:zone_identifier/settings/privacy_pass
 - POST zones/:zone_identifier/settings/privacy_pass


## ChaCha20 TLS Cipher Removal
**End of life Date: July 1st, 2023**

Back in 2016, Cloudflare [introduced support](https://blog.cloudflare.com/it-takes-two-to-chacha-poly/) for `ChaCha20-Poly1305` cipher suites for TLS 1.2.

At the time, we introduced two variants of these new suites, the "standard" suites as defined by the IETF RFC 7905, and "draft" suites that followed an earlier draft of said specification.

The draft suites were added for compatibility with some older Android devices that at the time did not yet support the proper `ChaCha20-Poly1305` standard versions.

This was in 2016, and in the meantime the standard `ChaCha20-Poly1305` cipher suites have gained much wider adoption, to the point were traffic using the old suites has dropped significantly.

Due to the current low usage and the non-standard nature of these cipher suites, we are now deprecating their support on the Cloudflare network.

This should not affect customer zones in any way, as clients that might currently use these cipher suites will be able to fallback to different ones.

In addition, unlike the standard variants, these legacy cipher suites are not exposed directly through our API (e.g. through the TLS cipher suites preferences endpoint), and their deprecation will not affect customer configurations in any way.

As of July 1st, 2023, the ChaCha20-Poly1305 ciphers have been deprecated and are deemed End of Life by Cloudflare. If you have clients that currently rely on these ciphers, it is strongly recommended to upgrade them to newer, more secure ciphers. Be aware that these deprecated ciphers will be completely removed in the first quarter of 2024, and requests using them will start to fail. Take proactive measures to ensure a smooth transition and maintain the security of your systems.

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

## Account Billing Profile, User Billing Profile, and User Billing History

**End of life date: June 6, 2023**

There is no API replacement for these endpoints. As an alternative, please log in to your Cloudflare account to view your:

- [Invoices & Billing Email](https://dash.cloudflare.com/?to=/:account/billing)
- [Billing subscriptions](https://dash.cloudflare.com/?to=/:account/billing/subscriptions) 
- [Billing profile payment info](https://dash.cloudflare.com/?to=/:account/billing/payment-info)
 
Deprecated API:

- GET `accounts/{account_identifier}/billing/profile`
- GET `user/billing/profile`
- GET `user/billing/history`

## Load Balancing - notification_email
**End of life date: April 3, 2023**

This field is deprecated and has been moved to [Cloudflare centralized notification service](/notifications/). 

`notification_email` is the email address to send health status notifications to. This can be an individual mailbox or a mailing list. Multiple emails can be supplied as a comma delimited list.

## Transfer-Encoding and Content-Length headers 
**End of life date: July 1st, 2023**

Previously, RFC 2616 allowed the use of `Transfer-Encoding` and `Content-Length` HTTP headers in the same request. RFC 7230 supersedes RFC 2616 and prohibits the use of `Transfer-Encoding` and `Content-Length` headers in the same request because they can cause HTTP request smuggling vulnerabilities.

Starting on July 1st, 2023, Cloudflare will decline requests with both `Transfer-Encoding` and `Content-Length` HTTP headers.

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

## Zone Analytics API
**End of life date: March 1, 2021**

This API is deprecated in favor of the [GraphQL Analytics API](/analytics/graphql-api/), which provides equivalent data and more features, including the ability to select only the metrics that you need. For more information, refer to the [Zone analytics to GraphQL analytics migration guide](/analytics/graphql-api/migration-guides/zone-analytics/).

Deprecated API:
- GET zones/:zone_identifier/analytics/dashboard
- GET zones/:zone_identifier/analytics/colos

Replacement:
GraphQL Analytics API

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
