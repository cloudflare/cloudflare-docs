---
_build:
  publishResources: false
  render: never
  list: never
---


{{<Aside type="warning">}}

Least connections steering supports both `HTTP/1` and `HTTP/2`. However, due to multiplexing, with `HTTP/2` the number of open connections is expected to be lower. For more details, refer to the [Cloudflare Learning Center](https://www.cloudflare.com/learning/performance/http2-vs-http1.1/).

{{</Aside>}}