---
pcx_content_type: reference
title: Enable SXGs
weight: 2
meta:
    title: Enable Automatic Signed Exchange
---

# Enable Automatic Signed Exchange

## Requirements

Before enabling Cloudflare Automatic Signed Exchange, refer to the following requirements:

* Read the [SXGs caveats](/fundamentals/speed/signed-exchanges/signed-exchanges-caveats/) to check requirements regarding request and response headers.
* SXGs are available for zones with a Pro or higher plan. SXGs are also available for zones on a Free plan with an APO subscription.
* SXGs only work with zones that have their nameservers managed by Cloudflare. Refer to [Change your nameservers](/dns/zone-setups/full-setup/setup/) to learn how to change your domain nameservers to Cloudflare. You will also have to confirm that Cloudflare is [proxying your traffic](/dns/manage-dns-records/reference/proxied-dns-records/).
* Zone certificates need to be managed by Cloudflare.

{{<Aside type="note">}}
For SXGs to be enabled, a CAA record (Certification Authority Authorization) is required to allowlist the CA (Certificate Authority) permitted to issue Certificates for signing the Signed Exchange. Cloudflare will automatically add the corresponding CAA records in DNS on behalf of users after they enable SXGs. This is to ensure that SSL certificate issuance is not blocked. If you would like to obtain SSL certificates that are issued by other CAs, make sure that you manually add the required CAA records after enabling SXGs.
{{</Aside>}}

* Content needs to be cached for 120 seconds or longer, as Google checks this setting to generate an SXG. To ensure that content is cached for 120 seconds or more, go to the [Cloudflare dashboard](https://dash.cloudflare.com/) > select your account and domain > **Caching** > **Configuration** > **Browser Cache TTL** and check the period of time Cloudflare instructs a browser to cache files.

## Enable SXGs

If your account satisfies all the requirements, follow the steps below to enable SXGs. Be aware that, currently, signed exchanges are only used on Chromium browsers on Android and desktop.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Speed** > **Optimization**.
3. Scroll to **Automatic Signed Exchanges (SXGs)** and enable it.