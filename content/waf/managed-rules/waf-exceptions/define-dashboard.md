---
pcx_content_type: how-to
title: Add an exception in the dashboard
weight: 2
meta:
    title: Add a WAF exception in the dashboard
    description: Use the Cloudflare dashboard to create exceptions that skip the execution of WAF managed rulesets or specific ruleset rules.
---

# Add a WAF exception in the dashboard

## 1. Go to the zone or account dashboard page

To add a WAF exception at the zone level:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** > **WAF** > **Managed rules**.
3. Select **Add exception**.

To add a WAF exception at the account level (Enterprise plans only):

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account.
2. Go to Account Home > **WAF** > **Managed rulesets**.
3. Select **Deploy** > **Deploy managed exception**.

## 2. Define basic exception parameters

1. In **Exception name**, enter a name for the exception.

    ![The Add exception page in the Cloudflare dashboard](/images/waf/waf-exception-create.png)

2. In **When incoming requests match**, specify a filter expression that defines the conditions for applying the WAF exception. When the expression matches, the WAF will evaluate the exception skipping one or more rules of WAF managed rulesets. The filter expression uses the [Rules language](/ruleset-engine/rules-language/).

## 3. Select the rules to skip

1. In **Then**, select the [exception type](/waf/managed-rules/waf-exceptions/#types-of-waf-exceptions) that determines which rules to skip:

    - **Skip all remaining rules**: Skips all remaining rules of WAF managed rulesets. If you select this option, proceed to [4. Create the exception](#4-create-the-exception).
    - **Skip specific rules from a Managed Ruleset**: Skips one or more rules of a managed ruleset.

2. Select **Select ruleset**.

3. Next to the ruleset containing the rule(s) you wish to skip, select **Select rules**.

4. **A) To skip one or more rules in the ruleset:**

    1. Search for a rule using the available filters. You can search by description, rule ID, or tag. For example, in the Cloudflare OWASP Core Ruleset you can search for `920460` to find the rule `920460: Abnormal character escapes in request`.
    2. Select the checkbox next to the rule(s) you wish to skip.
    3. If required, search for other rules and select them. The dashboard keeps a list of the rules you selected between searches.

    **B) To skip all the rules in the ruleset:**

    1. Select all the rules in the current page by selecting the checkbox in the table header, near **Description/Rule ID**. The table header will display `10 rules selected (of <TOTAL> rules)`.

        ![Rule selection page showing the option to select all the rules in the ruleset](/images/waf/waf-exception-select-all-rules.png)

    2. Select **Select all &lt;TOTAL&gt; rules** in the table header to select all the rules across all pages.

5. Select **Next**.

## 4. Create the exception

1. (Optional) To disable logging for requests matching the WAF exception, disable **Log matching requests**.

2. To save and deploy your exception, select **Deploy**. If you are not ready to deploy your exception, select **Save as Draft**.

{{<Aside type="note">}}
WAF exceptions only apply to rules executing a managed ruleset listed after them. For example, if you are skipping a rule belonging to the Cloudflare OWASP Core Ruleset, make sure the exception is listed in **Security** > **WAF** > **Managed rules** _before_ the execute rule deploying this managed ruleset.
{{</Aside>}}