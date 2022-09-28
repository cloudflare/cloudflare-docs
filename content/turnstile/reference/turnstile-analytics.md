---

title: Analytics
pcx_content_type: how-to
weight: 9
layout: single

---
# Turnstile Analytics

Using Turnstile analytics, you can:
* Assess the number of challenges issued
* Evaluate the challenge solve rate
* View the metrics of issued challenges
 
## View metrics of your widgets

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. From the dashboard, select **Turnstile** and navigate to your website to see an overview of its widget metrics.

These metrics show changes in the solve rate, widget traffic, and top actions for your website.

## Change in Solve Rate

Customers can view the history of their website’s widget solve rate with Turnstile Analytics. 

{{<Aside type="note">}}

Customers can filter the data by `Action=(free input)` or by time.

{{</Aside>}}

## Widget Traffic

Widget traffic metrics provide customers with data on the number of widgets displayed, interactive widgets solved, and non-interactive widgets solved on their website over time.

## Top Actions

Top Actions refer to the custom labels you created for your widgets.

## GraphQL

You can use the `turnstileAdaptiveGroups` [dataset in GraphQL](/analytics/graphql-api/features/data-sets/#available-datasets) to get Turnstile widget analytics.