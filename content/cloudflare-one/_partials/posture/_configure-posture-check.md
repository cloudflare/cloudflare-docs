---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1
---

1. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client** > **Service provider checks**.
2. Select **Add new**.
3. Select the $1 provider.
4. Configure a [device posture check](#device-posture-attributes) and enter any name.
5. Select **Save**.

Next, go to **Logs** > **Posture** and [verify](/cloudflare-one/insights/logs/posture-logs) that the service provider posture check is returning the expected results.