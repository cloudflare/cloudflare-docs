---
pcx_content_type: navigation
title: Authenticated origin pull
weight: 5
---

# Authenticated origin pull

Authenticated origin pulls help ensure requests to your origin server come from the Cloudflare network, which provides an additional layer of security on top of [Full](/ssl/origin-configuration/ssl-modes/full/) or [Full (strict)](/ssl/origin-configuration/ssl-modes/full-strict/) encryption modes.

This authentication becomes particularly important with the Cloudflare Web Application Firewall (WAF). Together with the WAF, you can make sure that **all traffic** is evaluated before receiving a response from your origin server.

If you want your domain to be FIPS compliant, you must [upload your own certificate](/ssl/origin-configuration/authenticated-origin-pull/set-up/#per-hostname--customer-certificates).

## More information

{{<directory-listing>}}

## Related topics

- [SSL/TLS Encryption Modes](/ssl/origin-configuration/ssl-modes/)
- [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/)

## Limitations

Authenticated Origin Pull is incompatible with Railgun.