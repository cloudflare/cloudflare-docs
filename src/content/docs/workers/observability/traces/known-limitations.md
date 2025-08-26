---
pcx_content_type: navigation
title: Known limitations 
sidebar:
  order: 3
  group:
    hideIndex: false
---

Workers tracing is currently in open beta. This page documents current limitations and any upcoming features on our roadmap. To provide more feedback and feature requests please reach out to us.

### Trace context propagation not yet supported
One of the key aspects of distributed tracing is ensuring trace context flows across service boundaries and automatically linking spans together to create complete, end-to-end visibility. When fully implemented, our automatic trace context propagation will follow [W3C standards](https://www.w3.org/TR/trace-context/) to ensure compatibility across your existing tools and services. 

Without trace context propagation, you will also see an additional trace whenever your Worker is making a call to another Worker via service bindings or to a Durable Object. 

### Missing instrumentation for some spans and attributes 
We are adding more automatic instrumentation for every part of the Workers platform. While we first want to give you visibility into the duration of every operation within your request, we also planning to add more detailed attributes on each span. You can find a complete list of what is already instrumented [here](/workers/observability/traces/spans-and-attributes). Your feedback on what’s missing will help us prioritize accordingly.

### Support for custom spans and attributes: 
While automatic instrumentation covers the platform interactions, we know you need visibility into your own application logic too. We're working to support the [OpenTelemetry API](https://www.npmjs.com/package/@opentelemetry/api) to make it easier for you to instrument custom spans within your application. 

### Span and attribute names subject to change
As Workers tracing is currently in beta, span names and attribute names are not yet finalized. We may refine these names during the beta period to improve clarity and align with OpenTelemetry semantic conventions. We recommend reviewing the [spans and attributes documentation](/workers/observability/traces/spans-and-attributes) periodically for updates.

### Known bugs and other call outs 
* There are currently are a few pieces of metadata that only apply to spans (e.g.`service.name`, `faas.name`), however, some may apply across all events. For example, when filtering/grouping on the Worker name across traces and logs, use `$metadata.service` as it will apply consistently across all event types.
* While a trace is in progress, the event will show `Trace in Progress` on the root span. Please wait a few moments for the full trace to become available 