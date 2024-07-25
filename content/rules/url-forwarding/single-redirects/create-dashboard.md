---
pcx_content_type: how-to
title: Create rule in the dashboard
weight: 2
meta:
  title: Create a redirect rule in the dashboard
---

# Create a redirect rule in the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Rules** > **Redirect Rules**.
3. To create a new empty redirect rule, select **Create rule**. To duplicate an existing rule, select the three dots next to it > **Duplicate**.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, define the [rule expression](/ruleset-engine/rules-language/expressions/edit-expressions/).
6. Under **Then**, define the [URL redirect settings](/rules/url-forwarding/single-redirects/settings/) for requests matching the rule expression.
7. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

{{<render file="url-forwarding/_requires-proxied-site.md" withParameters="Single Redirects">}}