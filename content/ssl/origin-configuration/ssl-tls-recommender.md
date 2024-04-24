---
pcx_content_type: concept
title: SSL/TLS Recommender
weight: 2
---

# SSL/TLS Recommender

The SSL/TLS Recommender helps you choose which [Encryption mode](/ssl/origin-configuration/ssl-modes/) is best for your application.

{{<Aside type="note">}}

For more background, refer to the [introductory blog post](https://blog.cloudflare.com/ssl-tls-recommender).

{{</Aside>}}

## Availability

{{<feature-table id="ssl.ssl_tls_recommender">}}

## Common tasks

### Enable SSL/TLS recommendations

{{<render file="_ssl-recommender-prereqs.md">}}

Then, you can enable the SSL/TLS recommender.

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}
 
To enable SSL/TLS recommendations in the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and application.
2.  Go to **SSL/TLS**.
3.  For **SSL/TLS Recommender**, switch the toggle to **On**.
 
{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To adjust your SSL/TLS Recommender enrollment with the API, send a [`PATCH`](/api/operations/ssl/-tls-mode-recommendation-ssl/-tls-recommendation) request with the `enabled` parameter set to your desired setting (`true` or `false`).
 
{{</tab>}}
{{</tabs>}}

### Manually trigger a new scan

Once you enable it, the recommender runs future scans periodically — typically every two days — and sends notifications if new recommendations become available.

To manually re-trigger a new scan, disable and then [re-enable SSL/TLS recommendations](#enable-ssltls-recommendations).

## How it works

{{<render file="_ssl-recommender-post-setup.md">}}