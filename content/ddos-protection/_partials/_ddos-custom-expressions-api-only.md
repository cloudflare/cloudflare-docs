---
_build:
  publishResources: false
  render: never
  list: never
---

The API allows you to specify a custom rule expression so that a configuration (or override) only applies to a subset of incoming requests. The dashboard currently only supports configurations that apply to all incoming requests for a zone.<br/> If you set a custom expression using the API, the Cloudflare dashboard will display the expression as "undefined" and it may also show potentially confusing results. Therefore, in this case you should keep using the API and avoid configuring the Managed Ruleset in the dashboard.
