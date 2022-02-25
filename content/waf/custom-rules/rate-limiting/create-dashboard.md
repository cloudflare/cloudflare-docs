---
pcx-content-type: how-to
type: overview
title: Create Rate Limiting rules in the dashboard
weight: 14
layout: list
---

# Create Rate Limiting rules in the dashboard

Create Rate Limiting rules under the **Custom Rules** tab in the **Firewall** app.

<Aside type='warning'>

This feature is only available for selected customers on an Enterprise plan.

For guidance on the previous version of Rate Limiting rules, available at **Firewall** > **Tools**, refer to [Configuring Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128).

</Aside>

## Create a Rate Limiting rule

To create a new Rate Limiting rule:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

2.  Navigate to **Firewall** > **Custom Rules**.

3.  Click **Create Custom rule** > **Rate limiting rule**.

4.  In the page that displays, enter a descriptive name for the rule in **Rule name**.

    ![Create Rate Limiting rule page](/waf/static/custom-rules/rate-limiting-create.png)

5.  Under **If incoming requests match**, use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**.

6.  Under **With the same**, add one or more characteristics that will define the request counters for rate limiting purposes. Each value combination will have its own counter to determine the request rate. Refer to [Determining the request rate](/waf/custom-rules/rate-limiting/request-rate/) for more information.

7.  Under **And rate exceeds**, define the rate limit and the time period to consider when determining the request rate.

8.  Select the rule action from the **Choose action** drop-down list. For example, selecting *Block* tells Cloudflare to refuse requests in the conditions you specified when the request limit is reached.

9.  Under **For**, select the mitigation timeout. This is the time period during which Cloudflare applies the select action once the request rate is reached.

10. To save and deploy your rule, click **Save and Deploy**. If you are not ready to deploy your rule, click **Save as Draft**.
