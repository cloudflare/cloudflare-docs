---
pcx_content_type: concept
title: Multipart uploads
---

# Multipart uploads

To perform multipart uploads, include a similar object in your metadata's `bindings` property:

```json
---
filename: metadata.json
---
{
    "main_module": "main.js", // should correspond to the Worker filename
    "services": [
    {
        "binding": "some_service_binding",
        "service": "some_service",
        "environment": "production"
    }
    ],
    "bindings": [
    {
        "name": "some_other_binding",
        "type": "binding_type",
        "example_param": "param"
    }
    ]
}
```

The `main.js` content will look like this:

```js
---
filename: main.js
---
export default {
  fetch(request) {
    return new Response('Hello World');
  },
};
```



