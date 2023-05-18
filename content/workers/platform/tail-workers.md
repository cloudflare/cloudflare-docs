---
pcx_content_type: concept
title: Tail Workers
---

{{<beta>}}Tail Workers{{</beta>}}

A Tail Worker receives information about the execution of other Workers, such as HTTP statuses, data passed to `console.log()` or uncaught exceptions. Tail Workers can process logs for alerts, debugging, or analytics. 

Tail Workers are available to all customers on the Workers paid and enterprise tiers. They are priced the same as [Workers](workers/platform/pricing/#workers). 

![Tail Worker diagram](../media/tail-workers.png)

A Tail Worker is automatically invoked after the invocation of a producer script that contains the application logic. It captures events after the producer has finished executing. You can filter, change the format of the data and send events to any HTTP endpoint. For quick debugging, Tail Workers can be used to send logs to [KV](/workers/runtime-apis/kv/) or any database.

## Configuring Tail Workers

1. Create a Worker to serve as the Tail Worker
2. Tail Workers use a [`TailEvent` handler](/workers/runtime-apis/tail-event) to capture events from the producer. This is a simple Tail Worker that sends its data to an HTTP endpoint:

```js
export default {
  async tail(events) => {
    fetch("https://example.com/endpoint", {
      method: "POST",
      body: JSON.stringify(events),
    })
  }
}
```

Here is an example of what the `events` object may look like:
```json
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
    ]
  }
]
```
3. Add the following to the wrangler.toml file of the producing script:
```
tail_consumers = [{service = "<TAIL_WORKER_NAME>", environment = "<ENVIRONMENT_NAME>"}]
```
{{<Aside type="note">}}
The Worker selected must have a `TailEvent` handler defined. 
{{</Aside>}}





