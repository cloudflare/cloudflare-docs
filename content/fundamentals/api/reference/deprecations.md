---
title: API deprecations
pcx_content_type: reference
weight: 5
---

# API v4 deprecations

Cloudflare occasionally makes updates to our APIs that result in behavior changes or deprecations. When this happens, we will communicate when the API will no longer be available and whether there will be a replacement.

## Firewall Rules API and Filters API
**End of life date: January 15th, 2025**

The Firewall Rules API and the Filters API are deprecated, since Firewall Rules was deprecated in favor of [WAF custom rules](/waf/custom-rules/). Refer to [Firewall Rules to WAF custom rules migration](/waf/reference/migration-guides/firewall-rules-to-custom-rules/) for more information about this change.

Deprecated APIs:
- GET /zones/:zone_id/firewall/rules
- POST /zones/:zone_id/firewall/rules
- PATCH /zones/:zone_id/firewall/rules
- PUT /zones/:zone_id/firewall/rules
- DELETE /zones/:zone_id/firewall/rules
- GET /zones/:zone_id/firewall/rules/:rule_id
- PATCH /zones/:zone_id/firewall/rules/:rule_id
- PUT /zones/:zone_id/firewall/rules/:rule_id
- DELETE /zones/:zone_id/firewall/rules/:rule_id
- GET /zones/:zone_id/filters
- POST /zones/:zone_id/filters
- PUT /zones/:zone_id/filters
- DELETE /zones/:zone_id/filters
- GET /zones/:zone_id/filters/:filter_id
- PUT /zones/:zone_id/filters/:filter_id
- DELETE /zones/:zone_id/filters/:filter_id

Replacement: [WAF custom rules](/waf/custom-rules/)

## WAF managed rules APIs (previous version)
**End of life date: January 15th, 2025**

The APIs for managing WAF managed rules (previous version) — namely for managing packages, rule groups, rules, and overrides — are deprecated in favor of [WAF Managed Rules](/waf/managed-rules/). Refer to [WAF Managed Rules migration](/waf/reference/migration-guides/waf-managed-rules-migration/) for more information about this change.

Deprecated APIs:
- GET /zones/:zone_id/firewall/waf/packages
- GET /zones/:zone_id/firewall/waf/packages/:package_id
- PATCH /zones/:zone_id/firewall/waf/packages/:package_id
- GET /zones/:zone_id/firewall/waf/packages/:package_id/groups
- GET /zones/:zone_id/firewall/waf/packages/:package_id/groups/:group_id
- PATCH /zones/:zone_id/firewall/waf/packages/:package_id/groups/:group_id
- GET /zones/:zone_id/firewall/waf/packages/:package_id/rules
- GET /zones/:zone_id/firewall/waf/packages/:package_id/rules/:rule_id
- PATCH /zones/:zone_id/firewall/waf/packages/:package_id/rules/:rule_id
- GET /zones/:zone_id/firewall/waf/overrides
- POST /zones/:zone_id/firewall/waf/overrides
- GET /zones/:zone_id/firewall/waf/overrides/:override_id
- PUT /zones/:zone_id/firewall/waf/overrides/:override_id
- DELETE /zones/:zone_id/firewall/waf/overrides/:override_id

Replacement: [WAF Managed Rules](/waf/managed-rules/) (new version)

## Rate Limiting API (previous version)
**End of life date: January 15th, 2025**

The Rate Limiting API is deprecated, since the previous version of rate limiting rules was deprecated in favor of the new [rate limiting rules](/waf/rate-limiting-rules/) based on the Ruleset Engine. Refer to [Rate limiting (previous version) deprecation notice](/waf/reference/migration-guides/old-rate-limiting-deprecation/) for more information about this change.

Deprecated API:
- GET /zones/:zone_id/rate_limits
- POST /zones/:zone_id/rate_limits
- GET /zones/:zone_id/rate_limits/:rate_limit_id
- PUT /zones/:zone_id/rate_limits/:rate_limit_id
- DELETE /zones/:zone_id/rate_limits/:rate_limit_id

Replacement: [Rate limiting rules](/waf/rate-limiting-rules/) (new version)

## DNS Records: Error chains for DNS validation errors
**End of life date: October 1st, 2024**

