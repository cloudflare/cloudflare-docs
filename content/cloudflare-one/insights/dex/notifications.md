---
pcx_content_type: reference
title: Notifications
weight: 3
---

# DEX notifications

Administrators can receive alerts when Cloudflare detects connectivity issues with the WARP client or degraded application performance. Notifications can be delivered via email, webhook, and third-party services.

## Manage notifications

DEX notifications are configured on the [Cloudflare dashboard](https://dash.cloudflare.com/). For more information, refer to [Create a notification](/notifications/get-started/#create-a-notification).

## Available notifications

---placeholder for notification dropdowns---

## ​​Alert logic

### Z-score

Cloudflare uses a z-score to detect traffic spikes or drops. A [z-score](https://en.wikipedia.org/wiki/Standard_score) is the number of standard deviations the current value is to the mean. We calculate the mean and standard deviation by comparing the current five minutes to the past four hours. This is measured every five minutes.

To trigger an alert, the z-score value must be above 3.5 or less than -3.5, and the number of data points within the four-hour time period must exceed 200.

### SLO

A service-level objective (SLO) is defined as (x / y) * 100 where x = the number of good events and y = the number of valid events for a given time period. Cloudflare follows the multi-window approach described in [Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/) and works backwards to determine the rate at which errors are allowed to occur over time until the error budget is exhausted. We use five minutes as the short window value and one hour as the long window value. This ensures you are quickly alerted when availability falls below the SLO threshold while preventing too many false positives.
