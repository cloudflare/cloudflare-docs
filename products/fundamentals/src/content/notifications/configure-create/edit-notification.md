---
order: 1
title: Edit Notifications and webhooks
pcx-content: how-to
---

# How to edit a Notification

1. Sign in to your [Cloudflare dashboard](https://dash.cloudflare.com/login).
1. Click **Notifications** on the upper right corner.
1. Click **Edit** on the Notification you want to modify.
1. Make changes as needed.
1. You can also opt to disable Notifications instead of deleting them. 

## Webhooks to external services

There are a variety of services you can connect to using webhooks, in order to receive Notifications from your Cloudflare account. Here are links to some of the most requested services you can connect your Cloudflare account to:

* [Jira](https://developer.atlassian.com/server/jira/platform/webhooks/) 
* [Slack](https://api.slack.com/messaging/webhooks)
* [GChat](https://developers.google.com/chat/how-tos/webhooks)
* [DataDog](https://docs.datadoghq.com/developers/guide/calling-on-datadog-s-api-with-the-webhooks-integration/)
* [OpsGenie](https://docs.opsgenie.com/docs/integration-api)

After you are done, you can set up webhooks in your [Cloudflare account](https://dash.cloudflare.com/login):

1. Go to **Notifications > Destinations**. 
1. On the left of your dashboard, click **Destinations**.
1. You will see an area called **Webhooks**. Click the button **Create**.
1. Give your webhook a name so you can identify it later.
1. Fill in the URL you set up above, in the third party service you want to connect your Cloudflare account to — for example, Slack.
1. If needed, insert the **Secret** in its field. Secrets are how webhooks are encrypted and vary according to the service you are trying to use.

  ![Webhooks secret](../../static/images/notifications/webhooks.png)

1. Click **Save and Test** to finish setting up your webhook.
