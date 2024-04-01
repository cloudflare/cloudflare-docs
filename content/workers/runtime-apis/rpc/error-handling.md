---
pcx_content_type: configuration
title: Error handling
meta:
  title: Workers RPC — Error Handling
  description: How exceptions, stack traces, and logging works with the Workers RPC system
---

# Error handling

## Exceptions

An exception thrown by an RPC method implementation will propagate to the caller. If it is one of the standard JavaScript Error types, the type and description will be retained, though the stack trace is not.