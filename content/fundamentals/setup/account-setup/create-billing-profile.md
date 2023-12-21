---
pcx_content_type: tutorial
title: Create billing profile
weight: 3
updated: 2022-08-24
---

# Create billing profile

After you [create a new account](/fundamentals/setup/account-setup/create-account/), you might want to create your billing profile.

{{<tutorial>}}
{{<tutorial-step title="Add primary payment method">}}

{{<render file="_billing-add-payment-method.md">}}
{{</tutorial-step>}}

{{<tutorial-step title="Add backup payment method" optional=true >}}

A backup payment method is used if the primary payment method fails. To add a backup payment method:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Go to **Manage account** > **Billing**.
3. Select **Payment Info**.
4. In the **Payment Method** card, select **Manage**.
5. In the **Backup** card, select **Add** to enter a backup payment method.
6. Enter the required information based on your preferred payment method (credit card or PayPal) and select **Confirm**.
7. If you would like to make the backup payment method the primary method, select **Make primary payment method** in the **Backup** card.

{{</tutorial-step>}}

{{<tutorial-step title="Set up billing notifications">}}

If you have a [usage-based product](https://www.cloudflare.com/plans/) like Rate Limiting or Load Balancing, set up Billing notifications to monitor usage and avoid surprises on your bill.

These notifications do not set a cap on usage, but rather alert you when your usage might be reaching a threshold.

To set up billable usage notifications:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Notifications**.
3. Select **Add**.
4. On the **Billing** notification, click **Select**.
5. Enter a name and description.
6. Select a **Product**. This value affects the usage threshold specified in the next step.
7. Enter a usage threshold.
8. Add a **Notification email**.
9. Select **Create**.

To disable, edit, or delete this notification, return to **Notifications** and find your notification.

{{</tutorial-step>}}

{{<tutorial-step title="Enable email invoices">}}

To receive invoices via email — which are sent when you add or remove subscriptions from your account — you can opt-in within the Billing section of the Cloudflare dashboard. Once enabled, you will receive invoices via email:

- Within one business day of initial setup.
- Every month at the end of your billing period.
- Within one business day for all new purchases.

To enable Cloudflare invoice emails:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **Manage Account** > **Billing**.
3. Go to **Invoices & Documents**.
4. For **Billing email preference**, switch the value to **On**. You will receive an invoice via billing email address on file within one business day.
{{</tutorial-step>}}
{{</tutorial>}}