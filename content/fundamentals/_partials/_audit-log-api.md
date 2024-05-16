---
_build:
  publishResources: false
  render: never
  list: never
---

To get audit logs from the Cloudflare API, send a [GET request](/api/operations/audit-logs-get-account-audit-logs).

We recommending using the API for downloading historical audit log data.

To maintain Audit Logs query performance, the Audit Logs API was modified on 2019-06-30 to return records with a maximum age of 18 months.
