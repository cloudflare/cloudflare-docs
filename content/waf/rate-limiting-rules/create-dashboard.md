---
pcx-content-type: how-to
type: overview
title: Create rate limiting rules in the dashboard
weight: 14
---

# Create rate limiting rules in the dashboard

Create rate limiting rules in **Security** > **WAF** > **Rate limiting rules**.

{{<Aside type="note">}}

For guidance on the previous version of rate limiting rules, refer to [Configuring Cloudflare Rate Limiting](https://support.cloudflare.com/hc/articles/115001635128).

{{</Aside>}}

## Create a rate limiting rule

To create a new rate limiting rule:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

2. Navigate to **Security** > **WAF** > **Rate limiting rules**.

3. Click **Create rate limiting rule**.

4. In the page that displays, enter a descriptive name for the rule in **Rule name**.

    ![The Create rate limiting rule page in the Cloudflare dashboard](/waf/static/custom-rules/rate-limiting-create.png)

5. Under **If incoming requests match**, use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**.

6. Select the rule action from the **Choose action** drop-down list. For example, selecting _Block_ tells Cloudflare to refuse requests in the conditions you specified when the request limit is reached.

7. (Optional) If you selected the _Block_ action, you can [configure a custom response](#configuring-a-custom-response-for-blocked-requests) for requests exceeding the configured rate limit.

8. Under **For**, select the mitigation timeout in **Duration**. This is the time period during which Cloudflare applies the select action once the rate is reached.

9. Under **When rate exceeds**, define the maximum number of requests and the time period to consider when determining the rate.

10. Under **With the same**, add one or more characteristics that will define the request counters for rate limiting purposes. Each value combination will have its own counter to determine the rate. Refer to [Determining the rate](/waf/rate-limiting-rules/request-rate/) for more information.

11. (Optional) Under **Counter**, enable **Use custom counting expression** to define an expression that specifies the conditions for incrementing the rate counter. By default, the counting expression is the same as the rule expression. The counting expression can include [response fields](/ruleset-engine/rules-language/fields/#http-response-fields).

12. (Optional) Under **Cache status**, disable **Also apply rate limiting to cached assets** to consider only the requests that reach the origin when determining the rate.

13. To save and deploy your rule, click **Deploy**. If you are not ready to deploy your rule, click **Save as Draft**.

## Configuring a custom response for blocked requests

When you select the _Block_ action in a rate limiting rule you can optionally define a custom response for requests exceeding the configured rate limit.

The custom response has three settings:
* **Response type**: Choose a content type from the list or select the default rate limiting response. The response can be custom HTML, custom plain text, custom JSON, or custom XML.
* **Response code**: Choose an HTTP status code for the response, in the range 400-499.
* **Response body**: The body of the response. Configure a valid body according to the response type you selected.
