---
pcx-content-type: how-to
order: 1
---

# Define WAF exceptions in the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and website.

1. Go to **Firewall** > **WAF**.

1. Click **Add WAF exception**.

1. Enter a name for the exception.

    ![Create WAF exception page](../../images/waf-exception-create.png)

1. In **When incoming requests match**, specify a filter expression that defines the conditions for applying the WAF exception. The filter expression uses the [Rules language](https://developers.cloudflare.com/ruleset-engine/rules-language).

1. In **Then**, select the [WAF exception type](/managed-rulesets/waf-exceptions#types-of-waf-exceptions) that determines which rules to skip:

    * _Skip all remaining rules_ — Skips all remaining rules of WAF Managed Rulesets.
    * _Skip specific rules from a Managed Ruleset_ — Click **Select rules** to select the specific rules to skip. Learn more about [searching and selecting Managed Ruleset rules](/managed-rulesets/deploy-zone-dashboard#configure-rules-in-bulk-in-a-managed-ruleset).

1. To save and deploy your WAF exception, click **Deploy**. If you are not ready to deploy your exception, click **Save as Draft**.
