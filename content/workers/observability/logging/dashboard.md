---
pcx_content_type: concept
title: Real-time logs in Dashboard
meta:
  description: Debug your Worker application by accessing logs and exceptions through the Cloudflare dashboard.
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

## Persisting logs

[Workers Logpush](/workers/observability/logging/logpush/) allows you to send Workers Trace Event Logs to a [supported destination](/logs/get-started/enable-destinations/). Worker’s Trace Events Logpush includes metadata about requests and responses, unstructured `console.log()` messages and any uncaught exceptions.

Refer to the [Workers Logpush documentation](/workers/observability/logging/logpush/) to learn how to create and configure Logpush jobs.

## Related resources

* [Errors and exceptions](/workers/observability/errors/) - Review common Workers errors.
* [Logpush](/workers/observability/logging/logpush/) - Learn how to push Workers Trace Event Logs to supported destinations.
* [Local development and testing](/workers/observability/local-development-and-testing/) - Develop and test you Workers locally.