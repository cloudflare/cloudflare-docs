---
pcx_content_type: concept
title: TailEvent
---
# TailEvent

### Background
A Tail Event is the event type to automatically capture data from a producer Worker. It can be used to process logs in real-time and send them to a logging or analytics service.

## Synatx: Module Worker
`TailEvent` can be handled in Workers functions written using the Module Worker syntax by adding an tail function to your module’s exported handlers:

```js
export default {
  async tail(events, env, ctx) => {
    fetch("<YOUR_ENDPOINT>", {
      method: "POST",
      body: JSON.stringify(events),
    })
  }
}
```
### Parameters

{{<definitions>}}

- `events` {{<type>}}Array{{</type>}}

  - An array of [`TailItems`](/workers/runtime-apis/tail-event/#tailitems). One `TailItem` is collected for each event that triggers a Worker.  For Workers for Platforms customers with a Tail Worker installed on the Dispatch Worker, `events` will contain two elements: one for the Dispatch Worker and one for the User Worker. 


- `env` {{<type>}}object{{</type>}}

  - An object containing the bindings associated with your Module Worker, such as KV namespaces and Durable Objects.

- `ctx` {{<type>}}object{{</type>}}
  - An object containing the context associated with your Module Worker. Currently, this object just contains the `waitUntil` function.


{{</definitions>}}


## Synatx: Service Worker
`TailEvent` can be handled in Workers functions written using the Service Worker syntax by attaching to the tail event with addEventListener:

```js
addEventListener('tail', event  => 
    fetch("<YOUR_ENDPOINT>", {
      method: "POST",
      body: JSON.stringify(events),
    })
  );
```

### Properties

{{<definitions>}}

- `event.type` {{<type>}}string{{</type>}}

  - The type of event. This will always return `"tail"`.


- {{<code>}}event.waitUntil(promise{{<param-type>}}Promise{{</param-type>}}){{</code>}} : {{<type>}}void{{</type>}}

  - Refer to [`waitUntil`](#waituntil). Note that unlike fetch event handlers, tail handlers do not return a value, so this is the only way for trace Workers to do asynchronous work.

{{</definitions>}}


### `TailItems`
#### Properties


{{<definitions>}}

- `scriptName` {{<type>}}string{{</type>}}

  - The name of the producer script.


- `event` {{<type>}}object{{</type>}}

  - Contains information about the Worker’s triggering event.
    - For fetch events: a [`FetchEventInfo` object](/workers/runtime-apis/tail-event/#fetcheventinfo)
    - For other event types: null, currently

- `eventTimestamp` {{<type>}}number{{</type>}}

  - Measured in epoch time. 

- `logs` {{<type>}}array{{</type>}}

  - An array of [TailLogs](/workers/runtime-apis/tail-event/#taillogs).

- `exceptions` {{<type>}}array{{</type>}}

  - An array of [TailExceptions](/workers/runtime-apis/tail-event/#tailexceptions). A single worker invocation might result in multiple unhandled exceptions, since a worker can register multiple asynchronous tasks.
  
- `outcome` {{<type>}}string{{</type>}}

  - The outcome of the worker invocation, one of:
    - An uncaught JavaScript exception
    - A fetch handler that does not result in a Response
    - An internal error
    - `unknown`: outcome status was not set.
    - `ok`: The worker invocation succeeded.
    - `exception`: An unhandled exception was thrown.  This can happen for many reasons, including:
      - `exceededCpu`: The Worker invocation exceeded either its CPU limits.
      - `exceededMemory`: The Worker invocation exceeded memory limits. 
      - `scriptNotFound`: An internal error from difficulty retrieving the script.
      - `canceled`: The worker invocation was canceled before it completed. Commonly because the client disconnected before a response could be sent.
{{</definitions>}}



{{<Aside type="note" header="Outcome is not the same as HTTP status.">}}
A Worker can have an 'ok' outcome when it “successfully” sends a 404 or 5xx error.  Likewise, a worker can have a non-'ok' outcome even after successfully sending a 200 response – for example, when an asynchronous task registered via waitUntil() later exceeds CPU or memory limits. 
{{</Aside>}}

### `FetchEventInfo`
#### Properties

{{<definitions>}}

- `request` {{<type>}}object{{</type>}}

  - A [`TailRequest` object](/workers/runtime-apis/tail-event/#tailrequest)

- `response` {{<type>}}object{{</type>}}

  - A [`TailResponse` object](/workers/runtime-apis/tail-event/#tailresponse)
{{</definitions>}}

### `TailRequest`
#### Properties
{{<definitions>}}

- `cf` {{<type>}}object{{</type>}}

  - Contains the data from [IncomingRequestCfProperties](/workers/runtime-apis/request/#incomingrequestcfproperties)

- `headers` {{<type>}}Object{{</type>}}

  - Header name/value entries (redacted by default).  Header names are lower-cased, and the values associated with duplicate header names are concatenated, with the string ", " (comma space) interleaved, similar to [the Fetch standard](https://fetch.spec.whatwg.org/#concept-header-list-get).

- `method` {{<type>}}String{{</type>}}

  - The HTTP request method.

- `url` {{<type>}}String{{</type>}}

  - The HTTP request URL (redacted by default).

{{</definitions>}}
#### Methods
{{<definitions>}}
- `getUnredacted()` {{<type>}}Object{{</type>}}

  - Returns a TailRequest object with unredacted properties.
{{</definitions>}}

Some of the properties of TraceRequest are redacted by default, to make it harder to accidentally record sensitive information like user credentials or API tokens.  The redactions use heuristic rules, so they are subject to false positives and negatives; clients can call getUnredacted() to bypass redaction, but they should always be careful about what information is retained, whether using the redaction or not.

- Header redaction: The header value will be the string “REDACTED” when the (case-insensitive) header name is “cookie”/“set-cookie” or contains a substring “auth”, “key”, “secret”, “token”, or "jwt".
- URL redaction: For each greedily matched substring of ID characters (a-z, A-Z, 0-9, '+', '-', '_') in the URL, if it meets the following criteria for a hex or base-64 ID, the substring will be replaced with the string “REDACTED”:
- Hex ID: Contains 32 or more hex digits, and contains only hex digits and separators ('+', '-', '_')
- Base-64 ID: Contains 21 or more characters, and contains at least two uppercase, two lowercase, and two digits.

### `TailResponse`
#### Properties
{{<definitions>}}

- `status` {{<type>}}number{{</type>}}

  - The HTTP status code
{{</definitions>}}


### `TailLog`
Records information sent to console functions.

#### Properties
{{<definitions>}}

- `timestamp` {{<type>}}number{{</type>}}

  - Measured in epoch time.

- `level` {{<type>}}String{{</type>}}

  - A string indicating the console function that was called. One of: `debug`, `info`, `log`, `warn`, `error`

- `message` {{<type>}}Object{{</type>}}

  - The array of parameters passed to the console function.
{{</definitions>}}

### `TailException`
Records an unhandled exception that occurred during the Worker invocation.

#### Properties
{{<definitions>}}

- `timestamp` {{<type>}}number{{</type>}}

  - Measured in epoch time.

- `name` {{<type>}}String{{</type>}}

  - The error type (e.g. “Error”, “TypeError”, etc.)

- `message` {{<type>}}Object{{</type>}}

  - The error description (e.g. “"x" is not a function”)

{{</definitions>}}



