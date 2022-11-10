---
pcx_content_type: concept
title: Confidence levels
weight: 2
---

# Confidence levels

The `result.meta.confidenceInfo.level` in the response will provide an indication of how much confidence we have in the data, either due to internal issues affecting data quality or due to simply not having a lot of data for a given location (e.g. Antarctica) or Autonomous System (AS).


| Level | Description |
| ---- | ---- |
| **1** | Cloudflare is seeing a small amount of data in this timerange and/or in this location or Autonomous System. Data also exhibits an erratic pattern, possibly due to the aforementioned.  |
| **2** | Cloudflare is seeing a small amount of data in this timerange and/or in this location or Autonomous System. |
| **3** | Data exhibits an erratic pattern but no known data issues (e.g. pipeline issues) affect it. |
| **4** | Unassigned. |
| **5** | No known data quality issues. |


