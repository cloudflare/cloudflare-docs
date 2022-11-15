---
pcx_content_type: concept
title: Aggregation intervals
weight: 1
---

# Aggregation intervals

Aggregation intervals allow you to return data in a specified interval (or frequency). If no interval is defined, data will be returned in the default aggregation interval (or frequency). As a general principle, the longer the date range, the bigger the aggregation interval.

For example, when requesting one day of data, the default aggregation interval is 15 minutes. When requesting more than one month of data, the default is one day.

## Method

| Aggregation Interval | Description |
| ---- | ---- |
| `15m` | 15 minutes frequency. |
| `1h` | One hour frequency. |
| `1d` | One day frequency. |


