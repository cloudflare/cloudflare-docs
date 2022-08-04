---
pcx_content_type: concept
title: SSL/TLS Recommender
weight: 4
---

# SSL/TLS Recommender

The **SSL/TLS Recommender** helps you choose which [Encryption mode](/ssl/origin-configuration/ssl-modes/) is best for your application.

{{<Aside type="note">}}

For more background, refer to the [introductory blog post](https://blog.cloudflare.com/ssl-tls-recommender).

{{</Aside>}}

## Common tasks

### Enable SSL/TLS recommendations

To enable SSL/TLS recommendations:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and application.
2.  Navigate to **SSL/TLS**.
3.  For **SSL/TLS Recommender**, switch the toggle to **On**.

### Manually trigger a new scan

Once you enable it, the recommender runs future scans periodically — typically every two days — and sends notifications if new recommendations become available.

To manually re-trigger a new scan, disable and then [re-enable SSL/TLS recommendations](#enable-ssltls-recommendations).

## How it works

Once enabled, the SSL/TLS Recommender runs an origin scan using the user agent `Cloudflare-SSLDetector` and ignores your `robots.txt` file (except for rules explicitly targeting the user agent).

Based on this initial scan, the Recommender may decide that you could use a stronger [SSL encryption mode](/ssl/origin-configuration/ssl-modes/). It will never recommend a weaker option than what is currently configured.

If so, it will send the zone owner an email with the recommended option and add a _Recommended by Cloudflare_ tag to that option on the **SSL/TLS** page. You are not required to use this recommendation.

{{<Aside type="note">}}

If you do not receive an email, keep your current **SSL encryption mode**.

{{</Aside>}}

## Limitations

The SSL/TLS Recommender is not intended to resolve issues with website or domain functionality. It will not be able to complete its scan and show the _Recommended by Cloudflare_ tag if:

- Your domain is not functional.
- You block all bots.
- You have any active, SSL-specific Page Rules.

If you have any questions or concerns related to **SSL/TLS Recommender**, contact ask-research@cloudflare.com.
