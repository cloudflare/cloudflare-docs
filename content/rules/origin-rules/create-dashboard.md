---
pcx_content_type: how-to
title: Create a rule in the dashboard
weight: 2
meta:
  title: Create an origin rule in the dashboard
---

# Create an origin rule in the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Rules** > **Origin Rules**.
3. Select **Create origin rule**.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, define the [rule expression](/ruleset-engine/rules-language/expressions/edit-expressions/).
6. Under **Set origin parameters**, define the [origin rule settings](/rules/origin-rules/features/) you wish to change for requests matching the rule expression.
7. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.
