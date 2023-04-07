---
_build:
  publishResources: false
  render: never
  list: never
---

These variables are also available as part of the [request.cf](/workers/runtime-apis/request/#incomingrequestcfproperties) object via Cloudflare Workers:

- `request.cf.botManagement.score`
- `request.cf.botManagement.verifiedBot`
- `request.cf.botManagement.staticResource`
- `request.cf.botManagement.ja3Hash`
- `request.cf.botManagement.detectionIds`