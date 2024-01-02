---
_build:
  publishResources: false
  render: never
  list: never
---

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Settings** > **WARP Client**.

2. Under **Device settings**, locate the [device profile](/cloudflare-one/connections/connect-devices/warp/configure-warp/device-profiles/) you would like to modify and select **Configure**.

3. Scroll down to **Split Tunnels**.

4. (Optional) To view your existing Split Tunnel configuration, select **Manage**. You will see a list of the IPs and domains Cloudflare Zero Trust excludes or includes, depending on the mode you have selected. We recommend making a copy of your Split Tunnel entries, as they will revert to the default upon switching modes.

5. Under **Split Tunnels**, choose a mode:

   - **Exclude IPs and domains** — (Default) All traffic will be sent to Cloudflare Gateway except for the IPs and domains you specify.
   - **Include IPs and Domains** — Only traffic destined to the IPs or domains you specify will be sent to Cloudflare Gateway. All other traffic will bypass Gateway and will no longer be filtered by your network or HTTP policies. In order to use certain features, you will need to manually add [Zero Trust domains](#cloudflare-zero-trust-domains).

All clients with this device profile will now switch to the new mode and its default route configuration. Next, [add](#add-a-route) or [remove](#remove-a-route) routes from your Split Tunnel configuration.
