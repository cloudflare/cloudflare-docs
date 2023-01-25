---
pcx_content_type: how-to
title: Logpush integration
weight: 7
---

# Cloudflare Logpush integration

{{<Aside>}}

This feature is only available on Zero Trust Enterprise plans.

{{</Aside>}}

With Cloudflare's [Logpush](/logs/about/) service, you can configure the automatic export of Zero Trust logs to third-party storage destinations or to security information and event management (SIEM) tools. Once exported, your team can analyze and audit the data as needed.

## Zero Trust datasets

Refer to the Logpush documentation for a list of available fields.

| Dataset | Description |
| -------- | ----------- |
| [Gateway DNS](/logs/reference/log-fields/account/gateway_dns/) | [DNS queries inspected by Cloudflare Gateway](/cloudflare-one/analytics/logs/gateway-logs/#dns-logs) |
| [Gateway HTTP](/logs/reference/log-fields/account/gateway_http/) | [HTTP requests inspected by Cloudflare Gateway](/cloudflare-one/analytics/logs/gateway-logs/#http-logs) |
| [Gateway Network](/logs/reference/log-fields/account/gateway_network/) | [Network packets inspected by Cloudflare Gateway](/cloudflare-one/analytics/logs/gateway-logs/#network-logs) |
| [Audit Logs](/logs/reference/log-fields/account/audit_logs/) | [Authentication events through Cloudflare Access](/cloudflare-one/analytics/logs/audit-logs/#authentication-audit-logs) |
| [Access Requests](/logs/reference/log-fields/account/access_requests/) | [HTTP requests to sites protected by Cloudflare Access](/cloudflare-one/analytics/logs/audit-logs/#per-request-audit-logs) |
| [CASB Findings](/logs/reference/log-fields/account/casb_findings/) | [Security issues detected by Cloudflare CASB](/cloudflare-one/applications/scan-apps/manage-findings/) |

## Export Zero Trust logs with Logpush

To enable Logpush for Zero Trust logs:

1. In the [Zero Trust dashboard](https://dash.teams.cloudflare.com/), navigate to **Logs** > **Logpush**.
2. Select **Connect a service**.
3. Enter a **Job name**.
4. From the drop-down menu, choose the dataset to export.
5. Next, select the data fields you want to include in the log.
6. In **Advanced settings**, choose the timestamp format you prefer, and whether you want to enable logs sampling.
7. Select **Next**.
8. Select the service you want to export your logs to.
9. Follow the service-specific instructions on the Zero Trust dashboard to validate your destination.

The setup of your Logpush integration is now complete. Logpush will send updated logs every five minutes to your selected destination.

You can configure multiple destinations and add additional fields to your logs by returning to the **Logpush** page.
