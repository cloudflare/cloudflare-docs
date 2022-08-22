---
title: Share and export data
pcx_content_type: how-to
weight: 3
meta:
  title: Share and export Network Analytics data
---

# Share and export data

## Share Network Analytics filters

When you add filters and specify a time range in the **Network Analytics** page, the URL changes to reflect those parameters.

To share your view of the data, copy the URL and send it to other users so that they can work with the same view.

![Share your URL with other users so that they can work with the same Network Analytics view.](/analytics/static/images/network-analytics/share-url.png)

## Export activity log data

You can export up to 100 raw events from the **Activity log** at a time. This option is useful when you need to combine and analyze Cloudflare data with data stored in a separate system or database, such as a security information and event management system (SIEM).

To export log data:

1. Click **Export**.
2. Choose either CSV or JSON format for rendering exported data. The downloaded file name will reflect the selected time range, using this pattern:

```txt
network-analytics-attacks-[start time]-[end time].json
```

## Export a Network Analytics report

To print or download a snapshot report from Network Analytics, click **Print report**. Your web browser's print interface displays options for printing or saving as a PDF.