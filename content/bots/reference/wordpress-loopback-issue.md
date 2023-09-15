---
pcx_content_type: troubleshooting
title: Super Bot Fight Mode for WordPress
weight: 0
---

# Optimize Super Bot Fight Mode for WordPress

{{<render file="_wordpress-loopback-definition">}}
<br/>

WordPress relies on making loopback requests in order to monitor and occasionally administer its websites. Customers can opt-in to optimize Super Bot Fight Mode for WordPress. If this feature is enabled, automated loopback requests made by your WordPress site will be authorized even when Super Bot Fight Mode blocks other bots. 

{{<Aside type="note">}}
Loopback requests may also be blocked by [I’m Under Attack mode](/fundamentals/security/under-attack-mode/) or certain [Firewall rules](/firewall/). 
{{</Aside>}}

## Enable Optimize for WordPress

1. Log in to the [Cloudflare Dashboard](http://dash.cloudflare.com) and select your account and domain.
2. Go to **Security** > **Bots**.
3. Select **Configure Bot Management**. 
4. Enable **Optimize for WordPress**.

## Availability

This feature is available for all Super Bot Fight Mode customers. 