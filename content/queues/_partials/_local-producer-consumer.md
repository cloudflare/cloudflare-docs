---
_build:
  publishResources: false
  render: never
  list: never
---

Wrangler does not yet support running separate producer and consumer Workers bound to the same Queue locally. To develop locally with Queues, you can temporarily put your consumer's `queue()` handler in the same Worker as your producer, so the same Worker acts as both a producer and consumer.