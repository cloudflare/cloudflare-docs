---
title: Alerts
pcx-content-type: reference
weight: 2
meta:
  title: Page Shield alerts
---

# Page Shield alerts

You can configure alerts for scripts detected in your domain. Refer to [Configure Page Shield alerts](/page-shield/use-dashboard/configure-alerts/) for instructions.

## New script alerts

{{<Aside type="note">}}

Available for Cloudflare customers on a Business or Enterprise plan.

{{</Aside>}}

- **Script Monitor New Scripts Alert**: Triggered daily by any new JavaScript dependencies detected in your pages.
- **Script Monitor New Domain Alert**: Triggered hourly by newly detected JavaScript dependencies from new host domains.
- **Script Monitor New Script Exceeds Max URL Length Alert**: Triggered when a script's URL exceeds the maximum allowed length.

## Code change alert

{{<Aside type="note">}}

Available as a paid add-on for Cloudflare customers on an Enterprise plan.

{{</Aside>}}

- **Script Monitor New Code Change Detection Alert**: Triggered daily by any changed JavaScript dependencies detected in your pages.

## Malicious script alerts

{{<Aside type="note">}}

Available as a paid add-on for Cloudflare customers on an Enterprise plan.

{{</Aside>}}

- **Script Monitor New Malicious Domain Alert**: Triggered by JavaScript dependencies loaded from domains known to be malicious according to threat intelligence feeds.
- **Script Monitor New Malicious URL Alert**: Triggered by JavaScript dependencies loaded from URLs known to be malicious according to threat intelligence feeds.
- **Script Monitor New Malicious Script Alert**: Triggered by JavaScript code that Cloudflare's internal systems considered malicious.

Malicious script alerts will only include scripts with an _Active_ or _CDN-CGI_ status. Refer to [Script statuses](/page-shield/reference/script-statuses/) for more information.
