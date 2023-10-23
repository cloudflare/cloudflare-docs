---
pcx_content_type: concept
title: Log from Workers
---

# Log from Workers

Debugging is a critical part of developing a new application — whether running code in the initial stages of development, or trying to understand an issue occurring in production.

{{<youtube id="8iPmy7ePYDE">}}

You can access logs and exceptions for your Workers by logging into [the dashboard](/workers/observability/log-from-workers/#view-logs-from-the-dashboard) or using [`wrangler tail`](/workers/observability/log-from-workers/#use-wrangler-tail).

The Workers platform captures all `console.log`'s and uncaught exceptions, in addition to information about the event itself.

{{<Aside type="warning" header="Warning">}}
This feature is not available for zones on the [Cloudflare China Network](/china-network/).

{{</Aside>}}

{{<Aside type="note">}}

To push your Worker logs to a third-party provider, refer to [Logpush](/workers/observability/logpush/).

{{</Aside>}}

## Adding custom logs

Any `console.log` statements within your Worker will appear within `wrangler tail` and the dashboard output. The following example demonstrates a custom `console.log` within a Worker request handler.

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

After you deploy the above code, run `wrangler tail` in your terminal, and then access your Worker. Your terminal will display:

```sh
$ wrangler tail --format=pretty
[2021-08-18 17:06:55] [LAX] [Ok] GET https://logging-example.jkup.workers.dev/
 | [Info] Request came from city: Pacifica in country: US
[2021-08-18 17:06:56] [LAX] [Ok] GET https://logging-example.jkup.workers.dev/favicon.ico
 | [Info] Request came from city: Pacifica in country: US
```

## Use `wrangler tail`

With your Workers application deployed, you may want to inspect incoming traffic. This may be useful in situations where a user is running into production issues that they cannot easily reproduce. In these instances, [`wrangler tail`](/workers/wrangler/commands/#tail) allows developers to livestream their Workers application’s logs, giving real-time insight into their application's incoming requests.

To get started, run `wrangler tail` in your Workers project directory. This will log any incoming requests to your application available in your local terminal.

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
$ wrangler tail | jq .event.request.url
"https://www.bytesized.xyz/"
"https://www.bytesized.xyz/component---src-pages-index-js-a77e385e3bde5b78dbf6.js"
"https://www.bytesized.xyz/page-data/app-data.json"
```

You can customize how `wrangler tail` works to fit your needs: refer to [the `wrangler tail` documentation](/workers/wrangler/commands/#tail) for available configuration options.

## View logs from the dashboard

Review the production logs associated with any Worker:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In Account Home, go to **Workers & Pages**.
3. In **Overview**, select your **Worker** > and select **Logs**. 

Logging is available for all customers, including those on the free plan.

![Cloudflare dashboard showing logs for a Worker named logging-example](/images/workers/learning/workers-logging-dashboard.png)

Note that:

- Workers logs are not stored. You can start and stop the stream at any time to view them, but they do not persist.
- Logs will not display if the Worker's requests per second are over 200 for the last 5 minutes.
- Logs from any [Durable Objects](/durable-objects/) your Worker is using will show up in the dashboard.
- A maximum of 10 clients can view a Worker's logs at one time. This can be a combination of either dashboard sessions or `wrangler tail` calls.

## Push logs to storage

[Workers Logpush](/workers/observability/logpush/) allows you to send Workers Trace Event Logs to a [supported destination](/logs/get-started/enable-destinations/). Worker’s Trace Events Logpush includes metadata about requests and responses, unstructured `console.log()` messages and any uncaught exceptions.

Refer to the [Workers Logpush documentation](/workers/observability/logpush/) to learn how to create and configure Logpush jobs.

## Related resources

* [Errors and exceptions](/workers/observability/errors/) - Review common Workers errors.
* [Logpush](/workers/observability/logpush/) - Learn how to push Workers Trace Event Logs to supported destinations.