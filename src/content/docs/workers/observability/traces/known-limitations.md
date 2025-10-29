---
pcx_content_type: navigation
title: Known limitations
sidebar:
  order: 3
  group:
    hideIndex: false
---

Workers tracing is currently in open beta. This page documents current limitations and any upcoming features on our roadmap.

To provide more feedback and send feature requests, head to the [Workers tracing GitHub discussion](https://github.com/cloudflare/workers-sdk/discussions/11062).

### Non-I/O operations may report time of 0 ms

Due to [security measures put in place to prevent Spectre attacks](/workers/reference/security-model/#step-1-disallow-timers-and-multi-threading), the Workers
Runtime does not update time until I/O events take place. This means that some spans will return a length of `0 ms` even when the operation took longer.

The Cloudflare Workers team is exploring security measures that would allow exposing time lengths at milisecond-level granularity in these cases.

### Trace context propagation not yet supported

Currently, Workers tracing does not propagate trace IDs to different platforms or accept trace IDs from other platforms.

This means that spans from Workers will not be nested within traces from services that call Workers (or vice versa).

Ideally, trace context can flow across service boundaries and automatically link spans together to create complete, end-to-end visibility.
When fully implemented, our automatic trace context propagation will follow [W3C standards](https://www.w3.org/TR/trace-context/) to ensure compatibility across your existing tools and services.
This will allow for traces to include spans from both Workers and other services.

Without trace context propagation, calls to separate Workers and to Durable Objects create separate traces, rather than nested spans.

### Incomplete spans attributes

We are planning to add more detailed attributes on each span. You can find a complete list of what is already instrumented [here](/workers/observability/traces/spans-and-attributes).

Your feedback on any missing information will help us prioritize additions and changes. Please comment on the [Workers tracing GitHub discussion](https://github.com/cloudflare/workers-sdk/discussions/TODO-GET-THE-LINK)
if specific attributes would be helpful to use tracing effectively.

### Support for custom spans and attributes

Automatic instrumentation covers many platform interactions, but we know you need visibility into your own application logic too. We're working to support the [OpenTelemetry API](https://www.npmjs.com/package/@opentelemetry/api) to make it easier for you to instrument custom spans within your application.

### Span and attribute names subject to change

As Workers tracing is currently in beta, span names and attribute names are not yet finalized. We may refine these names during the beta period to improve clarity and align with OpenTelemetry semantic conventions. We recommend reviewing the [spans and attributes documentation](/workers/observability/traces/spans-and-attributes) periodically for updates.

### Known bugs and other call outs

- There are currently are a few attributes that only apply to some spans (e.g.`service.name`, `faas.name`). When filtering or grouping by the Worker name across traces and logs, use `$metadata.service` instead, as it will apply consistently across all event types.
- While a trace is in progress, the event will show `Trace in Progress` on the root span. Please wait a few moments for the full trace to become available
