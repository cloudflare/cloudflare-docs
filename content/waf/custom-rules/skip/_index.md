---
title: Configure a rule with the Skip action
pcx_content_type: how-to
weight: 4
meta:
  title: Configure a custom rule with the Skip action
layout: single
---

# Configure a custom rule with the Skip action

Use the *Skip* action in a custom rule to skip one or more security features. A rule configured with the *Skip* action is also known as a skip rule.

For more information on the available options, refer to [Available skip options](/waf/custom-rules/skip/options/).

## Using the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and domain.

2. Go to **Security** > **WAF** > **Custom rules**.

3. [Create a custom rule](/waf/custom-rules/create-dashboard/) by selecting **Create rule**, or edit an existing custom rule.

4. Define the rule name and the rule expression.

5. Under **Choose action**, select *Skip* from the dropdown.

    ![Available Skip action options when configuring a custom rule](/images/waf/custom-rules/skip-action-options.png)

6. Configure the desired [skip options](/waf/custom-rules/skip/options/).

7. Save your changes.

## Using the API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to configure custom rules via API.

Refer to [API examples](/waf/custom-rules/skip/api-examples/) for example API requests.
