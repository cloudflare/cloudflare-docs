---
_build:
  publishResources: false
  render: never
  list: never
---

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account.

2. Go to Account Home > **WAF** > **Managed rulesets**.

3. If you have already deployed the managed ruleset you want to configure, find the rule deploying that managed ruleset and select the rule description. Alternatively, select the three dots > **Edit** next to an _Execute_ rule deploying the managed ruleset.

    If you have not deployed the managed ruleset:
    1. Select **Deploy** > **Deploy managed ruleset**.
    2. Next to the managed ruleset, select **Select ruleset**.

4. Select **Browse rules**.

    ![The Cloudflare dashboard displaying the list of rules in the Cloudflare Managed Ruleset](/images/waf/waf-browse-rules.png)
