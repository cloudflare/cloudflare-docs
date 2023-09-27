---
title: Review audit logs
pcx_content_type: how-to
weight: 3
---

# Review audit logs

Audit logs summarize the history of changes made within your Cloudflare account. Audit logs include account level actions like login and logout, as well as zone configuration changes.

Audit Logs are available on all plan types and are captured for both individual users and for multi-user organizations.

{{<Aside type="note">}}

Most beta features will not appear in audit logs until they are out of beta.

{{</Aside>}}

## Access audit logs

### Using the dashboard

{{<render file="_view-audit-log.md">}}

You can search these audit logs by user email or domain and filter by date range. To download audit logs, click **Download CSV**.

### Using the API

To get audit logs from the Cloudflare API, send a [GET request](/api/operations/audit-logs-get-account-audit-logs).

We recommending using the API for downloading historical audit log data.

To maintain Audit Logs query performance, the Audit Logs API was modified on 2019-06-30 to return records with a maximum age of 18 months.

## Retention

Audit Logs are retained for 18 months before being deleted. Enterprise customers can use [Log Push](/logs/about/) to store Audit Logs for longer periods of time.
