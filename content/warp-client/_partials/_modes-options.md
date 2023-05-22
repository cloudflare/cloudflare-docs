---
_build:
  publishResources: false
  render: never
  list: never
---

## WARP modes

The WARP app has two main modes of operation: WARP and 1.1.1.1.

In WARP mode, all traffic leaving your computer is encrypted and sent over WARP, including DNS traffic. In 1.1.1.1 mode, the WARP app only encrypts DNS traffic to the 1.1.1.1 resolver.

WARP mode is the default and the recommended mode of operation. However, if you only want to use the 1.1.1.1 resolver mode:

1. Select the WARP app icon.
2. Select the cog icon, and choose your preferred mode of operation for WARP.

## WARP options

Beyond the two modes of operation, the WARP app lets you configure additional options to better suit your needs. You can change the protocol used to connect to Cloudflare or enable [1.1.1.1 for Families](/1.1.1.1/setup/#1111-for-families), for example. To access these options:

1. Select the WARP app icon.
2. Select the **cog icon** > **Preferences**.

The following is a list of options you can configure in the **Connection** tab:

* **Disable for all Wi-Fi / wired networks**: Check the box corresponding to the network where you want to prevent WARP from working on.
* **DNS Protocol**: The available options depend on the WARP mode you have enabled:
  * **WARP**: Only available when you have the WARP mode enabled. All DNS traffic encrypted and [sent to Cloudflare's edge](/warp-client/warp-modes/#_1.1.1.1_with_warp).
  * **HTTPS**: All DNS traffic is sent outside the tunnel via [DNS over HTTPS](/1.1.1.1/encryption/dns-over-https/).
  * **TLS**: All DNS traffic is sent outside the tunnel via [encrypted TLS](/1.1.1.1/encryption/dns-over-tls/).
* **1.1.1.1 for Families**: Allows you to [enable 1.1.1.1 for Families](/1.1.1.1/setup/#1111-for-families) and choose between blocking malware, or blocking malware and adult content.

For the **Advanced** options, refer to [Exclude or include network traffic with WARP](/cloudflare-one/connections/connect-devices/warp/configure-warp/route-traffic/) for more information.