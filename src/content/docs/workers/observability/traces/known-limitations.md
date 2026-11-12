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

Due to [security measures put in place to prevent Spectre attacks](/workers/reference/security-model/#step-1-disallow-timers-and-multi-threading), the runtime clock does not advance during JavaScript execution. It updates when I/O events take place. Native spans and [custom spans](/workers/observability/traces/custom-spans/) use this clock. A synchronous operation can therefore report `0 ms` even when it performs CPU work.

Recording `Date.now()` at the start of your handler uses this same clock. It cannot independently measure how long the request waited before the handler started. Two identical `Date.now()` values do not mean that no time passed.

The Cloudflare Workers team is exploring security measures that would allow exposing time lengths at millisecond-level granularity in these cases.

### Trace durations and gaps

Span durations and gaps may differ from the actual time that passed because they use the [runtime clock](#non-io-operations-may-report-time-of-0-ms).

Invocation wall time is measured separately. Refer to [Invocation timing](/workers/observability/traces/spans-and-attributes/#invocation-timing) for measurement definitions and a `waitUntil()` example.

A gap before the first child span does not tell you whether time was spent starting the Worker, waiting in a queue, or dispatching the request. Subtracting wall time from root span duration does not tell you either.

When a Worker calls another Worker or a Durable Object, their clocks can be adjusted independently. Do not use differences between their span timestamps to measure network latency.

### Trace context propagation to external services

When exporting traces to external platforms, trace IDs are not propagated to services outside of Cloudflare. This means traces from your Workers will not link with traces from non-Cloudflare services in your observability tools.

We are working on automatic trace context propagation using [W3C Trace Context standards](https://www.w3.org/TR/trace-context/), which will enable complete end-to-end visibility across your existing tools and services.

### Incomplete spans attributes

We are planning to add more detailed attributes on each span. You can find a complete list of what is already instrumented [here](/workers/observability/traces/spans-and-attributes).

Your feedback on any missing information will help us prioritize additions and changes. Please comment on the [Workers tracing GitHub discussion](https://github.com/cloudflare/workers-sdk/discussions/11062)
if specific attributes would be helpful to use tracing effectively.

### Span and attribute names subject to change

As Workers tracing is currently in beta, span names and attribute names are not yet finalized. We may refine these names during the beta period to improve clarity and align with OpenTelemetry semantic conventions. We recommend reviewing the [spans and attributes documentation](/workers/observability/traces/spans-and-attributes) periodically for updates.

### Known bugs and other call outs

- There are currently are a few attributes that only apply to some spans (e.g.`service.name`, `faas.name`). When filtering or grouping by the Worker name across traces and logs, use `$metadata.service` instead, as it will apply consistently across all event types.
- While a trace is in progress, the event will show `Trace in Progress` on the root span. Please wait a few moments for the full trace to become available
