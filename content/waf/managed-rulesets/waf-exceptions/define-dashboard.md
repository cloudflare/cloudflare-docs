---
pcx_content_type: how-to
title: Define WAF exceptions in the dashboard
weight: 2
---

# Define WAF exceptions in the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and website.

2. Go to **Security** > **WAF** > **Managed rules**.

3. Click **Add exception**.

4. Enter a name for the exception.

    ![The Add exception page in the Cloudflare dashboard](/waf/static/waf-exception-create.png)

5. In **When incoming requests match**, specify a filter expression that defines the conditions for applying the WAF exception. The filter expression uses the [Rules language](/ruleset-engine/rules-language/).

6. In **Then**, select the [exception type](/waf/managed-rulesets/waf-exceptions/#types-of-waf-exceptions) that determines which rules to skip:

    - _Skip all remaining rules_ — Skips all remaining rules of WAF Managed Rulesets.
    - _Skip specific rules from a Managed Ruleset_ — Click **Select rules** to select the specific rules to skip. Learn more about [searching and selecting Managed Ruleset rules](/waf/managed-rulesets/deploy-zone-dashboard/#configure-rules-in-bulk-in-a-managed-ruleset).

7. To save and deploy your exception, click **Deploy**. If you are not ready to deploy your exception, click **Save as Draft**.
