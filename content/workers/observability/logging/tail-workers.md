---
pcx_content_type: concept
title: Tail Workers
meta:
  description: Track and log Workers on invocation by assigning a Tail Worker to your projects.
---

{{<heading-pill style="beta">}}Tail Workers{{</heading-pill>}}

A Tail Worker receives information about the execution of other Workers (known as producer Workers), such as HTTP statuses, data passed to `console.log()` or uncaught exceptions. Tail Workers can process logs for alerts, debugging, or analytics.

Tail Workers are available to all customers on the Workers Paid and Enterprise tiers. They are priced the same as [Workers](/workers/platform/pricing/#workers).

![Tail Worker diagram](/images/workers/platform/tail-workers.png)

A Tail Worker is automatically invoked after the invocation of a producer Worker (the Worker the Tail Worker will track) that contains the application logic. It captures events after the producer has finished executing. You can filter, change the format of the data and send events to any HTTP endpoint. For quick debugging, Tail Workers can be used to send logs to [KV](/kv/api/) or any database.

## Configure Tail Workers

To configure a Tail Worker:

1. [Create a Worker](/workers/get-started/guide) to serve as the Tail Worker.
2. Add a [`tail()`](/workers/runtime-apis/handlers/tail/) handler to your Worker. The `tail()` handler is invoked every time the producer Worker a Tail Worker is connected to is invoked. The following Worker code is a Tail Worker that sends its data to an HTTP endpoint:

```js
---
filename: index.js
---
export default {
  async tail(events) {
    fetch("https://example.com/endpoint", {
      method: "POST",
      body: JSON.stringify(events),
    })
  }
}
```

The following Worker code is an example of what the `events` object may look like:

```json
---
filename: index.js
---
[
  {
    "scriptName": "Example script",
    "outcome": "exception",
    "eventTimestamp": 1587058642005,
    "event": {
      "request": {
        "url": "https://example.com/some/requested/url",
        "method": "GET",
        "headers": {
          "cf-ray": "57d55f210d7b95f3",
          "x-custom-header-name": "my-header-value"
        },
        "cf": {
          "colo": "SJC"
        }
      }
    },
    "logs": [
      {
        "message": ["string passed to console.log()"],
        "level": "log",
        "timestamp": 1587058642005
      }
    ],
    "exceptions": [
      {
        "name": "Error",
        "message": "Threw a sample exception",
        "timestamp": 1587058642005
      }
    ],
    "diagnosticsChannelEvents": [
      {
        "channel": "foo",
        "message": "The diagnostic channel message",
        "timestamp": 1587058642005
      }
    ]
  }
]
```

3. Add the following to the `wrangler.toml` file of the producer Worker:

```toml
tail_consumers = [{service = "<TAIL_WORKER_NAME>"}]
```

{{<Aside type="note">}}
The Worker that you add a `tail_consumers` binding to must have a `tail()` handler defined.
{{</Aside>}}

## Related resources

- [`tail()`](/workers/runtime-apis/handlers/tail/) Handler API docs - Learn how to set up a `tail()` handler in your Worker.
* [Errors and exceptions](/workers/observability/errors/) - Review common Workers errors.
* [Local development and testing](/workers/testing/local-development/) - Develop and test you Workers locally.
* [Source maps and stack traces](/workers/observability/source-maps) - Learn how to enable source maps and generate stack traces for Workers.  