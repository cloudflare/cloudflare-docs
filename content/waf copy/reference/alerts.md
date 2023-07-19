---
title: Alerts
pcx_content_type: reference
weight: 2
layout: single
---

# WAF alerts

The WAF provides two types of alerts that inform you of any spikes in security events:

- **Security Events Alert**: Alerts about spikes across all services that generate log entries in Security Events.
- **Advanced Security Events Alert**: Similar to Security Events Alert with support for additional filtering options.

For details on alert types and their availability, refer to [Alert types](#alert-types).

To receive WAF alerts, you must configure a [notification](/fundamentals/notifications/). Notifications help you stay up to date with your Cloudflare account through email, PagerDuty, or webhooks, depending on your Cloudflare plan.

## Set up a notification for WAF alerts

For instructions on how to set up a notification for a WAF alert, refer to [Create a Notification](/fundamentals/notifications/create-notifications/).

---

## Alert logic

WAF alerts use a static threshold together with a [z-score](https://en.wikipedia.org/wiki/Standard_score) calculation over the last six hours and five-minute buckets of events. An alert is triggered whenever the z-score value is above 3.5 and the spike crosses a threshold of 200 security events. You will not receive duplicate alerts within the same two-hour time frame.

## Alert types

### Security Events Alert

Available for zones on Business and Enterprise plans. The mean time to detection is two hours.

This alert will look for spikes across all services that generate log entries in [security/firewall events](/logs/reference/log-fields/zone/firewall_events/).

### Advanced Security Events Alert

Only available for zones on Enterprise plans. The mean time to detection is five minutes.

When setting up this alert, you can select the services that will be monitored. Each selected service is monitored separately.
