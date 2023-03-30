---
pcx_content_type: how-to
title: Logpush integration
weight: 8
---

# Cloudflare Logpush integration

{{<Aside>}}

This feature is only available on Zero Trust Enterprise plans.

{{</Aside>}}

With Cloudflare's [Logpush](/logs/about/) service, you can configure the automatic export of Zero Trust logs to third-party storage destinations or to security information and event management (SIEM) tools. Once exported, your team can analyze and audit the data as needed.

## Export Zero Trust logs with Logpush

To enable Logpush for Zero Trust logs:

1. In [Zero Trust](https://one.dash.cloudflare.com/), navigate to **Logs** > **Logpush**.
2. Select **Connect a service**.
3. Enter a **Job name**.
4. From the drop-down menu, choose the [dataset](#zero-trust-datasets) to export.
5. Next, select the data fields you want to include in the log.
6. In **Advanced settings**, choose the timestamp format you prefer, and whether you want to enable logs sampling.
7. Select **Next**.
8. Select the service you want to export your logs to.
9. Follow the service-specific instructions in Zero Trust to validate your destination.

The setup of your Logpush integration is now complete. Logpush will send updated logs every five minutes to your selected destination.

You can configure multiple destinations and add additional fields to your logs by returning to the **Logpush** page.

## Zero Trust datasets

Refer to the Logpush documentation for a list of available fields.

| Dataset                                                                         | Description                                                                                                                |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| [Gateway DNS](/logs/reference/log-fields/account/gateway_dns/)                  | [DNS queries](/cloudflare-one/analytics/logs/gateway-logs/#dns-logs) inspected by Cloudflare Gateway                       |
| [Gateway HTTP](/logs/reference/log-fields/account/gateway_http/)                | [HTTP requests](/cloudflare-one/analytics/logs/gateway-logs/#http-logs) inspected by Cloudflare Gateway                    |
| [Gateway Network](/logs/reference/log-fields/account/gateway_network/)          | [Network packets](/cloudflare-one/analytics/logs/gateway-logs/#network-logs) inspected by Cloudflare Gateway               |
| [Audit Logs](/logs/reference/log-fields/account/audit_logs/)                    | [Authentication events](/cloudflare-one/analytics/logs/audit-logs/#authentication-audit-logs) through Cloudflare Access    |
| [Access Requests](/logs/reference/log-fields/account/access_requests/)          | [HTTP requests](/cloudflare-one/analytics/logs/audit-logs/#per-request-audit-logs) to sites protected by Cloudflare Access |
| [CASB Findings](/logs/reference/log-fields/account/casb_findings/)              | [Security issues](/cloudflare-one/applications/scan-apps/manage-findings/) detected by Cloudflare CASB                     |
| Device Posture                                                                  | [Device posture status](/cloudflare-one/analytics/logs/posture-logs) from the WARP client                                  |
| [Session Logs](/logs/reference/log-fields/account/zero_trust_network_sessions/) | Network session logs for traffic proxied by Cloudflare Gateway                                                             |
