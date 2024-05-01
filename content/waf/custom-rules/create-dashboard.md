---
pcx_content_type: how-to
type: overview
title: Create custom rules in the dashboard
weight: 2
---

# Create custom rules in the dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and domain.

2. Go to **Security** > **WAF** > **Custom rules**.

3. Select **Create rule**.

4. Enter a descriptive name for the rule in **Rule name**.

    ![Custom rule creation page in the Cloudflare dashboard](/images/waf/custom-rules/firewall-custom-rule-create.png)

5. Under **If incoming requests match**, use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**.

6. Under **Then take action**, select the rule action in the **Choose action** dropdown. For example, selecting _Block_ tells Cloudflare to refuse requests that match the conditions you specified.

7. (Optional) If you selected the _Block_ action, you can [configure a custom response](#configuring-a-custom-response-for-blocked-requests).

8. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

## Configuring a custom response for blocked requests

{{<render file="_custom-response-blocked-requests.md" withParameters="WAF block;;403">}}
