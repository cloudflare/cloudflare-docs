---
title: Turnstile analytics
pcx_content_type: how-to
weight: 5
meta:
    description: Use Turnstile analytics to view the number of challenges issued, the challenge solve rate, and the metrics of issued challenges.
---

# Turnstile analytics

Using Turnstile analytics, you can:
* Assess the number of challenges issued.
* Evaluate the Challenge Solve Rate (CSR).
* View the metrics of issued challenges.
 
## View metrics of your widgets

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to **Turnstile** and then navigate to your website to see an overview of its widget metrics.

These metrics show changes in the solve rate, widget traffic, and top actions for your website.

## Change in Solve Rate

The change in Solve Rate is expected to be relatively stable over time. It is an indication of something happening on the website, such as undergoing attacks from bots.

View the history of your website’s widget Solve Rate with Turnstile analytics. 

{{<Aside type="note">}}
You can filter the data by `Action=(free input)` or by time.
{{</Aside>}}

### Visitor Solve Rate

Visitor Solve Rate considers all humans who have viewed the widget, whether it was interactive or non-interactive. It measures the percentage of people who completed the widget. For example, if 100 people saw the widget and 20 of them completed it successfully, the Visitor Solve Rate would be 20%.

A full Turnstile Challenge Token Flow consists of a few things:

* A challenge is rendered (issued).
* A challenge is solved on the front end and a token is harvested (solved).
* The token is passed to siteverify, and it is consumed (siteverified).

Visitor Solve Rate is the percentage of tokens that were solved but have not necessarily been siteverified compared to issued challenges.

### API Solve Rate

API Solve Rate is the share of tokens that were siteverified compared to issued. It focuses only on humans who interacted with the widget through the website's API. It measures the percentage of successful widget completions among all visitors detected through the API. This metric looks specifically at the number of people who successfully completed the widget. For example, if 100 people viewed the widget, 20 of them completed it successfully, and only 15 of them used their token, the API Solve Rate would be 15%.

## Widget traffic

Widget traffic metrics provide you with data on the number of widgets displayed, interactive widgets solved, and non-interactive widgets solved on your website over time.

## Top Actions

Top Actions refer to the custom labels you created for your widgets.

Action can be used in analytics and is more limited in size. It should identify different pages in a website where a widget is used. Action should not contain any personally identifiable information (PII) as this is placed into the analytics.

cData is not stored in our analytics. It can contain data that may vary by each challenge instance.

Both cData and action are returned by the siteverify API if a valid token is presented.

## GraphQL

You can use the `turnstileAdaptiveGroups` [dataset in GraphQL](/analytics/graphql-api/features/data-sets/) to get Turnstile widget analytics.