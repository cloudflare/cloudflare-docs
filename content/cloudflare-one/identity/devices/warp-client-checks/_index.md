---
pcx_content_type: navigation
title: WARP client checks
weight: 1
---

# WARP client checks

These device posture checks are performed by the [Cloudflare WARP client](/cloudflare-one/connections/connect-devices/warp/). To use this feature, you must [deploy the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) to your company devices in a [mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) that supports device posture checks:
- Gateway with WARP 
- Secure Web Gateway without DNS filtering
- Device Information Only

| Device posture check | macOS | Windows | Linux | iOS | Android/ChromeOS |
| ---------------------| ----- | ------- | ----- | --- | ---------------- |
| [Application check](/cloudflare-one/identity/devices/warp-client-checks/application-check/) | ✅ | ✅ | ✅ | ❌ | ❌ |
| [Carbon Black](/cloudflare-one/identity/devices/warp-client-checks/carbon-black/) | ✅ | ✅ | ✅ | ❌ | ❌ |
| [Client certificate](/cloudflare-one/identity/devices/warp-client-checks/client-certificate/) | ✅ | ✅ | ✅ | ❌ | ❌ |
| [Device serial numbers](/cloudflare-one/identity/devices/warp-client-checks/corp-device/) | ✅ | ✅ | ✅ | ❌ | ❌ |
| [Device UUID](/cloudflare-one/identity/devices/warp-client-checks/device-uuid/) | ❌ | ❌ | ❌ | ✅ | ✅ |
| [Disk encryption](/cloudflare-one/identity/devices/warp-client-checks/disk-encryption/) | ✅ | ✅ | ✅ | ❌ | ❌ |
| [Domain joined](/cloudflare-one/identity/devices/warp-client-checks/domain-joined/) | ❌ | ✅ | ❌ | ❌ | ❌ |
| [File check](/cloudflare-one/identity/devices/warp-client-checks/file-check/)| ✅ | ✅ | ✅ | ❌ | ❌ |
| [Firewall](/cloudflare-one/identity/devices/warp-client-checks/firewall/)| ✅ | ✅ | ❌ | ❌ | ❌ |
| [OS version](/cloudflare-one/identity/devices/warp-client-checks/os-version/) | ✅ | ✅ |  ✅ |  ✅ |  ✅ |
| [Require Gateway](/cloudflare-one/identity/devices/warp-client-checks/require-gateway/) | ✅ | ✅ |  ✅ |  ✅ |  ✅ |
| [Require WARP](/cloudflare-one/identity/devices/warp-client-checks/require-warp/) | ✅ | ✅ |  ✅ |  ✅ |  ✅ |
| [SentinelOne](/cloudflare-one/identity/devices/warp-client-checks/sentinel-one/) | ✅ | ✅ | ✅ | ❌ | ❌ |
