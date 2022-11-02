---
pcx_content_type: how-to
title: Update billing information
weight: 2
---

# Update billing information

To avoid potential disruptions in your Cloudflare services, make sure your billing information is current and accurate. It is also important to understand [how Cloudflare plans and add-ons are priced](https://www.cloudflare.com/plans/#overview).

If Cloudflare is unable to process your payment, review [Troubleshooting failed payments](https://support.cloudflare.com/hc/en-us/articles/218344877).

---

## Access payment methods

To access your current payment methods (primary and backup):

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).

2. Select **Manage account** > **Billing**. 

3. Select **Payment Info**.

## Add or update payment methods

{{<render file="_billing-add-payment-method.md">}}

## Delete your current payment method

Before removing your payment method from file, you must cancel all Cloudflare paid services.

{{<Aside type="warning">}}

If you currently subscribe to any [add-on services](https://support.cloudflare.com/hc/articles/115004555148), Cloudflare must always have a payment method on file. If you need to remove a payment method, then you must enter a new one to replace it. Otherwise, you will see an error.

You also cannot delete your payment method if a payment fails or if there is an outstanding balance. Until we process payment, you can only add or edit your payment method.

{{</Aside>}}

To delete your current payment method:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).

2. On the left sidebar, select **Manage account** > **Billing**.

3. Select **Payment Info**.

4. In the **Payment Method** card, select **Manage**.

5. Next to your current payment method, select **Delete**.

6. Select **Confirm** to finish.

## Update your billing address

The billing address is associated with your payment method and is used to calculate your sales tax. If you need to update your billing address, you must also enter you payment method. The process for updating your billing address depends on the payment method.

If paying by credit card:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).

2. On the left sidebar, select **Manage account** > **Billing**.

3. Select **Edit** in the **Billing Address** card and input your information.

7. Review the suggested address in the pop-up window. If the information is correct, select **Confirm**. 

If paying by Paypal, refer to PayPal's [billing address documentation](https://www.paypal.com/ai/smarthelp/article/how-do-i-edit-the-billing-address-linked-to-my-credit-card-faq680).

## Update billing email address

Your billing email address is particularly important if you have [opted into email invoices](/fundamentals/account-and-billing/account-setup/create-billing-profile/#step-4---opt-in-to-email-invoices).

To update your billing email address:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Manage Account** > **Billing**.
3. Go to **Invoices & Documents**.
4. For **Billing email preference**, select **Change email address**. 
5. Enter and confirm your new email and select **Save**.