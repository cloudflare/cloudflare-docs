---
_build:
  publishResources: false
  render: never
  list: never
---

The API allows you to specify a custom rule expression so that a configuration (or override) only applies to a subset of incoming requests. The dashboard only allows you to specify configurations that apply to all incoming requests for a zone. If you set a custom expression using the API, you must keep using the API and avoid configuring the Managed Ruleset using the dashboard to prevent unexpected results.
