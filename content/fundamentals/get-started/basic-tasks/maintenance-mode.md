---
title: Maintenance mode
pcx_content_type: how-to
weight: 5
---

# Maintenance mode

If you need to make large changes to your website, you may want to make your site temporarily unavailable.

## With code

If you are familiar with code, [create a Worker](/workers/get-started/guide/) that returns an [HTML page](/workers/examples/return-html/) to any site visitors.

![Workers page returned instead of your website](/images/fundamentals/workers-page.png)

## Without code

Otherwise, [create an Acccess application](/cloudflare-one/applications/configure-apps/self-hosted-apps/) with **One-time PIN** as your identity provider. Make sure to limit your [Access policy](/cloudflare-one/policies/access/policy-management/#create-a-policy) to only allow your email address.

![Example Access login page](/cloudflare-one/static/documentation/identity/otp/otp1.png)

If needed, you can also further [customize the login page](/cloudflare-one/identity/login-page/).