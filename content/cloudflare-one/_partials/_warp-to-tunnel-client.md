---
_build:
  publishResources: false
  render: never
  list: never
---

To connect your devices to Cloudflare:

1. [Deploy the WARP client](/cloudflare-one/connections/connect-devices/warp/deployment/) on your devices in Gateway with WARP mode.  The Cloudflare certificate is only required if you want to display a custom block page or filter HTTPS traffic.
2. [Create device enrollment rules](/cloudflare-one/connections/connect-devices/warp/deployment/manual-deployment/#set-device-enrollment-permissions) to determine which devices can enroll to your Zero Trust organization.
