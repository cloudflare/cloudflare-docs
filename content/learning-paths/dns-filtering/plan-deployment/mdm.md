---
title: MDM deployment
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

{{<render file="_mdm-intro.md" productFolder="cloudflare-one">}}

## MDM policy file

Refer to our [managed deployment instructions](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/) and create a `.plist`, `mdm.xml`, or `.msi` policy file based on your organization's software management tool.

{{<render file="_mdm-dash-conflict.md" productFolder="cloudflare-one">}} Therefore, we recommend that your policy file only contain the organization name and potentially the onboarding flag, [relying on the dashboard](/learning-paths/dns-filtering/plan-deployment/device-settings/) to configure the remaining device settings.

```xml
<dict>
  <key>organization</key>
  <string>your-team-name</string>
  <key>onboarding</key>
  <false/>
</dict>
```
