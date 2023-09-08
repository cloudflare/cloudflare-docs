---
_build:
  publishResources: false
  render: never
  list: never
---

Each health monitor request is trying to answer two questions:

1. **Is the server offline?**: Does the server respond to the health monitor request at all? If so, does it respond quickly enough (as specified in the monitor's **Timeout** field)?
2. **Is the server working as expected?**: Does the server respond with the expected HTTP response codes? Does it include specific information in the response body?

If the answer to either of these questions is "No", then the server fails the health monitor request.