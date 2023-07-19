---
pcx_content_type: how-to
title: Debugging and logging
weight: 12
---

# Debugging and logging 

Access your Functions logs by using the Cloudflare dashboard or the [Wrangler CLI](/workers/wrangler/commands/#deployment-tail).

Logs are a powerful debugging tool that can help you test and monitor the behavior of your Pages Functions once they have been deployed. Logs are available for every deployment of your Pages project.

Logs provide detailed information about events and can give insight into:

* Successful or failed requests to your Functions.
* Uncaught exceptions thrown by your Functions.
* Custom `console.log`s declared within your Functions.
* Production issues that cannot be easily reproduced.
* Real-time view of incoming requests to your application.

There are two ways to start a logging session:

1. Run `wrangler pages deployment tail` [in your terminal](/pages/platform/functions/debugging-and-logging/#view-logs-with-wrangler).
2. Use the [Cloudflare dashboard](/pages/platform/functions/debugging-and-logging/#view-logs-in-the-cloudflare-dashboard).

## Add custom logs

Custom logs are `console.log()` statements that you can add yourself inside your Functions. When streaming logs for deployments that contain these Functions, the statements will appear in both `wrangler pages deployment tail` and dashboard outputs. 

Below is an example of a custom `console.log` statement  inside a Pages Function:

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

After you deploy the code above, run `wrangler pages deployment tail` in your terminal. Then access the route at which your Function lives. Your terminal will display:

![Run `wrangler pages deployment tail`](/images/pages/platform/functions/wrangler-custom-logs.png)

Your dashboard will display:

![Follow the above steps to access custom logs in the dashboard](/images/pages/platform/functions/dash-custom-logs.png)

## View logs with Wrangler

`wrangler pages deployment tail` enables developers to livestream logs for a specific project and deployment. 

To get started, run `wrangler pages deployment tail` in your Pages project directory. This will log any incoming requests to your application in your local terminal.

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

`wrangler pages deployment tail` allows you to customize a logging session to better suit your needs. Refer to the [`wrangler pages deployment tail` documentation](/workers/wrangler/commands/#deployment-tail) for available configuration options.

## View logs in the Cloudflare Dashboard

To view logs for your `production` or `preview` environments associated with any deployment:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. Select your Pages project, go to the deployment you want to view logs for and select **View details** > **Functions**. 

Logging is available for all customers (Free, Paid, Enterprise).

## Limits

The following limits apply to Functions logs:

* Logs are not stored. You can start and stop the stream at any time to view them, but they do not persist.
* Logs will not display if the Function’s requests per second are over 100 for the last five minutes.
* Logs from any [Durable Objects](/pages/platform/functions/bindings/#durable-object-namespaces) your Functions bind to will show up in the Cloudflare dashboard.
* A maximum of 10 clients can view a deployment’s logs at one time. This can be a combination of either dashboard sessions or `wrangler pages deployment tail` calls.