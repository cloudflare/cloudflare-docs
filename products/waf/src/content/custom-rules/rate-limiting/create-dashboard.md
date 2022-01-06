---
pcx-content-type: how-to
order: 13
type: overview
---

# Create Rate Limiting rules in the dashboard

<Aside type='warning'>

This feature is only available for selected customers on an Enterprise plan.

</Aside>

Create Rate Limiting rules under the **Custom Rules** tab in the **Firewall** app.

## Create a Rate Limiting rule

To create a new Rate Limiting rule:

1. Log in to the Cloudflare dashboard.

1. Select the **Websites** tab and choose the site for which you want to create a rule.

1. Navigate to **Firewall** > **Tools**.

1. Click **Create a Custom rule**. 

1. A dialog opens where you specify the details of your new rule.

    ![Create Rate Limiting rule page](../../images/custom-rules/rate-limiting-create.png)
    
1. Enter a descriptive **Rule Name**

1. Under **If Traffic Matching the URL**, select an HTTP scheme from the dropdown as well as a URL.

1. Under **from the same IP address exceeds**, enter an integer greater than 1 to represent the  number of requests in a sampling period. Check [Determining the request rate](/custom-rules/rate-limiting/request-rate) for more information.

1. For **requests per**, select the sampling period (the period during which requests are counted). Domains on Enterprise plans can enter manually any duration between 10 seconds and 3600 seconds (1 hour).

1. Select the rule action from the next drop-down list after **Then**. For example, selecting _Block_ tells Cloudflare to refuse requests in the conditions you specified when the request limit is reached.

1. After **matching traffic from that visitor for**, select the mitigation timeout. This is the time period during which Cloudflare applies the select action once the request rate is reached, and is applicable when selecting *Block* or *Log* on the previous step.

1. To save and deploy your rule, click **Save and Deploy**. If you are not ready to deploy your rule, click **Save as Draft**.
