---
pcx_content_type: how-to
title: Dynamic dispatch
weight: 3
---

# Dynamic dispatch

To define your Worker as a Dynamic Dispatch Worker, you will need to add the following to metadata to the Worker in `metadata.json` as part of a multipart upload:

```json
{
  "name": "dispatcher",  // name of the binding, any valid JS variable name
  "type": "dynamic_dispatch"
}
```

## Destination Worker upload

Worker uploads will return an additional `etag_bypass` key in the response:

```json
{
  "result": {
    "id": "shop-123",
    "etag": "361ef37b88aaff0ad42a47b5f76e6f8891351ff9f521f5e57bf415260ce6b494.",
    "etag_bypass": "1.bf12a5caeb1cb14236df2d97d2cbe1c87e6642e05196e37af19462d0752d32c6.",
    "handlers": [
      "fetch"
    ],
    "modified_on": "2022-03-08T19:27:00.358226Z",
    "created_on": "2022-03-08T19:27:00.358226Z",
    "usage_model": "bundled"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

This value will change on each upload of a worker, even on consecutive uploads to the same script name.

## Use the Binding

In the worker with the `dynamic_dispatch` binding, call `.get()` on the dispatcher’s binding name with the value from `etag_bypass` to get a `fetcher` for that worker:

```json
let user_worker = dispatcher.get('shop-123');
let response = await user_worker.fetch(request);
```