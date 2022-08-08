---
pcx_content_type: content
title: Trace Workers
weight: 1
meta:
    title: Trace Workers
---

# Trace Workers

A trace Worker is a Worker that receives information about the execution of other Workers – for example, their result statuses or the content that they passed to `console.log()`. This lets trace Workers do things like sending logs to a third-party endpoint for debugging or analytics.

There are several things that must be done for a trace Worker script to receive trace data:
* The worker must call `addEventListener('trace', handler)` to register a handler for trace events.
* The worker must be installed as a worker pipeline's logging target.

Once these things are done, each time the Workers runtime encounters an event that would trigger the pipeline – for example, a `fetch` event – it will collect trace data as it runs Workers to handle the event. Then, once all work triggered by that event is complete – including tasks registered via `waitUntil()` – the collected trace data is submitted to the trace Worker by calling its registered handler. Note that this happens even if a Worker failed due to an exception or running out of memory or CPU time.

**Sample trace Worker**:
```json
addEventListener("trace", event => {
  event.waitUntil(fetch("http://example.com/trace", {
    method: "POST",
    body: JSON.stringify(event.traces),
  }))
})
```

**Corresponding data**:
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
        "headers": [
          "cf-ray": "57d55f210d7b95f3",
          "x-custom-header-name": "my-header-value"
        ],
        "cf": {
          "colo": "SJC"
        }
      },
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

## Field details

<details>
<summary>TraceEvent</summary>
<div>
This is the type of the parameter that gets passed to the trace event handler.<br>
<br>
Like `FetchEvent`, `TraceEvent` extends the generic `Event` type, so it also has `stopImmediatePropagation()` and `preventDefault()` methods.

**Properties**
* `traces`: an array of `TraceItems`. <br>

One `TraceItem` is collected for each event that triggers a Worker or pipeline, including the toplevel pipeline.  This means that in the common tracing case – where a user worker is alone in a traced pipeline – traces will contain two elements: one for the pipeline itself and one for the user Worker.  Currently, the pipeline `TraceItem` does not contain useful information. Thus a trace Worker will typically want to ignore the first element and look at traces[1] instead.

**Methods**
* `waitUntil()`: takes a promise that extends the lifetime of the event.<br>
<br>
This is similar to `FetchEvent.waitUntil()`. However, unlike fetch event handlers, trace handlers do not return a value. This is the only way for trace Workers to do asynchronous work.
</div>
</details>

<details>
<summary>TraceItem</summary>
<div>
The trace information collected for one invocation of a Worker stage or pipeline.
<br>

**Properties**
* `scriptName`: a string containing the script name given in the pipeline, or null if the script name is not set/populated.
* `event`: Contains information about the Worker’s triggering event.
    * For fetch events: a `FetchEventInfo` object
    * For other event types: `null`, currently
* `eventTimestam`p: a Number indicating milliseconds since time origin
* `logs`: an array of `TraceLogs`
* `exceptions`: an array of `TraceExceptions`.  Note that a single worker invocation might result in multiple unhandled exceptions, since a worker can register multiple asynchronous tasks.
* outcome: a string describing the outcome of the worker invocation, one of:
    * An uncaught JavaScript exception
    * A fetch handler that does not result in a Response
    * An internal error
    * `unknown`: outcome status was not set.  Currently, this should only occur for pipeline TraceItems, not Worker TraceItems.
    * `ok`: The worker invocation succeeded.
    * `exception`: An unhandled exception was thrown.  This can happen for many reasons, including:
    * `exceededCpu`: The Worker invocation exceeded either its CPU or memory limits.
    * `killSwitch`: can’t currently happen
    * `daemonDown`: can’t currently happen
    * `scriptNotFound`: an internal error indicating a misconfigured pipeline or a difficulty retrieving the script.
    * `canceled`: The worker invocation was canceled before it completed, commonly because the client disconnected before a response could be sent.

Note that outcome is not the same as HTTP status.  A Worker can have an `ok` outcome when it “successfully” sends a 404 or 5xx error.  Likewise, a worker can have a non-`ok` outcome even after successfully sending a 200 response – for example, when an asynchronous task registered via `waitUntil()` later exceeds CPU or memory limits.

</div>
</details>

<details>
<summary>FetchEventInfo</summary>
<div>
Contains details about the FetchEvent that triggered a worker invocation as well as information about the response that the worker sent.

**Properties**
* request: `TraceRequest`
* response: `TraceResponse`


</div>
</details>

<details>
<summary>TraceRequest</summary>
<div>
Contains properties that selectively mirror properties on the `event.request` of `FetchEvent`.
<br>

**Properties**
* `cf`: a JavaScript Object containing the data from `FetchEvent.request.cf`
* `headers`: a dictionary of header name/value entries (redacted by default).  Header names are lower-cased, and the values associated with duplicate header names are concatenated, with the string ", " (comma space) interleaved (similar to https://fetch.spec.whatwg.org/#concept-header-list-get).
* `method`: a string containing the data from `FetchEvent.request.method`
* `url`: a string containing `FetchEvent.request.url` (redacted by default)

**Methods**
* `getUnredacted()`: returns a `TraceRequest` object with unredacted properties

**Redaction**

Since one of the anticipated use cases for trace Workers is to record request information to various places, some of the properties of `TraceReques`t are redacted by default to make it harder to accidentally record sensitive information like user credentials or API tokens.  The redactions use heuristic rules, so they are subject to false positives and negatives; clients can call `getUnredacted()` to bypass redaction, but they should always be careful about what information is retained, whether using the redaction or not.

**Header redaction**: The header value will be the string “REDACTED” when the (case-insensitive) header name is “cookie”/“set-cookie” or contains a substring “auth”, “key”, “secret”, “token”, or "jwt".

**URL redaction**: For each greedily matched substring of ID characters (a-z, A-Z, 0-9, '+', '-', '_') in the URL, if it meets the following criteria for a hex or base-64 ID, the substring will be replaced with the string “REDACTED”:
* Hex ID: Contains 32 or more hex digits, and contains only hex digits and separators ('+', '-', '_')
* Base-64 ID: Contains 21 or more characters, and contains at least two uppercase, two lowercase, and two digits.
</div></details>

<details>
<summary>TraceResponse</summary>
<div>
Contains properties that reflect information about a response.
<br>

**Properties**
* `status`: the HTTP status code as a number

</div>
</details>

<details>
<summary>TraceLog</summary>
<div>
Records information sent to consolte functions.
<br>

**Properties**
* `timestamp`: a number indicating milliseconds since time origin
* `level`: a string indicating the console function that was called, one of:
    * `debug`
    * `info`
    * `log`
    * `warn`
    * `error`
* `message`: a JavaScript Object representing the array of parameters passed to the console function.

    Note that the parameter data is recorded using JSON serialization, so some types may require additional manipulation to convey useful information in traces.  For example, the `Headers` type:

    ```json
    let h = new Headers({"name": "value"})
    console.log(h)                 // message: [{}]
    console.log([...h.entries()])  // message: [[["name", "value"]]]
    ```

</div></details>

<details>
<summary>TraceException</summary>
<div>
Records an unhandled exception that occurred during the Worker invocation.
<br>

**Properties**
* `timestamp`: a number indicating milliseconds since time origin
* `message`: a string, typically the error description (for example, `"x" is not a function`
* `name`: a string, typically the error type (for example, `Error` or `TypeError`)

</div></details>