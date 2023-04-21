---
_build:
  publishResources: false
  render: never
  list: never
---

Once you enable JavaScript detections, you can use the `cf.bot_management.js_detection.passed` field in Firewall rules (or the `request.cf.botManagement.js_detection.passed` variable in Workers).

When adding this field to Firewall rules, use it:

- On endpoints expecting browser traffic (avoiding native mobile applications or websocket endpoints).
- After a user's first request to your application (Cloudflare needs at least one HTML request before injecting JavaScript detections).
- With the [Managed Challenge action](/fundamentals/get-started/concepts/cloudflare-challenges/#managed-challenge-recommended), because there are legitimate reasons a user might not have passed a JavaScript detection challenge (network issues, ad blockers, disabled JavaScript in browser, native mobile apps).

`cf.bot_management.js_detection.passed` is used to indicate that a request has a Bot Management cookie present with a JavaScript Detection value indicating it submitted the JavaScript Detection test, and received a likely human scoring result. 

The `cf.bot_management.js_detection.passed` field should never be used in a Firewall field that can run a user's first request to a site. It is necessary to have at least one HTML request before Cloudflare can inject JavaScript Detections. 

### Example with Workers

```js
"botManagement": {
"jsDetection":

{ "passed": false }
,
},
```