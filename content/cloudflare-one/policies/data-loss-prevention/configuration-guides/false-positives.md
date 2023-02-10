---
pcx_content_type: concept
title: False positives
weight: 1
layout: single
---

# False positives

False positives can clutter your logs with junk data and can cause issues for the end user if they are blocked by the policy. Adding additional conditions to your policy will limit the scope of the DLP scan and can help the reduce the number of false positives. For example, you can configure the policy to only scan certain applications or exclude specific sites from the policy.

In your [DLP logs](/cloudflare-one/policies/data-loss-prevention/dlp-logs/), you may find that certain sites are a common source of noise. To exempt these sites from DLP scanning, you can manually create a list of hostnames or URLs. Then, exclude the list from your DLP policy as shown in the example below:

| Policy name |
| ---- |
| Block SSN uploads to Google Drive |

| Selector | Operator | Value |
| - | - | - |
| DLP Profiles | in | `U.S. Social Security Numbers` |
| Application  | in | `Google Drive` |
| Domain | not in list | `Do not DLP - SSN` |

|Action|
|------|
|Block |

{{<Aside type="note">}}
The **Allow** action functions as an implicit logger, giving you visibility into where your sensitive data is going without impacting the end user experience.
{{</Aside>}}
