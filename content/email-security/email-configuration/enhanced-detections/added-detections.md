---
title: Added Detections
pcx_content_type: concept
weight: 2
---

# Added Detections

With **Added Detections**, you can manage various configurations applied at the time of analyzing email traffic.

These settings apply particularly to trusted business partners that your organization may do business with (vendors, external providers, and more).

## Available configurations

| Feature | Description |
| --- | --- |
| Malicious Domain Age | Controls the threshold for a **Malicious** {{<glossary-tooltip term_id="disposition" link="/email-security/reference/dispositions-and-attributes/#dispositions">}}disposition{{</glossary-tooltip>}} based on domain age. Maximum of 120 days. |
| Suspicious Domain Age | Controls the threshold for a **Suspicious** [disposition](/email-security/reference/dispositions-and-attributes/#dispositions) based on domain age. Maximum of 120 days. |
| Encrypted Attachment Scanning | Auto-scan encrypted attachments to detect sophisticated malware campaigns. |
| Anti-Spam Engine | Detect bulk emails or unsolicited commercial emails and marks them with a **Bulk** [disposition](/email-security/reference/dispositions-and-attributes/#dispositions). |
| Active Fraud Prevention | Inspect and assess new domain traffic that could be launched from third-party partners or similar organizations. |

## Access Added Detections

To access **Added Detections** and potentially adjust your settings:

1. Log in to the [Cloud Email Security (formerly Area 1) dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Enhanced Detections** > **Added Detections**.

From this view, you can adjust [various configurations](#available-configurations).