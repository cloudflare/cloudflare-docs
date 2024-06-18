---
title: Available Managed Transforms
pcx_content_type: reference
weight: 2
---

# Available Managed Transforms

This page lists the available Managed Transforms. They can modify HTTP request headers or response headers.

{{<Aside type="warning" header="Warning">}}
The names of HTTP headers are case-insensitive. Cloudflare may use a capitalization different from the one presented in this page. Make sure that your origin server can handle HTTP request headers regardless of the exact capitalization of their names.
{{</Aside>}}

## HTTP request headers

### Add bot protection headers

{{<Aside type="note">}}
Requires an Enterprise plan with [Bot Management](/bots/plans/bm-subscription/) enabled.
{{</Aside>}}

Adds HTTP headers with bot-related values to the request sent to the origin server:

- `cf-bot-score`: Contains the {{<glossary-tooltip term_id="bot score" link="/bots/concepts/bot-score/">}}bot score{{</glossary-tooltip>}} (for example, `30`).
- `cf-verified-bot`: Contains `true` if the request comes from a {{<glossary-tooltip term_id="verified bot" link="/bots/concepts/bot/#verified-bots">}}verified bot{{</glossary-tooltip>}}, or `false` otherwise.
- `cf-threat-score`: Contains the {{<glossary-tooltip term_id="threat score" link="/waf/tools/security-level/#threat-score">}}threat score{{</glossary-tooltip>}} (for example, `10`).
- `cf-ja3-hash`: Contains the {{<glossary-tooltip term_id="JA3 fingerprint" link="/bots/concepts/ja3-ja4-fingerprint/">}}JA3 fingerprint{{</glossary-tooltip>}}.
- `cf-ja4`: Contains the {{<glossary-tooltip term_id="JA3 fingerprint" link="/bots/concepts/ja3-ja4-fingerprint/">}}JA4 fingerprint{{</glossary-tooltip>}}.

### Add TLS client auth headers

Adds HTTP headers with [Mutual TLS](/api-shield/security/mtls/) (mTLS) client authentication values to the request sent to the origin server:

