---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: WARPsuccess
---
Most admins test by manually downloading the WARP client and enrolling in your organization's Cloudflare Zero Trust instance.

## Install WARP

1. First, uninstall any existing third-party VPN software if possible. Sometimes products placed in a disconnected or disabled state will still interfere with the WARP client.
2. If you are running third-party firewall or TLS decryption software, verify that it does not inspect or block traffic to these IP addresses:
    - Client orchestration IPs:
        {{<render file="warp/_client-orchestration-ips.md" productFolder="cloudflare-one">}}
    - Gateway DoH IPs:
        {{<render file="warp/_doh-ips.md" productFolder="cloudflare-one">}}
For more information, refer to [WARP with firewall](/cloudflare-one/connections/connect-devices/warp/deployment/firewall/).
3. Manually install WARP on the device.

{{<details header="Window, macOS, and Linux">}}

{{<render file="warp/_enroll-desktop.md" productFolder="cloudflare-one">}}

{{</details>}}

{{<details header="iOS, Android, and ChromeOS">}}

{{<render file="warp/_enroll-ios-android.md" productFolder="cloudflare-one">}}

{{</details>}}

The WARP client should show as **Connected**. $1
