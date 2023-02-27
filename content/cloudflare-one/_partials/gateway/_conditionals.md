---
_build:
  publishResources: false
  render: never
  list: never
---

You can use AND and OR conditionals to build complex policies.

The OR operator will only work with conditions of the same expression type. For example, you cannot compare conditions in **Traffic** with conditions in **Identity** or **Device Posture**.

If an OR condition evaluates both a request-based attribute (such as _Source IP_) and a response-based attribute (such as a _DLP Profile_), then the condition will be evaluated when the response is received.
