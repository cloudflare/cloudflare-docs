---
pcx_content_type: concept
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

A service-level objective (SLO) is defined as (x / y) * 100 where x = the number of good events and y = the number of valid events for a given time period. When you set an SLO value, Cloudflare determines the rate at which bad events are allowed to occur over time, known as the burn rate. We use the multi-window, multi-burn rate approach described in [Section 6 of Alerting on SLOs](https://sre.google/workbook/alerting-on-slos/) to alert when bad events are occurring more frequently than the allowed burn rate. We look at both a short time period (five minutes) and a long time period (one hour) -- this ensures that you are quickly alerted when an outage is detected within a short window, while simultaneously preventing too many false positives since the long window must also be triggered.
