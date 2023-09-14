---
title: SSL/TLS settings
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

Once you make sure that your Cloudflare SSL/TLS [is working correctly](/learning-paths/get-started-free/onboarding/check-ssl/), you will likely want to customize your SSL/TLS setup.

---

## Encryption mode

{{<render file="_encryption-mode-definition.md" productFolder="ssl">}}
<br/>

### Basic setup

The simplest way to choose your encryption mode is to enable the **SSL/TLS Recommender**, which scans your domain and recommends the appropriate setting.

{{<render file="_ssl-recommender-prereqs" productFolder="ssl">}}

Then, you can enable SSL/TLS recommendations in the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and application.
2.  Go to **SSL/TLS**.
3.  For **SSL/TLS Recommender**, switch the toggle to **On**.

{{<render file="_ssl-recommender-post-setup.md" productFolder="ssl">}}

### Secure setup

If possible, Cloudflare recommends using [**Full**](/ssl/origin-configuration/ssl-modes/full/) or [**Full (strict)**](/ssl/origin-configuration/ssl-modes/full-strict/) modes to prevent malicious connections to your origin.

These modes usually require additional setup and can be more technically challenging.

---

## Enforce HTTPS connections

{{<render file="_enforce-https-recommendation.md" productFolder="ssl">}}

---

## Evaluate additional features

{{<render file="_get-started-additional-features.md" productFolder="ssl">}}