Cloudflare is making a minor change to the representation of certain errors when creating DNS records. Currently, when the DNS record to be created is invalid, an error similar to the following may be returned:

```
{
  "result": null,
  "success": false,
  "errors": [
    {
      "code": 1004,
      "message": "DNS Validation Error",
      "error_chain": [
        {
          "code": 9999,
          "message": "This is an example."
        }
      ]
    }
  ],
  "messages": []
}
```

After October 1st, 2024, the `error_chain` will be omitted, returning the root cause directly without wrapping it in another "DNS Validation Error" error:

```
{
  "result": null,
  "success": false,
  "errors": [
    {
      "code": 9999,
      "message": "This is an example."
    }
  ],
  "messages": []
}
```

## Legacy DNS Settings Endpoints
**End of life date: September 13th, 2024**

The dedicated endpoints for DNS settings `use_apex_ns` and `secondary_overrides` are being deprecated.

Instead, use the [Show DNS Settings](/api/operations/dns-settings-for-a-zone-list-dns-settings) and [Update DNS Settings](/api/operations/dns-settings-for-a-zone-update-dns-settings) endpoints to manage these settings.

- Instead of the `.../use_apex_ns` endpoint, use the `multi_provider` field.
- Instead of the `.../secondary_overrides` endpoint, use the `secondary_overrides` field.

Deprecated APIs:
- GET /zones/:zone_id/dns_settings/use_apex_ns
- PATCH /zones/:zone_id/dns_settings/use_apex_ns
- GET /zones/:zone_id/dns_settings/secondary_overrides
- PATCH /zones/:zone_id/dns_settings/secondary_overrides

## Brotli
**End of life date: August 15th, 2024**

The Brotli setting and its API endpoints are deprecated. After the end of life date, Brotli compression will be enabled by default for all zones.

Deprecated APIs:
- GET /zones/:zone_id/settings/brotli
- PATCH /zones/:zone_id/settings/brotli

Enterprise customers can override Cloudflare's default compression behavior using [Compression Rules](/rules/compression-rules/).

## Auto Minify
**End of life date: August 5th, 2024**

The Auto Minify API endpoints are deprecated, since the Auto Minify feature was deprecated.

Deprecated APIs:
- GET /zones/:zone_id/settings/minify
- PATCH /zones/:zone_id/settings/minify

## DNS Records: "locked" Field
**End of life date: July 14th, 2024**

The `"locked"` field of DNS records in API responses is unused and has been guaranteed to always be `false` for more than a year. This deprecation means that the field will be omitted from API responses entirely. If received from a client, the field will continue to be ignored, just as it is today.

Modified API:
 - GET /zones/:zone_id/dns_records
 - POST /zones/:zone_id/dns_records
 - GET /zones/:zone_id/dns_records/:dns_record_id
 - PATCH /zones/:zone_id/dns_records/:dns_record_id
 - PUT /zones/:zone_id/dns_records/:dns_record_id

## Mobile Redirect
**End of life date: June 30th, 2024**

This endpoint and its related APIs are deprecated in favor of [Single Redirects](/rules/url-forwarding/single-redirects/). Refer to [Perform mobile redirects](/rules/url-forwarding/examples/perform-mobile-redirects/) to migrate Mobile Redirect to Redirect Rules.

Deprecated API:
 - GET /zones/:zone_identifier/settings/mobile_redirect
 - PATCH /zones/:zone_identifier/settings/mobile_redirect

Replacement: [Single Redirects](/rules/url-forwarding/single-redirects/)

---

## Server-side Excludes
**End of life date: June 14th, 2024**

The Server-side Excludes feature and its API endpoints are deprecated.

Deprecated APIs:
- GET /zones/:zone_id/settings/server_side_exclude
- PATCH /zones/:zone_id/settings/server_side_exclude

## Name-Related Data Fields on SRV (DNS) Records
**End of life date: May 31st, 2024**

The name of an SRV record normally consists of three parts: the service (e.g., `_xmpp`), the protocol (e.g., `_tcp`), and the base name (`example.com`).
The complete name would then be, e.g., `_xmpp._tcp.example.com`.

When interacting with DNS records through the [API](/api/operations/dns-records-for-a-zone-create-dns-record), SRV records contain both a full `name` as well as a `data` map containing the individual components of the name:

