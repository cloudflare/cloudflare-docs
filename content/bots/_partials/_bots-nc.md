---
_build:
  publishResources: false
  render: never
  list: never
---

A bot score of 0 means Bot Management did not run on the request. Cloudflare does not run Bot Management on internal service requests that Bot Management has no interest in blocking. 

Workers subrequests from one Cloudflare zone to another Cloudflare zone do compute a bot score as it does not consider a site hosted on Cloudflare as internal.
