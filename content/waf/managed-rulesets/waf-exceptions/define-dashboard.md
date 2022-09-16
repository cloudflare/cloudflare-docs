---
pcx_content_type: how-to
title: Define WAF exceptions in the dashboard
weight: 2
---

# Define WAF exceptions in the dashboard

## 1. Navigate to the zone or account dashboard page

To define a WAF exception at the zone level:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** > **WAF** > **Managed rules**.
3. Select **Add exception**.

To define a WAF exception at the account level (Enterprise plans only):

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account.
2. Go to **Application Security Security** > **WAF** > **Managed rulesets**.
3. Select **Deploy** > **Deploy managed exception**.

## 2. Create the WAF exception

1. In the exception creation page, enter a name for the exception.

    ![The Add exception page in the Cloudflare dashboard](/waf/static/waf-exception-create.png)

2. In **When incoming requests match**, specify a filter expression that defines the conditions for applying the WAF exception. The filter expression uses the [Rules language](/ruleset-engine/rules-language/).

3. In **Then**, select the [exception type](/waf/managed-rulesets/waf-exceptions/#types-of-waf-exceptions) that determines which rules to skip:

    - _Skip all remaining rules_ — Skips all remaining rules of WAF Managed Rulesets.
    - _Skip specific rules from a Managed Ruleset_ — Select **Select rules** to select the specific rules to skip. Learn more about [searching and selecting Managed Ruleset rules](/waf/managed-rulesets/deploy-zone-dashboard/#configure-rules-in-bulk-in-a-managed-ruleset).

4. (Optional) To disable logging for requests matching the WAF exception, disable **Log matching requests**.

5. To save and deploy your exception, select **Deploy**. If you are not ready to deploy your exception, select **Save as Draft**.
