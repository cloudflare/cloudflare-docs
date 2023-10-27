---
_build:
  publishResources: false
  render: never
  list: never
---


{{<Aside type="warning">}}

Although least connections steering supports both `HTTP/1` and `HTTP/2`, note that, because of multiplexing, with `HTTP/2` the amount of open connections is expected to be lower. For more details, refer to the [Cloudflare Learning Center](https://www.cloudflare.com/learning/performance/http2-vs-http1.1/)

{{</Aside>}}