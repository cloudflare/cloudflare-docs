---
pcx_content_type: how-to
title: Enable AMP Real URL
weight: 1
---

# Enable AMP Real URL

## Requirements

AMP Real URL is available for all plans. However, refer to the following requirements before enabling this feature:

* AMP Real URL relies on signed exchanges so all [requirements for signed exchanges must be met](/fundamentals/speed/signed-exchanges/enable-signed-exchange/).
* The origin server [must support AMP responses](https://amp.dev/about/how-amp-works/).

## Enable AMP Real URL

If your account satisfies the requirements to enable AMP Real URL:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Speed** > **Optimization**.
3. Scroll to **AMP Real URL** and toggle the button to enable it.

## Limitations

Since AMP Real URL responses are packaged in a signed exchange (SXG), the [limitations for SXGs apply](/fundamentals/speed/signed-exchanges/signed-exchanges-caveats/).