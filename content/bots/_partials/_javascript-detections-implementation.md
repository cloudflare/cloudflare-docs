---
_build:
  publishResources: false
  render: never
  list: never
---

Once you enable JavaScript detections, you can use the `cf.bot_management.js_detection.passed` field in Firewall rules (or the `request.cf.botManagement.js_detection.passed` variable in Workers).

When adding this field to Firewall rules, use it:

- On endpoints expecting browser traffic (avoiding native mobile applications or websocket endpoints).
- After a user's first request to your application (Cloudflare needs at least one HTML request before injecting JavaScript detection).
- With the [Managed Challenge action](/firewall/cf-firewall-rules/cloudflare-challenges/#managed-challenge-recommended), because there are legitimate reasons a user might not have passed a JavaScript detection challenge (network issues, ad blockers, disabled JavaScript in browser, native mobile apps).

### Prerequisites

- You must have JavaScript detections enabled on your zone. 
- You must have [updated your Content Security Policy headers](/bots/reference/javascript-detections/#if-you-have-a-content-security-policy-csp) for JavaScript detections.
- You must not run this field on websocket endpoints. 
- You must use the field in a custom rules expression that expects only browser traffic.
- The action should always be a managed challenge in case a legitimate user has not received the challenge for network or browser reasons.
- The path specified in the rule builder should never be the first HTML page a user visits when browsing your site. 

`cf.bot_management.js_detection.passed` is used to indicate that a request has a Bot Management cookie present with a JavaScript detection value indicating it submitted the JavaScript detection test, and received a likely human scoring result. 

The `cf.bot_management.js_detection.passed` field should never be used in a Firewall field that can run a user's first request to a site. It is necessary to have at least one HTML request before Cloudflare can inject JavaScript detection. 

```js
---
header: Example with Workers
---
"botManagement": {
"jsDetection":

{ "passed": false }
,
},
```