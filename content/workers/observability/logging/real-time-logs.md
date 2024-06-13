---
pcx_content_type: concept
title: Real-time logs
meta:
  description: Debug your Worker application by accessing logs and exceptions through the Cloudflare dashboard or `wrangler tail`.
---

# Log from Workers

Logging is a fundamental building block supporting application development — it can provide insights during the initial stages of development and is often times crucial to understanding an issue occurring in production.

The Workers platform captures all `console.log`'s and uncaught exceptions, in addition to information about the event itself.

{{<Aside type="warning">}}

Real-time logs are not available for zones on the [Cloudflare China Network](/china-network/).

{{</Aside>}}


## Add custom logs

By default a Worker will emit execution logs containing details about the Request, Response and related metadata.

In addition, you can add custom logs throughout your code. Any `console.log` statements within your Worker will be visible in the dashboard or [`wrangler tail`](/workers/wrangler/commands/#tail). The following example demonstrates a custom `console.log` within a Worker request handler.

{{<tabs labels="js/esm | js/sw">}}
{{<tab label="js/esm" default="true">}}

```js
export default {
  async fetch(request) {
    const { cf } = request;
    const { city, country } = cf;

    console.log(`Request came from city: ${city} in country: ${country}`);

    return new Response("Hello worker!", {
      headers: { "content-type": "text/plain" },
    });
  }
}
```
{{</tab>}}
{{<tab label="js/sw">}}
```js
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  const { cf } = request;
  const { city, country } = cf;

  console.log(`Request came from city: ${city} in country: ${country}`);

  return new Response("Hello worker!", {
    headers: { "content-type": "text/plain" },
  });
}
```
{{</tab>}}
{{</tabs>}}

After you deploy the [above code](/workers/observability/logging/real-time-logs/#add-custom-logs), view the real-time logs in [the dashboard](/workers/observability/logging/real-time-logs/#view-logs-from-the-dashboard) or [`wrangler tail`](/workers/observability/logging/real-time-logs/#view-logs-using-wrangler-tail).

## View logs from the dashboard

To view real-time logs associated with any deployed Worker using the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, go to **Workers & Pages**.
3. In **Overview**, select your **Worker** > and select **Logs**.


## View logs using `wrangler tail`

To view real-time logs associated with any deployed Worker using Wrangler:

1. Go to your Worker project directory.
2. Run [`npx wrangler tail`](/workers/wrangler/commands/#tail).

This will log any incoming requests to your application available in your local terminal.

The output of each `wrangler tail` log is a structured JSON object:

```json
{
  "outcome": "ok",
  "scriptName": null,
  "exceptions": [],
  "logs": [],
  "eventTimestamp": 1590680082349,
  "event": {
    "request": {
      "url": "https://www.bytesized.xyz/",
      "method": "GET",
      "headers": {},
      "cf": {}
    }
  }
}
```

By piping the output to tools like [`jq`](https://stedolan.github.io/jq/), you can query and manipulate the requests to look for specific information:

```sh
$ npx wrangler tail | jq .event.request.url
"https://www.bytesized.xyz/"
"https://www.bytesized.xyz/component---src-pages-index-js-a77e385e3bde5b78dbf6.js"
"https://www.bytesized.xyz/page-data/app-data.json"
```

You can customize how `wrangler tail` works to fit your needs. Refer to [the `wrangler tail` documentation](/workers/wrangler/commands/#tail) for available configuration options.

## Limits

Note that:

- Workers logs are not stored. You can start and stop the stream at any time to view them, but they do not persist.
- If your Worker has a high volume of traffic, the real-time logs might enter sampling mode. This will cause some of your messages to be dropped and a warning to appear in your logs.
- Logs from any [Durable Objects](/durable-objects/) your Worker is using will show up in the dashboard.
- A maximum of 10 clients can view a Worker's logs at one time. This can be a combination of either dashboard sessions or `wrangler tail` calls.

{{<Aside type="note">}}

You can filter real-time logs in the dashboard or using [`wrangler tail`](/workers/wrangler/commands/#tail). If your Worker has a high volume of messages, filtering real-time logs can help mitgate messages from being dropped.

{{</Aside>}}

## Persist logs

Logs can be persisted in two ways:

1. [Workers Logpush](/workers/observability/logging/logpush/).
2. [Tail Workers](/workers/observability/logging/tail-workers/).

[Workers Logpush](/workers/observability/logging/logpush/) allows you to send Workers Trace Event Logs to a [supported destination](/logs/get-started/enable-destinations/). Worker's Trace Events Logpush includes metadata about requests and responses, unstructured `console.log()` messages and any uncaught exceptions.

Refer to the [Workers Logpush documentation](/workers/observability/logging/logpush/) to learn how to create and configure Logpush jobs.

[Tail Workers](/workers/observability/logging/logpush/) allow you to automatically invoke Tail Workers after the invocation of a producer Worker (the Worker the Tail Worker will track) that contains the application logic. It captures events after the producer has finished executing. You can filter, change the format of the data and send events to any HTTP endpoint.

Refer to the [Tail Workers documentation](/workers/observability/logging/tail-workers/) to learn how to create and configure Tail Workers.


## Related resources

* [Errors and exceptions](/workers/observability/errors/) - Review common Workers errors.
* [Local development and testing](/workers/testing/local-development/) - Develop and test you Workers locally.
* [Logpush](/workers/observability/logging/logpush/) - Learn how to push Workers Trace Event Logs to supported destinations.
* [Tail Workers](/workers/observability/logging/logpush/) - Learn how to attach Tail Workers to transform your logs and send them to HTTP endpoints.
* [Source maps and stack traces](/workers/observability/source-maps) - Learn how to enable source maps and generate stack traces for Workers.  
