---
pcx_content_type: concept
title: Real-time logs
meta:
  description: Debug your Worker application by accessing logs and exceptions through the Cloudflare dashboard or wrangler tail.
---

# Log from Workers

Debugging is a critical part of developing a new application — whether running code in the initial stages of development, or trying to understand an issue occurring in production.

The Workers platform captures all `console.log`'s and uncaught exceptions, in addition to information about the event itself.

{{<Aside type="warning">}}

This feature is not available for zones on the [Cloudflare China Network](/china-network/).

{{</Aside>}}


## Add custom logs

Any `console.log` statements within your Worker will appear within the dashboard output. The following example demonstrates a custom `console.log` within a Worker request handler.

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

After you deploy the above code you can see the real-time logs in the dashboard.

## View logs from the dashboard

To review real-time logs associated with any deployed Worker:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, go to **Workers & Pages**.
3. In **Overview**, select your **Worker** > and select **Logs**. 

Logging is available for all customers, including those on the Free plan.

Note that:

- Workers logs are not stored. You can start and stop the stream at any time to view them, but they do not persist.
- Logs will not display if the Worker's requests per second are over 200 for the last 5 minutes.
- Logs from any [Durable Objects](/durable-objects/) your Worker is using will show up in the dashboard.
- A maximum of 10 clients can view a Worker's logs at one time. This can be a combination of either dashboard sessions or `wrangler tail` calls.

## View logs using `wrangler tail`

With your Workers application deployed, you may want to inspect incoming traffic. This may be useful in situations where a user is running into production issues that they cannot easily reproduce. In these instances, [`wrangler tail`](/workers/wrangler/commands/#tail) allows developers to livestream their Workers application’s logs, giving real-time insight into their application's incoming requests.

To get started, run `wrangler tail` in your Worker project directory. This will log any incoming requests to your application available in your local terminal.

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

## Persisting logs

Logs can be persited in two ways: using [Workers Logpush](/workers/observability/logging/logpush/) or [Tail Workers](/workers/observability/logging/tail-workers/).

[Workers Logpush](/workers/observability/logging/logpush/) allows you to send Workers Trace Event Logs to a [supported destination](/logs/get-started/enable-destinations/). Worker's Trace Events Logpush includes metadata about requests and responses, unstructured `console.log()` messages and any uncaught exceptions.

Refer to the [Workers Logpush documentation](/workers/observability/logging/logpush/) to learn how to create and configure Logpush jobs.

[Tail Workers](/workers/observability/logging/logpush/) allow you to automatically invoke Tail Workers after the invocation of a producer Worker (the Worker the Tail Worker will track) that contains the application logic. It captures events after the producer has finished executing. You can filter, change the format of the data and send events to any HTTP endpoint.

Refer to the [Tail Workers documentation](/workers/observability/logging/tail-workers/) to learn how to create and configure Tail Workers.


## Related resources

* [Errors and exceptions](/workers/observability/errors/) - Review common Workers errors.
* [Local development and testing](/workers/observability/local-development-and-testing/) - Develop and test you Workers locally.
* [Wrangler Tail](/workers/observability/logging/wrangler-tail/) - Learn how to see real-time logs with wrangler tail.
* [Logpush](/workers/observability/logging/logpush/) - Learn how to push Workers Trace Event Logs to supported destinations.
* [Tail Workers](/workers/observability/logging/logpush/) - Learn how to attach Tail Workers to transform your logs and send them to HTTP endpoints.
