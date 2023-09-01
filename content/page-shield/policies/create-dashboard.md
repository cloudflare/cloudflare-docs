---
pcx_content_type: how-to
title: Create in the dashboard
weight: 2
meta:
  title: Create a policy in the dashboard
  description: Learn how to create a Page Shield policy in the Cloudflare dashboard.
---

# Create a policy in the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Page Shield** > **Policies**.
3. Select **Create policy**.
4. Enter a descriptive name for the rule in **Description**.
5. Under **If incoming requests match**, define the policy scope. You can use the Expression Builder (specifying one or more values for **Field**, **Operator**, and **Value**) or manually enter an expression using the Expression Editor. For more information, refer to [Edit expressions in the dashboard](/ruleset-engine/rules-language/expressions/edit-expressions/).
7. Under **Allow these directives**, select the desired CSP directives for the policy by enabling one or more checkboxes. To manually enter an allowed source, select **Add source**. To refresh the displayed sources based on Page Shield's detected resources, select **Refresh suggestions**. For details on CSP directives, refer to the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy).
8. Under **Then take action**, select the desired action:

    - _Allow_: Enforces the CSP directives configured in the policy, blocking any other resources (scripts) from being loaded on your website, and logging any [policy violations](/page-shield/policies/violations/).
    - _Log_: Logs any policy violations without blocking any resources (scripts) not covered by the policy.

9. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.
