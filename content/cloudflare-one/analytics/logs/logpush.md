---
pcx-content-type: how-to
title: Logpush
weight: 7
---

# Export logs with Logpush

{{<Aside>}}

This feature is only available on the Zero Trust Enterprise plan.

{{</Aside>}}

You can configure the automatic export of Gateway Activity logs and Audit logs to third-party storage destinations or to security information and event management (SIEM) tools. Once exported, your team can analyze and audit the data as needed.

This feature builds on Cloudflare's Logpush Service — check out the Logpush documentation to find a list of available fields:

* [DNS logs](/logs/reference/log-fields/account/gateway_dns/)
* [Network logs](/logs/reference/log-fields/account/gateway_network/)
* [HTTP logs](/logs/reference/log-fields/account/gateway_http/)
* [Audit logs](/logs/reference/log-fields/account/audit_logs/)

To enable this feature on the Zero Trust dashboard:

1. Navigate to **Logs > Logpush**.
2. Click **Connect a service**.
3. Enter a **Job name**.
4. From the drop-down menu, choose the dataset to export.
5. Next, select the data fields you want to include in the log.
6. In the **Advanced settings** card, choose the timestamp format you prefer, and whether you want to enable logs sampling.
7. Click **Next**.
8. Select the service you want to export your logs to.
9. Next, follow the service-specific instructions on the Zero Trust UI to validate your destination.

The setup of your logpush integration is now complete. Logpush will send updated logs every five minutes to your selected destination.

You can configure multiple destinations and monitor for any issues by returning to the Logpush page.
