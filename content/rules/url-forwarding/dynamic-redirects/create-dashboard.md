---
pcx_content_type: how-to
title: Create in the dashboard
weight: 2
meta:
  title: Create a dynamic redirect in the dashboard
---

# Create a dynamic redirect in the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Rules** > **Dynamic Redirects**.
3. Select **Create dynamic redirect**.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, define the [rule expression](/firewall/cf-dashboard/edit-expressions/).
6. Under **Then**, define the [URL redirect settings](/rules/url-forwarding/dynamic-redirects/settings/) for requests matching the rule expression.
7. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.