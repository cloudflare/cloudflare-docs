---
pcx_content_type: concept
title: HTTP/3
weight: 5
---

# HTTP/3 inspection

Gateway supports inspection of HTTP/3 traffic, which uses the QUIC protocol over UDP. To enable HTTP/3 inspection, go to **Settings** > **Network** and enable **Proxy** for UDP.

## Browser limitations

The following browsers are incompatible with HTTP/3 inspection:

- Google Chrome
- Safari
- Firefox

Gateway will automatically force all traffic from these browsers to fall back to HTTP/2, thus allowing you to enforce your HTTP policies.

### Disable QUIC in Google Chrome

Google Chrome by default enables support for QUIC, which is used to connect to HTTP/3 capable webpages.

To manually disable QUIC in the Google Chrome browser:

1. In the address bar, type: `chrome://flags#enable-quic`.
2. Set the **Experimental QUIC protocol** flag to `Disabled`.
3. Relaunch Chrome for the setting to take effect.

The following Windows registry key (or Mac/Linux preference) can be used to disable QUIC in Chrome, and can be enforced via GPO or equivalent:

- **Data type:** `Boolean [Windows:REG_DWORD]`
- **Windows registry location for Windows clients:** `Software\Policies\Google\Chrome\QuicAllowed`
- **Windows registry location for Google Chrome OS clients:** `Software\Policies\Google\ChromeOS\QuicAllowed`
- **Mac/Linux preference name:** `QuicAllowed`
- **Description:** If this policy is set to true (or not set), usage of QUIC is allowed. If the policy is set to false, usage of QUIC is not allowed.
- **Recommended value:** `Windows: 0x00000000`, `Linux: false`, `Mac: <false />`
