---
pcx_content_type: concept
title: Aggregation Intervals
weight: 2
---

# Aggregation Intervals

When requesting time series, data may be returned in one of a series of aggregation intervals, or frequencies, if none is specified, according to the date range. As a general principle, the longer the date range, the bigger the aggregation interval.

For example, when requesting 1 day of data, the default aggregation interval is 15 minutes, when requesting more than 1 month of data, the default is 1 day.


## Method

| Aggregation Interval | Description |
| ---- | ---- |
| **15m** | 15 minutes frequency. |
| **1h** | 1 hour frequency. |
| **1d** | 1 day frequency. |


