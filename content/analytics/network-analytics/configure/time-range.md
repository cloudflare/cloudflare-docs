---
title: Adjust the time range
pcx_content_type: how-to
weight: 2
meta:
  title: Adjust the time range in Network Analytics
---

# Adjust the time range

## Using the timeframe drop-down list

Use the timeframe drop-down list to change the time range over which Network Analytics displays data. When you select a timeframe, the entire view is updated to reflect your choice.

In Network Analytics v2 dashboard, the range of historical data you can query is 120 days.

When you select _Previous 30 minutes_, the **Network Analytics** card will show the data from the last 30 minutes, refreshing every 20 seconds. A _Live_ notification appears next to the statistic drop-down list to let you know that the view keeps updating automatically:

![Timeframe drop-down with Previous 30 minutes selected.](/analytics/static/images/network-analytics/timeframe-selector.png)

## Zooming in the chart

To zoom in a specific period, click and drag your mouse on a region of the **Packets summary** (or **Bits summary**) chart. To zoom out, click the **X** icon in the time range selector.

![User zooming in a given period in the Network Analytics traffic chart.](/analytics/static/images/network-analytics/chart-zoom-in.gif)

The effective resolution goes up when you zoom in and goes down when you zoom out, due to the Adaptive Bit Rate. This means that a big packet burst that lasted a few seconds may look less impactful when analyzing a chart displaying data for 24 hours or more.
