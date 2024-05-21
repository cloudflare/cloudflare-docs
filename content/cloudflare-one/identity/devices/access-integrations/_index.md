---
pcx_content_type: navigation
title: Access integrations
weight: 4
---

# Device posture checks with Cloudflare Access

These device posture checks can only be enforced for Cloudflare Access applications. They cannot be used in Gateway network policies.

| Device posture check | macOS | Windows | Linux | iOS | Android/ChromeOS | [WARP mode](/cloudflare-one/connections/connect-devices/warp/configure-warp/warp-modes/) |
| ---------------------| ----- | ------- | ----- | --- | ---------------- | --------- |
| [Azure AD Conditional Access](/cloudflare-one/tutorials/azuread-conditional-access/) | ✅ | ✅ | ❌ | ❌ | ❌ | WARP not required |
| [Mutual TLS](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/)| ✅ | ✅ |  ✅ |  ✅ |  ✅ | WARP not required |
| [Tanium](/cloudflare-one/identity/devices/access-integrations/tanium/) | ✅ | ✅ | ✅  | ❌ | ❌ | Gateway with WARP, Secure Web Gateway without DNS filtering, or Device Information Only |
