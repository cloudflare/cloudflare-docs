---
pcx_content_type: how-to
title: Create in the dashboard
weight: 2
meta:
  title: Create a policy in the dashboard
---

# Create a policy in the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Page Shield** > **Policies**.
3. Select **Create policy**.
4. Enter a descriptive name for the rule in **Description**.
5. Under **If incoming requests match**, define the policy scope. You can use the Expression Builder (specifying one or more values for **Field**, **Operator**, and **Value**) or manually enter an expression using the Expression Editor. For more information, refer to [Edit rule expressions](/firewall/cf-dashboard/edit-expressions/).
7. Under **Allow these directives**, select the desired CSP directives for the policy by enabling one or more checkboxes. To manually enter an allowed source, select **Add source**. To refresh the displayed sources based on Page Shield's detected resources, select **Refresh suggestions**.
8. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as draft**.
