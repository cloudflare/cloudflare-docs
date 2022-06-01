---
pcx-content-type: how-to
title: Configure webhooks
---

# Configure webhooks

{{<Aside type="note">}}

This feature is only available if your account has at least one zone on a Professional or higher plan. For more information, see our [plans page](https://www.cloudflare.com/plans/).

{{</Aside>}}

There are a variety of services you can connect to Cloudflare using webhooks to receive Notifications from your Cloudflare account. The following table lists some of the most popular services you can connect to your Cloudflare account, as well as the information you need to connect to them:

<table>
  <thead>
    <tr>
      <th style="width:20%">Service</th>
      <th style="width:45%">Secret</th>
      <th style="width:35%">URL</th>
    </tr>
  </thead>
  <tbody>
   <tr>
   <!-- google -->
      <td valign="top"> <a target="_blank" rel="noopener noreferrer" href="https://developers.google.com/chat/how-tos/webhooks">Google Chat</a></td>
      <td>
         <p>The secret is part of the URL. Cloudflare parses this information automatically and there is no input needed from the user.</p>         
      </td>
      <td>
         <p>URL varies depending on the Google Chat channel's address.</p>         
      </td>
   </tr>
   <!-- slack    -->
   <tr>
      <td valign="top"> <a target="_blank" rel="noopener noreferrer" href="https://api.slack.com/messaging/webhooks">Slack</a></td>
      <td>
         <p>The secret is part of the URL. Cloudflare parses this information automatically and there is no input needed from the user.</p>         
      </td>
      <td>
         <p>URL varies depending on the Slack channel's address.</p>         
      </td>
   </tr>   
   <!-- datadog    -->
   <tr>
      <td valign="top"> <a target="_blank" rel="noopener noreferrer" href="https://docs.datadoghq.com/api/latest/events/#post-an-event">DataDog</a></td>
      <td>
         <p>The secret is required and has to be entered by the user. This is what DataDog <a target="_blank" rel="noopener noreferrer" href="https://app.datadoghq.com/account/settings#api">refers to as <code>API Key</code></a>.
         </p>         
      </td>
      <td>
         <p><code>https://api.datadoghq.com/api/v1/events</code></p>         
      </td>
   </tr>   
   <!-- discord    -->
   <tr>
      <td valign="top"> <a target="_blank" rel="noopener noreferrer" href="https://discord.com/developers/docs/resources/webhook#execute-webhook">Discord</a></td>
      <td>
         <p>The secret is part of the URL. Cloudflare parses this information automatically and there is no input needed from the user.</p>         
      </td>
      <td>
         <p>URL varies depending on the Discord channel's address.</p>         
      </td>
   </tr>   
   <!-- opsgenie    -->
   <tr>
      <td valign="top"> <a target="_blank" rel="noopener noreferrer" href="https://support.atlassian.com/opsgenie/docs/create-a-default-api-integration">OpsGenie</a></td>
      <td>
         <p>The secret is the <code>API Key</code> for OpsGenie's REST API.</p>         
      </td>
      <td>
         <p><code>https://api.opsgenie.com/v2/alerts</code></p>         
      </td>
   </tr>   
   <!-- splunk    -->
   <tr>
      <td valign="top"> <a target="_blank" rel="noopener noreferrer" href="https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector">Splunk</a></td>
      <td>
         <p>The secret is required and has to be entered by the user. This is what Splunk refers to as <code>token</code>. Refer to <a target="_blank" rel="noopener noreferrer" href="https://docs.splunk.com/Documentation/Splunk/latest/Data/UsetheHTTPEventCollector#How_the_Splunk_platform_uses_HTTP_Event_Collector_tokens_to_get_data_in">Splunk’s documentation</a> for details.</p>         
      </td>
      <td>
         <p>1. We only support three Splunk endpoints: <code>services/collector</code>, <code>services/collector/raw</code>, and <code>services/collector/event</code>.</p>
         <p>2. If SSL is enabled on the token, the port must be 443. If SSL is not enabled on the token, the port must be 8088.</p>
         <p>3. SSL must be enabled on the server.</p>         
      </td>
   </tr>   
   <!-- generic webhook    -->
   <tr>
      <td valign="top">Generic webhook</td>
      <td>
         <p>User decides.</p>         
      </td>
      <td>
         <p>User decides.</p>         
      </td>
   </tr>   
  </tbody>
</table>

After configuring the external service you want to connect to, set up webhooks in your Cloudflare dashboard:

1. Go to [Notifications](https://dash.cloudflare.com/?to=/:account/notifications) on the Cloudflare dashboard.
2. Click **Destinations**.
3. In the **Webhooks** card, click **Create**.
4. Give your webhook a name, so you can identify it later.
5. In the **URL** field, enter the URL of the third-party service you previously set up and want to connect to your Cloudflare account.
6. If needed, insert the **Secret**. Secrets are how webhooks are encrypted and vary according to the service you are connecting to Cloudflare.
7. Click **Save and Test** to finish setting up your webhook.

The new webhook will appear in the **Webhooks** card.

## Generic webhooks

If you use a service that is not covered by Cloudflare's currently available webhooks, you can configure your own. Follow steps 1-6 above, and enter a valid webhook URL. It is always recommended to use a secret for generic webhooks. Cloudflare will send your secret in the `cf-webhook-auth` header of every request made. If this header is not present, or is not your specified value, you should reject the webhook.

After clicking **Save and Test**, your webhook should now be configured as a destination you can use to attach to policies.

When Cloudflare sends you a webhook, it will have the following schema:

```txt
{
    "text": Hello World! This is a test message sent from https://cloudflare.com. If you can see this, your webhook is configured properly.
}
```

In the above example, `"text"` will vary depending on the alert that was fired.

### Use generic webhooks with Workers

You can use Cloudflare Workers with a generic webhook to deliver notifications to any service that accepts webhooks.

Cloudflare has an [example tool](https://github.com/cloudflare/cf-webhook-relay/) to help you understand how you can use [Workers](/workers/) and generic webhooks. The example provided transforms a generic webhook response in order for it to be delivered to Rocket.Chat. The code provided is heavily commented to guide you in the process of adapting the example to your needs.