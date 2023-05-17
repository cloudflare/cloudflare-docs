---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360047356332-Billing-for-Cloudflare-for-Teams
title: Billing for Cloudflare for Teams
---

# Billing for Cloudflare for Teams



## Overview

Cloudflare for Teams uses Cloudflare's global network to empower your internal teams and infrastructure with secure, fast, and seamless access to any device on the Internet.

Cloudflare for Teams consists of two products: [Cloudflare Access](/cloudflare-one/policies/access/) and [Cloudflare Gateway](/cloudflare-one/policies/filtering/). You can subscribe to each independently or together as a bundle.

**Cloudflare Access** replaces corporate VPNs with Cloudflare’s network. Instead of placing internal tools on a private network, customers deploy them in any environment, including hybrid or multi-cloud models, and secure them consistently with Cloudflare’s network. Read more on how to subscribe to the [Cloudflare Access standalone plan](https://support.cloudflare.com/hc/articles/360007897072-Billing-for-Cloudflare-Access).

**Cloudflare Gateway** is a modern [next generation firewall](https://www.cloudflare.com/learning/cloud/what-is-a-next-generation-firewall/) between your user, device or network and the public Internet. Once you set up Cloudflare Gateway, Gateway's DNS filtering service will inspect all Internet bound DNS queries, log them and apply corresponding policies. Read more on how to subscribe to the [Cloudflare Gateway standalone plan](https://support.cloudflare.com/hc/articles/360048153211-Billing-for-Cloudflare-Gateway).

This article covers the mechanics of the Cloudflare for Teams plans and billing cycles. For more information on features and availability, refer to the Cloudflare for Teams [subscription page](https://www.cloudflare.com/en-gb/teams-pricing/).

___

There are three Cloudflare for Teams billing plans, each offering a different set of features.

### Teams Free

The Cloudflare for Teams free plan is available with or without accompanying Cloudflare paid subscriptions. It provides up to 50 Cloudflare Access seats and DNS filtering for up to 3 locations, with 24 hours of logging.

### Teams Standard

The Cloudflare for Teams Standard plan consists of all of the features in the [Cloudflare Access standalone plan](https://support.cloudflare.com/hc/articles/360007897072-Billing-for-Cloudflare-Access) and [Cloudflare Gateway standalone plan](https://support.cloudflare.com/hc/articles/360048153211-Billing-for-Cloudflare-Gateway). 

#### **Seat enforcement**

Within the Cloudflare for Teams Standard plan, you must pick the same number of seats used across both products. For example, you cannot pick 20 seats of Cloudflare Access and 30 seats of Cloudflare Gateway.

Users who authenticate to either product count as an entire Teams seat.

### Teams Enterprise

Cloudflare for Teams Enterprise plan offers everything in the Standard plan, plus features such as logpush of Access and Gateway logs, certificate-based authentication, and 24x7x365 support with faster response time.

The Enterprise plan is billed by invoice instead of credit card. For more information, refer to the [Enterprise plan page](https://www.cloudflare.com/en-gb/teams/plans/enterprise/).

![Overview of subscription plans for Cloudflare for Teams.](/support/static/Screenshot_2020-08-14_at_16.10.06.png)

___

## Subscription Details

### **Billing cycle**

All Cloudflare for Teams plans bill monthly, in advance. When you select a plan, you are billed for the month at that time. For example, if you purchase a plan on January 10, you will be billed on that day, and all of your future charges will be billed on the 10th of each month.

If you are already a Cloudflare customer for other products, your billing date will be the same as your other Cloudflare services.

### **Prorating plans**

Cloudflare billing will prorate Cloudflare for Teams plans when you make changes.

For example, if you decide to purchase additional seats 10 days into your billing cycle, you will be charged for the partial cost of those additional seats over the remaining 20 days of your billing cycle, starting on the day of the purchase. You will be able to make use of all seats immediately.

### **User count**

Cloudflare for Teams subscriptions consist of seats that users in your account consume. When users authenticate to an application or enroll their agent into WARP, they count against one of your active seats. Seats can be added or removed at **Settings > Account > Plan** on the Teams Dashboard. If all seats are currently consumed, you must first remove users before decreasing your purchased seat count.

### **Combining plans**

You cannot combine subscription plans with free plans. For example, if you have a team of 55 who need Cloudflare Access, you must purchase Cloudflare Access for 55 users. You will not be able to cover 50 users with the free plan and pay for the excess users.

___

## Teams Billing FAQ

**I’m an Access customer. Where is my current plan?**

With the new Access standalone subscription and Teams bundles, price distinctions based on tiers of available identity provider sources are going away. Starting on September 2, 2020, you can modify your Access subscription to a Teams bundle, or to Access standalone, at $3 per user, per month. If you pay for Access Basic or Access Premium today, you can continue to use your plan at the monthly rate you pay now. 

**How many Gateway seats do I get on the Cloudflare for Teams free plan?**

On the free plan, you can use the Cloudflare Gateway DNS filtering features for up to 50 users across 3 locations. A user amounts to 5,000 DNS queries per day.

**Can I change my plan?**

You can choose to upgrade or downgrade your plan at any time. If you downgrade during a billing cycle, your downgraded pricing will apply in the next billing cycle. If you upgrade during a billing cycle, you will be billed for the upgraded plan at the moment you select it.

**How can I stay up to date with what’s new with Teams?**

We’re constantly enhancing the Teams platform, and will be announcing new capabilities like Remote Browser Isolation and the Teams Client Application later this year. To stay informed on what’s new, we recommend joining the Cloudflare Community and subscribing to the Cloudflare blog. 

**Can I cancel my subscription anytime?**

Yes, you can change your plan at any time.
