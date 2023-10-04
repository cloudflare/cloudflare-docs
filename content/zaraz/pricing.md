---
pcx_content_type: concept
title: Pricing
weight: 9
---

# Zaraz Pricing

By default, Cloudflare Zaraz is available to everyone for free under their Cloudflare dashboard. The paid version of Zaraz is included in the [paid Workers plans](/workers/platform/pricing/).

## Zaraz Plans

Zaraz pricing is based on Zaraz Loads and the set of features. A Zaraz Load is counted each time a web page loads the Zaraz script within it, and/or the Pageview trigger is being activated. For single page applications, each URL navigation (i.e., every time the URL changes) is counted as a new Zaraz Load. The Zaraz Loads are calculated per account across all zones.

### Free

The Free plan applies to accounts without a Workers Paid plan, and it includes up to 100,000 Zaraz Loads per month per account. If an account exceeds 100,000 Zaraz Loads in a month, Zaraz will be disabled for the remainder of the month. The features included in the free plan are listed in the table below.

### Workers Paid

The Workers Paid plan includes the first 200,000 Zaraz Loads per month per account free of charge, with a charge of $0.50 for every additional 1,000 Zaraz Loads. In addition to all the features of the Free plan, the Paid plan includes:

- [Preview/publish configuration workflow](/zaraz/history/preview-mode/)
- [Workers Variables](/zaraz/advanced/worker-variables/)
- [Custom endpoints](/zaraz/reference/settings/#endpoints)
- [E-commerce Web API](/zaraz/web-api/ecommerce/)
- [HTTP Events API](/zaraz/http-events-api/)
- HTTP Request tool
- [Custom Managed Components](/zaraz/advanced/load-custom-managed-component/)
- Consent API
- [Advanced privacy settings](/zaraz/reference/settings/#privacy)

|                                        | Without Workers Paid            | With Workers Paid                                                                 |
| -------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------- |
| **Zaraz Loads**                        | Up to 100,000/month per account | First 200,000/month per account free, $0.50 for every additional 1,000 Zaraz Loads |
| **Installation + Configuration**       | Unlimited number of websites    | Unlimited number of websites                                                      |
| Auto-injection                         | ✔️                              | ✔️                                                                                |
| Import & export configuration          | ✔️                              | ✔️                                                                                |
| JSONata support                        | ✔️                              | ✔️                                                                                |
| Monitoring                             | ✔️                              | ✔️                                                                                |
| Debugger                               | ✔️                              | ✔️                                                                                |
| Preview/publish configuration workflow | ➖                              | ✔️                                                                                |
| Workers variables                      | ➖                              | ✔️                                                                                |
| Custom endpoints                       | ➖                              | ✔️                                                                                |
| **Advanced Tracking**                  | Unlimited number of requests    | Unlimited number of requests                                                      |
| Track                                  | ✔️                              | ✔️                                                                                |
| Set                                    | ✔️                              | ✔️                                                                                |
| Data layer compatibility               | ✔️                              | ✔️                                                                                |
| E-commerce                             | ➖                              | ✔️                                                                                |
| HTTP events API                        | ➖                              | ✔️                                                                                |
| **Tools**                              | Unlimited number of tools       | Unlimited number of tools                                                         |
| Third-party library                    | Full                            | Full                                                                              |
| Custom HTML tool                       | ✔️                              | ✔️                                                                                |
| Custom image tool                      | ✔️                              | ✔️                                                                                |
| HTTP request tool                      | ➖                              | ✔️                                                                                |
| Custom Managed Component               | ➖                              | ✔️                                                                                |
| **Privacy**                            |                                 |                                                                                   |
| Consent management platform (CMP)      | ✔️                              | ✔️                                                                                |
| Advanced privacy settings              | ➖                              | ✔️                                                                                |
| Consent API                            | ➖                              | ✔️                                                                                |

## Pricing examples

Below are several examples to help you understand Zaraz pricing:

### Example 1: Personal website without Workers Paid plan

Let's say you have a personal website that generates 80,000 Zaraz Loads per month. Without the Workers Paid plan, you can use Zaraz for free because you are within the 100,000 Zaraz Loads limit. You also have access to features like Auto-injection, Zaraz Debugger, Zaraz Track, Zaraz Set, and Zaraz Monitoring. If you need to use one of the features exclusive to the Workers Paid plan, you would need to upgrade to that plan. However, if you do not need any of the paid features, you can take advantage of the Free plan with no extra charge.

### Example 2: High traffic personal website without Workers Paid plan

Suppose you have a personal website that generates 150,000 Zaraz Loads per month. Without the Workers Paid plan, Zaraz will function for the first 100,000 Zaraz Loads, but it will be automatically disabled for the remainder of the month once you exceed this limit. If you need Zaraz to continue functioning for the entire month, you would need to upgrade to the Workers Paid plan. Your cost would then be $5/month.

### Example 3: Small business website with Workers Paid plan

Suppose you have a small business website that generates 250,000 Zaraz Loads per month. Under the Workers Paid plan, the first 200,000 Zaraz Loads are free, and you will be charged $0.50 for every additional 1,000 Zaraz Loads. In this case, you would be charged for 50,000 additional Zaraz Loads, which would cost you an extra $25 (`(50,000/1,000) * $0.50`) on top of your monthly plan cost.

### Example 4: High traffic website with Workers Paid plan

If you have a high traffic website that generates 20,000,000 Zaraz Loads per month, under the Workers Paid plan, the first 200,000 Zaraz Loads are free, and you would be charged $0.50 for every additional 1,000 Zaraz Loads. In this case, you would be charged for an additional 19,800,000 Zaraz Loads, which would cost you an extra $9,900 (`(19,800,000/1,000) * $0.50`) on top of your monthly plan cost. However, with such high usage, it would likely be more beneficial to consider the Workers Enterprise plan. For a custom quote tailored to your specific needs, please contact our sales team.

## Already using Zaraz?

If you're already using Zaraz and have additional questions, please visit the [FAQ page](/zaraz/faq/).
