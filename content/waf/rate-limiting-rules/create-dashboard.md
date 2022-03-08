---
pcx-content-type: how-to
type: overview
title: Create Rate Limiting Rules in the dashboard
weight: 14
layout: list
---

# Create Rate Limiting Rules in the dashboard

Create Rate Limiting Rules in **Security** > **WAF** > **Rate Limiting Rules**.

{{<Aside type="note">}}

This feature is only available for select customers on an Enterprise plan.

For guidance on the previous version of Cloudflare Rate Limiting, refer to [Configuring Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128).

{{</Aside>}}

## Create a Rate Limiting Rule

To create a new Rate Limiting Rule:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

3.  Navigate to **Security** > **WAF** > **Rate Limiting Rules**.

3.  Click **Create rate limiting rule**.

4.  In the page that displays, enter a descriptive name for the rule in **Rule name**.

    ![Create Rate Limiting Rule page](/waf/static/custom-rules/rate-limiting-create.png)

5.  Under **If incoming requests match**, use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**.

6.  Under **With the same**, add one or more characteristics that will define the request counters for rate limiting purposes. Each value combination will have its own counter to determine the request rate. Refer to [Determining the request rate](/waf/rate-limiting-rules/request-rate/) for more information.

7.  Under **And rate exceeds**, define the rate limit and the time period to consider when determining the request rate.

8.  Select the rule action from the **Choose action** drop-down list. For example, selecting _Block_ tells Cloudflare to refuse requests in the conditions you specified when the request limit is reached.

9.  Under **For**, select the mitigation timeout. This is the time period during which Cloudflare applies the select action once the request rate is reached.

10. To save and deploy your rule, click **Save and Deploy**. If you are not ready to deploy your rule, click **Save as Draft**.
