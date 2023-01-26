---
pcx-content-type: how-to
title: Debugging and logging
weight: 12
---

# Debugging and logging 

Logs are a powerful debugging tool that can help you test and monitor the behavior of your Pages Functions once they have been deployed. For every Pages project deployment, you can access your Functions logs using:

1. The Cloudflare dashboard.
2. Wrangler's [`deployment tail`](/workers/wrangler/commands/#deployment-tail) command.

Logs can capture and provide detailed information about:

* Successful or failed requests to your Functions.
* Uncaught exceptions thrown by your Functions.
* Custom `console.log`s declared within your Functions.

Logging is available for all customers on all plans.

## Add custom logs

Custom logs are `console.log()` statements that you can add inside your Functions. When streaming logs for deployments that ??contain/reference?? these Functions, the statements will appear in both `wrangler pages deployment tail` and dashboard outputs. 

Here is an example of a custom `console.log` statement inside a Pages Function:

```js
---
filename: 
---
export async function onRequest(context) {
  const { request }  = context;
  console.log(`[LOGGING FROM /hello]: Request came from ${request.url}`);

  return new Response("Hello, world!");
}
```

After you deploy the code above, run `wrangler pages deployment tail` in your terminal. Then access the route at which your Function lives. Your Cloudflare dashbboard will display:

![Custom logs displaying in the dashboard](/pages/platform/functions/media/dash-custom-logs.png)

Similarly, your terminal will display:

![Custom logs displaying in Wrangler](/pages/platform/functions/media/wrangler-custom-logs.png)

## View logs with Wrangler

To livestream logs with Wrangler, run `wrangler pages deployment tail` in your Pages project directory. 

This will log any incoming requests to your application in your local terminal. Logs are useful to understand production issues that cannot be easily reproduced. In such cases, the `wrangler pages deployment tail` command enables developers to livestream logs for a specific project and deployment, and gain real-time insight into their application’s incoming requests.

The output of each `wrangler pages deployment tail` log is a structured JSON object:

```js
{
  "outcome": "ok",
  "scriptName": null,
  "exceptions": [],
  "logs": [],
  "eventTimestamp": 1668542036104,
  "event": {
    "request": {
      "url": "https://pages-fns.pages.dev",
      "method": "GET",
      "headers": {},
      "cf": {}
    },
    "response": {
      "status": 200
    }
  },
  "id": 0
}
```

`wrangler pages deployment tail` enables you to customize a logging session to suit your use case. Refer to the [`deployment tail` documentation](/workers/wrangler/commands/#deployment-tail) for available configuration options.

## View logs in the Cloudflare Dashboard

To view logs for your production or preview environments associated with any deployment:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. In **Account Home**, select **Pages** > **your Pages project**.
3. Next to the deployment you would like to review logs for, select **View details** > **Functions**.

![Access real-time logs by following the instructions above.](/pages/platform/functions/media/dash-logs.png)

## Limits

The following limits apply to Functions logs:

* Logs are not stored. You can start and stop the stream at any time to view them, but they do not persist.
* Logs will not display if the Function’s requests per second are over 100 for the last 5 minutes.
* Logs from any [Durable Objects](/pages/platform/functions/bindings/#durable-object-namespaces) your Functions bind to will show up in the dashboard.
* A maximum of 10 clients can view a deployment’s logs at one time. This can be a combination of either dashboard sessions or `wrangler pages deployment tail` calls.