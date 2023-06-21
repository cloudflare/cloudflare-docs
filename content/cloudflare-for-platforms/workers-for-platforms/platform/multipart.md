---
pcx_content_type: concept
title: Multipart uploads
---

# Multipart uploads

To perform multipart uploads, include a similar object in your metadata's `bindings` property:

```json
{
    "bindings": [
        ...,
        {
            "name": "dispatcher",
            "type": "dispatch_namespace",
            "namespace": "my-namespace"
        }
    ]
}
```

