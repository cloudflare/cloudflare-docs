---
pcx_content_type: reference
title: Encryption modes
weight: 2
---

# Encryption modes

The modes listed below control the scheme (`http://` or `https://`) that Cloudflare uses to connect to your origin web server and how SSL certificates presented by your origin will be validated.

If possible, Cloudflare strongly recommends using [**Full**](/ssl/origin-configuration/ssl-modes/full/) or [**Full (strict)**](/ssl/origin-configuration/ssl-modes/full-strict/) modes to prevent malicious connections to your origin.

For more details about how your encryption mode fits into the bigger picture of SSL/TLS protection, refer to [Get started](/ssl/get-started/).

{{<Aside type="note" header="Tip:">}}

If you are not sure which encryption mode to use, enable the [SSL/TLS Recommender](/ssl/origin-configuration/ssl-tls-recommender/).

{{</Aside>}}

## Available encryption modes

{{<directory-listing>}}

## Update your encryption mode

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To change your encryption mode in the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2.  Go to **SSL/TLS**.
3.  Choose an encryption mode.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To adjust your encryption mode with the API, send a [`PATCH`](https://api.cloudflare.com/#zone-settings-change-ssl-setting) request with the `value` parameter set to your desired setting (`off`, `flexible`, `full`, `strict`).

{{<Aside type="note">}}

Your available values depend on your zone's plan level.

{{</Aside>}}
 
{{</tab>}}
{{</tabs>}}

## ERR_SSL_VERSION_OR_CIPHER_MISMATCH

If you are experiencing `ERR_SSL_VERSION_OR_CIPHER_MISMATCH` errors, refer to this [community thread](https://community.cloudflare.com/t/community-tip-fixing-err-ssl-version-or-cipher-mismatch-in-google-chrome/42162).
