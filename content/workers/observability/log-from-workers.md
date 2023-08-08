---
pcx_content_type: concept
title: Log from Workers
---

# Log from Workers

You can access logs and exceptions for your Workers using the dashboard or [`wrangler tail`](/workers/wrangler/commands/#tail).

The Workers platform captures all `console.log`'s and uncaught exceptions, in addition to information about the event itself. All of this can be viewed with either `wrangler tail` or in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. In **Overview**, select your Worker > **Logs**.

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

## View logs using `wrangler tail`

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

---

## Identifying and handling errors and exceptions

### Error pages generated by Workers

When a Worker running in production has an error that prevents it from returning a response, the client will receive an error page with an error code, defined as follows:

{{<table-wrap>}}

| Error code | Meaning                                                                                                           |
| ---------- | ----------------------------------------------------------------------------------------------------------------- |
| 1101       | Worker threw a JavaScript exception.                                                                              |
| 1102       | Worker exceeded [CPU time limit](/workers/platform/limits/).                                                      |
| 1015       | Your client IP is being rate limited.                                                                             |
| 1027       | Worker exceeded free tier [daily request limit](/workers/platform/limits/#daily-request).                         |
| 1042       | Worker tried to fetch from another Worker on the same zone, which is [unsupported](/workers/runtime-apis/fetch/). |

{{</table-wrap>}}

Other `11xx` errors generally indicate a problem with the Workers runtime itself. Refer to the [status page](https://www.cloudflarestatus.com) if you are experiencing an error.

### Identifying errors: Workers Metrics

To review whether your application is experiencing any downtime or returning any errors:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. In **Account Home**, select **Workers & Pages**.
3. In **Overview**, select your Worker and review your Worker's metrics.

### Debugging exceptions

After you have identified your Workers application is returning exceptions, use `wrangler tail` to inspect and fix the exceptions.

<!-- TODO: include example -->

Exceptions will show up under the `exceptions` field in the JSON returned by `wrangler tail`. After you have identified the exception that is causing errors, redeploy your code with a fix, and continue tailing the logs to confirm that it is fixed.

### Set up a logging service

A Worker can make HTTP requests to any HTTP service on the public Internet. You can use a service like [Sentry](https://sentry.io) to collect error logs from your Worker, by making an HTTP request to the service to report the error. Refer to your service’s API documentation for details on what kind of request to make.

When using an external logging strategy, remember that outstanding asynchronous tasks are canceled as soon as a Worker finishes sending its main response body to the client. To ensure that a logging subrequest completes, pass the request promise to [`event.waitUntil()`](https://developer.mozilla.org/en-US/docs/Web/API/ExtendableEvent/waitUntil). For example:

{{<tabs labels="js/esm | js/sw">}}
{{<tab label="js/esm" default="true">}}

```js
export default {
  async fetch(request, env, ctx) {
    function postLog(data) {
      return fetch("https://log-service.example.com/", {
        method: "POST",
        body: data,
      });
    }

    // Without ctx.waitUntil(), the `postLog` function may or may not complete.
    ctx.waitUntil(postLog(stack));
    return fetch(request);
  }
}
```
{{</tab>}}
{{<tab label="js/sw">}}
```js
addEventListener("fetch", (event) => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  // ...

  // Without event.waitUntil(), the `postLog` function may or may not complete.
  event.waitUntil(postLog(stack));
  return fetch(event.request);
}

function postLog(data) {
  return fetch("https://log-service.example.com/", {
    method: "POST",
    body: data,
  });
}
```
{{</tab>}}
{{</tabs>}}

### Go to origin on error

By using [`event.passThroughOnException`](/workers/runtime-apis/fetch-event/#passthroughonexception), a Workers application will forward requests to your origin if an exception is thrown during the Worker's execution. This allows you to add logging, tracking, or other features with Workers, without degrading your application's functionality.

{{<tabs labels="js/esm | js/sw">}}
{{<tab label="js/esm" default="true">}}

```js
export default {
  async fetch(request, env, ctx) {
    ctx.passThroughOnException();
    // an error here will return the origin response, as if the Worker wasn't present
    return fetch(request);
  }
}
```
{{</tab>}}
{{<tab label="js/sw">}}

```js
addEventListener("fetch", (event) => {
  event.passThroughOnException();
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // An error here will return the origin response, as if the Worker wasn’t present.
  // ...
  return fetch(request);
}
```
{{</tab>}}
{{</tabs>}}
