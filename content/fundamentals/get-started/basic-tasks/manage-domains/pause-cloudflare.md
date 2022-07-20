---
pcx-content-type: reference
title: Pause Cloudflare
weight: 5
---

# Pause Cloudflare

Pause Cloudflare to send traffic directly to your origin web server instead of Cloudflare's reverse proxy.

No Cloudflare services such as SSL or WAF are enabled for paused domains.  An alternative to pausing Cloudflare globally is to grey-cloud the records receiving traffic in your Cloudflare DNS app.

{{<Aside type="note">}}

To troubleshoot caching issues, you can enable Development Mode. This will bypass Cloudflare's cache only.

{{</Aside>}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.

2. Within **Overview**, choose **Advanced Actions** > **Pause Cloudflare on Site**.

Pausing Cloudflare takes 5 minutes or less to complete. Changing nameservers can cause propagation delays of several hours.
