---
_build:
  publishResources: false
  render: never
  list: never

name: "Minimal subrequests"
sort_date: "2022-04-05"
enable_date: "2022-04-05"
enable_flag: "minimal_subrequests"
disable_flag: "no_minimal_subrequests"
---

With the `minimal_subrequests` flag set, `fetch()` subrequests sent to endpoints on the Worker's own zone (also called same-zone subrequests) have a reduced set of features applied to them. In general, these features should not have been initially applied to same-zone subrequests, and very few user-facing behavior changes are anticipated. Specifically, Workers might observe the following behavior changes with the new flag:

- Response bodies will not be opportunistically gzipped before being transmitted to the Workers runtime. If a Worker reads the response body, it will read it in plaintext, as has always been the case, so disabling this prevents unnecessary decompression. Meanwhile, if the Worker passes the response through to the client, Cloudflare's HTTP proxy will opportunistically gzip the response body on that side of the Workers runtime instead. The behavior change observable by a Worker script should be that some `Content-Encoding: gzip` headers will no longer appear.
- Automatic Platform Optimization may previously have been applied on both the Worker's initiating request and its subrequests in some circumstances. It will now only apply to the initiating request.
- Link prefetching will now only apply to the Worker's response, not responses to the Worker's subrequests.