- `cf-cert-revoked`: Value from the [`cf.tls_client_auth.cert_revoked`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_revoked) field.
- `cf-cert-verified`: Value from the [`cf.tls_client_auth.cert_verified`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_verified) field.
- `cf-cert-presented`: Value from the [`cf.tls_client_auth.cert_presented`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_presented) field.
- `cf-cert-issuer-dn`: Value from the [`cf.tls_client_auth.cert_issuer_dn`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_issuer_dn) field.
- `cf-cert-subject-dn`: Value from the [`cf.tls_client_auth.cert_subject_dn`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_subject_dn) field.
- `cf-cert-issuer-dn-rfc2253`: Value from the [`cf.tls_client_auth.cert_issuer_dn_rfc2253`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_issuer_dn_rfc2253) field.
- `cf-cert-subject-dn-rfc2253`: Value from the [`cf.tls_client_auth.cert_subject_dn_rfc2253`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_subject_dn_rfc2253) field.
- `cf-cert-issuer-dn-legacy`: Value from the [`cf.tls_client_auth.cert_issuer_dn_legacy`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_issuer_dn_legacy) field.
- `cf-cert-subject-dn-legacy`: Value from the [`cf.tls_client_auth.cert_subject_dn_legacy`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_subject_dn_legacy) field.
- `cf-cert-serial`: Value from the [`cf.tls_client_auth.cert_serial`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_serial) field.
- `cf-cert-issuer-serial`: Value from the [`cf.tls_client_auth.cert_issuer_serial`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_issuer_serial) field.
- `cf-cert-fingerprint-sha256`: Value from the [`cf.tls_client_auth.cert_fingerprint_sha256`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_fingerprint_sha256) field.
- `cf-cert-fingerprint-sha1`: Value from the [`cf.tls_client_auth.cert_fingerprint_sha1`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_fingerprint_sha1) field.
- `cf-cert-not-before`: Value from the [`cf.tls_client_auth.cert_not_before`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_not_before) field.
- `cf-cert-not-after`: Value from the [`cf.tls_client_auth.cert_not_after`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_not_after) field.
- `cf-cert-ski`: Value from the [`cf.tls_client_auth.cert_ski`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_ski) field.
- `cf-cert-issuer-ski`: Value from the [`cf.tls_client_auth.cert_issuer_ski`](/ruleset-engine/rules-language/fields/#field-cf-tls_client_auth-cert_issuer_ski) field.

### Add visitor location headers

Adds HTTP headers with location information for the visitor's IP address to the request sent to the origin server:

- `cf-ipcity`: The visitor's city (value from the [`ip.src.city`](/ruleset-engine/rules-language/fields/#field-ip-src-city) field).
- `cf-ipcountry`: The visitor's country (value from the [`ip.src.country`](/ruleset-engine/rules-language/fields/#field-ip-src-country) field).
- `cf-ipcontinent`: The visitor's continent (value from the [`ip.src.continent`](/ruleset-engine/rules-language/fields/#field-ip-src-continent) field).
- `cf-iplongitude`: The visitor's longitude (value from the [`ip.src.lon`](/ruleset-engine/rules-language/fields/#field-ip-src-lon) field).
- `cf-iplatitude`: The visitor's latitude (value from the [`ip.src.lat`](/ruleset-engine/rules-language/fields/#field-ip-src-lat) field).
- `cf-region`: The visitor's region (value from the [`ip.src.region`](/ruleset-engine/rules-language/fields/#field-ip-src-region) field).
- `cf-region-code`: The visitor's region code (value from the [`ip.src.region_code`](/ruleset-engine/rules-language/fields/#field-ip-src-region_code) field).
- `cf-metro-code`: The visitor's metro code (value from the [`ip.src.metro_code`](/ruleset-engine/rules-language/fields/#field-ip-src-metro_code) field).
- `cf-postal-code`: The visitor's postal code (value from the [`ip.src.postal_code`](/ruleset-engine/rules-language/fields/#field-ip-src-postal_code) field).
- `cf-timezone`: The name of the visitor's timezone (value from the [`ip.src.timezone.name`](/ruleset-engine/rules-language/fields/#field-ip-src-timezone-name) field).

{{<Aside type="warning" header="Warning">}}
Turning on [IP geolocation](/network/ip-geolocation/) will send a `cf-ipcountry` HTTP header to your origin server even when **Add visitor location headers** is turned off.
{{</Aside>}}

### Add "True-Client-IP" header

{{<Aside type="note">}}
Only available on Enterprise plans.
{{</Aside>}}

Adds a `true-client-ip` request header with the visitor's IP address.

This Managed Transform is unavailable when [**Remove visitor IP headers**](#remove-visitor-ip-headers) is enabled.

### Remove visitor IP headers

Removes HTTP headers that may contain the visitor's IP address from the request sent to the origin server. Handles the following HTTP request headers:

- `cf-connecting-ip`
- `x-forwarded-for` (refer to the [notes](#visitor-ip-address-in-the-x-forwarded-for-http-header) below)
- `true-client-ip`

This Managed Transform is unavailable when [**Add "True-Client-IP" header**](#add-true-client-ip-header) is enabled.

#### Visitor IP address in the `x-forwarded-for` HTTP header

For the `x-forwarded-for` HTTP request header, enabling **Remove visitor IP headers** will only remove the visitor IP from the header value when Cloudflare receives a request proxied by at least another CDN (content delivery network). In this case, Cloudflare will only keep the IP address of the last proxy.

For example, consider an incoming request proxied by two CDNs (`CDN_1` and `CDN_2`) before reaching the Cloudflare network. The `x-forwarded-for` header would be similar to the following:<br>
`x-forwarded-for: <VISITOR_IP>, <THIRD_PARTY_CDN_1_IP>, <THIRD_PARTY_CDN_2_IP>`

With **Remove visitor IP headers** enabled, the `x-forwarded-for` header sent to the origin server will be:<br>
`x-forwarded-for: <THIRD_PARTY_CDN_2_IP>`

## HTTP response headers

### Remove "X-Powered-By" headers

Removes the `X-Powered-By` HTTP response header that provides information about the application at the origin server that handled the request.

### Add security headers

Adds several security-related HTTP response headers. The added response headers and values are the following:

- `x-content-type-options: nosniff`
- `x-xss-protection: 1; mode=block`
- `x-frame-options: SAMEORIGIN`
- `referrer-policy: same-origin`
- `expect-ct: max-age=86400, enforce`

To increase protection, [enable HTTP Strict Transport Security (HSTS)](/ssl/edge-certificates/additional-options/http-strict-transport-security/) for your website.
