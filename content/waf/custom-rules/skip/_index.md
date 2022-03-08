---
title: Configure a rule with the Skip action
pcx-content-type: how-to
weight: 4
meta:
  title: Configure a Custom Rule with the Skip action
---

# Configure a Custom Rule with the Skip action

Use the *Skip* action in a Custom Rule to skip one or more security features. A rule configured with the *Skip* action is also known as a skip rule.

For more information on the available options, refer to [Available skip options](/waf/custom-rules/skip/options/).

## Using the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and website.

2. Go to **Security** > **WAF** > **Custom Rules**.

3. [Create a Custom Rule](/waf/custom-rules/create-dashboard/) by clicking **Create custom rule**, or edit an existing Custom Rule.

4. Define the rule name and the rule expression.

5. Under **Choose action**, select *Skip* from the dropdown.

    <div class="large-img">
      <img alt="Skip action options in Custom Rules" src="/waf/static/custom-rules/skip-action-options.png"/>
    </div>

6. Configure the desired [skip options](/waf/custom-rules/skip/options/).

7. Save your changes.

## Using the API

Use the [Rulesets API](/ruleset-engine/rulesets-api/) to configure Custom Rules via API.

Refer to [API examples](/waf/custom-rules/skip/api-examples/) for example API requests.