```txt
{
  "name": "_xmpp._tcp.example.com",
  "data": {
    "service": "_xmpp",
    "proto": "_tcp",
    "name": "example.com",
    ...
  },
  ...
}
```

We are deprecating the `service`, `proto` and `name` fields *within* the `data` map in favor of the `name` field *outside* the data map, which is the same name field that's used by all other record types.

Before the end of life date, please ensure that:

- when reading SRV records, you use only the `name` outside of the data map and ignore `service`, `proto` and `name` within the data map if they exist; and
- when writing SRV records, you set the `name` outside of the data map and **do not set** `service`, `proto` or `name` within the data map.

After the end of life date, the API will stop producing the `service`, `proto` and `name` data fields, and if any of them are received from a client, an error will be returned.

This deprecation does not affect other SRV data fields not mentioned above (`priority`, `weight`, `port`, `target`) or data fields for any other record type other than SRV.

Modified API:
 - GET /zones/:zone_id/dns_records
 - POST /zones/:zone_id/dns_records
 - GET /zones/:zone_id/dns_records/:dns_record_id
 - PATCH /zones/:zone_id/dns_records/:dns_record_id
 - PUT /zones/:zone_id/dns_records/:dns_record_id

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

## Argo Tunnel
**End of life Date: February 4th, 2024**

This endpoint and its related APIs are deprecated in favor of the Cloudflare Tunnels equivalent APIs.

Deprecated API:
- GET accounts/:account_identifier/tunnels
- POST accounts/:account_identifier/tunnels
- GET accounts/:account_identifier/tunnels/:tunnel_id
- DELETE accounts/:account_identifier/tunnels/:tunnel_id

Replacement:
Cloudflare Tunnel API

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

## Transfer-Encoding and Content-Length headers
**End of life date: July 1st, 2023**

Previously, RFC 2616 allowed the use of `Transfer-Encoding` and `Content-Length` HTTP headers in the same request. RFC 7230 supersedes RFC 2616 and prohibits the use of `Transfer-Encoding` and `Content-Length` headers in the same request because they can cause HTTP request smuggling vulnerabilities.

Starting on July 1st, 2023, Cloudflare will decline requests with both `Transfer-Encoding` and `Content-Length` HTTP headers.

## Account Billing Profile, User Billing Profile, and User Billing History
**End of life date: June 6th, 2023**

There is no API replacement for these endpoints. As an alternative, please log in to your Cloudflare account to view your:

- [Invoices & Billing Email](https://dash.cloudflare.com/?to=/:account/billing)
- [Billing subscriptions](https://dash.cloudflare.com/?to=/:account/billing/subscriptions)
- [Billing profile payment info](https://dash.cloudflare.com/?to=/:account/billing/payment-info)

Deprecated API:

- GET `accounts/{account_identifier}/billing/profile`
- GET `user/billing/profile`
- GET `user/billing/history`

## Load Balancing - notification_email
**End of life date: April 3rd, 2023**

This field is deprecated and has been moved to [Cloudflare centralized notification service](/notifications/).

`notification_email` is the email address to send health status notifications to. This can be an individual mailbox or a mailing list. Multiple emails can be supplied as a comma delimited list.

## Access Bookmark applications
**End of life date: March 19th, 2023**

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
**End of life date: October 11th, 2022**

Replace `script_monitor` in Page Shield API routes with `page_shield`.


## Cloudflare Images - Create authenticated direct upload URL v1
**End of life date: July 1st, 2022**

This endpoint is deprecated in favor of using v2, which allows you to control metadata, define an access policy, and get the image ID.

Deprecated API:
POST accounts/:account_identifier/images/v1/direct_upload

Replacement:
POST accounts/:account_identifier/images/v2/direct_upload

## Zone Analytics API
**End of life date: March 1st, 2021**

This API is deprecated in favor of the [GraphQL Analytics API](/analytics/graphql-api/), which provides equivalent data and more features, including the ability to select only the metrics that you need. For more information, refer to the [Zone analytics to GraphQL analytics migration guide](/analytics/graphql-api/migration-guides/zone-analytics/).

Deprecated API:
- GET zones/:zone_identifier/analytics/dashboard
- GET zones/:zone_identifier/analytics/colos

Replacement:
GraphQL Analytics API

## Organizations
**End of life date: February 4th, 2020**

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
