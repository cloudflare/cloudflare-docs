---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360025829831-Cloudflare-Billing-Policy
title: Cloudflare Billing Policy
---

# Cloudflare Billing Policy

## Overview

{{<Aside type="note">}}
The terms subscription and add-on service are used interchangeably in
this support guide.
{{</Aside>}}

Cloudflare plans and add-on services are billed every 30 days for each domain in your account.

Cloudflare also collects sales tax as governed by local laws. Sales taxes are computed based on the nine (9) digit postal code of either the shipping or billing address on file for your Cloudflare account where applicable.

{{<Aside type="note">}}
If you are a US-based customer, you can [file for sales tax
exemption](https://support.cloudflare.com/hc/en-us/articles/360026135951-Understanding-Cloudflare-sales-tax#h_7b86bc8f-8a23-41ac-a241-fb4043623693).
{{</Aside>}}

Cloudflare issues a separate invoice for plans and subscriptions (or add-on services) for every domain added to a Cloudflare account.

{{<Aside type="note">}}
Subdomains do not count as billable domains.
{{</Aside>}}

For example, if test1.com and test2.com are added to the same Cloudflare account and upgraded to the Pro plan, you will receive an invoice with two $20 charges. Subdomains such as blog.test1.com or blog.test2.com will not be included as billable domains.

The date you initiate a paid plan or add-on service will be both the start of your billing period and your [invoice date](https://support.cloudflare.com/hc/articles/205610698). For example, If you upgrade your plan on January 10, all future plan charges will be billed on the 10th of every month. Both dates are initialized using the UTC (Coordinated Universal Time) time zone, and not your local time zone.

When ordering a paid plan, subscription, or add-on service, you must agree to the following:

_By clicking "Enable" you agree that you are purchasing a continuous month-to-month subscription which will automatically renew, and that the price of your selected subscription plan level and/or add on(s) will be billed to your designated payment method monthly as a recurring charge, unless you cancel your subscription(s), through your account dashboard,_ _**before**_ _the beginning of your next monthly billing period._

_**You will be billed for the full monthly period in which you cancel and no refunds will be given. By purchasing a subscription, you agree to a minimum one month purchase obligation.**_

{{<Aside type="note">}}
For more information on renewal terms and cancellation please see our
[Terms of Use](https://www.cloudflare.com/terms).
{{</Aside>}}

___

## Upgrade or downgrade Cloudflare paid plans

If your domain is on a paid plan (for example, Pro) and you upgrade to a higher-priced plan (for example, Business),

-   Your invoice will reflect the prorated cost of the higher-tiered plan, until the end of your billing cycle.
-   Cloudflare credits the prorated cost of the lower-priced plan, until the end of the billing cycle.
-   At the beginning of the next billing cycle, your invoice will reflect the full cost of the higher-priced plan.
-   Your bill cycle start and end dates are calculated using the UTC (Coordinated Universal Time) time zone, and not your local time zone.

For example, if your billing date is January 1, but you upgrade from Pro to Business, on January 15,

-   Your invoice will reflect the prorated Business plan rate for the period of use January 15 - January 30 ($100).
-   Cloudflare credits the prorated Pro plan cost from January 1 - January 15 ($10).
-   Your invoice for the billing period of January 1 - January 30 in the amount of $110 will appear in the Cloudflare dashboard on January 31.

{{<Aside type="note">}}
Account credits are automatically added to your account and can only be
used on recurring monthly charges for Cloudflare plans or add-on
services. Your monthly invoice lists any credits.
{{</Aside>}}

If your domain is on a paid plan (for example, Business) and you downgrade to a lower-priced plan (for example, Pro),

-   Your plan type and higher-tiered Cloudflare plan features are downgraded at the end of the current billing service period. 
-   You are billed at the lower-tiered plan and feature rate for the next billing service period.

For example, if your billing date is February 1, but you downgrade to Pro from the Business plan on February 15,

-   You can access Business plan features and services until March 1.
-   Your March plan charges will decrease to $20.

___

## Billing and payment for Enterprise plans

Enterprise customers work with the Cloudflare account team to customize a plan and service contract to best suit their needs. The Cloudflare accounting team receives and processes Enterprise plan charges.

Enterprise account owners receive invoices directly from the Cloudflare accounting team.

___

## Approved payment methods

Cloudflare only accepts VISA, MasterCard, American Express, Discover, Paypal, and UnionPay. No other payment methods (for example, Maestro) are possible at this time.

{{<Aside type="note">}}
Enterprise customers can use ACH payments or checks for Cloudflare plans
and subscriptions.
{{</Aside>}}

Please ensure that you're using a valid payment method before changing your plan type or enabling subscriptions.

{{<Aside type="note">}}
Gift cards and pre-payment cards may not be accepted for payment as they
are not associated with a billing address.
{{</Aside>}}

___

## Related resources

-   [Cloudflare Self-Serve Subscription Agreement](https://www.cloudflare.com/terms/)
-   [Understanding Cloudflare Invoices](https://support.cloudflare.com/hc/en-us/articles/205610698-Understanding-Cloudflare-Invoices)
-   [Understanding Cloudflare sales tax](https://support.cloudflare.com/hc/en-us/articles/360026135951-Understanding-Cloudflare-sales-tax)
