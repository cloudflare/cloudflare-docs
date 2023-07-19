---
pcx_content_type: concept
title: Confidence levels
weight: 3
---

# Confidence levels

The `result.meta.confidenceInfo.level` in the response provides an indication of how much confidence Cloudflare has in the data. Confidence levels can be affected either by internal issues affecting data quality or by not having a lot of data for a given location (like Antarctica) or Autonomous System (AS).


| Level | Description |
| ---- | ---- |
| **1** | There is not enough data in this time range and/or for this location or Autonomous System. Data also exhibits an erratic pattern, possibly due to the reasons previously mentioned.  |
| **2** | There is not enough data in this timerange and/or in this location or Autonomous System. |
| **3** | Data exhibits an erratic pattern but is not affected by known data issues (like pipeline issues). |
| **4** | Unassigned. |
| **5** | No known data quality issues. |


