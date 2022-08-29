---
pcx_content_type: how-to
type: overview
title: Create custom rules in the dashboard
weight: 2
layout: list
---

# Create custom rules in the dashboard

Create custom rules in **Security** > **WAF** > **Custom rules**.

{{<Aside type="note">}}

This feature is only available for select customers on an Enterprise plan.

{{</Aside>}}

## Create a custom rule

To create a new custom rule:

1. Log in to the Cloudflare dashboard.

2. Select the **Websites** tab and choose the site for which you want to create a rule.

3. Navigate to **Security** > **WAF** > **Custom rules**.

4. Select **Create firewall rule**.

5. In the page that displays, enter a descriptive name for the rule in **Rule name**.

    ![Custom rule creation page in the Cloudflare dashboard](/waf/static/custom-rules/firewall-custom-rule-create.png)

6. Under **If incoming requests match...**, use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**.

7. Select the rule action from the **Choose action** drop-down list. For example, selecting _Block_ tells Cloudflare to refuse requests that match the conditions you specified.

8. (Optional) If you selected the _Block_ action, you can [configure a custom response](#configuring-a-custom-response-for-blocked-requests).

9. To save and deploy your rule, select **Save and Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

## Configuring a custom response for blocked requests

When you select the _Block_ action in a custom rule you can optionally define a custom response.

The custom response has three settings:

* **Response type**: Choose a content type or the default WAF block response from the list. The available custom response types are the following:

    | Dashboard value | API value |
    |---|---|
    | Custom HTML | `"text/html"` |
    | Custom Text | `"text/plain"` |
    | Custom JSON | `"application/json"` |
    | Custom XML | `"text/xml"` |

* **Response code**: Choose an HTTP status code for the response, in the range 400-499. The default response code is 403.
* **Response body**: The body of the response. Configure a valid body according to the response type you selected.
