---
_build:
  publishResources: false
  render: never
  list: never
---

When you add a filter and specify a report duration (time window) in Security Events, the Cloudflare dashboard URL changes to reflect the parameters you configured. You can share that URL with other users so that they can analyze the same information that you see.

For example, after adding a filter for `Action equals Challenge` and setting the report duration to 72 hours, the URL should look like the following:

`https://dash.cloudflare.com/<account-id>/example.net/firewall?action=challenge&time-window=4320`
