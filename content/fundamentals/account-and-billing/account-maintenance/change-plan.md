---
pcx_content_type: how-to
title: Change domain plan
weight: 2
---

# Change domain plan

Occasionally, you may want to upgrade or downgrade the plan associated with a specific Cloudflare domain.

## Limitations

If you decide to downgrade or remove a domain, Cloudflare does not issue refunds. Refer to our [billing policy](/support/account-management-billing/billing-cloudflare-plans/cloudflare-billing-policy/) for more information.

Upgrades are processed immediately, but downgrades are not processed until the end of the billing period. When downgrading, you are allowed to continue using the higher plans' products until the new billing period begins.

If you downgrade your plan, your plan may have access to [fewer Page Rules](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/). If you continue to use more page rules than is allowed by your plan limit, you may be charged for additional rules. Remove excess rules and [cancel additional subscriptions](/fundamentals/account-and-billing/account-maintenance/cancel-subscription/) if you do not want to be charged.

The Enterprise App Sec Advanced and Enterprise App Sec Core plans cannot be downgraded without [contacting Cloudflare](/support/troubleshooting/general-troubleshooting/contacting-cloudflare-support/).

For additional help, refer to [this Community thread](https://community.cloudflare.com/t/communitytip-page-rules-best-practices-when-downgrading-pro-to-free/305725).

## Change plan type

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To change the Cloudflare plan for a domain in the dashboard:
 
1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Overview**.
3. For Plan Extensions, select **Change**.

    ![Screenshot of the Overview page with the Plan extension section highlighted](/images/fundamentals/get-started/change-plan.png)

4. Choose the appropriate plan type, then select **Continue**.
5. Select **Confirm**.

{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To change the Cloudflare plan for a domain using the API, first send a [`GET`](/api/operations/zone-rate-plan-list-available-plans) request to review available subscriptions.

Then, send a [`PUT`](/api/operations/zone-subscription-update-zone-subscription) request with your desired plan type in the `rate_plan` object.
 
{{</tab>}}
{{</tabs>}}

{{<Aside type="note">}}

If you are an Enterprise customer and cannot change your plan type, contact your Customer Success Manager.

{{</Aside>}}

## Change plan duration

{{<tabs labels="Dashboard | API">}}
{{<tab label="dashboard" no-code="true">}}

To change the duration of your Cloudflare plan in the dashboard:
 
1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Go to **Overview**.
3. For Plan Extensions, select **Change**.

    ![Screenshot of the Overview page with the Plan extension section highlighted](/images/fundamentals/get-started/change-plan.png)

4. Switch the toggle between **Monthly** or **Annual**.

    ![Screenshot of the Plan choice with the annual or monthly toggle highlighted](/images/fundamentals/get-started/plan-duration.png)

5. Choose the appropriate plan type, then select **Continue**.

6. Select **Confirm**.

{{</tab>}}
{{<tab label="api" no-code="true">}}
 
To change the duration of a Cloudflare plan for a domain using the API, send a [`PUT`](/api/operations/zone-subscription-update-zone-subscription) request with an updated value for the `frequency` parameter.
 
{{</tab>}}
{{</tabs>}}
