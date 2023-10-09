---
_build:
  publishResources: false
  render: never
  list: never
---

{{<Aside type="warning" header="Warning">}}

Deploying Gateway DNS filtering using static IP addresses may prevent users from connecting to public Wi-Fi networks through captive portals. If users are experiencing connectivity issues related to captive portals, they should:

1. Remove the static IP addresses from the device.
2. Connect to the Wi-Fi network.
3. Once the connection has been established, add the static IP addresses back.

To avoid this issue, use the [WARP client](/cloudflare-one/connections/connect-devices/warp/) to connect your devices to Cloudflare Zero Trust.

{{</Aside>}}
