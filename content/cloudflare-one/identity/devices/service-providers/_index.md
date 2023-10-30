---
pcx_content_type: navigation
title: Service providers
weight: 2
---

# Third-party service providers

Service-to-service integrations allow the WARP client to get device posture data from a third-party API. To use this feature, you must [deploy the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) to your company devices in a [mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) that supports device posture checks:
- Gateway with WARP 
- Secure Web Gateway without DNS filtering
- Device Information Only

| Device posture check | macOS | Windows | Linux | iOS | Android/ChromeOS |
| ---------------------| ----- | ------- | ----- | --- | ---------------- |
| [Crowdstrike](/cloudflare-one/identity/devices/service-providers/crowdstrike/) | ✅ | ✅ | ✅ | ❌ | ❌ |
| [Kolide](/cloudflare-one/identity/devices/service-providers/kolide/) | ✅ | ✅ | ✅ | ❌ | ❌ |
| [Microsoft Endpoint Manager](/cloudflare-one/identity/devices/service-providers/microsoft/) | ✅ | ✅ | ✅ | ❌ | ❌ |
| [SentinelOne](/cloudflare-one/identity/devices/service-providers/sentinelone/) | ✅ | ✅ | ✅ | ❌ | ❌ |
| [Uptycs](/cloudflare-one/identity/devices/service-providers/uptycs/) | ✅ | ✅ | ✅ | ❌ | ❌ |
| [Workspace ONE](/cloudflare-one/identity/devices/service-providers/workspace-one/) | ✅ | ✅ | ✅ | ❌ | ❌ |
