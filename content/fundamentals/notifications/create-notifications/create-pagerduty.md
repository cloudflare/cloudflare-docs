---
pcx_content_type: how-to
title: Configure PagerDuty
weight: 1
---

# Configure PagerDuty

{{<Aside type="note">}}

This feature is only available if your account has at least one zone on a Business or higher plan. For more information, see our [plans page](https://www.cloudflare.com/plans/).

{{</Aside>}}

Cloudflare’s Notification service supports routing notifications to PagerDuty. By sending notifications to PagerDuty you can leverage the same service definitions and escalation paths that you would for other third-party services that you connect to PagerDuty.

When a configuration you previously set up triggers a notification for PagerDuty, Cloudflare will send the notification to PagerDuty on your behalf. All the PagerDuty services set for the notification will receive the notification. PagerDuty will follow the service’s configuration to handle the notification appropriately. Actions like de-duping and rate limiting depend on the notification type.

To use PagerDuty as a connected service, you first need to [sign up for a PagerDuty account](https://www.pagerduty.com/sign-up/).

{{<Aside type="note">}}

According to PagerDuty, you need an account with the following permissions to add a connected service: User, Admin, Manager, Global Admin, or Account Owner.

{{</Aside>}}

## Connect PagerDuty to a Cloudflare account

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2. Go to **Notifications**.
3. Select **Destinations** on the left side of your dashboard.
4. In the **Connected notification services** card, select **Connect**.
5. Log in to your PagerDuty account to connect it to your Cloudflare account.
6. Choose the services you want to use and select **Connect**.
7. The browser will navigate back to your Cloudflare dashboard. Select **Continue**.

Your new connected PagerDuty will appear in the **Connected notification services** card.
