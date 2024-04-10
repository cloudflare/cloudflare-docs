---
title: Rotate secret key
pcx_content_type: how-to
weight: 2
---

# Rotate the secret key

You can rotate the {{<glossary-tooltip term_id="secret key">}}secret key{{</glossary-tooltip>}} using the following steps: 

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/?to=/:account/turnstile) and select your account.
2. Go to **Turnstile**.
3. In the widget overview, select **Settings** > **Rotate Secret Key**.
4. Configure your website to use the new secret key.

The rotation occurs over the course of two hours. During this time, both the old secret key and the new secret key are valid. This allows you to swap the secret key while avoiding any issues with your website. 
