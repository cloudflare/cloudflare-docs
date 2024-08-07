---
pcx_content_type: configuration
title: Error handling
weight: 5
meta:
  title: Workers RPC — Error Handling
  description: How exceptions, stack traces, and logging works with the Workers RPC system.
---

# Error handling

## Exceptions

An exception thrown by an RPC method implementation will propagate to the caller. If it is one of the standard JavaScript Error types, the `message` and prototype's `name` will be retained, though the stack trace is not.

### Unsupported error types

- If an [`AggregateError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) is thrown by an RPC method, it is not propagated back to the caller.
- The [`SuppressedError`](https://github.com/tc39/proposal-explicit-resource-management?tab=readme-ov-file#the-suppressederror-error) type from the Explicit Resource Management proposal is not currently implemented or supported in Workers.
- Own properties of error objects, such as the [`cause`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) property, are not propagated back to the caller

## Additional properties

For some remote exceptions, the runtime may set properties on the propagated exception to provide more information about the error; see [Durable Object error handling](/durable-objects/best-practices/error-handling) for more details.
