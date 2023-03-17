---
pcx_content_type: concept
title: Authenticated origin pull
weight: 5
meta:
    description: Authenticated origin pulls help ensure requests to your origin server come from the Cloudflare network.
---

# Authenticated origin pull

Authenticated origin pulls help ensure requests to your origin server come from the Cloudflare network, which provides an additional layer of security on top of [Full](/ssl/origin-configuration/ssl-modes/full/) or [Full (strict)](/ssl/origin-configuration/ssl-modes/full-strict/) encryption modes.

This authentication becomes particularly important with the [Cloudflare Web Application Firewall (WAF)](/waf/). Together with the WAF, you can make sure that **all traffic** is evaluated before receiving a response from your origin server.

If you want your domain to be FIPS compliant, you must upload your own certificate (which is an option for both [zone-level](/ssl/origin-configuration/authenticated-origin-pull/set-up/zone-level/) and [per-hostname](/ssl/origin-configuration/authenticated-origin-pull/set-up/per-hostname/) authenticated origin pulls).

## Availability

{{<feature-table id="ssl.authenticated_origin_pulls">}}

## More information

{{<directory-listing>}}

## Related topics

- [SSL/TLS Encryption Modes](/ssl/origin-configuration/ssl-modes/)
- [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/)

## Limitations

Authenticated Origin Pull is incompatible with Railgun.

Authenticated Origin Pull also does not work when your [**SSL/TLS encryption mode**](/ssl/origin-configuration/ssl-modes/) is set to **Off** or **Flexible**.