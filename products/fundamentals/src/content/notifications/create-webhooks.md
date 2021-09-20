---
order: 8
pcx-content-type: how-to
---

# Configure webhooks

There are a variety of services you can connect to Cloudflare using webhooks to receive Notifications from your Cloudflare account. Below we have a list of some of the most popular services you can connect to your Cloudflare account, as well as the information you need to connect to them:

<TableWrap>

Service | Secret | URL
---------- | ----------|-------
[Google Chat](https://developers.google.com/chat/how-tos/webhooks) | Parsed from URL | URL variable found in chat channel
[Slack](https://api.slack.com/messaging/webhooks) | Parsed from URL | URL variable found in slack channel
[DataDog](https://docs.datadoghq.com/api/latest/events/#post-an-event) | API Key (required) | URL variable found in [Datadog account](https://app.datadoghq.com/account/settings#api) | https://api.datadoghq.com/api/v1/events
[Discord](https://discord.com/developers/docs/resources/webhook#execute-webhook) | Parsed from URL | URL variable found in Discord channel
[OpsGenie](https://support.atlassian.com/opsgenie/docs/create-a-default-api-integration) | API Key for REST API | URL variable found in [OpsGenie account](https://api.opsgenie.com/v2/alerts)
[Splunk](https://docs.splunk.com/Documentation/Splunk/8.2.2/Data/UsetheHTTPEventCollector) | Token [(refer to Splunk documentation)](https://docs.splunk.com/Documentation/Splunk/8.2.2/Data/UsetheHTTPEventCollector#How_the_Splunk_platform_uses_HTTP_Event_Collector_tokens_to_get_data_in) | 1. Only supports services/collector, services/collector/raw, services/collector/event. <br/> 2. If SSL is enabled on the token, only supports port 443; otherwise 8088. <br/> 3. Needs SSL enabled on the server.

</TableWrap>

After configuring the external service you want to connect to, set up webhooks in your Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account / domain.
1. Go to **Notifications**. 
1. Click **Destinations** on the left side of your dashboard.
1. In the **Webhooks** card, click **Create**.
1. Give your webhook a name so you can identify it later.
1. In the **URL** field, enter the URL of the third-party service you set up above and want to connect to your Cloudflare account.
1. If needed, insert the **Secret**. Secrets are how webhooks are encrypted and vary according to the service you are connecting to Cloudflare.

  ![Webhooks secret](../../static/images/notifications/webhooks.png)

1. Click **Save and Test** to finish setting up your webhook.

The new webhook will appear in the **Webhooks** card.