---
title: Create a rule in the dashboard
pcx_content_type: how-to
weight: 1
meta:
  title: Create a compression rule in the dashboard
---

# Create a compression rule in the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Rules** > **Compression Rules**.
3. To create a new empty rule, select **Create rule**. To duplicate an existing rule, select the three dots next to it > **Duplicate**.
4. Enter a descriptive name for the rule in **Rule name**.
5. Under **When incoming requests match**, select if you wish to apply the rule to all incoming requests or only to requests that match a custom filter expression.
6. (Optional) To define a custom expression, use the Expression Builder (specifying one or more values for **Field**, **Operator**, and **Value**) or manually enter an expression using the Expression Editor. For more information, refer to [Edit rule expressions](/ruleset-engine/rules-language/expressions/edit-expressions/).
7. Under **Compression options**, set the [compression options](/rules/compression-rules/settings/#dashboard-configuration-settings) for requests matching the rule expression.
8. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.
