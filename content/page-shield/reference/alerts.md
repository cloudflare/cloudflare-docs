---
title: Alerts
pcx_content_type: reference
weight: 3
meta:
  title: Page Shield alerts
---

# Page Shield alerts

You can configure alerts for resources detected in your domain. Refer to [Configure Page Shield alerts](/page-shield/detection/configure-alerts/) for instructions.

## New resource alerts

{{<Aside type="note">}}

Available for Cloudflare customers on a Business or Enterprise plan.

{{</Aside>}}

- **Page Shield New Resources Alert**: Triggered daily by any new resources detected in your pages.
- **Page Shield New Domain Alert**: Triggered hourly by newly detected resources from new host domains.
- **Page Shield New Resource Exceeds Max URL Length Alert**: Triggered when a resource URL exceeds the maximum allowed length.

## Code change alert

{{<Aside type="note">}}

Available as a paid add-on for Cloudflare customers on an Enterprise plan.

{{</Aside>}}

- **Page Shield New Code Change Detection Alert**: Triggered daily by any changed JavaScript dependencies detected in your pages.

## Malicious resource alerts

{{<Aside type="note">}}

Available as a paid add-on for Cloudflare customers on an Enterprise plan.

{{</Aside>}}

- **Page Shield New Malicious Domain Alert**: Triggered by resources loaded from domains known to be malicious according to threat intelligence feeds.
- **Page Shield New Malicious URL Alert**: Triggered by resources loaded from URLs known to be malicious according to threat intelligence feeds.
- **Page Shield New Malicious Script Alert**: Triggered by JavaScript code that Cloudflare's internal systems considered malicious.

Malicious resource alerts will only include resources with an _Active_ status. Refer to [Script and connection statuses](/page-shield/reference/script-statuses/) for more information.
