---
pcx-content-type: how-to
type: overview
title: Configure webhooks
layout: list
---

{{<content-column>}}

# Configure webhooks

There are a variety of services you can connect to Cloudflare using webhooks to receive Notifications from your Cloudflare account. The following table lists some of the most popular services you can connect to your Cloudflare account, as well as the information you need to connect to them:

{{</content-column>}}

{{<table-wrap>}}

| Service | Secret | URL |
| ------- | ------ | ---- |
| [Google Chat](https://developers.google.com/chat/how-tos/webhooks) | The secret is part of the URL. Cloudflare parses this information automatically and there is no input needed from the user. | URL varies depending on the Google Chat channel's address. |
| [Slack](https://api.slack.com/messaging/webhooks) | The secret is part of the URL. Cloudflare parses this information automatically and there is no input needed from the user. | URL varies depending on the Slack channel's address. |
| [DataDog](https://docs.datadoghq.com/api/latest/events/#post-an-event) | The secret is required and has to be entered by the user. This is what DataDog [refers to as `API Key`](https://app.datadoghq.com/account/settings#api). | `https://api.datadoghq.com/api/v1/events` |
| [Discord](https://discord.com/developers/docs/resources/webhook#execute-webhook) | The secret is part of the URL. Cloudflare parses this information automatically and there is no input needed from the user. | URL varies depending on the Discord channel's address. |
| [OpsGenie](https://support.atlassian.com/opsgenie/docs/create-a-default-api-integration) | The secret is the `API Key` for OpsGenie's REST API. | `https://api.opsgenie.com/v2/alerts` |
| [Splunk](https://docs.splunk.com/Documentation/Splunk/8.2.2/Data/UsetheHTTPEventCollector) | The secret is required and has to be entered by the user. This is what Splunk refers to as `token`. Refer to [Splunk’s documentation](https://docs.splunk.com/Documentation/Splunk/8.2.2/Data/UsetheHTTPEventCollector#How_the_Splunk_platform_uses_HTTP_Event_Collector_tokens_to_get_data_in) for details. | 1. We only support three Splunk endpoints: `services/collector`, `services/collector/raw`, and `services/collector/event`. <br/> 2. If SSL is enabled on the token, the port must be 443. If SSL is not enabled on the token, the port must be 8088. <br/> 3. SSL must be enabled on the server. |

{{</table-wrap>}}

{{<content-column>}}

After configuring the external service you want to connect to, set up webhooks in your Cloudflare dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account.
2.  Go to **Notifications**.
3.  Click **Destinations** on the left side of your dashboard.
4.  In the **Webhooks** card, click **Create**.
5.  Give your webhook a name so you can identify it later.
6.  In the **URL** field, enter the URL of the third-party service you previously set up and want to connect to your Cloudflare account.
7.  If needed, insert the **Secret**. Secrets are how webhooks are encrypted and vary according to the service you are connecting to Cloudflare.

![Webhooks secret](/fundamentals/static/images/notifications/webhooks.png)

1.  Click **Save and Test** to finish setting up your webhook.

The new webhook will appear in the **Webhooks** card.

{{</content-column>}}
