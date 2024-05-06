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

### Device connectivity anomaly

Receive a notification when Cloudflare detects a spike or drop in the number of devices connected to WARP.

For information on the alert logic, refer to [Z-score](#z-score).

### DEX test latency

Receive a notification when there is a significant increase or decrease in application latency, as measured by the HTTP test [Resource Fetch time](/cloudflare-one/insights/dex/tests/http/#test-results) or Traceroute test [Round trip time](/cloudflare-one/insights/dex/tests/traceroute/#test-results).

For information on the alert logic, refer to [Z-score](#z-score).

### DEX test low availability

Receive an alert when the percentage of successful HTTP or traceroute requests to an application drops below the selected threshold.

For information on the alert logic, refer to [SLO](#slo).

## ​​Alert logic

### Z-score

Cloudflare uses a z-score to detect traffic spikes or drops. A [z-score](https://en.wikipedia.org/wiki/Standard_score) is the number of standard deviations the current value is to the mean. We calculate the mean and standard deviation by comparing the current five minutes to the past four hours. This is measured every five minutes.

To trigger an alert, the z-score value must be above 3.5 or less than -3.5, and the number of data points within the four-hour time period must exceed 200.

### SLO

The [service-level objective (SLO)](https://sre.google/workbook/alerting-on-slos/) is defined as (x / y) * 100 where x = the number of good events and y = the number of valid events for a given time period.

Cloudflare computes the SLO over both a short time period (five minutes) and a long time period (one hour). This ensures that you are quickly alerted when an outage is detected within a short window, while simultaneously preventing too many false positives since the long window must also be triggered.
