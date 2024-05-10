---
_build:
  publishResources: false
  render: never
  list: never
---

Refer to our [managed deployment instructions](/cloudflare-one/connections/connect-devices/warp/deployment/mdm-deployment/) and create a `.plist`, `mdm.xml`, or `.msi` policy file based on your organization's software management tool.

{{<render file="warp/_mdm-dash-conflict.md" productFolder="cloudflare-one">}} Therefore, we recommend that your policy file only contain the organization name and potentially the onboarding flag, [relying on the dashboard](/learning-paths/secure-internet-traffic/configure-device-agent/device-profiles/) to configure the remaining device settings.

```xml
<dict>
  <key>organization</key>
  <string>your-team-name</string>
  <key>onboarding</key>
  <false/>
</dict>
```
